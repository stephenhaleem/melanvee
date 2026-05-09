/**
 * MELANVÉE — Shopify Cart Store
 * Replaces the old localStorage cart with Shopify Cart API.
 * Cart ID is persisted in localStorage; all mutations go through Shopify.
 */

import { useEffect, useState, useCallback } from "react";
import {
  createCart,
  getCart,
  addCartLines,
  updateCartLines,
  removeCartLines,
  setCartReturnUrl,
  parsePrice,
  type ShopifyCart,
  type ShopifyCartLine,
} from "./shopify";
import { SITE_URL } from "@/lib/site";

const CART_ID_KEY = "melanvee_shopify_cart_id";
const EVT = "melanvee:shopify-cart";

// The React site URL we want Shopify to return users to after checkout
const STORE_URL = SITE_URL;

// ─── Internal state (module-level, shared across hooks) ────────────────────

let _cart: ShopifyCart | null = null;
let _loading = false;

function broadcast() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(EVT, { detail: _cart }));
  }
}

function getStoredCartId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(CART_ID_KEY);
  } catch {
    return null;
  }
}

function storeCartId(id: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_ID_KEY, id);
  } catch {
    // quota exceeded — silently ignore, cart will still work in-memory
  }
}

function clearCartId() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(CART_ID_KEY);
  } catch {
    // ignore
  }
}

/**
 * Validate that a cart has well-formed line data.
 * A cart with lines that have missing or zero prices is considered corrupt
 * and should be replaced with a fresh one rather than shown to the user.
 */
function isCartValid(cart: ShopifyCart): boolean {
  if (!cart || !cart.id || !cart.checkoutUrl) return false;

  for (const { node } of cart.lines.edges) {
    const amount = node.merchandise?.price?.amount;
    // If any line has a missing, empty, or explicitly "0" price string
    // treat the cart as invalid so we start fresh.
    if (amount === undefined || amount === null || amount === "" || Number(amount) === 0) {
      console.warn(
        "[melanvee] Stale cart detected — line has zero/missing price. Resetting.",
        node,
      );
      return false;
    }
  }
  return true;
}

// ─── Cart initialisation ───────────────────────────────────────────────────

async function initCart(): Promise<ShopifyCart> {
  const stored = getStoredCartId();

  if (stored) {
    try {
      const existing = await getCart(stored);
      if (existing && isCartValid(existing)) {
        _cart = existing;
        broadcast();
        return existing;
      }
      // Cart was fetched but invalid (stale prices, expired, etc.) — fall through to create fresh
      if (existing) {
        console.warn("[melanvee] Existing cart failed validation, creating a fresh one.");
      }
    } catch (err) {
      // Cart ID is invalid / expired on Shopify's side
      console.warn("[melanvee] Could not fetch stored cart, creating fresh one:", err);
    }
    clearCartId();
  }

  const fresh = await createCart();
  storeCartId(fresh.id);

  // Set the return URL attribute on the cart so Shopify knows where to send
  // users back after purchase
  await setCartReturnUrl(fresh.id);

  _cart = fresh;
  broadcast();
  return fresh;
}

// ─── Public cart actions ───────────────────────────────────────────────────

/**
 * Add a variant to the Shopify cart.
 * @param merchandiseId - Shopify variant GID e.g. "gid://shopify/ProductVariant/123"
 * @param quantity
 */
export async function shopifyAddToCart(merchandiseId: string, quantity = 1): Promise<void> {
  _loading = true;
  try {
    let cart = _cart;
    if (!cart) cart = await initCart();

    const updated = await addCartLines(cart.id, [{ merchandiseId, quantity }]);

    // Validate the updated cart before accepting it
    if (!isCartValid(updated)) {
      console.warn("[melanvee] Cart returned invalid data after addLines — re-fetching.");
      const refetched = await getCart(updated.id);
      _cart = refetched && isCartValid(refetched) ? refetched : updated;
    } else {
      _cart = updated;
    }

    broadcast();
  } finally {
    _loading = false;
  }
}

/**
 * Update the quantity of a cart line.
 * @param lineId - the cart line ID
 * @param quantity - new quantity (0 = remove)
 */
export async function shopifyUpdateQty(lineId: string, quantity: number): Promise<void> {
  if (!_cart) return;
  _loading = true;
  try {
    if (quantity <= 0) {
      await shopifyRemoveLine(lineId);
      return;
    }
    const updated = await updateCartLines(_cart.id, [{ id: lineId, quantity }]);
    _cart = updated;
    broadcast();
  } finally {
    _loading = false;
  }
}

/**
 * Remove a line from the cart entirely.
 */
export async function shopifyRemoveLine(lineId: string): Promise<void> {
  if (!_cart) return;
  _loading = true;
  try {
    const updated = await removeCartLines(_cart.id, [lineId]);
    _cart = updated;
    broadcast();
  } finally {
    _loading = false;
  }
}

/**
 * Build the checkout URL.
 *
 * Shopify's checkout URL already contains the cart token. We append:
 * - `return_to` so the "Continue Shopping" / "Back to store" button on the
 *   thank-you page goes back to melanvee.com instead of the Shopify theme.
 *
 * Additionally, for headless storefronts the checkout "Back" arrow in the
 * header uses the `shop_url` that is baked into the theme. We cannot change
 * that without editing the Shopify theme itself, but `return_to` covers the
 * post-purchase flow which matters most.
 */
function buildCheckoutUrl(rawCheckoutUrl: string): string {
  try {
    const url = new URL(rawCheckoutUrl);
    url.searchParams.set("return_to", STORE_URL);
    return url.toString();
  } catch {
    // If URL parsing fails for any reason, return the original
    return rawCheckoutUrl;
  }
}

/**
 * Get the Shopify checkout URL and redirect the user.
 */
export function redirectToCheckout(): void {
  if (!_cart?.checkoutUrl) {
    console.warn("[melanvee] No checkout URL available");
    return;
  }
  window.location.href = buildCheckoutUrl(_cart.checkoutUrl);
}

// ─── Derived helpers ───────────────────────────────────────────────────────

export type CartDisplayLine = {
  lineId: string;
  variantId: string;
  productHandle: string;
  name: string;
  variantTitle: string;
  image: string;
  priceGBP: number;
  qty: number;
};

function toDisplayLines(cart: ShopifyCart | null): CartDisplayLine[] {
  if (!cart) return [];
  return (
    cart.lines.edges
      .map(({ node }) => {
        const m = node.merchandise;
        const priceGBP = parsePrice(m.price.amount);
        return {
          lineId: node.id,
          variantId: m.id,
          productHandle: m.product.handle,
          name: m.product.title,
          variantTitle: m.title,
          image: m.product.images.edges[0]?.node.url ?? "",
          priceGBP,
          qty: node.quantity,
        };
      })
      // Filter out any lines where price couldn't be parsed — prevents £0 showing in UI
      .filter((line) => line.priceGBP > 0)
  );
}

// ─── React hook ────────────────────────────────────────────────────────────

export type UseShopifyCartReturn = {
  lines: CartDisplayLine[];
  count: number;
  totalGBP: number;
  checkoutUrl: string | null;
  loading: boolean;
  addToCart: (merchandiseId: string, quantity?: number) => Promise<void>;
  updateQty: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
  checkout: () => void;
};

export function useShopifyCart(): UseShopifyCartReturn {
  const [cart, setCart] = useState<ShopifyCart | null>(_cart);
  const [loading, setLoading] = useState(false);

  // Listen for cart updates
  useEffect(() => {
    const handler = (e: Event) => {
      setCart((e as CustomEvent<ShopifyCart | null>).detail);
    };
    window.addEventListener(EVT, handler);

    // Initialise cart on first mount
    if (!_cart) {
      setLoading(true);
      initCart().finally(() => setLoading(false));
    }

    return () => window.removeEventListener(EVT, handler);
  }, []);

  const addToCart = useCallback(async (merchandiseId: string, quantity = 1) => {
    setLoading(true);
    try {
      await shopifyAddToCart(merchandiseId, quantity);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateQty = useCallback(async (lineId: string, quantity: number) => {
    setLoading(true);
    try {
      await shopifyUpdateQty(lineId, quantity);
    } finally {
      setLoading(false);
    }
  }, []);

  const removeLine = useCallback(async (lineId: string) => {
    setLoading(true);
    try {
      await shopifyRemoveLine(lineId);
    } finally {
      setLoading(false);
    }
  }, []);

  const lines = toDisplayLines(cart);
  const count = cart?.totalQuantity ?? 0;
  const totalGBP = lines.reduce((sum, l) => sum + l.priceGBP * l.qty, 0);

  return {
    lines,
    count,
    totalGBP,
    checkoutUrl: cart ? buildCheckoutUrl(cart.checkoutUrl) : null,
    loading,
    addToCart,
    updateQty,
    removeLine,
    checkout: redirectToCheckout,
  };
}

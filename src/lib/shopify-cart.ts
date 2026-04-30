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

const CART_ID_KEY = "melanvee_shopify_cart_id";
const EVT = "melanvee:shopify-cart";

// The React site URL we want Shopify to return users to after checkout
const STORE_URL = "https://melanvee.com";

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
  return localStorage.getItem(CART_ID_KEY);
}

function storeCartId(id: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_ID_KEY, id);
}

function clearCartId() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CART_ID_KEY);
}

// ─── Cart initialisation ───────────────────────────────────────────────────

async function initCart(): Promise<ShopifyCart> {
  const stored = getStoredCartId();

  if (stored) {
    try {
      const existing = await getCart(stored);
      if (existing) {
        _cart = existing;
        broadcast();
        return existing;
      }
    } catch {
      // Cart expired or invalid — create fresh
    }
    clearCartId();
  }

  const fresh = await createCart();
  storeCartId(fresh.id);

  // Set the return URL attribute on the cart so Shopify knows where to send
  // users back after purchase (belt-and-suspenders alongside the return_to param)
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
    _cart = updated;
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
 * Get the Shopify checkout URL and redirect the user.
 * Appends return_to so the "Back to store" / "Continue shopping" button on
 * Shopify's thank-you page sends the user back to melanvee.com instead of
 * the default Shopify theme storefront.
 */
export function redirectToCheckout(): void {
  if (!_cart?.checkoutUrl) {
    console.warn("No checkout URL available");
    return;
  }

  try {
    // Use URL API to safely append the return_to param regardless of
    // whether checkoutUrl already has query parameters
    const url = new URL(_cart.checkoutUrl);
    url.searchParams.set("return_to", STORE_URL);
    window.location.href = url.toString();
  } catch {
    // Fallback: if URL parsing fails for any reason, redirect without param
    window.location.href = _cart.checkoutUrl;
  }
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
  return cart.lines.edges.map(({ node }) => {
    const m = node.merchandise;
    return {
      lineId: node.id,
      variantId: m.id,
      productHandle: m.product.handle,
      name: m.product.title,
      variantTitle: m.title,
      image: m.product.images.edges[0]?.node.url ?? "",
      priceGBP: parsePrice(m.price.amount),
      qty: node.quantity,
    };
  });
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
    checkoutUrl: cart?.checkoutUrl ?? null,
    loading,
    addToCart,
    updateQty,
    removeLine,
    checkout: redirectToCheckout,
  };
}

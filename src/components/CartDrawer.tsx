import { useState, useEffect } from "react";
import { useCart, removeFromCart, updateQty } from "@/lib/cart";
import { useCurrency } from "@/lib/currency";

// Cart icon (SVG) used in header
export function CartIcon({ count }: { count: number }) {
  return (
    <span className="relative inline-flex">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden
      >
        <path d="M5 7h14l-1.5 11a2 2 0 0 1-2 1.7H8.5a2 2 0 0 1-2-1.7L5 7z" />
        <path d="M9 7V5a3 3 0 1 1 6 0v2" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-gold text-primary-foreground text-[10px] rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center font-medium">
          {count}
        </span>
      )}
    </span>
  );
}

// Use a stable object ref so openCart() can trigger the setter
// without causing it to be overwritten on every render.
const openSetterRef = { current: null as ((v: boolean) => void) | null };

export function openCart() {
  openSetterRef.current?.(true);
}

const FREE_SHIPPING_THRESHOLD = 120;

export function CartButton({ inverted = false }: { inverted?: boolean }) {
  const [open, setOpen] = useState(false);

  // Register the setter once, clean up on unmount
  useEffect(() => {
    openSetterRef.current = setOpen;
    return () => {
      openSetterRef.current = null;
    };
  }, []);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const { items, count, total } = useCart();
  const { format } = useCurrency();

  const remaining = FREE_SHIPPING_THRESHOLD - total;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`${inverted ? "text-cream" : "text-cream"} hover:text-gold transition-colors`}
        aria-label={`Open cart, ${count} items`}
      >
        <CartIcon count={count} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60]"
          role="dialog"
          aria-modal="true"
          aria-label="Shopping cart"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Drawer — h-screen + solid inline bg guarantees full height and no transparency */}
          <aside
            className="absolute right-0 top-0 h-screen w-full max-w-md flex flex-col animate-in slide-in-from-right duration-300"
            style={{ backgroundColor: "#1c1c1e" }}
          >
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between px-6 py-5 border-b border-white/10">
              <p className="font-display text-2xl text-cream">
                Your Cart
                {count > 0 && <span className="text-gold text-base ml-2">({count})</span>}
              </p>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-cream text-2xl leading-none hover:text-gold transition-colors"
                aria-label="Close cart"
              >
                ×
              </button>
            </div>

            {/* Scrollable item list — flex-1 + min-h-0 so it expands and scrolls correctly */}
            <div className="flex-1 min-h-0 overflow-y-auto px-6 py-6 space-y-6">
              {items.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-display text-xl text-cream mb-3">Your cart is empty</p>
                  <p className="text-sm text-mauve">Add a piece to begin.</p>
                </div>
              ) : (
                items.map((i) => (
                  <div
                    key={i.id}
                    className="flex justify-between gap-4 border-b border-white/10 pb-5 last:border-0"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-lg text-cream leading-snug truncate">
                        {i.name}
                      </p>
                      {i.inches && <p className="text-xs text-mauve mt-1">{i.inches}&quot;</p>}
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() => {
                            if (i.qty <= 1) {
                              removeFromCart(i.id);
                            } else {
                              updateQty(i.id, i.qty - 1);
                            }
                          }}
                          className="w-7 h-7 flex items-center justify-center border border-white/20 text-cream hover:border-gold hover:text-gold transition-colors"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="text-sm w-6 text-center text-cream tabular-nums">
                          {i.qty}
                        </span>
                        <button
                          onClick={() => updateQty(i.id, i.qty + 1)}
                          className="w-7 h-7 flex items-center justify-center border border-white/20 text-cream hover:border-gold hover:text-gold transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-display text-lg text-gold">{format(i.price * i.qty)}</p>
                      <button
                        onClick={() => removeFromCart(i.id)}
                        className="mt-2 text-[10px] uppercase tracking-luxe text-mauve hover:text-gold transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer — always pinned to bottom, never scrolls away */}
            <div className="flex-shrink-0 border-t border-white/10 px-6 py-5 space-y-4">
              {/* Shipping progress — only shown when cart has items */}
              {items.length > 0 &&
                (remaining > 0 ? (
                  <div className="rounded border border-gold/30 bg-black/40 px-4 py-3 text-[11px] uppercase tracking-wider text-gold">
                    Add {format(remaining)} more for free UK shipping
                  </div>
                ) : (
                  <div className="rounded border border-gold/30 bg-black/40 px-4 py-3 text-[11px] uppercase tracking-wider text-gold">
                    ✓ Free UK shipping unlocked
                  </div>
                ))}

              <div className="flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-luxe text-mauve">Subtotal</span>
                <span className="font-display text-2xl text-gold">{format(total)}</span>
              </div>

              <button
                disabled={items.length === 0}
                className="w-full bg-gold text-primary-foreground py-4 text-xs uppercase tracking-luxe hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={() =>
                  alert("Checkout coming soon — Stripe payments will be enabled before launch.")
                }
              >
                Checkout — {format(total)}
              </button>

              <p className="text-[10px] text-center text-mauve leading-relaxed">
                Secure checkout · Free UK shipping over £120 · All prices charged in GBP
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

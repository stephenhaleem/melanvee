import { useState } from "react";
import { useCart, removeFromCart, updateQty } from "@/lib/cart";
import { useCurrency } from "@/lib/currency";

// Cart icon (SVG) used in header
export function CartIcon({ count }: { count: number }) {
  return (
    <span className="relative inline-flex">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
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

let openSetterRef: ((v: boolean) => void) | null = null;

export function openCart() {
  openSetterRef?.(true);
}

export function CartButton({ inverted = false }: { inverted?: boolean }) {
  const [open, setOpen] = useState(false);
  openSetterRef = setOpen;

  const { items, count, total } = useCart();
  const { format } = useCurrency();

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
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-charcoal shadow-luxe flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <p className="font-display text-2xl text-cream">Your Cart{count > 0 && <span className="text-gold text-base ml-2">({count})</span>}</p>
              <button
                onClick={() => setOpen(false)}
                className="text-cream text-2xl leading-none hover:text-gold"
                aria-label="Close cart"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 && (
                <div className="text-center py-16">
                  <p className="font-display text-xl text-cream mb-3">Your cart is empty</p>
                  <p className="text-sm text-mauve">Add a piece to begin.</p>
                </div>
              )}
              {items.map((i) => (
                <div key={i.id} className="flex justify-between gap-4 border-b border-border pb-5">
                  <div>
                    <p className="font-display text-lg text-cream">{i.name}</p>
                    <p className="text-xs text-mauve mt-1">{i.inches}"</p>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => updateQty(i.id, i.qty - 1)}
                        className="w-7 h-7 border border-border text-cream hover:border-gold hover:text-gold"
                        aria-label="Decrease"
                      >−</button>
                      <span className="text-sm w-6 text-center text-cream">{i.qty}</span>
                      <button
                        onClick={() => updateQty(i.id, i.qty + 1)}
                        className="w-7 h-7 border border-border text-cream hover:border-gold hover:text-gold"
                        aria-label="Increase"
                      >+</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg text-gold">{format(i.price * i.qty)}</p>
                    <button
                      onClick={() => removeFromCart(i.id)}
                      className="mt-2 text-[10px] uppercase tracking-luxe text-mauve hover:text-gold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border p-6 space-y-4">
              {total > 0 && total < 120 && (
                <div className="bg-noir border border-gold/30 px-4 py-3 text-[11px] uppercase tracking-wider text-gold">
                  Add £{120 - total} more for free UK shipping
                </div>
              )}
              {total >= 120 && (
                <div className="bg-noir border border-gold/30 px-4 py-3 text-[11px] uppercase tracking-wider text-gold">
                  ✓ Free UK shipping unlocked
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-xs uppercase tracking-luxe text-mauve">Subtotal</span>
                <span className="font-display text-2xl text-gold">{format(total)}</span>
              </div>
              <button
                disabled={items.length === 0}
                className="w-full bg-gold text-primary-foreground py-4 text-xs uppercase tracking-luxe hover:shadow-rose-glow transition disabled:opacity-50"
                onClick={() => alert("Checkout coming soon — Stripe payments will be enabled before launch.")}
              >
                Checkout — {format(total)}
              </button>
              <p className="text-[10px] text-center text-mauve">
                Secure checkout · Free UK shipping over £120 · All prices charged in GBP
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

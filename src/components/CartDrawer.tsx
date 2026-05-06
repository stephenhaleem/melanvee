import { useState, useEffect, memo } from "react";
import { useShopifyCart } from "@/lib/shopify-cart";
import { useCurrency } from "@/lib/currency";

// ─── Cart Icon ─────────────────────────────────────────────────────────────

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

// ─── Global open trigger ───────────────────────────────────────────────────

const openSetterRef = { current: null as ((v: boolean) => void) | null };

export function openCart() {
  openSetterRef.current?.(true);
}

const FREE_SHIPPING_THRESHOLD = 100;

// ─── Cart Button + Drawer ──────────────────────────────────────────────────
// Wrapped in memo so cart state updates don't propagate re-renders up to Layout/Header

export const CartButton = memo(function CartButton({ inverted = false }: { inverted?: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    openSetterRef.current = setOpen;
    return () => {
      openSetterRef.current = null;
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const { lines, count, totalGBP, loading, updateQty, removeLine, checkout } = useShopifyCart();
  const { format } = useCurrency();

  const remaining = FREE_SHIPPING_THRESHOLD - totalGBP;

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

          {/* Drawer */}
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

            {/* Item list */}
            <div className="flex-1 min-h-0 overflow-y-auto px-6 py-6 space-y-6">
              {loading && lines.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-xs uppercase tracking-luxe text-mauve animate-pulse">
                    Loading…
                  </p>
                </div>
              ) : lines.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-display text-xl text-cream mb-3">Your cart is empty</p>
                  <p className="text-sm text-mauve">Add a piece to begin.</p>
                </div>
              ) : (
                lines.map((line) => (
                  <div
                    key={line.lineId}
                    className="flex justify-between gap-4 border-b border-white/10 pb-5 last:border-0"
                  >
                    {line.image && (
                      <div className="w-16 h-20 flex-shrink-0 overflow-hidden bg-noir">
                        <img
                          src={line.image}
                          alt={line.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="font-display text-lg text-cream leading-snug truncate">
                        {line.name}
                      </p>
                      {line.variantTitle && line.variantTitle !== "Default Title" && (
                        <p className="text-xs text-mauve mt-1">{line.variantTitle}</p>
                      )}

                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() => updateQty(line.lineId, line.qty - 1)}
                          disabled={loading}
                          className="w-7 h-7 flex items-center justify-center border border-white/20 text-cream hover:border-gold hover:text-gold transition-colors disabled:opacity-40"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="text-sm w-6 text-center text-cream tabular-nums">
                          {line.qty}
                        </span>
                        <button
                          onClick={() => updateQty(line.lineId, line.qty + 1)}
                          disabled={loading}
                          className="w-7 h-7 flex items-center justify-center border border-white/20 text-cream hover:border-gold hover:text-gold transition-colors disabled:opacity-40"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="font-sans text-lg text-gold">
                        {format(line.priceGBP * line.qty)}
                      </p>
                      <button
                        onClick={() => removeLine(line.lineId)}
                        disabled={loading}
                        className="mt-2 text-[10px] uppercase tracking-luxe text-mauve hover:text-gold transition-colors disabled:opacity-40"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 border-t border-white/10 px-6 py-5 space-y-4">
              {lines.length > 0 &&
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
                <span className="font-sans text-2xl text-gold">{format(totalGBP)}</span>
              </div>

              <button
                disabled={lines.length === 0 || loading}
                onClick={checkout}
                className="w-full bg-gold text-primary-foreground py-4 text-xs uppercase tracking-luxe hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? "Updating…" : `Checkout — ${format(totalGBP)}`}
              </button>

              <p className="text-[10px] text-center text-mauve leading-relaxed">
                Secure checkout · Free UK shipping over £100 · All prices charged in GBP
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
});

import { useState, useEffect, memo } from "react";
import { useShopifyCart } from "@/lib/shopify-cart";
import { useCurrency } from "@/lib/currency";

const PINK = "#E8938A";
const PINK_D = "#D4706A";
const CREAM = "#F0E6DC";
const MAUVE = "#c9b5a8";
const DARK = "#1e1009";
const SURFACE = "#2a1810";
const SURFACE2 = "#352219";
const BORDER = "rgba(240,230,220,0.1)";

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
        <span
          className="absolute -top-2 -right-2 text-[10px] rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center font-medium"
          style={{ backgroundColor: PINK, color: DARK }}
        >
          {count}
        </span>
      )}
    </span>
  );
}

const openSetterRef = { current: null as ((v: boolean) => void) | null };
export function openCart() {
  openSetterRef.current?.(true);
}

const FREE_SHIPPING_THRESHOLD = 100;

export const CartButton = memo(function CartButton() {
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
        aria-label={`Open cart, ${count} items`}
        style={{ color: "inherit" }}
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
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
            onClick={() => setOpen(false)}
          />

          <aside
            className="absolute right-0 top-0 h-[100dvh] w-full max-w-md flex flex-col animate-in slide-in-from-right duration-300"
            style={{ backgroundColor: SURFACE }}
          >
            {/* Header */}
            <div
              className="flex-shrink-0 flex items-center justify-between px-6 py-5"
              style={{ borderBottom: `1px solid ${BORDER}` }}
            >
              <p className="font-display text-2xl" style={{ color: CREAM }}>
                Your Cart
                {count > 0 && (
                  <span className="text-base ml-2" style={{ color: PINK }}>
                    ({count})
                  </span>
                )}
              </p>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-2xl leading-none transition-colors"
                style={{ color: CREAM }}
                onMouseEnter={(e) => (e.currentTarget.style.color = PINK)}
                onMouseLeave={(e) => (e.currentTarget.style.color = CREAM)}
                aria-label="Close cart"
              >
                ×
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 min-h-0 overflow-y-auto px-6 py-6 space-y-6">
              {loading && lines.length === 0 ? (
                <div className="text-center py-20">
                  <p
                    className="text-xs uppercase tracking-luxe animate-pulse"
                    style={{ color: MAUVE }}
                  >
                    Loading…
                  </p>
                </div>
              ) : lines.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-display text-xl mb-3" style={{ color: CREAM }}>
                    Your cart is empty
                  </p>
                  <p className="text-sm" style={{ color: MAUVE }}>
                    Add a piece to begin.
                  </p>
                </div>
              ) : (
                lines.map((line) => (
                  <div
                    key={line.lineId}
                    className="flex justify-between gap-4 pb-5 last:border-0"
                    style={{ borderBottom: `1px solid ${BORDER}` }}
                  >
                    {line.image && (
                      <div
                        className="w-16 h-20 flex-shrink-0 overflow-hidden"
                        style={{ backgroundColor: SURFACE2 }}
                      >
                        <img
                          src={line.image}
                          alt={line.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-display text-lg leading-snug truncate"
                        style={{ color: CREAM }}
                      >
                        {line.name}
                      </p>
                      {line.variantTitle && line.variantTitle !== "Default Title" && (
                        <p className="text-xs mt-1" style={{ color: MAUVE }}>
                          {line.variantTitle}
                        </p>
                      )}
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() => updateQty(line.lineId, line.qty - 1)}
                          disabled={loading}
                          className="w-7 h-7 flex items-center justify-center transition-colors disabled:opacity-40"
                          style={{ border: `1px solid ${BORDER}`, color: CREAM }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = PINK;
                            e.currentTarget.style.color = PINK;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = BORDER;
                            e.currentTarget.style.color = CREAM;
                          }}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span
                          className="text-sm w-6 text-center tabular-nums"
                          style={{ color: CREAM }}
                        >
                          {line.qty}
                        </span>
                        <button
                          onClick={() => updateQty(line.lineId, line.qty + 1)}
                          disabled={loading}
                          className="w-7 h-7 flex items-center justify-center transition-colors disabled:opacity-40"
                          style={{ border: `1px solid ${BORDER}`, color: CREAM }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = PINK;
                            e.currentTarget.style.color = PINK;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = BORDER;
                            e.currentTarget.style.color = CREAM;
                          }}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-sans text-lg" style={{ color: PINK }}>
                        {format(line.priceGBP * line.qty)}
                      </p>
                      <button
                        onClick={() => removeLine(line.lineId)}
                        disabled={loading}
                        className="mt-2 text-[10px] uppercase tracking-luxe transition-colors disabled:opacity-40"
                        style={{ color: MAUVE }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = PINK)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = MAUVE)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div
              className="flex-shrink-0 px-6 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] space-y-4"
              style={{ borderTop: `1px solid ${BORDER}` }}
            >
              {lines.length > 0 && (
                <div
                  className="px-4 py-3 text-[11px] uppercase tracking-wider"
                  style={{
                    border: `1px solid rgba(232,147,138,0.3)`,
                    backgroundColor: "rgba(232,147,138,0.08)",
                    color: PINK,
                  }}
                >
                  {remaining > 0
                    ? `Add ${format(remaining)} more for free UK shipping`
                    : "✓ Free UK shipping unlocked"}
                </div>
              )}

              <div className="flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-luxe" style={{ color: MAUVE }}>
                  Subtotal
                </span>
                <span className="font-sans text-2xl" style={{ color: PINK }}>
                  {format(totalGBP)}
                </span>
              </div>

              <button
                disabled={lines.length === 0 || loading}
                onClick={checkout}
                className="w-full py-4 text-xs uppercase tracking-luxe transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: PINK, color: DARK }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PINK_D)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PINK)}
              >
                {loading ? "Updating…" : `Checkout — ${format(totalGBP)}`}
              </button>

              <p className="text-[10px] text-center leading-relaxed" style={{ color: MAUVE }}>
                Secure checkout · Free UK shipping over £100 · All prices in GBP
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
});

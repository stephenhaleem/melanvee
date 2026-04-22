import { useState } from "react";
import { useCart, removeFromCart, updateQty } from "@/lib/cart";

export function CartButton() {
  const [open, setOpen] = useState(false);
  const { items, count, total } = useCart();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative text-xs uppercase tracking-luxe text-noir hover:text-gold transition-colors"
        aria-label="Open cart"
      >
        Cart
        {count > 0 && (
          <span className="absolute -top-2 -right-4 bg-gold text-primary-foreground text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
            {count}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-noir/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-luxe flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <p className="font-display text-2xl text-noir">Your Cart</p>
              <button
                onClick={() => setOpen(false)}
                className="text-noir text-2xl leading-none"
                aria-label="Close cart"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 && (
                <p className="text-sm text-mauve text-center py-12">
                  Your cart is empty.
                </p>
              )}
              {items.map((i) => (
                <div key={i.id} className="flex justify-between gap-4 border-b border-border pb-4">
                  <div>
                    <p className="font-display text-lg text-noir">{i.name}</p>
                    <p className="text-xs text-mauve mt-1">{i.inches}"</p>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => updateQty(i.id, i.qty - 1)}
                        className="w-7 h-7 border border-border text-noir hover:border-gold"
                        aria-label="Decrease"
                      >−</button>
                      <span className="text-sm w-6 text-center">{i.qty}</span>
                      <button
                        onClick={() => updateQty(i.id, i.qty + 1)}
                        className="w-7 h-7 border border-border text-noir hover:border-gold"
                        aria-label="Increase"
                      >+</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg text-gold">£{i.price * i.qty}</p>
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
              <div className="flex justify-between">
                <span className="text-xs uppercase tracking-luxe text-mauve">Subtotal</span>
                <span className="font-display text-2xl text-gold">£{total}</span>
              </div>
              <button
                disabled={items.length === 0}
                className="w-full bg-gold text-primary-foreground py-4 text-xs uppercase tracking-luxe hover:shadow-rose-glow transition disabled:opacity-50"
                onClick={() => alert("Checkout coming soon — payments not yet enabled.")}
              >
                Checkout
              </button>
              <p className="text-[10px] text-center text-mauve">
                Secure checkout · Free UK shipping over £200
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

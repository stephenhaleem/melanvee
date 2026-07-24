import { useState } from "react";
import { CURRENCIES, useCurrency, setCurrency } from "@/lib/currency";

export function CurrencySwitcher() {
  const [open, setOpen] = useState(false);
  const { currency } = useCurrency();

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 text-xs uppercase tracking-luxe transition-colors px-4 py-2 border"
        style={{ color: "rgba(251,243,231,0.75)", borderColor: "rgba(255,255,255,0.18)" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#E7A6B6")}
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.color = "rgba(251,243,231,0.75)")
        }
        aria-label="Change country and currency"
      >
        <span>{currency.flag}</span>
        <span>{currency.country}</span>
        <span className="text-gold">·</span>
        <span>{currency.code}</span>
        <span className={`text-gold transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute bottom-full left-0 mb-2 w-64 max-h-80 overflow-y-auto bg-charcoal border border-border shadow-luxe z-40">
            {Object.values(CURRENCIES).map((c) => (
              <button
                key={c.code}
                onClick={() => {
                  setCurrency(c.code);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-xs uppercase tracking-wider hover:bg-noir transition-colors text-left ${
                  c.code === currency.code ? "text-gold" : "text-mauve"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-base">{c.flag}</span>
                  <span>{c.country}</span>
                </span>
                <span>{c.code}</span>
              </button>
            ))}
          </div>
          <p className="absolute bottom-full left-0 mb-2 translate-y-full text-[10px] text-mauve mt-1 normal-case tracking-normal">
            Display only · checkout in GBP
          </p>
        </>
      )}
    </div>
  );
}

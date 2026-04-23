import { useEffect, useState } from "react";

export type Currency = {
  code: string;
  symbol: string;
  rate: number; // multiplier from GBP
  country: string;
  flag: string;
};

export const CURRENCIES: Record<string, Currency> = {
  GBP: { code: "GBP", symbol: "£", rate: 1, country: "United Kingdom", flag: "🇬🇧" },
  EUR: { code: "EUR", symbol: "€", rate: 1.17, country: "Europe", flag: "🇪🇺" },
  USD: { code: "USD", symbol: "$", rate: 1.27, country: "United States", flag: "🇺🇸" },
  CAD: { code: "CAD", symbol: "C$", rate: 1.74, country: "Canada", flag: "🇨🇦" },
  AUD: { code: "AUD", symbol: "A$", rate: 1.94, country: "Australia", flag: "🇦🇺" },
  NGN: { code: "NGN", symbol: "₦", rate: 2050, country: "Nigeria", flag: "🇳🇬" },
  ZAR: { code: "ZAR", symbol: "R", rate: 23.5, country: "South Africa", flag: "🇿🇦" },
  AED: { code: "AED", symbol: "د.إ", rate: 4.66, country: "United Arab Emirates", flag: "🇦🇪" },
};

const KEY = "melanvee_currency_v1";
const EVT = "melanvee:currency";

function read(): string {
  if (typeof window === "undefined") return "GBP";
  try {
    return localStorage.getItem(KEY) || "GBP";
  } catch {
    return "GBP";
  }
}

export function setCurrency(code: string) {
  if (typeof window === "undefined") return;
  if (!CURRENCIES[code]) return;
  localStorage.setItem(KEY, code);
  window.dispatchEvent(new CustomEvent(EVT));
}

export function useCurrency() {
  const [code, setCode] = useState<string>("GBP");
  useEffect(() => {
    setCode(read());
    const refresh = () => setCode(read());
    window.addEventListener(EVT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(EVT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);
  const currency = CURRENCIES[code] || CURRENCIES.GBP;
  const format = (gbp: number) => {
    const converted = gbp * currency.rate;
    // No decimals for huge numbers (NGN), 2 decimals otherwise
    if (currency.rate > 100) {
      return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${currency.symbol}${converted.toFixed(0)}`;
  };
  return { currency, code, format };
}

// Static format helper for non-component contexts (defaults GBP)
export function formatGBP(gbp: number): string {
  return `£${gbp}`;
}

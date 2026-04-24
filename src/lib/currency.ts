import { useEffect, useState } from "react";

export type Currency = {
  code: string;
  symbol: string;
  rate: number; // multiplier from GBP
  country: string;
  flag: string;
};

// Base metadata — rates are overwritten by live fetch
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
const RATES_KEY = "melanvee_rates_v1";
const RATES_TS = "melanvee_rates_ts_v1";
const EVT = "melanvee:currency";
const RATES_EVT = "melanvee:rates";

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

function readCode(): string {
  if (typeof window === "undefined") return "GBP";
  try {
    return localStorage.getItem(KEY) || "GBP";
  } catch {
    return "GBP";
  }
}

function readCachedRates(): Record<string, number> | null {
  if (typeof window === "undefined") return null;
  try {
    const ts = Number(localStorage.getItem(RATES_TS) || "0");
    if (Date.now() - ts > CACHE_TTL_MS) return null;
    const raw = localStorage.getItem(RATES_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCachedRates(rates: Record<string, number>) {
  try {
    localStorage.setItem(RATES_KEY, JSON.stringify(rates));
    localStorage.setItem(RATES_TS, String(Date.now()));
  } catch {
    /* quota — ignore */
  }
}

function applyRates(rates: Record<string, number>) {
  for (const code of Object.keys(CURRENCIES)) {
    if (code !== "GBP" && rates[code] != null) {
      CURRENCIES[code].rate = rates[code];
    }
  }
}

async function fetchLiveRates(): Promise<void> {
  const cached = readCachedRates();
  if (cached) {
    applyRates(cached);
    window.dispatchEvent(new CustomEvent(RATES_EVT));
    return;
  }
  try {
    const codes = Object.keys(CURRENCIES)
      .filter((c) => c !== "GBP")
      .join(",");
    const res = await fetch(`https://api.frankfurter.app/latest?base=GBP&symbols=${codes}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const rates: Record<string, number> = data.rates ?? {};
    applyRates(rates);
    writeCachedRates(rates);
    window.dispatchEvent(new CustomEvent(RATES_EVT));
  } catch (err) {
    console.warn("[currency] Live rate fetch failed, using fallback rates:", err);
  }
}

// Fetch on module load (client only)
if (typeof window !== "undefined") {
  fetchLiveRates();
}

export function setCurrency(code: string) {
  if (typeof window === "undefined" || !CURRENCIES[code]) return;
  localStorage.setItem(KEY, code);
  window.dispatchEvent(new CustomEvent(EVT));
}

export function useCurrency() {
  const [code, setCode] = useState<string>("GBP");
  const [rateVersion, setRateVersion] = useState(0);

  useEffect(() => {
    setCode(readCode());
    const onCode = () => setCode(readCode());
    const onRates = () => setRateVersion((v) => v + 1);
    window.addEventListener(EVT, onCode);
    window.addEventListener("storage", onCode);
    window.addEventListener(RATES_EVT, onRates);
    return () => {
      window.removeEventListener(EVT, onCode);
      window.removeEventListener("storage", onCode);
      window.removeEventListener(RATES_EVT, onRates);
    };
  }, []);

  const currency = CURRENCIES[code] || CURRENCIES.GBP;

  const format = (gbp: number) => {
    const converted = gbp * currency.rate;
    if (currency.rate >= 100) {
      return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
    }
    const fixed = converted.toFixed(2);
    return `${currency.symbol}${fixed.endsWith(".00") ? converted.toFixed(0) : fixed}`;
  };

  return { currency, code, format, rateVersion };
}

// Static helper for non-component contexts (always GBP)
export function formatGBP(gbp: number): string {
  return `£${gbp.toFixed(2)}`;
}

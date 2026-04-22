import { useEffect, useState } from "react";

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  inches: number;
  price: number;
  qty: number;
};

const KEY = "melanvee_cart_v1";
const EVT = "melanvee:cart";

function read(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function write(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(EVT));
}

export function addToCart(item: Omit<CartItem, "id" | "qty">) {
  const items = read();
  const id = `${item.productId}-${item.inches}`;
  const existing = items.find((i) => i.id === id);
  if (existing) existing.qty += 1;
  else items.push({ ...item, id, qty: 1 });
  write(items);
}

export function removeFromCart(id: string) {
  write(read().filter((i) => i.id !== id));
}

export function updateQty(id: string, qty: number) {
  const items = read()
    .map((i) => (i.id === id ? { ...i, qty: Math.max(0, qty) } : i))
    .filter((i) => i.qty > 0);
  write(items);
}

export function clearCart() {
  write([]);
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => {
    setItems(read());
    const refresh = () => setItems(read());
    window.addEventListener(EVT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(EVT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);
  return { items, count, total };
}

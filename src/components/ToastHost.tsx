import { useEffect, useState } from "react";

type Toast = { id: number; text: string };
const EVT = "melanvee:toast";

export function showToast(text: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EVT, { detail: text }));
}

export function ToastHost() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  useEffect(() => {
    const handler = (e: Event) => {
      const text = (e as CustomEvent<string>).detail;
      const id = Date.now() + Math.random();
      setToasts((t) => [...t, { id, text }]);
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
    };
    window.addEventListener(EVT, handler);
    return () => window.removeEventListener(EVT, handler);
  }, []);

  return (
    <div className="fixed bottom-24 right-6 z-[70] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="bg-noir text-cream px-5 py-3 text-xs uppercase tracking-luxe shadow-luxe animate-in fade-in slide-in-from-bottom-2"
        >
          {t.text}
        </div>
      ))}
    </div>
  );
}

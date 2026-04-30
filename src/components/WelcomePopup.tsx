import { useEffect, useState } from "react";
import { subscribeToNewsletter } from "@/lib/newsletter";

const KEY = "melanvee_welcome_seen_v1";
const CODE = "FEEL5";

export function WelcomePopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [stage, setStage] = useState<"form" | "submitting" | "code">("form");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY)) return;
    } catch {
      return;
    }
    const t = setTimeout(() => setOpen(true), 4000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    setOpen(false);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStage("submitting");
    setError(null);

    const { ok } = await subscribeToNewsletter(email, "popup");

    if (!ok) {
      setError("Something went wrong — please try again.");
      setStage("form");
      return;
    }

    try {
      localStorage.setItem(KEY, "1");
    } catch {}

    setStage("code");
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={close} />
      <div className="relative w-full max-w-md bg-charcoal border border-gold/30 shadow-luxe">
        <button
          onClick={close}
          className="absolute top-3 right-4 text-cream/60 hover:text-gold text-2xl leading-none"
          aria-label="Close"
        >
          ×
        </button>

        {stage === "form" || stage === "submitting" ? (
          <div className="p-10 text-center">
            <p className="text-xs uppercase tracking-luxe text-gold mb-4">— First Time Here?</p>
            <h3 className="font-display text-3xl text-cream leading-tight">
              <em className="italic text-gradient-rose">5% off</em>
              <br /> your first order.
            </h3>
            <p className="mt-4 text-sm text-mauve leading-relaxed">
              Drop your email — we'll send your code and let you know when new textures land. No
              spam, ever.
            </p>
            <form onSubmit={onSubmit} className="mt-8 space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                disabled={stage === "submitting"}
                className="w-full bg-transparent border border-border focus:border-gold outline-none px-4 py-3 text-sm text-cream placeholder:text-mauve transition-colors disabled:opacity-50"
              />
              {error && (
                <p className="text-[11px] text-rose-400 uppercase tracking-wider">{error}</p>
              )}
              <button
                type="submit"
                disabled={stage === "submitting"}
                className="w-full bg-gold text-primary-foreground py-3 text-xs uppercase tracking-luxe hover:shadow-rose-glow transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {stage === "submitting" ? "Subscribing…" : "Get my 5% off"}
              </button>
            </form>
            <button
              onClick={close}
              className="mt-4 text-[10px] uppercase tracking-luxe text-mauve hover:text-cream"
            >
              No thanks
            </button>
          </div>
        ) : (
          <div className="p-10 text-center">
            <p className="text-xs uppercase tracking-luxe text-gold mb-4">— Welcome to MELANVÉE</p>
            <h3 className="font-display text-3xl text-cream leading-tight">
              Your <em className="italic text-gradient-rose">code</em>.
            </h3>
            <p className="mt-4 text-sm text-mauve">
              Use this at checkout — first order, new customers only.
            </p>
            <div className="mt-8 border border-gold/40 px-6 py-6">
              <p className="font-display text-4xl text-gold tracking-[0.4em]">{CODE}</p>
            </div>
            <p className="mt-4 text-[10px] uppercase tracking-luxe text-mauve">
              Check your inbox — we've sent it over too.
            </p>
            <button
              onClick={close}
              className="mt-8 w-full bg-gold text-primary-foreground py-3 text-xs uppercase tracking-luxe hover:shadow-rose-glow transition"
            >
              Start shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

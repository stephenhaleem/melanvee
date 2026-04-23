import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CartButton } from "./CartDrawer";

const nav = [
  { to: "/", label: "Home" },
  { to: "/collection", label: "Shop" },
  { to: "/texture-guide", label: "Texture" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/collaborate", label: "Collab" },
  { to: "/contact", label: "Contact" },
] as const;

const BRAND = "M E L A N V É E";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ink/90 backdrop-blur-xl border-b border-border"
          : "bg-ink/40 backdrop-blur-sm"
      }`}
    >
      {/* Free shipping bar */}
      <div className="bg-gold/10 border-b border-gold/20 text-center py-1.5 text-[10px] uppercase tracking-luxe text-gold">
        Free UK shipping over £120 · Worldwide delivery
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 lg:h-20 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-display text-sm md:text-xl tracking-[0.25em] text-cream">
            {BRAND}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-xs uppercase tracking-luxe text-mauve hover:text-gold transition-colors duration-300"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: true }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <Link
            to="/collection"
            className="hidden lg:inline-flex text-xs uppercase tracking-luxe border border-gold/40 px-5 py-2.5 text-gold hover:bg-gold hover:text-primary-foreground transition-all duration-300"
          >
            Shop
          </Link>

          {/* Cart icon — always visible */}
          <CartButton />

          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden text-cream"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`h-px bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-px bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`h-px bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-ink/95 backdrop-blur-xl">
          <nav className="flex flex-col px-6 py-6 gap-5">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-xs uppercase tracking-luxe text-mauve"
                activeProps={{ className: "text-gold" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

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
      <div className="bg-gold/10 border-b border-gold/20 text-center py-2 text-[10px] uppercase tracking-luxe text-gold">
        Free UK shipping over £100 · Worldwide delivery
      </div>

      {/* Main bar */}
      <div className="max-w-7xl mx-auto px-5 lg:px-10 h-16 lg:h-20 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link to="/" className="flex-shrink-0 group">
          <span className="font-display text-base md:text-xl tracking-[0.3em] text-cream group-hover:text-gold transition-colors duration-300">
            {BRAND}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[11px] uppercase tracking-luxe text-mauve hover:text-gold transition-colors duration-300 relative after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              activeProps={{ className: "text-gold after:w-full" }}
              activeOptions={{ exact: true }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <Link
            to="/collection"
            className="hidden lg:inline-flex text-[11px] uppercase tracking-luxe border border-gold/40 px-4 py-2 text-gold hover:bg-gold hover:text-primary-foreground transition-all duration-300"
          >
            Shop Now
          </Link>

          <CartButton />

          {/* Hamburger */}
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden text-cream p-1"
          >
            <div className="w-6 flex flex-col gap-[5px]">
              <span
                className={`block h-px bg-current transition-all duration-300 origin-center ${open ? "translate-y-[7px] rotate-45" : ""}`}
              />
              <span
                className={`block h-px bg-current transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`}
              />
              <span
                className={`block h-px bg-current transition-all duration-300 origin-center ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="lg:hidden border-t border-border bg-ink/95 backdrop-blur-xl">
          <nav className="flex flex-col px-5 py-6 gap-5">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-[11px] uppercase tracking-luxe text-mauve hover:text-gold transition-colors duration-200"
                activeProps={{ className: "text-gold" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/collection"
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex w-fit text-[11px] uppercase tracking-luxe border border-gold/40 px-4 py-2 text-gold hover:bg-gold hover:text-primary-foreground transition-all duration-300"
            >
              Shop Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

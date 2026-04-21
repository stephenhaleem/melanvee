import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/collection", label: "Collection" },
  { to: "/about", label: "About" },
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
          ? "bg-background/85 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-display text-lg md:text-xl tracking-[0.25em] text-noir">
            {BRAND}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-xs uppercase tracking-luxe text-muted-foreground hover:text-gold transition-colors duration-300"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: true }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/collection"
          className="hidden md:inline-flex text-xs uppercase tracking-luxe border border-gold/40 px-5 py-2.5 text-gold hover:bg-gold hover:text-primary-foreground transition-all duration-300"
        >
          Shop
        </Link>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-noir"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`h-px bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-px bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-px bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <nav className="flex flex-col px-6 py-6 gap-5">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-xs uppercase tracking-luxe text-muted-foreground"
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

import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CartButton } from "./CartDrawer";

const nav = [
  { to: "/", label: "Home" },
  { to: "/collection", label: "Shop" },
  { to: "/texture-guide", label: "Texture" },
  { to: "/how-to-wear", label: "Wear & Care" },
  { to: "/about", label: "About" },
  { to: "/collaborate", label: "Collab" },
  { to: "/contact", label: "Contact" },
] as const;

const BRAND = "M E L A N V É E";

// Inline hover helper to avoid Tailwind conflicts with inline style colours
function NavLink({ to, label, onClick }: { to: string; label: string; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={to}
      onClick={onClick}
      className="text-[11px] uppercase tracking-luxe transition-colors duration-300 relative after:absolute after:bottom-[-3px] after:left-0 after:h-px after:bg-[#c47a4a] after:transition-all after:duration-300 hover:after:w-full after:w-0"
      style={{ color: hovered ? "#c47a4a" : "#6b4c36" }}
      activeProps={{ style: { color: "#c47a4a" }, className: "after:w-full" }}
      activeOptions={{ exact: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </Link>
  );
}

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
    <header className="fixed top-0 inset-x-0 z-50">
      {/* ── Announcement bar ─── deep espresso, easy to read ── */}
      <div style={{ backgroundColor: "#2c1a0e" }} className="overflow-hidden py-[9px]">
        <div
          className="animate-marquee whitespace-nowrap text-[10px] uppercase tracking-luxe"
          style={{ color: "#d9c4ae" }}
        >
          {/* Repeated so the marquee loop looks seamless */}
          Free UK &amp; international shipping on orders over £100 &nbsp;&nbsp;·&nbsp;&nbsp; Premium
          virgin human hair · 4A to 4C textures &nbsp;&nbsp;·&nbsp;&nbsp; Free UK &amp;
          international shipping on orders over £100 &nbsp;&nbsp;·&nbsp;&nbsp; Premium virgin human
          hair · 4A to 4C textures &nbsp;&nbsp;·&nbsp;&nbsp;
        </div>
      </div>

      {/* ── Main bar ─── parchment, full opacity once scrolled ── */}
      <div
        style={{
          backgroundColor: scrolled ? "rgba(250,246,240,0.97)" : "rgba(250,246,240,0.88)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: scrolled
            ? "1px solid rgba(44,26,14,0.13)"
            : "1px solid rgba(44,26,14,0.07)",
          transition: "background-color 0.4s, border-color 0.4s, box-shadow 0.4s",
          boxShadow: scrolled ? "0 2px 20px rgba(44,26,14,0.08)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-10 h-16 lg:h-20 flex items-center justify-between gap-4">
          {/* Brand wordmark */}
          <Link to="/" className="flex-shrink-0">
            <span
              className="font-display text-base md:text-xl tracking-[0.3em] transition-colors duration-300 hover:text-[#c47a4a]"
              style={{ color: "#2c1a0e" }}
            >
              {BRAND}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to} label={item.label} />
            ))}
          </nav>

          {/* Right: CTA + cart + hamburger */}
          <div className="flex items-center gap-4">
            {/* Filled amber-brown CTA button */}
            <Link
              to="/collection"
              className="hidden lg:inline-flex items-center text-[11px] uppercase tracking-luxe px-5 py-2.5 transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{
                backgroundColor: "#c47a4a",
                color: "#faf6f0",
              }}
            >
              Shop Now
            </Link>

            {/* Cart — inherits espresso colour from wrapper */}
            <span style={{ color: "#2c1a0e" }} className="hover:text-[#c47a4a] transition-colors">
              <CartButton />
            </span>

            {/* Hamburger */}
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden p-1 transition-colors"
              style={{ color: "#2c1a0e" }}
            >
              <div className="w-6 flex flex-col gap-[5px]">
                <span
                  className={`block h-px bg-current origin-center transition-all duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`}
                />
                <span
                  className={`block h-px bg-current transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`}
                />
                <span
                  className={`block h-px bg-current origin-center transition-all duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      {open && (
        <div
          style={{
            backgroundColor: "#faf6f0",
            borderBottom: "1px solid rgba(44,26,14,0.12)",
          }}
        >
          <nav className="flex flex-col px-5 py-6 gap-5">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                label={item.label}
                onClick={() => setOpen(false)}
              />
            ))}
            <Link
              to="/collection"
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex w-fit text-[11px] uppercase tracking-luxe px-5 py-2.5 transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#c47a4a", color: "#faf6f0" }}
            >
              Shop Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

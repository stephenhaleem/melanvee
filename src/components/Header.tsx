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
const CREAM = "var(--ivory)";
const MAUVE = "var(--mauve)";
const DARK = "var(--burgundy)";
const SURFACE = "var(--burgundy)";
const COCOA = "var(--burgundy)";
const BORDER = "rgba(74,18,32,0.1)";

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
      {/* Announcement bar */}
      <div style={{ backgroundColor: COCOA }} className="overflow-hidden py-[9px]">
        <div
          className="animate-marquee whitespace-nowrap inline-block text-[10px] uppercase tracking-luxe"
          style={{ color: CREAM }}
        >
          Free UK &amp; international shipping on orders over £100 &nbsp;&nbsp;·&nbsp;&nbsp; Premium
          virgin human hair &nbsp;&nbsp;·&nbsp;&nbsp; True 3A to 4C textures
          &nbsp;&nbsp;·&nbsp;&nbsp; No lace · No glue &nbsp;&nbsp;·&nbsp;&nbsp; Free UK &amp;
          international shipping on orders over £100 &nbsp;&nbsp;·&nbsp;&nbsp; Premium virgin human
          hair &nbsp;&nbsp;·&nbsp;&nbsp; True 3A to 4C textures &nbsp;&nbsp;·&nbsp;&nbsp; No lace ·
          No glue &nbsp;&nbsp;·&nbsp;&nbsp;
        </div>
      </div>

      {/* Main navbar */}
      <div
        style={{
          backgroundColor: scrolled ? "rgba(251,243,231,0.97)" : "rgba(251,243,231,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: `1px solid ${BORDER}`,
          boxShadow: scrolled ? "0 2px 30px rgba(0,0,0,0.4)" : "none",
          transition: "background-color 0.4s, box-shadow 0.4s",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-10 h-16 lg:h-20 flex items-center justify-between gap-4">
          {/* Brand */}
          <Link to="/" className="flex-shrink-0">
            <span
              className="font-display text-base md:text-xl tracking-[0.3em] transition-colors duration-300"
              style={{ color: CREAM }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--secondary)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = CREAM)}
            >
              {BRAND}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-[11px] uppercase tracking-luxe transition-colors duration-300 relative group"
                style={{ color: CREAM }}
                activeProps={{ style: { color: "var(--secondary)" } }}
                activeOptions={{ exact: true }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--secondary)")
                }
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = CREAM)}
              >
                {item.label}
                <span
                  className="absolute bottom-[-3px] left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: "var(--secondary)" }}
                />
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-4">
            <Link
              to="/collection"
              className="hidden lg:inline-flex items-center text-[11px] uppercase tracking-luxe px-5 py-2.5 transition-all duration-200"
              style={{ backgroundColor: "var(--secondary)", color: "var(--burgundy)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--cream-warm)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--secondary)")
              }
            >
              Shop Now
            </Link>

            <span
              style={{ color: CREAM }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--secondary)")
              }
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = CREAM)}
              className="transition-colors duration-200"
            >
              <CartButton />
            </span>

            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden p-1"
              style={{ color: CREAM }}
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

      {/* Mobile dropdown */}
      {open && (
        <div style={{ backgroundColor: SURFACE, borderBottom: `1px solid ${BORDER}` }}>
          <nav className="flex flex-col px-5 py-6 gap-5">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-[11px] uppercase tracking-luxe transition-colors duration-200"
                style={{ color: MAUVE }}
                activeProps={{ style: { color: CREAM } }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = CREAM)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = MAUVE)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/collection"
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex w-fit text-[11px] uppercase tracking-luxe px-5 py-2.5 hover:opacity-85 transition-opacity"
              style={{ backgroundColor: "var(--secondary)", color: "var(--burgundy)" }}
            >
              Shop Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

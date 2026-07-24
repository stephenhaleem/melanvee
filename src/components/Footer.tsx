import { Link } from "@tanstack/react-router";
import { CurrencySwitcher } from "./CurrencySwitcher";

const BG = "#3D0B12"; // deep burgundy footer background
const CREAM = "#FBF3E7"; // primary light text
const MUTED = "rgba(251,243,231,0.72)"; // body / list text
const ACCENT = "#E7A6B6"; // soft blush accent — taglines, hover, labels
const BORDER = "rgba(255,255,255,0.1)";

const IG_URL = "https://instagram.com/melanvee.hair";
const TIKTOK_URL = "https://tiktok.com/@melanvee";

export function Footer() {
  return (
    <footer
      className="mt-32 site-footer"
      style={{ backgroundColor: BG, borderTop: `1px solid ${BORDER}` }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <p className="font-display text-2xl tracking-[0.25em]" style={{ color: CREAM }}>
            M E L A N V É E
          </p>
          <p className="mt-4 italic font-display text-lg" style={{ color: ACCENT }}>
            Made to feel like yours.
          </p>
          <p className="mt-4 text-sm max-w-sm leading-relaxed" style={{ color: MUTED }}>
            Half wigs and U-part wigs for women of colour. True 3A to 4C textures.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Social href={IG_URL} label="Instagram" cream={CREAM}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </Social>
            <Social href={TIKTOK_URL} label="TikTok" cream={CREAM}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.36a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.01z" />
              </svg>
            </Social>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-luxe mb-4" style={{ color: MUTED }}>
            Explore
          </p>
          <ul className="space-y-3 text-sm">
            {[
              ["/collection", "Collection"],
              ["/texture-guide", "Texture Guide"],
              ["/how-to-wear", "Wear & Care"],
              ["/about", "Our Story"],
              ["/collaborate", "Collaborate"],
              ["/faq", "FAQ"],
              ["/policies", "Policies"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link
                  to={to as any}
                  className="transition-colors duration-200"
                  style={{ color: MUTED }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-luxe mb-4" style={{ color: MUTED }}>
            Contact
          </p>
          <ul className="space-y-3 text-sm" style={{ color: MUTED }}>
            <li>customercare@melanvee.com</li>
            <li>
              woman@melanvee.com{" "}
              <span className="text-[10px] uppercase tracking-wider" style={{ color: MUTED }}>
                (collabs)
              </span>
            </li>
            <li>
              WhatsApp: +447760317678<span style={{ opacity: 0.7 }}>(Mon–Fri) 9am–4pm</span>
            </li>
            <li>London · Worldwide shipping</li>
          </ul>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${BORDER}` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-luxe" style={{ color: MUTED }}>
              Country / Currency
            </span>
            <CurrencySwitcher />
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${BORDER}` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs tracking-wide" style={{ color: ACCENT }}>
            © {new Date().getFullYear()} MELANVÉE. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-[10px] uppercase tracking-luxe">
            {["Shipping", "Returns", "All Policies"].map((label) => (
              <Link
                key={label}
                to="/policies"
                className="transition-colors duration-200"
                style={{ color: MUTED }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = ACCENT)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = MUTED)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function Social({
  href,
  label,
  cream,
  children,
}: {
  href: string;
  label: string;
  cream: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 inline-flex items-center justify-center transition-colors duration-200 social-link"
      style={{ border: "1px solid rgba(255,255,255,0.18)", color: cream }}
    >
      {children}
    </a>
  );
}

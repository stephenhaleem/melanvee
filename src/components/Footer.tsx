import { Link } from "@tanstack/react-router";

const IG_URL = "https://instagram.com/melanvee";
const TIKTOK_URL = "https://tiktok.com/@melanvee";

export function Footer() {
  return (
    <footer className="border-t border-border mt-32 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <p className="font-display text-2xl tracking-[0.25em] text-cream">
            M E L A N V É E
          </p>
          <p className="mt-4 italic font-display text-lg text-gold">
            Made to feel like yours.
          </p>
          <p className="mt-4 text-sm text-mauve max-w-sm leading-relaxed">
            Half wigs and U-part wigs for women of colour — true 4A–4C textures.
          </p>

          <div className="mt-6 flex items-center gap-4">
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 inline-flex items-center justify-center border border-border text-cream hover:text-gold hover:border-gold transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-10 h-10 inline-flex items-center justify-center border border-border text-cream hover:text-gold hover:border-gold transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.36a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.01z"/>
              </svg>
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-luxe text-gold mb-4">Explore</p>
          <ul className="space-y-3 text-sm text-mauve">
            <li><Link to="/collection" className="hover:text-cream transition-colors">Collection</Link></li>
            <li><Link to="/texture-guide" className="hover:text-cream transition-colors">Texture Guide</Link></li>
            <li><Link to="/about" className="hover:text-cream transition-colors">Our Story</Link></li>
            <li><Link to="/faq" className="hover:text-cream transition-colors">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-cream transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-luxe text-gold mb-4">Contact</p>
          <ul className="space-y-3 text-sm text-mauve">
            <li>hello@melanvee.co</li>
            <li>WhatsApp: +44 0000 000 000</li>
            <li>London · Worldwide shipping</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-mauve tracking-wide">
            © {new Date().getFullYear()} MELANVÉE. All rights reserved.
          </p>
          <p className="text-xs uppercase tracking-luxe text-mauve">
            Made to feel like yours
          </p>
        </div>
      </div>
    </footer>
  );
}

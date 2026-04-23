import { Link } from "@tanstack/react-router";
import { CurrencySwitcher } from "./CurrencySwitcher";

const IG_URL = "https://instagram.com/melanvee";
const TIKTOK_URL = "https://tiktok.com/@melanvee";
const PINTEREST_URL = "https://pinterest.com/melanvee";
const SNAPCHAT_URL = "https://snapchat.com/add/melanvee";

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

          <div className="mt-6 flex items-center gap-3">
            <Social href={IG_URL} label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </Social>
            <Social href={TIKTOK_URL} label="TikTok">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.36a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.01z" />
              </svg>
            </Social>
            <Social href={PINTEREST_URL} label="Pinterest">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.137.893 2.738a.36.36 0 0 1 .083.345c-.091.378-.293 1.193-.333 1.36-.053.219-.173.265-.4.16-1.501-.7-2.439-2.889-2.439-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.609 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
              </svg>
            </Social>
            <Social href={SNAPCHAT_URL} label="Snapchat">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12.166 0c5.296 0 7.158 4.187 7.158 8.27 0 .525-.014 1.115-.046 1.71l.005-.105c.07.04.21.082.358.082h.004c.21 0 .438-.06.633-.16l-.01.005c.224-.108.503-.165.795-.16h.005c.385.005.764.165.998.452.142.18.21.4.21.62 0 .424-.328.78-.76.95-.114.06-.27.115-.45.18-.36.135-.83.318-.96.6-.06.15-.04.345.077.59l-.003-.007c.34.79 1.84 4.43 5.49 5.03.265.045.45.275.43.54-.01.06-.02.12-.04.176-.27.62-1.5 1.082-3.74 1.41-.073.105-.16.5-.21.7-.05.21-.105.43-.18.66-.075.21-.24.31-.51.31h-.04c-.225 0-.45-.06-.78-.13-.27-.06-.6-.12-1.005-.12-.225 0-.46.025-.69.06-.45.075-.825.345-1.275.66-.66.45-1.395.96-2.55.96l-.118-.003-.105.003c-1.155 0-1.875-.51-2.55-.96-.435-.31-.825-.585-1.26-.66-.225-.04-.46-.06-.69-.06-.42 0-.75.075-1.005.12-.31.07-.555.12-.78.12-.33 0-.495-.21-.555-.32-.075-.225-.13-.45-.18-.66-.06-.225-.135-.6-.21-.7-2.265-.27-3.475-.74-3.74-1.36-.027-.058-.043-.118-.05-.183-.022-.27.16-.5.43-.55 3.65-.6 5.15-4.24 5.49-5.04.117-.245.137-.435.077-.59-.135-.285-.6-.465-.96-.6-.165-.06-.33-.12-.45-.18-.585-.225-.825-.495-.81-.945.014-.21.092-.41.21-.585.225-.285.61-.45.99-.45.092 0 .195.014.3.045.234.075.444.146.66.146.18 0 .315-.045.42-.105l.014.014c-.03-.582-.046-1.18-.046-1.71C4.83 4.21 6.674.024 12.166.024" />
              </svg>
            </Social>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-luxe text-gold mb-4">Explore</p>
          <ul className="space-y-3 text-sm text-mauve">
            <li><Link to="/collection" className="hover:text-cream transition-colors">Collection</Link></li>
            <li><Link to="/texture-guide" className="hover:text-cream transition-colors">Texture Guide</Link></li>
            <li><Link to="/about" className="hover:text-cream transition-colors">Our Story</Link></li>
            <li><Link to="/collaborate" className="hover:text-cream transition-colors">Collaborate</Link></li>
            <li><Link to="/faq" className="hover:text-cream transition-colors">FAQ</Link></li>
            <li><Link to="/policies" className="hover:text-cream transition-colors">Policies</Link></li>
            <li><Link to="/contact" className="hover:text-cream transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-luxe text-gold mb-4">Contact</p>
          <ul className="space-y-3 text-sm text-mauve">
            <li>hello@melanvee.com</li>
            <li>woman@melanvee.com <span className="text-[10px] uppercase tracking-wider text-gold/70">(collabs)</span></li>
            <li>WhatsApp: +44 0000 000 000</li>
            <li>London · Worldwide shipping</li>
          </ul>
        </div>
      </div>

      {/* Currency / country switcher */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-luxe text-mauve">Country / Currency</span>
            <CurrencySwitcher />
          </div>
          <p className="text-[10px] uppercase tracking-luxe text-mauve">
            All orders charged in GBP at checkout
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-mauve tracking-wide">
            © {new Date().getFullYear()} MELANVÉE. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-[10px] uppercase tracking-luxe">
            <Link to="/policies" className="text-mauve hover:text-gold">Shipping</Link>
            <Link to="/policies" className="text-mauve hover:text-gold">Returns</Link>
            <Link to="/policies" className="text-mauve hover:text-gold">All Policies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 inline-flex items-center justify-center border border-border text-cream hover:text-gold hover:border-gold transition-colors"
    >
      {children}
    </a>
  );
}

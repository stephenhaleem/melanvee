import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border mt-32 bg-blush-deep/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <p className="font-display text-2xl tracking-[0.25em] text-noir">
            M E L A N V É E
          </p>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
            Textured wigs for women of colour. Made with intention — for kinks,
            coils, curls, and the full softness of you.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-luxe text-gold mb-4">Explore</p>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/collection" className="hover:text-noir transition-colors">Collection</Link></li>
            <li><Link to="/about" className="hover:text-noir transition-colors">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-noir transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-luxe text-gold mb-4">Atelier</p>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>hello@melanvee.co</li>
            <li>WhatsApp: +44 0000 000 000</li>
            <li>London · Worldwide shipping</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground tracking-wide">
            © {new Date().getFullYear()} MELANVÉE. All rights reserved.
          </p>
          <p className="text-xs uppercase tracking-luxe text-muted-foreground">
            Crafted with intention
          </p>
        </div>
      </div>
    </footer>
  );
}

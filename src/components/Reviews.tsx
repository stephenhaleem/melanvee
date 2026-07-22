import { motion } from "framer-motion";

type Review = {
  name: string;
  initials: string;
  texture: string;
  product: string;
  text: string;
  rating: number;
};

const reviews: Review[] = [
  {
    name: "Amara O.",
    initials: "AO",
    texture: "4B natural",
    product: 'Zora Coil 18"',
    text: "I cried. I have not seen a wig match my actual hair this well — ever. My coworkers couldn't tell. My mum couldn't tell. Worth every penny.",
    rating: 5,
  },
  {
    name: "Tolu B.",
    initials: "TB",
    texture: "4A natural",
    product: 'Kimi Curl 20"',
    text: "Finally a 'curly' wig that actually looks like Black hair. The blend with my own leave-out is undetectable. Slipped it on in five minutes.",
    rating: 5,
  },
  {
    name: "Naomi K.",
    initials: "NK",
    texture: "Relaxed",
    product: 'Layla Bouncy 22"',
    text: "The waves are so soft. I sleep in this thing. Already on my second one — bought a longer length for a wedding.",
    rating: 5,
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 text-gold" aria-label={`${n} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < n ? "" : "opacity-25"}>
          ★
        </span>
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section className="py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-xs uppercase tracking-luxe text-gold mb-4">— She Said</p>
            <h2 className="font-display text-4xl md:text-6xl text-cream leading-tight max-w-2xl">
              Real women. <em className="italic text-gradient-blush">Real hair.</em>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <Stars n={5} />
            <p className="text-sm text-mauve">
              <span className="text-cream font-medium">4.9</span> · 200+ reviews
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="bg-card border border-border p-8 flex flex-col gap-5"
            >
              <Stars n={r.rating} />
              <blockquote className="font-display text-lg text-cream leading-snug italic">
                "{r.text}"
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-gold/20 text-gold flex items-center justify-center text-xs tracking-luxe">
                  {r.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-cream">{r.name}</p>
                    <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider text-gold border border-gold/40 px-1.5 py-0.5 leading-none">
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Verified
                    </span>
                  </div>
                  <p className="text-[10px] uppercase tracking-luxe text-mauve">
                    {r.texture} · {r.product}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <p className="mt-12 text-xs uppercase tracking-luxe text-mauve text-center">
          Photo reviews coming with launch — verified buyers only.
        </p>
      </div>
    </section>
  );
}

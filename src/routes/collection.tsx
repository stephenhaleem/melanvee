import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { products } from "@/data/products";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "Collection — Maison Noir" },
      { name: "description", content: "Three founding rituals: Élixir de Soie, Huile Précieuse, and Masque Nocturne." },
      { property: "og:title", content: "The Maison Noir Collection" },
      { property: "og:description", content: "Three small-batch hair rituals, cold-pressed and hand-poured in Paris." },
    ],
  }),
  component: Collection,
});

function Collection() {
  return (
    <Layout>
      <section className="pt-16 pb-12 text-center">
        <p className="text-xs uppercase tracking-luxe text-gold mb-5">— The Collection</p>
        <h1 className="font-display text-5xl md:text-7xl text-cream leading-tight">
          Three <em className="italic text-gradient-gold">rituals</em>.
        </h1>
        <p className="mt-6 text-muted-foreground max-w-xl mx-auto px-6">
          Our inaugural trilogy. Designed to live on a marble vanity and be
          reached for daily.
        </p>
        <div className="hairline mt-10 w-32 mx-auto" />
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-32 md:space-y-48">
          {products.map((p, i) => {
            const reverse = i % 2 === 1;
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={`grid md:grid-cols-2 gap-12 lg:gap-20 items-center ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="aspect-square overflow-hidden bg-card shadow-luxe">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.4s]"
                  />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-luxe text-gold mb-3">
                    N° 0{i + 1} · {p.volume}
                  </p>
                  <h2 className="font-display text-4xl md:text-5xl text-cream leading-tight">
                    {p.name}
                  </h2>
                  <p className="mt-3 text-gold/80 italic font-display text-lg">{p.tagline}</p>
                  <div className="hairline mt-8 w-20" />
                  <p className="mt-8 text-muted-foreground leading-loose text-lg">
                    {p.description}
                  </p>

                  <div className="mt-10">
                    <p className="text-xs uppercase tracking-luxe text-cream mb-4">Key Notes</p>
                    <div className="flex flex-wrap gap-2">
                      {p.notes.map((n) => (
                        <span
                          key={n}
                          className="text-xs uppercase tracking-wider border border-gold/30 text-gold px-4 py-2"
                        >
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-12 flex items-center justify-between border-t border-border pt-8">
                    <p className="font-display text-3xl text-gold">{p.price}</p>
                    <button className="bg-gold text-primary-foreground px-8 py-4 text-xs uppercase tracking-luxe hover:shadow-gold-glow transition-all duration-500">
                      Add to Vanity
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}

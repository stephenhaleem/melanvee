import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { products } from "@/data/products";
import { useCurrency } from "@/lib/currency";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "Collection · MELANVÉE" },
      {
        name: "description",
        content:
          'Three founding textures: Kimi Curl (4A to 4B), Zora Coil (4B to 4C), Lola Bouncy. Available 14" to 24".',
      },
      { property: "og:title", content: "The MELANVÉE Collection" },
      {
        property: "og:description",
        content: "Half wigs and U-part wigs in true 4A to 4C textures.",
      },
    ],
  }),
  component: Collection,
});

function Collection() {
  const { format } = useCurrency();

  return (
    <Layout>
      <section className="pt-16 pb-12 text-center">
        <p className="text-xs uppercase tracking-luxe text-gold mb-5">· The Collection</p>
        <h1 className="font-display text-5xl md:text-7xl text-cream leading-tight px-6">
          The founding <em className="italic text-gradient-rose">collection</em>.
        </h1>
        <p className="mt-6 text-mauve max-w-xl mx-auto px-6">
          Kimi (4A to 4B), Zora (4B to 4C), Lola (loose wave). Three textures, six lengths, endless
          ways to feel like the softest version of yourself.
        </p>
        <div className="hairline mt-10 w-32 mx-auto" />
      </section>

      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-3 gap-8 lg:gap-12">
          {products.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group"
            >
              <Link to="/product/$productId" params={{ productId: p.id }} className="block">
                <div className="aspect-[3/4] overflow-hidden bg-card relative">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={1024}
                    height={1280}
                    className="w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-ink/80 backdrop-blur-sm text-cream text-[10px] uppercase tracking-luxe px-3 py-1.5">
                    {p.texture}
                  </div>
                </div>
                <div className="pt-6">
                  <p className="text-[10px] uppercase tracking-luxe text-gold mb-2">
                    N° 0{i + 1} · {p.type}
                  </p>
                  <h2 className="font-display text-2xl text-cream group-hover:text-gold transition-colors">
                    {p.name}
                  </h2>
                  <p className="text-sm text-mauve mt-1">{p.tagline}</p>
                  <div className="mt-4 flex items-baseline justify-between">
                    <p className="font-display text-lg text-gold">
                      from {format(p.startingPriceGBP)}
                    </p>
                    <span className="text-[10px] uppercase tracking-luxe text-mauve border-b border-gold/40 pb-0.5 group-hover:text-gold group-hover:border-gold transition-colors">
                      View piece
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </Layout>
  );
}

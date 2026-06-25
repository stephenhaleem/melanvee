import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { products } from "@/data/products";

export const Route = createFileRoute("/texture-guide")({
  head: () => ({
    meta: [
      { title: "Texture Guide · MELANVÉE" },
      {
        name: "description",
        content:
          "Find your match. A guide to 4A, 4B and 4C hair textures plus our loose wave, and which MELANVÉE piece is made for you.",
      },
      { property: "og:title", content: "Find Your Texture · MELANVÉE" },
      { property: "og:description", content: "4A, 4B, 4C and loose wave explained." },
    ],
  }),
  component: TextureGuide,
});

const types = [
  {
    code: "4A",
    name: "Soft Coils",
    desc: "Defined springy S-shaped coils. Soft to the touch with visible curl pattern. Shrinks but bounces back.",
    match: "kimi-curl",
    matchName: "Kimi Curl",
  },
  {
    code: "4B",
    name: "Z-Pattern Coils",
    desc: "Tighter, less defined coils that bend in sharp Z-angles. Dense and cottony when dry, defined when wet.",
    match: "kimi-curl",
    matchName: "Kimi Curl (or Zora for fuller volume)",
  },
  {
    code: "4C",
    name: "Tight Afro Coils",
    desc: "The tightest pattern: coily, dense, with maximum shrinkage. Holds its shape with the most fullness.",
    match: "zora-coil",
    matchName: "Zora Coil",
  },
  {
    code: "Wave",
    name: "Loose Wave",
    desc: "Soft, bouncy S-waves with body and movement. For anyone wanting weightless volume and relaxed glamour.",
    match: "lola-bouncy",
    matchName: "Lola Bouncy",
  },
];

function TextureGuide() {
  return (
    <Layout>
      <section className="pt-20 pb-12 text-center">
        <p className="text-xs uppercase tracking-luxe text-gold mb-5">· Texture Guide</p>
        <h1 className="font-display text-5xl md:text-7xl text-cream leading-tight px-6">
          Find your <em className="italic text-gradient-blush">match</em>.
        </h1>
        <p className="mt-6 text-mauve max-w-xl mx-auto px-6">
          MELANVÉE is built for Type 4 hair: the kinks, coils and curls the industry has overlooked.
          Plus a loose wave for soft, romantic volume.
        </p>
        <p className="mt-4 text-xs uppercase tracking-luxe text-mauve">
          Type 3 textures coming soon
        </p>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {types.map((t, i) => {
            const product = products.find((p) => p.id === t.match);
            return (
              <motion.div
                key={t.code}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="bg-card border border-border p-8 flex flex-col"
              >
                <div className="flex items-baseline gap-3 mb-6">
                  <p className="font-display text-5xl text-gold">{t.code}</p>
                  <p className="text-[10px] uppercase tracking-luxe text-mauve">{t.name}</p>
                </div>
                <p className="text-mauve leading-relaxed flex-1 text-sm">{t.desc}</p>
                {product && (
                  <div className="mt-8 pt-6 border-t border-border">
                    <p className="text-[10px] uppercase tracking-luxe text-mauve mb-3">
                      Best match
                    </p>
                    <Link
                      to="/product/$productId"
                      params={{ productId: product.id }}
                      className="block group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 overflow-hidden bg-noir flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            width={128}
                            height={128}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        <div>
                          <p className="font-display text-base text-cream group-hover:text-gold transition-colors">
                            {t.matchName}
                          </p>
                          <p className="text-[10px] uppercase tracking-luxe text-gold">
                            from £{product.startingPriceGBP}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-mauve leading-loose">
          Not sure?{" "}
          <Link to="/contact" className="text-gold border-b border-gold/40 hover:border-gold">
            WhatsApp us a photo of your hair
          </Link>{" "}
          and we will match you personally, usually within an hour.
        </p>
      </div>
    </Layout>
  );
}

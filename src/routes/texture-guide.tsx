import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { products } from "@/data/products";
import { useSiteCopy } from "@/lib/site-copy";

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

function TextureGuide() {
  const copy = useSiteCopy();
  const types = [
    {
      code: "4A",
      name: copy("texture.4a.name"),
      desc: copy("texture.4a.description"),
      match: "kimi-curl",
      matchName: copy("texture.4a.match"),
    },
    {
      code: "4B",
      name: copy("texture.4b.name"),
      desc: copy("texture.4b.description"),
      match: "kimi-curl",
      matchName: copy("texture.4b.match"),
    },
    {
      code: "4C",
      name: copy("texture.4c.name"),
      desc: copy("texture.4c.description"),
      match: "zora-coil",
      matchName: copy("texture.4c.match"),
    },
    {
      code: "Bouncy",
      name: copy("texture.bouncy.name"),
      desc: copy("texture.bouncy.description"),
      match: "Lola-bouncy",
      matchName: copy("texture.bouncy.match"),
    },
    {
      code: "3A",
      name: copy("texture.3a.name"),
      desc: copy("texture.3a.description"),
      match: "beach-curl",
      matchName: copy("texture.3a.match"),
    },
  ];
  return (
    <Layout>
      <section className="pt-20 pb-12 text-center">
        <p className="text-xs uppercase tracking-luxe text-gold mb-5">{copy("texture.eyebrow")}</p>
        <h1 className="font-display text-5xl md:text-7xl text-cream leading-tight px-6">
          {copy("texture.heading")}
        </h1>
        <p className="mt-6 text-mauve max-w-xl mx-auto px-6">{copy("texture.description")}</p>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {types.map((t, i) => {
            const product = products.find((p) => p.id === t.match);
            const fallbackImage = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
                <rect width="128" height="128" fill="#171312" />
                <text x="50%" y="44%" text-anchor="middle" dominant-baseline="middle" fill="#f1d2b0" font-size="24" font-family="Arial, sans-serif">${t.code}</text>
                <text x="50%" y="72%" text-anchor="middle" dominant-baseline="middle" fill="#a96b2f" font-size="11" font-family="Arial, sans-serif">${t.matchName}</text>
              </svg>
            `)}`;

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
                {product ? (
                  <div className="mt-8 pt-6 border-t border-border">
                    <p className="text-[10px] uppercase tracking-luxe text-mauve mb-3">
                      {copy("texture.best_match")}
                    </p>
                    <Link
                      to="/products/$productId"
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
                ) : (
                  <div className="mt-8 pt-6 border-t border-border">
                    <p className="text-[10px] uppercase tracking-luxe text-mauve mb-3">
                      {copy("texture.best_match")}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 overflow-hidden bg-noir flex-shrink-0">
                        <img
                          src={fallbackImage}
                          alt={t.matchName}
                          loading="lazy"
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-display text-base text-cream">{t.matchName}</p>
                        <p className="text-[10px] uppercase tracking-luxe text-gold">
                          {copy("texture.suggested_match")}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-mauve leading-loose">{copy("texture.help")}</p>
      </div>
    </Layout>
  );
}

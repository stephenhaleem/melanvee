import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { PaymentBadges } from "@/components/PaymentBadges";
import { products, type Product } from "@/data/products";
import { addToCart } from "@/lib/cart";
import { showToast } from "@/components/ToastHost";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "Collection — MELANVÉE" },
      {
        name: "description",
        content:
          "Three founding textures: Kimi Curl (4A–4B), Zora Coil (4B–4C), Lola Bouncy. Available 14\" to 24\".",
      },
      { property: "og:title", content: "The MELANVÉE Collection" },
      {
        property: "og:description",
        content: "Half wigs and U-part wigs in true 4A–4C textures.",
      },
    ],
  }),
  component: Collection,
});

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [selected, setSelected] = useState(product.lengths[0]);
  const reverse = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`grid md:grid-cols-2 gap-12 lg:gap-20 items-center ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}
    >
      <div className="aspect-[4/5] overflow-hidden bg-card shadow-luxe relative">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1280}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.4s]"
        />
        <div className="absolute top-4 left-4 bg-ink/80 backdrop-blur-sm text-cream text-[10px] uppercase tracking-luxe px-3 py-1.5">
          {product.texture}
        </div>
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-luxe text-gold mb-3">
          N° 0{index + 1} · {product.type}
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-cream leading-tight">
          {product.name}
        </h2>
        <p className="mt-3 text-gold/90 italic font-display text-lg">{product.tagline}</p>
        <div className="hairline mt-8 w-20" />
        <p className="mt-8 text-mauve leading-loose text-lg">{product.description}</p>

        <div className="mt-10">
          <p className="text-xs uppercase tracking-luxe text-cream mb-4">Key Features</p>
          <div className="flex flex-wrap gap-2">
            {product.notes.map((n) => (
              <span
                key={n}
                className="text-xs uppercase tracking-wider border border-gold/40 text-gold px-4 py-2"
              >
                {n}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <p className="text-xs uppercase tracking-luxe text-cream mb-4">Length</p>
          <div className="flex flex-wrap gap-2">
            {product.lengths.map((opt) => {
              const active = opt.inches === selected.inches;
              return (
                <button
                  key={opt.inches}
                  onClick={() => setSelected(opt)}
                  className={`text-xs uppercase tracking-wider px-4 py-2 border transition-all ${
                    active
                      ? "bg-gold text-primary-foreground border-gold"
                      : "bg-transparent text-mauve border-border hover:border-gold hover:text-gold"
                  }`}
                >
                  {opt.inches}"
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-border pt-8">
          <div>
            <p className="text-[10px] uppercase tracking-luxe text-mauve mb-1">
              {selected.inches}" — total
            </p>
            <p className="font-display text-3xl text-gold">£{selected.price}</p>
          </div>
          <button
            onClick={() => {
              addToCart({
                productId: product.id,
                name: product.name,
                inches: selected.inches,
                price: selected.price,
              });
              showToast(`${product.name} ${selected.inches}" added to cart`);
            }}
            className="bg-gold text-primary-foreground px-8 py-4 text-xs uppercase tracking-luxe hover:shadow-rose-glow transition-all duration-500"
          >
            Add to Cart
          </button>
        </div>

        <PaymentBadges className="mt-6" />
      </div>
    </motion.article>
  );
}

function Collection() {
  return (
    <Layout>
      <section className="pt-16 pb-12 text-center">
        <p className="text-xs uppercase tracking-luxe text-gold mb-5">— The Collection</p>
        <h1 className="font-display text-5xl md:text-7xl text-cream leading-tight">
          Three <em className="italic text-gradient-rose">silhouettes</em>.
        </h1>
        <p className="mt-6 text-mauve max-w-xl mx-auto px-6">
          Kimi (4A–4B), Zora (4B–4C), Lola (loose wave). Three textures, six lengths,
          endless ways to feel like the softest version of yourself.
        </p>
        <div className="hairline mt-10 w-32 mx-auto" />
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-32 md:space-y-48">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

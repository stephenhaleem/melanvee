import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { PaymentBadges } from "@/components/PaymentBadges";
import { fetchProducts, type Product } from "@/lib/supabase-products";
import { addToCart } from "@/lib/cart";
import { showToast } from "@/components/ToastHost";
import { useCurrency } from "@/lib/currency";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "Collection — MELANVÉE" },
      {
        name: "description",
        content:
          'Three founding textures: Kimi Curl (4A–4B), Zora Coil (4B–4C), Lola Bouncy. Available 14" to 24".',
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
  const { format } = useCurrency();
  const reverse = index % 2 === 1;

  useEffect(() => {
    setSelected(product.lengths[0]);
  }, [product.id]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`grid md:grid-cols-2 gap-12 lg:gap-20 items-center ${
        reverse ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="aspect-[4/5] overflow-hidden bg-card shadow-luxe relative">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.4s]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-noir">
            <p className="text-mauve text-xs uppercase tracking-luxe">No image</p>
          </div>
        )}
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

        {product.notes.length > 0 && (
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
        )}

        {product.lengths.length > 0 && (
          <div className="mt-10">
            <p className="text-xs uppercase tracking-luxe text-cream mb-4">Length</p>
            <div className="flex flex-wrap gap-2">
              {product.lengths.map((opt) => {
                const active = opt.inches === selected?.inches;
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
                    {opt.inches}&quot;
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-12 flex items-center justify-between border-t border-border pt-8">
          <div>
            <p className="text-[10px] uppercase tracking-luxe text-mauve mb-1">
              {selected?.inches}&quot; — total
            </p>
            <p className="font-display text-3xl text-gold">
              {selected ? format(selected.price) : format(product.starting_price_gbp)}
            </p>
            <p className="text-[10px] text-mauve mt-1 normal-case tracking-normal">
              Charged in GBP at checkout
            </p>
          </div>
          <button
            onClick={() => {
              if (!selected) return;
              addToCart({
                productId: product.id,
                name: product.name,
                inches: selected.inches,
                price: selected.price,
              });
              showToast(`${product.name} ${selected.inches}" added to cart`);
            }}
            disabled={!selected}
            className="bg-gold text-primary-foreground px-8 py-4 text-xs uppercase tracking-luxe hover:shadow-rose-glow transition-all duration-500 disabled:opacity-50"
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <section className="pt-16 pb-12 text-center">
        <p className="text-xs uppercase tracking-luxe text-gold mb-5">— The Collection</p>
        <h1 className="font-display text-5xl md:text-7xl text-cream leading-tight">
          Three <em className="italic text-gradient-rose">silhouettes</em>.
        </h1>
        <p className="mt-6 text-mauve max-w-xl mx-auto px-6">
          Kimi (4A–4B), Zora (4B–4C), Lola (loose wave). Three textures, six lengths, endless ways
          to feel like the softest version of yourself.
        </p>
        <div className="hairline mt-10 w-32 mx-auto" />
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-32 md:space-y-48">
          {loading && (
            <div className="text-center py-24">
              <p className="text-mauve text-xs uppercase tracking-luxe animate-pulse">
                Loading collection…
              </p>
            </div>
          )}
          {error && (
            <div className="text-center py-24">
              <p className="text-mauve text-xs uppercase tracking-luxe">
                Could not load products. Please refresh.
              </p>
            </div>
          )}
          {!loading &&
            !error &&
            products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          {!loading && !error && products.length === 0 && (
            <div className="text-center py-24">
              <p className="font-display text-2xl text-cream mb-3">Coming soon.</p>
              <p className="text-mauve text-sm">The collection is being updated.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

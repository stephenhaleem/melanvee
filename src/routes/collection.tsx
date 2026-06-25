import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { useCurrency } from "@/lib/currency";
import {
  getProducts,
  getCollection,
  getCollectionProducts,
  getProductImage,
  getStartingPrice,
  type ShopifyProduct,
} from "@/lib/shopify";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "Collection · MELANVÉE" },
      {
        name: "description",
        content:
          'Three textures: Kimi Curl (4A to 4B), Zora Coil (4B to 4C), Lola Bouncy. Available 14" to 24".',
      },
      { property: "og:title", content: "The MELANVÉE Collection" },
      {
        property: "og:description",
        content: "Half wigs and U-part wigs in true 3A to 4C textures.",
      },
    ],
  }),
  component: Collection,
});

function Collection() {
  const { format } = useCurrency();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [title, setTitle] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadForHandle(handle: string | null) {
    setLoading(true);
    setError(null);
    try {
      if (handle) {
        const meta = await getCollection(handle);
        if (meta) setTitle(meta.title);
        const prods = await getCollectionProducts(handle, 50);
        setProducts(prods);
      } else {
        setTitle(null);
        const prods = await getProducts(20);
        setProducts(prods);
      }
    } catch (err: any) {
      setError(err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const handle = params.get("handle");
    loadForHandle(handle);

    const onPop = () => {
      const p = new URLSearchParams(window.location.search);
      loadForHandle(p.get("handle"));
    };

    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return (
    <Layout>
      <section className="pt-16 pb-12 text-center">
        <p className="text-xs uppercase tracking-luxe text-gold mb-5">· The Collection</p>
        <h1 className="font-display text-5xl md:text-7xl text-cream leading-tight px-6">
          The<em className="italic text-gradient-blush">collection</em>.
        </h1>
        <p className="mt-6 text-mauve max-w-xl mx-auto px-6">
          Kimi (4A to 4B), Zora (4B to 4C), Lola (loose wave). Three textures, six lengths, endless
          ways to feel like the softest version of yourself.
        </p>
        <div className="hairline mt-10 w-32 mx-auto" />
      </section>

      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {loading && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
              {[1, 2, 3].map((n) => (
                <div key={n} className="animate-pulse">
                  <div className="aspect-[3/4] bg-charcoal" />
                  <div className="pt-6 space-y-2">
                    <div className="h-3 w-16 bg-charcoal rounded" />
                    <div className="h-6 w-40 bg-charcoal rounded" />
                    <div className="h-4 w-28 bg-charcoal rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-mauve">Unable to load products. Please try again.</p>
              <p className="text-xs text-mauve/60 mt-2">{error}</p>
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="text-center py-20">
              <p className="font-display text-2xl text-cream mb-3">No products found</p>
              <p className="text-mauve text-sm">Check back soon — the collection is on its way.</p>
            </div>
          )}

          {!loading && products.length > 0 && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
              {products.map((p, i) => (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="group"
                >
                  <Link to="/product/$productId" params={{ productId: p.handle }} className="block">
                    <div className="aspect-[3/4] overflow-hidden bg-card relative">
                      <img
                        src={getProductImage(p)}
                        alt={p.images.edges[0]?.node.altText ?? p.title}
                        loading="lazy"
                        width={1024}
                        height={1280}
                        className="w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                      />
                      {/* Texture badge from tags e.g. tag "texture:4A-4B" */}
                    </div>
                    <div className="pt-6">
                      <p className="text-[10px] uppercase tracking-luxe text-gold mb-2">
                        N° 0{i + 1} · {p.productType || "Wig"}
                      </p>
                      <h2 className="font-display text-2xl text-cream group-hover:text-gold transition-colors">
                        {p.title}
                      </h2>
                      <p className="text-sm text-mauve mt-1 line-clamp-1">{p.description}</p>
                      <div className="mt-4 flex items-baseline justify-between">
                        <p className="font-sans text-lg text-gold">
                          from {format(getStartingPrice(p))}
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
          )}
        </div>
      </section>
    </Layout>
  );
}

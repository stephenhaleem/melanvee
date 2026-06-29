import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { useCurrency } from "@/lib/currency";
import {
  getCollection,
  getCollectionProducts,
  getProductImage,
  getStartingPrice,
  type ShopifyProduct,
  type ShopifyCollection,
} from "@/lib/shopify";

export const Route = createFileRoute("/collection/$collectionHandle")({
  loader: async ({ params }) => {
    const meta = await getCollection(params.collectionHandle);
    if (!meta) throw notFound();
    const products = await getCollectionProducts(params.collectionHandle, 50);
    return { meta, products };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.meta.title} · MELANVÉE` },
          { name: "description", content: loaderData.meta.description },
        ]
      : [{ title: "Collection · MELANVÉE" }],
  }),
  component: CollectionPage,
});

function CollectionPage() {
  const { format } = useCurrency();
  const { meta, products } = Route.useLoaderData() as {
    meta: ShopifyCollection;
    products: ShopifyProduct[];
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "a-z" | "price-low" | "price-high" | "newest">("default");

  const filteredProducts = products
    .filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "a-z":
          return a.title.localeCompare(b.title);
        case "price-low":
          return getStartingPrice(a) - getStartingPrice(b);
        case "price-high":
          return getStartingPrice(b) - getStartingPrice(a);
        case "newest":
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        default:
          return 0;
      }
    });

  return (
    <Layout>
      <section className="pt-16 pb-12 text-center">
        <p className="text-xs uppercase tracking-luxe text-gold mb-5">· The Collection</p>
        <h1 className="font-display text-5xl md:text-7xl text-cream leading-tight px-6">
          {meta.title}
        </h1>
        <p className="mt-6 text-mauve max-w-xl mx-auto px-6">{meta.description}</p>
        <div className="hairline mt-10 w-32 mx-auto" />
      </section>

      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Search and Filters */}
          <div className="mb-12 space-y-6">
            {/* Search */}
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3 bg-card text-cream placeholder:text-mauve border border-border focus:border-gold outline-none transition-colors"
            />
            
            {/* Sort Options */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSortBy("default")}
                className={`px-4 py-2 text-xs uppercase tracking-luxe transition-colors ${
                  sortBy === "default"
                    ? "bg-gold text-primary-foreground"
                    : "border border-border text-cream hover:border-gold"
                }`}
              >
                Default
              </button>
              <button
                onClick={() => setSortBy("a-z")}
                className={`px-4 py-2 text-xs uppercase tracking-luxe transition-colors ${
                  sortBy === "a-z"
                    ? "bg-gold text-primary-foreground"
                    : "border border-border text-cream hover:border-gold"
                }`}
              >
                A-Z
              </button>
              <button
                onClick={() => setSortBy("price-low")}
                className={`px-4 py-2 text-xs uppercase tracking-luxe transition-colors ${
                  sortBy === "price-low"
                    ? "bg-gold text-primary-foreground"
                    : "border border-border text-cream hover:border-gold"
                }`}
              >
                Price: Low to High
              </button>
              <button
                onClick={() => setSortBy("price-high")}
                className={`px-4 py-2 text-xs uppercase tracking-luxe transition-colors ${
                  sortBy === "price-high"
                    ? "bg-gold text-primary-foreground"
                    : "border border-border text-cream hover:border-gold"
                }`}
              >
                Price: High to Low
              </button>
              <button
                onClick={() => setSortBy("newest")}
                className={`px-4 py-2 text-xs uppercase tracking-luxe transition-colors ${
                  sortBy === "newest"
                    ? "bg-gold text-primary-foreground"
                    : "border border-border text-cream hover:border-gold"
                }`}
              >
                Newly Added
              </button>
            </div>
          </div>
          {products.length === 0 && (
            <div className="text-center py-20">
              <p className="font-display text-2xl text-cream mb-3">No products found</p>
              <p className="text-mauve text-sm">Check back soon — the collection is on its way.</p>
            </div>
          )}

          {filteredProducts.length === 0 && products.length > 0 && (
            <div className="text-center py-20">
              <p className="font-display text-2xl text-cream mb-3">No results found</p>
              <p className="text-mauve text-sm">Try a different search term.</p>
            </div>
          )}

          {filteredProducts.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 lg:gap-12">
              {filteredProducts.map((p, i) => (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="group min-w-0 bg-card rounded-xl overflow-hidden shadow-card transform transition-all duration-300 hover:shadow-luxe hover:-translate-y-1"
                >
                  <Link to="/product/$productId" params={{ productId: p.handle }} className="block">
                    <div className="aspect-[3/4] overflow-hidden relative">
                      <img
                        src={getProductImage(p)}
                        alt={p.images.edges[0]?.node.altText ?? p.title}
                        loading="lazy"
                        width={1024}
                        height={1280}
                        className="w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-105 rounded-t-xl"
                      />
                    </div>
                    <div className="p-4 sm:p-6">
                      <p className="text-[10px] uppercase tracking-luxe text-gold mb-2">
                        N° 0{i + 1} · {p.productType || "Wig"}
                      </p>
                      <h2 className="font-display text-xl sm:text-2xl text-cream group-hover:text-gold transition-colors">
                        {p.title}
                      </h2>
                      <p className="text-sm text-mauve mt-2 line-clamp-2 min-h-[2.6rem]">{p.description}</p>
                      <div className="mt-4 flex items-center gap-3 min-w-0">
                                              <p className="font-sans text-base sm:text-lg font-semibold text-gold flex-shrink-0">{format(getStartingPrice(p))}</p>
                                              <span className="ml-auto inline-flex items-center text-[10px] uppercase tracking-luxe text-mauve border-b border-gold/40 pb-0.5 group-hover:text-gold group-hover:border-gold transition-colors leading-none whitespace-nowrap">
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

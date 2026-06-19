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
          {products.length === 0 && (
            <div className="text-center py-20">
              <p className="font-display text-2xl text-cream mb-3">No products found</p>
              <p className="text-mauve text-sm">Check back soon — the collection is on its way.</p>
            </div>
          )}

          {products.length > 0 && (
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
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
                        <p className="font-sans text-lg text-gold">{format(getStartingPrice(p))}</p>
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

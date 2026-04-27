import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { PaymentBadges } from "@/components/PaymentBadges";
import { getProduct, products } from "@/data/products";
import { useCurrency } from "@/lib/currency";
import { addToCart } from "@/lib/cart";
import { showToast } from "@/components/ToastHost";
import capSizeImg from "@/assets/cap-size.jpg";

export const Route = createFileRoute("/product/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} · MELANVÉE` },
          { name: "description", content: loaderData.product.shortDescription },
          { property: "og:title", content: `${loaderData.product.name} · MELANVÉE` },
          { property: "og:description", content: loaderData.product.shortDescription },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [{ title: "Product · MELANVÉE" }],
  }),
  notFoundComponent: () => (
    <Layout>
      <section className="py-32 text-center">
        <h1 className="font-display text-4xl text-cream mb-4">Piece not found</h1>
        <Link to="/collection" className="text-gold border-b border-gold/40">
          Back to collection
        </Link>
      </section>
    </Layout>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { format } = useCurrency();
  const [selected, setSelected] = useState(product.lengths[0]);
  const [tab, setTab] = useState<"features" | "how" | "care">("features");

  return (
    <Layout>
      <section className="pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <nav className="text-[10px] uppercase tracking-luxe text-mauve mb-8 flex gap-2">
            <Link to="/collection" className="hover:text-gold">Collection</Link>
            <span>·</span>
            <span className="text-cream">{product.name}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
              className="aspect-[4/5] overflow-hidden bg-card shadow-luxe relative"
            >
              <img
                src={product.image}
                alt={product.name}
                width={1024}
                height={1280}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-ink/80 backdrop-blur-sm text-cream text-[10px] uppercase tracking-luxe px-3 py-1.5">
                {product.texture}
              </div>
            </motion.div>

            {/* Details */}
            <div>
              <p className="text-[10px] uppercase tracking-luxe text-gold mb-3">{product.type}</p>
              <h1 className="font-display text-4xl md:text-6xl text-cream leading-tight">
                {product.name}
              </h1>
              <p className="mt-3 text-gold/90 italic font-display text-xl">{product.tagline}</p>
              <div className="hairline mt-8 w-20" />

              <p className="mt-8 text-mauve leading-loose">{product.longDescription}</p>

              {/* Blends with */}
              <div className="mt-8 flex flex-wrap gap-2">
                {product.blendsWith.map((b) => (
                  <span
                    key={b}
                    className="text-[10px] uppercase tracking-wider border border-gold/30 text-gold px-3 py-1.5"
                  >
                    Blends with {b}
                  </span>
                ))}
              </div>

              {/* Notes */}
              <div className="mt-8">
                <p className="text-xs uppercase tracking-luxe text-cream mb-3">At a glance</p>
                <div className="flex flex-wrap gap-2">
                  {product.notes.map((n) => (
                    <span
                      key={n}
                      className="text-xs uppercase tracking-wider border border-border text-mauve px-4 py-2"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              {/* Length picker */}
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
                        {opt.inches}&quot;
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price + CTA */}
              <div className="mt-10 flex items-end justify-between border-t border-border pt-8 gap-6">
                <div>
                  <p className="text-[10px] uppercase tracking-luxe text-mauve mb-1">
                    {selected.inches}&quot; total
                  </p>
                  <p className="font-display text-3xl text-gold">{format(selected.price)}</p>
                  <p className="text-[10px] text-mauve mt-1">Charged in GBP at checkout</p>
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
          </div>
        </div>
      </section>

      {/* Tabs: Features / How to wear / Care */}
      <section className="py-16 bg-charcoal border-y border-border">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap gap-2 border-b border-border mb-10">
            {[
              { id: "features" as const, label: "Key Features" },
              { id: "how" as const, label: "How to Wear" },
              { id: "care" as const, label: "Care" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-5 py-3 text-xs uppercase tracking-luxe transition-all ${
                  tab === t.id
                    ? "text-gold border-b-2 border-gold -mb-px"
                    : "text-mauve hover:text-cream"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "features" && (
            <div className="grid md:grid-cols-2 gap-10">
              <InfoBlock title="Key Features" items={product.features} />
              <InfoBlock title="Wig Density" items={product.density} />
              <InfoBlock title="Other" items={product.other} />
              <div>
                <p className="text-xs uppercase tracking-luxe text-gold mb-4">Lifespan</p>
                <p className="text-mauve leading-loose">{product.lifespan}</p>
                <p className="text-xs uppercase tracking-luxe text-gold mt-8 mb-4">Cap Size</p>
                <p className="text-mauve leading-loose">
                  Universal cap size with adjustable straps inside for a snug, comfortable fit.
                  Fits most head shapes.
                </p>
                <div className="mt-4 overflow-hidden rounded bg-cream">
                  <img
                    src={capSizeImg}
                    alt="Universal wig cap size diagram"
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          )}

          {tab === "how" && (
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-luxe text-gold mb-4">
                How to wear your {product.type.toLowerCase()}
              </p>
              <ol className="space-y-4 counter-reset">
                {product.howToWear.map((step, idx) => (
                  <li key={idx} className="flex gap-4 text-mauve leading-loose">
                    <span className="font-display text-2xl text-gold flex-shrink-0 w-8">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <Link
                to="/how-to-wear"
                className="mt-8 inline-flex text-xs uppercase tracking-luxe text-gold border-b border-gold/40"
              >
                Full how-to-wear guide
              </Link>
            </div>
          )}

          {tab === "care" && (
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-luxe text-gold mb-4">Care recommendations</p>
              <ul className="space-y-3">
                {product.care.map((c, i) => (
                  <li key={i} className="flex gap-3 text-mauve leading-loose">
                    <span className="text-gold flex-shrink-0">✦</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/care"
                className="mt-8 inline-flex text-xs uppercase tracking-luxe text-gold border-b border-gold/40"
              >
                Full care guide
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Also consider */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-xs uppercase tracking-luxe text-gold mb-6">· Also Consider</p>
          <div className="grid md:grid-cols-2 gap-8">
            {products
              .filter((p) => p.id !== product.id)
              .map((p) => (
                <Link
                  key={p.id}
                  to="/product/$productId"
                  params={{ productId: p.id }}
                  className="group flex gap-5 items-center border border-border p-5 hover:border-gold transition-colors"
                >
                  <div className="w-24 h-32 bg-card overflow-hidden flex-shrink-0">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-luxe text-gold">{p.type}</p>
                    <p className="font-display text-2xl text-cream group-hover:text-gold transition-colors">
                      {p.name}
                    </p>
                    <p className="text-xs text-mauve mt-1">{p.texture}</p>
                    <p className="text-xs text-gold mt-2">from {format(p.startingPriceGBP)}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-luxe text-gold mb-4">{title}</p>
      <ul className="space-y-3">
        {items.map((i) => (
          <li key={i} className="flex gap-3 text-mauve leading-relaxed">
            <span className="text-gold flex-shrink-0">·</span>
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

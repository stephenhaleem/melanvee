import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { PaymentBadges } from "@/components/PaymentBadges";
import { useCurrency } from "@/lib/currency";
import { useShopifyCart } from "@/lib/shopify-cart";
import { showToast } from "@/components/ToastHost";
import {
  getProductByHandle,
  getVariants,
  findVariant,
  parsePrice,
  type ShopifyProduct,
  type ShopifyVariant,
} from "@/lib/shopify";
import capSizeImg from "@/assets/cap.jpeg";
import hairLengthImg from "@/assets/hairlength.jpeg";
import { ProductImageGallery } from "@/components/ProductImageGallery";

export const Route = createFileRoute("/product/$productId")({
  loader: async ({ params }) => {
    const product = await getProductByHandle(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.title} · MELANVÉE` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.title} · MELANVÉE` },
          { property: "og:description", content: loaderData.product.description },
          {
            property: "og:image",
            content: loaderData.product.images.edges[0]?.node.url ?? "",
          },
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

type Tab = "features" | "how-to-wear" | "care";

const TABS: { id: Tab; label: string }[] = [
  { id: "features", label: "Key Features" },
  { id: "how-to-wear", label: "How to Wear" },
  { id: "care", label: "Care" },
];

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { format } = useCurrency();
  const { addToCart, loading: cartLoading } = useShopifyCart();
  const [adding, setAdding] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("features");

  const variants = getVariants(product);
  const [selectedVariant, setSelectedVariant] = useState<ShopifyVariant>(
    variants.find((v) => v.availableForSale) ?? variants[0],
  );

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const sv = variants.find((v) => v.availableForSale) ?? variants[0];
    const map: Record<string, string> = {};
    sv.selectedOptions.forEach((o) => (map[o.name] = o.value));
    product.options.forEach((opt) => {
      if (!map[opt.name]) map[opt.name] = opt.values[0];
    });
    return map;
  });

  useEffect(() => {
    const found = findVariant(product, selectedOptions);
    if (found) setSelectedVariant(found);
  }, [selectedOptions, product]);

  const lengthOption = product.options.find(
    (o) => o.name.toLowerCase() === "length" || o.name.toLowerCase() === "size",
  );

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    setAdding(true);
    try {
      await addToCart(selectedVariant.id, 1);
      showToast(`${product.title} added to cart`);
    } catch (err) {
      showToast("Couldn't add to cart — please try again");
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  const price = parsePrice(selectedVariant.price.amount);

  const textureBadge =
    product.productType ||
    product.tags.find((t) => t.startsWith("texture:"))?.replace("texture:", "") ||
    "";

  return (
    <Layout>
      <section className="pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="text-[10px] uppercase tracking-luxe text-mauve mb-8 flex gap-2">
            <Link to="/collection" className="hover:text-gold">
              Collection
            </Link>
            <span>·</span>
            <span className="text-cream">{product.title}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
            >
              <ProductImageGallery
                images={product.images.edges}
                productTitle={product.title}
                textureBadge={textureBadge}
              />
            </motion.div>

            <div>
              <p className="text-[10px] uppercase tracking-luxe text-gold mb-3">
                {product.productType}
              </p>
              <h1 className="font-display text-4xl md:text-6xl text-cream leading-tight">
                {product.title}
              </h1>
              <div className="hairline mt-8 w-20" />

              <p className="mt-8 text-mauve leading-loose">{product.description}</p>

              {product.tags.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {product.tags
                    .filter((t) => !t.startsWith("texture:"))
                    .map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-wider border border-gold/30 text-gold px-3 py-1.5"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              )}

              {product.options.length > 0 ? (
                <div className="mt-10">
                  {product.options.map((option) => (
                    <div key={option.name} className="mb-6">
                      <p className="text-xs uppercase tracking-luxe text-cream mb-4">
                        {option.name}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((val) => {
                          const active = selectedOptions[option.name] === val;
                          const candidate = { ...selectedOptions, [option.name]: val };
                          const variantForVal = findVariant(product, candidate);
                          const available = variantForVal ? variantForVal.availableForSale : false;
                          return (
                            <button
                              key={val}
                              onClick={() => setSelectedOptions((s) => ({ ...s, [option.name]: val }))}
                              disabled={!available}
                              className={`text-xs uppercase tracking-wider px-4 py-2 border transition-all ${
                                active
                                  ? "bg-gold text-primary-foreground border-gold"
                                  : available
                                    ? "bg-transparent text-mauve border-border hover:border-gold hover:text-gold"
                                    : "bg-transparent text-mauve/40 border-border/40 cursor-not-allowed line-through"
                              }`}
                            >
                              {val}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : variants.length > 1 ? (
                <div className="mt-10">
                  <p className="text-xs uppercase tracking-luxe text-cream mb-4">Options</p>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((v) => {
                      const active = v.id === selectedVariant?.id;
                      return (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariant(v)}
                          disabled={!v.availableForSale}
                          className={`text-xs uppercase tracking-wider px-4 py-2 border transition-all ${
                            active
                              ? "bg-gold text-primary-foreground border-gold"
                              : v.availableForSale
                                ? "bg-transparent text-mauve border-border hover:border-gold hover:text-gold"
                                : "bg-transparent text-mauve/40 border-border/40 cursor-not-allowed"
                          }`}
                        >
                          {v.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              <div className="mt-10 flex items-end justify-between border-t border-border pt-8 gap-6">
                <div>
                  <p className="text-[10px] uppercase tracking-luxe text-mauve mb-1">
                    {selectedVariant?.title !== "Default Title" ? selectedVariant?.title : ""}
                  </p>
                  <p className="font-sans text-3xl text-gold">{format(price)}</p>
                  <p className="text-[10px] text-mauve mt-1">Charged in GBP at checkout</p>
                  {!selectedVariant?.availableForSale && (
                    <p className="text-[10px] text-rose-400 uppercase tracking-luxe mt-2">
                      Out of stock
                    </p>
                  )}
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={adding || cartLoading || !selectedVariant?.availableForSale}
                  className="bg-gold text-primary-foreground px-8 py-4 text-xs uppercase tracking-luxe hover:shadow-rose-glow transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {adding ? "Adding…" : "Add to Cart"}
                </button>
              </div>

              <PaymentBadges className="mt-6" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-charcoal border-y border-border">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex border-b border-border mb-12">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative text-[10px] uppercase tracking-luxe px-6 py-4 transition-colors duration-300 ${
                  activeTab === tab.id ? "text-gold" : "text-mauve hover:text-cream"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-gold"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "features" && (
              <motion.div
                key="features"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="grid md:grid-cols-2 gap-10"
              >
                <div>
                  <ul className="space-y-3">
                    {[
                      "No lace, no glue",
                      "Beginner friendly install",
                      "Breathable for all-day wear",
                      "100% premium virgin human hair",
                    ].map((f) => (
                      <li key={f} className="flex gap-3 text-mauve leading-relaxed">
                        <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-luxe text-gold mb-4">Cap Size</p>
                  <p className="text-mauve leading-loose">
                    Universal cap with adjustable inner straps and built-in combs.
                  </p>
                  <ul className="mt-4 space-y-2 text-mauve text-sm">
                    <li className="flex gap-3 items-center">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
                      Circumference: 22" / 56cm
                    </li>
                    <li className="flex gap-3 items-center">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
                      Front to nape: 13" to 14"
                    </li>
                    <li className="flex gap-3 items-center">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
                      Ear to ear: 11" to 12"
                    </li>
                  </ul>
                  <div className="mt-6 max-w-[260px] overflow-hidden">
                    <img
                      src={capSizeImg}
                      alt="Wig cap size diagram"
                      loading="lazy"
                      className="w-full h-auto opacity-90"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "how-to-wear" && (
              <motion.div
                key="how-to-wear"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="max-w-3xl"
              >
                <p className="text-xs uppercase tracking-luxe text-mauve mb-6">
                  How to wear your {product.productType?.toLowerCase()}
                </p>
                <ol className="space-y-4">
                  {[
                    "Slick your hair into a low bun, or cornrow it flat. Leave a small section out at the front to blend.",
                    "Slip her on. Adjust the inner straps until she sits snug without pressing.",
                    "Lock her in with the built-in combs at the crown and nape.",
                    "Smooth your leave-out through with curl custard or styling cream.",
                    "Lay your edges, spritz a little water to wake the curls, and go.",
                  ].map((step, idx) => (
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
                  Full wear & care guide
                </Link>
              </motion.div>
            )}

            {activeTab === "care" && (
              <motion.div
                key="care"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="max-w-3xl"
              >
                <p className="text-xs uppercase tracking-luxe text-mauve mb-6">
                  Care recommendations
                </p>
                <ul className="space-y-3">
                  {[
                    "Co-wash or use a sulfate-free shampoo every 2 to 3 weeks.",
                    "Deep condition every wash. 20 to 30 minutes, rinse cool.",
                    "Detangle damp with fingers first, then a wide-tooth comb.",
                    "Air dry on a stand. Refresh with a water and leave-in mist.",
                    "Sleep satin. Store on a stand, or back in her box.",
                  ].map((c, i) => (
                    <li key={i} className="flex gap-3 text-mauve leading-loose">
                      <span className="mt-2.5 inline-block h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/how-to-wear"
                  className="mt-8 inline-flex text-xs uppercase tracking-luxe text-gold border-b border-gold/40"
                >
                  Full wear & care guide
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[10px] uppercase tracking-luxe text-gold mb-8 pb-4 border-b border-border">
            Length Reference
          </p>
          <img
            src={hairLengthImg}
            alt="Hair length reference guide"
            className="w-full rounded-sm opacity-90"
            loading="lazy"
          />
          <p className="mt-4 text-[10px] uppercase tracking-luxe text-mauve text-center leading-relaxed">
            For reference only — does not depict actual length
          </p>
        </div>
      </section>
    </Layout>
  );
}

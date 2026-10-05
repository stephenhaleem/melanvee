import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import aboutImg from "@/assets/3.jpeg";
import { useSiteCopy } from "@/lib/site-copy";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — MELANVÉE" },
      {
        name: "description",
        content:
          "MELANVÉE makes half wigs and U-part wigs in true 4A–4C textures. Made for women of colour. Made to feel like yours.",
      },
      { property: "og:title", content: "About MELANVÉE" },
      { property: "og:description", content: "Half wigs and U-part wigs for 4A–4C textures." },
      { property: "og:image", content: aboutImg },
    ],
  }),
  component: About,
});

function About() {
  const copy = useSiteCopy();
  const values = [
    { n: "01", t: copy("about.value1.title"), d: copy("about.value1.description") },
    { n: "02", t: copy("about.value2.title"), d: copy("about.value2.description") },
    { n: "03", t: copy("about.value3.title"), d: copy("about.value3.description") },
  ];
  return (
    <Layout>
      <section className="py-24 md:py-32 text-center">
        <p className="text-xs uppercase tracking-luxe text-gold mb-6">{copy("about.eyebrow")}</p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-cream leading-[1] max-w-4xl mx-auto px-6">
          {copy("about.heading")}
        </h1>
        <p className="mt-8 italic font-display text-xl text-gold">{copy("about.tagline")}</p>
      </section>

      <section className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="aspect-[16/10] overflow-hidden shadow-luxe"
        >
          <img
            src={aboutImg}
            alt="MELANVÉE founder"
            loading="lazy"
            width={1024}
            height={1024}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      <section className="py-28 md:py-40">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 space-y-10 text-lg text-mauve leading-loose">
          <p className="font-display text-2xl md:text-3xl text-cream leading-snug italic">
            “{copy("about.quote")}”
          </p>
          <p>{copy("about.story_1")}</p>
          <p>{copy("about.story_2")}</p>
          <p>{copy("about.story_3")}</p>
        </div>
      </section>

      <section className="py-24 bg-charcoal">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-xs uppercase tracking-luxe text-gold mb-4 text-center">
            {copy("about.values_heading")}
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-cream text-center leading-tight">
            {copy("about.values_heading")}
          </h2>
          <div className="mt-20 grid md:grid-cols-3 gap-12">
            {values.map((v, i) => (
              <motion.div
                key={v.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="border-t border-gold/40 pt-8"
              >
                <p className="font-display text-5xl text-blush mb-6">{v.n}</p>
                <h3 className="font-display text-2xl text-cream mb-4">{v.t}</h3>
                <p className="text-mauve leading-relaxed">{v.d}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-20">
            <Link
              to="/collection"
              search={{ handle: undefined }}
              className="inline-flex items-center gap-3 bg-gold text-primary-foreground px-8 py-4 text-xs uppercase tracking-luxe hover:shadow-rose-glow transition-all duration-500"
            >
              Shop the Collection <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

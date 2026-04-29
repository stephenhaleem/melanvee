import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import aboutImg from "@/assets/about.jpg";

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

const values = [
  { n: "01", t: "True 4A–4C Textures", d: "Every pattern is matched to real Type 4 hair — not a generic 'curly'. Type 3 coming soon." },
  { n: "02", t: "Lace-Free Fit", d: "Half wigs and U-part wigs you can put on yourself in minutes — no lace, no glue, no salon, no damage." },
  { n: "03", t: "Made to Feel Like Yours", d: "Soft enough to live in. Natural enough that no one has to know it isn't your own." },
];

function About() {
  return (
    <Layout>
      <section className="py-24 md:py-32 text-center">
        <p className="text-xs uppercase tracking-luxe text-gold mb-6">— Our Story</p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-cream leading-[1] max-w-4xl mx-auto px-6">
          Made for <em className="italic text-gradient-rose">our textures</em>.
        </h1>
        <p className="mt-8 italic font-display text-xl text-gold">Made to feel like yours.</p>
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
            "For too long, women of colour have been let down by the hair industry —
            wigs that don't match our textures, lace that doesn't sit, and
            installs that damage the hair we are trying to protect."
          </p>
          <p>
            MELANVÉE exists for every woman who is tired of salons, tired of
            wearing wigs that look artificial, tired of damage, tired of spending
            hours on her hair.
          </p>
          <p>
            For the woman who wants to look like herself — not just on a good
            hair day, but every single day.
          </p>
          <p>
            We launched with three pieces: <strong className="text-cream">Kimi Curl</strong>,
            <strong className="text-cream"> Zora Coil</strong>, and
            <strong className="text-cream"> Lola Bouncy</strong> — half wigs and
            U-part wigs in true 4A–4C textures, designed to slip on, blend in,
            and let you live your day.
          </p>
        </div>
      </section>

      <section className="py-24 bg-charcoal">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-xs uppercase tracking-luxe text-gold mb-4 text-center">— What We Stand For</p>
          <h2 className="font-display text-4xl md:text-5xl text-cream text-center leading-tight">
            What we <em className="italic text-gradient-rose">stand for</em>.
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
                <p className="font-display text-5xl text-gold mb-6">{v.n}</p>
                <h3 className="font-display text-2xl text-cream mb-4">{v.t}</h3>
                <p className="text-mauve leading-relaxed">{v.d}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-20">
            <Link
              to="/collection"
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

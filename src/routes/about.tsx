import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import aboutImg from "@/assets/about.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Maison Noir" },
      { name: "description", content: "The story behind Maison Noir, a small-batch luxury hair house founded in Paris." },
      { property: "og:title", content: "About Maison Noir" },
      { property: "og:description", content: "A small-batch luxury hair house founded in Paris." },
      { property: "og:image", content: aboutImg },
    ],
  }),
  component: About,
});

const values = [
  { n: "01", t: "Small Batch", d: "Fewer than 400 bottles per pour, traceable from field to vanity." },
  { n: "02", t: "Honest Formulas", d: "No silicones, no parabens, no greenwashing. Just ingredients that work." },
  { n: "03", t: "Slow Made", d: "Two years from concept to launch. Time is the only luxury we don't compromise." },
];

function About() {
  return (
    <Layout>
      <section className="py-24 md:py-32 text-center">
        <p className="text-xs uppercase tracking-luxe text-gold mb-6">— Est. 2025 · Paris</p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-cream leading-[1] max-w-4xl mx-auto px-6">
          A house built on <em className="italic text-gradient-gold">restraint</em>.
        </h1>
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
            alt="Inside the Maison Noir atelier"
            loading="lazy"
            width={1400}
            height={1600}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      <section className="py-28 md:py-40">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 space-y-10 text-lg text-muted-foreground leading-loose">
          <p className="font-display text-2xl md:text-3xl text-cream leading-snug italic">
            "We started Maison Noir because beautiful hair shouldn't require a
            shelf of plastic bottles and a chemistry degree to decode."
          </p>
          <p>
            Maison Noir was founded in a small atelier in the 6th arrondissement
            by a former perfumer and a third-generation hairdresser. We were
            tired of products that promised everything and delivered noise.
          </p>
          <p>
            Our approach is simple: source the rarest ingredients we can find,
            blend them in small batches, and bottle them in glass that belongs
            on a vanity, not in a recycling bin.
          </p>
          <p>
            Every formula is developed slowly, tested obsessively, and
            released only when it earns the name on the label. We launched
            with three rituals because three is enough.
          </p>
        </div>
      </section>

      <section className="py-24 bg-card/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-xs uppercase tracking-luxe text-gold mb-4 text-center">— What We Stand For</p>
          <h2 className="font-display text-4xl md:text-5xl text-cream text-center leading-tight">
            Three <em className="italic text-gradient-gold">commitments</em>.
          </h2>
          <div className="mt-20 grid md:grid-cols-3 gap-12">
            {values.map((v, i) => (
              <motion.div
                key={v.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="border-t border-gold/30 pt-8"
              >
                <p className="font-display text-5xl text-gold mb-6">{v.n}</p>
                <h3 className="font-display text-2xl text-cream mb-4">{v.t}</h3>
                <p className="text-muted-foreground leading-relaxed">{v.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

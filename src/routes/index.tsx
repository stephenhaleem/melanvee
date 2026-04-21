import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { products } from "@/data/products";
import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Noir — Luxury Hair, Crafted in Devotion" },
      {
        name: "description",
        content:
          "Maison Noir is a small-batch luxury hair house. Discover three founding rituals: a silk mist, a precious oil, and an overnight masque.",
      },
      { property: "og:title", content: "Maison Noir — Luxury Hair Atelier" },
      { property: "og:description", content: "A small-batch luxury hair house. Three founding rituals." },
      { property: "og:image", content: heroImg },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: Home,
});

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};

function Home() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative min-h-[92vh] -mt-20 pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Editorial portrait of luminous hair"
            width={1080}
            height={1920}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 min-h-[92vh] flex items-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.18 } } }}
            className="max-w-2xl"
          >
            <motion.p variants={fade} className="text-xs uppercase tracking-luxe text-gold mb-6">
              — The Inaugural Collection
            </motion.p>
            <motion.h1 variants={fade} className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-cream">
              Hair, as <span className="italic text-gradient-gold">ritual</span>.
            </motion.h1>
            <motion.p variants={fade} className="mt-8 text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed">
              Three formulas. Cold-pressed, hand-poured, and considered
              down to the last drop. A quiet kind of luxury for the
              hair you've always dreamed of.
            </motion.p>
            <motion.div variants={fade} className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/collection"
                className="inline-flex items-center gap-3 bg-gold text-primary-foreground px-8 py-4 text-xs uppercase tracking-luxe hover:shadow-gold-glow transition-all duration-500"
              >
                Discover the Collection
                <span aria-hidden>→</span>
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center text-xs uppercase tracking-luxe text-cream border-b border-cream/30 pb-1 hover:text-gold hover:border-gold transition-colors"
              >
                Our Story
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-luxe text-muted-foreground">
          Scroll
        </div>
      </section>

      {/* MARQUEE / TAGS */}
      <section className="border-y border-border py-6 overflow-hidden">
        <div className="flex justify-center items-center gap-12 md:gap-20 text-xs uppercase tracking-luxe text-muted-foreground flex-wrap px-6">
          <span>Small Batch</span>
          <span className="text-gold">✦</span>
          <span>Cold Pressed</span>
          <span className="text-gold">✦</span>
          <span>Cruelty Free</span>
          <span className="text-gold">✦</span>
          <span>Made in Paris</span>
        </div>
      </section>

      {/* COLLECTION PREVIEW */}
      <section className="py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fade}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20"
          >
            <div>
              <p className="text-xs uppercase tracking-luxe text-gold mb-4">— Three Rituals</p>
              <h2 className="font-display text-4xl md:text-6xl text-cream max-w-xl leading-tight">
                The founding <em className="text-gradient-gold not-italic font-normal italic">collection</em>.
              </h2>
            </div>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Each formula was developed over two years in our Paris atelier.
              Restraint over excess. Ingredients you can pronounce.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {products.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group"
              >
                <Link to="/collection" className="block">
                  <div className="aspect-[3/4] overflow-hidden bg-card relative">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      width={1024}
                      height={1280}
                      className="w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                  <div className="pt-6 flex justify-between items-start">
                    <div>
                      <p className="text-[10px] uppercase tracking-luxe text-gold mb-2">
                        N° 0{i + 1}
                      </p>
                      <h3 className="font-display text-2xl text-cream group-hover:text-gold transition-colors duration-300">
                        {p.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{p.tagline}</p>
                    </div>
                    <p className="font-display text-xl text-gold">{p.price}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-28 md:py-40 bg-card/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="aspect-[4/5] overflow-hidden shadow-luxe"
          >
            <img
              src={aboutImg}
              alt="The Maison Noir atelier"
              loading="lazy"
              width={1400}
              height={1600}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <p className="text-xs uppercase tracking-luxe text-gold mb-6">— Philosophy</p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight text-cream">
              Slowness as <em className="text-gradient-gold not-italic italic">luxury</em>.
            </h2>
            <div className="hairline mt-10 w-24" />
            <p className="mt-10 text-muted-foreground leading-loose text-lg">
              We believe the best things are made slowly. Each bottle is poured by hand
              in batches of fewer than four hundred. We refuse silicones, parabens, and
              shortcuts. What remains is honest, beautiful, and rare.
            </p>
            <Link
              to="/about"
              className="mt-10 inline-flex items-center gap-3 text-xs uppercase tracking-luxe text-gold border-b border-gold/40 pb-1 hover:border-gold"
            >
              Read Our Story <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 md:py-40">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-xs uppercase tracking-luxe text-gold mb-6">— Join the House</p>
          <h2 className="font-display text-4xl md:text-6xl text-cream leading-tight">
            Be the first to receive <em className="text-gradient-gold not-italic italic">the ritual</em>.
          </h2>
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
            Subscribe for early access to new formulas, private events, and the
            occasional letter from our atelier.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-12 flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-transparent border-b border-border focus:border-gold outline-none px-2 py-3 text-sm text-cream placeholder:text-muted-foreground transition-colors"
            />
            <button
              type="submit"
              className="bg-gold text-primary-foreground px-8 py-3 text-xs uppercase tracking-luxe hover:shadow-gold-glow transition-all duration-500"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}

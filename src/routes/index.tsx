import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { PaymentBadges } from "@/components/PaymentBadges";
import { products } from "@/data/products";
import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MELANVÉE — Textured Wigs for Women of Colour" },
      {
        name: "description",
        content:
          "MELANVÉE is a luxury textured-hair atelier. Discover our inaugural collection: Kimi Curl, Zora Coil, and Lola Bouncy.",
      },
      { property: "og:title", content: "MELANVÉE — Textured Hair, Crafted in Devotion" },
      { property: "og:description", content: "Luxury textured wigs for women of colour. Three founding silhouettes." },
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
            alt="Black woman with luscious textured curls"
            width={1080}
            height={1920}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
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
            <motion.h1 variants={fade} className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-noir">
              Made to feel <span className="italic text-gradient-rose">like yours</span>.
            </motion.h1>
            <motion.p variants={fade} className="mt-8 text-base md:text-lg text-mauve max-w-lg leading-relaxed">
              Half wigs and U-part wigs designed for women of colour — true to
              your texture, easy to wear, and so natural no one has to know.
            </motion.p>
            <motion.div variants={fade} className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/collection"
                className="inline-flex items-center gap-3 bg-gold text-primary-foreground px-8 py-4 text-xs uppercase tracking-luxe hover:shadow-rose-glow transition-all duration-500"
              >
                Shop the Collection
                <span aria-hidden>→</span>
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center text-xs uppercase tracking-luxe text-noir border-b border-noir/30 pb-1 hover:text-gold hover:border-gold transition-colors"
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
      <section className="border-y border-border py-6 overflow-hidden bg-blush/40">
        <div className="flex justify-center items-center gap-12 md:gap-20 text-xs uppercase tracking-luxe text-mauve flex-wrap px-6">
          <span>Half Wigs</span>
          <span className="text-gold">✦</span>
          <span>U-Part Wigs</span>
          <span className="text-gold">✦</span>
          <span>True Textures</span>
          <span className="text-gold">✦</span>
          <span>Worldwide Shipping</span>
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
              <p className="text-xs uppercase tracking-luxe text-gold mb-4">— Three Silhouettes</p>
              <h2 className="font-display text-4xl md:text-6xl text-noir max-w-xl leading-tight">
                The founding <em className="text-gradient-rose not-italic font-normal italic">collection</em>.
              </h2>
            </div>
            <p className="text-mauve max-w-sm leading-relaxed">
              Three textures. Each available from 14" to 24". Crafted on HD lace
              for an undetectable, glueless fit.
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
                  </div>
                  <div className="pt-6 flex justify-between items-start">
                    <div>
                      <p className="text-[10px] uppercase tracking-luxe text-gold mb-2">
                        N° 0{i + 1}
                      </p>
                      <h3 className="font-display text-2xl text-noir group-hover:text-gold transition-colors duration-300">
                        {p.name}
                      </h3>
                      <p className="text-sm text-mauve mt-1">{p.tagline}</p>
                    </div>
                    <p className="font-display text-lg text-gold whitespace-nowrap">
                      from {p.startingPrice}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-28 md:py-40 bg-blush/50">
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
              alt="MELANVÉE muse"
              loading="lazy"
              width={1280}
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
            <h2 className="font-display text-4xl md:text-5xl leading-tight text-noir">
              Made for <em className="text-gradient-rose not-italic italic">our textures</em>.
            </h2>
            <div className="hairline mt-10 w-24" />
            <p className="mt-10 text-mauve leading-loose text-lg">
              MELANVÉE exists for every woman who is tired of salons, tired of
              wigs that look artificial, tired of damage, tired of spending hours
              on her hair. The woman who wants to look like herself — not just on
              a good hair day, but every single day.
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
          <h2 className="font-display text-4xl md:text-6xl text-noir leading-tight">
            Be the first to receive <em className="text-gradient-rose not-italic italic">the launch</em>.
          </h2>
          <p className="mt-6 text-mauve max-w-xl mx-auto">
            Early access, restock alerts, and the occasional letter from our atelier.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-12 flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-transparent border-b border-border focus:border-gold outline-none px-2 py-3 text-sm text-noir placeholder:text-muted-foreground transition-colors"
            />
            <button
              type="submit"
              className="bg-gold text-primary-foreground px-8 py-3 text-xs uppercase tracking-luxe hover:shadow-rose-glow transition-all duration-500"
            >
              Subscribe
            </button>
          </form>

          <div className="mt-16">
            <p className="text-[10px] uppercase tracking-luxe text-muted-foreground mb-4">
              Secure checkout — payments accepted
            </p>
            <PaymentBadges className="justify-center" />
          </div>
        </div>
      </section>
    </Layout>
  );
}

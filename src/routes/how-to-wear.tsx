import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import capSizeImg from "@/assets/cap-size.jpg";

export const Route = createFileRoute("/how-to-wear")({
  head: () => ({
    meta: [
      { title: "Wear & Care · MELANVÉE" },
      {
        name: "description",
        content:
          "How to wear and care for your MELANVÉE. Install in minutes, no lace, no glue. Wash, detangle, refresh, keep her soft for 1 to 3 years.",
      },
      { property: "og:title", content: "Wear & Care · MELANVÉE" },
      {
        property: "og:description",
        content: "Install, wear, care. Made to last 1 to 3 years with love.",
      },
    ],
  }),
  component: WearAndCare,
});

const halfWig = [
  "Slick your hair into a low bun, or cornrow it flat. Leave a small section out at the front to blend if you want that soft, melted-in finish.",
  "Slip her on. Adjust the inner straps until she sits snug without pressing.",
  "Lock her in with the built-in combs at the crown and nape.",
  "Smooth your leave-out through with curl custard or styling cream. Finger-fluff where the textures meet.",
  "Lay your edges, spritz a little water to wake the curls, and go.",
];

const uPart = [
  "Slick your hair back into a low bun, or cornrow it flat. Leave a U-shaped section out along your natural parting.",
  "Place her on, pull your own hair through the U opening.",
  "Adjust the inner straps. She should feel held, not heavy. Secure the combs at the crown and nape.",
  "Blend your leave-out into the texture with a styling cream until no one can tell where your hair ends and she begins.",
  "Style your parting, lay your edges, and go.",
];

const careSteps = [
  {
    n: "01",
    t: "Wash gently",
    d: "Every 2 to 3 weeks. Co-wash or use sulfate-free shampoo. Work the product downward, root to tip, never in circles.",
  },
  {
    n: "02",
    t: "Deep condition",
    d: "Every wash. Leave a rich conditioner in for 20 to 30 minutes, rinse cool. Let the coils drink.",
  },
  {
    n: "03",
    t: "Detangle softly",
    d: "Damp, with conditioner in. Fingers first, then a wide-tooth comb, always ends to roots. Never rip through dry.",
  },
  {
    n: "04",
    t: "Air dry",
    d: "Squeeze excess water in a microfibre towel, then air dry on a wig stand. Skip the high heat whenever you can.",
  },
  {
    n: "05",
    t: "Refresh between washes",
    d: "A spritz of water with leave-in conditioner wakes her back up. A little styling cream brings definition back to the curl.",
  },
  {
    n: "06",
    t: "Sleep her right",
    d: "Satin bonnet, silk scarf or satin pillow. Store her on a stand, or tuck her back into her box. She is an investment. Treat her like one.",
  },
];

const dos = [
  "Sulfate-free, moisture-rich products",
  "Detangle with fingers or a wide-tooth comb",
  "Air dry on a wig stand",
  "Sleep satin or silk",
  "Heat style with a heat protectant",
];

const donts = [
  "Scrub or twist when washing",
  "Brush through dry coils",
  "Use hot water on any length",
  "Sleep on cotton with her in",
  "Use alcohol-heavy products",
];

function WearAndCare() {
  return (
    <Layout>
      {/* HERO */}
      <section className="pt-20 pb-16 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-luxe text-gold mb-5"
        >
          Wear & Care
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-display text-5xl md:text-7xl text-cream leading-[1.05]"
        >
          Install. Wear. <em className="italic text-gradient-rose">Love her.</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-8 text-mauve max-w-xl mx-auto leading-loose"
        >
          No lace. No glue. No salon. A simple routine from the moment she arrives, made to keep her soft
          for one to three years.
        </motion.p>
      </section>

      {/* INSTALL — editorial side by side */}
      <section className="relative py-20 bg-charcoal border-y border-border overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14 text-center">
            <p className="text-[10px] uppercase tracking-luxe text-mauve">Chapter One</p>
            <h2 className="font-display text-4xl md:text-5xl text-cream mt-3">The Install</h2>
            <div className="hairline mx-auto mt-6 w-20" />
          </div>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            <Method
              number="I"
              kind="Half Wig"
              steps={halfWig}
            />
            <Method
              number="II"
              kind="U-Part Wig"
              steps={uPart}
            />
          </div>
        </div>
      </section>

      {/* CAP SIZE — intimate, editorial */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="max-w-sm mx-auto md:mx-0 overflow-hidden bg-cream shadow-luxe"
          >
            <img
              src={capSizeImg}
              alt="Elegant profile illustration of a Black woman with delicate measurement lines tracing the wig cap circumference, ear-to-ear and front-to-nape"
              loading="lazy"
              width={1024}
              height={1024}
              className="w-full h-auto"
            />
          </motion.div>
          <div>
            <p className="text-[10px] uppercase tracking-luxe text-gold mb-4">· Universal Cap Size</p>
            <h2 className="font-display text-4xl text-cream leading-tight">
              Made to sit, <em className="italic text-gradient-rose">made to adjust</em>.
            </h2>
            <p className="mt-6 text-mauve leading-loose">
              Every MELANVÉE piece is built on a universal cap with adjustable inner straps and
              combs. Snug on smaller heads, comfortable on larger ones. No measuring tape required.
            </p>
            <ul className="mt-8 space-y-3 text-mauve">
              <li className="flex gap-3"><span className="text-gold">·</span>Circumference: 22" / 56cm</li>
              <li className="flex gap-3"><span className="text-gold">·</span>Front to nape: 13" to 14"</li>
              <li className="flex gap-3"><span className="text-gold">·</span>Ear to ear: 11" to 12"</li>
              <li className="flex gap-3"><span className="text-gold">·</span>Adjustable straps inside</li>
              <li className="flex gap-3"><span className="text-gold">·</span>Built-in combs at crown and nape</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CARE — numbered editorial grid */}
      <section className="relative py-24 bg-charcoal border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14 text-center">
            <p className="text-[10px] uppercase tracking-luxe text-mauve">Chapter Two</p>
            <h2 className="font-display text-4xl md:text-5xl text-cream mt-3">
              The Care
            </h2>
            <p className="mt-5 text-mauve max-w-lg mx-auto leading-loose">
              She is 100% premium virgin human hair. Loved right, she wears for one to three years.
            </p>
            <div className="hairline mx-auto mt-6 w-20" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careSteps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="relative p-8 border border-border bg-ink/40 hover:border-gold/40 transition-colors"
              >
                <p className="font-display text-5xl text-gold/80">{s.n}</p>
                <h3 className="font-display text-xl text-cream mt-4">{s.t}</h3>
                <p className="text-mauve leading-loose mt-3 text-sm">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DO / DON'T */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-[10px] uppercase tracking-luxe text-gold mb-5">· Love her like this</p>
            <ul className="space-y-4">
              {dos.map((d) => (
                <li key={d} className="flex gap-3 text-mauve leading-loose border-b border-border/50 pb-3">
                  <span className="text-gold">✦</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-luxe text-mauve mb-5">· Never</p>
            <ul className="space-y-4">
              {donts.map((d) => (
                <li key={d} className="flex gap-3 text-mauve/80 leading-loose border-b border-border/50 pb-3">
                  <span className="text-mauve/60">✕</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* OUTRO */}
      <section className="py-24 text-center max-w-2xl mx-auto px-6">
        <p className="font-display text-4xl text-cream leading-tight">
          Safe to colour, curl <em className="italic text-gradient-rose">or heat style</em>.
        </p>
        <p className="mt-6 text-mauve leading-loose">
          100% premium virgin human hair. Treat her with gentle products and a heat protectant. For
          colour changes, we recommend a professional colourist who knows textured hair.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            to="/collection"
            className="text-xs uppercase tracking-luxe bg-gold text-primary-foreground px-8 py-4 hover:shadow-rose-glow transition-all duration-500"
          >
            Shop the Collection
          </Link>
          <Link
            to="/texture-guide"
            className="text-xs uppercase tracking-luxe border border-gold/40 px-8 py-4 text-gold hover:bg-gold hover:text-primary-foreground transition-all"
          >
            Find your texture
          </Link>
        </div>
      </section>
    </Layout>
  );
}

function Method({
  number,
  kind,
  steps,
}: {
  number: string;
  kind: string;
  steps: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      <div className="flex items-baseline gap-4 mb-8">
        <span className="font-display text-6xl text-gold/70">{number}</span>
        <div>
          <p className="text-[10px] uppercase tracking-luxe text-mauve">The</p>
          <p className="font-display text-2xl text-cream">{kind}</p>
        </div>
      </div>
      <ol className="space-y-5">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-4 text-mauve leading-loose border-l border-border pl-5">
            <span className="font-display text-sm text-gold flex-shrink-0 pt-1">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
    </motion.div>
  );
}

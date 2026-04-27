import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/care")({
  head: () => ({
    meta: [
      { title: "Care Guide · MELANVÉE" },
      {
        name: "description",
        content:
          "How to care for your MELANVÉE half wig or U-part wig. Washing, conditioning, detangling and storage.",
      },
      { property: "og:title", content: "MELANVÉE · Care Guide" },
      { property: "og:description", content: "Keep your pieces soft, defined and lasting." },
    ],
  }),
  component: Care,
});

const steps = [
  {
    n: "01",
    t: "Wash gently",
    d: "Every 2 to 3 weeks, co-wash or use a sulfate-free shampoo. Work from roots to ends in a downward motion. Never scrub in circles.",
  },
  {
    n: "02",
    t: "Deep condition",
    d: "After every wash, apply a rich deep conditioner. Leave on for 20 to 30 minutes, rinse with cool water to lock in moisture.",
  },
  {
    n: "03",
    t: "Detangle softly",
    d: "Always detangle when the hair is damp and coated in conditioner. Work from ends to roots using fingers or a wide-tooth comb. Never rip through dry coils.",
  },
  {
    n: "04",
    t: "Air dry",
    d: "Squeeze out excess water in a microfibre towel. Air dry on a wig stand. Avoid high heat whenever you can.",
  },
  {
    n: "05",
    t: "Refresh curls",
    d: "Spritz with water and a leave-in conditioner between washes. A light styling cream or curl custard brings back definition.",
  },
  {
    n: "06",
    t: "Store properly",
    d: "Keep on a wig stand when not worn. Tuck into the original satin-lined box for travel. Never stuff in a drawer.",
  },
];

const dos = [
  "Use sulfate-free, moisture-rich products",
  "Detangle with fingers or a wide-tooth comb",
  "Air dry on a wig stand",
  "Sleep on satin or silk, or in a satin bonnet",
  "Heat style with a heat protectant",
];

const donts = [
  "Do not scrub or twist the hair when washing",
  "Do not brush through dry coils",
  "Do not use hot water on any length of hair",
  "Do not sleep on cotton with the wig in",
  "Do not use alcohol-heavy products",
];

function Care() {
  return (
    <Layout>
      <section className="pt-20 pb-12 text-center">
        <p className="text-xs uppercase tracking-luxe text-gold mb-5">· Care Guide</p>
        <h1 className="font-display text-5xl md:text-7xl text-cream leading-tight px-6">
          Soft, defined, <em className="italic text-gradient-rose">lasting</em>.
        </h1>
        <p className="mt-6 text-mauve max-w-xl mx-auto px-6">
          With the right care, your MELANVÉE can wear for 1 to 3 years. Here is the ritual.
        </p>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          {steps.map((s) => (
            <div key={s.n} className="border border-border p-8 bg-card">
              <p className="font-display text-5xl text-gold">{s.n}</p>
              <h2 className="font-display text-2xl text-cream mt-4">{s.t}</h2>
              <p className="text-mauve leading-loose mt-3">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-charcoal border-y border-border">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-xs uppercase tracking-luxe text-gold mb-4">Do</p>
            <ul className="space-y-3">
              {dos.map((d) => (
                <li key={d} className="flex gap-3 text-mauve leading-loose">
                  <span className="text-gold">✦</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-luxe text-gold mb-4">Avoid</p>
            <ul className="space-y-3">
              {donts.map((d) => (
                <li key={d} className="flex gap-3 text-mauve leading-loose">
                  <span className="text-gold">✕</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 text-center max-w-2xl mx-auto px-6">
        <p className="font-display text-3xl text-cream">Safe to colour or heat style</p>
        <p className="mt-4 text-mauve leading-loose">
          Our pieces are 100% premium human hair. Curl, straighten, dye or bleach, always with
          gentle products and a heat protectant. For colour changes, we recommend a professional
          colourist.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/how-to-wear"
            className="text-xs uppercase tracking-luxe border border-gold/40 px-6 py-3 text-gold hover:bg-gold hover:text-primary-foreground transition-all"
          >
            How to wear
          </Link>
          <Link
            to="/collection"
            className="text-xs uppercase tracking-luxe border border-gold/40 px-6 py-3 text-gold hover:bg-gold hover:text-primary-foreground transition-all"
          >
            Shop collection
          </Link>
        </div>
      </section>
    </Layout>
  );
}

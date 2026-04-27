import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import capSizeImg from "@/assets/cap-size.jpg";

export const Route = createFileRoute("/how-to-wear")({
  head: () => ({
    meta: [
      { title: "How to Wear · MELANVÉE" },
      {
        name: "description",
        content:
          "Install a MELANVÉE half wig or U-part wig in minutes. Beginner friendly, no lace, no glue.",
      },
      { property: "og:title", content: "MELANVÉE · How to Wear" },
      { property: "og:description", content: "Simple, beginner-friendly install guides." },
    ],
  }),
  component: HowToWear,
});

const halfWig = [
  "Braid your natural hair down in cornrows or flat twists, leaving out a small section at the front to blend.",
  "Slip the half wig on, adjusting the inner straps for a snug, comfortable fit.",
  "Secure with the built-in combs at the crown and nape.",
  "Blend your leave-out with the wig using a light styling cream or curl custard.",
  "Lay your edges if you like, and you are ready to go.",
];

const uPart = [
  "Braid your hair down, leaving a U-shaped section out along your natural parting.",
  "Place the wig on your head and pull your own hair through the U-part opening.",
  "Adjust the inner straps and secure with the built-in combs.",
  "Blend your leave-out into the wig with a styling cream for a seamless finish.",
  "Style your parting, lay your edges, and go.",
];

function HowToWear() {
  return (
    <Layout>
      <section className="pt-20 pb-12 text-center">
        <p className="text-xs uppercase tracking-luxe text-gold mb-5">· How to Wear</p>
        <h1 className="font-display text-5xl md:text-7xl text-cream leading-tight px-6">
          Install in <em className="italic text-gradient-rose">minutes</em>.
        </h1>
        <p className="mt-6 text-mauve max-w-xl mx-auto px-6">
          No lace. No glue. No salon. Beginner friendly, lightweight and made to feel like your own.
        </p>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <Method title="The Half Wig" subtitle="Kimi Curl · Lola Bouncy" steps={halfWig} />
          <Method title="The U-Part Wig" subtitle="Zora Coil" steps={uPart} />
        </div>
      </section>

      {/* Cap size */}
      <section className="py-20 bg-charcoal border-y border-border">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-luxe text-gold mb-4">· Universal Cap Size</p>
            <h2 className="font-display text-4xl text-cream leading-tight">
              Fits most, made to adjust.
            </h2>
            <p className="mt-6 text-mauve leading-loose">
              Every MELANVÉE piece uses a universal cap with adjustable inner straps and combs.
              Snug on smaller heads, comfortable on larger ones. No custom measuring needed.
            </p>
            <ul className="mt-6 space-y-2 text-mauve">
              <li className="flex gap-3"><span className="text-gold">✦</span>Circumference: 22" / 56cm</li>
              <li className="flex gap-3"><span className="text-gold">✦</span>Front to nape: 13" to 14"</li>
              <li className="flex gap-3"><span className="text-gold">✦</span>Ear to ear: 11" to 12"</li>
              <li className="flex gap-3"><span className="text-gold">✦</span>Adjustable straps inside</li>
              <li className="flex gap-3"><span className="text-gold">✦</span>Built-in combs at crown and nape</li>
            </ul>
          </div>
          <div className="overflow-hidden rounded bg-cream">
            <img
              src={capSizeImg}
              alt="Universal wig cap size diagram with circumference, front to nape and ear to ear measurements"
              loading="lazy"
              width={1024}
              height={1024}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      <section className="py-20 text-center max-w-2xl mx-auto px-6">
        <p className="font-display text-3xl text-cream">Need a visual?</p>
        <p className="mt-4 text-mauve leading-loose">
          WhatsApp us and we will send you a short install video for your exact piece.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/care"
            className="text-xs uppercase tracking-luxe border border-gold/40 px-6 py-3 text-gold hover:bg-gold hover:text-primary-foreground transition-all"
          >
            Care guide
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

function Method({
  title,
  subtitle,
  steps,
}: {
  title: string;
  subtitle: string;
  steps: string[];
}) {
  return (
    <div className="border border-border p-8 bg-card">
      <p className="text-xs uppercase tracking-luxe text-gold mb-2">{subtitle}</p>
      <h2 className="font-display text-3xl text-cream">{title}</h2>
      <ol className="mt-8 space-y-5">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-4 text-mauve leading-loose">
            <span className="font-display text-2xl text-gold flex-shrink-0 w-8">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

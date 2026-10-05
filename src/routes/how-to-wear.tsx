import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { useSiteCopy } from "@/lib/site-copy";

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

function WearAndCare() {
  const copy = useSiteCopy();
  const halfWig = copy("wear.half_wig_steps").split("\n");
  const uPart = copy("wear.u_part_steps").split("\n");
  const careSteps = Array.from({ length: 6 }, (_, index) => {
    const number = index + 1;
    return {
      n: String(number).padStart(2, "0"),
      t: copy(`wear.care${number}.title` as `wear.care${1 | 2 | 3 | 4 | 5 | 6}.title`),
      d: copy(`wear.care${number}.description` as `wear.care${1 | 2 | 3 | 4 | 5 | 6}.description`),
    };
  });
  const dos = copy("wear.do_list").split("\n");
  const donts = copy("wear.dont_list").split("\n");
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
          {copy("wear.eyebrow")}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-display text-5xl md:text-7xl text-cream leading-[1.05]"
        >
          {copy("wear.heading")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-8 text-mauve max-w-xl mx-auto leading-loose"
        >
          {copy("wear.description")}
        </motion.p>
      </section>

      {/* INSTALL — editorial side by side */}
      <section className="relative py-20 bg-charcoal border-y border-border overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14 text-center">
            <p className="text-[10px] uppercase tracking-luxe text-mauve">Step One</p>
            <h2 className="font-display text-4xl md:text-5xl text-cream mt-3">
              {copy("wear.install_heading")}
            </h2>
            <div className="hairline mx-auto mt-6 w-20" />
          </div>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            <Method number="I" kind="Half Wig" steps={halfWig} />
            <Method number="II" kind="U-Part Wig" steps={uPart} />
          </div>
        </div>
      </section>

      {/* CAP COMFORT — benefits, not measurements */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[10px] uppercase tracking-luxe text-gold mb-4">The Cap</p>
          <h2 className="font-display text-4xl text-cream leading-tight">
            {copy("wear.cap_heading")}
          </h2>
          <p className="mt-6 text-mauve leading-loose">{copy("wear.cap_description")}</p>
          <ul className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-4 text-mauve text-left max-w-md mx-auto">
            {copy("wear.cap_benefits")
              .split("\n")
              .map((benefit) => (
                <li key={benefit} className="flex gap-3 items-center">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
                  {benefit}
                </li>
              ))}
          </ul>
        </div>
      </section>

      {/* CARE — numbered editorial grid */}
      <section className="relative py-24 bg-charcoal border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14 text-center">
            <p className="text-[10px] uppercase tracking-luxe text-mauve">Step Two</p>
            <h2 className="font-display text-4xl md:text-5xl text-cream mt-3">
              {copy("wear.care_heading")}
            </h2>
            <p className="mt-5 text-mauve max-w-lg mx-auto leading-loose">
              {copy("wear.care_intro")}
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
            <p className="text-[10px] uppercase tracking-luxe text-gold mb-5">Love her like this</p>
            <ul className="space-y-4">
              {dos.map((d) => (
                <li
                  key={d}
                  className="flex gap-3 text-mauve leading-loose border-b border-border/50 pb-3"
                >
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-luxe text-mauve mb-5">Never</p>
            <ul className="space-y-4">
              {donts.map((d) => (
                <li
                  key={d}
                  className="flex gap-3 text-mauve/80 leading-loose border-b border-border/50 pb-3"
                >
                  <span className="mt-2 inline-block h-1.5 w-1.5 border border-mauve/60 flex-shrink-0" />
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
          {copy("wear.outro_heading")}
        </p>
        <p className="mt-6 text-mauve leading-loose">{copy("wear.outro_description")}</p>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            to="/collection"
            search={{ handle: undefined }}
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

function Method({ number, kind, steps }: { number: string; kind: string; steps: string[] }) {
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

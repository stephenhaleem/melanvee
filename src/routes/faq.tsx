import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { useSiteCopy, type SiteCopyKey } from "@/lib/site-copy";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — MELANVÉE" },
      {
        name: "description",
        content:
          "Answers to everything: texture matching, install, lengths, shipping, returns, dyeing, lifespan.",
      },
      { property: "og:title", content: "MELANVÉE — FAQ" },
      { property: "og:description", content: "All your questions, answered." },
    ],
  }),
  component: FAQ,
});

function FAQ() {
  const copy = useSiteCopy();
  const faqs = Array.from({ length: 11 }, (_, index) => {
    const number = index + 1;
    return {
      q: copy(`faq.${number}.question` as SiteCopyKey),
      a: copy(`faq.${number}.answer` as SiteCopyKey),
    };
  });
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Layout>
      <section className="pt-20 pb-12 text-center">
        <p className="text-xs uppercase tracking-luxe text-gold mb-5">· FAQ</p>
        <h1 className="font-display text-5xl md:text-7xl text-cream leading-tight px-6">
          {copy("faq.heading")}
        </h1>
        <p className="mt-6 text-mauve max-w-xl mx-auto px-6">{copy("faq.description")}</p>
      </section>

      <section className="py-16 max-w-3xl mx-auto px-6">
        <div className="divide-y divide-border border-y border-border">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex justify-between items-start gap-6 py-6 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg md:text-xl text-cream group-hover:text-gold transition-colors">
                    {f.q}
                  </span>
                  <span
                    className={`text-gold text-2xl leading-none transition-transform ${isOpen ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                {isOpen && <p className="text-mauve leading-loose pb-6 -mt-2 max-w-prose">{f.a}</p>}
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}

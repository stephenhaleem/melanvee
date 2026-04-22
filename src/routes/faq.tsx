import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";

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

const faqs = [
  {
    q: "How do I know which texture is right for me?",
    a: "Kimi Curl matches 4A–4B (soft springy curls). Zora Coil matches 4B–4C (tighter, fuller afro coils). Lola Bouncy is a loose wave for anyone wanting soft volume. Visit our Texture Guide, or WhatsApp us a photo and we'll match you.",
  },
  {
    q: "Are these glueless?",
    a: "Yes — all three pieces install glueless in under 5 minutes. Half wigs blend with your own leave-out; the U-part wig sits over your parted hair. No glue, no tape, no salon required.",
  },
  {
    q: "What's the difference between a half wig and a U-part wig?",
    a: "A half wig covers the back half of your head — you leave out a section of your own hair at the front to blend. A U-part has a U-shaped opening at the top so you can pull through your own parting. Both are protective, glueless, and beginner-friendly.",
  },
  {
    q: "How long do they last?",
    a: "With proper care: 12+ months of regular wear. Wash gently every 2–3 weeks, air dry, and store on a wig stand. Detailed care card included with every order.",
  },
  {
    q: "Can I dye or heat-style them?",
    a: "Yes — they are 100% human hair. We recommend a professional colourist for any colour change. Heat tools are safe with a heat protectant.",
  },
  {
    q: "How long does shipping take?",
    a: "UK: 1–3 working days (free over £200). EU: 3–5 days. Worldwide: 5–10 days. All orders are tracked.",
  },
  {
    q: "What's your returns policy?",
    a: "Unworn, unaltered pieces in original packaging can be returned within 14 days of delivery for a full refund. For hygiene reasons we cannot accept returns once a wig has been worn or installed.",
  },
  {
    q: "Do you ship worldwide?",
    a: "Yes. We ship to the UK, EU, US, Canada, Africa, and most of the rest of the world. Customs duties are the buyer's responsibility outside the UK and EU.",
  },
  {
    q: "When will Type 3 (looser curl) textures launch?",
    a: "We're starting with 4A–4C because that's where the gap is widest. Type 3 textures are on the roadmap — join the mailing list to be first to know.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Layout>
      <section className="pt-20 pb-12 text-center">
        <p className="text-xs uppercase tracking-luxe text-gold mb-5">— FAQ</p>
        <h1 className="font-display text-5xl md:text-7xl text-cream leading-tight px-6">
          Asked & <em className="italic text-gradient-rose">answered</em>.
        </h1>
        <p className="mt-6 text-mauve max-w-xl mx-auto px-6">
          Still wondering something? WhatsApp us — we usually reply within an hour.
        </p>
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
                  <span className={`text-gold text-2xl leading-none transition-transform ${isOpen ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="text-mauve leading-loose pb-6 -mt-2 max-w-prose">
                    {f.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}

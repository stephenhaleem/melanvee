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
    a: "Kimi Curl matches 4A to 4B (soft springy curls). Zora Coil matches 4B to 4C (tighter, fuller afro coils). Lola Bouncy is a loose wave for anyone wanting soft volume. Visit our Texture Guide, or WhatsApp us a photo and we will match you.",
  },
  {
    q: "Do these have lace? Do I need glue?",
    a: "No lace, no glue. These are half wigs and U-part wigs. They install in under 5 minutes. Half wigs blend with your own leave-out. The U-part wig sits over your parted hair. No tape, no salon required.",
  },
  {
    q: "What cap size are the wigs?",
    a: "Every piece uses a universal cap size with adjustable inner straps and built-in combs. Circumference is around 22 inches (56cm). Comfortable on most head shapes. See our How to Wear page for the full diagram.",
  },
  {
    q: "Will it blend with my own hair?",
    a: "Yes. Our pieces blend with short or long hair, relaxed or natural. A little styling cream on your leave-out gives a seamless finish.",
  },
  {
    q: "What is the difference between a half wig and a U-part wig?",
    a: "A half wig covers the back half of your head. You leave out a section of your own hair at the front to blend. A U-part has a U-shaped opening at the top so you can pull through your own parting. Both are protective, glueless and beginner friendly.",
  },
  {
    q: "How long do they last?",
    a: "With proper care: 1 to 3 years of regular wear. Wash gently every 2 to 3 weeks, air dry, and store on a wig stand. See our Wear & Care page for the full guide.",
  },
  {
    q: "Can I dye, bleach or heat-style them?",
    a: "Yes. They are 100% premium human hair. Safe to curl, straighten, dye or bleach. We recommend a professional colourist for any colour change. Use a heat protectant for any heat styling.",
  },
  {
    q: "How long does shipping take?",
    a: "UK and Europe: dispatched within 24 to 48 hours, delivered in 3 to 5 working days. Free UK shipping over £100. Rest of world: 5 to 10 working days. All orders are tracked.",
  },
  {
    q: "What is your returns policy?",
    a: "Unworn, unaltered pieces in original packaging can be returned within 14 days of delivery. All returns are subject to a quality inspection. Return shipping is the customer's responsibility, except in cases of damaged or faulty items. See our full Policies page.",
  },
  {
    q: "What is your exchange policy?",
    a: "Exchanges are accepted within 7 days of delivery on unopened, unworn pieces in original packaging. Customer covers return shipping. See our full Policies page.",
  },
  {
    q: "Do you ship worldwide?",
    a: "Yes. We ship to the UK, EU, US, Canada, Africa, and most of the rest of the world. Customs duties are the buyer's responsibility outside the UK and EU.",
  },
  {
    q: "When will Type 3 (looser curl) textures launch?",
    a: "We are starting with 3A to 4C because that is where the gap is widest. Type 3 textures are on the roadmap. Join the mailing list to be first to know.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Layout>
      <section className="pt-20 pb-12 text-center">
        <p className="text-xs uppercase tracking-luxe text-gold mb-5">· FAQ</p>
        <h1 className="font-display text-5xl md:text-7xl text-cream leading-tight px-6">
          Asked & <em className="italic text-gradient-rose">answered</em>.
        </h1>
        <p className="mt-6 text-mauve max-w-xl mx-auto px-6">
          Still wondering something? WhatsApp us Monday to Friday, or email us any time at
          hello@melanvee.com.
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

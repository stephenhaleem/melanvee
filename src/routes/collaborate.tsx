import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/collaborate")({
  head: () => ({
    meta: [
      { title: "Collaborate — MELANVÉE" },
      {
        name: "description",
        content:
          "Work with MELANVÉE — content creators, ambassadors, and affiliate partnerships for women supporting women.",
      },
      { property: "og:title", content: "Collaborate with MELANVÉE" },
      {
        property: "og:description",
        content: "Ambassador, affiliate and content creator partnerships.",
      },
    ],
  }),
  component: Collaborate,
});

const COLLAB_EMAIL = "woman@melanvee.com";

const tiers = [
  {
    n: "01",
    t: "Content Creator",
    d: "Wear MELANVÉE in a styled video or photo set. Tag us. We'll send a piece in your texture and length.",
  },
  {
    n: "02",
    t: "Ambassador",
    d: "Long-term partnership. Quarterly drops, your own discount code for your community, and revenue share.",
  },
  {
    n: "03",
    t: "Affiliate",
    d: "Share your link, earn on every sale. Open to anyone — beginners welcome.",
  },
];

function Collaborate() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Collaboration — ${form.get("name") || "Application"}`);
    const body = encodeURIComponent(
      `Name: ${form.get("name")}\nInstagram / TikTok: ${form.get("social")}\nFollowers: ${form.get("followers")}\nLocation: ${form.get("location")}\nInterested in: ${form.get("type")}\n\nWhy MELANVÉE:\n${form.get("message")}`,
    );
    window.location.href = `mailto:${COLLAB_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <Layout>
      <section className="py-24 md:py-32 text-center">
        <p className="text-xs uppercase tracking-luxe text-gold mb-6">— Work with us</p>
        <h1 className="font-display text-5xl md:text-7xl text-cream leading-[1] max-w-4xl mx-auto px-6">
          Women supporting <em className="italic text-gradient-rose">women</em>.
        </h1>
        <p className="mt-8 text-mauve max-w-xl mx-auto px-6 leading-relaxed">
          MELANVÉE is built by women, for women — and we want to grow with you. Whether you create
          content, run a community, or just love the brand — there's a way to work together.
        </p>
      </section>

      <section className="py-16 bg-charcoal">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 grid md:grid-cols-3 gap-8">
          {tiers.map((v, i) => (
            <motion.div
              key={v.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="border-t border-gold/40 pt-8"
            >
              <p className="font-display text-5xl text-gold mb-6">{v.n}</p>
              <h3 className="font-display text-2xl text-cream mb-4">{v.t}</h3>
              <p className="text-mauve leading-relaxed">{v.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-luxe text-gold mb-4">— Apply</p>
            <h2 className="font-display text-4xl md:text-5xl text-cream leading-tight">
              Tell us <em className="italic text-gradient-rose">about you</em>.
            </h2>
            <p className="mt-4 text-mauve">We read every application. Reply within 5–7 days.</p>
          </div>

          {submitted ? (
            <div className="bg-card border border-gold/30 p-10 text-center">
              <p className="font-display text-2xl text-cream">Thank you.</p>
              <p className="mt-4 text-mauve">
                Your email client should have opened with your application drafted. If not, send it
                manually to{" "}
                <a href={`mailto:${COLLAB_EMAIL}`} className="text-gold border-b border-gold/40">
                  {COLLAB_EMAIL}
                </a>
                .
              </p>
            </div>
          ) : (
            /* Plain <form> inside a plain div — no motion.form */
            <div className="bg-card border border-border p-8 md:p-12 space-y-6 shadow-luxe">
              <form onSubmit={onSubmit} className="space-y-6">
                <CollabField label="Name" name="name" />
                <CollabField
                  label="Instagram / TikTok handle"
                  name="social"
                  placeholder="@yourhandle"
                />
                <CollabField
                  label="Follower count (approx)"
                  name="followers"
                  placeholder="e.g. 5k"
                />
                <CollabField label="Location" name="location" placeholder="London, UK" />
                <div>
                  <label className="block text-[10px] uppercase tracking-luxe text-gold mb-3">
                    Interested in
                  </label>
                  <select
                    name="type"
                    required
                    className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-cream transition-colors appearance-none"
                  >
                    <option value="">Choose one</option>
                    <option value="Content Creator">Content Creator</option>
                    <option value="Ambassador">Ambassador</option>
                    <option value="Affiliate">Affiliate</option>
                    <option value="Other">Something else</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-luxe text-gold mb-3">
                    Why MELANVÉE?
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-cream placeholder:text-mauve resize-none transition-colors"
                    placeholder="Tell us about your community, your hair journey, why you want to work with us..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gold text-primary-foreground py-4 text-xs uppercase tracking-luxe hover:shadow-rose-glow transition-all duration-500"
                >
                  Send Application
                </button>
                <p className="text-[10px] text-center text-mauve">
                  Or email us directly:{" "}
                  <a href={`mailto:${COLLAB_EMAIL}`} className="text-gold">
                    {COLLAB_EMAIL}
                  </a>
                </p>
              </form>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

function CollabField({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-[10px] uppercase tracking-luxe text-gold mb-3">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        required
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-cream placeholder:text-mauve transition-colors"
      />
    </div>
  );
}

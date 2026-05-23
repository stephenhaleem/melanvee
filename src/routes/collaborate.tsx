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

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mojblkzl";

type FormState = "idle" | "loading" | "success" | "error";

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
  const [state, setState] = useState<FormState>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("loading");
    const form = e.currentTarget;

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error();
      setState("success");
      form.reset();
    } catch {
      setState("error");
    }
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

          {state === "success" ? (
            <div className="bg-card border border-gold/30 p-12 text-center shadow-luxe flex flex-col items-center justify-center gap-4 min-h-[340px]">
              <p className="font-display text-3xl text-cream">Thank you.</p>
              <p className="text-mauve leading-relaxed max-w-xs">
                We've received your application and will be in touch within 5–7 days.
              </p>
            </div>
          ) : (
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
                  <label
                    htmlFor="type"
                    className="block text-[10px] uppercase tracking-luxe text-gold mb-3"
                  >
                    Interested in
                  </label>
                  <select
                    id="type"
                    name="type"
                    required
                    className="w-full bg-transparent outline-none py-3 text-cream appearance-none border-b border-border focus:border-gold transition-colors"
                  >
                    <option value="" className="bg-charcoal">
                      Choose one
                    </option>
                    <option value="Content Creator" className="bg-charcoal">
                      Content Creator
                    </option>
                    <option value="Ambassador" className="bg-charcoal">
                      Ambassador
                    </option>
                    <option value="Affiliate" className="bg-charcoal">
                      Affiliate
                    </option>
                    <option value="Other" className="bg-charcoal">
                      Something else
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-[10px] uppercase tracking-luxe text-gold mb-3"
                  >
                    Why MELANVÉE?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full bg-transparent outline-none py-3 text-cream placeholder:text-mauve resize-none border-b border-border focus:border-gold transition-colors"
                    placeholder="Tell us about your community, your hair journey, why you want to work with us..."
                  />
                </div>

                {state === "error" && (
                  <p className="text-[11px] text-rose-400 uppercase tracking-wider">
                    Something went wrong — please email us at collab@melanvee.com
                  </p>
                )}

                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="w-full bg-gold text-primary-foreground py-4 text-xs uppercase tracking-luxe hover:shadow-rose-glow transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state === "loading" ? "Sending…" : "Send Application"}
                </button>

                <p className="text-[10px] text-center text-mauve">
                  Or email us directly:{" "}
                  <a href="mailto:collab@melanvee.com" className="text-gold">
                    collab@melanvee.com
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
        className="w-full bg-transparent outline-none py-3 text-cream placeholder:text-mauve border-b border-border focus:border-gold transition-colors"
      />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Maison Noir" },
      { name: "description", content: "Reach the Maison Noir atelier. Press, partnerships, and personal inquiries." },
      { property: "og:title", content: "Contact Maison Noir" },
      { property: "og:description", content: "Reach our Paris and New York ateliers." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <Layout>
      <section className="py-24 md:py-32 text-center">
        <p className="text-xs uppercase tracking-luxe text-gold mb-6">— Get in Touch</p>
        <h1 className="font-display text-5xl md:text-7xl text-cream leading-[1] max-w-3xl mx-auto px-6">
          We'd love to <em className="italic text-gradient-gold">hear from you</em>.
        </h1>
        <p className="mt-8 text-muted-foreground max-w-xl mx-auto px-6 leading-relaxed">
          Whether it's a question about a formula, a press request, or simply
          a hello — write to us. We read every letter.
        </p>
      </section>

      <section className="pb-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 grid md:grid-cols-5 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-2 space-y-10"
          >
            <div>
              <p className="text-xs uppercase tracking-luxe text-gold mb-4">Atelier · Paris</p>
              <p className="text-cream leading-relaxed">
                14 rue de Saints-Pères<br />
                75006 Paris, France
              </p>
            </div>
            <div className="hairline w-20" />
            <div>
              <p className="text-xs uppercase tracking-luxe text-gold mb-4">Studio · New York</p>
              <p className="text-cream leading-relaxed">
                88 Mercer Street, Floor 3<br />
                New York, NY 10012
              </p>
            </div>
            <div className="hairline w-20" />
            <div>
              <p className="text-xs uppercase tracking-luxe text-gold mb-4">Direct</p>
              <p className="text-cream leading-relaxed">
                hello@maisonnoir.co<br />
                press@maisonnoir.co<br />
                +1 (212) 555 0188
              </p>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="md:col-span-3 space-y-8 bg-card/40 p-8 md:p-12 border border-border"
          >
            <div className="grid sm:grid-cols-2 gap-8">
              <Field label="First Name" name="first" />
              <Field label="Last Name" name="last" />
            </div>
            <Field label="Email" name="email" type="email" />
            <Field label="Subject" name="subject" />
            <div>
              <label className="block text-[10px] uppercase tracking-luxe text-gold mb-3">
                Message
              </label>
              <textarea
                rows={5}
                required
                className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-cream placeholder:text-muted-foreground resize-none transition-colors"
                placeholder="Tell us a little..."
              />
            </div>

            <button
              type="submit"
              disabled={sent}
              className="w-full sm:w-auto bg-gold text-primary-foreground px-10 py-4 text-xs uppercase tracking-luxe hover:shadow-gold-glow transition-all duration-500 disabled:opacity-60"
            >
              {sent ? "Thank you — we'll be in touch" : "Send Message"}
            </button>
          </motion.form>
        </div>
      </section>
    </Layout>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="block text-[10px] uppercase tracking-luxe text-gold mb-3">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-cream placeholder:text-muted-foreground transition-colors"
      />
    </div>
  );
}

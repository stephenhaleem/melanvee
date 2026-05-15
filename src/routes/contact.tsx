import { createFileRoute } from "@tanstack/react-router";
import { useState, memo } from "react";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — MELANVÉE" },
      {
        name: "description",
        content: "Reach MELANVÉE. WhatsApp us, email us, or send a message — we read every one.",
      },
    ],
  }),
  component: Contact,
});

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mgodwgyg";
const WHATSAPP_HREF =
  "https://wa.me/44760317678?text=Hi%20MELANV%C3%89E%2C%20I'd%20love%20to%20know%20more%20about%20your%20wigs.";

// Isolated in its own memoized component so parent re-renders don't touch it
const ContactForm = memo(function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          subject,
          message,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-card border border-gold/30 p-12 text-center shadow-luxe min-h-[340px] flex flex-col items-center justify-center gap-4">
        <p className="font-display text-3xl text-cream">Thank you.</p>
        <p className="text-mauve leading-relaxed max-w-xs">
          We've received your message and will reply within 1–2 working days.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card p-8 md:p-12 border border-border shadow-luxe">
      <form onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="block text-[10px] uppercase tracking-luxe text-gold mb-3">
              First Name
            </label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Your first name"
              className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-cream placeholder:text-mauve transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-luxe text-gold mb-3">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Your last name"
              className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-cream placeholder:text-mauve transition-colors"
            />
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-[10px] uppercase tracking-luxe text-gold mb-3">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-cream placeholder:text-mauve transition-colors"
          />
        </div>

        <div className="mb-8">
          <label className="block text-[10px] uppercase tracking-luxe text-gold mb-3">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="What's this about?"
            className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-cream placeholder:text-mauve transition-colors"
          />
        </div>

        <div className="mb-8">
          <label className="block text-[10px] uppercase tracking-luxe text-gold mb-3">
            Message
          </label>
          <textarea
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us a little..."
            className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-cream placeholder:text-mauve resize-none transition-colors"
          />
        </div>

        {status === "error" && (
          <p className="text-[11px] text-rose-400 uppercase tracking-wider mb-6">
            Something went wrong — please email customerservice@melanvee.com
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-gold text-primary-foreground px-10 py-4 text-xs uppercase tracking-luxe hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Sending…" : "Send Message"}
        </button>
      </form>
    </div>
  );
});

export default function Contact() {
  return (
    <Layout>
      <section className="py-24 md:py-32 text-center">
        <p className="text-xs uppercase tracking-luxe text-gold mb-6">— Get in Touch</p>
        <h1 className="font-display text-5xl md:text-7xl text-cream leading-tight max-w-3xl mx-auto px-6">
          We'd love to <em className="italic text-gradient-rose">hear from you</em>.
        </h1>
        <p className="mt-8 text-mauve max-w-xl mx-auto px-6 leading-relaxed">
          Questions about texture, length, or shipping? WhatsApp us Monday to Friday, or drop us an
          email any time.
        </p>
      </section>

      <section className="pb-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 grid md:grid-cols-5 gap-16">
          <div className="md:col-span-2 space-y-10">
            <div>
              <p className="text-xs uppercase tracking-luxe text-gold mb-4">WhatsApp</p>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream hover:text-gold transition-colors leading-relaxed block"
              >
                +44 7603 17678
                <br />
                <span className="text-xs uppercase tracking-luxe text-mauve">
                  Monday to Friday · Tap to chat · Response time: 9am-4pm
                </span>
              </a>
            </div>
            <div className="hairline w-20" />
            <div>
              <p className="text-xs uppercase tracking-luxe text-gold mb-4">Email · Anytime</p>
              <p className="text-cream leading-relaxed">
                customerservice@melanvee.com
                <br />
                <span className="text-mauve text-sm">hello@melanvee.com (collabs)</span>
              </p>
            </div>
            <div className="hairline w-20" />
            <div>
              <p className="text-xs uppercase tracking-luxe text-gold mb-4">London · Worldwide</p>
              <p className="text-cream leading-relaxed">
                Free UK and international shipping for orders over £100
                <br />
              </p>
            </div>
          </div>

          <div className="md:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — MELANVÉE" },
      {
        name: "description",
        content: "Reach MELANVÉE. WhatsApp us, email us, or send a message — we read every one.",
      },
      { property: "og:title", content: "Contact MELANVÉE" },
      { property: "og:description", content: "WhatsApp, email, or write to our London studio." },
    ],
  }),
  component: Contact,
});

const WHATSAPP_NUMBER = "440000000000";
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}`;

/**
 * SETUP (2 minutes, no code changes after):
 * 1. Go to https://formspree.io — sign up free
 * 2. New Form → name it "MELANVÉE Contact" → set notification email to hello@melanvee.com
 * 3. Copy your endpoint: https://formspree.io/f/xyzabcde
 * 4. Paste it as the value of FORMSPREE_ENDPOINT below
 * Done. Messages land in your inbox instantly.
 */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mpqkvgdw";

type FormState = "idle" | "loading" | "success" | "error";

function Contact() {
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
        <p className="text-xs uppercase tracking-luxe text-gold mb-6">— Get in Touch</p>
        <h1 className="font-display text-5xl md:text-7xl text-cream leading-[1] max-w-3xl mx-auto px-6">
          We'd love to <em className="italic text-gradient-rose">hear from you</em>.
        </h1>
        <p className="mt-8 text-mauve max-w-xl mx-auto px-6 leading-relaxed">
          Questions about texture, length, or shipping? WhatsApp us Monday to Friday, or drop us an
          email any time and we will come back to you.
        </p>
      </section>

      <section className="pb-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 grid md:grid-cols-5 gap-16">
          {/* Left — contact details */}
          <div className="md:col-span-2 space-y-10">
            <div>
              <p className="text-xs uppercase tracking-luxe text-gold mb-4">WhatsApp</p>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream leading-relaxed hover:text-gold transition-colors"
              >
                +44 0000 000 000
                <br />
                <span className="text-xs uppercase tracking-luxe text-mauve">
                  Monday to Friday · Tap to chat
                </span>
              </a>
            </div>
            <div className="hairline w-20" />
            <div>
              <p className="text-xs uppercase tracking-luxe text-gold mb-4">Email · Anytime</p>
              <p className="text-cream leading-relaxed">
                hello@melanvee.com
                <br />
                <span className="text-mauve text-sm">woman@melanvee.com (collabs)</span>
              </p>
            </div>
            <div className="hairline w-20" />
            <div>
              <p className="text-xs uppercase tracking-luxe text-gold mb-4">London · Worldwide</p>
              <p className="text-cream leading-relaxed">
                Free international shipping
                <br />
                Free UK shipping over £100
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div className="md:col-span-3">
            {state === "success" ? (
              <div className="bg-card border border-gold/30 p-12 text-center shadow-luxe flex flex-col items-center justify-center gap-4 min-h-[340px]">
                <p className="font-display text-3xl text-cream">Thank you.</p>
                <p className="text-mauve leading-relaxed max-w-xs">
                  We've received your message and will reply within 1–2 working days. If it's
                  urgent, WhatsApp us directly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="bg-card p-8 md:p-12 border border-border shadow-luxe"
              >
                <div className="grid sm:grid-cols-2 gap-8">
                  <Field label="First Name" name="first_name" />
                  <Field label="Last Name" name="last_name" required={false} />
                </div>
                <Field label="Email" name="email" type="email" />
                <Field label="Subject" name="subject" required={false} />
                <div>
                  <label className="block text-[10px] uppercase tracking-luxe text-gold mb-3">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="w-full bg-transparent outline-none py-3 text-cream placeholder:text-mauve resize-none"
                    placeholder="Tell us a little..."
                  />
                </div>

                {state === "error" && (
                  <p className="text-[11px] text-rose-400 uppercase tracking-wider">
                    Something went wrong — please email us at hello@melanvee.com
                  </p>
                )}

                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="w-full sm:w-auto bg-gold text-primary-foreground px-10 py-4 text-xs uppercase tracking-luxe hover:shadow-rose-glow transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state === "loading" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-[10px] uppercase tracking-luxe text-gold mb-3">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full bg-transparent outline-none py-3 text-cream placeholder:text-mauve"
      />
    </div>
  );
}

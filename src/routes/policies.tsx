import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/policies")({
  head: () => ({
    meta: [
      { title: "Policies — MELANVÉE" },
      {
        name: "description",
        content:
          "MELANVÉE shipping, returns, exchange and store policies. UK & EU dispatch within 24–48 hours.",
      },
      { property: "og:title", content: "MELANVÉE — Policies" },
      { property: "og:description", content: "Shipping, returns, and exchange information." },
    ],
  }),
  component: Policies,
});

type Tab = "shipping" | "returns" | "exchange" | "all";

const tabs: { id: Tab; label: string }[] = [
  { id: "shipping", label: "Shipping" },
  { id: "returns", label: "Returns" },
  { id: "exchange", label: "Exchange" },
  { id: "all", label: "All Policies" },
];

function Policies() {
  const [active, setActive] = useState<Tab>("shipping");

  return (
    <Layout>
      <section className="py-20 md:py-28 text-center">
        <p className="text-xs uppercase tracking-luxe text-gold mb-5">— The Fine Print</p>
        <h1 className="font-display text-5xl md:text-7xl text-cream leading-tight px-6">
          Our <em className="italic text-gradient-rose">policies</em>.
        </h1>
        <p className="mt-6 text-mauve max-w-xl mx-auto px-6">
          Clear, fair, written without jargon. Questions? WhatsApp us.
        </p>
      </section>

      <section className="pb-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap gap-2 border-b border-border mb-12">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`px-5 py-3 text-xs uppercase tracking-luxe transition-all ${
                  active === t.id
                    ? "text-gold border-b-2 border-gold -mb-px"
                    : "text-mauve hover:text-cream"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="space-y-8 text-mauve leading-loose">
            {(active === "shipping" || active === "all") && <Shipping />}
            {(active === "returns" || active === "all") && <Returns />}
            {(active === "exchange" || active === "all") && <Exchange />}
            {active === "all" && <PrivacyTerms />}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border pt-10">
      <h2 className="font-display text-3xl md:text-4xl text-cream mb-6">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Shipping() {
  return (
    <Section title="Shipping Policy">
      <p>
        All MELANVÉE orders are dispatched from our London studio.
      </p>
      <ul className="space-y-3 list-none pl-0">
        <Item>
          <strong className="text-cream">UK & Europe:</strong> Dispatched within
          24–48 hours, delivered in 3–5 working days.
        </Item>
        <Item>
          <strong className="text-cream">Rest of world:</strong> Dispatched within
          24–48 hours, delivered in 5–10 working days.
        </Item>
        <Item>
          <strong className="text-cream">Free UK shipping</strong> on all orders
          over £120.
        </Item>
        <Item>
          All orders are <strong className="text-cream">tracked</strong> — you'll
          receive a tracking link by email as soon as your order leaves us.
        </Item>
        <Item>
          Customs duties and import taxes for orders outside the UK and EU are the
          buyer's responsibility.
        </Item>
      </ul>
    </Section>
  );
}

function Returns() {
  return (
    <Section title="Returns Policy">
      <p>
        Because our wigs are intimate beauty products, we follow strict hygiene
        rules — but we want you to feel safe ordering.
      </p>
      <ul className="space-y-3 list-none pl-0">
        <Item>
          Unopened, unworn pieces in their original packaging can be returned
          within <strong className="text-cream">14 days of delivery</strong> for a
          full refund.
        </Item>
        <Item>
          Once a wig has been worn, installed, washed, dyed, or altered, we
          cannot accept it back for hygiene reasons.
        </Item>
        <Item>
          <strong className="text-cream">Customer pays return shipping</strong> —
          unless the item arrived faulty or we sent the wrong piece, in which
          case we cover the full cost.
        </Item>
        <Item>
          Refunds are issued to your original payment method within 5–7 working
          days of us receiving the return.
        </Item>
      </ul>
      <p className="text-sm">
        To start a return, email{" "}
        <a href="mailto:hello@melanvee.com" className="text-gold border-b border-gold/40">
          hello@melanvee.com
        </a>{" "}
        with your order number.
      </p>
    </Section>
  );
}

function Exchange() {
  return (
    <Section title="Exchange Policy">
      <p>
        Wrong texture? Wrong length? We'll help you find the right one.
      </p>
      <ul className="space-y-3 list-none pl-0">
        <Item>
          Exchanges are accepted within <strong className="text-cream">14 days</strong>{" "}
          of delivery on unopened, unworn pieces in original packaging.
        </Item>
        <Item>
          You can exchange for a different texture, length, or take store credit.
        </Item>
        <Item>
          <strong className="text-cream">Customer covers return shipping;</strong>{" "}
          we cover the cost of sending the new piece.
        </Item>
        <Item>
          If the new piece is more expensive, you'll be invoiced for the
          difference. If it's cheaper, you'll be refunded the difference.
        </Item>
      </ul>
    </Section>
  );
}

function PrivacyTerms() {
  return (
    <>
      <Section title="Privacy Policy">
        <p>
          We collect only what we need to fulfil your order: name, email, delivery
          address, payment details (processed securely by Stripe). We never sell
          your data.
        </p>
        <p>
          If you sign up to our mailing list, you can unsubscribe at any time
          using the link in any email we send.
        </p>
      </Section>
      <Section title="Terms of Service">
        <p>
          By placing an order with MELANVÉE you agree to these terms. All prices
          are listed in GBP and charged in GBP at checkout regardless of the
          display currency you've selected.
        </p>
        <p>
          Product images are styled professionally — natural variation in human
          hair (slight shade or curl pattern differences) is normal.
        </p>
      </Section>
    </>
  );
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="text-gold flex-shrink-0">✦</span>
      <span>{children}</span>
    </li>
  );
}

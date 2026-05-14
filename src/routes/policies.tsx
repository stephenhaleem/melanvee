import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
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
  { id: "all", label: "All Policies" },
  { id: "shipping", label: "Shipping" },
  { id: "returns", label: "Returns" },
  { id: "exchange", label: "Exchange" },
];

function Policies() {
  const [active, setActive] = useState<Tab>(() => {
    try {
      if (typeof window === "undefined") return "all" as Tab;
      const params = new URLSearchParams(window.location.search);
      const p = params.get("tab");
      if (p === "shipping" || p === "returns" || p === "exchange" || p === "all") return p as Tab;
      const h = window.location.hash.replace("#", "");
      if (h === "shipping" || h === "returns" || h === "exchange" || h === "all") return h as Tab;
      return "all" as Tab;
    } catch {
      return "all" as Tab;
    }
  });

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
      <p>All MELANVÉE orders are dispatched from our London studio.</p>
      <ul className="space-y-3 list-none pl-0">
        <Item>
          <strong className="text-cream">Dispatch:</strong> Within 24 to 72 hours of your order.
          Times may vary slightly during busy periods.
        </Item>
        <Item>
          <strong className="text-cream">UK & Europe:</strong> Delivered in 3 to 5 working days
          after dispatch.
        </Item>
        <Item>
          <strong className="text-cream">Rest of world:</strong> Delivered in 5 to 10 working days
          after dispatch.
        </Item>
        <Item>
          <strong className="text-cream">Free UK shipping</strong> on all orders over £100.
        </Item>
        <Item>
          <strong className="text-cream">Free international shipping</strong> on all orders.
        </Item>
        <Item>
          All orders are <strong className="text-cream">tracked</strong>. You will receive a
          tracking link by email as soon as your order leaves us.
        </Item>
        <Item>
          Customs duties and import taxes for orders outside the UK and EU are the buyer's
          responsibility.
        </Item>
      </ul>
    </Section>
  );
}

function Returns() {
  return (
    <Section title="Returns Policy">
      <p>
        Because our wigs are intimate beauty products, we follow strict hygiene rules, but we want
        you to feel safe ordering.
      </p>
      <ul className="space-y-3 list-none pl-0">
        <Item>
          Returns are accepted within <strong className="text-cream">14 days of delivery</strong>{" "}
          on unopened, unworn pieces in their original packaging.
        </Item>
        <Item>
          All returns are <strong className="text-cream">subject to a quality inspection</strong>.
          Refunds are only issued once the piece passes inspection and shows no sign of wear,
          washing, styling, dye or alteration.
        </Item>
        <Item>
          Once a wig has been worn, installed, washed, dyed or altered, we cannot accept it back
          for hygiene reasons.
        </Item>
        <Item>
          <strong className="text-cream">Return shipping is the customer's responsibility</strong>,
          except in the case of damaged or faulty items, or if we sent the wrong piece, in which
          case we cover the full cost.
        </Item>
        <Item>
          Approved refunds are issued to your original payment method within 5 to 7 working days
          of our inspection team receiving and approving the return.
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
      <p>Wrong texture? Wrong length? We will help you find the right one.</p>
      <ul className="space-y-3 list-none pl-0">
        <Item>
          Exchanges are accepted within <strong className="text-cream">7 days of delivery</strong>{" "}
          on unopened, unworn pieces in original packaging.
        </Item>
        <Item>
          You can exchange for a different texture, length, or take store credit.
        </Item>
        <Item>
          <strong className="text-cream">Customer covers return shipping.</strong> We cover the
          cost of sending the new piece.
        </Item>
        <Item>
          If the new piece is more expensive, you will be invoiced for the difference. If it is
          cheaper, you will be refunded the difference.
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
          We collect only what we need to fulfil your order: name, email, delivery address, payment
          details (processed securely by Stripe). We never sell your data.
        </p>
        <p>
          If you sign up to our mailing list, you can unsubscribe at any time using the link in any
          email we send.
        </p>
      </Section>
      <Section title="Terms of Service">
        <p>
          By placing an order with MELANVÉE you agree to these terms. All prices are listed in GBP
          and charged in GBP at checkout regardless of the display currency you have selected.
        </p>
        <p>
          Product images are styled professionally. Natural variation in human hair (slight shade
          or curl pattern differences) is normal.
        </p>
      </Section>
    </>
  );
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
      <span>{children}</span>
    </li>
  );
}

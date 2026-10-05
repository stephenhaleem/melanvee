import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { useSiteCopy } from "@/lib/site-copy";

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

function Policies() {
  const copy = useSiteCopy();
  const tabs: { id: Tab; label: string }[] = [
    { id: "all", label: copy("policies.all_title") },
    { id: "shipping", label: copy("policies.shipping_title") },
    { id: "returns", label: copy("policies.returns_title") },
    { id: "exchange", label: copy("policies.exchange_title") },
  ];
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
        <p className="text-xs uppercase tracking-luxe text-gold mb-5">{copy("policies.eyebrow")}</p>
        <h1 className="font-display text-5xl md:text-7xl text-cream leading-tight px-6">
          {copy("policies.heading")}
        </h1>
        <p className="mt-6 text-mauve max-w-xl mx-auto px-6">{copy("policies.description")}</p>
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
  const copy = useSiteCopy();
  return (
    <Section title={`${copy("policies.shipping_title")} Policy`}>
      <p>{copy("policies.shipping_intro")}</p>
      <PolicyList value={copy("policies.shipping_details")} />
    </Section>
  );
}

function Returns() {
  const copy = useSiteCopy();
  return (
    <Section title={`${copy("policies.returns_title")} Policy`}>
      <p>{copy("policies.returns_intro")}</p>
      <PolicyList value={copy("policies.returns_details")} />
      <p className="text-sm">{copy("policies.returns_contact")}</p>
    </Section>
  );
}

function Exchange() {
  const copy = useSiteCopy();
  return (
    <Section title={`${copy("policies.exchange_title")} Policy`}>
      <p>{copy("policies.exchange_intro")}</p>
      <PolicyList value={copy("policies.exchange_details")} />
    </Section>
  );
}

function PrivacyTerms() {
  const copy = useSiteCopy();
  return (
    <>
      <Section title={copy("policies.privacy_title")}>
        <PolicyParagraphs value={copy("policies.privacy_details")} />
      </Section>
      <Section title={copy("policies.terms_title")}>
        <PolicyParagraphs value={copy("policies.terms_details")} />
      </Section>
    </>
  );
}

function PolicyList({ value }: { value: string }) {
  return (
    <ul className="space-y-3 list-none pl-0">
      {value
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line, index) => (
          <li key={`${index}-${line}`} className="flex gap-3">
            <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
            <span>{line}</span>
          </li>
        ))}
    </ul>
  );
}

function PolicyParagraphs({ value }: { value: string }) {
  return (
    <>
      {value
        .split("\n")
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
        .map((paragraph, index) => (
          <p key={`${index}-${paragraph}`}>{paragraph}</p>
        ))}
    </>
  );
}

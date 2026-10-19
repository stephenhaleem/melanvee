import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useSiteCopy } from "@/lib/site-copy";

type Tab = "all" | "shipping" | "returns" | "exchange" | "privacy" | "terms";
const tabs: Tab[] = ["all", "shipping", "returns", "exchange", "privacy", "terms"];

function isTab(value: unknown): value is Tab {
  return typeof value === "string" && tabs.includes(value as Tab);
}

export const Route = createFileRoute("/policies")({
  validateSearch: (search: Record<string, unknown>) => {
    const hashTab = typeof window === "undefined" ? "" : window.location.hash.slice(1);
    return {
      tab: isTab(search.tab) ? search.tab : isTab(hashTab) ? hashTab : "all",
    };
  },
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

function Policies() {
  const copy = useSiteCopy();
  const navigate = useNavigate({ from: "/policies" });
  const { tab: active } = Route.useSearch();
  const policyTabs: { id: Tab; label: string }[] = [
    { id: "all", label: copy("policies.all_title") },
    { id: "shipping", label: copy("policies.shipping_title") },
    { id: "returns", label: copy("policies.returns_title") },
    { id: "exchange", label: copy("policies.exchange_title") },
    { id: "privacy", label: copy("policies.privacy_title") },
    { id: "terms", label: copy("policies.terms_title") },
  ];

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
            {policyTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => void navigate({ search: { tab: t.id } })}
                className={`px-5 py-3 text-xs uppercase tracking-luxe transition-all ${
                  active === t.id
                    ? "text-gold border-b-2 border-gold -mb-px"
                    : "text-mauve hover:text-cream"
                }`}
                aria-pressed={active === t.id}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="space-y-8 text-mauve leading-loose">
            {(active === "shipping" || active === "all") && <Shipping />}
            {(active === "returns" || active === "all") && <Returns />}
            {(active === "exchange" || active === "all") && <Exchange />}
            {(active === "privacy" || active === "all") && <Privacy />}
            {(active === "terms" || active === "all") && <Terms />}
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
      <PolicyDetailsTable value={copy("policies.shipping_details")} />
    </Section>
  );
}

function Returns() {
  const copy = useSiteCopy();
  return (
    <Section title={`${copy("policies.returns_title")} Policy`}>
      <p>{copy("policies.returns_intro")}</p>
      <PolicyDetailsTable value={copy("policies.returns_details")} />
      <p className="text-sm">{copy("policies.returns_contact")}</p>
    </Section>
  );
}

function Exchange() {
  const copy = useSiteCopy();
  return (
    <Section title={`${copy("policies.exchange_title")} Policy`}>
      <p>{copy("policies.exchange_intro")}</p>
      <PolicyDetailsTable value={copy("policies.exchange_details")} />
    </Section>
  );
}

function Privacy() {
  const copy = useSiteCopy();
  return (
    <Section title={copy("policies.privacy_title")}>
      <PolicyDetailsTable value={copy("policies.privacy_details")} />
    </Section>
  );
}

function Terms() {
  const copy = useSiteCopy();
  return (
    <Section title={copy("policies.terms_title")}>
      <PolicyDetailsTable value={copy("policies.terms_details")} />
    </Section>
  );
}

function PolicyDetailsTable({ value }: { value: string }) {
  const rows = value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="overflow-x-auto border border-border">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-charcoal text-xs uppercase tracking-luxe text-cream">
          <tr>
            <th scope="col" className="w-20 border-b border-border px-4 py-3">
              No.
            </th>
            <th scope="col" className="border-b border-border px-4 py-3">
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((line, index) => (
            <tr key={`${index}-${line}`} className="border-b border-border last:border-b-0">
              <th scope="row" className="px-4 py-4 align-top font-medium text-gold">
                {String(index + 1).padStart(2, "0")}
              </th>
              <td className="px-4 py-4 leading-relaxed">{line}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

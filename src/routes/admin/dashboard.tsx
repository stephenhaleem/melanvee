import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SITE_COPY_DEFAULTS, SITE_COPY_FIELDS, type SiteCopyKey } from "@/lib/site-copy";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

// ─── Auth guard ────────────────────────────────────────────────────────────
function useRequireAuth() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate({ to: "/admin" });
      } else {
        setReady(true);
      }
    });
  }, [navigate]);

  return ready;
}

// ─── Dashboard ──────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const ready = useRequireAuth();
  const navigate = useNavigate();

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin" });
  };

  if (!ready) return null;

  return (
    <div className="min-h-screen bg-ink text-cream">
      {/* Header */}
      <header className="border-b border-border bg-charcoal sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="font-display text-xl tracking-[0.2em] text-cream">MELANVÉE</p>
            <span className="text-[10px] uppercase tracking-luxe text-gold border border-gold/30 px-2 py-1">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              className="text-[11px] uppercase tracking-luxe text-mauve hover:text-gold transition-colors"
            >
              View site →
            </a>
            <button
              onClick={signOut}
              className="text-[11px] uppercase tracking-luxe text-mauve hover:text-gold transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div>
            <h1 className="font-display text-3xl text-cream">Website Copy</h1>
            <p className="text-mauve text-sm mt-1">
              Edit page headings, descriptions, and other website text.
            </p>
          </div>
        </div>

        <WebsiteCopyEditor />
      </main>
    </div>
  );
}

function WebsiteCopyEditor() {
  const [values, setValues] = useState<Record<SiteCopyKey, string>>(SITE_COPY_DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<SiteCopyKey | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savedKey, setSavedKey] = useState<SiteCopyKey | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const { data, error: queryError } = await supabase.from("site_copy").select("key, value");
        if (!active) return;
        if (queryError) {
          setError(`Couldn't load website copy: ${queryError.message}`);
        } else if (data) {
          setValues((current) => ({
            ...current,
            ...Object.fromEntries(data.map(({ key, value }) => [key, value])),
          }));
        }
        setLoading(false);
      } catch (queryError: unknown) {
        if (!active) return;
        setError(
          `Couldn't load website copy: ${queryError instanceof Error ? queryError.message : String(queryError)}`,
        );
        setLoading(false);
      }
    };
    void load();
    return () => {
      active = false;
    };
  }, []);

  const save = async (key: SiteCopyKey, value = values[key]) => {
    setSavingKey(key);
    setError(null);
    setSavedKey(null);
    try {
      const { error: saveError } = await supabase
        .from("site_copy")
        .upsert({ key, value, updated_at: new Date().toISOString() });
      if (saveError) {
        setError(
          `Couldn't save "${SITE_COPY_FIELDS.find((field) => field.key === key)?.label}": ${saveError.message}`,
        );
      } else {
        setValues((current) => ({ ...current, [key]: value }));
        setSavedKey(key);
      }
    } catch (saveError: unknown) {
      setError(
        `Couldn't save "${SITE_COPY_FIELDS.find((field) => field.key === key)?.label}": ${saveError instanceof Error ? saveError.message : String(saveError)}`,
      );
    } finally {
      setSavingKey(null);
    }
  };

  const sections = Array.from(new Set(SITE_COPY_FIELDS.map((field) => field.section)));

  if (loading) {
    return (
      <p className="text-mauve text-xs uppercase tracking-luxe animate-pulse">
        Loading website copy…
      </p>
    );
  }

  return (
    <div className="space-y-10">
      {error && (
        <p role="alert" className="border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </p>
      )}
      {sections.map((section) => (
        <section key={section}>
          <h2 className="font-display text-2xl text-cream mb-4">{section}</h2>
          <div className="space-y-4">
            {SITE_COPY_FIELDS.filter((field) => field.section === section).map((field) => (
              <div key={field.key} className="bg-charcoal border border-border p-5">
                <label
                  htmlFor={`site-copy-${field.key}`}
                  className="block text-xs uppercase tracking-luxe text-gold mb-3"
                >
                  {field.label}
                </label>
                <textarea
                  id={`site-copy-${field.key}`}
                  rows={Math.min(6, Math.max(2, Math.ceil(values[field.key].length / 90)))}
                  value={values[field.key]}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, [field.key]: event.target.value }))
                  }
                  className="w-full bg-ink border border-border focus:border-gold outline-none p-3 text-cream text-sm leading-relaxed resize-y"
                />
                <div className="mt-3 flex items-center justify-between gap-4">
                  <span className="text-xs text-green-400" aria-live="polite">
                    {savedKey === field.key ? "Saved" : ""}
                  </span>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setValues((current) => ({
                          ...current,
                          [field.key]: SITE_COPY_DEFAULTS[field.key],
                        }));
                        void save(field.key, SITE_COPY_DEFAULTS[field.key]);
                      }}
                      disabled={
                        savingKey === field.key ||
                        values[field.key] === SITE_COPY_DEFAULTS[field.key]
                      }
                      className="text-[10px] uppercase tracking-luxe text-mauve hover:text-cream disabled:opacity-40"
                    >
                      Reset
                    </button>
                    <button
                      type="button"
                      onClick={() => void save(field.key)}
                      disabled={savingKey === field.key}
                      className="bg-gold text-primary-foreground px-4 py-2 text-[10px] uppercase tracking-luxe hover:opacity-90 disabled:opacity-50"
                    >
                      {savingKey === field.key ? "Saving…" : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

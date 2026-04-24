import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/")({
  component: AdminLogin,
});

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin/dashboard" });
    });
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }
    navigate({ to: "/admin/dashboard" });
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="font-display text-3xl tracking-[0.25em] text-cream">M E L A N V É E</p>
          <p className="mt-2 text-xs uppercase tracking-luxe text-mauve">Admin</p>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-charcoal border border-border p-8 space-y-5 shadow-luxe"
        >
          <div>
            <label className="block text-[10px] uppercase tracking-luxe text-gold mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-cream placeholder:text-mauve transition-colors text-sm"
              placeholder="you@melanvee.com"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-luxe text-gold mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-cream placeholder:text-mauve transition-colors text-sm"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-[11px] text-rose-400 uppercase tracking-wider">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-primary-foreground py-3 text-xs uppercase tracking-luxe hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

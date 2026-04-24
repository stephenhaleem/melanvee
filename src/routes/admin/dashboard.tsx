import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  fetchAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  deleteProductImage,
  type Product,
  type LengthOption,
} from "@/lib/supabase-products";

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
        navigate({ to: "/admin/" });
      } else {
        setReady(true);
      }
    });
  }, []);

  return ready;
}

// ─── Empty product form ─────────────────────────────────────────────────────
const emptyForm = (): Omit<Product, "in_stock" | "sort_order"> => ({
  id: "",
  name: "",
  type: "",
  texture: "",
  tagline: "",
  description: "",
  starting_price_gbp: 0,
  image_url: null,
  notes: [],
  lengths: [14, 16, 18, 20, 22, 24].map((inches, i) => ({
    inches,
    price: 149 + i * 15,
  })),
});

// ─── Dashboard ──────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const ready = useRequireAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchAllProducts();
      setProducts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ready) load();
  }, [ready]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin/" });
  };

  const toggleStock = async (product: Product) => {
    await updateProduct(product.id, { in_stock: !product.in_stock });
    showToast(`${product.name} marked as ${product.in_stock ? "out of stock" : "in stock"}`);
    load();
  };

  const handleDelete = async (product: Product) => {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    if (product.image_url) await deleteProductImage(product.image_url);
    await deleteProduct(product.id);
    showToast(`${product.name} deleted`);
    load();
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
        {/* Page title + add button */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-3xl text-cream">Products</h1>
            <p className="text-mauve text-sm mt-1">{products.length} products in database</p>
          </div>
          <button
            onClick={() => setCreating(true)}
            className="bg-gold text-primary-foreground px-6 py-3 text-xs uppercase tracking-luxe hover:opacity-90 transition-opacity"
          >
            + Add Product
          </button>
        </div>

        {/* Products table */}
        {loading ? (
          <p className="text-mauve text-xs uppercase tracking-luxe animate-pulse">Loading…</p>
        ) : (
          <div className="space-y-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-charcoal border border-border p-5 flex items-center gap-5"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 flex-shrink-0 overflow-hidden bg-noir">
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-mauve text-[10px]">No img</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-display text-lg text-cream truncate">{p.name}</p>
                  <p className="text-xs text-mauve mt-0.5">
                    {p.texture} · {p.type} · from £{p.starting_price_gbp}
                  </p>
                  <p className="text-[10px] uppercase tracking-luxe mt-1">
                    {p.lengths.length} lengths · Sort #{p.sort_order}
                  </p>
                </div>

                {/* Stock badge */}
                <button
                  onClick={() => toggleStock(p)}
                  className={`text-[10px] uppercase tracking-luxe px-3 py-1.5 border transition-colors flex-shrink-0 ${
                    p.in_stock
                      ? "border-green-500/40 text-green-400 hover:bg-green-500/10"
                      : "border-red-500/40 text-red-400 hover:bg-red-500/10"
                  }`}
                >
                  {p.in_stock ? "In Stock" : "Out of Stock"}
                </button>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setEditing(p)}
                    className="text-[11px] uppercase tracking-luxe border border-border px-4 py-2 text-mauve hover:text-gold hover:border-gold transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p)}
                    className="text-[11px] uppercase tracking-luxe border border-red-500/30 px-4 py-2 text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {products.length === 0 && (
              <div className="text-center py-20 border border-border">
                <p className="font-display text-xl text-cream mb-2">No products yet</p>
                <p className="text-mauve text-sm">Click "Add Product" to get started.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Edit / Create modal */}
      {(editing || creating) && (
        <ProductModal
          product={editing ?? undefined}
          onClose={() => {
            setEditing(null);
            setCreating(false);
          }}
          onSaved={() => {
            setEditing(null);
            setCreating(false);
            load();
            showToast(editing ? "Product updated" : "Product created");
          }}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-noir border border-gold/30 text-cream px-5 py-3 text-xs uppercase tracking-luxe shadow-luxe z-50 animate-in fade-in slide-in-from-bottom-2">
          {toast}
        </div>
      )}
    </div>
  );
}

// ─── Product modal ──────────────────────────────────────────────────────────
function ProductModal({
  product,
  onClose,
  onSaved,
}: {
  product?: Product;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isNew = !product;
  const [form, setForm] = useState<Omit<Product, "in_stock" | "sort_order">>(
    product
      ? {
          id: product.id,
          name: product.name,
          type: product.type,
          texture: product.texture,
          tagline: product.tagline,
          description: product.description,
          starting_price_gbp: product.starting_price_gbp,
          image_url: product.image_url,
          notes: product.notes,
          lengths: product.lengths,
        }
      : emptyForm(),
  );
  const [notesRaw, setNotesRaw] = useState(
    product ? product.notes.join(", ") : "Half Wig, 4A – 4B Match, No Lace",
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(product?.image_url ?? null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof typeof form, value: unknown) => setForm((f) => ({ ...f, [key]: value }));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const updateLength = (index: number, field: keyof LengthOption, value: number) => {
    const updated = form.lengths.map((l, i) => (i === index ? { ...l, [field]: value } : l));
    set("lengths", updated);
  };

  const addLength = () => {
    const lastInches = form.lengths[form.lengths.length - 1]?.inches ?? 12;
    const lastPrice = form.lengths[form.lengths.length - 1]?.price ?? 149;
    set("lengths", [...form.lengths, { inches: lastInches + 2, price: lastPrice + 15 }]);
  };

  const removeLength = (index: number) => {
    set(
      "lengths",
      form.lengths.filter((_, i) => i !== index),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Parse notes
      const notes = notesRaw
        .split(",")
        .map((n) => n.trim())
        .filter(Boolean);

      let image_url = form.image_url;

      // Upload image if a new one was selected
      if (imageFile) {
        const productId = isNew
          ? form.id || form.name.toLowerCase().replace(/\s+/g, "-")
          : product!.id;
        // Delete old image if replacing
        if (!isNew && product!.image_url) {
          await deleteProductImage(product!.image_url);
        }
        image_url = await uploadProductImage(imageFile, productId);
      }

      const payload = {
        ...form,
        notes,
        image_url,
        starting_price_gbp: form.lengths[0]?.price ?? form.starting_price_gbp,
      };

      if (isNew) {
        await createProduct({ ...payload, in_stock: true, sort_order: 0 });
      } else {
        await updateProduct(product!.id, payload);
      }

      onSaved();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4">
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-charcoal border border-border shadow-luxe">
        {/* Modal header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-border">
          <p className="font-display text-xl text-cream">
            {isNew ? "Add Product" : `Edit — ${product!.name}`}
          </p>
          <button onClick={onClose} className="text-mauve hover:text-gold text-2xl leading-none">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* ID — only for new products */}
          {isNew && (
            <Field label="Product ID (slug, e.g. kimi-curl)" required>
              <input
                value={form.id}
                onChange={(e) => set("id", e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                required
                placeholder="kimi-curl"
                className={inputCls}
              />
            </Field>
          )}

          <div className="grid sm:grid-cols-2 gap-6">
            <Field label="Name" required>
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                required
                placeholder="Kimi Curl"
                className={inputCls}
              />
            </Field>
            <Field label="Type" required>
              <input
                value={form.type}
                onChange={(e) => set("type", e.target.value)}
                required
                placeholder="Half Wig"
                className={inputCls}
              />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <Field label="Texture" required>
              <input
                value={form.texture}
                onChange={(e) => set("texture", e.target.value)}
                required
                placeholder="4A – 4B"
                className={inputCls}
              />
            </Field>
            <Field label="Tagline" required>
              <input
                value={form.tagline}
                onChange={(e) => set("tagline", e.target.value)}
                required
                placeholder="Defined springy curls"
                className={inputCls}
              />
            </Field>
          </div>

          <Field label="Description" required>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              required
              rows={4}
              className={inputCls + " resize-none"}
              placeholder="Full product description…"
            />
          </Field>

          <Field label="Key Features (comma-separated)">
            <input
              value={notesRaw}
              onChange={(e) => setNotesRaw(e.target.value)}
              placeholder="Half Wig, 4A – 4B Match, No Lace"
              className={inputCls}
            />
          </Field>

          {/* Image upload */}
          <Field label="Product Image">
            <div className="flex items-start gap-4">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-20 h-20 object-cover flex-shrink-0"
                />
              )}
              <div className="flex-1">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="text-[11px] uppercase tracking-luxe border border-border px-4 py-2 text-mauve hover:text-gold hover:border-gold transition-colors"
                >
                  {imagePreview ? "Change Image" : "Upload Image"}
                </button>
                {imagePreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                      set("image_url", null);
                    }}
                    className="ml-3 text-[11px] uppercase tracking-luxe text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                )}
                <p className="text-[10px] text-mauve mt-2">JPG or PNG, max 5MB</p>
              </div>
            </div>
          </Field>

          {/* Lengths */}
          <Field label="Lengths & Prices">
            <div className="space-y-2">
              {form.lengths.map((l, i) => (
                <div key={i} className="flex items-center gap-3">
                  <input
                    type="number"
                    value={l.inches}
                    onChange={(e) => updateLength(i, "inches", Number(e.target.value))}
                    className={inputCls + " w-20 text-center"}
                    placeholder="inches"
                  />
                  <span className="text-mauve text-xs">&quot;</span>
                  <span className="text-mauve text-xs">£</span>
                  <input
                    type="number"
                    value={l.price}
                    onChange={(e) => updateLength(i, "price", Number(e.target.value))}
                    className={inputCls + " w-24"}
                    placeholder="price"
                  />
                  <button
                    type="button"
                    onClick={() => removeLength(i)}
                    className="text-red-400 hover:text-red-300 text-xs uppercase tracking-luxe"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addLength}
                className="text-[11px] uppercase tracking-luxe text-gold hover:text-gold/70 transition-colors mt-1"
              >
                + Add length
              </button>
            </div>
          </Field>

          {error && <p className="text-[11px] text-red-400 uppercase tracking-wider">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-gold text-primary-foreground py-3 text-xs uppercase tracking-luxe hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {saving ? "Saving…" : isNew ? "Create Product" : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-border text-xs uppercase tracking-luxe text-mauve hover:text-gold hover:border-gold transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-luxe text-gold mb-2">
        {label}
        {required && <span className="text-gold/60 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full bg-transparent border-b border-border focus:border-gold outline-none py-2.5 text-cream placeholder:text-mauve transition-colors text-sm";

import { supabase } from "@/integrations/supabase/client";

export type LengthOption = { inches: number; price: number };

export type Product = {
  id: string;
  name: string;
  type: string;
  texture: string;
  tagline: string;
  description: string;
  starting_price_gbp: number;
  image_url: string | null;
  notes: string[];
  lengths: LengthOption[];
  in_stock: boolean;
  sort_order: number;
};

/** Fetch all in-stock products ordered by sort_order */
export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("in_stock", true)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return (data ?? []) as unknown as Product[];
}

/** Fetch ALL products including out-of-stock (admin only) */
export async function fetchAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return (data ?? []) as Product[];
}

export async function createProduct(
  product: Omit<Product, "in_stock" | "sort_order"> & { in_stock?: boolean; sort_order?: number },
): Promise<Product> {
  const { data, error } = await supabase.from("products").insert(product).select().single();
  if (error) throw error;
  return data as Product;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Product;
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

/** Upload an image to Supabase Storage and return the public URL */
export async function uploadProductImage(file: File, productId: string): Promise<string> {
  const ext = file.name.split(".").pop();
  const path = `${productId}-${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(path, file, { upsert: true });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("product-images").getPublicUrl(path);
  return data.publicUrl;
}

/** Delete an image from storage by its public URL */
export async function deleteProductImage(publicUrl: string): Promise<void> {
  const path = publicUrl.split("/product-images/")[1];
  if (!path) return;
  await supabase.storage.from("product-images").remove([path]);
}

CREATE TABLE public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  texture TEXT NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  starting_price_gbp NUMERIC NOT NULL,
  image_url TEXT,
  notes TEXT[] NOT NULL DEFAULT '{}',
  lengths JSONB NOT NULL DEFAULT '[]'::jsonb,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can view in-stock products"
  ON public.products
  FOR SELECT
  USING (in_stock = true);
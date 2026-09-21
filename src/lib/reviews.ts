import { supabase } from "@/integrations/supabase/client";

export type Review = {
  id: string;
  productId: string;
  name: string;
  email: string | null;
  rating: number;
  title: string | null;
  body: string;
  photoUrls: string[];
  videoUrls: string[];
  createdAt: string;
};

export type ReviewStats = {
  count: number;
  average: number; // rounded to 1 decimal, 0 if no reviews
  breakdown: Record<1 | 2 | 3 | 4 | 5, number>;
};

const MAX_MEDIA_ITEMS = 6;
const MAX_PHOTO_BYTES = 8 * 1024 * 1024; // 8MB per photo
const MAX_VIDEO_BYTES = 50 * 1024 * 1024; // 50MB per video

function mapRow(row: {
  id: string;
  product_id: string;
  name: string;
  email: string | null;
  rating: number;
  title: string | null;
  body: string;
  photo_urls: string[] | null;
  video_urls: string[] | null;
  created_at: string;
}): Review {
  return {
    id: row.id,
    productId: row.product_id,
    name: row.name,
    email: row.email,
    rating: row.rating,
    title: row.title,
    body: row.body,
    photoUrls: row.photo_urls ?? [],
    videoUrls: row.video_urls ?? [],
    createdAt: row.created_at,
  };
}

/** Fetch all reviews for a single product, newest first. */
export async function fetchReviews(productId: string): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapRow);
}

/** Compute count / average / star breakdown from a list of reviews already in memory. */
export function getReviewStats(reviews: Review[]): ReviewStats {
  const breakdown: ReviewStats["breakdown"] = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let total = 0;

  for (const r of reviews) {
    const bucket = Math.min(5, Math.max(1, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5;
    breakdown[bucket] += 1;
    total += r.rating;
  }

  const count = reviews.length;
  const average = count > 0 ? Math.round((total / count) * 10) / 10 : 0;

  return { count, average, breakdown };
}

/**
 * Upload review photos to the public `review-photos` Supabase Storage bucket.
 * Returns the public URLs in the same order as the input files.
 * Silently skips files that are too large or not images rather than failing the whole batch.
 */
export async function uploadReviewPhotos(productId: string, files: File[]): Promise<string[]> {
  const usable = files
    .filter((f) => f.type.startsWith("image/"))
    .filter((f) => f.size <= MAX_PHOTO_BYTES)
    .slice(0, MAX_MEDIA_ITEMS);

  const urls: string[] = [];

  for (const file of usable) {
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${productId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage.from("review-photos").upload(path, file, {
      cacheControl: "31536000",
      upsert: false,
    });

    if (error) {
      console.error("[reviews] Photo upload failed:", error);
      continue;
    }

    const { data } = supabase.storage.from("review-photos").getPublicUrl(path);
    urls.push(data.publicUrl);
  }

  return urls;
}

/**
 * Upload review videos to the public `review-videos` Supabase Storage bucket.
 * Returns the public URLs in the same order as the input files.
 * Silently skips unsupported files or files over the size limit.
 */
export async function uploadReviewVideos(productId: string, files: File[]): Promise<string[]> {
  const usable = files
    .filter((f) => f.type.startsWith("video/") || f.name.match(/\.(mp4|mov|webm|m4v)$/i))
    .filter((f) => f.size <= MAX_VIDEO_BYTES)
    .slice(0, MAX_MEDIA_ITEMS);

  const urls: string[] = [];

  for (const file of usable) {
    const extension = file.name.split(".").pop()?.toLowerCase() || "mp4";
    const path = `${productId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;

    const { error } = await supabase.storage.from("review-videos").upload(path, file, {
      cacheControl: "31536000",
      upsert: false,
    });

    if (error) {
      console.error("[reviews] Video upload failed:", error);
      continue;
    }

    const { data } = supabase.storage.from("review-videos").getPublicUrl(path);
    urls.push(data.publicUrl);
  }

  return urls;
}

export type SubmitReviewInput = {
  productId: string;
  name: string;
  email?: string;
  rating: number;
  title?: string;
  body: string;
  photos?: File[];
  videos?: File[];
};

/** Submit a new review, uploading attached photos/videos first. */
export async function submitReview(input: SubmitReviewInput): Promise<Review> {
  const name = input.name.trim();
  const body = input.body.trim();
  const rating = Math.min(5, Math.max(1, Math.round(input.rating)));

  if (!name) throw new Error("Please enter your name.");
  if (!body) throw new Error("Please write a review before submitting.");

  let photoUrls: string[] = [];
  if (input.photos && input.photos.length > 0) {
    photoUrls = await uploadReviewPhotos(input.productId, input.photos);
  }

  let videoUrls: string[] = [];
  if (input.videos && input.videos.length > 0) {
    videoUrls = await uploadReviewVideos(input.productId, input.videos);
  }

  const { data, error } = await supabase
    .from("reviews")
    .insert({
      product_id: input.productId,
      name,
      email: input.email?.trim() || null,
      rating,
      title: input.title?.trim() || null,
      body,
      photo_urls: photoUrls,
      video_urls: videoUrls,
    })
    .select()
    .single();

  if (error) throw error;
  return mapRow(data);
}

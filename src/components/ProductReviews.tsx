import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  fetchReviews,
  getReviewStats,
  submitReview,
  type Review,
  type ReviewStats,
} from "@/lib/reviews";
import { showToast } from "@/components/ToastHost";

type Props = {
  productId: string;
  productName: string;
};

function Stars({ value, size = "text-sm" }: { value: number; size?: string }) {
  return (
    <span className={`inline-flex gap-0.5 text-gold ${size}`} aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < Math.round(value) ? "" : "opacity-25"}>
          ★
        </span>
      ))}
    </span>
  );
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function StatsSummary({ stats }: { stats: ReviewStats }) {
  if (stats.count === 0) {
    return (
      <div className="text-center py-10">
        <p className="font-display text-2xl text-cream mb-2">No reviews yet</p>
        <p className="text-mauve text-sm">Be the first to share how this piece wore for you.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-12 pb-10 mb-10 border-b border-border">
      <div className="text-center sm:text-left flex-shrink-0">
        <p className="font-display text-6xl text-gold leading-none">{stats.average}</p>
        <div className="mt-3 flex justify-center sm:justify-start">
          <Stars value={stats.average} size="text-base" />
        </div>
        <p className="mt-2 text-[10px] uppercase tracking-luxe text-mauve">
          {stats.count} review{stats.count !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex-1 w-full max-w-sm space-y-1.5">
        {([5, 4, 3, 2, 1] as const).map((star) => {
          const n = stats.breakdown[star];
          const pct = stats.count > 0 ? Math.round((n / stats.count) * 100) : 0;
          return (
            <div key={star} className="flex items-center gap-3 text-xs text-mauve">
              <span className="w-10 flex-shrink-0 uppercase tracking-wider">{star} star</span>
              <div className="flex-1 h-1.5 bg-border overflow-hidden">
                <div className="h-full bg-gold" style={{ width: `${pct}%` }} />
              </div>
              <span className="w-6 flex-shrink-0 text-right tabular-nums">{n}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  return (
    <div className="border-b border-border pb-8 mb-8 last:border-0 last:mb-0 last:pb-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center text-xs tracking-wider flex-shrink-0">
            {initialsOf(review.name)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-cream">{review.name}</p>
              <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider text-gold border border-gold/40 px-1.5 py-0.5 leading-none">
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Verified
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-luxe text-mauve mt-0.5">
              {timeAgo(review.createdAt)}
            </p>
          </div>
        </div>
        <Stars value={review.rating} />
      </div>

      {review.title && (
        <p className="font-display text-lg text-cream mt-5 leading-snug">{review.title}</p>
      )}
      <p className="text-mauve leading-relaxed mt-2 whitespace-pre-line">{review.body}</p>

      {review.photoUrls.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {review.photoUrls.map((url, i) => (
            <button
              key={url}
              onClick={() => setLightboxIdx(i)}
              className="w-20 h-20 overflow-hidden bg-noir flex-shrink-0"
              aria-label={`View photo ${i + 1} from ${review.name}'s review`}
            >
              <img
                src={url}
                alt={`Photo from ${review.name}'s review`}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </button>
          ))}
        </div>
      )}

      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[90] bg-ink/95 backdrop-blur-md flex items-center justify-center px-6"
          onClick={() => setLightboxIdx(null)}
        >
          <button
            onClick={() => setLightboxIdx(null)}
            className="absolute top-5 right-6 text-cream/60 hover:text-gold text-3xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
          <img
            src={review.photoUrls[lightboxIdx]}
            alt={`Photo from ${review.name}'s review`}
            className="max-w-2xl w-full max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

function WriteReviewForm({
  productId,
  productName,
  onSubmitted,
}: {
  productId: string;
  productName: string;
  onSubmitted: (review: Review) => void;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => previews.forEach((p) => URL.revokeObjectURL(p));
  }, [previews]);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const incoming = Array.from(e.target.files ?? []);
    const combined = [...photos, ...incoming].slice(0, 6);
    setPhotos(combined);
    previews.forEach((p) => URL.revokeObjectURL(p));
    setPreviews(combined.map((f) => URL.createObjectURL(f)));
    e.target.value = "";
  };

  const removePhoto = (idx: number) => {
    setPhotos((p) => p.filter((_, i) => i !== idx));
    setPreviews((p) => {
      URL.revokeObjectURL(p[idx]);
      return p.filter((_, i) => i !== idx);
    });
  };

  const reset = () => {
    setName("");
    setEmail("");
    setRating(5);
    setTitle("");
    setBody("");
    previews.forEach((p) => URL.revokeObjectURL(p));
    setPhotos([]);
    setPreviews([]);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const review = await submitReview({
        productId,
        name,
        email: email || undefined,
        rating,
        title: title || undefined,
        body,
        photos,
      });
      onSubmitted(review);
      showToast("Review posted — thank you");
      reset();
      setOpen(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong posting your review. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-gold text-primary-foreground px-8 py-4 text-xs uppercase tracking-luxe hover:shadow-rose-glow transition-all duration-500"
      >
        Write a Review
      </button>
    );
  }

  const displayRating = hoverRating ?? rating;

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      onSubmit={onSubmit}
      className="bg-card border border-border p-8 md:p-10 space-y-7"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-luxe text-gold mb-2">Write a Review</p>
          <p className="font-display text-2xl text-cream">{productName}</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-mauve hover:text-gold text-2xl leading-none"
          aria-label="Cancel"
        >
          ×
        </button>
      </div>

      {/* Rating */}
      <div>
        <label className="block text-[10px] uppercase tracking-luxe text-gold mb-3">
          Your Rating
        </label>
        <div
          className="flex gap-1 text-3xl text-gold w-fit cursor-pointer"
          onMouseLeave={() => setHoverRating(null)}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onMouseEnter={() => setHoverRating(n)}
              onClick={() => setRating(n)}
              className={n <= displayRating ? "" : "opacity-25"}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="rev-name"
            className="block text-[10px] uppercase tracking-luxe text-gold mb-3"
          >
            Your Name
          </label>
          <input
            id="rev-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={80}
            placeholder="Amara O."
            className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-cream placeholder:text-mauve transition-colors"
          />
        </div>
        <div>
          <label
            htmlFor="rev-email"
            className="block text-[10px] uppercase tracking-luxe text-gold mb-3"
          >
            Email <span className="normal-case text-mauve">(optional, not shown publicly)</span>
          </label>
          <input
            id="rev-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-cream placeholder:text-mauve transition-colors"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="rev-title"
          className="block text-[10px] uppercase tracking-luxe text-gold mb-3"
        >
          Review Title <span className="normal-case text-mauve">(optional)</span>
        </label>
        <input
          id="rev-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={120}
          placeholder="Sum it up in a few words"
          className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-cream placeholder:text-mauve transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="rev-body"
          className="block text-[10px] uppercase tracking-luxe text-gold mb-3"
        >
          Your Review
        </label>
        <textarea
          id="rev-body"
          required
          rows={5}
          maxLength={2000}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="How did it blend, fit, and wear?"
          className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-cream placeholder:text-mauve resize-none transition-colors"
        />
      </div>

      {/* Photos */}
      <div>
        <label className="block text-[10px] uppercase tracking-luxe text-gold mb-3">
          Add Photos <span className="normal-case text-mauve">(optional, up to 6)</span>
        </label>
        <div className="flex flex-wrap gap-3">
          {previews.map((src, i) => (
            <div key={src} className="relative w-20 h-20 flex-shrink-0">
              <img src={src} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(i)}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-ink border border-gold/40 text-cream text-xs flex items-center justify-center hover:text-gold"
                aria-label="Remove photo"
              >
                ×
              </button>
            </div>
          ))}
          {photos.length < 6 && (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-20 h-20 flex-shrink-0 border border-dashed border-border text-mauve hover:border-gold hover:text-gold transition-colors flex flex-col items-center justify-center text-[10px] uppercase tracking-wider gap-1"
            >
              <span className="text-xl leading-none">+</span>
              Add
            </button>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFiles}
          className="hidden"
        />
      </div>

      {error && <p className="text-[11px] text-rose-400 uppercase tracking-wider">{error}</p>}

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="bg-gold text-primary-foreground px-8 py-4 text-xs uppercase tracking-luxe hover:shadow-rose-glow transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Posting…" : "Post Review"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-xs uppercase tracking-luxe text-mauve hover:text-cream transition-colors"
        >
          Cancel
        </button>
      </div>
    </motion.form>
  );
}

export function ProductReviews({ productId, productName }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);
    fetchReviews(productId)
      .then((data) => {
        if (!cancelled) setReviews(data);
      })
      .catch((err) => {
        console.error("[reviews] Failed to load:", err);
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [productId]);

  const stats = getReviewStats(reviews);

  return (
    <div>
      {loading ? (
        <div className="py-10 space-y-4 animate-pulse">
          <div className="h-12 w-32 bg-charcoal" />
          <div className="h-4 w-48 bg-charcoal" />
        </div>
      ) : error ? (
        <p className="text-mauve text-sm py-6">
          Couldn't load reviews right now. Please refresh and try again.
        </p>
      ) : (
        <StatsSummary stats={stats} />
      )}

      <div className="mb-10">
        <WriteReviewForm
          productId={productId}
          productName={productName}
          onSubmitted={(review) => setReviews((r) => [review, ...r])}
        />
      </div>

      {!loading && reviews.length > 0 && (
        <div>
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      )}
    </div>
  );
}

import { useState, useEffect, useCallback } from "react";
import type { ShopifyImage } from "@/lib/shopify";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  images: { node: ShopifyImage }[];
  productTitle: string;
  textureBadge?: string;
};

export function ProductImageGallery({ images, productTitle, textureBadge }: Props) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const count = images.length;

  const prev = useCallback(() => setActive((i) => (i - 1 + count) % count), [count]);
  const next = useCallback(() => setActive((i) => (i + 1) % count), [count]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, prev, next]);

  // Lock scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  if (count === 0) return null;

  const activeImage = images[active].node;

  return (
    <>
      {/* ── Main Gallery ─────────────────────────────────── */}
      <div className="flex flex-col gap-3">
        {/* Hero image */}
        <div
          className="relative aspect-[4/5] overflow-hidden bg-card shadow-luxe group cursor-zoom-in"
          onClick={() => {
            setLightbox(true);
            setZoomed(false);
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setZoomed(false)}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImage.url}
              src={activeImage.url}
              alt={activeImage.altText ?? productTitle}
              width={activeImage.width}
              height={activeImage.height}
              className="w-full h-full object-cover"
              style={{
                transformOrigin: zoomed ? `${zoomPos.x}% ${zoomPos.y}%` : "center",
              }}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>

          {/* Texture badge */}
          {textureBadge && (
            <div className="absolute top-4 left-4 bg-ink/80 backdrop-blur-sm text-cream text-[10px] uppercase tracking-luxe px-3 py-1.5 pointer-events-none">
              {textureBadge}
            </div>
          )}

          {/* Image counter */}
          {count > 1 && (
            <div className="absolute bottom-4 right-4 bg-ink/70 backdrop-blur-sm text-cream text-[10px] uppercase tracking-luxe px-3 py-1.5 pointer-events-none">
              {active + 1} / {count}
            </div>
          )}

          {/* Expand icon hint */}
          <div className="absolute top-4 right-4 w-8 h-8 bg-ink/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </div>

          {/* Prev/Next arrows (only if >1 image) */}
          {count > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-ink/60 backdrop-blur-sm text-cream flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gold hover:text-ink"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-ink/60 backdrop-blur-sm text-cream flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gold hover:text-ink"
                aria-label="Next image"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {count > 1 && (
          <div
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${Math.min(count, 5)}, 1fr)` }}
          >
            {images.map(({ node }, i) => (
              <button
                key={node.url}
                onClick={() => setActive(i)}
                className={`relative aspect-square overflow-hidden transition-all duration-200 ${
                  i === active
                    ? "ring-1 ring-gold ring-offset-1 ring-offset-ink"
                    : "opacity-55 hover:opacity-90"
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <img
                  src={node.url}
                  alt={node.altText ?? `${productTitle} ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox ──────────────────────────────────────── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[90] bg-ink/95 backdrop-blur-md flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          {/* Close */}
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-5 right-6 text-cream/60 hover:text-gold text-3xl leading-none z-10"
            aria-label="Close"
          >
            ×
          </button>

          {/* Image count */}
          <p className="absolute top-6 left-6 text-[10px] uppercase tracking-luxe text-mauve">
            {active + 1} / {count}
          </p>

          {/* Prev */}
          {count > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-cream/60 hover:text-gold text-5xl leading-none z-10 p-2"
              aria-label="Previous"
            >
              ‹
            </button>
          )}

          {/* Main lightbox image */}
          <div className="max-w-2xl w-full px-16 md:px-24" onClick={(e) => e.stopPropagation()}>
            <motion.img
              key={activeImage.url}
              src={activeImage.url}
              alt={activeImage.altText ?? productTitle}
              className="w-full h-auto max-h-[85vh] object-contain"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
            {activeImage.altText && (
              <p className="text-center text-[10px] uppercase tracking-luxe text-mauve mt-4">
                {activeImage.altText}
              </p>
            )}
          </div>

          {/* Next */}
          {count > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-cream/60 hover:text-gold text-5xl leading-none z-10 p-2"
              aria-label="Next"
            >
              ›
            </button>
          )}

          {/* Thumbnail dots */}
          {count > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive(i);
                  }}
                  className={`transition-all duration-200 ${
                    i === active
                      ? "w-6 h-1.5 bg-gold"
                      : "w-1.5 h-1.5 rounded-full bg-mauve/40 hover:bg-mauve"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

ALTER TABLE public.reviews
  ADD COLUMN IF NOT EXISTS video_urls text[] NOT NULL DEFAULT '{}';

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'review-videos',
  'review-videos',
  true,
  52428800,
  ARRAY['video/mp4', 'video/quicktime', 'video/webm', 'video/x-m4v']
)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Review videos are publicly readable"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'review-videos');

CREATE POLICY "Review videos can be uploaded publicly"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'review-videos');

CREATE POLICY "Review videos can be updated publicly"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'review-videos')
  WITH CHECK (bucket_id = 'review-videos');

CREATE POLICY "Review videos can be deleted publicly"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'review-videos');

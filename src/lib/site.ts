// Site URL used for post-checkout return. Prefer an injected env var, fall back to window origin or a sane default.
export const SITE_URL = (typeof process !== "undefined" && (process.env.NEXT_PUBLIC_SITE_URL as string | undefined)) ??
  (typeof window !== "undefined" ? window.location.origin : "https://melanvee.com");

// Site URL used for post-checkout return. Prefer an injected env var, fall back to window origin or a sane default.
const configuredSiteUrl =
  typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SITE_URL : undefined;

export const SITE_URL =
  configuredSiteUrl || (typeof window !== "undefined" ? window.location.origin : "https://melanvee.com");

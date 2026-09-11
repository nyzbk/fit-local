export const CONTACT_EMAIL = "ultaultimatum@gmail.com";
export const STUDIO_NAME = "Ultimatum";
export const SITE_ORIGIN = "https://fit-local-six.vercel.app";
export const SITE_NAME = "Fit";
export const HUB_URL = "https://ultimatum-hub.vercel.app/";
export const CONTENT_LASTMOD = "2026-09-11";
export const ADSENSE_CLIENT = "ca-pub-7636435144500691";

/** Public URL. Never derive from request.url — preview hosts must not leak into canonical or sitemap. */
export function absUrl(path: string): string {
  if (!path || path === "/") return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

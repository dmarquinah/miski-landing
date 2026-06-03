/**
 * Unsplash stand-in image helper (replace with real brand photography later).
 * Mirrors the reference `u(id, w)` URL builder.
 */
const UNSPLASH_BASE = "https://images.unsplash.com/photo-";

export function unsplashUrl(id: string, w = 1100): string {
  return `${UNSPLASH_BASE}${id}?auto=format&fit=crop&w=${w}&q=80`;
}

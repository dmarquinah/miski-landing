/**
 * Central site configuration — single source of truth for SEO metadata.
 * Edit these values (and set NEXT_PUBLIC_SITE_URL in your environment) to
 * propagate across <head> metadata, sitemap.xml, robots.txt and the manifest.
 */
export const siteConfig = {
  name: "Miskiwarmi",
  // Short, keyword-rich description used as the default meta description.
  description: "Miskiwarmi — landing page.",
  // Canonical production URL. Override per-environment with NEXT_PUBLIC_SITE_URL.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://miskiwarmi.com",
  // BCP-47 locale used for <html lang> and Open Graph locale.
  locale: "es_PE",
  // Used by Twitter/X card metadata, e.g. "@miskiwarmi". Leave empty to omit.
  twitter: "",
} as const;

/** Normalized origin without a trailing slash, safe for URL construction. */
export const siteUrl = siteConfig.url.replace(/\/$/, "");

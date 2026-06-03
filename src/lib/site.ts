/**
 * Central site configuration — single source of truth for SEO metadata.
 * Edit these values (and set NEXT_PUBLIC_SITE_URL in your environment) to
 * propagate across <head> metadata, sitemap.xml, robots.txt and the manifest.
 */
export const siteConfig = {
  name: "Miski Warmi",
  // Full home <title>. Keyword-rich for SEO.
  title: "Miski Warmi — Dulzura que cuida | Chocolates de cacao peruano",
  // Meta description (ported from the design reference).
  description:
    "Chocolates premium de cacao nativo del VRAEM y cacao blanco de Piura, endulzados con panela. Impulsamos la autonomía económica de las mujeres en la cadena del cacao.",
  // Canonical production URL. Override per-environment with NEXT_PUBLIC_SITE_URL.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://miskiwarmi.com",
  // BCP-47 locale used for <html lang> and Open Graph locale.
  locale: "es_PE",
  // Used by Twitter/X card metadata, e.g. "@miskiwarmi". Leave empty to omit.
  twitter: "",
} as const;

/** Normalized origin without a trailing slash, safe for URL construction. */
export const siteUrl = siteConfig.url.replace(/\/$/, "");

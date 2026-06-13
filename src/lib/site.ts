/**
 * Central site configuration — single source of truth for SEO metadata.
 * Edit these values (and set NEXT_PUBLIC_SITE_URL in your environment) to
 * propagate across <head> metadata, sitemap.xml, robots.txt and the manifest.
 */
export const siteConfig = {
  name: "Miski Warmi",
  // Brand alternate name (used in structured data).
  alternateName: "Chocolates Miski Warmi",
  brandSlogan: "Dulzura que cuida",
  // Home <title> (browser tab + Google headline). Brand + slogan up front for
  // identity, plus the primary keyword for ranking. ~60 chars so it isn't cut.
  title: "Miski Warmi — Dulzura que cuida · Chocolate de cacao peruano",
  // Cleaner brand-only title for social-share cards (no keywords needed there).
  socialTitle: "Miski Warmi — Dulzura que cuida",
  // Meta description (~150 chars): compelling + keyword-rich for SERP snippets.
  description:
    "Chocolate de cacao nativo peruano, premiado y endulzado con panela. Elaborado a microbatch por mujeres cacaocultoras del VRAEM y de Piura.",
  // Target search terms (es-PE). Outputs <meta name="keywords"> + JSON-LD knowsAbout.
  keywords: [
    "chocolate peruano",
    "cacao nativo",
    "chocolate de cacao nativo",
    "cacao del VRAEM",
    "cacao blanco de Piura",
    "chocolate artesanal",
    "chocolate orgánico",
    "chocolate sin azúcar refinada",
    "chocolate endulzado con panela",
    "chocolate premiado Perú",
    "pasta de cacao",
    "nibs de cacao",
    "bean to bar Perú",
    "chocotejas",
    "Miski Warmi",
  ],
  // Social-share (Open Graph / Twitter) card, 1200×630.
  ogImage: "/og.jpg",
  // Canonical production URL. Override per-environment with NEXT_PUBLIC_SITE_URL.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://miskiwarmi.com",
  // BCP-47 locale used for <html lang> and Open Graph locale.
  locale: "es_PE",
  // Used by Twitter/X card metadata, e.g. "@miskiwarmi". Leave empty to omit.
  twitter: "",
} as const;

/** Normalized origin without a trailing slash, safe for URL construction. */
export const siteUrl = siteConfig.url.replace(/\/$/, "");

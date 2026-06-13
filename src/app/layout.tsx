import type { Metadata } from "next";
import { Jost, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig, siteUrl } from "@/lib/site";
import { products } from "@/content/products";
import { ClientEffects } from "@/components/theme/ClientEffects";
import { DEFAULT_APPEARANCE } from "@/components/theme/appearance";

// Display: Jost (variable, with italics) — a geometric sans matching the
// brochure's Futura LT Pro headings/wordmark.
const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jost",
  style: ["normal", "italic"],
});

// Body/UI: Inter (variable) — a neo-grotesque matching the brochure's TT Hoves.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const lang = siteConfig.locale.replace("_", "-");

const ogImageUrl = `${siteUrl}${siteConfig.ogImage}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "food",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteUrl,
    siteName: siteConfig.name,
    title: siteConfig.socialTitle,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.brandSlogan}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.socialTitle,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    ...(siteConfig.twitter ? { site: siteConfig.twitter, creator: siteConfig.twitter } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

// The look is fixed (see the html data-* attributes from DEFAULT_APPEARANCE +
// the CSS accent). This only flags `js` so the no-JS reveal fallback yields.
const NO_FLASH = `(function(){try{document.documentElement.classList.add('js');}catch(e){}})();`;

// Structured data (Organization + WebSite + product catalog) for rich results.
const ORG_ID = `${siteUrl}/#organization`;

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: siteConfig.name,
      alternateName: siteConfig.alternateName,
      url: siteUrl,
      logo: `${siteUrl}/icons/icon-512.png`,
      image: ogImageUrl,
      description: siteConfig.description,
      slogan: siteConfig.brandSlogan,
      email: "miskiwarmi.pe@gmail.com",
      telephone: "+51940250927",
      knowsAbout: [...siteConfig.keywords],
      areaServed: "PE",
      foundingLocation: { "@type": "Place", name: "Perú" },
      sameAs: [
        "https://www.instagram.com/miskiwarmi.peru/",
        "https://www.instagram.com/miskitejas.peru/",
        "https://www.tiktok.com/@miskiwarmi.peru",
        "https://www.tiktok.com/@miskitejas.peru",
        "https://www.facebook.com/miskiwarmiperu",
        "https://www.facebook.com/people/Miskitejas/61580276864182/",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+51940250927",
        email: "miskiwarmi.pe@gmail.com",
        contactType: "customer service",
        areaServed: "PE",
        availableLanguage: "es",
      },
      makesOffer: products.map((p) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: `${p.name} — ${p.sub}`,
          category: p.cat,
          description: p.desc,
          brand: { "@id": ORG_ID },
        },
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: siteConfig.locale.replace("_", "-"),
      publisher: { "@id": ORG_ID },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={lang}
      data-hero={DEFAULT_APPEARANCE.hero}
      data-card={DEFAULT_APPEARANCE.card}
      data-motif={DEFAULT_APPEARANCE.motif}
      data-grain={DEFAULT_APPEARANCE.grain ? "on" : "off"}
      className={`${jost.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <ClientEffects />
        {children}
      </body>
    </html>
  );
}

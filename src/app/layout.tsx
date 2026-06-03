import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { siteConfig, siteUrl } from "@/lib/site";
import { AppearanceProvider } from "@/components/theme/AppearanceProvider";
import { AppearancePanel } from "@/components/theme/AppearancePanel";
import { ClientEffects } from "@/components/theme/ClientEffects";
import { DEFAULT_APPEARANCE } from "@/components/theme/appearance";

// Display: Fraunces (variable, with optical-sizing axis + italics).
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz"],
  style: ["normal", "italic"],
});

// Body/UI: Hanken Grotesque (variable — full weight range incl. 380).
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
});

const lang = siteConfig.locale.split("_")[0];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteUrl,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
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

// Synchronous no-flash script: applies the owner's persisted appearance to
// <html> before first paint (and flags `js` so the no-JS reveal fallback yields).
const NO_FLASH = `(function(){try{var d=document.documentElement;d.classList.add('js');var A={salmon:['#E8857A','#F2B5AE'],terracotta:['#C96A4B','#E59B7E'],rosa:['#F2B5AE','#F7CFC9']};var s=localStorage.getItem('mw-appearance');if(!s)return;var t=JSON.parse(s);if(t.hero)d.setAttribute('data-hero',t.hero);if(t.card)d.setAttribute('data-card',t.card);if(t.motif)d.setAttribute('data-motif',t.motif);d.setAttribute('data-grain',t.grain?'on':'off');var a=A[t.accent]||A.salmon;d.style.setProperty('--accent',a[0]);d.style.setProperty('--accent-soft',a[1]);}catch(e){}})();`;

// Organization structured data for rich search results.
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteUrl,
  description: siteConfig.description,
  sameAs: [
    "https://instagram.com/miskiwarmi.peru",
    "https://instagram.com/miskitejas.peru",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+51940250927",
    email: "miskiwarmi.pe@gmail.com",
    contactType: "customer service",
    areaServed: "PE",
    availableLanguage: "es",
  },
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
      className={`${fraunces.variable} ${hanken.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <AppearanceProvider>
          <ClientEffects />
          {children}
          <AppearancePanel />
        </AppearanceProvider>
      </body>
    </html>
  );
}

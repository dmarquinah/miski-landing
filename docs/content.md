# Content & Assets

All copy is Spanish (`es-PE`) and centralized so it can be edited without touching components.

## Where content lives
- **`src/content/site-content.ts`** — every section's copy: nav, hero, the four story sections,
  catalog headings, the contact block (handles, phone, email), and footer. Edit text here.
- **`src/content/products.ts`** — the 8-product catalog + the `Product` type + `MEDAL_LABEL`,
  `AWARD_EVENT`, and `originLabel()`.
- **`src/lib/site.ts`** — SEO/site config (name, title, description, URL, locale, twitter handle).

## Product schema
```ts
type Product = {
  cat: string;                       // category, e.g. "Cacao nativo — VRAEM"
  origin: "vraem" | "piura";         // drives the origin-tag pill color
  name: string;
  sub: string;                       // italic subtitle
  desc: string;
  ingr: string;                      // ingredients (italic)
  fmt: string;                       // format pill, e.g. "Tableta 40 g"
  img: string | null;                // Unsplash photo id, or null → striped placeholder
  medals?: ("gold" | "silver")[];    // award badges on the card
  benefits?: string[];               // benefit dots (Infusión Andina only)
  phcap?: string;                    // placeholder caption when img is null / fails
};
```
The origin-tag label is derived from `cat` (text after the `—`) via `originLabel()`.
Card medal badges render the initial (`O`/`P`); the Proceso section seals render `Au`/`Ag`.

## Contact details (verbatim — keep accurate)
- Instagram: `@miskiwarmi.peru`, `@miskitejas.peru`
- Facebook: "Chocolates Miski Warmi Perú", "Miskitejas"
- WhatsApp: `+51 940 250 927` → `https://wa.me/51940250927`; call → `tel:+51940250927`
- Email: `miskiwarmi.pe@gmail.com`
- CTA → Instagram (`https://instagram.com/miskiwarmi.peru`)

These also feed the Organization JSON-LD `contactPoint` / `sameAs` in `layout.tsx`.

## Images
Currently **Unsplash stand-ins** loaded via `next/image` (`unoptimized`, host allow-listed in
`next.config.ts`). `src/lib/images.ts` builds the URLs from photo ids; `ResilientImage` falls back
to a striped placeholder if a photo fails to load. **Replace all of these with real brand
photography before launch.**

Placeholder/stand-in slots to provide real photos for:
1. **Familia cacaotera** — women harvesting cacao with a child (¿Quiénes somos?) — currently a
   striped placeholder.
2. **Manos que producen** — visible labor / hand-packaging (Misión) — striped placeholder.
3. **Cierre / origen** — drying cacao or origin landscape (Contacto background) — Unsplash stand-in.
4. The **8 product photos** (square, 2000×2000+ preferred) — Unsplash stand-ins (one product,
   Infusión Andina, is intentionally a placeholder).
5. Hero background image (used only by the split / image hero variants) — Unsplash stand-in.

To swap an image: set the real `img` id/URL in `products.ts` (or the relevant `*.imageId` in
`site-content.ts`). For non-Unsplash sources, either add the host to `images.remotePatterns` in
`next.config.ts` or drop files in `public/` and reference them by path.

## Localization
Single language for now (`es-PE`). If a second language is added later, the copy is already
isolated in `src/content/*` — a locale layer can wrap those modules without touching components.

# Miski Warmi — Landing Page Docs

Brand-identity landing page for **Miski Warmi**, a Peruvian artisan chocolate brand
(Quechua for *"Mujer Dulce"* / Sweet Woman). Single scrolling page, Spanish (`es-PE`),
brand-story-first with a product catalog. **No e-commerce** in this phase (no cart, no prices).

These docs are the working context for continuing development. They were written when the
landing was first implemented from a design handoff (an HTML/CSS/JS prototype that has since
been removed — its design system and content are preserved here in [design-system.md](./design-system.md)
and [content.md](./content.md)).

## Doc index
- **[architecture.md](./architecture.md)** — stack, file map, rendering model, the theme/no-flash
  system, interaction hooks, and intentional deviations from the original prototype.
- **[design-system.md](./design-system.md)** — colors, typography, spacing, motifs, and the five
  owner-switchable appearance variants (hero / card / accent / motif / grain).
- **[content.md](./content.md)** — content files, the product schema, the copy, and the list of
  placeholder photos that must be replaced with real brand photography before launch.

## Stack
- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first; tokens in `src/app/globals.css`)
- **Static export** (`output: "export"`) → **Cloudflare Pages**
- Self-hosted fonts via `next/font/google` (Fraunces + Hanken Grotesk)

## Quickstart
```bash
npm run dev       # local dev at http://localhost:3000
npm run lint      # eslint (must be clean)
npm run build     # static export → ./out
npm run preview   # build + serve via Cloudflare's local runtime (wrangler pages dev)
npm run deploy    # build + wrangler pages deploy out
```

## Deployment (Cloudflare Pages)
The build produces a fully static site in `./out` (no server runtime). Two ways to ship:
- **CLI:** `npm run deploy` (uses `wrangler.toml` → `pages_build_output_dir = "out"`).
- **Git integration:** connect the repo in the Cloudflare dashboard with build command
  `npm run build` and output directory `out`.

`public/_headers` ships security headers + immutable caching for `/_next/static/*`.
Set `NEXT_PUBLIC_SITE_URL` in the environment to the production origin (defaults to
`https://miskiwarmi.com`) — it feeds canonical/OG URLs, `sitemap.xml`, and `robots.txt`.

## Conventions
- All UI copy lives in `src/content/site-content.ts`; product data in `src/content/products.ts`.
  Edit copy there, not in components.
- SEO config (title, description, locale, URL) is centralized in `src/lib/site.ts`.
- The pixel-specified design CSS lives in `src/app/theme.css`; Tailwind utilities are used for
  new layout glue and the appearance panel. See [design-system.md](./design-system.md) for why.

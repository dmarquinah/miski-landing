# Architecture

## Rendering model
Static export (`next.config.ts` → `output: "export"`, `trailingSlash: true`,
`images.unoptimized: true`). Every route is prerendered to HTML at build time and served by
Cloudflare Pages with no server runtime. Server Components run at build; the only client
components are the ones that need interactivity (see below).

`next.config.ts` also pins `turbopack.root` (to avoid a stray parent lockfile being picked as
the workspace root) and allows the `images.unsplash.com` host for the stand-in photos.

## File map
```
src/
  app/
    layout.tsx        Root layout: fonts, SEO metadata, JSON-LD, default theme attrs on <html>,
                      the no-flash inline script, and the AppearanceProvider/ClientEffects/Panel wiring.
    page.tsx          Composes the sections top→bottom (server component).
    globals.css       Tailwind v4 entry: @import "tailwindcss" + theme.css, @theme tokens, @theme inline accent.
    theme.css         The ported, pixel-specified design CSS (components + all data-* variants + motion).
    robots.ts sitemap.ts manifest.ts   Static SEO files (generated at build).
  components/
    ui/               Presentational primitives: Logo, DottedDivider, SectionEyebrow, MediaFrame,
                      StripedPlaceholder, ResilientImage (client), Fact, Seal.
    sections/         One component per page section. Header is a client component (sticky nav +
                      mobile menu); ProductCard/Hero are single-markup with CSS-driven variants.
    theme/            appearance.ts (model + applyAppearance), AppearanceProvider (client store),
                      AppearancePanel (client UI), ClientEffects (mounts global scroll hooks).
  content/            products.ts (catalog data + schema), site-content.ts (all copy).
  hooks/              useScrollReveal, useParallax, useInView, usePrefersReducedMotion.
  lib/                site.ts (SEO config), images.ts (unsplashUrl helper).
```

## Client vs server components
Server (default): `page.tsx`, all section components except Header, and the UI primitives.
Client (`"use client"`): `Header` (scroll/menu state), `ResilientImage` (onError fallback),
everything under `components/theme/`, and the hooks. Keep new components server-only unless they
genuinely need state, effects, or browser APIs.

## Theme / appearance system
Five owner-switchable knobs, persisted to `localStorage["mw-appearance"]`:
`hero` · `card` · `accent` · `motif` · `grain` (see [design-system.md](./design-system.md) for values).

The **DOM is the source of truth for the look**: `data-hero/-card/-motif/-grain` attributes on
`<html>` plus the `--accent` / `--accent-soft` CSS variables. All variant styling in `theme.css`
keys off these. React state only drives the panel UI.

Data flow:
1. **SSR / first paint** — `layout.tsx` renders `<html>` with the *default* attributes
   (`DEFAULT_APPEARANCE`).
2. **No-flash script** — a tiny synchronous inline `<script>` (first thing in `<body>`) reads
   localStorage and reapplies the owner's saved attributes + accent vars to `<html>` *before*
   paint, and adds the `js` class. No FOUC.
3. **Hydration** — `<html>` has `suppressHydrationWarning` (the script mutated root-node attrs
   outside React's tree, the standard next-themes pattern). `AppearanceProvider` reads the stored
   value via `useSyncExternalStore` (never `setState` in an effect).
4. **Panel changes** — `AppearancePanel` calls `setAppearance(key, value)`, which updates the
   store, writes localStorage, and calls `applyAppearance()` to mutate the DOM. Because `--accent`
   is exposed to Tailwind via `@theme inline` (`--color-accent: var(--accent)`), `bg-accent` /
   `text-accent` track the live value with **zero re-render**.

`applyAppearance()` and the no-flash script are deliberately kept in sync — both write every
attribute to `<html>` (see deviations below).

## Interactions (hooks)
Ported from the prototype's vanilla JS, reduced-motion aware, mounted once via
`components/theme/ClientEffects.tsx`:
- **`useScrollReveal`** — single rAF scroll loop adds `.in` to `[data-reveal]` / `.divider` when
  their top passes ~88% of the viewport; `data-d="1|2|3"` stagger delays. Includes the prototype's
  safety timeouts (200/800/3000 ms) so content is never stuck hidden; short-circuits to
  all-visible under reduced motion.
- **`useParallax`** — translates `[data-parallax="<speed>"]` (e.g. hero image `0.12`, contact bg
  `0.08`) via rAF; no-op under reduced motion.
- **`useInView`** — per-element IntersectionObserver hook (visible-by-default safety) for any
  component that wants local control instead of the global loop.
- **`usePrefersReducedMotion`** — `useSyncExternalStore` over the media query.

Reveal markup is plain `data-reveal` / `data-d` attributes on JSX; no per-component ref wiring.

### No-JS / print fallback
`theme.css` has `html:not(.js) [data-reveal] { opacity: 1 }` (and divider equivalents). The
no-flash script adds `js`, so when JS is present the animated path runs; without it (no-JS, print,
crawlers) content shows at rest. Reduced-motion also forces the at-rest state.

## Tailwind v4 token split
- `@theme` (in `globals.css`) — frozen brand palette (`--color-cacao` …), font families,
  `--radius-base`, `--ease-soft`. These generate utilities (`bg-cacao`, `font-display`, …).
- `@theme inline` — `--color-accent: var(--accent)` / `--color-accent-soft: var(--accent-soft)`,
  so accent utilities resolve to the *live* runtime var instead of a frozen value.
- `theme.css` (plain CSS) — the raw `:root` vars the ported design uses (`--cacao`, `--accent`,
  `--motif-band`, `--section-y`, …) and all attribute-driven component/variant rules. This is kept
  as hand-written CSS on purpose: the design is dense, attribute-cascaded, and pixel-specified;
  re-deriving it into utilities would lose fidelity.

## SEO
- `src/lib/site.ts` — single source for title, description, locale (`es_PE`), and URL.
- `layout.tsx` — Metadata API (title template, Open Graph, Twitter, canonical, robots) + an
  Organization JSON-LD block (name, url, social profiles, contact point).
- `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts` — generated as static files at build.

## Intentional deviations from the prototype
- **Grain attribute on `<html>`** (not `<body>`) so a single synchronous head script can set every
  theme attribute on one node. The overlay rule is `html[data-grain="on"]::after`.
- **Theme panel rebuilt natively** (`AppearancePanel`) instead of porting the prototype's
  host-coupled `tweaks-panel.jsx`. Same controls and defaults.
- **Fonts** come from `next/font` (self-hosted) rather than the prototype's Google Fonts `<link>`;
  `--f-display` / `--f-body` point at the generated `--font-fraunces` / `--font-hanken` vars.

## Known follow-ups
- Replace Unsplash stand-in photos with real brand photography (see [content.md](./content.md)).
- Add an `opengraph-image` (static or generated) — metadata currently has no social share image.
- Provide real favicon / app-icon set and a brand logo SVG if the owner supplies official assets.
- `FUTURE` per the brief: a `Tienda` nav link + cart when e-commerce launches.

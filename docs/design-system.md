# Design System

Preserved from the original design handoff. The implementation lives in
`src/app/globals.css` (Tailwind tokens) and `src/app/theme.css` (raw vars + components).
Border radius is a deliberate **3px** everywhere — crisp, not rounded.

## Color
| Token | Hex | Usage |
|---|---|---|
| `cacao` | `#2C1810` | Primary dark — page bg, body text on light bg |
| `cacao-deep` | `#1E0F08` | Footer, contact overlay, deepest surfaces |
| `cacao-line` | `#46291C` | Hairline borders/dividers on dark |
| `salmon` | `#E8857A` | **Default accent** — hero bg, CTAs, eyebrows, highlights |
| `pink` | `#F2B5AE` | Soft accent / accent-soft, hover, secondary |
| `cream` | `#F5EFE6` | Light section bg (catalog), body text on dark |
| `cream-2` | `#ECE1D2` | Card image fallback bg, subtle light surface |
| `white` | `#FFFFFF` | Product cards, contrast surfaces |
| `gold` | `#C79A52` | Gold award medal (radial `#F0D28A` → gold) |
| `silver` | `#AFA79A` | Silver award medal (radial `#E9E6E0` → silver) |

`--accent` / `--accent-soft` are runtime CSS variables (default salmon/pink) — the single knob the
accent tweak flips. In Tailwind, `bg-accent` / `text-accent` resolve to the live var.

## Typography
- **Display / headings:** **Fraunces** (variable, optical sizing on; weights 400/500/600, italics
  400/500). `line-height: 1.04`, `text-wrap: balance`, slight negative tracking on large sizes.
- **Body / UI:** **Hanken Grotesk** (variable; body `17px / 1.65`, `font-weight: 380`).
- **Mono (placeholder captions only):** system `ui-monospace, "SF Mono", Menlo`.
- Both self-hosted via `next/font/google`. (Note: Google's family is "Hanken Grotesk"; the
  prototype's link said "Hanken Grotesque" — the correct import is `Hanken_Grotesk`.)

Type scale (clamps, desktop → mobile):
- Hero h1 `clamp(44px, 9vw, 118px)` · Section title `.s-title` `clamp(34px, 5vw, 62px)`
- Story h2 `clamp(32px, 4.6vw, 56px)` · Catalog intro h2 `clamp(34px, 6vw, 76px)`
- Contact h2 `clamp(40px, 7vw, 82px)` · Product name h3 `25px`
- Eyebrow `12.5px / 0.26em / uppercase / 600 / accent` · Body `17px`, lede `clamp(18px, 2.1vw, 21px)`

## Spacing / layout
- Content max-width `1180px` (`--maxw`); side gutter `clamp(20px, 5vw, 64px)` (`--gutter`).
- Vertical section rhythm `clamp(72px, 11vh, 150px)` (`--section-y`).
- Two-column story gap `clamp(34px, 6vw, 86px)`; product grid gap `clamp(20px, 2.4vw, 30px)`.
- Easing everywhere: `cubic-bezier(0.2, 0.7, 0.3, 1)` (`--ease-soft`).

## Shadows
- Card resting `0 1px 2px rgba(44,24,16,.04)`; hover `0 26px 50px -24px rgba(44,24,16,.4)`.
- Media frame `0 30px 60px -28px rgba(0,0,0,.7)`.

## Motifs (Andean brand decoration)
- **M mark** — geometric monogram (chevron + dot), `Logo` component / inline SVG, viewBox
  `0 0 100 100`, `stroke-width 9`, round joins, inherits `currentColor`.
- **Dotted divider** — centered dotted lines flanking the M glyph; draws in on reveal.
- **Stepped-diamond band** (`.band`) — crossed 45°/135° repeating gradients; opacity from
  `--motif-band`.
- **Corner ticks** (`.tick`) — 34px L-brackets on top-left & bottom-right of every media frame.

## Page sections (top → bottom)
0. **Header/Nav** — sticky; transparent over hero, solid (cacao 90% + blur) past `heroHeight − 80`.
   Mobile (≤720px): hamburger → full-screen overlay, body scroll locked.
1. **Hero** — full-viewport; 3 layouts via `data-hero` (see below).
2. **¿Quiénes somos?** — dark story, media left / copy right.
3. **¿Qué hacemos?** — dark story, inverted; 3 pill "facts".
4. **¿Cómo lo hacemos?** — dark; award seals (original gold/silver pills, **not** real logos) +
   process strip (Cosecha → Tostado → Descascarillado → Refinado → Producto).
5. **Misión** — salmon break; inverted story.
6. **Catálogo** — salmon intro panel + cream product grid (3 / 2 / 1 cols at 900 / 560px).
7. **Contacto** — full-bleed origin photo + dark overlay + 3-column contact grid.
8. **Footer** — cacao-deep, centered mark + taglines.

Dotted dividers sit between sections 2→3 and 3→4.

## Appearance variants (the "Apariencia" panel)
The owner-facing panel (gear, bottom-right) flips these and persists to localStorage. **Defaults
in bold.** All variant CSS already exists in `theme.css`, keyed off the attributes/vars.

| Tweak | Attribute / mechanism | Options |
|---|---|---|
| **Hero layout** | `html[data-hero]` | **centered** (salmon, default) · split (text + image column) · image (full-bleed photo + overlay) |
| **Card style** | `html[data-card]` | **editorial** (white card) · overlay (dark, desc expands on hover) · minimal (text-only) |
| **Accent** | `--accent` / `--accent-soft` | **salmon** `#E8857A`/`#F2B5AE` · terracotta `#C96A4B`/`#E59B7E` · rosa `#F2B5AE`/`#F7CFC9` |
| **Motif intensity** | `html[data-motif]` → `--motif-band` | subtle `.22` · **moderate** `.5` · bold `.85` (also boosts hero pattern) |
| **Paper grain** | `html[data-grain]` | **on** (SVG noise @ 6%) · off |

The accent preset hexes are defined once in `src/components/theme/appearance.ts` (`ACCENTS`) and
mirrored in the no-flash script in `layout.tsx` — keep both in sync if you add/change presets.

## Reduced motion
All reveals / parallax / float disabled; content shown at rest. Honored by every hook and by a
`@media (prefers-reduced-motion: reduce)` block in `theme.css`.

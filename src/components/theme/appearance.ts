/**
 * Appearance ("Apariencia") theme model — the owner-facing knobs ported from
 * the reference's MW.applyTweaks / ACCENTS (design_handoff/reference/miski.js).
 *
 * The single source of truth for the live look is the DOM: data-* attributes on
 * <html> + the --accent/--accent-soft CSS variables. React state drives the
 * panel UI; applyTweaks() mirrors it onto the DOM (and the no-flash head script
 * applies the persisted value before first paint).
 */

export type HeroLayout = "centered" | "split" | "image";
export type CardStyle = "editorial" | "overlay" | "minimal";
export type MotifIntensity = "subtle" | "moderate" | "bold";
export type AccentKey = "salmon" | "terracotta" | "rosa";

export type Appearance = {
  hero: HeroLayout;
  card: CardStyle;
  accent: AccentKey;
  motif: MotifIntensity;
  grain: boolean;
};

export const DEFAULT_APPEARANCE: Appearance = {
  hero: "image",
  card: "editorial",
  accent: "salmon",
  motif: "moderate",
  grain: true,
};

/** Accent presets: [primary, soft]. Verbatim from the reference ACCENTS map. */
export const ACCENTS: Record<AccentKey, { a: string; s: string }> = {
  salmon: { a: "#E8857A", s: "#F2B5AE" },
  terracotta: { a: "#C96A4B", s: "#E59B7E" },
  rosa: { a: "#F2B5AE", s: "#F7CFC9" },
};

export const STORAGE_KEY = "mw-appearance";

/**
 * Apply an appearance to the document (idempotent). Mirrors the reference
 * applyTweaks, but writes every attribute to <html> so a single synchronous
 * head script can do the same thing pre-paint (grain moved off <body>).
 */
export function applyAppearance(a: Appearance, root: HTMLElement): void {
  root.setAttribute("data-hero", a.hero);
  root.setAttribute("data-card", a.card);
  root.setAttribute("data-motif", a.motif);
  root.setAttribute("data-grain", a.grain ? "on" : "off");
  const ac = ACCENTS[a.accent] ?? ACCENTS.salmon;
  root.style.setProperty("--accent", ac.a);
  root.style.setProperty("--accent-soft", ac.s);
}

/** Merge an unknown (parsed-from-storage) value onto the defaults, safely. */
export function normalizeAppearance(value: unknown): Appearance {
  if (!value || typeof value !== "object") return DEFAULT_APPEARANCE;
  const v = value as Partial<Record<keyof Appearance, unknown>>;
  const oneOf = <T extends string>(x: unknown, allowed: readonly T[], fallback: T): T =>
    typeof x === "string" && (allowed as readonly string[]).includes(x) ? (x as T) : fallback;
  return {
    hero: oneOf(v.hero, ["centered", "split", "image"], DEFAULT_APPEARANCE.hero),
    card: oneOf(v.card, ["editorial", "overlay", "minimal"], DEFAULT_APPEARANCE.card),
    accent: oneOf(v.accent, ["salmon", "terracotta", "rosa"], DEFAULT_APPEARANCE.accent),
    motif: oneOf(v.motif, ["subtle", "moderate", "bold"], DEFAULT_APPEARANCE.motif),
    grain: typeof v.grain === "boolean" ? v.grain : DEFAULT_APPEARANCE.grain,
  };
}

/**
 * Product catalog (es-PE) — presentational only, no e-commerce in this phase.
 * Ported verbatim from design_handoff/reference/miski.js `PRODUCTS`.
 * `img` is an Unsplash photo id (or null → striped placeholder).
 */

export type Medal = "gold" | "silver";

export type Product = {
  cat: string;
  origin: "vraem" | "piura";
  name: string;
  sub: string;
  desc: string;
  ingr: string;
  fmt: string;
  img: string | null;
  medals?: Medal[];
  benefits?: string[];
  phcap?: string;
};

export const MEDAL_LABEL: Record<Medal, string> = { gold: "Oro", silver: "Plata" };

export const AWARD_EVENT = "Salón Cacao y Chocolate 2025";

export const products: Product[] = [
  {
    cat: "Cacao nativo — VRAEM",
    origin: "vraem",
    name: "Pasta de cacao 100%",
    sub: "Chocolate para taza",
    desc: "Cacao puro, sin nada más. Para preparar a la antigua, espeso y reconfortante.",
    ingr: "Pasta de cacao nativo del VRAEM.",
    fmt: "Tableta 80 g",
    img: "1606312619070-d48b4c652a52",
  },
  {
    cat: "Cacao nativo — VRAEM",
    origin: "vraem",
    name: "Chocolate 70%",
    sub: "Endulzado con panela",
    desc: "Intenso y equilibrado, con la dulzura justa de la panela orgánica.",
    ingr: "Pasta de cacao nativo del Vraem, panela orgánica, manteca de cacao.",
    fmt: "Tableta 40 g",
    img: "1614088685112-0a760b71a3c8",
  },
  {
    cat: "Cacao nativo — VRAEM",
    origin: "vraem",
    name: "Chocolate 70%",
    sub: "Edulcorado con panela",
    desc: "El mismo carácter del 70%, en formato de bolsillo para llevar contigo.",
    ingr: "Pasta de cacao nativo del Vraem, panela orgánica, manteca de cacao.",
    fmt: "Tableta 20 g",
    img: "1623660053975-cf75a8be0908",
  },
  {
    cat: "Cacao blanco — Piura",
    origin: "piura",
    name: "Chocolate 65%",
    sub: "Cacao blanco",
    desc: "Notas suaves y afrutadas del raro cacao blanco piurano.",
    ingr: "Pasta de cacao blanco de Piura, panela orgánica, manteca de cacao.",
    fmt: "Tableta 40 g",
    img: "1548907040-4baa42d10919",
    medals: ["silver"],
  },
  {
    cat: "Cacao blanco — Piura",
    origin: "piura",
    name: "Chocolate 72%",
    sub: "Cacao blanco",
    desc: "Nuestra joya premiada: profundidad y elegancia del cacao blanco.",
    ingr: "Pasta de cacao blanco de Piura, panela orgánica, manteca de cacao.",
    fmt: "Tableta 40 g",
    img: "1549007994-cb92caebd54b",
    medals: ["silver", "gold"],
  },
  {
    cat: "Cacao nativo — VRAEM",
    origin: "vraem",
    name: "Grageas 60%",
    sub: "Arándanos",
    desc: "Arándanos orgánicos envueltos en chocolate. El antojo que sí cuida.",
    ingr: "Arándanos orgánicos, pasta de cacao, panela, manteca de cacao.",
    fmt: "Dolpack 40 g",
    img: "1481391319762-47dff72954d9",
  },
  {
    cat: "Cacao nativo — VRAEM",
    origin: "vraem",
    name: "Grageas 60%",
    sub: "Almendras",
    desc: "Almendras crocantes y chocolate de cacao nativo. Para compartir.",
    ingr: "Almendras orgánicas, pasta de cacao, panela, manteca de cacao.",
    fmt: "Dolpack 40 g",
    img: "1599599810769-bcde5a160d32",
  },
  {
    cat: "Cáscara de cacao tostada — VRAEM",
    origin: "vraem",
    name: "Infusión Andina",
    sub: "Cáscara de cacao",
    desc: "Una infusión cálida hecha de la cáscara tostada del cacao nativo.",
    ingr: "Cáscara de cacao nativo del Vraem.",
    fmt: "Dolpack 100 g",
    img: null,
    phcap: "Infusión de cáscara de cacao",
    benefits: ["Antiinflamatoria", "Concilia el sueño", "Mejora la digestión"],
  },
];

/** Origin-tag label: the part after the "—" in the category, else the category. */
export function originLabel(cat: string): string {
  const parts = cat.split("—");
  return (parts[1] ?? parts[0]).trim();
}

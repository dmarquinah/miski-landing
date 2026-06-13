/**
 * Product catalog (es-PE) — presentational only, no e-commerce in this phase.
 * Copy, formats, ingredients and awards transcribed from the official brochure
 * ("BROCHURE MISKI WARMI"). Photos are real brand shots extracted from the same
 * brochure and stored under `public/products/` (referenced by absolute path).
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
  /** Local asset path under /public (e.g. "/products/nibs-cacao.jpg"), or null → striped placeholder. */
  img: string | null;
  medals?: Medal[];
  benefits?: string[];
  phcap?: string;
};

export const MEDAL_LABEL: Record<Medal, string> = { gold: "Oro", silver: "Plata" };

export const AWARD_EVENT = "Salón de Cacao y Chocolate 2025";

export const products: Product[] = [
  {
    cat: "Cacao nativo — VRAEM",
    origin: "vraem",
    name: "Pasta de cacao 100%",
    sub: "Chocolate para taza",
    desc: "Pasta de cacao al 100% finamente molida y de granos nativos selectos. Perfecta para preparar chocolate caliente o con leche y disfrutar en compañía. La cajita se abre como retablo Ayacuchano.",
    ingr: "Pasta de cacao nativo del Vraem.",
    fmt: "Tableta 80 g",
    img: "/products/pasta-cacao-100.jpg",
  },
  {
    cat: "Cacao nativo — VRAEM",
    origin: "vraem",
    name: "Chocolate 70%",
    sub: "Endulzado con panela",
    desc: "Delicioso chocolate oscuro al 70% de cacao del VRAEM endulzado con panela orgánica de Piura. Eleva tu estado de ánimo. La cajita se abre como retablo Ayacuchano.",
    ingr: "Pasta de cacao nativo del Vraem, panela orgánica y manteca de cacao.",
    fmt: "Tableta 40 g",
    img: "/products/chocolate-70-40g.jpg",
  },
  {
    cat: "Cacao nativo — VRAEM",
    origin: "vraem",
    name: "Chocolate 70%",
    sub: "Edulcorado con panela",
    desc: "El mismo chocolate oscuro al 70% de cacao del VRAEM, endulzado con panela orgánica de Piura, en formato de bolsillo para llevar contigo. Eleva tu estado de ánimo.",
    ingr: "Pasta de cacao nativo del Vraem, panela orgánica y manteca de cacao.",
    fmt: "Tableta 20 g",
    img: "/products/chocolate-70-20g.jpg",
  },
  {
    cat: "Cacao blanco — Piura",
    origin: "piura",
    name: "Chocolate 65%",
    sub: "Endulzado con panela",
    desc: "Delicioso chocolate oscuro al 65% de cacao blanco edulcorado con panela orgánica de Piura. Eleva tu estado de ánimo. Chocolate ganador Silver del Salón de Cacao y Chocolate 2025.",
    ingr: "Pasta de cacao blanco de Piura, panela orgánica y manteca de cacao.",
    fmt: "Tableta 40 g",
    img: "/products/chocolate-65-piura.jpg",
    medals: ["silver"],
  },
  {
    cat: "Cacao blanco — Piura",
    origin: "piura",
    name: "Chocolate 72%",
    sub: "Endulzado con panela",
    desc: "Delicioso chocolate oscuro al 72% de cacao blanco endulzado con panela orgánica de Piura. Eleva tu estado de ánimo. Chocolate ganador Silver y Gold del Salón de Cacao y Chocolate 2025.",
    ingr: "Pasta de cacao blanco de Piura, panela orgánica y manteca de cacao.",
    fmt: "Tableta 40 g",
    img: "/products/chocolate-72-piura.jpg",
    medals: ["silver", "gold"],
  },
  {
    cat: "Cacao nativo — VRAEM",
    origin: "vraem",
    name: "Grageas 60%",
    sub: "Arándanos",
    desc: "Arándanos orgánicos bañados de chocolate al 60% de cacao del VRAEM endulzado con panela. El antojo que sí cuida.",
    ingr: "Arándanos orgánicos, pasta de cacao, panela y manteca de cacao.",
    fmt: "Dolpack 40 g",
    img: "/products/grageas-arandanos.jpg",
  },
  {
    cat: "Cacao nativo — VRAEM",
    origin: "vraem",
    name: "Grageas 60%",
    sub: "Almendras",
    desc: "Almendras orgánicas bañadas de chocolate al 60% de cacao del VRAEM endulzado con panela. Crocantes, para compartir.",
    ingr: "Almendras orgánicas, pasta de cacao, panela y manteca de cacao.",
    fmt: "Dolpack 40 g",
    img: "/products/grageas-almendras.jpg",
  },
  {
    cat: "Cacao nativo — VRAEM",
    origin: "vraem",
    name: "Nibs de cacao",
    sub: "Trozos de cacao tostado",
    desc: "Trocitos de granos de cacao tostados, cuidadosamente seleccionados, previamente limpiados y descascarados, muy ricos en magnesio y antioxidantes. Recomendado para un snack saludable y delicioso.",
    ingr: "Granos de cacao nativo del Vraem.",
    fmt: "Dolpack 150 g",
    img: "/products/nibs-cacao.jpg",
    benefits: ["Fortalece el corazón", "Mejora el ánimo", "Saludable para la piel"],
  },
  {
    cat: "Cacao nativo — VRAEM",
    origin: "vraem",
    name: "Polvo de cacao",
    sub: "Cacao instantáneo",
    desc: "Polvo de cacao proveniente de granos selectos, reducido en grasa y pulverizado. Ideal para preparar postres, bebidas instantáneas, batidos y compartir con los que más quieres.",
    ingr: "Granos de cacao nativos del Vraem.",
    fmt: "Dolpack 200 g",
    img: "/products/polvo-cacao.jpg",
    benefits: ["Fortalece el corazón", "Mejora el ánimo", "Saludable para la piel"],
  },
  {
    cat: "Cáscara de cacao tostada — VRAEM",
    origin: "vraem",
    name: "Infusión Andina",
    sub: "Cascarilla de cacao tostado",
    desc: "Cáscara de cacao del VRAEM, alta en antioxidantes; una excelente opción para los amantes de las infusiones, un té de sabor achocolatado.",
    ingr: "Cáscara de cacao nativo del Vraem.",
    fmt: "Dolpack 100 g",
    img: "/products/infusion-andina.jpg",
    benefits: ["Combate el insomnio", "Mejora la digestión", "Antiinflamatorio"],
  },
  {
    cat: "Cáscara de cacao tostada — VRAEM",
    origin: "vraem",
    name: "Mix Andino",
    sub: "Cáscara de cacao, menta y canela",
    desc: "Cáscara de cacao del VRAEM, alta en antioxidantes, con hojas de menta y canela selecta. Excelente opción para los amantes de las infusiones, un té con sabor a los Andes.",
    ingr: "Cáscara de cacao, menta y canela.",
    fmt: "Dolpack 100 g",
    img: "/products/mix-andino.jpg",
    benefits: ["Cascarilla de cacao", "Hojas de menta", "Palitos de canela"],
  },
  {
    cat: "Cacao nativo — VRAEM",
    origin: "vraem",
    name: "Miskitejas",
    sub: "Chocoteja 60% cacao",
    desc: "Chocoteja elaborada al 60% de cacao del VRAEM endulzada con panela, rellena con pralinés de diferentes sabores. Incluye un sticker ilustrativo en Quechua, en homenaje al idioma de nuestras cacaocultoras quechuahablantes.",
    ingr: "Pasta de cacao, manteca de cacao, panela y praliné.",
    fmt: "Peso neto 10 g",
    img: "/products/miskitejas.jpg",
    benefits: ["Praliné de maní", "Praliné de almendras", "Praliné de pecanas"],
  },
];

/** Origin-tag label: the part after the "—" in the category, else the category. */
export function originLabel(cat: string): string {
  const parts = cat.split("—");
  return (parts[1] ?? parts[0]).trim();
}

/**
 * All landing-page copy (es-PE), ported verbatim from the reference HTML.
 * Centralized so the owner can edit text in one place.
 */

export const nav = {
  brandTagline: "· dulzura que cuida",
  links: [
    { href: "#nosotros", label: "Nosotros" },
    { href: "#productos", label: "Productos" },
    { href: "#proceso", label: "Proceso" },
    { href: "#contacto", label: "Contacto" },
  ],
} as const;

export const hero = {
  title: ["MISKI", "WARMI"],
  tagline: "Dulzura que cuida",
  scrollCue: "Conoce nuestra historia",
  madeIn: "Hecho en Perú",
  // Background image (used by split / image hero variants). Unsplash id.
  imageId: "1623660053975-cf75a8be0908",
  imageAlt: "Chocolate de cacao peruano",
} as const;

export const nosotros = {
  eyebrow: "¿Quiénes somos?",
  titleLead: "Mujer ",
  titleItalic: "dulce",
  placeholder: {
    label: "Foto · familia cacaotera",
    caption: "Mujeres cosechando cacao con un niño, en el campo",
  },
  // First paragraph has an inline Fraunces-italic accent on "Miski Warmi".
  intro: {
    pre: "En quechua, ",
    em: "Miski Warmi",
    post: ' significa "Mujer Dulce". Inspirados en esa dulzura que cuida, protege y nutre a la familia, creamos chocolates y derivados de cacao que cuidan de ti.',
  },
  paragraph2:
    "Somos un equipo humano y diverso que impulsa la autonomía económica de las mujeres y sus familias, dando visibilidad a su rol en toda la cadena productiva y mejorando la calidad de vida de nuestras comunidades.",
} as const;

export const queHacemos = {
  eyebrow: "¿Qué hacemos?",
  titleLead: "Cacao hecho ",
  titleItalic: "bienestar",
  imageAlt: "Cacao en transformación",
  imageId: "1606312619070-d48b4c652a52",
  paragraphs: [
    "Transformamos el cacao en experiencias de bienestar. Elaboramos chocolates con más del 60% de pureza hasta el 100% de cacao, libres de azúcar refinada y endulzados con panela.",
    "Cada pieza es un tributo a nuestras raíces: desde el diseño de nuestros empaques hasta la difusión del quechua, honramos la cultura de nuestras comunidades cacaoteras.",
  ],
  facts: [
    { value: "60–100%", label: "cacao puro" },
    { value: "0%", label: "azúcar refinada" },
    { value: "+", label: "endulzado con panela" },
  ],
} as const;

export const proceso = {
  eyebrow: "¿Cómo lo hacemos?",
  titleLead: "Trazabilidad ",
  titleItalic: "premiada",
  imageAlt: "Tableta de chocolate con granos de cacao",
  imageId: "1614088685112-0a760b71a3c8",
  paragraphs: [
    "Controlamos cada detalle desde el campo: cosecha y post-cosecha rigurosa. Trabajamos con tostados pequeños de 3 kilos, descascarillado artesanal y un refinado de muchas horas.",
    "Esta trazabilidad garantiza un chocolate premium de alta calidad, respaldado por 3 medallas — pero sobre todo, por tu bienestar.",
  ],
  awards: [
    { medal: "gold" as const, label: "Medalla de Oro", event: "Salón Cacao y Chocolate 2025" },
    {
      medal: "silver" as const,
      label: "2 × Medalla de Plata",
      event: "Salón Cacao y Chocolate 2025",
    },
  ],
  steps: ["Cosecha", "Tostado", "Descascarillado", "Refinado", "Producto"],
} as const;

export const mision = {
  eyebrow: "¿Por qué lo hacemos?",
  titleLead: "Calidad e ",
  titleItalic: "impacto",
  titleTail: ", de la mano",
  placeholder: {
    label: "Foto · manos que producen",
    caption: "Trabajo visible: empaque y producción a mano",
  },
  paragraphs: [
    "Porque creemos que un chocolate excepcional debe ser saludable para quien lo consume y justo para quien lo produce.",
    "Lo hacemos para demostrar que la calidad y el impacto social van de la mano, llevando la esencia pura del cacao peruano al mundo con un propósito de vida.",
  ],
} as const;

export const catalogo = {
  introTitle: "Catálogo de productos",
  introSubtitle: "Elaborados a microbatch",
  eyebrow: "Cacao nativo del VRAEM & cacao blanco de Piura",
} as const;

export const contacto = {
  titleItalic: "¡Añay!",
  titleTail: " — ¡gracias!",
  lead: "Por apoyar un emprendimiento peruano que transforma el cacao en oportunidades hechas dulzura.",
  cta: { label: "Conoce más de Miski Warmi →", href: "https://instagram.com/miskiwarmi.peru" },
  // Atmospheric origin photo behind the contact section.
  imageId: "1623660053975-cf75a8be0908",
  imageAlt: "Naturaleza de origen del cacao",
  blocks: {
    social: {
      heading: "Redes sociales",
      items: [
        { type: "link" as const, icon: "◎", label: "@miskiwarmi.peru", href: "https://instagram.com/miskiwarmi.peru" },
        { type: "link" as const, icon: "◎", label: "@miskitejas.peru", href: "https://instagram.com/miskitejas.peru" },
        { type: "text" as const, icon: "f", label: "Chocolates Miski Warmi Perú" },
        { type: "text" as const, icon: "f", label: "Miskitejas" },
      ],
    },
    phone: {
      heading: "Teléfono · WhatsApp",
      whatsapp: { number: "+51 940 250 927", href: "https://wa.me/51940250927" },
      call: { label: "Llamar directamente", href: "tel:+51940250927" },
    },
    email: {
      heading: "Correo electrónico",
      address: "miskiwarmi.pe@gmail.com",
      href: "mailto:miskiwarmi.pe@gmail.com",
    },
  },
} as const;

export const footer = {
  tagline: "Dulzura llena de historias",
  copyright: "© 2026 Miski Warmi — Hecho en Perú",
  credit: "Hecho con ♥ en Lima",
} as const;

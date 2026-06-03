import { Logo } from "@/components/ui/Logo";
import { catalogo } from "@/content/site-content";

/** Full-width salmon intro panel that opens the catalog. */
export function CatalogoIntro() {
  return (
    <section className="catalog-intro" id="productos">
      <Logo />
      <h2>{catalogo.introTitle}</h2>
      <p className="sub">{catalogo.introSubtitle}</p>
    </section>
  );
}

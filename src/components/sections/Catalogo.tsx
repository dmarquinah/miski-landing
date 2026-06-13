import { BrandMark } from "@/components/ui/BrandMark";
import { ProductCarousel } from "./ProductCarousel";
import { catalogo } from "@/content/site-content";

/** Catalog (cream): own title header + the product carousel below it. */
export function Catalogo() {
  return (
    <section className="catalog" id="productos">
      <div className="wrap">
        <header className="catalog-head">
          <BrandMark />
          <h2>{catalogo.introTitle}</h2>
          <p className="sub">{catalogo.introSubtitle}</p>
        </header>
        <ProductCarousel />
      </div>
    </section>
  );
}

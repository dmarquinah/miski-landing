import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ProductCard } from "./ProductCard";
import { products } from "@/content/products";
import { catalogo } from "@/content/site-content";

/** Catalog grid (cream): 3 / 2 / 1 columns. Card treatment driven by data-card. */
export function Catalogo() {
  return (
    <section className="catalog">
      <div className="wrap">
        <SectionEyebrow>{catalogo.eyebrow}</SectionEyebrow>
        <div className="grid">
          {products.map((product, i) => (
            <ProductCard key={`${product.name}-${i}`} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

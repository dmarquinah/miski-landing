import { BrandMark } from "@/components/ui/BrandMark";
import { ProductCard } from "./ProductCard";
import { products } from "@/content/products";
import { catalogo } from "@/content/site-content";

/** Catalog (cream): own title header + the product grid below it
 *  (4-up on desktop, 2-up on mobile — see `.grid` in theme.css). */
export function Catalogo() {
  return (
    <section className="catalog" id="productos">
      <div className="wrap">
        <header className="catalog-head">
          <BrandMark />
          <h2>{catalogo.introTitle}</h2>
          <p className="sub">{catalogo.introSubtitle}</p>
        </header>
        <div className="grid">
          {products.map((product, index) => (
            <ProductCard
              key={`${product.name}-${product.sub}-${index}`}
              product={product}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import { ResilientImage } from "@/components/ui/ResilientImage";
import { StripedPlaceholder } from "@/components/ui/StripedPlaceholder";
import {
  AWARD_EVENT,
  MEDAL_LABEL,
  originLabel,
  type Product,
} from "@/content/products";

const PRODUCT_SIZES = "(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw";

/**
 * Product card — one markup; the editorial / overlay / minimal treatments are
 * pure CSS off html[data-card]. Mirrors the reference cardHTML.
 */
export function ProductCard({ product, index }: { product: Product; index: number }) {
  const { cat, origin, name, sub, desc, ingr, fmt, img, medals, benefits, phcap } = product;

  return (
    <article className="card" data-reveal data-d={String(index % 3)}>
      <div className="pic">
        <span className={`origin ${origin}`}>{originLabel(cat)}</span>
        {medals && medals.length > 0 && (
          <div className="medalrow">
            {medals.map((m) => (
              <i key={m} className={m} title={`${MEDAL_LABEL[m]} — ${AWARD_EVENT}`}>
                {MEDAL_LABEL[m][0]}
              </i>
            ))}
          </div>
        )}
        {img ? (
          <ResilientImage
            id={img}
            alt={`${name} — ${sub}`}
            width={700}
            sizes={PRODUCT_SIZES}
            fallbackLabel="Foto de producto"
            fallbackCaption={phcap ?? name}
          />
        ) : (
          <StripedPlaceholder label="Foto de producto" caption={phcap ?? name} />
        )}
      </div>
      <div className="body">
        <span className="cat">{cat}</span>
        <h3>{name}</h3>
        <span className="psub">{sub}</span>
        <p className="pdesc">{desc}</p>
        <p className="ingr">{ingr}</p>
        {benefits && benefits.length > 0 && (
          <div className="benefits">
            {benefits.map((b) => (
              <b key={b}>{b}</b>
            ))}
          </div>
        )}
        <div className="fmt">
          <span>{fmt}</span>
        </div>
      </div>
    </article>
  );
}

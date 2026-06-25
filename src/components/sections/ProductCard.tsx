"use client";

import { useState } from "react";
import { ResilientImage } from "@/components/ui/ResilientImage";
import { StripedPlaceholder } from "@/components/ui/StripedPlaceholder";
import { Icon } from "@/components/ui/Icon";
import {
  AWARD_EVENT,
  MEDAL_LABEL,
  originLabel,
  type Product,
} from "@/content/products";

const PRODUCT_SIZES = "(max-width: 560px) 50vw, (max-width: 900px) 50vw, 25vw";
const WHATSAPP_NUMBER = "51940250927";

/** Pre-filled Spanish WhatsApp order message for a given product. */
function orderHref(p: Product): string {
  const msg = `Hola 👋, me interesa comprar *${p.name}* (${p.sub}) — ${p.fmt}. ¿Me brindan más información para hacer el pedido?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

/**
 * Product card — editorial / overlay / minimal treatments come from CSS off
 * html[data-card]. The description is clamped until "Ver más" expands it (which
 * also reveals ingredients + benefits), and each card carries its own WhatsApp
 * purchase link with a product-specific pre-filled message.
 */
export function ProductCard({ product, index }: { product: Product; index: number }) {
  const { cat, origin, name, sub, desc, ingr, fmt, img, medals, benefits, phcap } = product;
  const [open, setOpen] = useState(false);

  return (
    <article className={`card${open ? " is-open" : ""}`} data-reveal data-d={String(index % 4)}>
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

        <div className="card-extra">
          <div className="card-extra-inner">
            <p className="ingr">
              <b>Ingredientes:</b> {ingr}
            </p>
            {benefits && benefits.length > 0 && (
              <div className="benefits">
                {benefits.map((b) => (
                  <b key={b}>{b}</b>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          className="card-toggle"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Ver menos" : "Ver más"}
        </button>

        <div className="card-foot">
          <span className="fmt">
            <span>{fmt}</span>
          </span>
          <a
            className="pbuy"
            href={orderHref(product)}
            target="_blank"
            rel="noopener"
            aria-label={`Comprar ${name} por WhatsApp`}
          >
            <Icon name="whatsapp" />
            Comprar
          </a>
        </div>
      </div>
    </article>
  );
}

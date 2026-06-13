"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { ResilientImage } from "@/components/ui/ResilientImage";
import { StripedPlaceholder } from "@/components/ui/StripedPlaceholder";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Icon } from "@/components/ui/Icon";
import {
  AWARD_EVENT,
  MEDAL_LABEL,
  originLabel,
  products,
  type Product,
} from "@/content/products";

const PRODUCT_SIZES = "(max-width: 840px) 92vw, 46vw";
const WHATSAPP_NUMBER = "51940250927";
const AUTOPLAY_MS = 5000;

/** Pre-filled Spanish WhatsApp order message for a given product. */
function orderHref(p: Product): string {
  const msg = `Hola 👋, me interesa comprar *${p.name}* (${p.sub}) — ${p.fmt}. ¿Me brindan más información para hacer el pedido?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

/**
 * Catalog as a bounded horizontal carousel — one product per slide so the page
 * stays short. It auto-advances (ping-pong, so every product is shown) with a
 * segmented progress indicator synced to the timer; autoplay pauses on hover /
 * focus and is disabled under reduced-motion. Arrows + segments + drag/swipe +
 * keyboard all navigate. Inactive slides are `inert` but stay in the DOM (SEO).
 */
export function ProductCarousel() {
  const n = products.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // bumps once per timer (re)start so the active progress bar remounts in sync
  const [cycle, setCycle] = useState(0);
  const dir = useRef(1);
  const dragStart = useRef<number | null>(null);
  const reduced = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = mq.matches;
    const onChange = () => {
      reduced.current = mq.matches;
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const clamp = (k: number) => Math.max(0, Math.min(n - 1, k));
  const aimDir = (k: number) => {
    dir.current = k >= n - 1 ? -1 : k <= 0 ? 1 : dir.current;
  };
  const move = (delta: number) =>
    setActive((cur) => {
      const next = clamp(cur + delta);
      aimDir(next);
      return next;
    });
  const select = (k: number) => {
    aimDir(k);
    setActive(clamp(k));
  };

  // autoplay (ping-pong); restarts the synced progress bar via `cycle`
  useEffect(() => {
    if (paused || reduced.current || n < 2) return;
    setCycle((c) => c + 1);
    const id = window.setTimeout(() => {
      setActive((cur) => {
        let next = cur + dir.current;
        if (next > n - 1) {
          next = n - 2;
          dir.current = -1;
        } else if (next < 0) {
          next = 1;
          dir.current = 1;
        }
        return next;
      });
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [active, paused, n]);

  const onPointerDown = (e: PointerEvent) => {
    dragStart.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (dragStart.current === null) return;
    const dx = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(dx) > 50) move(dx < 0 ? 1 : -1);
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      move(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      move(-1);
    }
  };

  return (
    <div
      className="pcar"
      role="group"
      aria-roledescription="carrusel"
      aria-label="Catálogo de productos"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="pcar-view"
        tabIndex={0}
        role="region"
        aria-label="Productos — desliza o usa las flechas para ver más"
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <div className="pcar-track" style={{ transform: `translateX(${-active * 100}%)` }}>
          {products.map((p, k) => (
            <article
              className="pcar-slide"
              key={`${p.name}-${p.sub}-${k}`}
              inert={k !== active}
              aria-label={`${p.name} — ${p.sub}`}
            >
              <div className="product">
                <MediaFrame variant="tall">
                  <span className={`origin ${p.origin}`}>{originLabel(p.cat)}</span>
                  {p.medals && p.medals.length > 0 && (
                    <div className="medalrow">
                      {p.medals.map((m) => (
                        <i key={m} className={m} title={`${MEDAL_LABEL[m]} — ${AWARD_EVENT}`}>
                          {MEDAL_LABEL[m][0]}
                        </i>
                      ))}
                    </div>
                  )}
                  {p.img ? (
                    <ResilientImage
                      id={p.img}
                      alt={`${p.name} — ${p.sub}`}
                      sizes={PRODUCT_SIZES}
                      fallbackLabel="Foto de producto"
                      fallbackCaption={p.phcap ?? p.name}
                    />
                  ) : (
                    <StripedPlaceholder label="Foto de producto" caption={p.phcap ?? p.name} />
                  )}
                </MediaFrame>

                <div className="copy">
                  <span className="p-index">
                    {String(k + 1).padStart(2, "0")} / {n}
                  </span>
                  <SectionEyebrow>{p.cat}</SectionEyebrow>
                  <h3 className="s-title">{p.name}</h3>
                  <span className="psub">{p.sub}</span>
                  <p className="pdesc">{p.desc}</p>
                  <p className="ingr">
                    <b>Ingredientes:</b> {p.ingr}
                  </p>
                  {p.benefits && p.benefits.length > 0 && (
                    <div className="benefits">
                      {p.benefits.map((b) => (
                        <b key={b}>{b}</b>
                      ))}
                    </div>
                  )}
                  <div className="pcar-foot">
                    <span className="fmt">
                      <span>{p.fmt}</span>
                    </span>
                    <a className="pbuy" href={orderHref(p)} target="_blank" rel="noopener">
                      <Icon name="whatsapp" />
                      Comprar por WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="pcar-controls">
        <button
          type="button"
          className="pcar-arrow"
          onClick={() => move(-1)}
          disabled={active === 0}
          aria-label="Producto anterior"
        >
          ‹
        </button>
        <div className="pcar-bars" role="tablist" aria-label="Ir a un producto">
          {products.map((p, k) => (
            <button
              key={`${p.name}-${k}`}
              type="button"
              role="tab"
              aria-selected={k === active}
              aria-label={`${k + 1}. ${p.name} ${p.sub}`}
              className={`pcar-bar${k === active ? " active" : ""}${
                k === active && paused ? " is-paused" : ""
              }`}
              onClick={() => select(k)}
            >
              {k === active && <span className="fill" key={cycle} />}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="pcar-arrow"
          onClick={() => move(1)}
          disabled={active === n - 1}
          aria-label="Siguiente producto"
        >
          ›
        </button>
      </div>
    </div>
  );
}

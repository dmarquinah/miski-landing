"use client";

import { useEffect } from "react";

/**
 * Port of the reference setupParallax(): translate `[data-parallax="<speed>"]`
 * elements on scroll via a rAF loop. Disabled entirely under reduced motion.
 * Call once from a top-level client component (ClientEffects).
 */
export function useParallax(): void {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    if (!items.length) return;

    let ticking = false;
    const frame = () => {
      const vh = window.innerHeight;
      items.forEach((el) => {
        const sp = parseFloat(el.getAttribute("data-parallax") ?? "") || 0.15;
        const r = el.getBoundingClientRect();
        const mid = r.top + r.height / 2;
        const off = (mid - vh / 2) / vh; // -1..1
        el.style.transform = `translate3d(0,${(off * sp * -100).toFixed(2)}px,0)`;
      });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(frame);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    frame();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
}

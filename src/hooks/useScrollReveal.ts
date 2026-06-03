"use client";

import { useEffect } from "react";

/**
 * Faithful port of the reference setupReveal(): a single rAF-throttled scroll
 * loop that adds `.in` to `[data-reveal]` / `.divider` elements once their top
 * passes ~88% of the viewport, then stops tracking them. Includes the
 * reference's safety timeouts so content is never left hidden, and short-circuits
 * to "all visible" under reduced motion.
 *
 * Call once from a top-level client component (ClientEffects).
 */
export function useScrollReveal(): void {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal], .divider"),
    );
    if (!els.length) return;

    const revealAll = () => {
      els.forEach((e) => e.classList.add("in"));
      els.length = 0;
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealAll();
      return;
    }

    const check = () => {
      const vh = window.innerHeight;
      for (let i = els.length - 1; i >= 0; i--) {
        const r = els[i].getBoundingClientRect();
        if (r.top < vh * 0.88 && r.bottom > 0) {
          els[i].classList.add("in");
          els.splice(i, 1);
        }
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          check();
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    check();
    const t1 = window.setTimeout(check, 200);
    const t2 = window.setTimeout(check, 800);
    // ultimate safety: never leave content hidden
    const t3 = window.setTimeout(revealAll, 3000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);
}

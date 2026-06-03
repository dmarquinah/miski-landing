"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Per-element in-view hook for components that prefer local control over the
 * global useScrollReveal loop. SSR-safe: defaults to NOT-in-view, then reveals
 * on intersection — but immediately reveals (and never hides) under reduced
 * motion or when IntersectionObserver is unavailable, with a safety timeout so
 * content is never stuck hidden.
 */
export function useInView<T extends HTMLElement = HTMLElement>(): {
  ref: React.RefObject<T | null>;
  inView: boolean;
} {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window) || !el) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(el);

    const safety = window.setTimeout(() => setInView(true), 3000);

    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return { ref, inView };
}

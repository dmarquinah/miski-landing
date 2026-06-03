"use client";

import { useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useParallax } from "@/hooks/useParallax";

/**
 * Mounts the global scroll-driven effects once. Also adds the `js` class to
 * <html> so the no-JS reveal fallback in theme.css (html:not(.js) …) yields to
 * the animated path once React is running. (The head script adds `js` pre-paint
 * too; this is a belt-and-suspenders no-op if already present.)
 */
export function ClientEffects() {
  useEffect(() => {
    document.documentElement.classList.add("js");
  }, []);

  useScrollReveal();
  useParallax();

  return null;
}

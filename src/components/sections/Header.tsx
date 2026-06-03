"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { nav } from "@/content/site-content";
import { siteConfig } from "@/lib/site";

export function Header() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Sticky nav: turn solid once scrolled past (heroHeight − 80). Port of setupNav.
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".hero");
    if (!hero) return;
    let ticking = false;
    const check = () => setSolid(window.scrollY > hero.offsetHeight - 80);
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
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className={solid ? "nav solid" : "nav"} id="nav">
        <a className="brand" href="#top">
          <Logo />
          <b>{siteConfig.name}</b>
          <span>{nav.brandTagline}</span>
        </a>
        <nav className="nav-links">
          {nav.links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <button
          className="nav-burger"
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <i />
          <i />
          <i />
        </button>
      </header>

      <div className={menuOpen ? "mmenu open" : "mmenu"} aria-hidden={!menuOpen}>
        <button className="close" aria-label="Cerrar menú" onClick={() => setMenuOpen(false)}>
          ✕
        </button>
        {nav.links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}

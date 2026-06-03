import { Logo } from "@/components/ui/Logo";
import { ResilientImage } from "@/components/ui/ResilientImage";
import { hero } from "@/content/site-content";

/**
 * Hero — one markup, three layouts driven purely by CSS off html[data-hero]
 * (centered default / editorial split / full-bleed image). The background image
 * layer only shows in the split & image variants; it carries the parallax hook.
 */
export function Hero() {
  return (
    <section className="hero hero-centered" id="top">
      <div className="pattern" />
      <div className="heroimg" data-parallax="0.12">
        <ResilientImage
          id={hero.imageId}
          alt={hero.imageAlt}
          width={1600}
          sizes="100vw"
          fallbackLabel="Imagen principal"
          fallbackCaption="Composición de chocolate"
        />
      </div>
      <div className="hero-inner">
        <Logo className="biglogo" />
        <h1>
          {hero.title[0]}
          <br />
          {hero.title[1]}
        </h1>
        <p className="tagline">{hero.tagline}</p>
      </div>
      <a className="scrolldown" href="#nosotros">
        <span>{hero.scrollCue}</span>
        <span className="chev" />
      </a>
      <p className="madein">{hero.madeIn}</p>
    </section>
  );
}

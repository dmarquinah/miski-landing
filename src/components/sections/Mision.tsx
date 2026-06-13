import { MediaFrame } from "@/components/ui/MediaFrame";
import { ResilientImage } from "@/components/ui/ResilientImage";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { mision } from "@/content/site-content";

/** ¿Por qué lo hacemos? — Misión. Salmon break, inverted (copy left / media right). */
export function Mision() {
  return (
    <section className="section mission">
      <div className="wrap">
        <div className="story rev">
          <MediaFrame variant="wide" delay={1}>
            <ResilientImage
              id={mision.imageId}
              alt={mision.imageAlt}
              fallbackLabel={mision.placeholder.label}
              fallbackCaption={mision.placeholder.caption}
            />
          </MediaFrame>
          <div className="copy" data-reveal>
            <SectionEyebrow>{mision.eyebrow}</SectionEyebrow>
            <h2 className="s-title">
              {mision.titleLead}
              <span className="it">{mision.titleItalic}</span>
              {mision.titleTail}
            </h2>
            {mision.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

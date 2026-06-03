import { MediaFrame } from "@/components/ui/MediaFrame";
import { ResilientImage } from "@/components/ui/ResilientImage";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Fact } from "@/components/ui/Fact";
import { queHacemos } from "@/content/site-content";

/** ¿Qué hacemos? — dark story, inverted (copy left / media right). */
export function QueHacemos() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="story rev">
          <MediaFrame variant="wide" delay={1}>
            <ResilientImage id={queHacemos.imageId} alt={queHacemos.imageAlt} />
          </MediaFrame>
          <div className="copy" data-reveal>
            <SectionEyebrow>{queHacemos.eyebrow}</SectionEyebrow>
            <h2 className="s-title">
              {queHacemos.titleLead}
              <span className="it">{queHacemos.titleItalic}</span>
            </h2>
            {queHacemos.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <div className="facts">
              {queHacemos.facts.map((f) => (
                <Fact key={f.label} value={f.value} label={f.label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

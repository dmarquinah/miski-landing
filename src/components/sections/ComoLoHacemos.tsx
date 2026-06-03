import { MediaFrame } from "@/components/ui/MediaFrame";
import { ResilientImage } from "@/components/ui/ResilientImage";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Seal } from "@/components/ui/Seal";
import { proceso } from "@/content/site-content";

/** ¿Cómo lo hacemos? — Proceso & Premios. Dark, media left / copy right. */
export function ComoLoHacemos() {
  return (
    <section className="section" id="proceso">
      <div className="wrap">
        <div className="story">
          <MediaFrame variant="tall">
            <ResilientImage id={proceso.imageId} alt={proceso.imageAlt} />
          </MediaFrame>
          <div className="copy" data-reveal data-d="1">
            <SectionEyebrow>{proceso.eyebrow}</SectionEyebrow>
            <h2 className="s-title">
              {proceso.titleLead}
              <span className="it">{proceso.titleItalic}</span>
            </h2>
            {proceso.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <div className="awards">
              {proceso.awards.map((a) => (
                <Seal key={a.label} medal={a.medal} label={a.label} event={a.event} />
              ))}
            </div>
            <div className="process">
              {proceso.steps.map((step, i) => (
                <span key={step} className="contents">
                  <span className="step">{step}</span>
                  {i < proceso.steps.length - 1 && <span className="arrow">→</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { MediaFrame } from "@/components/ui/MediaFrame";
import { StripedPlaceholder } from "@/components/ui/StripedPlaceholder";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { nosotros } from "@/content/site-content";

/** ¿Quiénes somos? — dark story, media left / copy right. */
export function Nosotros() {
  return (
    <section className="section" id="nosotros">
      <div className="wrap">
        <div className="story">
          <MediaFrame variant="tall">
            <StripedPlaceholder
              label={nosotros.placeholder.label}
              caption={nosotros.placeholder.caption}
            />
          </MediaFrame>
          <div className="copy" data-reveal data-d="1">
            <SectionEyebrow>{nosotros.eyebrow}</SectionEyebrow>
            <h2 className="s-title">
              {nosotros.titleLead}
              <span className="it">{nosotros.titleItalic}</span>
            </h2>
            <p>
              {nosotros.intro.pre}
              <em className="serif-em">{nosotros.intro.em}</em>
              {nosotros.intro.post}
            </p>
            <p>{nosotros.paragraph2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

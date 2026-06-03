import { ResilientImage } from "@/components/ui/ResilientImage";
import { contacto } from "@/content/site-content";

const { blocks } = contacto;

/** Contacto — full-bleed origin photo + dark overlay, then a 3-column grid. */
export function Contacto() {
  return (
    <section className="contact" id="contacto">
      <div className="bg" data-parallax="0.08">
        <ResilientImage
          id={contacto.imageId}
          alt={contacto.imageAlt}
          width={1600}
          sizes="100vw"
          fallbackCaption={contacto.imageAlt}
        />
      </div>
      <div className="wrap">
        <div className="anay" data-reveal>
          <h2>
            <span className="it">{contacto.titleItalic}</span>
            {contacto.titleTail}
          </h2>
          <p>{contacto.lead}</p>
          <a className="cta" href={contacto.cta.href} target="_blank" rel="noopener">
            {contacto.cta.label}
          </a>
        </div>

        <div className="contact-grid">
          <div className="cblock" data-reveal>
            <h4>{blocks.social.heading}</h4>
            {blocks.social.items.map((item) =>
              item.type === "link" ? (
                <a key={item.label} href={item.href} target="_blank" rel="noopener">
                  <span className="ico">{item.icon}</span> {item.label}
                </a>
              ) : (
                <span className="li" key={item.label}>
                  <span className="ico">{item.icon}</span> {item.label}
                </span>
              ),
            )}
          </div>

          <div className="cblock" data-reveal data-d="1">
            <h4>{blocks.phone.heading}</h4>
            <a href={blocks.phone.whatsapp.href} target="_blank" rel="noopener">
              <span className="ico">✆</span>
              <span className="big">{blocks.phone.whatsapp.number}</span>
            </a>
            <a href={blocks.phone.call.href}>
              <span className="ico">·</span> {blocks.phone.call.label}
            </a>
          </div>

          <div className="cblock" data-reveal data-d="2">
            <h4>{blocks.email.heading}</h4>
            <a href={blocks.email.href}>
              <span className="ico">✉</span> {blocks.email.address}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

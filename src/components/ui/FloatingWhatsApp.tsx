import { Icon } from "@/components/ui/Icon";
import { contacto } from "@/content/site-content";

const PREFILL =
  "Hola 👋, quisiera más información sobre los productos de Miski Warmi.";

/**
 * Fixed bottom-right WhatsApp quick-access button. Reuses the same number as the
 * contact block; the brand pink (`--pink`) is the background per the owner's ask.
 */
export function FloatingWhatsApp() {
  const href = `${contacto.blocks.phone.whatsapp.href}?text=${encodeURIComponent(PREFILL)}`;

  return (
    <a
      className="wa-float"
      href={href}
      target="_blank"
      rel="noopener"
      aria-label="Escríbenos por WhatsApp"
      title="Escríbenos por WhatsApp"
    >
      <Icon name="whatsapp" />
    </a>
  );
}

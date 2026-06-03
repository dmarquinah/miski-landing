import { Logo } from "@/components/ui/Logo";
import { footer } from "@/content/site-content";

/** Footer — deepest surface, centered brand mark + taglines. */
export function Footer() {
  return (
    <footer className="footer">
      <Logo />
      <p className="ftag">{footer.tagline}</p>
      <div className="meta">
        <span>{footer.copyright}</span>
        <span>{footer.credit}</span>
      </div>
    </footer>
  );
}

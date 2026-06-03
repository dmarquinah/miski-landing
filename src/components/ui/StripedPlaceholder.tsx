import { Logo } from "./Logo";

/**
 * Striped diagonal placeholder for owner-supplied photos that aren't in yet,
 * and the graceful fallback when a stand-in image fails to load.
 * `label` is the small uppercased kicker; `caption` the description line.
 */
export function StripedPlaceholder({ label, caption }: { label?: string; caption: string }) {
  return (
    <div className="ph">
      <Logo />
      <span className="cap">
        {label ? <b>{label}</b> : null}
        {caption}
      </span>
    </div>
  );
}

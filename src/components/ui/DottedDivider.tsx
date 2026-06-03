import { Logo } from "./Logo";

/**
 * Decorative dotted divider with the M glyph centered. Draws in via the same
 * reveal mechanism (the `.divider` selector is picked up by useScrollReveal).
 * `full` makes the lines span the available width.
 */
export function DottedDivider({ full = true }: { full?: boolean }) {
  return (
    <div className={full ? "divider full" : "divider"}>
      <span className="line" />
      <Logo className="glyph" />
      <span className="line" />
    </div>
  );
}

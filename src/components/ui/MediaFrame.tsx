/**
 * Framed media block with Andean corner ticks. The frame is the positioned,
 * aspect-ratio'd box that fills with either a ResilientImage (`fill`) or a
 * StripedPlaceholder. Carries the scroll-reveal attributes for the media column.
 */
export function MediaFrame({
  variant,
  delay,
  children,
}: {
  variant: "tall" | "wide";
  delay?: 1 | 2 | 3;
  children: React.ReactNode;
}) {
  return (
    <div className="media" data-reveal {...(delay ? { "data-d": String(delay) } : {})}>
      <span className="tick tl" />
      <span className="tick br" />
      <div className={`frame ${variant}`}>{children}</div>
    </div>
  );
}

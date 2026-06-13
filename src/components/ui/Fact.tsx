/** Pill highlight: accent value (display italic) + label. */
export function Fact({ value, label }: { value: string; label: string }) {
  return (
    <span className="fact">
      <b>{value}</b> {label}
    </span>
  );
}

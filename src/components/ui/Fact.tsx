/** Pill highlight: accent value (Fraunces italic) + label. */
export function Fact({ value, label }: { value: string; label: string }) {
  return (
    <span className="fact">
      <b>{value}</b> {label}
    </span>
  );
}

import type { Medal } from "@/content/products";

/**
 * Award credential pill — an original gold/silver medal (Au/Ag) + label.
 * These are recreated seals, NOT the real competition logos.
 */
export function Seal({ medal, label, event }: { medal: Medal; label: string; event: string }) {
  return (
    <div className="seal">
      <span className={`medal ${medal}`}>{medal === "gold" ? "Au" : "Ag"}</span>
      <span className="t">
        <b>{label}</b>
        <span>{event}</span>
      </span>
    </div>
  );
}

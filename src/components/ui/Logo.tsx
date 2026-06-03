/**
 * The Andean "M" mark — geometric monogram (chevron + dot), ported from the
 * reference markSVG(). Inherits color via currentColor and is sized by the
 * parent's font-size (`.mark { width: 1em; height: 1em }`). Decorative by default.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={className ? `mark ${className}` : "mark"} aria-hidden="true">
      <svg viewBox="0 0 100 100">
        <polyline points="14,82 14,30 50,64 86,30 86,82" />
        <polyline points="32,18 50,36 68,18" />
        <circle className="dot" cx="50" cy="58" r="5" />
      </svg>
    </span>
  );
}

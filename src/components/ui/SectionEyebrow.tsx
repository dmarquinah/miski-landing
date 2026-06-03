import { Logo } from "./Logo";

/** Small uppercased section label with the M mark, in the accent color. */
export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="eyebrow">
      <Logo />
      {children}
    </span>
  );
}

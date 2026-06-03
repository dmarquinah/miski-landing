"use client";

import { useState } from "react";
import { useAppearance } from "./AppearanceProvider";
import { ACCENTS, type AccentKey, type Appearance } from "./appearance";

type Option<V extends string> = { value: V; label: string };

const HERO_OPTS: Option<Appearance["hero"]>[] = [
  { value: "centered", label: "Centro" },
  { value: "split", label: "Editorial" },
  { value: "image", label: "Foto" },
];
const CARD_OPTS: Option<Appearance["card"]>[] = [
  { value: "editorial", label: "Editorial" },
  { value: "overlay", label: "Overlay" },
  { value: "minimal", label: "Mínimal" },
];
const MOTIF_OPTS: Option<Appearance["motif"]>[] = [
  { value: "subtle", label: "Sutil" },
  { value: "moderate", label: "Medio" },
  { value: "bold", label: "Fuerte" },
];
const ACCENT_OPTS: { value: AccentKey; label: string }[] = [
  { value: "salmon", label: "Salmón" },
  { value: "terracotta", label: "Terracota" },
  { value: "rosa", label: "Rosa" },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/55">
        {label}
      </span>
      {children}
    </div>
  );
}

function SegmentedControl<V extends string>({
  options,
  value,
  onChange,
}: {
  options: Option<V>[];
  value: V;
  onChange: (v: V) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt.value)}
            className={`rounded-base border px-2 py-2 text-[12px] font-medium transition-colors ${
              active
                ? "border-accent bg-accent text-cacao"
                : "border-cacao-line text-cream/80 hover:border-accent/60"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export function AppearancePanel() {
  const { appearance, setAppearance } = useAppearance();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-[9999] print:hidden">
      {open && (
        <div
          role="dialog"
          aria-label="Apariencia"
          className="mb-3 w-[280px] rounded-base border border-cacao-line bg-cacao-deep/95 p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg text-cream">Apariencia</h2>
            <button
              type="button"
              aria-label="Cerrar"
              onClick={() => setOpen(false)}
              className="text-xl leading-none text-cream/60 transition-colors hover:text-cream"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <Field label="Hero">
              <SegmentedControl
                options={HERO_OPTS}
                value={appearance.hero}
                onChange={(v) => setAppearance("hero", v)}
              />
            </Field>

            <Field label="Tarjetas">
              <SegmentedControl
                options={CARD_OPTS}
                value={appearance.card}
                onChange={(v) => setAppearance("card", v)}
              />
            </Field>

            <Field label="Acento">
              <div className="flex gap-2.5">
                {ACCENT_OPTS.map((opt) => {
                  const active = opt.value === appearance.accent;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      aria-label={opt.label}
                      aria-pressed={active}
                      title={opt.label}
                      onClick={() => setAppearance("accent", opt.value)}
                      className={`h-8 w-8 rounded-full border-2 transition-transform ${
                        active ? "scale-110 border-cream" : "border-transparent hover:scale-105"
                      }`}
                      style={{ background: ACCENTS[opt.value].a }}
                    />
                  );
                })}
              </div>
            </Field>

            <Field label="Motivos andinos">
              <SegmentedControl
                options={MOTIF_OPTS}
                value={appearance.motif}
                onChange={(v) => setAppearance("motif", v)}
              />
            </Field>

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/55">
                Textura de papel
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={appearance.grain}
                aria-label="Textura de papel"
                onClick={() => setAppearance("grain", !appearance.grain)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  appearance.grain ? "bg-accent" : "bg-cacao-line"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-cream transition-all ${
                    appearance.grain ? "left-[22px]" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        aria-label="Personalizar apariencia"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-cacao-line bg-cacao-deep/95 text-cream shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)] backdrop-blur-md transition-transform hover:scale-105"
      >
        <GearIcon />
      </button>
    </div>
  );
}

function GearIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

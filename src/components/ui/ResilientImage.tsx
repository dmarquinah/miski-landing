"use client";

import Image from "next/image";
import { useState } from "react";
import { unsplashUrl } from "@/lib/images";
import { StripedPlaceholder } from "./StripedPlaceholder";

/**
 * Cover image for the framed media slots. Loads either a local asset (any `id`
 * starting with "/", e.g. "/products/nibs-cacao.jpg") or an Unsplash stand-in
 * (bare photo id) via next/image (unoptimized for static export) and, if it
 * fails, swaps to the striped placeholder — preserving the onError resilience.
 *
 * Renders with `fill`, so the parent must be positioned (the .frame/.pic/.bg
 * wrappers already are) and define the box size.
 */
export function ResilientImage({
  id,
  alt,
  width = 1100,
  sizes = "(max-width: 900px) 100vw, 50vw",
  priority = false,
  fallbackLabel,
  fallbackCaption,
}: {
  id: string;
  alt: string;
  width?: number;
  sizes?: string;
  priority?: boolean;
  fallbackLabel?: string;
  fallbackCaption?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <StripedPlaceholder label={fallbackLabel} caption={fallbackCaption ?? alt} />;
  }

  // Local assets (under /public) are referenced by absolute path; everything
  // else is treated as an Unsplash photo id and run through the URL builder.
  const src = id.startsWith("/") ? id : unsplashUrl(id, width);

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized
      style={{ objectFit: "cover" }}
      onError={() => setFailed(true)}
    />
  );
}

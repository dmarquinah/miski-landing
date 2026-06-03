import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so a stray parent lockfile (~/yarn.lock) can't be
  // mistaken for the project root.
  turbopack: {
    root: import.meta.dirname,
  },

  // Emit a fully static site to ./out — served directly by Cloudflare Pages
  // with no server runtime. Best performance and SEO for a landing page.
  output: "export",

  // Cloudflare Pages serves clean URLs from per-route folders (/about/index.html).
  trailingSlash: true,

  // next/image's default optimizer needs a server; disable it for static export.
  // Swap in a custom loader (e.g. Cloudflare Images) later if needed.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

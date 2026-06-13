import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Generates a static /sitemap.xml at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Add a new entry here for every public route you create.
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

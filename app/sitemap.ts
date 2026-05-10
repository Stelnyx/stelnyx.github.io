import type { MetadataRoute } from "next";
import { FEATURE_PUBLIC_REPOS } from "@/lib/features";

export const dynamic = "force-static";

const SITE_URL = "https://stelnyx.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
  ];
  // Tool pages live under /preview/* (CF-gated) when public-repos flag is off — exclude from sitemap.
  // When flag flips on, expose canonical /preview/* URLs (also blocked in robots.txt by default — adjust if/when promoting).
  if (FEATURE_PUBLIC_REPOS) {
    entries.push(
      { url: `${SITE_URL}/preview/luxscope`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
      { url: `${SITE_URL}/preview/luxfaber`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    );
  }
  entries.push(
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  );
  return entries;
}

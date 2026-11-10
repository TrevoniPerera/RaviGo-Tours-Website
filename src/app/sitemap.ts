import type { MetadataRoute } from "next";
import config from "@/data/config";
import { routing } from "@/i18n/routing";
import destinations from "@/data/destinations";
import packages from "@/data/packages";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = config.siteUrl;
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    // 1. Home page
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    });

    // 2. Privacy page
    entries.push({
      url: `${baseUrl}/${locale}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    });

    // 3. Destination detail routes
    for (const destination of destinations) {
      entries.push({
        url: `${baseUrl}/${locale}/destinations/${destination.id}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }

    // 4. Package detail routes
    for (const pkg of packages) {
      entries.push({
        url: `${baseUrl}/${locale}/packages/${pkg.id}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return entries;
}


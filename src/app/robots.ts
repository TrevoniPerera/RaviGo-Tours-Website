import type { MetadataRoute } from "next";
import config from "@/data/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/go/",
    },
    sitemap: `${config.siteUrl}/sitemap.xml`,
  };
}


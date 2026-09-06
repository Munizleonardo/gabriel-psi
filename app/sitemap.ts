import type { MetadataRoute } from "next";
import { CITIES, SITE_URL } from "@/app/_lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/politica-de-privacidade"];
  const cityRoutes = Object.values(CITIES).map((city) => `/${city.slug}`);

  return [...staticRoutes, ...cityRoutes].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));
}

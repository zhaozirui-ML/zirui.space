import { getSiteUrl } from "../src/site/lib/get-site-url";

export default function robots() {
  const siteUrl = getSiteUrl();

  return {
    host: siteUrl,
    rules: {
      allow: "/",
      userAgent: "*",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

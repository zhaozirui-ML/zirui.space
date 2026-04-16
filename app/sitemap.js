import { getAllBlogSlugs } from "../src/site/lib/get-blog-by-slug";
import { getSiteUrl } from "../src/site/lib/get-site-url";
import { getAllWorkSlugs } from "../src/site/lib/get-work-by-slug";

function createUrlEntry(siteUrl, route) {
  return {
    changeFrequency: "monthly",
    lastModified: new Date(),
    priority: route === "/" ? 1 : 0.8,
    url: `${siteUrl}${route}`,
  };
}

export default function sitemap() {
  const siteUrl = getSiteUrl();
  const staticRoutes = ["/", "/about", "/work", "/blog"];
  const workRoutes = getAllWorkSlugs().map((slug) => `/work/${slug}`);
  const blogRoutes = getAllBlogSlugs().map((slug) => `/blog/${slug}`);

  return [...staticRoutes, ...workRoutes, ...blogRoutes].map((route) =>
    createUrlEntry(siteUrl, route),
  );
}

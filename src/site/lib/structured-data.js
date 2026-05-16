import { getLocalizedValue } from "../i18n/get-localized-value";
import { getSiteUrl } from "./get-site-url";

const PERSON_ID = "#person";
const WEBSITE_ID = "#website";

function absoluteUrl(pathname = "/") {
  const siteUrl = getSiteUrl();
  return new URL(pathname, siteUrl).toString();
}

function absoluteImageUrl(src) {
  if (!src) {
    return undefined;
  }

  return absoluteUrl(src);
}

function parseChineseDate(date) {
  const match = date?.match?.(/^(\d{4})年(\d{1,2})月(\d{1,2})日$/);

  if (!match) {
    return undefined;
  }

  const [, year, month, day] = match;
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

export function getBreadcrumbStructuredData({ items, language }) {
  const homeName = language === "en" ? "Home" : "首页";
  const allItems = [{ name: homeName, pathname: "/" }, ...items];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      item: absoluteUrl(item.pathname),
      name: item.name,
      position: index + 1,
    })),
  };
}

export function getBlogPostingStructuredData({ language, post }) {
  const title = getLocalizedValue(post.title, language);
  const description = getLocalizedValue(post.detailSummary ?? post.summary, language);
  const image = absoluteImageUrl(post.heroImageSrc ?? post.imageSrc);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    author: { "@id": `${absoluteUrl()}${PERSON_ID}` },
    datePublished: parseChineseDate(post.date),
    description,
    headline: title,
    image,
    inLanguage: language === "en" ? "en-US" : "zh-CN",
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    publisher: { "@id": `${absoluteUrl()}${PERSON_ID}` },
    url: absoluteUrl(`/blog/${post.slug}`),
  };
}

export function getCreativeWorkStructuredData({ language, work }) {
  const title = getLocalizedValue(work.title, language);
  const description = getLocalizedValue(work.detailSummary ?? work.summary, language);
  const category = getLocalizedValue(work.category, language);
  const image = absoluteImageUrl(
    work.workPreview?.src ?? work.homeImageSrc ?? work.workPreview?.backgroundSrc,
  );

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    about: category,
    creator: { "@id": `${absoluteUrl()}${PERSON_ID}` },
    description,
    headline: title,
    image,
    inLanguage: language === "en" ? "en-US" : "zh-CN",
    isPartOf: { "@id": `${absoluteUrl()}${WEBSITE_ID}` },
    name: title,
    url: absoluteUrl(`/work/${work.slug}`),
  };
}

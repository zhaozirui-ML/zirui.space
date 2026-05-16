import { notFound } from "next/navigation";

import {
  getAllBlogSlugs,
  getBlogBySlug,
} from "../../../../src/site/lib/get-blog-by-slug";
import { getReturnPath } from "../../../../src/site/lib/get-return-path";
import StructuredData from "../../../../src/site/components/StructuredData";
import {
  blogIndexDictionary,
  getPageMetadata,
} from "../../../../src/site/i18n/dictionary";
import { getLocalizedValue } from "../../../../src/site/i18n/get-localized-value";
import { getServerLanguage } from "../../../../src/site/i18n/server";
import {
  getBlogPostingStructuredData,
  getBreadcrumbStructuredData,
} from "../../../../src/site/lib/structured-data";
import BlogDetailPage from "../../../../src/site/pages/BlogDetailPage";

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = getBlogBySlug(resolvedParams.slug);
  const language = await getServerLanguage();

  if (!post) {
    return {};
  }

  return getPageMetadata({
    description: post.detailSummary ?? post.summary,
    language,
    pathname: `/blog/${resolvedParams.slug}`,
    title: post.title,
  });
}

export default async function BlogDetailRoutePage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const post = getBlogBySlug(resolvedParams.slug);
  const language = await getServerLanguage();

  if (!post) {
    notFound();
  }

  const returnHref = getReturnPath(resolvedSearchParams?.from, "/blog");
  const title = getLocalizedValue(post.title, language);
  const breadcrumbData = getBreadcrumbStructuredData({
    items: [
      {
        name: getLocalizedValue(blogIndexDictionary.metadataTitle, language),
        pathname: "/blog",
      },
      {
        name: title,
        pathname: `/blog/${resolvedParams.slug}`,
      },
    ],
    language,
  });
  const articleData = getBlogPostingStructuredData({ language, post });

  return (
    <>
      <BlogDetailPage language={language} returnHref={returnHref} slug={resolvedParams.slug} />
      <StructuredData data={breadcrumbData} />
      <StructuredData data={articleData} />
    </>
  );
}

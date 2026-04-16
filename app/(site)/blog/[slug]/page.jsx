import { notFound } from "next/navigation";

import {
  getAllBlogSlugs,
  getBlogBySlug,
} from "../../../../src/site/lib/get-blog-by-slug";
import { getReturnPath } from "../../../../src/site/lib/get-return-path";
import { getPageMetadata } from "../../../../src/site/i18n/dictionary";
import { getServerLanguage } from "../../../../src/site/i18n/server";
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

  return <BlogDetailPage language={language} returnHref={returnHref} slug={resolvedParams.slug} />;
}

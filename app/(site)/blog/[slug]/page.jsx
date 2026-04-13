import { notFound } from "next/navigation";

import { getServerLanguage } from "../../../../src/site/i18n/server";
import {
  getAllBlogSlugs,
  getBlogBySlug,
} from "../../../../src/site/lib/get-blog-by-slug";
import { getReturnPath } from "../../../../src/site/lib/get-return-path";
import BlogDetailPage from "../../../../src/site/pages/BlogDetailPage";

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export default async function BlogDetailRoutePage({ params, searchParams }) {
  const language = await getServerLanguage();
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const post = getBlogBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const returnHref = getReturnPath(resolvedSearchParams?.from, "/blog");

  return (
    <BlogDetailPage
      language={language}
      returnHref={returnHref}
      slug={resolvedParams.slug}
    />
  );
}

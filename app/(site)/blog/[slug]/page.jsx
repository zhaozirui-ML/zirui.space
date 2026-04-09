import { notFound } from "next/navigation";

import {
  getAllBlogSlugs,
  getBlogBySlug,
} from "../../../../src/site/lib/get-blog-by-slug";
import BlogDetailPage from "../../../../src/site/pages/BlogDetailPage";

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export default async function BlogDetailRoutePage({ params }) {
  const resolvedParams = await params;
  const post = getBlogBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return <BlogDetailPage slug={resolvedParams.slug} />;
}

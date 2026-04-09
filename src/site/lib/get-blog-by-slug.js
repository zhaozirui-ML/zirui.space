import { blogPosts } from "../data/blog-posts";

export function getAllBlogSlugs() {
  return blogPosts.map((post) => post.slug);
}

export function getBlogBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}

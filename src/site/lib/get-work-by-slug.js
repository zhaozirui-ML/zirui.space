import { workItems } from "../data/work-items";

export function getAllWorkSlugs() {
  return workItems.map((item) => item.slug);
}

export function getWorkBySlug(slug) {
  return workItems.find((item) => item.slug === slug) ?? null;
}

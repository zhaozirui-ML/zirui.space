import { notFound } from "next/navigation";

import {
  getAllWorkSlugs,
  getWorkBySlug,
} from "../../../../src/site/lib/get-work-by-slug";
import WorkDetailPage from "../../../../src/site/pages/WorkDetailPage";

export function generateStaticParams() {
  return getAllWorkSlugs().map((slug) => ({ slug }));
}

export default async function WorkDetailRoutePage({ params }) {
  const resolvedParams = await params;
  const work = getWorkBySlug(resolvedParams.slug);

  if (!work) {
    notFound();
  }

  return <WorkDetailPage slug={resolvedParams.slug} />;
}

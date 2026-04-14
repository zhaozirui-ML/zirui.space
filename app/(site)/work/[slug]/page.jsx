import { notFound } from "next/navigation";

import {
  getAllWorkSlugs,
  getWorkBySlug,
} from "../../../../src/site/lib/get-work-by-slug";
import { getReturnPath } from "../../../../src/site/lib/get-return-path";
import { getServerLanguage } from "../../../../src/site/i18n/server";
import WorkDetailPage from "../../../../src/site/pages/WorkDetailPage";

export function generateStaticParams() {
  return getAllWorkSlugs().map((slug) => ({ slug }));
}

export default async function WorkDetailRoutePage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const work = getWorkBySlug(resolvedParams.slug);
  const language = await getServerLanguage();

  if (!work) {
    notFound();
  }

  const returnHref = getReturnPath(resolvedSearchParams?.from, "/work");

  return <WorkDetailPage language={language} returnHref={returnHref} slug={resolvedParams.slug} />;
}

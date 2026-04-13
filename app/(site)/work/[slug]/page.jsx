import { notFound } from "next/navigation";

import { getServerLanguage } from "../../../../src/site/i18n/server";
import {
  getAllWorkSlugs,
  getWorkBySlug,
} from "../../../../src/site/lib/get-work-by-slug";
import { getReturnPath } from "../../../../src/site/lib/get-return-path";
import WorkDetailPage from "../../../../src/site/pages/WorkDetailPage";

export function generateStaticParams() {
  return getAllWorkSlugs().map((slug) => ({ slug }));
}

export default async function WorkDetailRoutePage({ params, searchParams }) {
  const language = await getServerLanguage();
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const work = getWorkBySlug(resolvedParams.slug);

  if (!work) {
    notFound();
  }

  const returnHref = getReturnPath(resolvedSearchParams?.from, "/work");

  return (
    <WorkDetailPage
      language={language}
      returnHref={returnHref}
      slug={resolvedParams.slug}
    />
  );
}

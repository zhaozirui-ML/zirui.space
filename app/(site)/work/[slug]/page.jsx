import { notFound } from "next/navigation";

import {
  getAllWorkSlugs,
  getWorkBySlug,
} from "../../../../src/site/lib/get-work-by-slug";
import { getReturnPath } from "../../../../src/site/lib/get-return-path";
import StructuredData from "../../../../src/site/components/StructuredData";
import {
  getPageMetadata,
  workIndexDictionary,
} from "../../../../src/site/i18n/dictionary";
import { getLocalizedValue } from "../../../../src/site/i18n/get-localized-value";
import { getServerLanguage } from "../../../../src/site/i18n/server";
import {
  getBreadcrumbStructuredData,
  getCreativeWorkStructuredData,
} from "../../../../src/site/lib/structured-data";
import WorkDetailPage from "../../../../src/site/pages/WorkDetailPage";

export function generateStaticParams() {
  return getAllWorkSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const work = getWorkBySlug(resolvedParams.slug);
  const language = await getServerLanguage();

  if (!work) {
    return {};
  }

  return getPageMetadata({
    description: work.detailSummary ?? work.summary,
    language,
    pathname: `/work/${resolvedParams.slug}`,
    title: work.title,
  });
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
  const title = getLocalizedValue(work.title, language);
  const breadcrumbData = getBreadcrumbStructuredData({
    items: [
      {
        name: getLocalizedValue(workIndexDictionary.pageTitle, language),
        pathname: "/work",
      },
      {
        name: title,
        pathname: `/work/${resolvedParams.slug}`,
      },
    ],
    language,
  });
  const workData = getCreativeWorkStructuredData({ language, work });

  return (
    <>
      <WorkDetailPage language={language} returnHref={returnHref} slug={resolvedParams.slug} />
      <StructuredData data={breadcrumbData} />
      <StructuredData data={workData} />
    </>
  );
}

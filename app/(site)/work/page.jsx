import WorkIndexPage from "../../../src/site/pages/WorkIndexPage";
import StructuredData from "../../../src/site/components/StructuredData";
import {
  getPageMetadata,
  workIndexDictionary,
} from "../../../src/site/i18n/dictionary";
import { getLocalizedValue } from "../../../src/site/i18n/get-localized-value";
import { getServerLanguage } from "../../../src/site/i18n/server";
import { getBreadcrumbStructuredData } from "../../../src/site/lib/structured-data";

export async function generateMetadata() {
  const language = await getServerLanguage();

  return getPageMetadata({
    description: workIndexDictionary.metadataDescription,
    language,
    pathname: "/work",
    title: workIndexDictionary.pageTitle,
  });
}

export default async function WorkPage() {
  const language = await getServerLanguage();
  const breadcrumbData = getBreadcrumbStructuredData({
    items: [
      {
        name: getLocalizedValue(workIndexDictionary.pageTitle, language),
        pathname: "/work",
      },
    ],
    language,
  });

  return (
    <>
      <WorkIndexPage language={language} />
      <StructuredData data={breadcrumbData} />
    </>
  );
}

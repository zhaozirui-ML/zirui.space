import ChangelogPage from "../../../src/site/pages/ChangelogPage";
import StructuredData from "../../../src/site/components/StructuredData";
import {
  changelogPageDictionary,
  getPageMetadata,
} from "../../../src/site/i18n/dictionary";
import { getLocalizedValue } from "../../../src/site/i18n/get-localized-value";
import { getServerLanguage } from "../../../src/site/i18n/server";
import { getBreadcrumbStructuredData } from "../../../src/site/lib/structured-data";

export async function generateMetadata() {
  const language = await getServerLanguage();

  return getPageMetadata({
    description: changelogPageDictionary.metadataDescription,
    language,
    pathname: "/changelog",
    title: changelogPageDictionary.pageTitle,
  });
}

export default async function ChangelogRoutePage() {
  const language = await getServerLanguage();
  const breadcrumbData = getBreadcrumbStructuredData({
    items: [
      {
        name: getLocalizedValue(changelogPageDictionary.pageTitle, language),
        pathname: "/changelog",
      },
    ],
    language,
  });

  return (
    <>
      <ChangelogPage language={language} />
      <StructuredData data={breadcrumbData} />
    </>
  );
}

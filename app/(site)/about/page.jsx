import AboutPage from "../../../src/site/pages/AboutPage";
import StructuredData from "../../../src/site/components/StructuredData";
import {
  aboutPageDictionary,
  getPageMetadata,
} from "../../../src/site/i18n/dictionary";
import { getLocalizedValue } from "../../../src/site/i18n/get-localized-value";
import { getServerLanguage } from "../../../src/site/i18n/server";
import { getBreadcrumbStructuredData } from "../../../src/site/lib/structured-data";

export async function generateMetadata() {
  const language = await getServerLanguage();

  return getPageMetadata({
    description: aboutPageDictionary.metadataDescription,
    language,
    pathname: "/about",
    title: aboutPageDictionary.pageTitle,
  });
}

export default async function AboutRoutePage() {
  const language = await getServerLanguage();
  const breadcrumbData = getBreadcrumbStructuredData({
    items: [
      {
        name: getLocalizedValue(aboutPageDictionary.pageTitle, language),
        pathname: "/about",
      },
    ],
    language,
  });

  return (
    <>
      <AboutPage language={language} />
      <StructuredData data={breadcrumbData} />
    </>
  );
}

import BlogPage from "../../../src/site/pages/BlogPage";
import StructuredData from "../../../src/site/components/StructuredData";
import {
  blogIndexDictionary,
  getPageMetadata,
} from "../../../src/site/i18n/dictionary";
import { getLocalizedValue } from "../../../src/site/i18n/get-localized-value";
import { getServerLanguage } from "../../../src/site/i18n/server";
import { getBreadcrumbStructuredData } from "../../../src/site/lib/structured-data";

export async function generateMetadata() {
  const language = await getServerLanguage();

  return getPageMetadata({
    description: blogIndexDictionary.metadataDescription,
    language,
    pathname: "/blog",
    title: blogIndexDictionary.metadataTitle,
  });
}

export default async function BlogRoutePage() {
  const language = await getServerLanguage();
  const breadcrumbData = getBreadcrumbStructuredData({
    items: [
      {
        name: getLocalizedValue(blogIndexDictionary.metadataTitle, language),
        pathname: "/blog",
      },
    ],
    language,
  });

  return (
    <>
      <BlogPage language={language} />
      <StructuredData data={breadcrumbData} />
    </>
  );
}

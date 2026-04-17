import BlogPage from "../../../src/site/pages/BlogPage";
import {
  blogIndexDictionary,
  getPageMetadata,
} from "../../../src/site/i18n/dictionary";
import { getServerLanguage } from "../../../src/site/i18n/server";

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

  return <BlogPage language={language} />;
}

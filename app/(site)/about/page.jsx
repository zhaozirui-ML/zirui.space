import AboutPage from "../../../src/site/pages/AboutPage";
import {
  aboutPageDictionary,
  getPageMetadata,
} from "../../../src/site/i18n/dictionary";
import { getServerLanguage } from "../../../src/site/i18n/server";

export async function generateMetadata() {
  const language = await getServerLanguage();

  return getPageMetadata({
    description: aboutPageDictionary.metadataDescription,
    language,
    title: aboutPageDictionary.pageTitle,
  });
}

export default async function AboutRoutePage() {
  const language = await getServerLanguage();

  return <AboutPage language={language} />;
}

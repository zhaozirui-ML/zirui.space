import WorkIndexPage from "../../../src/site/pages/WorkIndexPage";
import {
  getPageMetadata,
  workIndexDictionary,
} from "../../../src/site/i18n/dictionary";
import { getServerLanguage } from "../../../src/site/i18n/server";

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

  return <WorkIndexPage language={language} />;
}

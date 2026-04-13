import WorkIndexPage from "../../../src/site/pages/WorkIndexPage";
import { getServerLanguage } from "../../../src/site/i18n/server";

export default async function WorkPage() {
  const language = await getServerLanguage();

  return <WorkIndexPage language={language} />;
}

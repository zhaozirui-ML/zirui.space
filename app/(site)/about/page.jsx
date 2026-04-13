import { getServerLanguage } from "../../../src/site/i18n/server";
import AboutPage from "../../../src/site/pages/AboutPage";

export default async function AboutRoutePage() {
  const language = await getServerLanguage();

  return <AboutPage language={language} />;
}

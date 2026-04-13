import SiteLayout from "../src/site/components/SiteLayout";
import { getServerLanguage } from "../src/site/i18n/server";
import HomePage from "../src/site/pages/HomePage";

export default async function Page() {
  const language = await getServerLanguage();

  return (
    <SiteLayout>
      <HomePage language={language} />
    </SiteLayout>
  );
}

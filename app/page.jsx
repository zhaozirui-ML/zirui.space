import SiteLayout from "../src/site/components/SiteLayout";
import HomePage from "../src/site/pages/HomePage";
import { getServerLanguage } from "../src/site/i18n/server";

export default async function Page() {
  const initialLanguage = await getServerLanguage();

  return (
    <SiteLayout initialLanguage={initialLanguage}>
      <HomePage language={initialLanguage} />
    </SiteLayout>
  );
}

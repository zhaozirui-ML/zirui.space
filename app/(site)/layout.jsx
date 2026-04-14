import SiteLayout from "../../src/site/components/SiteLayout";
import { getServerLanguage } from "../../src/site/i18n/server";

export default async function SiteRouteLayout({ children }) {
  const initialLanguage = await getServerLanguage();

  return (
    <SiteLayout initialLanguage={initialLanguage}>
      {children}
    </SiteLayout>
  );
}

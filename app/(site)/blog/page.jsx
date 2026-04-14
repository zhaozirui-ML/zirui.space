import BlogPage from "../../../src/site/pages/BlogPage";
import { getServerLanguage } from "../../../src/site/i18n/server";

export default async function BlogRoutePage() {
  const language = await getServerLanguage();

  return <BlogPage language={language} />;
}

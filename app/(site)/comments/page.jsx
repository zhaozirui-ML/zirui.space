import CommentsPageClient from "../../../src/site/components/comments/CommentsPageClient";
import { getServerLanguage } from "../../../src/site/i18n/server";

export const metadata = {
  title: "Portfolio feedback",
};
export const dynamic = "force-dynamic";

export default async function CommentsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const language = await getServerLanguage();
  const access = resolvedSearchParams?.access?.trim() || "";

  return (
    <CommentsPageClient initialAccess={access} language={language} />
  );
}

import { notFound } from "next/navigation";

import VisitorStatsAccessBootstrap from "../../../src/site/components/VisitorStatsAccessBootstrap";
import VisitorStatsPage from "../../../src/site/pages/VisitorStatsPage";
import { getPageMetadata } from "../../../src/site/i18n/dictionary";
import { getServerLanguage } from "../../../src/site/i18n/server";
import {
  VISITOR_STATS_ACCESS_PARAM,
  getVisitorAnalyticsConfig,
  getVisitorAnalyticsSummary,
} from "../../../src/site/lib/visitor-analytics";

const visitorStatsDictionary = {
  metadataDescription: {
    zh: "仅站点所有者查看的访客传播反馈统计页。",
    en: "Private visitor analytics dashboard for the site owner.",
  },
  pageTitle: {
    zh: "访客统计",
    en: "Visitor Stats",
  },
};

export async function generateMetadata() {
  const language = await getServerLanguage();

  return {
    ...getPageMetadata({
      description: visitorStatsDictionary.metadataDescription,
      language,
      pathname: "/visitor-stats",
      title: visitorStatsDictionary.pageTitle,
    }),
    robots: {
      follow: false,
      index: false,
    },
  };
}

function getAccessParamValue(searchParams) {
  if (!searchParams || typeof searchParams !== "object") {
    return "";
  }

  const rawValue = searchParams[VISITOR_STATS_ACCESS_PARAM];

  if (typeof rawValue === "string") {
    return rawValue;
  }

  if (Array.isArray(rawValue) && typeof rawValue[0] === "string") {
    return rawValue[0];
  }

  return "";
}

export default async function VisitorStatsRoutePage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const providedAccessKey = getAccessParamValue(resolvedSearchParams);
  const config = getVisitorAnalyticsConfig();
  const hasConfiguredAccessKey = config.accessKey.length > 0;
  const isDevelopment = process.env.NODE_ENV !== "production";

  if (!isDevelopment && hasConfiguredAccessKey && providedAccessKey !== config.accessKey) {
    notFound();
  }

  if (!hasConfiguredAccessKey && !isDevelopment) {
    notFound();
  }

  const summary = await getVisitorAnalyticsSummary();

  return (
    <>
      <VisitorStatsAccessBootstrap accessKey={providedAccessKey} />
      <VisitorStatsPage summary={summary} />
    </>
  );
}

import { getSiteUrl } from "./get-site-url";

export const VISITOR_ID_STORAGE_KEY = "portfolio_visitor_id";
export const VISITOR_STATS_ACCESS_PARAM = "access";
export const VISITOR_ANALYTICS_TIME_ZONE = "Asia/Shanghai";

const GLOBAL_SITE_STATS_KEY = "global";
const EMPTY_BREAKDOWN = Object.freeze([]);

/**
 * @typedef {{
 *   count: number,
 *   key: string,
 *   label: string,
 * }} VisitorBreakdownItem
 */

/**
 * @typedef {{
 *   enabled: boolean,
 *   landingBreakdown: VisitorBreakdownItem[],
 *   lastUpdatedAt: string | null,
 *   referrerBreakdown: VisitorBreakdownItem[],
 *   todayUniqueVisitors: number,
 *   totalUniqueVisitors: number,
 * }} VisitorAnalyticsSummary
 */

function normalizeSupabaseUrl(rawValue) {
  if (typeof rawValue !== "string" || rawValue.trim().length === 0) {
    return "";
  }

  return rawValue.trim().replace(/\/+$/, "");
}

function buildSupabaseHeaders(serviceRoleKey, additionalHeaders = {}) {
  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
    ...additionalHeaders,
  };
}

function safeJsonParse(rawText) {
  if (typeof rawText !== "string" || rawText.length === 0) {
    return null;
  }

  try {
    return JSON.parse(rawText);
  } catch {
    return null;
  }
}

function incrementBreakdown(map, rawKey, rawLabel = rawKey) {
  const key = typeof rawKey === "string" && rawKey.trim().length > 0
    ? rawKey.trim()
    : "unknown";
  const label = typeof rawLabel === "string" && rawLabel.trim().length > 0
    ? rawLabel.trim()
    : key;
  const previous = map.get(key);

  map.set(key, {
    count: previous ? previous.count + 1 : 1,
    key,
    label,
  });
}

function sortBreakdown(map) {
  return Array.from(map.values()).sort((left, right) => {
    if (right.count !== left.count) {
      return right.count - left.count;
    }

    return left.label.localeCompare(right.label, "en");
  });
}

function formatPathLabel(pathname) {
  if (pathname === "/") {
    return "/";
  }

  return pathname;
}

function isSameSiteReferrer(referrerHostname, siteHostname) {
  return referrerHostname === siteHostname || referrerHostname.endsWith(`.${siteHostname}`);
}

function normalizeReferrerHostname(referrer) {
  if (typeof referrer !== "string" || referrer.trim().length === 0) {
    return null;
  }

  try {
    return new URL(referrer).hostname.toLowerCase();
  } catch {
    return null;
  }
}

function matchReferrerSource(hostname) {
  if (!hostname) {
    return "direct";
  }

  if (hostname.includes("linkedin.com")) {
    return "linkedin";
  }

  if (hostname === "x.com" || hostname.endsWith(".x.com") || hostname.includes("twitter.com")) {
    return "x";
  }

  if (hostname.includes("instagram.com")) {
    return "instagram";
  }

  if (hostname.includes("github.com")) {
    return "github";
  }

  if (hostname.includes("google.")) {
    return "google";
  }

  if (hostname.includes("behance.net")) {
    return "behance";
  }

  if (hostname.includes("dribbble.com")) {
    return "dribbble";
  }

  if (hostname.includes("xiaohongshu.com")) {
    return "xiaohongshu";
  }

  if (hostname.includes("wechat.com") || hostname.includes("weixin.qq.com")) {
    return "wechat";
  }

  return "external";
}

function getReferrerLabel(source) {
  switch (source) {
    case "behance":
      return "Behance";
    case "direct":
      return "Direct";
    case "dribbble":
      return "Dribbble";
    case "external":
      return "External";
    case "github":
      return "GitHub";
    case "google":
      return "Google";
    case "instagram":
      return "Instagram";
    case "internal":
      return "Internal";
    case "linkedin":
      return "LinkedIn";
    case "wechat":
      return "WeChat";
    case "x":
      return "X";
    case "xiaohongshu":
      return "Xiaohongshu";
    default:
      return "Unknown";
  }
}

function getTodayToken() {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: VISITOR_ANALYTICS_TIME_ZONE,
    year: "numeric",
  });

  return formatter.format(new Date());
}

function getDateToken(rawDate) {
  if (typeof rawDate !== "string" || rawDate.trim().length === 0) {
    return null;
  }

  const date = new Date(rawDate);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const formatter = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: VISITOR_ANALYTICS_TIME_ZONE,
    year: "numeric",
  });

  return formatter.format(date);
}

/**
 * 统一把任意输入压成站内 pathname，避免把 query/hash 直接存进统计数据。
 *
 * @param {unknown} rawPathname
 * @returns {string}
 */
export function normalizeLandingPath(rawPathname) {
  if (typeof rawPathname !== "string" || rawPathname.trim().length === 0) {
    return "/";
  }

  const trimmedPathname = rawPathname.trim();

  if (/^https?:\/\//.test(trimmedPathname)) {
    try {
      return normalizeLandingPath(new URL(trimmedPathname).pathname);
    } catch {
      return "/";
    }
  }

  const withoutHash = trimmedPathname.split("#")[0] || "/";
  const withoutQuery = withoutHash.split("?")[0] || "/";

  if (withoutQuery === "/") {
    return "/";
  }

  return withoutQuery.startsWith("/") ? withoutQuery : `/${withoutQuery}`;
}

/**
 * @param {unknown} rawReferrer
 * @returns {string}
 */
export function normalizeReferrerSource(rawReferrer) {
  if (typeof rawReferrer !== "string" || rawReferrer.trim().length === 0) {
    return "direct";
  }

  const referrerHostname = normalizeReferrerHostname(rawReferrer);

  if (!referrerHostname) {
    return "unknown";
  }

  try {
    const siteHostname = new URL(getSiteUrl()).hostname.toLowerCase();

    if (isSameSiteReferrer(referrerHostname, siteHostname)) {
      return "internal";
    }
  } catch {
    // 站点 URL 解析失败时，退回常规来源分类，不阻塞统计流程。
  }

  return matchReferrerSource(referrerHostname);
}

/**
 * @returns {{
 *   accessKey: string,
 *   enabled: boolean,
 *   serviceRoleKey: string,
 *   supabaseUrl: string,
 * }}
 */
export function getVisitorAnalyticsConfig() {
  const supabaseUrl = normalizeSupabaseUrl(
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  );
  const serviceRoleKey = typeof process.env.SUPABASE_SERVICE_ROLE_KEY === "string"
    ? process.env.SUPABASE_SERVICE_ROLE_KEY.trim()
    : "";
  const accessKey = typeof process.env.VISITOR_STATS_ACCESS_KEY === "string"
    ? process.env.VISITOR_STATS_ACCESS_KEY.trim()
    : "";

  return {
    accessKey,
    enabled: Boolean(supabaseUrl && serviceRoleKey),
    serviceRoleKey,
    supabaseUrl,
  };
}

/**
 * @returns {VisitorAnalyticsSummary}
 */
export function createEmptyVisitorAnalyticsSummary() {
  return {
    enabled: false,
    landingBreakdown: EMPTY_BREAKDOWN.slice(),
    lastUpdatedAt: null,
    referrerBreakdown: EMPTY_BREAKDOWN.slice(),
    todayUniqueVisitors: 0,
    totalUniqueVisitors: 0,
  };
}

async function requestSupabase(pathname, options = {}) {
  const { enabled, serviceRoleKey, supabaseUrl } = getVisitorAnalyticsConfig();

  if (!enabled) {
    throw new Error("Visitor analytics is not configured.");
  }

  const response = await fetch(`${supabaseUrl}${pathname}`, {
    ...options,
    headers: buildSupabaseHeaders(serviceRoleKey, options.headers),
  });

  const rawText = await response.text();
  const parsedBody = safeJsonParse(rawText);

  if (!response.ok) {
    const errorMessage =
      typeof parsedBody?.message === "string"
        ? parsedBody.message
        : `Supabase request failed with status ${response.status}.`;

    throw new Error(errorMessage);
  }

  return parsedBody;
}

/**
 * @param {Array<{
 *   first_seen_at?: string | null,
 *   landing_path?: string | null,
 *   referrer_source?: string | null,
 * }>} rows
 * @param {number | null} totalFromStats
 * @returns {VisitorAnalyticsSummary}
 */
export function buildVisitorAnalyticsSummary(rows, totalFromStats) {
  const referrerBreakdownMap = new Map();
  const landingBreakdownMap = new Map();
  const todayToken = getTodayToken();
  const normalizedRows = Array.isArray(rows) ? rows : [];
  let todayUniqueVisitors = 0;

  normalizedRows.forEach((row) => {
    const landingPath = normalizeLandingPath(row?.landing_path);
    const referrerSource =
      typeof row?.referrer_source === "string" && row.referrer_source.trim().length > 0
        ? row.referrer_source.trim()
        : "unknown";

    incrementBreakdown(landingBreakdownMap, landingPath, formatPathLabel(landingPath));
    incrementBreakdown(referrerBreakdownMap, referrerSource, getReferrerLabel(referrerSource));

    if (getDateToken(row?.first_seen_at ?? null) === todayToken) {
      todayUniqueVisitors += 1;
    }
  });

  return {
    enabled: true,
    landingBreakdown: sortBreakdown(landingBreakdownMap),
    lastUpdatedAt: new Date().toISOString(),
    referrerBreakdown: sortBreakdown(referrerBreakdownMap),
    todayUniqueVisitors,
    totalUniqueVisitors:
      typeof totalFromStats === "number" && Number.isFinite(totalFromStats)
        ? totalFromStats
        : normalizedRows.length,
  };
}

export async function getVisitorAnalyticsSummary() {
  const { enabled } = getVisitorAnalyticsConfig();

  if (!enabled) {
    return createEmptyVisitorAnalyticsSummary();
  }

  const [siteStatsRows, visitorRows] = await Promise.all([
    requestSupabase(
      `/rest/v1/site_stats?select=total_unique_visitors&key=eq.${GLOBAL_SITE_STATS_KEY}&limit=1`
    ),
    requestSupabase(
      "/rest/v1/visitors?select=first_seen_at,landing_path,referrer_source&order=first_seen_at.desc"
    ),
  ]);
  const totalFromStats =
    Array.isArray(siteStatsRows) &&
    siteStatsRows[0] &&
    typeof siteStatsRows[0].total_unique_visitors === "number"
      ? siteStatsRows[0].total_unique_visitors
      : null;

  return buildVisitorAnalyticsSummary(visitorRows, totalFromStats);
}

/**
 * @param {{
 *   pathname: unknown,
 *   referrer: unknown,
 *   userAgentHash?: string | null,
 *   visitorId: unknown,
 * }} options
 */
export async function registerVisitor(options) {
  const { enabled } = getVisitorAnalyticsConfig();

  if (!enabled) {
    return {
      ...createEmptyVisitorAnalyticsSummary(),
      isFirstVisit: false,
      landingPath: normalizeLandingPath(options.pathname),
      referrerSource: normalizeReferrerSource(options.referrer),
    };
  }

  const visitorId =
    typeof options.visitorId === "string" ? options.visitorId.trim() : "";

  if (visitorId.length === 0) {
    throw new Error("visitorId is required.");
  }

  const landingPath = normalizeLandingPath(options.pathname);
  const referrerSource = normalizeReferrerSource(options.referrer);
  const userAgentHash =
    typeof options.userAgentHash === "string" && options.userAgentHash.trim().length > 0
      ? options.userAgentHash.trim()
      : null;
  const insertedRows = await requestSupabase("/rest/v1/visitors?on_conflict=visitor_id", {
    body: JSON.stringify([
      {
        landing_path: landingPath,
        referrer_source: referrerSource,
        user_agent_hash: userAgentHash,
        visitor_id: visitorId,
      },
    ]),
    headers: {
      Prefer: "resolution=ignore-duplicates, return=representation",
    },
    method: "POST",
  });
  const summary = await getVisitorAnalyticsSummary();

  return {
    ...summary,
    isFirstVisit: Array.isArray(insertedRows) && insertedRows.length > 0,
    landingPath,
    referrerSource,
  };
}

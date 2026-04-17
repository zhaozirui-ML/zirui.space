const DEFAULT_SITE_URL = "https://zirui.space";

function normalizeSiteUrl(rawValue) {
  if (typeof rawValue !== "string" || rawValue.trim().length === 0) {
    return null;
  }

  const normalizedValue = rawValue.trim().replace(/\/+$/, "");

  if (!/^https?:\/\//.test(normalizedValue)) {
    return null;
  }

  return normalizedValue;
}

export function getSiteUrl() {
  // 线上优先读环境变量，没配时回退到当前项目的正式域名。
  return (
    normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
    normalizeSiteUrl(process.env.SITE_URL) ??
    DEFAULT_SITE_URL
  );
}

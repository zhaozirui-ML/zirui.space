// 默认首次进入展示英文。
// 这里再加一层版本标记，用来让旧的中文 cookie 自动失效，但不影响之后的新切换。
export const DEFAULT_SITE_LANGUAGE = "en";
export const SITE_LANGUAGE_COOKIE_NAME = "site-language";
export const SITE_LANGUAGE_COOKIE_VERSION_NAME = "site-language-version";
export const SITE_LANGUAGE_COOKIE_VERSION = "2";
export const SITE_LANGUAGE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
export const SITE_LANGUAGE_COOKIE_PATH = "/";

/**
 * @typedef {"zh" | "en"} SiteLanguage
 */

/**
 * @param {unknown} value
 * @returns {value is SiteLanguage}
 */
export function isSiteLanguage(value) {
  return value === "zh" || value === "en";
}

/**
 * @param {unknown} value
 * @returns {SiteLanguage}
 */
export function normalizeSiteLanguage(value) {
  return isSiteLanguage(value) ? value : DEFAULT_SITE_LANGUAGE;
}

/**
 * @param {SiteLanguage} language
 * @returns {string}
 */
export function getDocumentLanguage(language) {
  return language === "en" ? "en" : "zh-CN";
}

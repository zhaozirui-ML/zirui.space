export const DEFAULT_SITE_LANGUAGE = "zh";
export const SITE_LANGUAGE_COOKIE_NAME = "site-language";
export const SITE_LANGUAGE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
export const SITE_LANGUAGE_COOKIE_PATH = "/";

/**
 * @typedef {"zh" | "en"} SiteLanguage
 */

/**
 * 这里集中定义站点支持的语言，避免后面在页面里散落硬编码判断。
 * @type {SiteLanguage[]}
 */
export const SITE_LANGUAGES = ["zh", "en"];

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

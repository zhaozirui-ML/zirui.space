/**
 * @template T
 * @typedef {{ zh: T, en: T }} LocalizedValue
 */

/**
 * 按当前语言读取双语值。
 *
 * @template T
 * @param {LocalizedValue<T>} value
 * @param {import("./config").SiteLanguage} language
 * @returns {T}
 */
export function getLocalizedValue(value, language) {
  return language === "en" ? value.en : value.zh;
}

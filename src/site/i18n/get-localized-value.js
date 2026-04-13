import { DEFAULT_SITE_LANGUAGE } from "./config";

/**
 * @template T
 * @typedef {{ zh: T, en: T }} LocalizedValue
 */

/**
 * @param {unknown} value
 * @returns {value is LocalizedValue<unknown>}
 */
export function isLocalizedValue(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  return "zh" in value && "en" in value;
}

/**
 * 统一从双语字段里取当前语言对应的值。
 * 这样后面页面组件只关心“拿值”，不用每次重复写三元判断。
 *
 * @template T
 * @param {T | LocalizedValue<T>} value
 * @param {"zh" | "en"} language
 * @returns {T}
 */
export function getLocalizedValue(value, language = DEFAULT_SITE_LANGUAGE) {
  if (isLocalizedValue(value)) {
    return /** @type {T} */ (value[language] ?? value[DEFAULT_SITE_LANGUAGE]);
  }

  return /** @type {T} */ (value);
}

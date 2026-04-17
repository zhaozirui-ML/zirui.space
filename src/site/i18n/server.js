import { cookies } from "next/headers";

import {
  DEFAULT_SITE_LANGUAGE,
  normalizeSiteLanguage,
  SITE_LANGUAGE_COOKIE_NAME,
  SITE_LANGUAGE_COOKIE_VERSION,
  SITE_LANGUAGE_COOKIE_VERSION_NAME,
} from "./config";

/**
 * 服务端首屏统一从 cookie 里读取语言。
 * 这样页面刷新、直接打开页面时，也能先拿到正确语言，不会闪一下再切换。
 *
 * @returns {Promise<import("./config").SiteLanguage>}
 */
export async function getServerLanguage() {
  const cookieStore = await cookies();
  const cookieVersion = cookieStore.get(SITE_LANGUAGE_COOKIE_VERSION_NAME)?.value;

  // 旧版本的语言 cookie 直接忽略，这样老用户不会继续被旧的中文偏好带回去。
  if (cookieVersion !== SITE_LANGUAGE_COOKIE_VERSION) {
    return DEFAULT_SITE_LANGUAGE;
  }

  return normalizeSiteLanguage(
    cookieStore.get(SITE_LANGUAGE_COOKIE_NAME)?.value ?? DEFAULT_SITE_LANGUAGE,
  );
}

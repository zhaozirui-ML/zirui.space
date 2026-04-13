import { cookies } from "next/headers";

import {
  DEFAULT_SITE_LANGUAGE,
  normalizeSiteLanguage,
  SITE_LANGUAGE_COOKIE_NAME,
} from "./config";

/**
 * 服务端首屏统一从 cookie 里读取语言。
 * 这样页面刷新、直接打开详情页时，也能先拿到正确语言，不会闪一下再切换。
 *
 * @returns {Promise<import("./config").SiteLanguage>}
 */
export async function getServerLanguage() {
  const cookieStore = await cookies();

  return normalizeSiteLanguage(
    cookieStore.get(SITE_LANGUAGE_COOKIE_NAME)?.value ?? DEFAULT_SITE_LANGUAGE,
  );
}

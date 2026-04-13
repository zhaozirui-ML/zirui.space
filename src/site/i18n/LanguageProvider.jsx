"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";

import {
  DEFAULT_SITE_LANGUAGE,
  getDocumentLanguage,
  normalizeSiteLanguage,
  SITE_LANGUAGE_COOKIE_MAX_AGE,
  SITE_LANGUAGE_COOKIE_NAME,
  SITE_LANGUAGE_COOKIE_PATH,
} from "./config";

const LanguageContext = createContext(null);

/**
 * @param {{
 *   children: import("react").ReactNode,
 *   initialLanguage: import("./config").SiteLanguage,
 * }} props
 */
export function LanguageProvider({
  children,
  initialLanguage = DEFAULT_SITE_LANGUAGE,
}) {
  const router = useRouter();
  const [language, setLanguageState] = useState(
    normalizeSiteLanguage(initialLanguage),
  );
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setLanguageState(normalizeSiteLanguage(initialLanguage));
  }, [initialLanguage]);

  useEffect(() => {
    document.documentElement.lang = getDocumentLanguage(language);
  }, [language]);

  /**
   * @param {import("./config").SiteLanguage} nextLanguage
   */
  function setLanguage(nextLanguage) {
    const normalizedLanguage = normalizeSiteLanguage(nextLanguage);

    setLanguageState(normalizedLanguage);
    document.cookie =
      `${SITE_LANGUAGE_COOKIE_NAME}=${normalizedLanguage}; ` +
      `Path=${SITE_LANGUAGE_COOKIE_PATH}; ` +
      `Max-Age=${SITE_LANGUAGE_COOKIE_MAX_AGE}; SameSite=Lax`;

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <LanguageContext.Provider value={{ isPending, language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider.");
  }

  return context;
}

"use client";

import { usePathname } from "next/navigation";

import { siteShellDictionary } from "../i18n/dictionary";
import { getLocalizedValue } from "../i18n/get-localized-value";
import { useLanguage } from "../i18n/LanguageProvider";
import SiteHeader from "./SiteHeader";
import styles from "../styles/site-shell.module.css";

const IMMERSIVE_PATHS = new Set([
  // Axzo 详情页需要让 Hero 贴顶显示，并隐藏全站导航。
  "/work/axzo-design-system",
  "/work/data-visualization-screen",
  "/work/drawing-ledger-2-0",
]);

const FULL_BLEED_PATHS = new Set([
  "/work/data-visualization-screen",
]);

export default function SiteChromeFrame({ children }) {
  const { language } = useLanguage();
  const pathname = usePathname();
  const isEnglishPlaceholderCaseStudy =
    language === "en" && IMMERSIVE_PATHS.has(pathname);
  const isImmersiveCaseStudy =
    IMMERSIVE_PATHS.has(pathname) && !isEnglishPlaceholderCaseStudy;
  const isFullBleedCaseStudy =
    FULL_BLEED_PATHS.has(pathname) && !isEnglishPlaceholderCaseStudy;
  const mainClassName = [styles.siteMain, isImmersiveCaseStudy ? styles.siteMainFlush : ""]
    .filter(Boolean)
    .join(" ");
  const shellClassName = isFullBleedCaseStudy ? styles.siteShellFullBleed : styles.siteShell;

  return (
    <>
      {isImmersiveCaseStudy ? null : <SiteHeader />}

      <main className={mainClassName}>
        <div className={shellClassName}>{children}</div>
      </main>

      <footer className={styles.siteFooter}>
        <div className={styles.siteShell}>
          <div className={styles.siteFooterInner}>
            <p className={styles.footerText}>
              {getLocalizedValue(siteShellDictionary.footerCopyright, language)}
            </p>
            <p className={styles.footerText}>zhaozirui721@gmail.com</p>
          </div>
        </div>
      </footer>
    </>
  );
}

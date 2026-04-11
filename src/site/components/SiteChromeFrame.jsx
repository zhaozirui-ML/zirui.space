"use client";

import { usePathname } from "next/navigation";

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

export default function SiteChromeFrame({ children, colorTheme, onThemeToggle }) {
  const pathname = usePathname();
  const isImmersiveCaseStudy = IMMERSIVE_PATHS.has(pathname);
  const isFullBleedCaseStudy = FULL_BLEED_PATHS.has(pathname);
  const mainClassName = [styles.siteMain, isImmersiveCaseStudy ? styles.siteMainFlush : ""]
    .filter(Boolean)
    .join(" ");
  const shellClassName = isFullBleedCaseStudy ? styles.siteShellFullBleed : styles.siteShell;

  return (
    <>
      {isImmersiveCaseStudy ? null : (
        <SiteHeader colorTheme={colorTheme} onThemeToggle={onThemeToggle} />
      )}

      <main className={mainClassName}>
        <div className={shellClassName}>{children}</div>
      </main>
    </>
  );
}

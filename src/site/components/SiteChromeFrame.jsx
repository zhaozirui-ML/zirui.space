"use client";

import { usePathname } from "next/navigation";

import SiteHeader from "./SiteHeader";
import styles from "../styles/site-shell.module.css";

const IMMERSIVE_PATHS = new Set([
  "/work/data-visualization-screen",
]);

export default function SiteChromeFrame({ children }) {
  const pathname = usePathname();
  const isImmersiveCaseStudy = IMMERSIVE_PATHS.has(pathname);
  const mainClassName = [
    styles.siteMain,
    isImmersiveCaseStudy ? styles.siteMainFlush : "",
  ]
    .filter(Boolean)
    .join(" ");
  const shellClassName = isImmersiveCaseStudy
    ? styles.siteShellFullBleed
    : styles.siteShell;

  return (
    <>
      {isImmersiveCaseStudy ? null : <SiteHeader />}

      <main className={mainClassName}>
        <div className={shellClassName}>{children}</div>
      </main>

      <footer className={styles.siteFooter}>
        <div className={styles.siteShell}>
          <div className={styles.siteFooterInner}>
            <p className={styles.footerText}>© 2026 Zirui Zhao All rights reserved.</p>
            <p className={styles.footerText}>zhaozirui721@gmail.com</p>
          </div>
        </div>
      </footer>
    </>
  );
}

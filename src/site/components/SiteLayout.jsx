"use client";

import { usePathname } from "next/navigation";

import { portfolioCssVariables } from "../../../design-system/tokens";

import { inter, ivyPresto, satoshi } from "../fonts/site-fonts";
import SiteHeader from "./SiteHeader";
import styles from "../styles/site-shell.module.css";

export default function SiteLayout({ children }) {
  const pathname = usePathname();
  const themeStyle = /** @type {any} */ (portfolioCssVariables);
  const isImmersiveCaseStudy = pathname === "/work/drawing-ledger-2-0";
  const isModuleHome = ["/", "/about", "/blog", "/work"].includes(pathname);
  const rootClassName = [
    styles.siteRoot,
    isModuleHome ? styles.siteRootModuleHome : "",
    inter.variable,
    satoshi.variable,
    ivyPresto.variable,
  ]
    .filter(Boolean)
    .join(" ");
  const mainClassName = [
    styles.siteMain,
    isImmersiveCaseStudy ? styles.siteMainImmersive : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClassName} style={themeStyle}>
      {isImmersiveCaseStudy ? null : <SiteHeader />}

      <main className={mainClassName}>
        <div className={styles.siteShell}>{children}</div>
      </main>

      <footer className={styles.siteFooter}>
        <div className={styles.siteShell}>
          <div className={styles.siteFooterInner}>
            <p className={styles.footerText}>© 2026 Zirui Zhao All rights reserved.</p>
            <p className={styles.footerText}>zhaozirui721@gmail.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

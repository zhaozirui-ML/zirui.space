import { portfolioCssVariables } from "../../../design-system/tokens";

import { ivyPresto, satoshi } from "../fonts/site-fonts";
import SiteHeader from "./SiteHeader";
import styles from "../styles/site-shell.module.css";

export default function SiteLayout({ children }) {
  const themeStyle = /** @type {any} */ (portfolioCssVariables);
  const rootClassName = [
    styles.siteRoot,
    satoshi.variable,
    ivyPresto.variable,
  ].join(" ");

  return (
    <div className={rootClassName} style={themeStyle}>
      <SiteHeader />

      <main className={styles.siteMain}>
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

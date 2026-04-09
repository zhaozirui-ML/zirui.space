import { portfolioCssVariables } from "../../../design-system/tokens";

import { ivyPresto, satoshi } from "../fonts/site-fonts";
import SiteChromeFrame from "./SiteChromeFrame";
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
      <SiteChromeFrame>{children}</SiteChromeFrame>
    </div>
  );
}

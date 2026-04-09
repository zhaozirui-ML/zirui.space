 "use client";

import { usePathname } from "next/navigation";

import { portfolioCssVariables } from "../../../design-system/tokens";

import { inter, ivyPresto, satoshi } from "../fonts/site-fonts";
import SiteChromeFrame from "./SiteChromeFrame";
import styles from "../styles/site-shell.module.css";

export default function SiteLayout({ children }) {
  const pathname = usePathname();
  const themeStyle = /** @type {any} */ (portfolioCssVariables);
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

  return (
    <div className={rootClassName} style={themeStyle}>
      <SiteChromeFrame>{children}</SiteChromeFrame>
    </div>
  );
}

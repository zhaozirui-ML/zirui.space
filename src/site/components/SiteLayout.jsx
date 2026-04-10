 "use client";

import { usePathname } from "next/navigation";

import {
  portfolioThemeCssVariables,
} from "../../../design-system/tokens";
import useMediaQuery from "../../../design-system/hooks/useMediaQuery";

import { inter, ivyPresto, satoshi } from "../fonts/site-fonts";
import SiteChromeFrame from "./SiteChromeFrame";
import styles from "../styles/site-shell.module.css";

export default function SiteLayout({ children }) {
  const pathname = usePathname();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const colorTheme = prefersDarkMode ? "dark" : "light";
  const themeStyle = /** @type {any} */ ({
    ...portfolioThemeCssVariables[colorTheme],
    colorScheme: colorTheme,
  });
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
    <div
      className={rootClassName}
      data-color-theme={colorTheme}
      style={themeStyle}
    >
      <SiteChromeFrame>{children}</SiteChromeFrame>
    </div>
  );
}

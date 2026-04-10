 "use client";

import { usePathname } from "next/navigation";

import {
  portfolioThemeCssVariables,
} from "../../../design-system/tokens";
import useMediaQuery from "../../../design-system/hooks/useMediaQuery";

import { inter, ivyPresto, satoshi } from "../fonts/site-fonts";
import { isModuleHomePath } from "../lib/is-module-home-path";
import SiteChromeFrame from "./SiteChromeFrame";
import SiteSunnyBackground from "./SiteSunnyBackground";
import styles from "../styles/site-shell.module.css";

export default function SiteLayout({ children }) {
  const pathname = usePathname();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const colorTheme = prefersDarkMode ? "dark" : "light";
  const themeStyle = /** @type {any} */ ({
    ...portfolioThemeCssVariables[colorTheme],
    colorScheme: colorTheme,
  });
  const isModuleHome = isModuleHomePath(pathname);
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
      {/* 模块首页统一从壳层挂一层 Sunny Mode，避免首页自身和壳层重复渲染 video。 */}
      {isModuleHome ? <SiteSunnyBackground /> : null}
      <SiteChromeFrame>{children}</SiteChromeFrame>
    </div>
  );
}

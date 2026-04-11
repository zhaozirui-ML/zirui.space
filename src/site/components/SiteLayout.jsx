"use client";

import { useSyncExternalStore } from "react";
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

function subscribeThemePreference(onStoreChange) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleStorageChange = (event) => {
    if (
      event instanceof StorageEvent &&
      event.key !== null &&
      event.key !== "portfolio-color-theme"
    ) {
      return;
    }

    onStoreChange();
  };

  window.addEventListener("storage", handleStorageChange);
  window.addEventListener("portfolio-theme-change", onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
    window.removeEventListener("portfolio-theme-change", onStoreChange);
  };
}

function getThemePreferenceSnapshot() {
  if (typeof window === "undefined") {
    return null;
  }

  const savedThemePreference = window.localStorage.getItem("portfolio-color-theme");

  return savedThemePreference === "light" || savedThemePreference === "dark"
    ? savedThemePreference
    : null;
}

export default function SiteLayout({ children }) {
  const pathname = usePathname();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const themePreference = useSyncExternalStore(
    subscribeThemePreference,
    getThemePreferenceSnapshot,
    () => null,
  );
  const colorTheme = themePreference ?? (prefersDarkMode ? "dark" : "light");
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

  const handleThemeToggle = () => {
    const nextTheme = colorTheme === "dark" ? "light" : "dark";
    window.localStorage.setItem("portfolio-color-theme", nextTheme);
    window.dispatchEvent(new Event("portfolio-theme-change"));
  };

  return (
    <div
      className={rootClassName}
      data-color-theme={colorTheme}
      style={themeStyle}
    >
      {/* 模块首页统一从壳层挂一层 Sunny Mode，避免首页自身和壳层重复渲染 video。 */}
      {isModuleHome ? <SiteSunnyBackground /> : null}
      <SiteChromeFrame
        colorTheme={colorTheme}
        onThemeToggle={handleThemeToggle}
      >
        {children}
      </SiteChromeFrame>
    </div>
  );
}

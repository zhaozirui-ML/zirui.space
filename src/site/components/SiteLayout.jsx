"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

import {
  portfolioThemeCssVariables,
} from "../../../design-system/tokens";
import useMediaQuery from "../../../design-system/hooks/useMediaQuery";

import { inter, ivyPresto, satoshi, fzQingKeBenYueSong } from "../fonts/site-fonts";
import { LanguageProvider, useLanguage } from "../i18n/LanguageProvider";
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

function getTitleSerifFontFamily(language) {
  // 标题展示字体按语言切换：中文模式用方正清刻本悦宋，英文模式用 Ivy Presto。
  return language === "en"
    ? 'var(--font-ivy-presto, "Times New Roman"), serif'
    : 'var(--font-fz-qingke-benyuesong), "Songti SC", "STSong", serif';
}

function SiteLayoutFrame({
  children,
  colorTheme,
  onThemeToggle,
  rootClassName,
  shouldShowSunnyBackground,
}) {
  const { language } = useLanguage();

  const themeStyle = /** @type {any} */ ({
    ...portfolioThemeCssVariables[colorTheme],
    "--portfolio-font-title-serif": getTitleSerifFontFamily(language),
    colorScheme: colorTheme,
  });

  return (
    <div
      className={rootClassName}
      data-color-theme={colorTheme}
      data-site-language={language}
      style={themeStyle}
    >
      {/* 模块首页统一从壳层挂一层 Sunny Mode，避免首页自身和壳层重复渲染 video。 */}
      {shouldShowSunnyBackground ? <SiteSunnyBackground /> : null}
      <SiteChromeFrame colorTheme={colorTheme} onThemeToggle={onThemeToggle}>
        {children}
      </SiteChromeFrame>
    </div>
  );
}

export default function SiteLayout({ children, initialLanguage }) {
  const pathname = usePathname();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const themeToggleSoundRef = useRef(null);
  const themePreference = useSyncExternalStore(
    subscribeThemePreference,
    getThemePreferenceSnapshot,
    () => null,
  );
  const colorTheme = themePreference ?? (prefersDarkMode ? "dark" : "light");
  const isModuleHome = isModuleHomePath(pathname);
  // 暗色模式不展示顶部的 Sunny Mode / dappled light 背景，只保留模块首页在浅色模式下的氛围层。
  const shouldShowSunnyBackground = isModuleHome && colorTheme !== "dark";
  const rootClassName = [
    styles.siteRoot,
    isModuleHome ? styles.siteRootModuleHome : "",
    inter.variable,
    satoshi.variable,
    ivyPresto.variable,
    fzQingKeBenYueSong.variable,
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    // 只在客户端预载音效，避免服务端渲染阶段触碰浏览器音频 API。
    const themeToggleSound = new Audio("/site/sfx/theme-toggle-select-click.wav");
    themeToggleSound.preload = "auto";
    themeToggleSoundRef.current = themeToggleSound;

    return () => {
      themeToggleSoundRef.current = null;
    };
  }, []);

  const playThemeToggleSound = () => {
    const themeToggleSound = themeToggleSoundRef.current;

    if (!themeToggleSound) {
      return;
    }

    // 音效只是附加反馈：如果浏览器阻止播放，不影响主题切换本身。
    themeToggleSound.currentTime = 0;
    themeToggleSound.volume = 0.35;
    void themeToggleSound.play().catch(() => {});
  };

  const handleThemeToggle = () => {
    playThemeToggleSound();

    const nextTheme = colorTheme === "dark" ? "light" : "dark";
    window.localStorage.setItem("portfolio-color-theme", nextTheme);
    window.dispatchEvent(new Event("portfolio-theme-change"));
  };

  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      <SiteLayoutFrame
        colorTheme={colorTheme}
        onThemeToggle={handleThemeToggle}
        rootClassName={rootClassName}
        shouldShowSunnyBackground={shouldShowSunnyBackground}
      >
        {children}
      </SiteLayoutFrame>
    </LanguageProvider>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteNavigation } from "../data/navigation";
import { siteShellDictionary } from "../i18n/dictionary";
import { getLocalizedValue } from "../i18n/get-localized-value";
import { useLanguage } from "../i18n/LanguageProvider";
import styles from "../styles/site-shell.module.css";

const brandAvatarSrc = "/site/header/header-avatar.png";
const navigationIndicatorSize = 5;

function isNavigationItemActive(pathname, href) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader({ colorTheme, onThemeToggle }) {
  const { isPending, language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const navigationRef = useRef(null);
  const itemRefs = useRef(new Map());
  const [indicatorStyle, setIndicatorStyle] = useState({
    opacity: 0,
    transform: "translate3d(0, 0, 0)",
  });

  useEffect(() => {
    const updateIndicator = () => {
      const navigationElement = navigationRef.current;

      if (!navigationElement) {
        return;
      }

      const activeItem = siteNavigation.find((item) => isNavigationItemActive(pathname, item.href));
      const activeElement = activeItem ? itemRefs.current.get(activeItem.href) : null;

      if (!activeElement) {
        setIndicatorStyle((currentStyle) =>
          currentStyle.opacity === 0
            ? currentStyle
            : { opacity: 0, transform: currentStyle.transform },
        );
        return;
      }

      const navRect = navigationElement.getBoundingClientRect();
      const activeRect = activeElement.getBoundingClientRect();
      const nextLeft =
        activeRect.left - navRect.left + activeRect.width / 2 - navigationIndicatorSize / 2;

      setIndicatorStyle({
        opacity: 1,
        transform: `translate3d(${nextLeft}px, 0, 0)`,
      });
    };

    updateIndicator();

    const navigationElement = navigationRef.current;
    const resizeObserver =
      typeof ResizeObserver === "undefined" || !navigationElement
        ? null
        : new ResizeObserver(() => {
            updateIndicator();
          });

    if (navigationElement && resizeObserver) {
      resizeObserver.observe(navigationElement);
    }

    window.addEventListener("resize", updateIndicator);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [pathname, language]);

  return (
    <header className={styles.siteHeader}>
      <div className={styles.siteHeaderFrame}>
        <div className={styles.siteHeaderInner}>
          <Link
            aria-label={getLocalizedValue(siteShellDictionary.brandHomeLabel, language)}
            className={styles.brandLink}
            href="/"
          >
            <span className={styles.brandMarkFrame}>
              <Image
                alt=""
                aria-hidden="true"
                className={styles.brandMark}
                style={{
                  inset: 0,
                  objectFit: "contain",
                  objectPosition: "center top",
                  position: "absolute",
                }}
                fill
                src={brandAvatarSrc}
              />
            </span>
          </Link>
          <div className={styles.siteHeaderControls}>
            <div className={styles.navigationGroup}>
              <nav
                aria-label={getLocalizedValue(
                  siteShellDictionary.navigationAriaLabel,
                  language,
                )}
                className={styles.navigation}
                ref={navigationRef}
              >
                {siteNavigation.map((item) => {
                  const isActive = isNavigationItemActive(pathname, item.href);
                  const linkClassName = [
                    styles.navigationLink,
                    isActive ? styles.navigationLinkActive : "",
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <div
                      className={styles.navigationItem}
                      data-active={isActive ? "true" : "false"}
                      key={item.href}
                      ref={(element) => {
                        if (element) {
                          itemRefs.current.set(item.href, element);
                          return;
                        }

                        itemRefs.current.delete(item.href);
                      }}
                    >
                      <Link
                        aria-current={isActive ? "page" : undefined}
                        className={linkClassName}
                        href={item.href}
                      >
                        {getLocalizedValue(item.label, language)}
                      </Link>
                    </div>
                  );
                })}
                <span
                  aria-hidden="true"
                  className={styles.navigationIndicator}
                  style={indicatorStyle}
                />
              </nav>
            </div>
          </div>
          <div className={styles.siteHeaderActions}>
            <button
              aria-label={getLocalizedValue(
                language === "zh"
                  ? siteShellDictionary.languageSwitchToEnglishLabel
                  : siteShellDictionary.languageSwitchToChineseLabel,
                language,
              )}
              aria-pressed={language === "en"}
              className={styles.languageAction}
              data-language={language}
              disabled={isPending}
              onClick={() => setLanguage(language === "zh" ? "en" : "zh")}
              type="button"
            >
              <span aria-hidden="true" className={styles.languageActionIcon}>
                <span className={styles.languageActionGlyph} data-language="zh">
                  中
                </span>
                <span className={styles.languageActionGlyph} data-language="en">
                  EN
                </span>
              </span>
            </button>
            <button
              aria-label={colorTheme === "dark" ? "切换到浅色主题" : "切换到深色主题"}
              aria-pressed={colorTheme === "dark"}
              className={styles.navigationAction}
              data-theme={colorTheme}
              onClick={onThemeToggle}
              type="button"
            >
              <span aria-hidden="true" className={styles.navigationActionIcon}>
                <span className={styles.navigationActionGlyph} data-icon="sun">
                  <svg
                    fill="none"
                    height="16"
                    viewBox="0 0 16 16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 2.16699V3.28238M8 12.7182V13.8337M4.58359 4.58345L5.37226 5.37212M10.6277 10.6278L11.4164 11.4165M2.1665 8.00033H3.28189M12.7181 8.00033H13.8335M4.58359 11.4165L5.37226 10.6278M10.6277 5.37212L11.4164 4.58345"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.2"
                    />
                    <circle
                      cx="8.00001"
                      cy="8.00033"
                      r="2.41667"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                  </svg>
                </span>
                <span className={styles.navigationActionGlyph} data-icon="moon">
                  <svg
                    fill="none"
                    height="16"
                    viewBox="0 0 16 16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.9023 2.2334C10.3933 2.05626 9.84595 1.95996 9.27591 1.95996C6.57857 1.95996 4.39111 4.14742 4.39111 6.84476C4.39111 9.5421 6.57857 11.7296 9.27591 11.7296C11.6628 11.7296 13.6498 10.0172 14.0766 7.75282C13.5842 7.99573 13.0301 8.13189 12.4443 8.13189C10.3846 8.13189 8.71482 6.46207 8.71482 4.40233C8.71482 3.54985 9.00075 2.76416 9.4822 2.13514C9.93788 2.14248 10.3857 2.17531 10.9023 2.2334Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M11.9321 3.07129V4.24726M11.3441 3.65928H12.5201"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="1.2"
                    />
                  </svg>
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

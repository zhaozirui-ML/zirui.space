"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { siteColophonItems, siteMeta } from "../data/site-meta";
import { siteShellDictionary } from "../i18n/dictionary";
import { getLocalizedValue } from "../i18n/get-localized-value";
import { useLanguage } from "../i18n/LanguageProvider";
import styles from "../styles/site-shell.module.css";

function renderColophonParts(parts, language) {
  return parts.map((part, index) => {
    const resolvedText = getLocalizedValue(part.text, language);
    const key = `${resolvedText}-${index}`;

    if (part.href) {
      return (
        <a
          className={styles.siteFooterPopoverLink}
          href={part.href}
          key={key}
          rel="noreferrer"
          target="_blank"
        >
          {resolvedText}
        </a>
      );
    }

    if (part.accent) {
      return (
        <span className={styles.siteFooterPopoverAccent} key={key}>
          {resolvedText}
        </span>
      );
    }

    return <span key={key}>{resolvedText}</span>;
  });
}

function SiteFooterColophon() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const triggerId = useId();
  const popoverId = useId();
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className={styles.siteFooterPopoverGroup} ref={containerRef}>
      <button
        aria-controls={popoverId}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={styles.siteFooterAction}
        id={triggerId}
        onClick={() => {
          setIsOpen((currentValue) => !currentValue);
        }}
        type="button"
      >
        {getLocalizedValue(siteShellDictionary.footerColophonLabel, language)}
      </button>

      {isOpen ? (
        <div
          aria-labelledby={triggerId}
          className={styles.siteFooterPopover}
          id={popoverId}
          role="dialog"
        >
          <p className={styles.siteFooterPopoverTitle}>
            {getLocalizedValue(siteShellDictionary.footerColophonLabel, language)}
          </p>
          <ul className={styles.siteFooterPopoverList}>
            {siteColophonItems.map((item) => {
              const key = item.parts
                .map((part) => getLocalizedValue(part.text, language))
                .join("-");

              return (
                <li className={styles.siteFooterPopoverItem} key={key}>
                  <span aria-hidden="true" className={styles.siteFooterPopoverMarker} />
                  <span className={styles.siteFooterPopoverItemBody}>
                    {renderColophonParts(item.parts, language)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default function SiteFooter({ isFullBleed }) {
  const { language } = useLanguage();
  const footerInnerClassName = isFullBleed
    ? [styles.siteFooterInner, styles.siteFooterInnerFullBleed].join(" ")
    : styles.siteFooterInner;

  return (
    <footer className={styles.siteFooter}>
      <div className={footerInnerClassName}>
        <div className={styles.siteFooterMeta}>
          <span className={styles.siteFooterCopy}>© {siteMeta.currentYear} {siteMeta.owner}</span>
          <span aria-hidden="true" className={styles.siteFooterDivider}>
            ·
          </span>
          <span className={styles.siteFooterVersion}>{siteMeta.version}</span>
        </div>

        <div className={styles.siteFooterActions}>
          <Link className={styles.siteFooterAction} href={siteMeta.changelogHref}>
            {getLocalizedValue(siteShellDictionary.footerChangeLogLabel, language)}
          </Link>
          <span aria-hidden="true" className={styles.siteFooterDivider}>
            ·
          </span>
          <SiteFooterColophon />
        </div>
      </div>
    </footer>
  );
}

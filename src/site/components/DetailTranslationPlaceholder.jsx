import Link from "next/link";

import { getLocalizedValue } from "../i18n/get-localized-value";
import styles from "../styles/site-shell.module.css";

/**
 * 英文详情正文还没有补齐时，用统一占位页避免英文模式混入中文长文。
 *
 * @param {{
 *   backHref: string,
 *   backLabel: import("../i18n/get-localized-value").LocalizedValue<string>,
 *   description: import("../i18n/get-localized-value").LocalizedValue<string>,
 *   eyebrow: import("../i18n/get-localized-value").LocalizedValue<string>,
 *   language: import("../i18n/config").SiteLanguage,
 *   noteItems: import("../i18n/get-localized-value").LocalizedValue<string[]>,
 *   noteTitle: import("../i18n/get-localized-value").LocalizedValue<string>,
 *   title: import("../i18n/get-localized-value").LocalizedValue<string>,
 * }} props
 */
export default function DetailTranslationPlaceholder({
  backHref,
  backLabel,
  description,
  eyebrow,
  language,
  noteItems,
  noteTitle,
  title,
}) {
  const localizedItems = getLocalizedValue(noteItems, language);

  return (
    <div className={[styles.pageStack, styles.detailPage].join(" ")}>
      <section className={styles.pageIntro}>
        <Link className={styles.backLink} href={backHref}>
          {getLocalizedValue(backLabel, language)}
        </Link>
        <p className={styles.pageEyebrow}>{getLocalizedValue(eyebrow, language)}</p>
        <h1 className={styles.pageTitle}>{getLocalizedValue(title, language)}</h1>
        <p className={styles.pageDescription}>
          {getLocalizedValue(description, language)}
        </p>
      </section>

      <section className={styles.placeholderPanel}>
        <h2 className={styles.placeholderTitle}>
          {getLocalizedValue(noteTitle, language)}
        </h2>
        <ol className={styles.placeholderList}>
          {localizedItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}

import { aboutPageDictionary } from "../i18n/dictionary";
import { getLocalizedValue } from "../i18n/get-localized-value";
import styles from "../styles/site-shell.module.css";

export default function AboutPage({ language }) {
  const placeholderItems = getLocalizedValue(aboutPageDictionary.placeholderItems, language);

  return (
    <div className={styles.pageStack}>
      <section className={styles.pageIntro}>
        <p className={styles.pageEyebrow}>
          {getLocalizedValue(aboutPageDictionary.eyebrow, language)}
        </p>
        <h1 className={styles.pageTitle}>
          {getLocalizedValue(aboutPageDictionary.pageTitle, language)}
        </h1>
        <p className={styles.pageDescription}>
          {getLocalizedValue(aboutPageDictionary.pageDescription, language)}
        </p>
      </section>

      <section className={styles.placeholderPanel}>
        <h2 className={styles.placeholderTitle}>
          {getLocalizedValue(aboutPageDictionary.placeholderTitle, language)}
        </h2>
        <ol className={styles.placeholderList}>
          {placeholderItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}

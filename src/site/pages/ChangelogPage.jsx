import shellStyles from "../styles/site-shell.module.css";
import styles from "../styles/changelog-page.module.css";
import { changelogPageDictionary } from "../i18n/dictionary";
import { getLocalizedValue } from "../i18n/get-localized-value";

export default function ChangelogPage({ language }) {
  return (
    <div className={[shellStyles.pageStack, styles.changelogPage].join(" ")}>
      <section className={[shellStyles.pageIntro, styles.pageIntro].join(" ")}>
        <p className={styles.statusLabel}>
          {getLocalizedValue(changelogPageDictionary.statusLabel, language)}
        </p>
        <h1 className={shellStyles.pageIntroHeading}>
          {getLocalizedValue(changelogPageDictionary.pageTitle, language)}
        </h1>
        <p className={styles.intro}>
          {getLocalizedValue(changelogPageDictionary.intro, language)}
        </p>
      </section>
    </div>
  );
}

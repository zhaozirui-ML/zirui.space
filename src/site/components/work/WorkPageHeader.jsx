import { workIndexDictionary } from "../../i18n/dictionary";
import { getLocalizedValue } from "../../i18n/get-localized-value";
import styles from "./work-components.module.css";

export default function WorkPageHeader({ language }) {
  return (
    <section className={styles.pageIntro}>
      <h1 className={styles.pageTitle}>
        {getLocalizedValue(workIndexDictionary.pageTitle, language)}
      </h1>
      <p className={styles.pageSubtitle}>
        {getLocalizedValue(workIndexDictionary.pageSubtitle, language)}
      </p>
    </section>
  );
}

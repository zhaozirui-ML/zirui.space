import { homeSkillHighlight, homeSkills } from "../../data/home-content";
import { homePageDictionary } from "../../i18n/dictionary";
import { getLocalizedValue } from "../../i18n/get-localized-value";
import HomeSkillsReveal from "./HomeSkillsReveal";
import styles from "../../styles/home-page.module.css";

export default function HomeSkillsSection({ language }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          {getLocalizedValue(homePageDictionary.skillsSectionTitle, language)}
        </h2>
        <p className={styles.sectionSubtitle}>
          {getLocalizedValue(homePageDictionary.skillsSectionSubtitle, language)}
        </p>
      </div>
      <HomeSkillsReveal
        fallbackImageAlt={getLocalizedValue(homeSkillHighlight.imageAlt, language)}
        fallbackImageSrc={homeSkillHighlight.imageSrc}
        language={language}
        skills={homeSkills}
      />
    </section>
  );
}

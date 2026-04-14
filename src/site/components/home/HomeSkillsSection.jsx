import { homeSkillHighlight, homeSkills } from "../../data/home-content";
import { homePageDictionary } from "../../i18n/dictionary";
import { getLocalizedValue } from "../../i18n/get-localized-value";
import HomeSkillsReveal from "./HomeSkillsReveal";
import styles from "../../styles/home-page.module.css";

/**
 * 首页技能区块会在渲染前把双语文案解析成当前语言的字符串。
 *
 * @param {{ language: import("../../i18n/config").SiteLanguage }} props
 */
export default function HomeSkillsSection({ language }) {
  const localizedSkills = homeSkills.map((skill) => ({
    ...skill,
    caption: getLocalizedValue(skill.caption, language),
    iconAlt: getLocalizedValue(skill.iconAlt, language),
    label: getLocalizedValue(skill.label, language),
  }));

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
        skills={localizedSkills}
      />
    </section>
  );
}

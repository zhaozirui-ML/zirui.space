import HomeBlogsSection from "../components/home/HomeBlogsSection";
import HomeHeroAvatar from "../components/home/HomeHeroAvatar";
import HomeSkillsSection from "../components/home/HomeSkillsSection";
import HomeWorksSection from "../components/home/HomeWorksSection";
import { homeIntro, homeSectionVisibility } from "../data/home-content";
import { getLocalizedValue } from "../i18n/get-localized-value";
import styles from "../styles/home-page.module.css";

/**
 * 首页首屏和各个信息区块都会跟随当前语言切换。
 *
 * @param {{ language: import("../i18n/config").SiteLanguage }} props
 */
export default function HomePage({ language }) {
  return (
    <div className={styles.homePage}>
      <div className={styles.homeTopMode}>
        <section className={styles.heroSection}>
          <HomeHeroAvatar
            alt={getLocalizedValue(homeIntro.avatarAlt, language)}
            mediaType={homeIntro.avatarMediaType}
            src={homeIntro.avatarSrc}
          />
          <h1 className={styles.heroTitle}>{getLocalizedValue(homeIntro.title, language)}</h1>
        </section>
      </div>

      {homeSectionVisibility.skills ? <HomeSkillsSection language={language} /> : null}
      <HomeWorksSection language={language} />
      <HomeBlogsSection language={language} />
    </div>
  );
}

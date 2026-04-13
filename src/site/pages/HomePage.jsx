import Image from "next/image";

import HomeBlogsSection from "../components/home/HomeBlogsSection";
import HomeSunnyShadow from "../components/home/HomeSunnyShadow";
import HomeSkillsSection from "../components/home/HomeSkillsSection";
import HomeWorksSection from "../components/home/HomeWorksSection";
import { homeIntro } from "../data/home-content";
import { getLocalizedValue } from "../i18n/get-localized-value";
import styles from "../styles/home-page.module.css";

export default function HomePage({ language }) {
  return (
    <div className={styles.homePage}>
      <div aria-hidden="true" className={styles.homeBackground}>
        <HomeSunnyShadow />
      </div>

      <div className={styles.homeTopMode}>
        <section className={styles.heroSection}>
          <Image
            alt={getLocalizedValue(homeIntro.avatarAlt, language)}
            className={styles.heroAvatar}
            height={76}
            src={homeIntro.avatarSrc}
            unoptimized
            width={76}
          />
          <h1 className={styles.heroTitle}>{getLocalizedValue(homeIntro.title, language)}</h1>
        </section>
      </div>

      <HomeWorksSection language={language} />
      <HomeSkillsSection language={language} />
      <HomeBlogsSection language={language} />
    </div>
  );
}

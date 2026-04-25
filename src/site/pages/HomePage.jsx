import Image from "next/image";

import HomeBlogsSection from "../components/home/HomeBlogsSection";
import HomeSunnyShadow from "../components/home/HomeSunnyShadow";
import HomeSkillsSection from "../components/home/HomeSkillsSection";
import HomeWorksSection from "../components/home/HomeWorksSection";
import { homeIntro } from "../data/home-content";
import styles from "../styles/home-page.module.css";

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      <div className={styles.homeTopMode}>
        <div aria-hidden="true" className={styles.homeBackground}>
          <HomeSunnyShadow />
        </div>

        <section className={styles.heroSection}>
          <Image
            alt={homeIntro.avatarAlt}
            className={styles.heroAvatar}
            height={76}
            src={homeIntro.avatarSrc}
            unoptimized
            width={76}
          />
          <h1 className={styles.heroTitle}>{homeIntro.title}</h1>
        </section>
      </div>

      <HomeSkillsSection />
      <HomeWorksSection />
      <HomeBlogsSection />
    </div>
  );
}

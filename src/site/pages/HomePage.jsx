import Image from "next/image";

import HomeBlogsSection from "../components/home/HomeBlogsSection";
import HomeSkillsSection from "../components/home/HomeSkillsSection";
import HomeWorksSection from "../components/home/HomeWorksSection";
import { homeIntro } from "../data/home-content";
import styles from "../styles/home-page.module.css";

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      <div className={styles.homeTopMode}>
        <section className={styles.heroSection}>
          {homeIntro.avatarMediaType === "video" ? (
            <video
              aria-label={homeIntro.avatarAlt}
              autoPlay
              className={styles.heroAvatar}
              height={76}
              loop
              muted
              playsInline
              preload="auto"
              role="img"
              src={homeIntro.avatarSrc}
              width={76}
            />
          ) : (
            <Image
              alt={homeIntro.avatarAlt}
              className={styles.heroAvatar}
              height={76}
              src={homeIntro.avatarSrc}
              unoptimized
              width={76}
            />
          )}
          <h1 className={styles.heroTitle}>{homeIntro.title}</h1>
        </section>
      </div>

      <HomeWorksSection />
      <HomeSkillsSection />
      <HomeBlogsSection />
    </div>
  );
}

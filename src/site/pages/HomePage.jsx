import Image from "next/image";

import HomeBlogsSection from "../components/home/HomeBlogsSection";
import HomeSkillsSection from "../components/home/HomeSkillsSection";
import HomeWorksSection from "../components/home/HomeWorksSection";
import { homeIntro } from "../data/home-content";
import { getLocalizedValue } from "../i18n/get-localized-value";
import styles from "../styles/home-page.module.css";

/**
 * 首页首屏和各个信息区块都会跟随当前语言切换。
 *
 * @param {{ language: import("../i18n/config").SiteLanguage }} props
 */
export default function HomePage({ language }) {
  // 通过开关控制是否显示 Skills 模块，后续若要恢复展示，改成 true 即可。
  const showSkillsSection = false;

  return (
    <div className={styles.homePage}>
      <div className={styles.homeTopMode}>
        <section className={styles.heroSection}>
          {homeIntro.avatarMediaType === "video" ? (
            <video
              aria-label={getLocalizedValue(homeIntro.avatarAlt, language)}
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
              alt={getLocalizedValue(homeIntro.avatarAlt, language)}
              className={styles.heroAvatar}
              height={76}
              src={homeIntro.avatarSrc}
              unoptimized
              width={76}
            />
          )}
          <h1 className={styles.heroTitle}>{getLocalizedValue(homeIntro.title, language)}</h1>
        </section>
      </div>

      <HomeWorksSection language={language} />
      {showSkillsSection ? <HomeSkillsSection language={language} /> : null}
      <HomeBlogsSection language={language} />
    </div>
  );
}

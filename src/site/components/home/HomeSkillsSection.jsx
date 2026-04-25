import { homeSkillHighlight, homeSkills } from "../../data/home-content";
import HomeSkillsReveal from "./HomeSkillsReveal";
import styles from "../../styles/home-page.module.css";

export default function HomeSkillsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>How I Work</h2>
        <p className={styles.sectionSubtitle}>Four ways I turn complexity into shippable systems</p>
      </div>
      <HomeSkillsReveal
        fallbackImageAlt={homeSkillHighlight.imageAlt}
        fallbackImageSrc={homeSkillHighlight.imageSrc}
        skills={homeSkills}
      />
    </section>
  );
}

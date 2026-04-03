import Image from "next/image";
import {
  BadgeCheck,
  Blocks,
  Network,
  Orbit,
  Pointer,
  Sparkles,
} from "lucide-react";

import { homeSkillHighlight, homeSkills } from "../../data/home-content";
import styles from "../../styles/home-page.module.css";

const skillIcons = {
  badgeCheck: BadgeCheck,
  blocks: Blocks,
  network: Network,
  orbit: Orbit,
  pointer: Pointer,
  sparkles: Sparkles,
};

export default function HomeSkillsSection() {
  const HighlightIcon = skillIcons[homeSkillHighlight.iconName] || Orbit;

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Skills</h2>
        <p className={styles.sectionSubtitle}>See what I can do</p>
      </div>

      <div className={styles.skillsLayout}>
        <ul className={styles.skillList}>
          {homeSkills.map((skill) => {
            const SkillIcon = skillIcons[skill.iconName] || Sparkles;

            return (
              <li
                className={[
                  styles.skillItem,
                  skill.active ? styles.skillItemActive : styles.skillItemMuted,
                ]
                  .filter(Boolean)
                  .join(" ")}
                key={skill.label}
              >
                <span
                  className={[
                    styles.skillIconWrap,
                    skill.active ? styles.skillIconWrapActive : styles.skillIconWrapMuted,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <SkillIcon
                    aria-hidden="true"
                    className={styles.skillIcon}
                    size={15}
                    strokeWidth={1.9}
                  />
                </span>
                <span>{skill.label}</span>
              </li>
            );
          })}
        </ul>

        <div className={styles.skillHighlight}>
          <div className={styles.skillHighlightFrame}>
            <Image
              alt={homeSkillHighlight.imageAlt}
              className={styles.skillHighlightImage}
              fill
              sizes="240px"
              src={homeSkillHighlight.imageSrc}
            />
            <div className={styles.skillHighlightBadge}>
              <span className={styles.skillHighlightGlyph}>
                <HighlightIcon
                  aria-hidden="true"
                  className={styles.skillIcon}
                  size={18}
                  strokeWidth={1.9}
                />
              </span>
            </div>
          </div>
          <p className={styles.skillHighlightCaption}>{homeSkillHighlight.caption}</p>
        </div>
      </div>
    </section>
  );
}

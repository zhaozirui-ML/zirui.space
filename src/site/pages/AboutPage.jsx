import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  aboutContactItems,
  aboutEducationItems,
  aboutExperienceItems,
  aboutSkillGroups,
} from "../data/about-content";
import styles from "../styles/about-page.module.css";

function AboutSection({
  accent = "brand",
  children,
  title,
}) {
  const railClassName =
    accent === "moss"
      ? styles.bodyRailMoss
      : accent === "blue"
        ? styles.bodyRailBlue
        : styles.bodyRailWarm;

  return (
    <section className={styles.aboutSection}>
      <div className={styles.sectionTitleRow}>
        <div className={[styles.rail].join(" ")} />
        <div className={styles.sectionTitleCell}>
          <h2 className={styles.sectionTitle}>{title}</h2>
        </div>
        <div className={[styles.rail].join(" ")} />
      </div>

      <div className={styles.sectionBodyRow}>
        <div className={[styles.rail, railClassName].join(" ")} />
        {children}
        <div className={[styles.rail, railClassName].join(" ")} />
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.aboutFrame}>
        <section className={styles.topMetaGrid}>
          <div className={styles.rail} />
          <div className={styles.metaContent}>
            {aboutContactItems.map((item) => (
              <article className={styles.metaItem} key={item.label}>
                <p className={styles.metaLabel}>{item.label}</p>
                {Array.isArray(item.value) ? (
                  <div className={styles.snsLinks}>
                    {item.value.map((link) => {
                      return (
                        <Link
                          aria-label={link.label}
                          className={styles.snsLink}
                          href={link.href}
                          key={link.label}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <span
                            className={styles.snsIcon}
                            style={{
                              WebkitMaskImage: `url(${link.iconSrc})`,
                              maskImage: `url(${link.iconSrc})`,
                            }}
                            aria-hidden="true"
                          />
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  item.href ? (
                    <Link
                      aria-label={`Send email to ${item.value}`}
                      className={styles.metaValueLink}
                      href={item.href}
                    >
                      <span className={styles.metaValue}>{item.value}</span>
                      <ArrowUpRight aria-hidden="true" className={styles.metaValueArrow} />
                    </Link>
                  ) : (
                    <p className={styles.metaValue}>{item.value}</p>
                  )
                )}
              </article>
            ))}
          </div>
          <div className={styles.rail} />
        </section>

        <AboutSection title="Experience">
          <div className={styles.sectionBody}>
            <div className={styles.experienceList}>
              {aboutExperienceItems.map((item) => (
                <article className={styles.experienceItem} key={item.company}>
                  <header className={styles.jobHeading}>
                    <div className={styles.jobTitleRow}>
                      <Link
                        className={styles.companyLink}
                        href={item.companyHref}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {item.company}
                      </Link>
                      <p className={styles.role}>{item.role}</p>
                    </div>
                    <p className={styles.dateRange}>{item.dateRange}</p>
                  </header>

                  <ul className={styles.bulletList}>
                    {item.responsibilities.map((responsibility) => (
                      <li className={styles.bulletItem} key={responsibility}>
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </AboutSection>

        <AboutSection accent="moss" title="Education">
          <div className={styles.educationPanel}>
            <h3 className={styles.educationHeading}>
              Nanjing University of the Arts
            </h3>
            <ul className={styles.educationList}>
              {aboutEducationItems.map((item) => (
                <li className={styles.educationItem} key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </AboutSection>

        <AboutSection accent="blue" title="Skills">
          <div className={styles.skillsPanel}>
            <div className={styles.skillsGrid}>
              {aboutSkillGroups.map((group) => (
                <section className={styles.skillGroup} key={group.category}>
                  <p className={styles.skillCategory}>{group.category}</p>
                  <div className={styles.skillList}>
                    {group.items.map((item) =>
                      typeof item === "string" ? (
                        <p className={styles.skillItem} key={item}>
                          {item}
                        </p>
                      ) : (
                        <Link
                          className={[styles.skillItem, styles.skillLink].join(" ")}
                          href={item.href}
                          key={item.label}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {item.label}
                        </Link>
                      ),
                    )}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </AboutSection>

        <div className={styles.bottomSpacer}>
          <div className={styles.bottomSpacerInner} />
          <div />
          <div className={styles.bottomSpacerInner} />
        </div>
      </div>
    </div>
  );
}

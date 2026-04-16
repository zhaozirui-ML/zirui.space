import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  aboutContactItems,
  aboutEducationItems,
  aboutExperienceItems,
  aboutSkillGroups,
} from "../data/about-content";
import { aboutPageDictionary } from "../i18n/dictionary";
import { getLocalizedValue } from "../i18n/get-localized-value";
import shellStyles from "../styles/site-shell.module.css";
import styles from "../styles/about-page.module.css";

function resolveLocalizedText(value, language) {
  return typeof value === "string" ? value : getLocalizedValue(value, language);
}

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

/**
 * About 页会根据语言切换主要结构文案和数据文案。
 *
 * @param {{ language: import("../i18n/config").SiteLanguage }} props
 */
export default function AboutPage({ language }) {
  return (
    <div className={styles.aboutPage}>
      {/* 补一个页面级 h1，保证语义结构完整，同时不打断当前已经定好的视觉排版。 */}
      <h1 className="sr-only">{getLocalizedValue(aboutPageDictionary.pageTitle, language)}</h1>

      <div className={styles.aboutFrame}>
        <section className={styles.topMetaGrid}>
          <div className={styles.rail} />
          <div className={styles.metaContent}>
            {aboutContactItems.map((item) => {
              const label = getLocalizedValue(item.label, language);

              return (
                <article className={styles.metaItem} key={label}>
                  <p className={styles.metaLabel}>{label}</p>
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
                  ) : item.href ? (
                    <Link
                      aria-label={`${getLocalizedValue(aboutPageDictionary.contactEmailLabel, language)}: ${item.value}`}
                      className={shellStyles.arrowLink}
                      href={item.href}
                    >
                      <span className={shellStyles.arrowLinkText}>{item.value}</span>
                      <ArrowUpRight aria-hidden="true" className={shellStyles.arrowLinkArrow} />
                    </Link>
                  ) : (
                    <p className={styles.metaValue}>{item.value}</p>
                  )}
                </article>
              );
            })}
          </div>
          <div className={styles.rail} />
        </section>

        <AboutSection title={getLocalizedValue(aboutPageDictionary.experienceTitle, language)}>
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
                      <p className={styles.role}>{getLocalizedValue(item.role, language)}</p>
                    </div>
                    <p className={styles.dateRange}>{item.dateRange}</p>
                  </header>

                  <ul className={styles.bulletList}>
                    {item.responsibilities.map((responsibility) => (
                      <li
                        className={styles.bulletItem}
                        key={resolveLocalizedText(responsibility, language)}
                      >
                        {resolveLocalizedText(responsibility, language)}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </AboutSection>

        <AboutSection
          accent="moss"
          title={getLocalizedValue(aboutPageDictionary.educationTitle, language)}
        >
          <div className={styles.educationPanel}>
            <h3 className={styles.educationHeading}>
              {language === "en" ? "Nanjing University of the Arts" : "南京艺术学院"}
            </h3>
            <ul className={styles.educationList}>
              {aboutEducationItems.map((item) => {
                const itemText = resolveLocalizedText(item, language);

                return (
                  <li className={styles.educationItem} key={itemText}>
                    {itemText}
                  </li>
                );
              })}
            </ul>
          </div>
        </AboutSection>

        <AboutSection
          accent="blue"
          title={getLocalizedValue(aboutPageDictionary.skillsTitle, language)}
        >
          <div className={styles.skillsPanel}>
            <div className={styles.skillsGrid}>
              {aboutSkillGroups.map((group) => {
                const category = getLocalizedValue(group.category, language);

                return (
                  <section className={styles.skillGroup} key={category}>
                    <p className={styles.skillCategory}>{category}</p>
                    <div className={styles.skillList}>
                      {group.items.map((item) => {
                        const isLinkedItem =
                          typeof item === "object" && "href" in item;

                        if (isLinkedItem) {
                          const label = getLocalizedValue(item.label, language);

                          return (
                          <Link
                            className={[styles.skillItem, styles.skillLink].join(" ")}
                            href={item.href}
                              key={label}
                            rel="noreferrer"
                            target="_blank"
                          >
                              {label}
                          </Link>
                          );
                        }

                        const itemText = resolveLocalizedText(item, language);

                        return (
                          <p className={styles.skillItem} key={itemText}>
                            {itemText}
                          </p>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
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

import Image from "next/image";

import {
  CaseStudyHeadingOne,
  CaseStudyHeadingTwo,
} from "../case-study/CaseStudyHeading";
import CaseStudyToc from "../case-study/CaseStudyToc";
import { dataVisualizationScreenDetail } from "../../data/data-visualization-screen-detail";
import styles from "../../styles/data-visualization-screen-detail.module.css";

const caseStudySections = [
  { hierarchy: "primary", id: "project-background", label: { zh: "项目背景", en: "Project Background" } },
  { hierarchy: "primary", id: "problem-definition", label: { zh: "问题定义", en: "Problem Definition" } },
  { hierarchy: "primary", id: "design-goals", label: { zh: "设计目标", en: "Design Goals" } },
  { hierarchy: "primary", id: "design-practice", label: { zh: "设计实践", en: "Design Practice" } },
  {
    hierarchy: "secondary",
    id: "practice-visual-language",
    label: { zh: "图表视觉语言", en: "Chart Visual Language" },
  },
  {
    hierarchy: "secondary",
    id: "practice-visual-expansion",
    label: { zh: "视觉语言扩展", en: "Visual Language Expansion" },
  },
  {
    hierarchy: "secondary",
    id: "practice-systemization",
    label: { zh: "组件化沉淀", en: "Componentization" },
  },
  { hierarchy: "primary", id: "design-outcomes", label: { zh: "设计成果", en: "Design Outcomes" } },
  { hierarchy: "primary", id: "project-retrospective", label: { zh: "项目复盘", en: "Project Retrospective" } },
];

function shouldBypassNextImageOptimizer(source) {
  return typeof source === "string" && source.startsWith("http");
}

function resolveLocalizedValue(value, language) {
  if (Array.isArray(value)) {
    return value.map((item) => resolveLocalizedValue(item, language));
  }

  if (value && typeof value === "object") {
    if ("zh" in value || "en" in value) {
      return language === "en" ? value.en ?? value.zh : value.zh ?? value.en;
    }

    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [
        key,
        resolveLocalizedValue(nestedValue, language),
      ]),
    );
  }

  return value;
}

export default function DataVisualizationScreenDetail({
  backHref = "/work",
  headingAccentColor = "var(--portfolio-semantic-eyebrow-color)",
  language = "zh",
}) {
  /** @type {any} */
  const content = resolveLocalizedValue(dataVisualizationScreenDetail, language);
  /** @type {any} */
  const tocItems = resolveLocalizedValue(caseStudySections, language);
  const {
    background,
    goals,
    hero,
    outcomes,
    practice,
    problems,
    retrospective,
  } = content;
  /** @type {import("react").CSSProperties & Record<string, string>} */
  const pageThemeStyles = {
    "--data-vis-case-accent": headingAccentColor,
  };
  const tocTheme = {
    accentColor: "var(--data-vis-case-accent)",
    backHref,
    backLabel: language === "en" ? "Back" : "返回",
    desktopShiftX: "29rem",
    // 目录起点要和正文首个模块共享同一组顶部节奏，
    // 否则会出现 TOC 提前“飘”上去，而“项目背景”还没到的错位感。
    desktopTopOffset: "clamp(4.5rem, 8vw, 8.25rem)",
    navLabel: language === "en" ? "Page contents" : "页面目录",
  };

  return (
    <article className={styles.page} style={pageThemeStyles}>
      <section className={styles.heroFullBleed}>
        <div
          className={styles.hero}
          style={{ backgroundImage: `url(${hero.backgroundImageSrc})` }}
        >
          <div className={styles.heroContent}>
            <header className={styles.heroHeader}>
              <h1 className={styles.heroTitle}>{hero.title}</h1>
              <p className={styles.heroSubtitle}>{hero.subtitle}</p>
            </header>

            <div className={styles.heroMediaFrame}>
              <Image
                alt={hero.coverImageAlt}
                className={styles.heroMedia}
                height={850}
                priority
                sizes="(max-width: 1024px) calc(100vw - 2rem), 1512px"
                src={hero.coverImageSrc}
                style={{ height: "auto", width: "100%" }}
                unoptimized={shouldBypassNextImageOptimizer(hero.coverImageSrc)}
                width={1512}
              />
            </div>
          </div>
        </div>
      </section>

      <div className={styles.caseBody}>
        <CaseStudyToc items={tocItems} {...tocTheme} />

        <div className={styles.contentStack}>
          <CaseStudyHeadingOne
            id="project-background"
            title={background.title}
            descriptions={background.paragraphs}
          >
            <div className={styles.bodyGroup}>
              <p className={styles.bodyText}>{background.leadIn}</p>
              <ul className={styles.bulletList}>
                {background.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </CaseStudyHeadingOne>

          <section className={styles.sectionGroup}>
            <CaseStudyHeadingOne
              id="problem-definition"
              title={problems.title}
              descriptions={problems.intro}
            />

            <div className={styles.problemGrid}>
              {problems.items.map((item) => (
                <article className={styles.problemCard} key={item.label}>
                  <div className={styles.problemIcon}>
                    <Image
                      alt={item.iconAlt}
                      className={styles.problemIconImage}
                      height={32}
                      sizes="32px"
                      src={item.iconSrc}
                      unoptimized={shouldBypassNextImageOptimizer(item.iconSrc)}
                      width={32}
                    />
                  </div>
                  <p className={styles.problemLabel}>{item.label}</p>
                </article>
              ))}
            </div>

            <p className={`${styles.bodyText} ${styles.textRail}`}>
              {problems.summary}
            </p>
          </section>

          <section className={styles.sectionGroup}>
            <CaseStudyHeadingOne
              id="design-goals"
              title={goals.title}
              descriptions={goals.intro}
            />

            <div className={styles.goalGrid}>
              {goals.items.map((item) => (
                <article className={styles.goalCard} key={item.title}>
                  <h3 className={styles.goalTitle}>{item.title}</h3>
                  <p className={styles.goalDescription}>{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.sectionGroup}>
            <CaseStudyHeadingOne
              id="design-practice"
              title={practice.title}
              descriptions={practice.subtitle}
            />

            <section className={styles.practiceSection}>
              <CaseStudyHeadingTwo
                accentColor="var(--data-vis-case-accent)"
                descriptions={practice.visualLanguage.paragraphs}
                id="practice-visual-language"
                title={practice.visualLanguage.eyebrow}
              />

              <figure className={styles.figureBlock}>
                <div className={styles.practiceGalleryFrame}>
                  <div className={styles.practiceGalleryMain}>
                    <Image
                      alt={practice.visualLanguage.gallery.mainImageAlt}
                      className={styles.figureImageStatic}
                      height={563}
                      sizes="(max-width: 900px) 100vw, 900px"
                      src={practice.visualLanguage.gallery.mainImageSrc}
                      style={{ height: "auto", width: "100%" }}
                      unoptimized={shouldBypassNextImageOptimizer(
                        practice.visualLanguage.gallery.mainImageSrc
                      )}
                      width={900}
                    />
                  </div>

                  {practice.visualLanguage.gallery.thumbnails.map((thumbnail, index) => (
                    <div
                      className={`${styles.practiceGalleryThumb} ${styles[`practiceGalleryThumb${index + 1}`]}`}
                      key={thumbnail.imageSrc}
                    >
                      {thumbnail.presentation === "wide-bleed" ? (
                        <Image
                          alt={thumbnail.imageAlt}
                          className={styles.figureImageWideBleed}
                          height={145}
                          sizes="(max-width: 900px) 45vw, 436px"
                          src={thumbnail.imageSrc}
                          style={{ height: "100%", width: "103.05%" }}
                          unoptimized={shouldBypassNextImageOptimizer(
                            thumbnail.imageSrc
                          )}
                          width={449}
                        />
                      ) : (
                        <Image
                          alt={thumbnail.imageAlt}
                          className={styles.figureImage}
                          fill
                          sizes="(max-width: 900px) 45vw, 420px"
                          src={thumbnail.imageSrc}
                          unoptimized={shouldBypassNextImageOptimizer(
                            thumbnail.imageSrc
                          )}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <figcaption className={styles.figureCaption}>
                  {practice.visualLanguage.gallery.caption}
                </figcaption>
              </figure>
            </section>

            <section className={styles.practiceSection}>
              <CaseStudyHeadingTwo
                accentColor="var(--data-vis-case-accent)"
                descriptions={practice.visualExpansion.paragraphs}
                id="practice-visual-expansion"
                title={practice.visualExpansion.eyebrow}
              />

              <figure className={styles.figureBlock}>
                <div className={styles.expansionGalleryFrame}>
                  <div className={styles.expansionGalleryMain}>
                    <Image
                      alt={practice.visualExpansion.gallery.mainImageAlt}
                      className={styles.figureImageExpansionMain}
                      fill
                      sizes="(max-width: 900px) 100vw, 872px"
                      src={practice.visualExpansion.gallery.mainImageSrc}
                      unoptimized={shouldBypassNextImageOptimizer(
                        practice.visualExpansion.gallery.mainImageSrc
                      )}
                    />
                  </div>

                  <div className={styles.expansionGalleryThumbLeft}>
                    <Image
                      alt={practice.visualExpansion.gallery.leftImageAlt}
                      className={styles.figureImage}
                      fill
                      sizes="(max-width: 900px) 100vw, 693px"
                      src={practice.visualExpansion.gallery.leftImageSrc}
                      unoptimized={shouldBypassNextImageOptimizer(
                        practice.visualExpansion.gallery.leftImageSrc
                      )}
                    />
                  </div>

                  <div className={styles.expansionGalleryThumbRight}>
                    <Image
                      alt={practice.visualExpansion.gallery.rightImageAlt}
                      className={`${styles.figureImage} ${styles.figureImageExpansionThumbRight}`}
                      fill
                      sizes="(max-width: 900px) 100vw, 621px"
                      src={practice.visualExpansion.gallery.rightImageSrc}
                      unoptimized={shouldBypassNextImageOptimizer(
                        practice.visualExpansion.gallery.rightImageSrc
                      )}
                    />
                  </div>
                </div>
                <figcaption className={styles.figureCaption}>
                  {practice.visualExpansion.gallery.caption}
                </figcaption>
              </figure>
            </section>

            <section className={styles.practiceSection}>
              <CaseStudyHeadingTwo
                accentColor="var(--portfolio-color-accent-blue)"
                descriptions={practice.systemization.paragraphs}
                id="practice-systemization"
                title={practice.systemization.eyebrow}
              />

              <div className={styles.demoStack}>
                <figure className={styles.figureBlock}>
                  <div className={`${styles.demoFrame} ${styles.demoFrameMetric}`}>
                    <video
                      aria-label={practice.systemization.demos[0].title}
                      autoPlay
                      className={`${styles.demoVideo} ${styles.demoVideoMetric}`}
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      src={practice.systemization.demos[0].videoSrc}
                    />
                  </div>
                  <figcaption className={styles.figureCaption}>
                    {practice.systemization.demos[0].caption}
                  </figcaption>
                </figure>

                <figure className={styles.figureBlock}>
                  <div className={`${styles.demoFrame} ${styles.demoFrameCharts}`}>
                    <video
                      aria-label={practice.systemization.demos[1].title}
                      autoPlay
                      className={`${styles.demoVideo} ${styles.demoVideoCharts}`}
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      src={practice.systemization.demos[1].videoSrc}
                    />
                  </div>
                  <figcaption className={styles.figureCaption}>
                    {practice.systemization.demos[1].caption}
                  </figcaption>
                </figure>
              </div>
            </section>
          </section>

          <section className={styles.sectionGroup}>
            <CaseStudyHeadingOne
              id="design-outcomes"
              title={outcomes.title}
              descriptions={outcomes.intro}
            />

            <figure className={styles.figureBlock}>
              <div className={styles.outcomesFrame}>
                <div className={styles.outcomesInner}>
                  <Image
                    alt={outcomes.imageAlt}
                    className={styles.figureImageStatic}
                    height={541}
                    sizes="(max-width: 900px) 100vw, 942px"
                    src={outcomes.imageSrc}
                    style={{ height: "auto", width: "100%" }}
                    unoptimized={shouldBypassNextImageOptimizer(outcomes.imageSrc)}
                    width={942}
                  />
                </div>
              </div>
              <figcaption className={styles.figureCaption}>
                {outcomes.caption}
              </figcaption>
            </figure>
          </section>

          <section className={styles.sectionGroup}>
            <CaseStudyHeadingOne
              id="project-retrospective"
              title={retrospective.title}
              descriptions={retrospective.intro}
            />

            <div className={styles.retrospectiveGrid}>
              {retrospective.cards.map((card) => (
                <article className={styles.retrospectiveCard} key={card.title}>
                  <div className={styles.retrospectiveCardBody}>
                    <h3 className={styles.retrospectiveCardTitle}>{card.title}</h3>
                    <p className={styles.retrospectiveCardDescription}>
                      {card.description}
                    </p>
                  </div>
                  <div className={styles.retrospectiveCardMedia}>
                    <Image
                      alt={card.imageAlt}
                      className={styles.figureImage}
                      fill
                      sizes="120px"
                      src={card.imageSrc}
                      unoptimized={shouldBypassNextImageOptimizer(card.imageSrc)}
                    />
                  </div>
                </article>
              ))}
            </div>

            <p className={`${styles.bodyText} ${styles.textRail}`}>
              {retrospective.summary}
            </p>

            <div className={styles.summaryPanel}>
              <ul className={styles.bulletList}>
                {retrospective.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}

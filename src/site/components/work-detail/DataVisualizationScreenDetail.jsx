import Image from "next/image";

import {
  CaseStudyHeadingOne,
  CaseStudyHeadingTwo,
} from "../case-study/CaseStudyHeading";
import CaseStudyToc from "../case-study/CaseStudyToc";
import CommentableBlock from "../comments/CommentableBlock";
import CommentHistoryProvider from "../comments/CommentHistoryProvider";
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
  const workSlug = "data-visualization-screen";
  /** @type {import("react").CSSProperties & Record<string, string>} */
  const pageThemeStyles = {
    "--data-vis-case-accent": headingAccentColor,
  };
  const tocTheme = {
    accentColor: "var(--data-vis-case-accent)",
    backHref,
    backLabel: language === "en" ? "Back" : "返回",
    // 这一页的图片模块会比正文版心更宽，桌面端目录需要再往左退一点，
    // 否则在大图场景里容易压到图片区。
    desktopShiftX: "clamp(38rem, 26vw, 41rem)",
    // 目录起点要和正文首个模块共享同一组顶部节奏，
    // 否则会出现 TOC 提前“飘”上去，而“项目背景”还没到的错位感。
    desktopTopOffset: "clamp(4.5rem, 8vw, 8.25rem)",
    navLabel: language === "en" ? "Page contents" : "页面目录",
  };

  return (
    <CommentHistoryProvider workSlug={workSlug}>
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
          <CommentableBlock
            language={language}
            targetId="data-vis-project-background-title"
            targetLabel={background.title}
            targetType="heading"
            workSlug={workSlug}
          >
            <CaseStudyHeadingOne
              id="project-background"
              title={background.title}
              descriptions={background.paragraphs}
            />
          </CommentableBlock>

          <div className={styles.bodyGroup}>
            <CommentableBlock
              language={language}
              targetId="data-vis-project-background-lead"
              targetLabel={background.leadIn}
              targetType="text"
              workSlug={workSlug}
            >
              <p className={styles.bodyText}>{background.leadIn}</p>
            </CommentableBlock>
            <ul className={styles.bulletList}>
              {background.bullets.map((bullet, index) => (
                <CommentableBlock
                  as="li"
                  key={bullet}
                  language={language}
                  targetId={`data-vis-project-background-bullet-${index + 1}`}
                  targetLabel={bullet}
                  targetType="list-item"
                  workSlug={workSlug}
                >
                  {bullet}
                </CommentableBlock>
              ))}
            </ul>
          </div>

          <section className={styles.sectionGroup}>
            <CommentableBlock
              language={language}
              targetId="data-vis-problem-definition-title"
              targetLabel={problems.title}
              targetType="heading"
              workSlug={workSlug}
            >
              <CaseStudyHeadingOne
                id="problem-definition"
                title={problems.title}
                descriptions={problems.intro}
              />
            </CommentableBlock>

            <div className={styles.problemGrid}>
              {problems.items.map((item, index) => (
                <CommentableBlock
                  as="article"
                  className={styles.problemCard}
                  key={item.label}
                  language={language}
                  targetId={`data-vis-problem-definition-card-${index + 1}`}
                  targetLabel={item.label}
                  targetType="card"
                  workSlug={workSlug}
                >
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
                </CommentableBlock>
              ))}
            </div>

            <CommentableBlock
              language={language}
              targetId="data-vis-problem-definition-summary"
              targetLabel={problems.summary}
              targetType="text"
              workSlug={workSlug}
            >
              <p className={`${styles.bodyText} ${styles.textRail}`}>
                {problems.summary}
              </p>
            </CommentableBlock>
          </section>

          <section className={styles.sectionGroup}>
            <CommentableBlock
              language={language}
              targetId="data-vis-design-goals-title"
              targetLabel={goals.title}
              targetType="heading"
              workSlug={workSlug}
            >
              <CaseStudyHeadingOne
                id="design-goals"
                title={goals.title}
                descriptions={goals.intro}
              />
            </CommentableBlock>

            <div className={styles.goalGrid}>
              {goals.items.map((item, index) => (
                <CommentableBlock
                  as="article"
                  className={styles.goalCard}
                  key={item.title}
                  language={language}
                  targetId={`data-vis-design-goal-card-${index + 1}`}
                  targetLabel={item.title}
                  targetType="card"
                  workSlug={workSlug}
                >
                  <h3 className={styles.goalTitle}>{item.title}</h3>
                  <p className={styles.goalDescription}>{item.description}</p>
                </CommentableBlock>
              ))}
            </div>
          </section>

          <section className={styles.sectionGroup}>
            <CommentableBlock
              language={language}
              targetId="data-vis-design-practice-title"
              targetLabel={practice.title}
              targetType="heading"
              workSlug={workSlug}
            >
              <CaseStudyHeadingOne
                id="design-practice"
                title={practice.title}
                descriptions={practice.subtitle}
              />
            </CommentableBlock>

            <section className={styles.practiceSection}>
              <CommentableBlock
                language={language}
                targetId="data-vis-practice-visual-language-title"
                targetLabel={practice.visualLanguage.eyebrow}
                targetType="heading"
                workSlug={workSlug}
              >
                <CaseStudyHeadingTwo
                  accentColor="var(--data-vis-case-accent)"
                  descriptions={practice.visualLanguage.paragraphs}
                  id="practice-visual-language"
                  title={practice.visualLanguage.eyebrow}
                />
              </CommentableBlock>

              <CommentableBlock
                language={language}
                targetId="data-vis-practice-visual-language-gallery"
                targetLabel={practice.visualLanguage.gallery.caption}
                targetType="figure"
                workSlug={workSlug}
              >
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
              </CommentableBlock>
            </section>

            <section className={styles.practiceSection}>
              <CommentableBlock
                language={language}
                targetId="data-vis-practice-visual-expansion-title"
                targetLabel={practice.visualExpansion.eyebrow}
                targetType="heading"
                workSlug={workSlug}
              >
                <CaseStudyHeadingTwo
                  accentColor="var(--data-vis-case-accent)"
                  descriptions={practice.visualExpansion.paragraphs}
                  id="practice-visual-expansion"
                  title={practice.visualExpansion.eyebrow}
                />
              </CommentableBlock>

              <CommentableBlock
                language={language}
                targetId="data-vis-practice-visual-expansion-gallery"
                targetLabel={practice.visualExpansion.gallery.caption}
                targetType="figure"
                workSlug={workSlug}
              >
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
              </CommentableBlock>
            </section>

            <section className={styles.practiceSection}>
              <CommentableBlock
                language={language}
                targetId="data-vis-practice-systemization-title"
                targetLabel={practice.systemization.eyebrow}
                targetType="heading"
                workSlug={workSlug}
              >
                <CaseStudyHeadingTwo
                  accentColor="var(--portfolio-color-accent-blue)"
                  descriptions={practice.systemization.paragraphs}
                  id="practice-systemization"
                  title={practice.systemization.eyebrow}
                />
              </CommentableBlock>

              <div className={styles.demoStack}>
                <CommentableBlock
                  language={language}
                  targetId="data-vis-practice-systemization-demo-metric"
                  targetLabel={practice.systemization.demos[0].caption}
                  targetType="figure"
                  workSlug={workSlug}
                >
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
                </CommentableBlock>

                <CommentableBlock
                  language={language}
                  targetId="data-vis-practice-systemization-demo-charts"
                  targetLabel={practice.systemization.demos[1].caption}
                  targetType="figure"
                  workSlug={workSlug}
                >
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
                </CommentableBlock>
              </div>
            </section>
          </section>

          <section className={styles.sectionGroup}>
            <CommentableBlock
              language={language}
              targetId="data-vis-design-outcomes-title"
              targetLabel={outcomes.title}
              targetType="heading"
              workSlug={workSlug}
            >
              <CaseStudyHeadingOne
                id="design-outcomes"
                title={outcomes.title}
                descriptions={outcomes.intro}
              />
            </CommentableBlock>

            <CommentableBlock
              language={language}
              targetId="data-vis-design-outcomes-image"
              targetLabel={outcomes.caption}
              targetType="figure"
              workSlug={workSlug}
            >
              <figure className={styles.figureBlock}>
                <div className={styles.outcomesFrame}>
                  <div className={styles.outcomesInner}>
                    <Image
                      alt={outcomes.imageAlt}
                      className={styles.figureImageStatic}
                      height={514}
                      sizes="(max-width: 900px) 100vw, 1000px"
                      src={outcomes.imageSrc}
                      style={{ height: "auto", width: "100%" }}
                      unoptimized={shouldBypassNextImageOptimizer(outcomes.imageSrc)}
                      width={1000}
                    />
                  </div>
                </div>
                <figcaption className={styles.figureCaption}>
                  {outcomes.caption}
                </figcaption>
              </figure>
            </CommentableBlock>
          </section>

          <section className={styles.sectionGroup}>
            <CommentableBlock
              language={language}
              targetId="data-vis-project-retrospective-title"
              targetLabel={retrospective.title}
              targetType="heading"
              workSlug={workSlug}
            >
              <CaseStudyHeadingOne
                id="project-retrospective"
                title={retrospective.title}
                descriptions={retrospective.intro}
              />
            </CommentableBlock>

            <div className={styles.retrospectiveGrid}>
              {retrospective.cards.map((card, index) => (
                <CommentableBlock
                  as="article"
                  className={styles.retrospectiveCard}
                  key={card.title}
                  language={language}
                  targetId={`data-vis-project-retrospective-card-${index + 1}`}
                  targetLabel={card.title}
                  targetType="card"
                  workSlug={workSlug}
                >
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
                </CommentableBlock>
              ))}
            </div>

            <CommentableBlock
              language={language}
              targetId="data-vis-project-retrospective-summary"
              targetLabel={retrospective.summary}
              targetType="text"
              workSlug={workSlug}
            >
              <p className={`${styles.bodyText} ${styles.textRail}`}>
                {retrospective.summary}
              </p>
            </CommentableBlock>

            <div className={styles.summaryPanel}>
              <ul className={styles.bulletList}>
                {retrospective.bullets.map((bullet, index) => (
                  <CommentableBlock
                    as="li"
                    key={bullet}
                    language={language}
                    targetId={`data-vis-project-retrospective-bullet-${index + 1}`}
                    targetLabel={bullet}
                    targetType="list-item"
                    workSlug={workSlug}
                  >
                    {bullet}
                  </CommentableBlock>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </article>
    </CommentHistoryProvider>
  );
}

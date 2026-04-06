import Image from "next/image";
import { ArrowRight } from "lucide-react";

import CaseStudyToc from "../components/case-study/CaseStudyToc";
import { axzoDesignSystemCaseStudy } from "../data/axzo-design-system-case-study";
import styles from "../styles/axzo-design-system-case-study.module.css";

function joinClassNames(...classNames) {
  return classNames.filter(Boolean).join(" ");
}

function SectionHeader({ title, description = null }) {
  return (
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {description ? <p className={styles.sectionDescription}>{description}</p> : null}
    </div>
  );
}

function MediaPanel({
  alt,
  caption = null,
  frameRatio = null,
  imagePosition = null,
  imageSrc,
  priority = false,
  ratio,
  tone = "default",
}) {
  const frameClassName = joinClassNames(
    styles.mediaFrame,
    tone === "soft" ? styles.mediaFrameSoft : null,
  );

  return (
    <figure className={styles.mediaFigure}>
      <div className={frameClassName} style={{ aspectRatio: frameRatio || ratio }}>
        <div className={tone === "soft" ? styles.mediaInset : styles.mediaFill}>
          <div className={styles.mediaFill}>
            <Image
              alt={alt}
              className={styles.mediaImage}
              fill
              priority={priority}
              sizes="(max-width: 900px) calc(100vw - 2.5rem), 832px"
              src={imageSrc}
              style={imagePosition ? { objectPosition: imagePosition } : undefined}
              unoptimized
            />
          </div>
        </div>
      </div>
      {caption ? <figcaption className={styles.mediaCaption}>{caption}</figcaption> : null}
    </figure>
  );
}

function OrbitDiagram({ orbit }) {
  return (
    <div className={styles.orbitCard}>
      <div className={styles.orbitDiagram}>
        <div aria-hidden="true" className={styles.orbitRing} />
        <div className={styles.orbitCenter}>
          <span className={styles.orbitCenterText}>
            {orbit.centerLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </span>
        </div>
        <span className={joinClassNames(styles.orbitTag, styles.orbitTagTop)}>
          {orbit.top}
        </span>
        <span className={joinClassNames(styles.orbitTag, styles.orbitTagLeft)}>
          {orbit.left}
        </span>
        <span className={joinClassNames(styles.orbitTag, styles.orbitTagRight)}>
          {orbit.right}
        </span>
        <span className={joinClassNames(styles.orbitTag, styles.orbitTagBottom)}>
          {orbit.bottom}
        </span>
      </div>
    </div>
  );
}

export default function AxzoDesignSystemCaseStudyPage({ work }) {
  const content = axzoDesignSystemCaseStudy;
  // 目录和锚点放在同一处维护，后面继续扩章节时不容易漏改。
  const sectionItems = [
    { hierarchy: "primary", id: "project-background", label: content.projectBackground.title },
    { hierarchy: "primary", id: "problem-definition", label: content.problemDefinition.title },
    { hierarchy: "primary", id: "insight", label: content.insight.title },
    { hierarchy: "primary", id: "portal-positioning", label: content.portalPositioning.title },
    { hierarchy: "primary", id: "design-goal", label: content.designGoal.title },
    { hierarchy: "primary", id: "exploration", label: content.exploration.title },
    {
      hierarchy: "secondary",
      id: "exploration-structure",
      label: content.exploration.sections[0].theme,
    },
    {
      hierarchy: "secondary",
      id: "exploration-strategy",
      label: content.exploration.sections[1].theme,
    },
    { hierarchy: "primary", id: "practice", label: content.practice.title },
    {
      hierarchy: "secondary",
      id: "practice-homepage",
      label: content.practice.pages[0].theme,
    },
    {
      hierarchy: "secondary",
      id: "practice-design-dev",
      label: content.practice.pages[1].theme,
    },
    {
      hierarchy: "secondary",
      id: "practice-data-viz",
      label: content.practice.pages[2].theme,
    },
    {
      hierarchy: "secondary",
      id: "practice-collaboration",
      label: content.practice.pages[3].theme,
    },
    { hierarchy: "primary", id: "reflection", label: content.reflection.title },
  ];
  const tocTheme = {
    accentColor: "var(--axzo-accent-moss)",
    backHref: "/work",
    backLabel: "返回",
    desktopShiftX: "34rem",
    desktopTopOffset: "2rem",
    mutedColor: "rgba(122, 126, 128, 0.92)",
    titleColor: "var(--portfolio-semantic-title-color)",
  };

  return (
    <article className={joinClassNames(styles.caseStudy, "case-study-headerless")}>
      {/* 封面视觉里已经有主标题了，这里补一个语义上的 h1，方便无障碍和 SEO。 */}
      <h1 className="sr-only">{work.title}</h1>

      <section className={styles.hero} aria-label={`${work.title} 封面`}>
        <div className={styles.heroBackdrop}>
          <Image
            alt=""
            aria-hidden="true"
            className={styles.heroBackdropImage}
            fill
            priority
            sizes="100vw"
            src={content.cover.backdropSrc}
            unoptimized
          />
        </div>

        <div className={styles.heroPanel}>
          <div className={styles.heroPanelFrame}>
            <Image
              alt={content.cover.panelAlt}
            className={styles.heroPanelImage}
            fill
            priority
            sizes="(max-width: 640px) calc(100vw - 2rem), 75vw"
            src={content.cover.panelSrc}
            unoptimized
          />
          </div>
        </div>
      </section>

      <div className={styles.caseBody}>
        <CaseStudyToc items={sectionItems} {...tocTheme} />

        <div className={styles.contentStack}>
          <section className={styles.section} id="project-background">
            <SectionHeader
              title={content.projectBackground.title}
              description={content.projectBackground.description}
            />
            <MediaPanel
              alt={content.projectBackground.imageAlt}
              caption={content.projectBackground.caption}
              imagePosition={content.projectBackground.imagePosition}
              imageSrc={content.projectBackground.imageSrc}
              priority
              ratio={content.projectBackground.ratio}
            />
          </section>

          <section className={styles.section} id="problem-definition">
            <SectionHeader
              title={content.problemDefinition.title}
              description={content.problemDefinition.description}
            />
            <div className={styles.problemGrid}>
              {content.problemDefinition.items.map((item) => (
                <article className={styles.problemCard} key={item.title}>
                  <Image
                    alt={item.imageAlt}
                    className={styles.problemIcon}
                    height={32}
                    src={item.imageSrc}
                    unoptimized
                    width={32}
                  />
                  <p className={styles.problemText}>{item.title}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.section} id="insight">
            <SectionHeader
              title={content.insight.title}
              description={content.insight.description}
            />
            <div className={styles.insightPanel}>
              <div className={styles.insightTop}>
                <OrbitDiagram orbit={content.insight.leftOrbit} />
                <div aria-hidden="true" className={styles.insightArrowHorizontal}>
                  <ArrowRight className={styles.insightArrowIcon} />
                </div>
                <OrbitDiagram orbit={content.insight.rightOrbit} />
              </div>

              <div className={styles.insightCaptionRow}>
                <p className={styles.orbitCaption}>{content.insight.leftOrbit.caption}</p>
                <div aria-hidden="true" className={styles.insightCaptionSpacer} />
                <p className={styles.orbitCaption}>{content.insight.rightOrbit.caption}</p>
              </div>

              <div className={styles.insightBottomArea}>
                <div aria-hidden="true" className={styles.insightArrowSplit}>
                  <ArrowRight
                    className={joinClassNames(styles.insightArrowIcon, styles.insightArrowDiagonalLeft)}
                  />
                  <ArrowRight
                    className={joinClassNames(styles.insightArrowIcon, styles.insightArrowDiagonalRight)}
                  />
                </div>

                <div className={styles.insightBottomFlow}>
                  <div className={styles.insightMessage}>{content.insight.message}</div>

                  <div aria-hidden="true" className={styles.insightArrowVertical}>
                    <ArrowRight className={styles.insightArrowIcon} />
                  </div>

                  <div className={styles.insightConclusion}>{content.insight.conclusion}</div>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.section} id="portal-positioning">
            <SectionHeader
              title={content.portalPositioning.title}
              description={content.portalPositioning.description}
            />
            <div className={styles.roleGrid}>
              {content.portalPositioning.cards.map((card) => (
                <article className={styles.roleCard} key={card.title}>
                  <div className={styles.roleBody}>
                    <h3 className={styles.roleTitle}>{card.title}</h3>
                    <p className={styles.roleDescription}>{card.description}</p>
                  </div>
                  <div className={styles.roleMedia}>
                    <Image
                      alt={card.imageAlt}
                      className={styles.roleImage}
                      fill
                      sizes="(max-width: 900px) 96px, 120px"
                      src={card.imageSrc}
                      unoptimized
                    />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.section} id="design-goal">
            <SectionHeader
              title={content.designGoal.title}
              description={content.designGoal.description}
            />
          </section>

          <section className={joinClassNames(styles.section, styles.sectionLoose)} id="exploration">
            <SectionHeader
              title={content.exploration.title}
              description={content.exploration.description}
            />

            <article className={styles.storyBlock} id="exploration-structure">
              <div className={styles.storyHeader}>
                <p className={styles.themeLabel}>{content.exploration.sections[0].theme}</p>
                <div className={styles.storyCopy}>
                  {content.exploration.sections[0].paragraphs.map((paragraph) => (
                    <p className={styles.storyParagraph} key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <MediaPanel
                alt={content.exploration.sections[0].imageAlt}
                frameRatio={content.exploration.sections[0].frameRatio}
                imageSrc={content.exploration.sections[0].imageSrc}
                ratio={content.exploration.sections[0].ratio}
                tone="soft"
              />
            </article>

            <article className={styles.storyBlock} id="exploration-strategy">
              <div className={styles.storyHeader}>
                <p className={styles.themeLabel}>{content.exploration.sections[1].theme}</p>
                <div className={styles.storyCopy}>
                  {content.exploration.sections[1].paragraphs.map((paragraph) => (
                    <p className={styles.storyParagraph} key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <ol className={styles.decisionList}>
                {content.exploration.sections[1].decisions.map((decision) => (
                  <li className={styles.decisionItem} key={decision}>
                    {decision}
                  </li>
                ))}
              </ol>
            </article>
          </section>

          <section className={joinClassNames(styles.section, styles.sectionLoose)} id="practice">
            <SectionHeader
              title={content.practice.title}
              description={content.practice.description}
            />

            <div className={styles.practiceStack}>
              {content.practice.pages.map((page, index) => {
                const practiceIds = [
                  "practice-homepage",
                  "practice-design-dev",
                  "practice-data-viz",
                  "practice-collaboration",
                ];

                return (
                <article className={styles.practiceBlock} id={practiceIds[index]} key={page.theme}>
                  <div className={styles.storyHeader}>
                    <p className={styles.themeLabel}>{page.theme}</p>
                    <div className={styles.storyCopy}>
                      <p className={styles.storyParagraph}>{page.description}</p>
                    </div>
                  </div>

                  <MediaPanel alt={page.imageAlt} imageSrc={page.imageSrc} ratio={page.ratio} />
                </article>
                );
              })}
            </div>
          </section>

          <section className={joinClassNames(styles.section, styles.sectionLoose)} id="reflection">
            <SectionHeader title={content.reflection.title} />
            <div className={styles.reflectionStack}>
              <p className={styles.sectionDescription}>{content.reflection.intro}</p>

              <div className={styles.resultPanel}>
                <ul className={styles.resultList}>
                  {content.reflection.bullets.map((bullet) => (
                    <li className={styles.resultItem} key={bullet}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              <p className={styles.storyParagraph}>{content.reflection.conclusion}</p>
              <p className={styles.quote}>{content.reflection.quote}</p>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}

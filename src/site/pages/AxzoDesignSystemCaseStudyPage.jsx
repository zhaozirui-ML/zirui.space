import Image from "next/image";

import {
  CaseStudyHeadingOne,
  CaseStudyHeadingTwo,
} from "../components/case-study/CaseStudyHeading";
import CaseStudyToc from "../components/case-study/CaseStudyToc";
import { axzoDesignSystemCaseStudy } from "../data/axzo-design-system-case-study";
import styles from "../styles/axzo-design-system-case-study.module.css";

const caseStudySections = [
  { hierarchy: "primary", id: "project-background", label: "项目背景" },
  { hierarchy: "primary", id: "problem-definition", label: "问题定义" },
  { hierarchy: "primary", id: "design-insight", label: "设计洞察" },
  { hierarchy: "primary", id: "portal-positioning", label: "官网定位" },
  { hierarchy: "primary", id: "design-goal", label: "设计目标" },
  { hierarchy: "primary", id: "design-exploration", label: "设计探索" },
  {
    hierarchy: "secondary",
    id: "exploration-consumption-journey",
    label: "消费链路",
  },
  {
    hierarchy: "secondary",
    id: "exploration-information-architecture",
    label: "传播策略",
  },
  { hierarchy: "primary", id: "design-practice", label: "设计实践" },
  { hierarchy: "secondary", id: "practice-homepage", label: "首页设计" },
  {
    hierarchy: "secondary",
    id: "practice-design-dev",
    label: "设计与开发详情",
  },
  {
    hierarchy: "secondary",
    id: "practice-data-viz",
    label: "数据可视化",
  },
  { hierarchy: "secondary", id: "practice-collaboration", label: "团队协同" },
  { hierarchy: "primary", id: "results-reflection", label: "成果与复盘" },
];

const tocTheme = {
  accentColor: "var(--axzo-case-accent)",
  backHref: "/work",
  backLabel: "返回",
  desktopShiftX: "30.5rem",
  desktopStartOffset: "0rem",
  desktopStickyTop: "2rem",
};

const practiceSectionIds = [
  "practice-homepage",
  "practice-design-dev",
  "practice-data-viz",
  "practice-collaboration",
];

function joinClassNames(...classNames) {
  return classNames.filter(Boolean).join(" ");
}

function shouldBypassNextImageOptimizer(source) {
  return typeof source === "string" && source.startsWith("http");
}

function MediaPanel({
  alt,
  caption = null,
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
      <div className={frameClassName} style={{ aspectRatio: ratio }}>
        <div className={tone === "soft" ? styles.mediaInset : styles.mediaFill}>
          <div className={styles.mediaFill}>
            <Image
              alt={alt}
              className={styles.mediaImage}
              fill
              priority={priority}
              sizes="(max-width: 900px) calc(100vw - 2.5rem), 832px"
              src={imageSrc}
              unoptimized={shouldBypassNextImageOptimizer(imageSrc)}
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
      <p className={styles.orbitCaption}>{orbit.caption}</p>
    </div>
  );
}

export default function AxzoDesignSystemCaseStudyPage({
  headingAccentColor = "#647654",
  work,
}) {
  const content = axzoDesignSystemCaseStudy;
  /** @type {import("react").CSSProperties & Record<string, string>} */
  const pageThemeStyles = {
    "--axzo-case-accent": headingAccentColor,
  };

  return (
    <article className={styles.caseStudy} style={pageThemeStyles}>
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
            unoptimized={shouldBypassNextImageOptimizer(content.cover.backdropSrc)}
          />
        </div>

        <div className={styles.heroPanel}>
          <div className={styles.heroPanelFrame}>
            <Image
              alt={content.cover.panelAlt}
              className={styles.heroPanelImage}
              fill
              priority
              sizes="(max-width: 900px) 92vw, min(75vw, 1440px)"
              src={content.cover.panelSrc}
              unoptimized={shouldBypassNextImageOptimizer(content.cover.panelSrc)}
            />
          </div>
        </div>
      </section>

      <div className={styles.caseBody}>
        <CaseStudyToc items={caseStudySections} {...tocTheme} />

        <div className={styles.contentStack}>
          <section className={styles.section}>
            <CaseStudyHeadingOne
              className={styles.sectionHeader}
              id="project-background"
              descriptions={content.projectBackground.description}
              title={content.projectBackground.title}
            />
            <MediaPanel
              alt={content.projectBackground.imageAlt}
              caption={content.projectBackground.caption}
              imageSrc={content.projectBackground.imageSrc}
              priority
              ratio={content.projectBackground.ratio}
            />
          </section>

          <section className={styles.section}>
            <CaseStudyHeadingOne
              className={styles.sectionHeader}
              id="problem-definition"
              descriptions={content.problemDefinition.description}
              title={content.problemDefinition.title}
            />
            <div className={styles.problemGrid}>
              {content.problemDefinition.items.map((item) => (
                <article className={styles.problemCard} key={item.title}>
                  <Image
                    alt={item.imageAlt}
                    className={styles.problemIcon}
                    height={32}
                    src={item.imageSrc}
                    unoptimized={shouldBypassNextImageOptimizer(item.imageSrc)}
                    width={32}
                  />
                  <p className={styles.problemText}>{item.title}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <CaseStudyHeadingOne
              className={styles.sectionHeader}
              id="design-insight"
              descriptions={content.insight.description}
              title={content.insight.title}
            />
            <div className={styles.insightPanel}>
              <div className={styles.insightTop}>
                <OrbitDiagram orbit={content.insight.leftOrbit} />
                <div aria-hidden="true" className={styles.insightArrowHorizontal}>
                  →
                </div>
                <OrbitDiagram orbit={content.insight.rightOrbit} />
              </div>

              <div aria-hidden="true" className={styles.insightArrowSplit}>
                <span>↘</span>
                <span>↙</span>
              </div>

              <div className={styles.insightMessage}>{content.insight.message}</div>

              <div aria-hidden="true" className={styles.insightArrowVertical}>
                ↓
              </div>

              <div className={styles.insightConclusion}>{content.insight.conclusion}</div>
            </div>
          </section>

          <section className={styles.section}>
            <CaseStudyHeadingOne
              className={styles.sectionHeader}
              id="portal-positioning"
              descriptions={content.portalPositioning.description}
              title={content.portalPositioning.title}
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
                      unoptimized={shouldBypassNextImageOptimizer(card.imageSrc)}
                    />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <CaseStudyHeadingOne
              className={styles.sectionHeader}
              id="design-goal"
              descriptions={content.designGoal.description}
              title={content.designGoal.title}
            />
          </section>

          <section className={styles.section}>
            <CaseStudyHeadingOne
              className={styles.sectionHeader}
              id="design-exploration"
              descriptions={content.exploration.description}
              title={content.exploration.title}
            />

            <article className={styles.storyBlock}>
              <CaseStudyHeadingTwo
                accentColor="var(--axzo-case-accent)"
                className={styles.storyHeader}
                id="exploration-consumption-journey"
                descriptions={content.exploration.sections[0].paragraphs}
                title={content.exploration.sections[0].theme}
              />

              <MediaPanel
                alt={content.exploration.sections[0].imageAlt}
                imageSrc={content.exploration.sections[0].imageSrc}
                ratio={content.exploration.sections[0].ratio}
                tone="soft"
              />
            </article>

            <article className={styles.storyBlock}>
              <CaseStudyHeadingTwo
                accentColor="var(--axzo-case-accent)"
                className={styles.storyHeader}
                id="exploration-information-architecture"
                descriptions={content.exploration.sections[1].paragraphs}
                title={content.exploration.sections[1].theme}
              />

              <ol className={styles.decisionList}>
                {content.exploration.sections[1].decisions.map((decision) => (
                  <li className={styles.decisionItem} key={decision}>
                    {decision}
                  </li>
                ))}
              </ol>
            </article>
          </section>

          <section className={styles.section}>
            <CaseStudyHeadingOne
              className={styles.sectionHeader}
              id="design-practice"
              descriptions={content.practice.description}
              title={content.practice.title}
            />

            <div className={styles.practiceStack}>
              {content.practice.pages.map((page, index) => (
                <article className={styles.practiceBlock} key={page.theme}>
                  <CaseStudyHeadingTwo
                    accentColor="var(--axzo-case-accent)"
                    className={styles.storyHeader}
                    id={practiceSectionIds[index]}
                    descriptions={page.description}
                    title={page.theme}
                  />

                  <MediaPanel
                    alt={page.imageAlt}
                    imageSrc={page.imageSrc}
                    ratio={page.ratio}
                  />
                </article>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <CaseStudyHeadingOne
              className={styles.sectionHeader}
              id="results-reflection"
              title={content.reflection.title}
            />
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

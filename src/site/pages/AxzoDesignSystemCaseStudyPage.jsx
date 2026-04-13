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
  captionClassName = "",
  crop = null,
  frameClassName: frameClassNameProp = "",
  imageSrc,
  priority = false,
  ratio,
  tone = "default",
}) {
  const frameClassName = joinClassNames(
    styles.mediaFrame,
    frameClassNameProp,
    tone === "soft" ? styles.mediaFrameSoft : null,
  );
  const frameStyle = crop
    ? {
        aspectRatio: ratio,
        "--axzo-media-crop-height": crop.height,
        "--axzo-media-crop-left": crop.left,
        "--axzo-media-crop-top": crop.top,
        "--axzo-media-crop-width": crop.width,
      }
    : { aspectRatio: ratio };

  return (
    <figure className={styles.mediaFigure}>
      <div className={frameClassName} style={frameStyle}>
        {crop ? (
          <div className={styles.mediaCropViewport}>
            <Image
              alt={alt}
              className={styles.mediaImageCropped}
              height={crop.intrinsicHeight}
              priority={priority}
              sizes="(max-width: 900px) calc(100vw - 2.5rem), 832px"
              src={imageSrc}
              unoptimized={shouldBypassNextImageOptimizer(imageSrc)}
              width={crop.intrinsicWidth}
            />
          </div>
        ) : (
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
        )}
      </div>
      {caption ? (
        <figcaption className={joinClassNames(styles.mediaCaption, captionClassName)}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function ArrowRightSoftIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M13.1161 5.36612C13.6043 4.87796 14.3957 4.87796 14.8839 5.36612L20.6339 11.1161C20.8683 11.3505 21 11.6685 21 12C21 12.3315 20.8683 12.6494 20.6339 12.8839L14.8839 18.6339C14.3957 19.122 13.6043 19.122 13.1161 18.6339C12.628 18.1457 12.628 17.3543 13.1161 16.8661L16.7322 13.25H4.25C3.55964 13.25 3 12.6903 3 12C3 11.3096 3.55964 10.75 4.25 10.75H16.7322L13.1161 7.13388C12.628 6.64573 12.628 5.85427 13.1161 5.36612Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}

function OrbitDiagram({ orbit, variant }) {
  const isRight = variant === "right";

  return (
    <div
      className={joinClassNames(
        styles.orbitCard,
        isRight ? styles.orbitCardRight : styles.orbitCardLeft,
      )}
    >
      <div
        className={joinClassNames(
          styles.orbitDiagram,
          isRight ? styles.orbitDiagramRight : styles.orbitDiagramLeft,
        )}
      >
        <div
          aria-hidden="true"
          className={joinClassNames(
            styles.orbitRing,
            isRight ? styles.orbitRingRight : styles.orbitRingLeft,
          )}
        />
        <div
          className={joinClassNames(
            styles.orbitCenter,
            isRight ? styles.orbitCenterRight : styles.orbitCenterLeft,
          )}
        >
          <span className={styles.orbitCenterText}>
            {orbit.centerLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </span>
        </div>
        <span
          className={joinClassNames(
            styles.orbitTag,
            isRight ? styles.orbitTagTopRight : styles.orbitTagTopLeft,
          )}
        >
          {orbit.top}
        </span>
        <span
          className={joinClassNames(
            styles.orbitTag,
            isRight ? styles.orbitTagLeftRight : styles.orbitTagLeftLeft,
          )}
        >
          {orbit.left}
        </span>
        <span
          className={joinClassNames(
            styles.orbitTag,
            isRight ? styles.orbitTagRightRight : styles.orbitTagRightLeft,
          )}
        >
          {orbit.right}
        </span>
        <span
          className={joinClassNames(
            styles.orbitTag,
            isRight ? styles.orbitTagBottomRight : styles.orbitTagBottomLeft,
          )}
        >
          {orbit.bottom}
        </span>
      </div>
    </div>
  );
}

export default function AxzoDesignSystemCaseStudyPage({
  backHref = "/work",
  headingAccentColor = "#647654",
  work,
}) {
  const content = axzoDesignSystemCaseStudy;
  /** @type {import("react").CSSProperties & Record<string, string>} */
  const pageThemeStyles = {
    "--axzo-case-accent": headingAccentColor,
  };
  const tocTheme = {
    accentColor: "var(--axzo-case-accent)",
    backHref,
    backLabel: "返回",
    desktopShiftX: "30.5rem",
    desktopStickyTopOffset: "var(--axzo-page-gap)",
    desktopTopOffset: "0rem",
    mutedColor: "var(--portfolio-color-text-muted)",
    preferHistoryBack: false,
    titleColor: "var(--portfolio-semantic-title-color)",
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
              captionClassName={styles.projectBackgroundCaption}
              crop={content.projectBackground.imageCrop}
              frameClassName={styles.projectBackgroundFrame}
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
              <div className={styles.insightCanvas}>
                <div className={styles.insightTop}>
                  <OrbitDiagram orbit={content.insight.leftOrbit} variant="left" />
                  <div aria-hidden="true" className={styles.insightArrowHorizontal}>
                    <ArrowRightSoftIcon className={styles.insightArrowIcon} />
                  </div>
                  <OrbitDiagram orbit={content.insight.rightOrbit} variant="right" />
                </div>

                <div className={styles.insightCaptionRow}>
                  <p className={joinClassNames(styles.orbitCaption, styles.orbitCaptionLeft)}>
                    {content.insight.leftOrbit.caption}
                  </p>
                  <div aria-hidden="true" className={styles.insightCaptionSpacer} />
                  <p className={joinClassNames(styles.orbitCaption, styles.orbitCaptionRight)}>
                    {content.insight.rightOrbit.caption}
                  </p>
                </div>

                <div className={styles.insightBottomArea}>
                  <div aria-hidden="true" className={styles.insightArrowSplit}>
                    <span className={styles.insightArrowDiagonalLeft}>
                      <ArrowRightSoftIcon className={styles.insightArrowIcon} />
                    </span>
                    <span className={styles.insightArrowDiagonalRight}>
                      <ArrowRightSoftIcon className={styles.insightArrowIcon} />
                    </span>
                  </div>

                  <div className={styles.insightBottomFlow}>
                    <div className={styles.insightMessage}>{content.insight.message}</div>

                    <div aria-hidden="true" className={styles.insightArrowVertical}>
                      <ArrowRightSoftIcon className={styles.insightArrowIcon} />
                    </div>

                    <div className={styles.insightConclusion}>
                      {content.insight.conclusion}
                    </div>
                  </div>
                </div>
              </div>
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

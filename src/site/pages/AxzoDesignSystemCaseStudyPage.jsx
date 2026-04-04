import Image from "next/image";

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

export default function AxzoDesignSystemCaseStudyPage({ work }) {
  const content = axzoDesignSystemCaseStudy;

  return (
    <article className={styles.caseStudy}>
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
            />
          </div>
        </div>
      </section>

      <div className={styles.contentStack}>
        <section className={styles.section}>
          <SectionHeader
            title={content.projectBackground.title}
            description={content.projectBackground.description}
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
                  width={32}
                />
                <p className={styles.problemText}>{item.title}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <SectionHeader title={content.insight.title} description={content.insight.description} />
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
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <SectionHeader title={content.designGoal.title} description={content.designGoal.description} />
        </section>

        <section className={styles.section}>
          <SectionHeader title={content.exploration.title} description={content.exploration.description} />

          <article className={styles.storyBlock}>
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
              imageSrc={content.exploration.sections[0].imageSrc}
              ratio={content.exploration.sections[0].ratio}
              tone="soft"
            />
          </article>

          <article className={styles.storyBlock}>
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

        <section className={styles.section}>
          <SectionHeader title={content.practice.title} description={content.practice.description} />

          <div className={styles.practiceStack}>
            {content.practice.pages.map((page) => (
              <article className={styles.practiceBlock} key={page.theme}>
                <div className={styles.storyHeader}>
                  <p className={styles.themeLabel}>{page.theme}</p>
                  <div className={styles.storyCopy}>
                    <p className={styles.storyParagraph}>{page.description}</p>
                  </div>
                </div>

                <MediaPanel alt={page.imageAlt} imageSrc={page.imageSrc} ratio={page.ratio} />
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
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
    </article>
  );
}

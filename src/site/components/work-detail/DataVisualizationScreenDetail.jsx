import Image from "next/image";

import { dataVisualizationScreenDetail } from "../../data/data-visualization-screen-detail";
import styles from "../../styles/data-visualization-screen-detail.module.css";

const indicatorDemoCards = [
  {
    deltaLabel: "较昨日",
    deltaValue: "持平",
    label: "建设单位",
    value: "3",
  },
  {
    deltaLabel: "较1月",
    deltaTone: "positive",
    deltaValue: "-29个",
    label: "2月高风险工程",
    value: "198",
  },
];

const tradeBars = [
  { label: "普工", value: 0.93 },
  { label: "钢筋工", value: 0.88 },
  { label: "模板工", value: 0.78 },
  { label: "土建工", value: 0.66 },
  { label: "焊工", value: 0.78 },
  { label: "抹灰工", value: 0.66 },
  { label: "管道工", value: 0.44 },
  { label: "附着式升降脚手架工", value: 0.66 },
];

const ageGroups = [
  { female: 0.72, label: "61-70", male: 0.78 },
  { female: 0.84, label: "51-60", male: 0.74 },
  { female: 0.24, label: "41-50", male: 0.48 },
  { female: 0.78, label: "31-40", male: 0.48 },
  { female: 0.24, label: "21-30", male: 0.48 },
  { female: 0.82, label: "<=20", male: 0.74 },
];

const yearlyComparison = [
  { danger: 0.76, month: "07.06", safe: 0.92 },
  { danger: 0.66, month: "07.07", safe: 0.74 },
  { danger: 0.74, month: "07.08", safe: 0.92 },
  { danger: 0.74, month: "07.09", safe: 0.92 },
  { danger: 0.74, month: "07.10", safe: 0.92 },
  { danger: 0.74, month: "07.11", safe: 0.92 },
  { danger: 0.74, month: "07.12", safe: 0.92 },
  { danger: 0.74, month: "07.13", safe: 0.92 },
  { danger: 0.74, month: "07.14", safe: 0.92 },
  { danger: 0.74, month: "07.15", safe: 0.92 },
  { danger: 0.74, month: "07.16", safe: 0.92 },
  { danger: 0.74, month: "07.17", safe: 0.92 },
  { danger: 0.74, month: "07.18", safe: 0.92 },
  { danger: 0.74, month: "07.19", safe: 0.92 },
  { danger: 0.74, month: "07.20", safe: 0.92 },
];

const caseStudySections = [
  { id: "project-background", label: "项目背景" },
  { id: "problem-definition", label: "问题定义" },
  { id: "design-goals", label: "设计目标" },
  { id: "design-practice", label: "设计实践" },
  { id: "design-outcomes", label: "设计成果" },
  { id: "project-retrospective", label: "项目复盘" },
];

function DetailSection({ id = null, subtitle = null, title, children = null }) {
  return (
    <section
      className={`${styles.sectionBlock} ${styles.textRail}`}
      id={id}
    >
      <h2 className={styles.sectionTitle}>{title}</h2>
      {subtitle ? <p className={styles.sectionSubtitle}>{subtitle}</p> : null}
      {children}
    </section>
  );
}

function CaseStudyToc() {
  return (
    <aside className={styles.tocSection}>
      <div className={styles.tocInner}>
        <p className={styles.tocLabel}>目录</p>
        <nav aria-label="案例目录" className={styles.tocNav}>
          {caseStudySections.map((item) => (
            <a className={styles.tocLink} href={`#${item.id}`} key={item.id}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

function RecreatedIndicatorDemo() {
  return (
    <div className={styles.demoBoard}>
      <p className={styles.demoBoardLabel}>响应式</p>
      <div className={styles.indicatorGrid}>
        {indicatorDemoCards.map((card) => (
          <article className={styles.indicatorCard} key={card.label}>
            <div className={styles.indicatorCardFrame} />
            <p className={styles.indicatorCardLabel}>{card.label}</p>
            <p className={styles.indicatorCardValue}>
              {card.value}
              <span className={styles.indicatorCardUnit}>个</span>
            </p>
            <p className={styles.indicatorCardMeta}>
              <span>{card.deltaLabel}</span>
              <span
                className={
                  card.deltaTone === "positive"
                    ? styles.indicatorCardMetaPositive
                    : styles.indicatorCardMetaNeutral
                }
              >
                {card.deltaValue}
              </span>
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

function RecreatedResponsiveChartDemo() {
  return (
    <div className={styles.demoBoard}>
      <p className={styles.demoBoardLabel}>响应式</p>
      <div className={styles.chartPanel}>
        <div className={styles.chartPanelTop}>
          <section className={styles.chartInset}>
            <div className={styles.tradeRows}>
              {tradeBars.map((item) => (
                <div className={styles.tradeRow} key={item.label}>
                  <span className={styles.tradeLabel}>{item.label}</span>
                  <div className={styles.tradeTrack}>
                    <span
                      className={styles.tradeFill}
                      style={{ width: `${item.value * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.chartInset}>
            <div className={styles.ageHeader}>
              <span>男</span>
              <span>年龄</span>
              <span>女</span>
            </div>
            <div className={styles.ageRows}>
              {ageGroups.map((group) => (
                <div className={styles.ageRow} key={group.label}>
                  <div className={styles.ageTrack}>
                    <span
                      className={styles.ageFillMale}
                      style={{ width: `${group.male * 100}%` }}
                    />
                  </div>
                  <span className={styles.ageLabel}>{group.label}</span>
                  <div className={styles.ageTrack}>
                    <span
                      className={styles.ageFillFemale}
                      style={{ width: `${group.female * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className={styles.chartInset}>
          <div className={styles.chartLegend}>
            <span className={styles.legendItem}>
              <span className={styles.legendDotSafe} />
              风险企业
            </span>
            <span className={styles.legendItem}>
              <span className={styles.legendDotDanger} />
              在险风险企业
            </span>
            <span className={styles.chartTag}>近一年</span>
          </div>
          <div className={styles.comparisonChart}>
            {yearlyComparison.map((entry) => (
              <div className={styles.comparisonColumn} key={entry.month}>
                <div className={styles.comparisonBars}>
                  <span
                    className={styles.comparisonBarSafe}
                    style={{ height: `${entry.safe * 100}%` }}
                  />
                  <span
                    className={styles.comparisonBarDanger}
                    style={{ height: `${entry.danger * 100}%` }}
                  />
                </div>
                <span className={styles.comparisonLabel}>{entry.month}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function DataVisualizationScreenDetail() {
  const {
    background,
    goals,
    hero,
    outcomes,
    practice,
    problems,
    retrospective,
  } = dataVisualizationScreenDetail;

  return (
    <article className={styles.page}>
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
                width={1512}
              />
            </div>
          </div>
        </div>
      </section>

      <CaseStudyToc />

      <div className={styles.contentStack}>
        <DetailSection id="project-background" title={background.title}>
          {background.paragraphs.map((paragraph) => (
            <p className={styles.bodyText} key={paragraph}>
              {paragraph}
            </p>
          ))}

          <div className={styles.bodyGroup}>
            <p className={styles.bodyText}>{background.leadIn}</p>
            <ul className={styles.bulletList}>
              {background.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        </DetailSection>

        <section className={styles.sectionGroup}>
          <DetailSection id="problem-definition" title={problems.title}>
            <p className={styles.bodyText}>{problems.intro}</p>
          </DetailSection>

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
          <DetailSection id="design-goals" title={goals.title}>
            <p className={styles.bodyText}>{goals.intro}</p>
          </DetailSection>

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
          <DetailSection
            id="design-practice"
            subtitle={practice.subtitle}
            title={practice.title}
          />

          <section className={styles.practiceSection}>
            <div className={`${styles.sectionBlock} ${styles.textRail}`}>
              <p className={styles.sectionEyebrow}>
                {practice.visualLanguage.eyebrow}
              </p>
              <div className={styles.paragraphStack}>
                {practice.visualLanguage.paragraphs.map((paragraph) => (
                  <p className={styles.bodyText} key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

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
                    width={900}
                  />
                </div>

                {practice.visualLanguage.gallery.thumbnails.map((thumbnail, index) => (
                  <div
                    className={`${styles.practiceGalleryThumb} ${styles[`practiceGalleryThumb${index + 1}`]}`}
                    key={thumbnail.imageSrc}
                  >
                    <Image
                      alt={thumbnail.imageAlt}
                      className={styles.figureImage}
                      fill
                      sizes="(max-width: 900px) 45vw, 420px"
                      src={thumbnail.imageSrc}
                    />
                  </div>
                ))}
              </div>
              <figcaption className={styles.figureCaption}>
                {practice.visualLanguage.gallery.caption}
              </figcaption>
            </figure>
          </section>

          <section className={styles.practiceSection}>
            <div className={`${styles.sectionBlock} ${styles.textRail}`}>
              <p className={styles.sectionEyebrow}>
                {practice.systemization.eyebrow}
              </p>
              <div className={styles.paragraphStack}>
                {practice.systemization.paragraphs.map((paragraph) => (
                  <p className={styles.bodyText} key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className={styles.demoStack}>
              <figure className={styles.figureBlock}>
                <div className={styles.demoFrame}>
                  {/* Figma 这里没有吐出可下载素材，所以这一块按截图结构做了可维护的前端重建。 */}
                  <RecreatedIndicatorDemo />
                </div>
                <figcaption className={styles.figureCaption}>
                  {practice.systemization.demos[0].caption}
                </figcaption>
              </figure>

              <figure className={styles.figureBlock}>
                <div className={styles.demoFrame}>
                  {/* 这一块同样基于 Figma 截图重建，优先保留整体层级、配色和信息节奏。 */}
                  <RecreatedResponsiveChartDemo />
                </div>
                <figcaption className={styles.figureCaption}>
                  {practice.systemization.demos[1].caption}
                </figcaption>
              </figure>
            </div>
          </section>
        </section>

        <section className={styles.sectionGroup}>
          <DetailSection id="design-outcomes" title={outcomes.title}>
            <p className={styles.bodyText}>{outcomes.intro}</p>
          </DetailSection>

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
          <DetailSection id="project-retrospective" title={retrospective.title}>
            <p className={styles.bodyText}>{retrospective.intro}</p>
          </DetailSection>

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
    </article>
  );
}

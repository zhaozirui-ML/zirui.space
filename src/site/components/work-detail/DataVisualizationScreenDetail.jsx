import Image from "next/image";

import { dataVisualizationScreenDetail } from "../../data/data-visualization-screen-detail";
import styles from "../../styles/data-visualization-screen-detail.module.css";

function DetailSection({ title, children }) {
  return (
    <section className={styles.sectionBlock}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

export default function DataVisualizationScreenDetail() {
  const { background, goals, hero, problems } = dataVisualizationScreenDetail;

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
                width={1512}
              />
            </div>
          </div>
        </div>
      </section>

      <div className={styles.contentStack}>
        <DetailSection title={background.title}>
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
          <DetailSection title={problems.title}>
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

          <p className={styles.bodyText}>{problems.summary}</p>
        </section>

        <section className={styles.sectionGroup}>
          <DetailSection title={goals.title}>
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
      </div>
    </article>
  );
}

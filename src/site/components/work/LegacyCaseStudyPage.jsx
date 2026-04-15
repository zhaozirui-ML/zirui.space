import Link from "next/link";
import styles from "../../styles/legacy-case-study.module.css";
import shellStyles from "../../styles/site-shell.module.css";

export default function LegacyCaseStudyPage({ backHref = "/work", caseStudy }) {
  /** @type {import("react").CSSProperties & Record<string, string>} */
  const heroStyle = {
    "--legacy-case-study-accent": caseStudy.accentColor,
  };

  return (
    <article className={styles.page} style={heroStyle}>
      <section className={styles.heroFullBleed}>
        <div className={styles.heroBackdrop} />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <Link className={shellStyles.backLink} href={backHref}>
              返回
            </Link>
            <p className={styles.eyebrow}>{caseStudy.category}</p>
            <h1 className={styles.heroTitle}>{caseStudy.title}</h1>
            <p className={styles.heroSubtitle}>{caseStudy.subtitle}</p>

            <section className={styles.summaryCard}>
              <p className={styles.summaryBody}>
                <span>「{caseStudy.title}」暂未迁移，请前往 </span>
                <Link
                  className={shellStyles.inlineLink}
                  href={caseStudy.framerUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  Framer
                </Link>
                <span> 查看完整内容。</span>
              </p>
            </section>
          </div>
        </div>
      </section>
    </article>
  );
}

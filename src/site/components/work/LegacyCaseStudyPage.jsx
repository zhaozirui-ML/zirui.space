import Link from "next/link";

import DetailBackLink from "../DetailBackLink";
import styles from "../../styles/legacy-case-study.module.css";
import shellStyles from "../../styles/site-shell.module.css";

export default function LegacyCaseStudyPage({
  backHref = "/work",
  caseStudy,
  language = "zh",
}) {
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
            <DetailBackLink
              ariaLabel={language === "en" ? "Back to Work" : "返回作品"}
              className={styles.heroBackLink}
              href={backHref}
              label={language === "en" ? "Back" : "返回"}
            />
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

import Link from "next/link";

import DrawingLedgerCaseStudy from "../components/work/DrawingLedgerCaseStudy";
import { getWorkBySlug } from "../lib/get-work-by-slug";
import styles from "../styles/site-shell.module.css";

export default function WorkDetailPage({ slug }) {
  const work = getWorkBySlug(slug);

  if (!work) {
    return null;
  }

  if (work.slug === "drawing-ledger-2-0") {
    return (
      <div className={styles.detailPage}>
        <DrawingLedgerCaseStudy />
      </div>
    );
  }

  return (
    <div className={[styles.pageStack, styles.detailPage].join(" ")}>
      <section className={styles.pageIntro}>
        <p className={styles.pageEyebrow}>{work.category}</p>
        <h1 className={styles.pageTitle}>{work.title}</h1>
        <p className={styles.pageDescription}>{work.detailSummary}</p>
        <p className={styles.pageDescription}>
          当前路径已经固定为{" "}
          <Link className={styles.inlineLink} href={`/work/${work.slug}`}>
            /work/{work.slug}
          </Link>
          ，后续可以直接在这个骨架上接案例长页，不需要重新改路由。
        </p>
      </section>

      <section className={styles.placeholderPanel}>
        <h2 className={styles.placeholderTitle}>建议后续在这里补的内容</h2>
        <ol className={styles.placeholderList}>
          <li>案例封面和项目摘要。</li>
          <li>问题背景、目标、过程和结果。</li>
          <li>Figma 长页里需要的图片、图表和说明文字。</li>
        </ol>
      </section>
    </div>
  );
}

import Link from "next/link";

import { CaseStudyHeadingOne } from "../components/case-study/CaseStudyHeading";
import DrawingLedgerCaseStudy from "../components/work/DrawingLedgerCaseStudy";
import DataVisualizationScreenDetail from "../components/work-detail/DataVisualizationScreenDetail";
import { getWorkBySlug } from "../lib/get-work-by-slug";
import AxzoDesignSystemCaseStudyPage from "./AxzoDesignSystemCaseStudyPage";
import styles from "../styles/site-shell.module.css";

export default function WorkDetailPage({ slug }) {
  const work = getWorkBySlug(slug);

  if (!work) {
    return null;
  }

  // 先只把已经进入 Figma 对照实现的案例切到专用长页，其他案例继续保留通用骨架。
  if (work.slug === "drawing-ledger-2-0") {
    return (
      <div className={styles.detailPage}>
        <DrawingLedgerCaseStudy />
      </div>
    );
  }

  if (work.slug === "data-visualization-screen") {
    return (
      <DataVisualizationScreenDetail
        headingAccentColor={work.detailTheme?.headingAccentColor}
      />
    );
  }

  if (work.slug === "axzo-design-system") {
    return (
      <AxzoDesignSystemCaseStudyPage
        headingAccentColor={work.detailTheme?.headingAccentColor}
        work={work}
      />
    );
  }

  return (
    <div className={[styles.pageStack, styles.detailPage].join(" ")}>
      <section className={styles.pageIntro}>
        <p className={styles.pageEyebrow}>{work.category}</p>
        <CaseStudyHeadingOne
          className={styles.pageIntroHeading}
          descriptions={work.detailSummary}
          title={work.title}
          titleAs="h1"
        >
          <p className={styles.pageDescription}>
            当前路径已经固定为{" "}
            <Link className={styles.inlineLink} href={`/work/${work.slug}`}>
              /work/{work.slug}
            </Link>
            ，后续可以直接在这个骨架上接案例长页，不需要重新改路由。
          </p>
        </CaseStudyHeadingOne>
      </section>

      <section className={styles.placeholderPanel}>
        <CaseStudyHeadingOne
          className={styles.placeholderHeading}
          title="建议后续在这里补的内容"
          titleAs="h2"
        >
          <ol className={styles.placeholderList}>
            <li>案例封面和项目摘要。</li>
            <li>问题背景、目标、过程和结果。</li>
            <li>Figma 长页里需要的图片、图表和说明文字。</li>
          </ol>
        </CaseStudyHeadingOne>
      </section>
    </div>
  );
}

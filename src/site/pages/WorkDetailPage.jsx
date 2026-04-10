import Image from "next/image";
import Link from "next/link";

import { CaseStudyHeadingOne } from "../components/case-study/CaseStudyHeading";
import DrawingLedgerCaseStudy from "../components/work/DrawingLedgerCaseStudy";
import DataVisualizationScreenDetail from "../components/work-detail/DataVisualizationScreenDetail";
import { getWorkBySlug } from "../lib/get-work-by-slug";
import AxzoDesignSystemCaseStudyPage from "./AxzoDesignSystemCaseStudyPage";
import styles from "../styles/site-shell.module.css";

function getLegacyPreviewImage(work) {
  if (!work?.workPreview) {
    return null;
  }

  if (work.workPreview.type === "framed") {
    return {
      alt: work.workPreview.alt,
      ratio: work.workPreview.foregroundAspectRatio ?? work.workPreview.ratio,
      src: work.workPreview.foregroundSrc ?? work.workPreview.backgroundSrc,
    };
  }

  return {
    alt: work.workPreview.alt,
    ratio: work.workPreview.ratio,
    src: work.workPreview.src,
  };
}

export default function WorkDetailPage({ returnHref = "/work", slug }) {
  const work = getWorkBySlug(slug);

  if (!work) {
    return null;
  }

  // 这些案例页已经在仓库历史里有成型内容，当前分支只负责把它们重新接回统一路由。
  if (slug === "drawing-ledger-2-0") {
    return <DrawingLedgerCaseStudy backHref={returnHref} />;
  }

  if (slug === "data-visualization-screen") {
    return (
      <DataVisualizationScreenDetail
        backHref={returnHref}
        headingAccentColor={work.detailTheme?.headingAccentColor}
      />
    );
  }

  if (slug === "axzo-design-system") {
    return (
      <AxzoDesignSystemCaseStudyPage
        backHref={returnHref}
        headingAccentColor={work.detailTheme?.headingAccentColor}
        work={work}
      />
    );
  }

  const hasLegacyCaseStudy = typeof work.legacyUrl === "string" && work.legacyUrl.length > 0;
  const legacyPreview = getLegacyPreviewImage(work);
  const legacyPreviewStyle = legacyPreview
    ? /** @type {any} */ ({ "--legacy-preview-ratio": legacyPreview.ratio })
    : undefined;

  return (
    <div className={[styles.pageStack, styles.detailPage].join(" ")}>
      <section className={styles.pageIntro}>
        <Link className={styles.backLink} href={returnHref}>
          返回
        </Link>
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
          {hasLegacyCaseStudy ? (
            <p className={styles.pageDescription}>
              这个项目的完整旧版案例目前保留在 Framer。当前站内先承接统一入口，完整内容可以通过下方按钮继续查看。
            </p>
          ) : null}
        </CaseStudyHeadingOne>
      </section>

      {hasLegacyCaseStudy && legacyPreview ? (
        <section className={styles.legacyOverviewPanel}>
          <div
            className={styles.legacyPreviewFrame}
            style={legacyPreviewStyle}
          >
            <Image
              alt={legacyPreview.alt}
              className={styles.legacyPreviewImage}
              fill
              priority
              sizes="(max-width: 900px) calc(100vw - 2rem), 720px"
              src={legacyPreview.src}
              unoptimized
            />
          </div>

          <div className={styles.legacyOverviewContent}>
            <p className={styles.pageEyebrow}>Legacy Case Study</p>
            <h2 className={styles.placeholderTitle}>Current local entry</h2>
            <p className={styles.pageDescription}>
              这个项目已经先接入到当前作品集里，方便你统一展示项目列表。完整过程稿和旧版长页内容，暂时继续保留在 Framer。
            </p>

            <dl className={styles.legacyFactsGrid}>
              <div className={styles.legacyFactCard}>
                <dt className={styles.legacyFactLabel}>Year</dt>
                <dd className={styles.legacyFactValue}>{work.year}</dd>
              </div>
              <div className={styles.legacyFactCard}>
                <dt className={styles.legacyFactLabel}>Category</dt>
                <dd className={styles.legacyFactValue}>{work.category}</dd>
              </div>
              <div className={styles.legacyFactCard}>
                <dt className={styles.legacyFactLabel}>Current Format</dt>
                <dd className={styles.legacyFactValue}>Local overview + Framer full case study</dd>
              </div>
            </dl>

            <a
              className={styles.primaryLinkButton}
              href={work.legacyUrl}
              rel="noreferrer"
              target="_blank"
            >
              View full legacy case study
            </a>
          </div>
        </section>
      ) : null}

      <section className={styles.placeholderPanel}>
        <CaseStudyHeadingOne
          className={styles.placeholderHeading}
          title={hasLegacyCaseStudy ? "Suggested next migration steps" : "建议后续在这里补的内容"}
          titleAs="h2"
        >
          <ol className={styles.placeholderList}>
            <li>先把项目角色、背景和最终结果整理成 3 到 5 句稳定介绍。</li>
            <li>补一张适合详情页首屏的大封面图，而不是继续只用卡片缩略图。</li>
            <li>把 Framer 长页里的过程内容拆成问题、方案、结果三个章节逐步迁回站内。</li>
          </ol>
        </CaseStudyHeadingOne>
      </section>
    </div>
  );
}

import Link from "next/link";

import { CaseStudyHeadingOne } from "../components/case-study/CaseStudyHeading";
import DetailTranslationPlaceholder from "../components/DetailTranslationPlaceholder";
import DrawingLedgerCaseStudy from "../components/work/DrawingLedgerCaseStudy";
import DataVisualizationScreenDetail from "../components/work-detail/DataVisualizationScreenDetail";
import { untranslatedDetailDictionary } from "../i18n/dictionary";
import { getLocalizedValue } from "../i18n/get-localized-value";
import { getWorkBySlug } from "../lib/get-work-by-slug";
import AxzoDesignSystemCaseStudyPage from "./AxzoDesignSystemCaseStudyPage";
import styles from "../styles/site-shell.module.css";

/**
 * @param {{
 *   language?: import("../i18n/config").SiteLanguage,
 *   returnHref?: string,
 *   slug: string,
 * }} props
 */
export default function WorkDetailPage({ language = "zh", returnHref = "/work", slug }) {
  const work = getWorkBySlug(slug);

  if (!work) {
    return null;
  }

  if (language === "en") {
    return (
      <DetailTranslationPlaceholder
        backHref={returnHref}
        backLabel={untranslatedDetailDictionary.backToWork}
        description={untranslatedDetailDictionary.description}
        eyebrow={untranslatedDetailDictionary.workEyebrow}
        language={language}
        noteItems={untranslatedDetailDictionary.noteItems}
        noteTitle={untranslatedDetailDictionary.noteTitle}
        title={untranslatedDetailDictionary.workTitle}
      />
    );
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
        language={language}
        work={work}
      />
    );
  }

  return (
    <div className={[styles.pageStack, styles.detailPage].join(" ")}>
      <section className={styles.pageIntro}>
        <Link className={styles.backLink} href={returnHref}>
          返回
        </Link>
        <p className={styles.pageEyebrow}>{getLocalizedValue(work.category, language)}</p>
        <CaseStudyHeadingOne
          className={styles.pageIntroHeading}
          descriptions={getLocalizedValue(work.detailSummary, language)}
          title={getLocalizedValue(work.title, language)}
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

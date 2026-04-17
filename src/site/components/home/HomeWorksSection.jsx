import Link from "next/link";
import { Blocks, LayoutDashboard, Network } from "lucide-react";

import { homeWorkItems } from "../../data/work-items";
import { homePageDictionary } from "../../i18n/dictionary";
import { getLocalizedValue } from "../../i18n/get-localized-value";
import ResponsiveWorkCardMedia from "./ResponsiveWorkCardMedia";
import styles from "../../styles/home-page.module.css";

const homeCategoryIcons = {
  blocks: Blocks,
  layoutDashboard: LayoutDashboard,
  network: Network,
};

function HomeCategoryGlyph({ iconName }) {
  const IconComponent = homeCategoryIcons[iconName] ?? Network;

  return (
    <IconComponent
      aria-hidden="true"
      className={styles.workCategoryIcon}
      size={14.5}
      strokeWidth={1.95}
    />
  );
}

/**
 * 首页作品区块会跟随语言切换标题和按钮文案。
 *
 * @param {{ language: import("../../i18n/config").SiteLanguage }} props
 */
export default function HomeWorksSection({ language }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          {getLocalizedValue(homePageDictionary.workSectionTitle, language)}
        </h2>
        <p className={styles.sectionSubtitle}>
          {getLocalizedValue(homePageDictionary.workSectionSubtitle, language)}
        </p>
      </div>

      <div className={styles.workList}>
        {homeWorkItems.map((item) => {
          return (
            <article
              className={[
                styles.workCard,
                item.homeCardVariant === "featured"
                  ? styles.workCardFeatured
                  : styles.workCardStandard,
                item.homeMediaPosition === "start"
                  ? styles.workCardMediaStart
                  : styles.workCardMediaEnd,
              ]
                .filter(Boolean)
                .join(" ")}
              key={item.slug}
            >
              <div
                className={[
                  styles.workCardContent,
                  item.slug === "drawing-ledger-2-0" ? "brand-diffuse-surface" : "",
                  item.slug === "drawing-ledger-2-0" ? styles.workCardContentLeadAccent : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className={styles.workCategoryRow}>
                  <HomeCategoryGlyph iconName={item.homeIconName} />
                  <p className={styles.workCategoryLabel}>
                    {getLocalizedValue(item.homeCategory ?? item.category, language)}
                  </p>
                </div>

                <div className={styles.workCopyStack}>
                  <h3 className={styles.workCardTitle}>
                    {getLocalizedValue(item.homeTitle ?? item.title, language)}
                  </h3>
                  <p className={styles.workCardSummary}>
                    {getLocalizedValue(item.homeSummary ?? item.summary, language)}
                  </p>
                </div>

                <Link
                  className={styles.workCardButton}
                  href={{ pathname: `/work/${item.slug}`, query: { from: "/" } }}
                >
                  {getLocalizedValue(homePageDictionary.workSectionViewProject, language)}
                </Link>
              </div>

              <ResponsiveWorkCardMedia item={item} />
            </article>
          );
        })}
      </div>
    </section>
  );
}

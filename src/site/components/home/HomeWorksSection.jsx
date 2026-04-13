import Image from "next/image";
import Link from "next/link";

import { homeWorkItems } from "../../data/work-items";
import { homePageDictionary } from "../../i18n/dictionary";
import { getLocalizedValue } from "../../i18n/get-localized-value";
import styles from "../../styles/home-page.module.css";

function getForegroundImageStyle(homeMediaFrame) {
  return /** @type {any} */ ({
    ...(homeMediaFrame?.foregroundImageHeight
      ? { height: homeMediaFrame.foregroundImageHeight }
      : {}),
    ...(homeMediaFrame?.foregroundImageLeft
      ? { left: homeMediaFrame.foregroundImageLeft }
      : {}),
    ...(homeMediaFrame?.foregroundImageMaxWidth
      ? { maxWidth: homeMediaFrame.foregroundImageMaxWidth }
      : {}),
    ...(homeMediaFrame?.foregroundImageTop
      ? { top: homeMediaFrame.foregroundImageTop }
      : {}),
    ...(homeMediaFrame?.foregroundImageWidth
      ? { width: homeMediaFrame.foregroundImageWidth }
      : {}),
  });
}

function hasCustomForegroundImageLayout(homeMediaFrame) {
  return Boolean(
    homeMediaFrame?.foregroundImageHeight ||
      homeMediaFrame?.foregroundImageLeft ||
      homeMediaFrame?.foregroundImageMaxWidth ||
      homeMediaFrame?.foregroundImageTop ||
      homeMediaFrame?.foregroundImageWidth,
  );
}

function getForegroundImageDimensions(homeMediaFrame) {
  if (!hasCustomForegroundImageLayout(homeMediaFrame)) {
    return null;
  }

  return {
    height: 269,
    width: 404,
  };
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
        {homeWorkItems.map((item) => (
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
                <Image
                  alt=""
                  aria-hidden="true"
                  height={16}
                  src="/site/home/work-category-icon.svg"
                  unoptimized
                  width={16}
                />
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

            <div className={styles.workCardMedia}>
              {item.homeMediaFrame ? (
                <>
                  <Image
                    alt={item.homeImageAlt}
                    className={styles.workCardImage}
                    fill
                    priority={item.slug === "drawing-ledger-2-0"}
                    sizes="(max-width: 900px) 100vw, 460px"
                    src={item.homeMediaFrame.backgroundSrc}
                    unoptimized
                  />
                  <div
                    className={styles.workCardForeground}
                    style={{
                      aspectRatio: item.homeMediaFrame.foregroundAspectRatio,
                      borderRadius: item.homeMediaFrame.foregroundRadius,
                      boxShadow: item.homeMediaFrame.foregroundShadow,
                      height: item.homeMediaFrame.foregroundHeight,
                      left: item.homeMediaFrame.foregroundLeft,
                      top: item.homeMediaFrame.foregroundTop,
                      transform: item.homeMediaFrame.foregroundTransform,
                      width: item.homeMediaFrame.foregroundWidth,
                    }}
                  >
                    {hasCustomForegroundImageLayout(item.homeMediaFrame) ? (
                      <Image
                        alt=""
                        aria-hidden="true"
                        className={styles.workCardForegroundImage}
                        height={getForegroundImageDimensions(item.homeMediaFrame)?.height ?? 269}
                        priority={item.slug === "drawing-ledger-2-0"}
                        sizes="(max-width: 900px) 100vw, 404px"
                        src={item.homeMediaFrame.foregroundSrc}
                        style={getForegroundImageStyle(item.homeMediaFrame)}
                        unoptimized
                        width={getForegroundImageDimensions(item.homeMediaFrame)?.width ?? 404}
                      />
                    ) : (
                      <Image
                        alt=""
                        aria-hidden="true"
                        className={styles.workCardForegroundImage}
                        fill
                        priority={item.slug === "drawing-ledger-2-0"}
                        sizes="(max-width: 900px) 100vw, 360px"
                        src={item.homeMediaFrame.foregroundSrc}
                        unoptimized
                      />
                    )}
                  </div>
                </>
              ) : (
                <Image
                  alt={item.homeImageAlt}
                  className={[
                    styles.workCardImage,
                    item.slug === "drawing-ledger-2-0" ? styles.workCardImageContain : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  fill
                  priority={item.slug === "drawing-ledger-2-0"}
                  sizes="(max-width: 900px) 100vw, 460px"
                  src={item.homeImageSrc}
                  // Supabase 测试图先跳过 Next 图片代理，避免本地开发环境误判上游地址。
                  unoptimized
                />
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

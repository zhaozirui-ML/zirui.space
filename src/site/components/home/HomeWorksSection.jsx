import Image from "next/image";
import Link from "next/link";

import { homeWorkItems } from "../../data/work-items";
import styles from "../../styles/home-page.module.css";

export default function HomeWorksSection() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Recent Works</h2>
        <p className={styles.sectionSubtitle}>See what I do</p>
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
                  {item.homeCategory ?? item.category}
                </p>
              </div>

              <div className={styles.workCopyStack}>
                <h3 className={styles.workCardTitle}>{item.homeTitle ?? item.title}</h3>
                <p className={styles.workCardSummary}>
                  {item.homeSummary ?? item.summary}
                </p>
              </div>

              <Link
                className={styles.workCardButton}
                href={{ pathname: `/work/${item.slug}`, query: { from: "/" } }}
              >
                View Project
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

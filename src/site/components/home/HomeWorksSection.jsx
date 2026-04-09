import Image from "next/image";
import Link from "next/link";

import { homeWorkItems } from "../../data/work-items";
import styles from "../../styles/home-page.module.css";

export default function HomeWorksSection() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Works</h2>
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
                查看案例
              </Link>
            </div>

            <div className={styles.workCardMedia}>
              <Image
                alt={item.homeImageAlt}
                className={[
                  styles.workCardImage,
                  item.slug === "drawing-ledger-2-0" ? styles.workCardImageContain : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                fill
                sizes="(max-width: 900px) 100vw, 460px"
                src={item.homeImageSrc}
                // Supabase 测试图先跳过 Next 图片代理，避免本地开发环境误判上游地址。
                unoptimized
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

import Link from "next/link";

import { workItems } from "../data/work-items";
import styles from "../styles/site-shell.module.css";

export default function WorkIndexPage() {
  return (
    <div className={styles.pageStack}>
      <section className={styles.pageIntro}>
        <p className={styles.pageEyebrow}>Work</p>
        <h1 className={styles.pageTitle}>作品页路由骨架已经先搭起来了</h1>
        <p className={styles.pageDescription}>
          这一步先把作品数据、列表页和 3 个详情页路径固定下来。后面新首页和
          `/work` 会共用同一份数据，避免再次拆结构。
        </p>
      </section>

      <section className={styles.cardGrid}>
        {workItems.map((item) => (
          <Link
            className={styles.workCard}
            href={{ pathname: `/work/${item.slug}`, query: { from: "/work" } }}
            key={item.slug}
          >
            <div className={styles.workCardMeta}>
              <p className={styles.workCardMetaLabel}>{item.category}</p>
              <p className={styles.workCardMetaYear}>{item.year}</p>
            </div>
            <h2 className={styles.workCardTitle}>{item.title}</h2>
            <p className={styles.workCardSummary}>{item.summary}</p>
            <div className={styles.workCardFooter}>
              <p className={styles.workCardPath}>/work/{item.slug}</p>
              <span className={styles.workCardCta}>查看详情骨架</span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}

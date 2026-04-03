import styles from "../styles/site-shell.module.css";

export default function BlogPage() {
  return (
    <div className={styles.pageStack}>
      <section className={styles.pageIntro}>
        <p className={styles.pageEyebrow}>Blog</p>
        <h1 className={styles.pageTitle}>Blog 页面骨架已预留</h1>
        <p className={styles.pageDescription}>
          这一版先把真实路由建好，后面你可以按文章目录、分类和文章详情继续往里填。
        </p>
      </section>

      <section className={styles.placeholderPanel}>
        <h2 className={styles.placeholderTitle}>后续建议按这三个层次补</h2>
        <ol className={styles.placeholderList}>
          <li>文章列表页：负责文章封面、标题、发布时间和摘要。</li>
          <li>文章详情页：后续建议统一放在 `/blog/[slug]`。</li>
          <li>内容数据层：和作品数据一样，集中管理而不是散落在页面里。</li>
        </ol>
      </section>
    </div>
  );
}

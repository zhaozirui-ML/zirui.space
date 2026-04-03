import styles from "../styles/site-shell.module.css";

export default function AboutPage() {
  return (
    <div className={styles.pageStack}>
      <section className={styles.pageIntro}>
        <p className={styles.pageEyebrow}>About</p>
        <h1 className={styles.pageTitle}>About 页面骨架已预留</h1>
        <p className={styles.pageDescription}>
          这里后面适合承接个人介绍、经历、服务方式和联系方式，不需要再从首页里硬拆。
        </p>
      </section>

      <section className={styles.placeholderPanel}>
        <h2 className={styles.placeholderTitle}>这一页后面可以继续拆成</h2>
        <ol className={styles.placeholderList}>
          <li>个人简介和方法论。</li>
          <li>经历时间线或精选项目背景。</li>
          <li>联系方式、合作说明和外链入口。</li>
        </ol>
      </section>
    </div>
  );
}

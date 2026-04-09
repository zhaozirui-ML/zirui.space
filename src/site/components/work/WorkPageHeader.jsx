import styles from "./work-components.module.css";

export default function WorkPageHeader() {
  return (
    <section className={styles.pageIntro}>
      <h1 className={styles.pageTitle}>Works</h1>
      <p className={styles.pageSubtitle}>See what I do</p>
    </section>
  );
}

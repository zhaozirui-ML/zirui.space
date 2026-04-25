import styles from "../../styles/home-page.module.css";

export default function HomeSkillsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.skillManifestoBlock}>
        <p className={styles.skillManifestoLabel}>How I Work</p>
        <p className={styles.skillManifestoText}>
          I <span className={styles.skillManifestoEmphasis}>structure complexity</span>,{" "}
          <span className={styles.skillManifestoEmphasis}>
            validate critical interactions early
          </span>
          , and <span className={styles.skillManifestoEmphasis}>design for delivery</span> so
          teams can ship systems that are clearer to use, easier to build, and stronger in
          the long run.
        </p>
      </div>
    </section>
  );
}

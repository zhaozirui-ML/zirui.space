import { ArrowUpRight } from "lucide-react";

import { getLocalizedValue } from "../../i18n/get-localized-value";
import styles from "./work-components.module.css";

export default function WorkSideProjectsPanel({ items, language }) {
  return (
    <div className={styles.sideProjectsList}>
      {items.map((item) => {
        const CardTag = item.href ? "a" : "article";

        return (
          <CardTag
            className={styles.sideProjectCard}
            data-interactive={item.href ? "true" : "false"}
            href={item.href}
            key={item.id}
            rel={item.href ? "noreferrer" : undefined}
            target={item.href ? "_blank" : undefined}
          >
            <div className={styles.sideProjectCopy}>
              <h2 className={styles.sideProjectTitle}>
                {getLocalizedValue(item.title, language)}
              </h2>
              <p className={styles.sideProjectSubtitle}>
                {getLocalizedValue(item.subtitle, language)}
              </p>
            </div>

            <div className={styles.sideProjectLink}>
              <span className={styles.sideProjectPath}>{item.path}</span>
              <ArrowUpRight
                aria-hidden="true"
                className={styles.sideProjectLinkIcon}
                size={14}
                strokeWidth={1.9}
              />
            </div>
          </CardTag>
        );
      })}
    </div>
  );
}

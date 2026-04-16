import Image from "next/image";
import Link from "next/link";

import { workIndexDictionary } from "../../i18n/dictionary";
import { getLocalizedValue } from "../../i18n/get-localized-value";
import { joinClassNames } from "./join-class-names";
import styles from "./work-components.module.css";

function WorkProjectTag({ text }) {
  return <span className={styles.tag}>{text}</span>;
}

function WorkProjectPreview({ item, prioritizeMedia = false }) {
  const preview = item.workPreview;
  const previewStyle = /** @type {any} */ ({
    "--work-preview-ratio": preview.ratio,
  });

  if (preview.type === "framed") {
    const overlayStyle = /** @type {any} */ ({
      "--work-preview-overlay-ratio": preview.foregroundAspectRatio,
      "--work-preview-overlay-shadow": preview.shadow,
      "--work-preview-overlay-width": preview.foregroundWidth,
    });

    return (
      <div className={styles.previewFrame} style={previewStyle}>
        <Image
          alt={preview.alt}
          className={styles.previewImage}
          fill
          loading={prioritizeMedia ? "eager" : undefined}
          sizes="(max-width: 900px) calc(100vw - 4rem), 354px"
          src={preview.backgroundSrc}
          unoptimized
        />
        <div className={styles.previewOverlay} style={overlayStyle}>
          <Image
            alt=""
            aria-hidden="true"
            className={styles.previewOverlayImage}
            fill
            loading={prioritizeMedia ? "eager" : undefined}
            sizes="(max-width: 900px) calc((100vw - 4rem) * 0.85), 302px"
            src={preview.foregroundSrc}
            unoptimized
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.previewFrame} style={previewStyle}>
      <Image
        alt={preview.alt}
        className={styles.previewImage}
        fill
        loading={prioritizeMedia ? "eager" : undefined}
        sizes={
          item.workCardVariant === "compact"
            ? "(max-width: 900px) calc(100vw - 4rem), 354px"
            : "(max-width: 900px) calc(100vw - 4rem), 782px"
        }
        src={preview.src}
        unoptimized
      />
    </div>
  );
}

export default function WorkProjectCard({ item, language, prioritizeMedia = false }) {
  const title = getLocalizedValue(item.title, language);

  return (
    <Link
      className={joinClassNames(
        styles.projectCard,
        item.workCardVariant === "compact"
          ? styles.projectCardCompact
          : styles.projectCardFeature,
      )}
      href={{ pathname: `/work/${item.slug}`, query: { from: "/work" } }}
    >
      {/* 只让真正首屏的主案例图优先加载，避免后续卡片和它一起争抢带宽。 */}
      <WorkProjectPreview item={item} prioritizeMedia={prioritizeMedia} />

      <div className={styles.projectContent}>
        <div className={styles.projectCopy}>
          <h2 className={styles.projectTitle}>{title}</h2>
          <p className={styles.projectSummary}>{getLocalizedValue(item.summary, language)}</p>
        </div>

        <div
          className={styles.projectMeta}
          aria-label={`${title} ${getLocalizedValue(workIndexDictionary.metadataAriaLabel, language)}`}
        >
          {item.workTags.map((tag) => (
            <WorkProjectTag key={`${item.slug}-${tag}`} text={tag} />
          ))}
        </div>
      </div>
    </Link>
  );
}

import Image from "next/image";
import Link from "next/link";

import { joinClassNames } from "./join-class-names";
import styles from "./work-components.module.css";

function WorkProjectTag({ text }) {
  return <span className={styles.tag}>{text}</span>;
}

function WorkProjectPreview({ item }) {
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
          loading="eager"
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
            loading="eager"
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
        loading="eager"
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

export default function WorkProjectCard({ item }) {
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
      <WorkProjectPreview item={item} />

      <div className={styles.projectContent}>
        <div className={styles.projectCopy}>
          <h2 className={styles.projectTitle}>{item.title}</h2>
          <p className={styles.projectSummary}>{item.summary}</p>
        </div>

        <div className={styles.projectMeta} aria-label={`${item.title} metadata`}>
          {item.workTags.map((tag) => (
            <WorkProjectTag key={`${item.slug}-${tag}`} text={tag} />
          ))}
        </div>
      </div>
    </Link>
  );
}

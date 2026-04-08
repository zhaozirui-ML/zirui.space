import Image from "next/image";
import Link from "next/link";

import Button from "../../../design-system/components/Button";
import { workItems, workPageRows } from "../data/work-items";
import styles from "../styles/work-index-page.module.css";

const workTabs = [
  {
    iconSrc: "/site/work/index/tab-professional-work.svg",
    id: "professional-work",
    isActive: true,
    label: "Professional Work",
  },
  {
    iconSrc: "/site/work/index/tab-explorations.svg",
    id: "explorations",
    isActive: false,
    label: "Explorations",
  },
  {
    iconSrc: "/site/work/index/tab-side-projects.svg",
    id: "side-projects",
    isActive: false,
    label: "Side Projects",
  },
];

function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

function ProjectTag({ text }) {
  return <span className={styles.tag}>{text}</span>;
}

function WorkTabChip({ tab }) {
  return (
    <li>
      <Button
        aria-current={tab.isActive ? "page" : undefined}
        as="div"
        className={joinClassNames(
          styles.tabChip,
          tab.isActive ? styles.tabChipActive : styles.tabChipInactive,
        )}
        leadingIcon={
          <Image
            alt=""
            aria-hidden="true"
            height={16}
            src={tab.iconSrc}
            unoptimized
            width={16}
          />
        }
        size="sm"
        variant="chip"
      >
        {tab.label}
      </Button>
    </li>
  );
}

function ProjectPreview({ item }) {
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

function ProjectCard({ item }) {
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
      <ProjectPreview item={item} />

      <div className={styles.projectContent}>
        <div className={styles.projectCopy}>
          <h2 className={styles.projectTitle}>{item.title}</h2>
          <p className={styles.projectSummary}>{item.summary}</p>
        </div>

        <div className={styles.projectMeta} aria-label={`${item.title} metadata`}>
          {item.workTags.map((tag) => (
            <ProjectTag key={`${item.slug}-${tag}`} text={tag} />
          ))}
        </div>
      </div>
    </Link>
  );
}

export default function WorkIndexPage() {
  // 这里显式按 slug 取数据，是为了让 Figma 版式顺序独立于数据定义顺序，后面增减项目更安全。
  const itemsBySlug = new Map(workItems.map((item) => [item.slug, item]));
  const rows = workPageRows
    .map((row) => row.map((slug) => itemsBySlug.get(slug)).filter(Boolean))
    .filter((row) => row.length > 0);

  return (
    <div className={styles.page}>
      <section className={styles.pageIntro}>
        <h1 className={styles.pageTitle}>Works</h1>
        <p className={styles.pageSubtitle}>See what I do</p>
      </section>

      <section className={styles.pageContent}>
        <ul aria-label="Work categories" className={styles.tabsList}>
          {workTabs.map((tab) => (
            <WorkTabChip key={tab.id} tab={tab} />
          ))}
        </ul>

        <div className={styles.rows}>
          {rows.map((row, index) =>
            row.length === 1 ? (
              <div className={styles.fullRow} key={`row-${index}`}>
                <ProjectCard item={row[0]} />
              </div>
            ) : (
              <div className={styles.splitRow} key={`row-${index}`}>
                {row.map((item) => (
                  <ProjectCard item={item} key={item.slug} />
                ))}
              </div>
            ),
          )}
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Button from "../../../design-system/components/Button";
import { workItems, workTabContent, workTabs } from "../data/work-items";
import styles from "../styles/work-index-page.module.css";

function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

function ProjectTag({ text }) {
  return <span className={styles.tag}>{text}</span>;
}

function WorkTabChip({ isActive, onSelect, tab }) {
  return (
    <li role="presentation">
      <Button
        aria-controls={`work-panel-${tab.id}`}
        aria-selected={isActive}
        className={joinClassNames(
          styles.tabChip,
          isActive ? styles.tabChipActive : styles.tabChipInactive,
        )}
        id={`work-tab-${tab.id}`}
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
        onClick={() => onSelect(tab.id)}
        role="tab"
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

function PlaceholderPanel({ panel }) {
  return (
    <section className={styles.placeholderPanel}>
      <p className={styles.placeholderEyebrow}>{panel.eyebrow}</p>
      <div className={styles.placeholderCopy}>
        <h2 className={styles.placeholderTitle}>{panel.title}</h2>
        <p className={styles.placeholderDescription}>{panel.description}</p>
      </div>
      <div className={styles.placeholderTags}>
        {panel.tags.map((tag) => (
          <ProjectTag key={`${panel.eyebrow}-${tag}`} text={tag} />
        ))}
      </div>
    </section>
  );
}

function ProjectsPanel({ rows }) {
  const itemsBySlug = new Map(workItems.map((item) => [item.slug, item]));
  const resolvedRows = rows
    .map((row) => row.map((slug) => itemsBySlug.get(slug)).filter(Boolean))
    .filter((row) => row.length > 0);

  return (
    <div className={styles.rows}>
      {resolvedRows.map((row, index) =>
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
  );
}

export default function WorkIndexPage() {
  const [activeTabId, setActiveTabId] = useState(workTabs[0]?.id ?? "professional-work");
  const activePanel = workTabContent[activeTabId] ?? workTabContent["professional-work"];

  return (
    <div className={styles.page}>
      <section className={styles.pageIntro}>
        <h1 className={styles.pageTitle}>Works</h1>
        <p className={styles.pageSubtitle}>See what I do</p>
      </section>

      <section className={styles.pageContent}>
        <ul
          aria-label="Work categories"
          className={styles.tabsList}
          role="tablist"
        >
          {workTabs.map((tab) => (
            <WorkTabChip
              isActive={tab.id === activeTabId}
              key={tab.id}
              onSelect={setActiveTabId}
              tab={tab}
            />
          ))}
        </ul>

        <div
          aria-labelledby={`work-tab-${activeTabId}`}
          className={styles.panel}
          id={`work-panel-${activeTabId}`}
          role="tabpanel"
        >
          {activePanel.type === "projects" ? (
            <ProjectsPanel rows={activePanel.rows} />
          ) : (
            <PlaceholderPanel panel={activePanel} />
          )}
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";

import WorkExplorationsPanel from "../components/work/WorkExplorationsPanel";
import WorkPageHeader from "../components/work/WorkPageHeader";
import WorkProjectCard from "../components/work/WorkProjectCard";
import WorkSideProjectsPanel from "../components/work/WorkSideProjectsPanel";
import WorkTabs from "../components/work/WorkTabs";
import { workItems, workTabContent, workTabs } from "../data/work-items";
import { getLocalizedValue } from "../i18n/get-localized-value";
import styles from "../styles/work-index-page.module.css";

function ProjectsPanel({ language, rows }) {
  const itemsBySlug = new Map(workItems.map((item) => [item.slug, item]));
  const resolvedRows = rows
    .map((row) => row.map((slug) => itemsBySlug.get(slug)).filter(Boolean))
    .filter((row) => row.length > 0);

  return (
    <>
      {resolvedRows.map((row, index) =>
        row.length === 1 ? (
          <div className={styles.fullRow} key={`row-${index}`}>
            <WorkProjectCard item={row[0]} language={language} />
          </div>
        ) : (
          <div className={styles.splitRow} key={`row-${index}`}>
            {row.map((item) => (
              <WorkProjectCard item={item} key={item.slug} language={language} />
            ))}
          </div>
        ),
      )}
    </>
  );
}

export default function WorkIndexPage({ language }) {
  const [activeTabId, setActiveTabId] = useState(workTabs[0]?.id ?? "professional-work");
  const activePanel = workTabContent[activeTabId] ?? workTabContent["professional-work"];

  return (
    <div className={styles.page}>
      <WorkPageHeader language={language} />

      <section className={styles.pageContent}>
        <WorkTabs
          activeTabId={activeTabId}
          language={language}
          onSelect={setActiveTabId}
          tabs={workTabs}
        />

        <div
          aria-labelledby={`work-tab-${activeTabId}`}
          className={styles.panel}
          id={`work-panel-${activeTabId}`}
          role="tabpanel"
        >
          <div className={styles.rows}>
            {activePanel.type === "projects" ? (
              <ProjectsPanel language={language} rows={activePanel.rows} />
            ) : null}

            {activePanel.type === "explorations" ? (
              <WorkExplorationsPanel
                language={language}
                rowClassName={styles.fullRow}
                rowSplitClassName={styles.explorationSplitRow}
                rows={activePanel.rows}
              />
            ) : null}

            {activePanel.type === "side-projects" ? (
              <WorkSideProjectsPanel items={activePanel.items} language={language} />
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}

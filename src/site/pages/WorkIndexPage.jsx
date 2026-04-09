"use client";

import { useState } from "react";

import WorkExplorationsPanel from "../components/work/WorkExplorationsPanel";
import WorkPageHeader from "../components/work/WorkPageHeader";
import WorkProjectCard from "../components/work/WorkProjectCard";
import WorkSideProjectsPanel from "../components/work/WorkSideProjectsPanel";
import WorkTabs from "../components/work/WorkTabs";
import { workItems, workTabContent, workTabs } from "../data/work-items";
import styles from "../styles/work-index-page.module.css";

function ProjectsPanel({ rows }) {
  const itemsBySlug = new Map(workItems.map((item) => [item.slug, item]));
  const resolvedRows = rows
    .map((row) => row.map((slug) => itemsBySlug.get(slug)).filter(Boolean))
    .filter((row) => row.length > 0);

  return (
    <>
      {resolvedRows.map((row, index) =>
        row.length === 1 ? (
          <div className={styles.fullRow} key={`row-${index}`}>
            <WorkProjectCard item={row[0]} />
          </div>
        ) : (
          <div className={styles.splitRow} key={`row-${index}`}>
            {row.map((item) => (
              <WorkProjectCard item={item} key={item.slug} />
            ))}
          </div>
        ),
      )}
    </>
  );
}

export default function WorkIndexPage() {
  const [activeTabId, setActiveTabId] = useState(workTabs[0]?.id ?? "professional-work");
  const activePanel = workTabContent[activeTabId] ?? workTabContent["professional-work"];

  return (
    <div className={styles.page}>
      <WorkPageHeader />

      <section className={styles.pageContent}>
        <WorkTabs
          activeTabId={activeTabId}
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
              <ProjectsPanel rows={activePanel.rows} />
            ) : null}

            {activePanel.type === "explorations" ? (
              <WorkExplorationsPanel
                rowClassName={styles.fullRow}
                rowSplitClassName={styles.explorationSplitRow}
                rows={activePanel.rows}
              />
            ) : null}

            {activePanel.type === "side-projects" ? (
              <WorkSideProjectsPanel items={activePanel.items} />
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}

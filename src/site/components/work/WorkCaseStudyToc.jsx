"use client";

import { useEffect, useState } from "react";
import { ArrowUpLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import styles from "../../styles/drawing-ledger-case-study.module.css";

function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

function setPointerOrigin(target, clientX, clientY) {
  const bounds = target.getBoundingClientRect();
  const x = clientX - bounds.left;
  const y = clientY - bounds.top;

  target.style.setProperty("--toc-origin-x", `${x}px`);
  target.style.setProperty("--toc-origin-y", `${y}px`);
  target.style.setProperty("--toc-cursor-origin", `var(--toc-origin-x) var(--toc-origin-y)`);
}

function setCenteredOrigin(target) {
  const bounds = target.getBoundingClientRect();

  target.style.setProperty("--toc-origin-x", `${bounds.width * 0.18}px`);
  target.style.setProperty("--toc-origin-y", `${bounds.height * 0.5}px`);
  target.style.setProperty("--toc-cursor-origin", `var(--toc-origin-x) var(--toc-origin-y)`);
}

function TocLink({ activeId, item }) {
  const paddingInlineStart = `calc(0.625rem + ${(item.level ?? 0) * 0.875}rem)`;

  return (
    <a
      aria-current={activeId === item.id ? "location" : undefined}
      className={joinClassNames(styles.tocLink, activeId === item.id ? styles.tocLinkActive : "")}
      data-level={item.level ?? 0}
      href={`#${item.id}`}
      key={item.id}
      onFocus={(event) => setCenteredOrigin(event.currentTarget)}
      onPointerEnter={(event) =>
        setPointerOrigin(event.currentTarget, event.clientX, event.clientY)
      }
      onPointerMove={(event) =>
        setPointerOrigin(event.currentTarget, event.clientX, event.clientY)
      }
      onPointerLeave={(event) =>
        setPointerOrigin(event.currentTarget, event.clientX, event.clientY)
      }
      style={{ paddingInlineStart }}
    >
      <span aria-hidden="true" className={styles.tocLinkMarker} />
      <span className={styles.tocLinkText}>{item.label}</span>
    </a>
  );
}

export default function WorkCaseStudyToc({ items }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? null);
  const router = useRouter();

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/work");
  }

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (headings.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top)
          );

        if (visibleEntries[0]?.target?.id) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-18% 0px -68% 0px",
        threshold: [0, 0.2, 0.5, 0.8],
      }
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => {
      observer.disconnect();
    };
  }, [items]);

  return (
    <>
      <nav aria-label="页面目录" className={styles.tocDesktopNav}>
        <div className={styles.tocDesktopInner}>
          <button className={styles.tocBackLink} onClick={handleBack} type="button">
            <ArrowUpLeft aria-hidden="true" className={styles.tocBackIcon} />
            <span>返回</span>
          </button>
          <div className={styles.tocList}>
            {items.map((item) => (
              <TocLink activeId={activeId} item={item} key={item.id} />
            ))}
          </div>
        </div>
      </nav>

      <nav aria-label="页面目录" className={styles.tocMobileNav}>
        <div className={styles.tocMobileCard}>
          <p className={styles.tocEyebrow}>目录</p>
          <button className={styles.tocBackLink} onClick={handleBack} type="button">
            <ArrowUpLeft aria-hidden="true" className={styles.tocBackIcon} />
            <span>返回</span>
          </button>
          <div className={styles.tocList}>
            {items.map((item) => (
              <TocLink activeId={activeId} item={item} key={item.id} />
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

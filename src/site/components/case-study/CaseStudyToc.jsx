"use client";

import { useEffect, useState } from "react";
import { ArrowUpLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import styles from "../../styles/case-study-toc.module.css";

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

function getTocDepth(item) {
  // 用更有语义的层级名字，减少后面继续手写 0 / 1 时出错的机会。
  if (item.hierarchy === "secondary") {
    return 1;
  }

  return 0;
}

function TocLink({ activeId, item, onSelect }) {
  const depth = getTocDepth(item);
  const paddingInlineStart = `calc(var(--case-study-toc-link-padding-start, 0.625rem) + ${
    depth ?? 0
  } * var(--case-study-toc-level-indent, 0.875rem))`;

  return (
    <a
      aria-current={activeId === item.id ? "location" : undefined}
      className={joinClassNames(styles.tocLink, activeId === item.id ? styles.tocLinkActive : "")}
      data-level={depth}
      href={`#${item.id}`}
      onClick={() => onSelect(item.id)}
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

export default function CaseStudyToc({
  accentColor = "var(--portfolio-color-accent-brand)",
  backHref = "/work",
  backLabel = "返回",
  className = "",
  desktopShiftX = "33.5rem",
  desktopStickyTopOffset = undefined,
  desktopTopOffset = "6rem",
  hoverWashOpacity = 0,
  items,
  levelIndent = "0.875rem",
  linkPaddingStart = "0.625rem",
  mutedColor = "var(--portfolio-color-text-muted)",
  preferHistoryBack = true,
  titleColor = "var(--portfolio-semantic-title-color)",
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? null);
  const router = useRouter();

  function handleBack() {
    if (preferHistoryBack && window.history.length > 1) {
      router.back();
      return;
    }

    router.push(backHref);
  }

  useEffect(() => {
    const headings = items.map((item) => document.getElementById(item.id)).filter(Boolean);

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

  /** @type {import("react").CSSProperties & Record<string, string | number>} */
  const inlineStyles = {
    "--case-study-toc-accent": accentColor,
    "--case-study-toc-active-wash-opacity": 0,
    "--case-study-toc-desktop-shift-x": desktopShiftX,
    "--case-study-toc-level-indent": levelIndent,
    "--case-study-toc-link-padding-start": linkPaddingStart,
    "--case-study-toc-muted": mutedColor,
    "--case-study-toc-sticky-top": desktopStickyTopOffset ?? desktopTopOffset,
    "--case-study-toc-title": titleColor,
    "--case-study-toc-hover-wash-opacity": hoverWashOpacity,
    "--case-study-toc-wrap-top": desktopTopOffset,
  };

  return (
    <div className={joinClassNames(styles.tocWrap, className)} style={inlineStyles}>
      <div className={styles.tocContent}>
        <nav aria-label="页面目录" className={styles.tocDesktopNav}>
          <div className={styles.tocDesktopInner}>
            <button className={styles.tocBackLink} onClick={handleBack} type="button">
              <ArrowUpLeft aria-hidden="true" className={styles.tocBackIcon} />
              <span>{backLabel}</span>
            </button>
            <div className={styles.tocList}>
              {items.map((item) => (
                <TocLink
                  activeId={activeId}
                  item={item}
                  key={item.id}
                  onSelect={setActiveId}
                />
              ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

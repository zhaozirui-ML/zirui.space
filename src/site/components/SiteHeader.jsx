"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { siteNavigation } from "../data/navigation";
import styles from "../styles/site-shell.module.css";

export default function SiteHeader() {
  const [headerState, setHeaderState] = useState({
    scrollProgress: 0,
    width: 1920,
  });

  useEffect(() => {
    let frameId = 0;
    const targetState = {
      scrollProgress: 0,
      width: 1920,
    };

    const updateTargetState = () => {
      // 参考 instruct.ai，导航在前 200px 滚动区间内线性收缩到目标宽度。
      const nextProgress = Math.min(window.scrollY / 200, 1);
      const expandedWidth = Math.max(window.innerWidth, 320);
      const compactWidth = expandedWidth <= 1200 ? expandedWidth : 1200;
      const nextWidth = expandedWidth - (expandedWidth - compactWidth) * nextProgress;

      targetState.scrollProgress = nextProgress;
      targetState.width = nextWidth;
    };

    const animateHeader = () => {
      frameId = 0;

      setHeaderState((currentState) => {
        // 这里刻意做一层缓动追赶，去模拟参考站点平滑滚动容器带来的“慢一点”的感觉。
        const nextProgress =
          currentState.scrollProgress +
          (targetState.scrollProgress - currentState.scrollProgress) * 0.11;
        const nextWidth =
          currentState.width + (targetState.width - currentState.width) * 0.11;
        const widthChanged = Math.abs(targetState.width - nextWidth) >= 0.8;
        const progressChanged =
          Math.abs(targetState.scrollProgress - nextProgress) >= 0.003;

        if (!widthChanged && !progressChanged) {
          return {
            scrollProgress: targetState.scrollProgress,
            width: targetState.width,
          };
        }

        frameId = window.requestAnimationFrame(animateHeader);

        return {
          scrollProgress: nextProgress,
          width: nextWidth,
        };
      });
    };

    const handleViewportChange = () => {
      updateTargetState();

      if (!frameId) {
        frameId = window.requestAnimationFrame(animateHeader);
      }
    };

    handleViewportChange();
    window.addEventListener("scroll", handleViewportChange, { passive: true });
    window.addEventListener("resize", handleViewportChange);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", handleViewportChange);
      window.removeEventListener("resize", handleViewportChange);
    };
  }, []);

  const headerStyle = /** @type {any} */ ({
    "--site-header-shadow-progress": Math.max(
      0,
      Math.min((headerState.scrollProgress - 0.22) / 0.78, 1),
    ),
    "--site-header-width": `${headerState.width}px`,
  });

  return (
    <header className={styles.siteHeader}>
      <div className={styles.siteHeaderFrame} style={headerStyle}>
        <div className={styles.siteHeaderInner}>
          <Link className={styles.brandLink} href="/">
            <Image
              alt=""
              aria-hidden="true"
              className={styles.brandMark}
              height={20}
              src="/site/home/ascii-art-static.png"
              unoptimized
              width={20}
            />
            <span>Zirui Zhao</span>
          </Link>
          <nav aria-label="主导航" className={styles.navigation}>
            {siteNavigation.map((item) => (
              <Link className={styles.navigationLink} href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

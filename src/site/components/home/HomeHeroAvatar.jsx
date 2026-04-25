"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import styles from "../../styles/home-page.module.css";

/**
 * 首页头像支持点击后居中放大，点击空白区域或按 Esc 关闭。
 *
 * @param {{
 *   alt: string,
 *   mediaType: "image" | "video",
 *   src: string,
 * }} props
 */
export default function HomeHeroAvatar({ alt, mediaType, src }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const canUsePortal = typeof document !== "undefined";

  useEffect(() => {
    if (!isExpanded) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsExpanded(false);
      }
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExpanded]);

  if (mediaType === "video") {
    return (
      <video
        aria-label={alt}
        autoPlay
        className={styles.heroAvatar}
        height={76}
        loop
        muted
        playsInline
        preload="auto"
        role="img"
        src={src}
        width={76}
      />
    );
  }

  return (
    <>
      <button
        aria-expanded={isExpanded}
        aria-label={`${alt}，点击后居中放大查看`}
        className={styles.heroAvatarButton}
        onClick={() => setIsExpanded(true)}
        type="button"
      >
        <Image
          alt={alt}
          className={styles.heroAvatar}
          height={76}
          src={src}
          width={76}
        />
      </button>

      {isExpanded && canUsePortal
        ? createPortal(
            <div
              aria-label="放大头像预览"
              className={styles.heroAvatarOverlay}
              onClick={() => setIsExpanded(false)}
              role="dialog"
            >
              <div
                className={styles.heroAvatarOverlayCard}
                onClick={(event) => event.stopPropagation()}
              >
                <Image
                  alt={alt}
                  className={styles.heroAvatarExpanded}
                  height={640}
                  priority
                  src={src}
                  width={634}
                />
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

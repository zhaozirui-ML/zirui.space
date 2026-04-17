"use client";

import Image from "next/image";

import styles from "../../styles/home-page.module.css";

const SHARED_FOREGROUND_WIDTH_RATIO = 0.8501;
const SHARED_FOREGROUND_RADIUS = "0.625rem";

function parseAspectRatio(value) {
  if (typeof value !== "string") {
    return 1;
  }

  const [rawWidth, rawHeight] = value.split("/").map((segment) => Number.parseFloat(segment.trim()));

  if (!(Number.isFinite(rawWidth) && Number.isFinite(rawHeight) && rawHeight > 0)) {
    return 1;
  }

  return rawWidth / rawHeight;
}

function createBaseFrameStyle(homeMediaFrame) {
  return {
    aspectRatio: homeMediaFrame.foregroundAspectRatio,
    borderRadius: SHARED_FOREGROUND_RADIUS,
    boxShadow: homeMediaFrame.foregroundShadow,
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: `calc(var(--work-card-foreground-width-ratio, ${SHARED_FOREGROUND_WIDTH_RATIO}) * 100%)`,
  };
}

/**
 * 这次不再按断点分别覆盖一组 width/height 百分比，
 * 而是把前景卡片统一成同一套展示模型：
 * 1. 全部居中
 * 2. 全部使用同一宽度占比
 * 3. 高度完全交给 aspect-ratio 自动推导
 * 这样桌面 / 平板 / 手机只需要调整媒体容器本身，前景卡片不会再各断点跑偏。
 */
export default function ResponsiveWorkCardMedia({ item }) {
  const homeMediaFrame = item.homeMediaFrame;
  const foregroundAspectRatio = homeMediaFrame
    ? parseAspectRatio(homeMediaFrame.foregroundAspectRatio)
    : 1;
  const mediaStyle = homeMediaFrame
    ? {
        "--work-card-foreground-aspect-ratio": `${foregroundAspectRatio}`,
      }
    : undefined;
  const resolvedMediaStyle = mediaStyle
    ? /** @type {import("react").CSSProperties} */ (mediaStyle)
    : undefined;

  return (
    <div
      className={styles.workCardMedia}
      data-work-slug={item.slug}
      style={resolvedMediaStyle}
    >
      {homeMediaFrame ? (
        <>
          <Image
            alt={item.homeImageAlt}
            className={styles.workCardImage}
            fill
            priority={item.slug === "drawing-ledger-2-0"}
            sizes="(max-width: 900px) 100vw, 460px"
            src={homeMediaFrame.backgroundSrc}
            unoptimized
          />
          <div className={styles.workCardForeground} style={createBaseFrameStyle(homeMediaFrame)}>
            <Image
              alt=""
              aria-hidden="true"
              className={styles.workCardForegroundImage}
              fill
              priority={item.slug === "drawing-ledger-2-0"}
              sizes="(max-width: 900px) 100vw, 360px"
              src={homeMediaFrame.foregroundSrc}
              unoptimized
            />
          </div>
        </>
      ) : (
        <Image
          alt={item.homeImageAlt}
          className={[
            styles.workCardImage,
            item.slug === "drawing-ledger-2-0" ? styles.workCardImageContain : "",
          ]
            .filter(Boolean)
            .join(" ")}
          fill
          priority={item.slug === "drawing-ledger-2-0"}
          sizes="(max-width: 900px) 100vw, 460px"
          src={item.homeImageSrc}
          unoptimized
        />
      )}
    </div>
  );
}

"use client";

import Image from "next/image";

import styles from "../../styles/home-page.module.css";

export default function ResponsiveWorkCardMedia({ item }) {
  const homeMediaAdapt = item.homeMediaAdapt;
  const mediaStyle = homeMediaAdapt
    ? {
        "--work-card-image-position-y-mobile": homeMediaAdapt.mobile?.positionY ?? "50%",
        "--work-card-image-position-y-tablet": homeMediaAdapt.tablet?.positionY ?? "50%",
        "--work-card-image-scale-mobile": `${homeMediaAdapt.mobile?.scale ?? 1}`,
        "--work-card-image-scale-tablet": `${homeMediaAdapt.tablet?.scale ?? 1}`,
      }
    : undefined;
  const resolvedMediaStyle = mediaStyle
    ? /** @type {import("react").CSSProperties} */ (mediaStyle)
    : undefined;

  return (
    <div className={styles.workCardMedia} style={resolvedMediaStyle}>
      <Image
        alt={item.homeImageAlt}
        className={styles.workCardImage}
        fill
        priority={item.slug === "drawing-ledger-2-0"}
        sizes="(max-width: 900px) 100vw, 460px"
        src={item.homeImageSrc}
        unoptimized
      />
    </div>
  );
}

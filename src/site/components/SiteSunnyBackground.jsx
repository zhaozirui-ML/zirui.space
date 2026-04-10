"use client";

import styles from "../styles/site-sunny-background.module.css";

export default function SiteSunnyBackground() {
  return (
    <div aria-hidden="true" className={styles.sunnyBackground}>
      <div className={styles.sunnyLeafField}>
        <video
          autoPlay
          className={styles.sunnyLeafVideo}
          disablePictureInPicture
          loop
          muted
          playsInline
          preload="auto"
          src="/media/leaves.mp4"
        />
      </div>
    </div>
  );
}

import styles from "../../styles/home-page.module.css";

export default function HomeSunnyShadow() {
  return (
    <div aria-hidden="true" className={styles.sunnyLeafField}>
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
  );
}

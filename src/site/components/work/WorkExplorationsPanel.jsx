import Image from "next/image";

import { joinClassNames } from "./join-class-names";
import styles from "./work-components.module.css";

function ExplorationEarningsVisual() {
  return (
    <div className={styles.earningsVisual}>
      <div className={styles.earningsOrb}>
        <Image
          alt=""
          aria-hidden="true"
          fill
          loading="eager"
          sizes="(max-width: 900px) 100vw, 456px"
          src="/site/work/explorations/exploration-orb.svg"
          unoptimized
        />
      </div>

      <div className={styles.earningsContent}>
        <div className={styles.earningsHeader}>
          <p className={styles.earningsLabel}>Total earnings</p>
          <Image
            alt=""
            aria-hidden="true"
            height={20}
            src="/site/work/explorations/exploration-arrow.svg"
            unoptimized
            width={20}
          />
        </div>

        <p className={styles.earningsAmount}>$1.720,43</p>
      </div>
    </div>
  );
}

function ExplorationListIllustration() {
  return (
    <div className={styles.listIllustration}>
      <div className={styles.listIllustrationShadowTop}>
        <div className={styles.listIllustrationShadowTopAsset}>
          <Image
            alt=""
            aria-hidden="true"
            fill
            sizes="260px"
            src="/site/work/explorations/exploration-list-shadow-top.svg"
            unoptimized
          />
        </div>
      </div>

      <div className={styles.listIllustrationPhone}>
        <div className={styles.listIllustrationPhoneSurface} />

        <div className={styles.listIllustrationItems}>
          <span className={styles.listIllustrationLine} />
          <span className={styles.listIllustrationLine} />
          <span className={styles.listIllustrationLine} />
          <span
            className={joinClassNames(
              styles.listIllustrationLine,
              styles.listIllustrationButton,
            )}
          />
        </div>
      </div>

      <div className={styles.listIllustrationShadowBottom}>
        <div className={styles.listIllustrationShadowBottomAsset}>
          <Image
            alt=""
            aria-hidden="true"
            fill
            sizes="260px"
            src="/site/work/explorations/exploration-list-shadow-bottom.svg"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}

function ExplorationCard({ card }) {
  if (card.kind === "earnings") {
    return (
      <article className={joinClassNames(styles.explorationCard, styles.explorationCardFeature)}>
        <ExplorationEarningsVisual />
      </article>
    );
  }

  if (card.kind === "device-image") {
    return (
      <article className={joinClassNames(styles.explorationCard, styles.explorationCardFeature)}>
        <div className={styles.explorationDeviceVisual}>
          <Image
            alt={card.alt}
            fill
            loading="eager"
            sizes="(max-width: 900px) min(100vw - 5rem, 456px), 456px"
            src={card.src}
            unoptimized
          />
        </div>
      </article>
    );
  }

  if (card.kind === "ticket-image") {
    return (
      <article className={joinClassNames(styles.explorationCard, styles.explorationCardFeature)}>
        <div className={styles.explorationTicketVisual}>
          <Image
            alt={card.alt}
            fill
            loading="eager"
            sizes="(max-width: 900px) min(100vw - 5rem, 500px), 500px"
            src={card.src}
            unoptimized
          />
        </div>
      </article>
    );
  }

  if (card.kind === "cloud-image") {
    return (
      <article className={joinClassNames(styles.explorationCard, styles.explorationCardCompact)}>
        <div className={styles.explorationCloudVisual}>
          <div className={styles.explorationCloudAsset}>
            <Image
              alt={card.alt}
              fill
              loading="eager"
              sizes="(max-width: 900px) min(100vw - 5rem, 260px), 260px"
              src={card.src}
              unoptimized
            />
          </div>
        </div>
      </article>
    );
  }

  if (card.kind === "list-illustration") {
    return (
      <article className={joinClassNames(styles.explorationCard, styles.explorationCardCompact)}>
        <ExplorationListIllustration />
      </article>
    );
  }

  if (card.kind === "full-image") {
    return (
      <article className={joinClassNames(styles.explorationCard, styles.explorationCardTall)}>
        <div className={styles.explorationTallImage}>
          <Image
            alt={card.alt}
            fill
            loading="eager"
            sizes="(max-width: 900px) calc(100vw - 4rem), 404px"
            src={card.src}
            unoptimized
          />
        </div>
      </article>
    );
  }

  return (
    <article className={joinClassNames(styles.explorationCard, styles.explorationCardImmersive)}>
      <div
        className={joinClassNames(
          styles.explorationImmersiveImage,
          card.id === "blur-card" ? styles.explorationImmersiveImageBlur : "",
        )}
      >
        <Image
          alt={card.alt}
          fill
          loading="eager"
          sizes="(max-width: 900px) calc(100vw - 4rem), 830px"
          src={card.src}
          unoptimized
        />
      </div>
    </article>
  );
}

export default function WorkExplorationsPanel({ rowClassName, rowSplitClassName, rows }) {
  return (
    <>
      {rows.map((row, index) =>
        row.length === 1 ? (
          <div className={rowClassName} key={`exploration-row-${index}`}>
            <ExplorationCard card={row[0]} />
          </div>
        ) : (
          <div className={rowSplitClassName} key={`exploration-row-${index}`}>
            {row.map((card) => (
              <ExplorationCard card={card} key={card.id} />
            ))}
          </div>
        ),
      )}
    </>
  );
}

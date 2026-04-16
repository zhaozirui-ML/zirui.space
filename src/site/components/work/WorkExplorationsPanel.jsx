import Image from "next/image";

import { joinClassNames } from "./join-class-names";
import styles from "./work-components.module.css";

function ExplorationCard({ card }) {
  if (card.kind === "feature-image") {
    return (
      <article className={joinClassNames(styles.explorationCard, styles.explorationCardFeature)}>
        <div className={styles.explorationFeatureImage}>
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

      if (card.kind === "compact-image") {
    return (
      <article className={joinClassNames(styles.explorationCard, styles.explorationCardCompact)}>
        <div
          className={joinClassNames(
            styles.explorationCompactImage,
            card.id === "cloud-icon-card" ? styles.explorationCompactImageCloud : "",
            card.id === "list-icon-card" ? styles.explorationCompactImageOffsetDown : "",
          )}
        >
          <Image
            alt={card.alt}
            fill
            loading="eager"
            sizes="(max-width: 900px) min(100vw - 5rem, 260px), 260px"
            src={card.src}
            unoptimized
          />
        </div>
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

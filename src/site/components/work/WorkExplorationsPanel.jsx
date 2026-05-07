import Image from "next/image";

import { joinClassNames } from "./join-class-names";
import styles from "./work-components.module.css";

function ExplorationCaption({ caption }) {
  if (!caption) {
    return null;
  }

  return <p className={styles.explorationCaption}>{caption}</p>;
}

function ExplorationCard({ card }) {
  const imageClassName = card.surface === "soft" ? styles.explorationImageSoftShadow : "";
  const cardClassName = joinClassNames(
    styles.explorationCard,
    card.surface === "soft" ? styles.explorationCardSoftSurface : "",
  );

  if (card.kind === "feature-image") {
    return (
      <article className={joinClassNames(cardClassName, styles.explorationCardFeature)}>
        <div className={joinClassNames(styles.explorationFeatureImage, imageClassName)}>
          <Image
            alt={card.alt}
            fill
            sizes="(max-width: 900px) min(100vw - 5rem, 500px), 500px"
            src={card.src}
          />
        </div>
        <ExplorationCaption caption={card.caption} />
      </article>
    );
  }

  if (card.kind === "device-image") {
    return (
      <article className={joinClassNames(cardClassName, styles.explorationCardFeature)}>
        <div className={joinClassNames(styles.explorationDeviceVisual, imageClassName)}>
          <Image
            alt={card.alt}
            fill
            sizes="(max-width: 900px) min(100vw - 5rem, 456px), 456px"
            src={card.src}
          />
        </div>
        <ExplorationCaption caption={card.caption} />
      </article>
    );
  }

  if (card.kind === "ticket-image") {
    return (
      <article className={joinClassNames(cardClassName, styles.explorationCardFeature)}>
        <div className={joinClassNames(styles.explorationTicketVisual, imageClassName)}>
          <Image
            alt={card.alt}
            fill
            sizes="(max-width: 900px) min(100vw - 5rem, 500px), 500px"
            src={card.src}
          />
        </div>
        <ExplorationCaption caption={card.caption} />
      </article>
    );
  }

  if (card.kind === "compact-image") {
    return (
      <article className={joinClassNames(cardClassName, styles.explorationCardCompact)}>
        <div
          className={joinClassNames(
            styles.explorationCompactImage,
            imageClassName,
            card.id === "cloud-icon-card" ? styles.explorationCompactImageCloud : "",
            card.id === "list-icon-card" ? styles.explorationCompactImageOffsetDown : "",
          )}
        >
          <Image
            alt={card.alt}
            fill
            sizes="(max-width: 900px) min(100vw - 5rem, 260px), 260px"
            src={card.src}
          />
        </div>
        <ExplorationCaption caption={card.caption} />
      </article>
    );
  }

  if (card.kind === "full-image") {
    return (
      <article className={joinClassNames(cardClassName, styles.explorationCardTall)}>
        <div className={joinClassNames(styles.explorationTallImage, imageClassName)}>
          <Image
            alt={card.alt}
            fill
            sizes="(max-width: 900px) calc(100vw - 4rem), 404px"
            src={card.src}
          />
        </div>
        <ExplorationCaption caption={card.caption} />
      </article>
    );
  }

  return (
    <article className={joinClassNames(cardClassName, styles.explorationCardImmersive)}>
      <div
        className={joinClassNames(
          styles.explorationImmersiveImage,
          imageClassName,
          card.id === "blur-card" ? styles.explorationImmersiveImageBlur : "",
        )}
      >
        <Image
          alt={card.alt}
          fill
          sizes="(max-width: 900px) calc(100vw - 4rem), 830px"
          src={card.src}
        />
      </div>
      <ExplorationCaption caption={card.caption} />
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

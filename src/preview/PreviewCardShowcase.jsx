import { Card } from "../../design-system";
import { articleCards, featureCards } from "./preview-data";
import PreviewSectionHeading from "./PreviewSectionHeading";

export default function PreviewCardShowcase({ isCompact }) {
  const visibleArticles = isCompact ? articleCards.slice(0, 3) : articleCards;

  return (
    <section className="preview-section preview-section--cards">
      <div className="preview-shell">
        <PreviewSectionHeading
          eyebrow="Card System"
          title="Feature moments and browseable stories."
        />

        <div className="preview-feature-grid">
          {featureCards.map((card) => (
            <Card
              description={card.description}
              eyebrow={card.eyebrow}
              image={card.image}
              imageAlt={card.imageAlt}
              key={card.title}
              meta={card.meta}
              title={card.title}
              tone={card.tone}
              variant={card.variant}
            />
          ))}
        </div>

        <div className="preview-article-grid">
          {visibleArticles.map((card) => (
            <Card
              image={card.image}
              imageAlt={card.imageAlt}
              key={card.title}
              meta={card.meta}
              title={card.title}
              variant="article"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

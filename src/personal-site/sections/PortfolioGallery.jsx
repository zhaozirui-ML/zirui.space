import { Button } from "../../../design-system";
import SectionHeader from "../components/SectionHeader";
import { portfolioItems } from "../site-data";

export default function PortfolioGallery() {
  return (
    <section className="site-section">
      <SectionHeader
        description="这些项目大多来自复杂业务与企业级产品场景，重点关注结构清晰、交互效率与长期可维护性。"
        eyebrow="Selected Work"
        title="精选项目"
      />

      <div className="portfolio-grid">
        {portfolioItems.map((item) => (
          <article className="portfolio-card" key={item.title}>
            <div aria-hidden="true" className="portfolio-card__media" />
            <div className="portfolio-card__body">
              <div className="portfolio-card__meta-row">
                <p className="portfolio-card__year">{item.year}</p>
                <Button
                  href={item.href}
                  rel="noreferrer"
                  size="sm"
                  target="_blank"
                  variant="link"
                >
                  阅读案例
                </Button>
              </div>
              <h3 className="portfolio-card__title">{item.title}</h3>
              <p className="portfolio-card__description">{item.description}</p>
              <ul className="portfolio-card__tags">
                {item.tags.map((tag) => (
                  <li className="portfolio-card__tag" key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

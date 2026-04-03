import Image from "next/image";

/**
 * 同一套 Card 支持“横向 feature 卡”和“纵向 article 卡”，
 * 这样设计语言统一，但预览页能展示两种常见内容形态。
 *
 * @param {{
 *   description?: string,
 *   eyebrow?: string,
 *   href?: string,
 *   image?: string,
 *   imageAlt?: string,
 *   meta?: string,
 *   title: string,
 *   tone?: "light" | "dark",
 *   variant?: "feature" | "featureReverse" | "article"
 * }} props
 */
export default function Card({
  description,
  eyebrow,
  href,
  image,
  imageAlt = "",
  meta,
  title,
  tone = "light",
  variant = "feature",
}) {
  const Component = href ? "a" : "article";
  const featureClassName =
    variant === "article"
      ? "ds-card--article"
      : variant === "featureReverse"
        ? "ds-card--feature ds-card--feature-reverse"
        : "ds-card--feature";

  return (
    <Component
      className={[
        "ds-card",
        featureClassName,
        `ds-card--${tone}`,
      ].join(" ")}
      href={href}
    >
      {image ? (
        <div className="ds-card__media">
          <Image
            alt={imageAlt}
            className="ds-card__image"
            fill
            sizes={
              variant === "feature"
                ? "(max-width: 880px) 100vw, 50vw"
                : "(max-width: 960px) 100vw, 25vw"
            }
            src={image}
          />
        </div>
      ) : null}

      <div className="ds-card__body">
        {eyebrow ? <p className="ds-card__eyebrow">{eyebrow}</p> : null}
        <h3 className="ds-card__title">{title}</h3>
        {description ? <p className="ds-card__description">{description}</p> : null}
        {meta ? <p className="ds-card__meta">{meta}</p> : null}
      </div>
    </Component>
  );
}

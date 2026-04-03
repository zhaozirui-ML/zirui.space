/**
 * 给每个 section 统一标题节奏，避免页面逐段长得像不同项目拼起来的。
 */
export default function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="site-section-header">
      <p className="site-section-header__eyebrow">{eyebrow}</p>
      <h2 className="site-section-header__title">{title}</h2>
      {description ? (
        <p className="site-section-header__description">{description}</p>
      ) : null}
    </div>
  );
}

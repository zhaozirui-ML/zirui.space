/**
 * 统一预览区块标题，避免每一段都重复写一套 heading 结构。
 *
 * @param {{
 *   copy?: string,
 *   eyebrow: string,
 *   title: string
 * }} props
 */
export default function PreviewSectionHeading({ copy, eyebrow, title }) {
  return (
    <div className="preview-section__heading">
      <p className="preview-eyebrow">{eyebrow}</p>
      <h2 className="preview-section__title">{title}</h2>
      {copy ? <p className="preview-section__copy">{copy}</p> : null}
    </div>
  );
}

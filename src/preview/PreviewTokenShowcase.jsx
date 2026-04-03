import { colorEntries, spacingEntries, typeEntries } from "./preview-data";
import PreviewSectionHeading from "./PreviewSectionHeading";

export default function PreviewTokenShowcase() {
  return (
    <section className="preview-section">
      <div className="preview-shell">
        <PreviewSectionHeading
          eyebrow="Tokens"
          title="Colors, spacing, and typography live separately from UI."
        />

        <div className="preview-token-grid">
          <article className="preview-panel">
            <p className="preview-panel__label">Color tokens</p>
            <div className="preview-swatch-list">
              {colorEntries.map(([label, value]) => (
                <div className="preview-swatch" key={label}>
                  <span
                    className="preview-swatch__chip"
                    style={{ backgroundColor: value }}
                  />
                  <div>
                    <p className="preview-swatch__name">{label}</p>
                    <p className="preview-swatch__value">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="preview-panel">
            <p className="preview-panel__label">Spacing scale</p>
            <div className="preview-spacing-list">
              {spacingEntries.map(([label, value]) => (
                <div className="preview-spacing" key={label}>
                  <div className="preview-spacing__bar" style={{ width: value }} />
                  <div className="preview-spacing__meta">
                    <span>{label}</span>
                    <span>{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="preview-panel preview-panel--wide">
            <p className="preview-panel__label">Typography scale</p>
            <div className="preview-type-list">
              {typeEntries.map((entry) => (
                <div className="preview-type" key={entry.label}>
                  <p className="preview-type__label">{entry.label}</p>
                  <p className="preview-type__sample" style={entry.style}>
                    {entry.sample}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

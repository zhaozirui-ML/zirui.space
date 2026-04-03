import { Button } from "../../design-system";

export default function PreviewFooter() {
  return (
    <footer className="preview-footer">
      <div className="preview-shell preview-footer__inner">
        <div>
          <p className="preview-footer__brand">Instruct Design System</p>
          <p className="preview-footer__copy">
            Rooted in the provided Figma file, structured for a cleaner Next.js future.
          </p>
        </div>

        <div className="preview-footer__actions">
          <Button size="sm" variant="secondary">
            Terms
          </Button>
          <Button size="sm" variant="link">
            Privacy Policy
          </Button>
        </div>
      </div>
    </footer>
  );
}

import { Button } from "../../design-system";
import { ArrowRightIcon, SparkleIcon } from "../preview-icons";

export default function PreviewTopbar() {
  return (
    <header className="preview-topbar">
      <div className="preview-brand">
        <span className="preview-brand__mark">
          <SparkleIcon />
        </span>
        <span>Instruct System</span>
      </div>

      <nav className="preview-nav">
        <Button size="sm" variant="ghost">
          Features
        </Button>
        <Button size="sm" variant="chip">
          Blog
        </Button>
      </nav>

      <div className="preview-actions">
        <Button size="sm" variant="ghost">
          Talk to us
        </Button>
        <Button size="sm" variant="secondary">
          Log in
        </Button>
        <Button size="sm" trailingIcon={<ArrowRightIcon />}>
          Get started
        </Button>
      </div>
    </header>
  );
}

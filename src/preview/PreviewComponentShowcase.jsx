import { Button, Input } from "../../design-system";
import {
  ChevronDownIcon,
  MicIcon,
  SearchIcon,
  SendIcon,
  SparkleIcon,
} from "../preview-icons";
import PreviewSectionHeading from "./PreviewSectionHeading";

export default function PreviewComponentShowcase() {
  return (
    <section className="preview-section">
      <div className="preview-shell">
        <PreviewSectionHeading
          copy="Buttons stay pill-shaped and compact, the input keeps its editorial framing, and icon actions now reuse the same button system."
          eyebrow="Components"
          title="Small building blocks, one visual language."
        />

        <div className="preview-showcase">
          <article className="preview-panel">
            <p className="preview-panel__label">Button states</p>

            <div className="preview-button-grid">
              <Button fullWidth>Primary call to action</Button>
              <Button fullWidth variant="secondary">
                Secondary action
              </Button>
              <Button fullWidth leadingIcon={<SearchIcon />} variant="chip">
                Featured chip state
              </Button>
              <Button fullWidth trailingIcon={<ChevronDownIcon />} variant="link">
                Learn more
              </Button>

              <div className="preview-inline-actions">
                <Button aria-label="Open search" leadingIcon={<SearchIcon />} size="icon" variant="icon">
                  {null}
                </Button>
                <Button
                  aria-label="Submit message"
                  leadingIcon={<SendIcon />}
                  size="icon"
                  variant="iconFilled"
                >
                  {null}
                </Button>
                <Button disabled variant="secondary">
                  Disabled state
                </Button>
              </div>
            </div>
          </article>

          <article className="preview-panel">
            <p className="preview-panel__label">Input system</p>
            <Input
              actions={[
                {
                  icon: <MicIcon />,
                  label: "Record a task",
                  variant: "icon",
                },
                {
                  icon: <SendIcon />,
                  label: "Submit task",
                  variant: "iconFilled",
                },
              ]}
              helperText="The action rail now reuses Button internally, so states stay visually consistent."
              placeholder="Delegate a task or ask a question..."
              rows={4}
            />

            <Button leadingIcon={<SparkleIcon />} variant="soft">
              Soft CTA for helper actions
            </Button>
          </article>
        </div>
      </div>
    </section>
  );
}

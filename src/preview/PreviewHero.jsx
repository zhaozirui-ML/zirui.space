import { Button, Input } from "../../design-system";
import { filterButtons } from "./preview-data";
import { MicIcon, SearchIcon, SendIcon } from "../preview-icons";

export default function PreviewHero({ isCompact }) {
  return (
    <section className="preview-hero">
      <div className="preview-shell">
        <div className="preview-hero__content">
          <p className="preview-eyebrow">Figma-derived system preview</p>
          <h1 className="preview-display">AI that works for your design system</h1>
          <p className="preview-copy">
            This preview turns the Figma language into reusable tokens and
            components, then recomposes them into a clean editorial landing
            surface that can move into Next.js with minimal rework.
          </p>

          <div className="preview-status">
            <span className="preview-status__dot" />
            <span>{isCompact ? "Compact viewport detected" : "Wide viewport detected"}</span>
          </div>

          <Input
            actions={[
              {
                icon: <MicIcon />,
                label: "Start recording",
                variant: "icon",
              },
              {
                icon: <SendIcon />,
                label: "Send message",
                variant: "iconFilled",
              },
            ]}
            helperText="Structured like the hero prompt in Figma: input first, helper text second, quick actions on the right."
          />

          <div className="preview-chip-row">
            {filterButtons.map((label, index) => (
              <Button
                className="preview-chip"
                key={label}
                leadingIcon={<SearchIcon />}
                size="sm"
                variant={index === 0 ? "chip" : "secondary"}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

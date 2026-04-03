import { useId } from "react";
import Button from "./Button";

/**
 * 这个输入组件参考了 Figma 里的大号任务输入框，
 * 重点是把“文字输入”和“快捷动作”包在同一个可复用容器里。
 *
 * @param {{
 *   actions?: Array<{
 *     icon: import("react").ReactNode,
 *     label: string,
 *     onClick?: () => void,
 *     variant?: "icon" | "iconFilled"
 *   }>,
 *   className?: string,
 *   helperText?: string,
 *   id?: string,
 *   label?: string,
 *   onChange?: import("react").ChangeEventHandler<HTMLTextAreaElement>,
 *   placeholder?: string,
 *   rows?: number,
 *   value?: string
 * }} props
 */
export default function Input({
  actions = [],
  className = "",
  helperText,
  id,
  label = "Prompt input",
  onChange,
  placeholder = "Delegate a task or ask a question...",
  rows = 3,
  value = "",
}) {
  const autoId = useId();
  const fieldId = id || autoId;

  return (
    <div className={["ds-input", className].filter(Boolean).join(" ")}>
      <label className="sr-only" htmlFor={fieldId}>
        {label}
      </label>

      <textarea
        className="ds-input__field"
        defaultValue={onChange ? undefined : value}
        id={fieldId}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={!onChange}
        rows={rows}
        value={onChange ? value : undefined}
      />

      <div className="ds-input__footer">
        <p className="ds-input__helper">{helperText}</p>

        <div className="ds-input__actions">
          {actions.map((action) => (
            <Button
              aria-label={action.label}
              className="ds-input__action"
              key={action.label}
              leadingIcon={action.icon}
              onClick={action.onClick}
              size="icon"
              variant={action.variant || "icon"}
            >
              {null}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

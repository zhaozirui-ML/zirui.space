/**
 * 统一收口按钮的视觉和尺寸，后面做导航、筛选按钮、CTA 时都能复用同一套规则。
 *
 * @param {{
 *   as?: string,
 *   children?: import("react").ReactNode,
 *   className?: string,
 *   fullWidth?: boolean,
 *   href?: string,
 *   leadingIcon?: import("react").ReactNode,
 *   size?: "sm" | "md" | "icon",
 *   trailingIcon?: import("react").ReactNode,
 *   variant?: "primary" | "secondary" | "soft" | "ghost" | "chip" | "link" | "icon" | "iconFilled"
 * } & Record<string, any>} props
 */
export default function Button({
  as,
  children,
  className = "",
  fullWidth = false,
  href,
  leadingIcon,
  size = "md",
  trailingIcon,
  variant = "primary",
  ...props
}) {
  const Component = /** @type {any} */ (href ? "a" : as || "button");
  const variantClassName = variant.replace(
    /[A-Z]/g,
    (letter) => `-${letter.toLowerCase()}`,
  );
  const hasLabel = children !== undefined && children !== null && children !== "";
  const classes = [
    "ds-button",
    `ds-button--${variantClassName}`,
    `ds-button--${size}`,
    !hasLabel ? "ds-button--icon-only" : "",
    fullWidth ? "ds-button--full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const componentProps =
    Component === "button" ? { type: "button", ...props } : props;

  if (href) {
    componentProps.href = href;
  }

  return (
    <Component className={classes} {...componentProps}>
      {leadingIcon ? <span className="ds-button__icon">{leadingIcon}</span> : null}
      {hasLabel ? <span className="ds-button__label">{children}</span> : null}
      {trailingIcon ? (
        <span className="ds-button__icon">{trailingIcon}</span>
      ) : null}
    </Component>
  );
}

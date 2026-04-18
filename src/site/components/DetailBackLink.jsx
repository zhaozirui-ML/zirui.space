import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import styles from "../styles/detail-back-link.module.css";

function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

/**
 * @param {{
 *   ariaLabel?: string,
 *   className?: string,
 *   href: string,
 *   label: string,
 * }} props
 */
export default function DetailBackLink({
  ariaLabel,
  className = "",
  href,
  label,
}) {
  return (
    <Link
      aria-label={ariaLabel}
      className={joinClassNames(styles.backLink, className)}
      href={href}
    >
      <ArrowLeft aria-hidden="true" className={styles.backIcon} strokeWidth={1.9} />
      <span className={styles.backLabel}>{label}</span>
    </Link>
  );
}

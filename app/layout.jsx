import "../design-system/styles.css";
import "../src/personal-site/personal-site.css";
import { rootCssVariables } from "../design-system/tokens";
import "./globals.css";

export const metadata = {
  title: "Zhaozirui Personal Website",
  description: "A minimal personal website built on top of the local design system.",
};

export default function RootLayout({ children }) {
  const documentStyle = /** @type {any} */ (rootCssVariables);

  return (
    <html lang="zh-CN" style={documentStyle}>
      <body className="app-body">{children}</body>
    </html>
  );
}

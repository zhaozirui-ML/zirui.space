import "../design-system/styles.css";
import { rootCssVariables } from "../design-system/tokens";
import "./globals.css";
import { getDocumentLanguage } from "../src/site/i18n/config";
import {
  getRootMetadata,
  getRootStructuredData,
} from "../src/site/i18n/dictionary";
import { getServerLanguage } from "../src/site/i18n/server";

export async function generateMetadata() {
  const language = await getServerLanguage();

  return getRootMetadata(language);
}

export default async function RootLayout({ children }) {
  const documentStyle = /** @type {any} */ (rootCssVariables);
  const language = await getServerLanguage();
  const structuredData = getRootStructuredData(language);

  return (
    <html lang={getDocumentLanguage(language)} style={documentStyle}>
      <body className="app-body">
        {children}
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          type="application/ld+json"
        />
      </body>
    </html>
  );
}

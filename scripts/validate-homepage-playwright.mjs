import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

import { launchStableChromium } from "./playwright-utils.mjs";

async function main() {
  const appUrl = process.env.APP_URL ?? "http://localhost:3000";
  const artifactDir = path.join(process.cwd(), ".codex-artifacts");
  const screenshotPath = path.join(artifactDir, "homepage-playwright.png");
  const reportPath = path.join(artifactDir, "homepage-playwright-report.json");

  mkdirSync(artifactDir, { recursive: true });

  const browser = await launchStableChromium();

  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 2400 } });

    // 这里不用直接等 networkidle，先拿到 commit，再等 domcontentloaded，能绕开当前环境里更脆弱的等待状态。
    await page.goto(appUrl, { timeout: 10000, waitUntil: "commit" });
    await page.waitForLoadState("domcontentloaded", { timeout: 5000 });
    await page.waitForTimeout(1200);
    await page.screenshot({ fullPage: true, path: screenshotPath });

    const homeBodyText = await page.locator("body").innerText({ timeout: 5000 });
    const firstBlogLink = page.locator('[class*="blogCard"]').first();
    await firstBlogLink.click();
    await page.waitForURL("**/blog/**", { timeout: 10000 });

    const detailUrl = page.url();
    await page.locator('a[aria-label="Back to Blog"]').click();
    await page.waitForURL(`${appUrl}/`, { timeout: 10000 });

    const returnUrl = page.url();

    writeFileSync(
      reportPath,
      JSON.stringify(
        {
          detailUrl,
          returnUrl,
          returnToHome: returnUrl === `${appUrl}/`,
          hasRecentWorks: homeBodyText.includes("Recent Works"),
          screenshotPath,
          status: "ok",
        },
        null,
        2,
      ),
      "utf8",
    );
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

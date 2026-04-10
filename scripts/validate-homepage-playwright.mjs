import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

import { launchStableChromium } from "./playwright-utils.mjs";

async function main() {
  const appUrl = process.env.APP_URL ?? "http://localhost:3000";
  const fallbackBlogPath = process.env.PLAYWRIGHT_BLOG_PATH ?? "/blog/smartx-design-workflow";
  const artifactDir = path.join(process.cwd(), ".codex-artifacts");
  const screenshotPath = path.join(artifactDir, "homepage-playwright.png");
  const reportPath = path.join(artifactDir, "homepage-playwright-report.json");

  mkdirSync(artifactDir, { recursive: true });

  const browser = await launchStableChromium();

  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 2400 } });

    // 当前环境里直接等待更高层生命周期不稳定，先拿 commit，再等 domcontentloaded 更稳。
    await page.goto(appUrl, { timeout: 10000, waitUntil: "commit" });
    await page.waitForLoadState("domcontentloaded", { timeout: 5000 });
    await page.waitForTimeout(1200);
    await page.screenshot({ fullPage: true, path: screenshotPath });

    const homeBodyText = await page.locator("body").innerText({ timeout: 5000 });

    let detailUrl = null;

    const homepageBlogLinks = page.locator('a[href^="/blog/"]');
    const homepageBlogLinkCount = await homepageBlogLinks.count();

    if (homepageBlogLinkCount > 0) {
      await homepageBlogLinks.first().click();
      await page.waitForURL(/\/blog\/[^/?#]+(?:\?.*)?$/, { timeout: 10000 });
      detailUrl = page.url();
    } else {
      await page.goto(`${appUrl}${fallbackBlogPath}?from=/`, {
        timeout: 10000,
        waitUntil: "commit",
      });
      await page.waitForLoadState("domcontentloaded", { timeout: 5000 });
      detailUrl = page.url();
    }

    await page.locator('a[aria-label="Back to Blog"]').click();
    await page.waitForURL(`${appUrl}/`, { timeout: 10000 });

    const returnUrl = page.url();

    writeFileSync(
      reportPath,
      JSON.stringify(
        {
          detailUrl,
          homepageBlogLinkCount,
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

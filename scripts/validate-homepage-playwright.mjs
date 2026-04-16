import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

import { launchStableChromium } from "./playwright-utils.mjs";

async function openRoute(page, url) {
  // 先等到 commit，再补 domcontentloaded，避免被远程资源拖住整页 load 事件。
  await page.goto(url, { timeout: 10000, waitUntil: "commit" });
  await page.waitForLoadState("domcontentloaded", { timeout: 5000 });
  await page.waitForTimeout(1200);
}

async function waitForRouteReady(page, matcher) {
  // 这里显式使用 commit，避免 Next.js 客户端跳转时卡在默认的 load 等待。
  await page.waitForURL(matcher, { timeout: 10000, waitUntil: "commit" });
  await page.waitForLoadState("domcontentloaded", { timeout: 5000 });
  await page.waitForTimeout(400);
}

async function collectRouteSummary(page, routePath) {
  await openRoute(page, new URL(routePath, page.url()).toString());

  const bodyText = await page.locator("body").innerText({ timeout: 5000 });
  const blogLinkCount = await page.locator('a[href^="/blog/"]').count();
  const workLinkCount = await page.locator('a[href^="/work/"]').count();

  return {
    bodyLength: bodyText.trim().length,
    blogLinkCount,
    url: page.url(),
    workLinkCount,
  };
}

async function openFirstHomepageDetail(page, routePrefix, fallbackPath) {
  const detailLinks = page.locator(`a[href^="${routePrefix}/"]`);
  const detailLinkCount = await detailLinks.count();

  if (detailLinkCount > 0) {
    await detailLinks.first().click();
    await waitForRouteReady(page, new RegExp(`${routePrefix}/[^/?#]+(?:\\?.*)?$`));
  } else {
    await openRoute(page, new URL(fallbackPath, page.url()).toString());
  }

  return {
    detailLinkCount,
    detailUrl: page.url(),
  };
}

async function clickBackLink(page, expectedUrl) {
  const backControl = page
    .locator('button:has-text("Back"), button:has-text("返回"), a:has-text("Back"), a:has-text("返回")')
    .first();

  await backControl.click();
  await waitForRouteReady(page, expectedUrl);

  return page.url();
}

async function main() {
  const appUrl = process.env.APP_URL ?? "http://localhost:3000";
  const fallbackBlogPath = process.env.PLAYWRIGHT_BLOG_PATH ?? "/blog/smartx-design-workflow";
  const fallbackWorkPath = process.env.PLAYWRIGHT_WORK_PATH ?? "/work/drawing-ledger-2-0?from=/";
  const artifactDir = path.join(process.cwd(), ".codex-artifacts");
  const screenshotPath = path.join(artifactDir, "homepage-playwright.png");
  const reportPath = path.join(artifactDir, "homepage-playwright-report.json");

  mkdirSync(artifactDir, { recursive: true });

  const browser = await launchStableChromium();

  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 2400 } });

    await openRoute(page, appUrl);
    await page.screenshot({ fullPage: true, path: screenshotPath });

    const homeBodyText = await page.locator("body").innerText({ timeout: 5000 });
    const homepageWorkLinkCount = await page.locator('a[href^="/work/"]').count();
    const hasHomepageWorksSection =
      homeBodyText.includes("Recent Works") || homeBodyText.includes("精选作品");

    const homepageBlogFlow = await openFirstHomepageDetail(page, "/blog", `${fallbackBlogPath}?from=/`);
    const blogReturnUrl = await clickBackLink(page, `${appUrl}/`);

    const homepageWorkFlow = await openFirstHomepageDetail(page, "/work", fallbackWorkPath);
    const workReturnUrl = await clickBackLink(page, `${appUrl}/`);

    const routeSummaries = {
      about: await collectRouteSummary(page, "/about"),
      blog: await collectRouteSummary(page, "/blog"),
      home: {
        bodyLength: homeBodyText.trim().length,
        blogLinkCount: homepageBlogFlow.detailLinkCount,
        url: appUrl,
        workLinkCount: homepageWorkLinkCount,
      },
      work: await collectRouteSummary(page, "/work"),
    };

    writeFileSync(
      reportPath,
      JSON.stringify(
        {
          blogDetailUrl: homepageBlogFlow.detailUrl,
          blogReturnUrl,
          hasHomepageWorksSection,
          returnToHomeAfterBlog: blogReturnUrl === `${appUrl}/`,
          returnToHomeAfterWork: workReturnUrl === `${appUrl}/`,
          routeSummaries,
          screenshotPath,
          status: "ok",
          workDetailUrl: homepageWorkFlow.detailUrl,
          workReturnUrl,
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

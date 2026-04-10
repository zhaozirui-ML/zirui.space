import os from "node:os";
import { execFileSync } from "node:child_process";

import {
  getChromeBinaryPath,
  getStableChromiumLaunchOptions,
  launchStableChromium,
} from "./playwright-utils.mjs";

function readFileOutput(command, args) {
  try {
    return execFileSync(command, args, { encoding: "utf8" }).trim();
  } catch {
    return null;
  }
}

async function main() {
  const chromePath = getChromeBinaryPath();
  const launchOptions = getStableChromiumLaunchOptions();

  console.log(
    JSON.stringify(
      {
        machineArch: os.arch(),
        platform: process.platform,
        chromePath,
        chromeFileInfo: chromePath ? readFileOutput("file", [chromePath]) : null,
        launchOptions,
      },
      null,
      2,
    ),
  );

  const browser = await launchStableChromium();

  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto("http://localhost:3000", { timeout: 10000, waitUntil: "commit" });
    await page.waitForLoadState("domcontentloaded", { timeout: 5000 });
    const title = await page.title();
    const bodyText = await page.locator("body").innerText({ timeout: 5000 });

    console.log(
      JSON.stringify(
        {
          title,
          hasRecentWorks: bodyText.includes("Recent Works"),
          status: "ok",
        },
        null,
        2,
      ),
    );
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});


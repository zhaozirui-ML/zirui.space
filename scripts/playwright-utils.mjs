import { createRequire } from "node:module";
import os from "node:os";
import path from "node:path";
import { chmodSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const require = createRequire(import.meta.url);

function tryResolvePlaywrightFromPath(modulePath) {
  if (!modulePath) {
    return null;
  }

  try {
    return require(modulePath);
  } catch {
    return null;
  }
}

export function resolvePlaywright() {
  const explicitModule = process.env.PLAYWRIGHT_MODULE_PATH;
  const explicitResolved = tryResolvePlaywrightFromPath(explicitModule);

  if (explicitResolved) {
    return explicitResolved;
  }

  try {
    return require("playwright");
  } catch {
    throw new Error(
      [
        "找不到可用的 Playwright 模块。",
        "如果仓库里还没有安装 playwright，请在运行脚本前传入 PLAYWRIGHT_MODULE_PATH。",
        "示例：PLAYWRIGHT_MODULE_PATH=/path/to/node_modules/playwright node scripts/playwright-doctor.mjs",
      ].join("\n"),
    );
  }
}

export function getChromeBinaryPath() {
  const explicitPath = process.env.PLAYWRIGHT_CHROME_PATH;

  if (explicitPath) {
    return explicitPath;
  }

  if (process.platform === "darwin") {
    return "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  }

  return null;
}

function readCommandOutput(command, args) {
  try {
    return execFileSync(command, args, { encoding: "utf8" }).trim();
  } catch {
    return null;
  }
}

function isAppleSiliconHardware() {
  if (process.platform !== "darwin") {
    return false;
  }

  // 这里不能只看 process.arch 或 uname -m，因为当前终端本身可能就在 Rosetta 下运行。
  return readCommandOutput("sysctl", ["-in", "hw.optional.arm64"]) === "1";
}

export function createArm64ChromeWrapper(browserPath) {
  if (!(isAppleSiliconHardware() && browserPath)) {
    return browserPath;
  }

  const wrapperDir = path.join(os.tmpdir(), "codex-playwright");
  const wrapperPath = path.join(wrapperDir, "chrome-arm64-wrapper.sh");

  mkdirSync(wrapperDir, { recursive: true });

  // 在 Apple Silicon 上强制用 arm64 启动 Chrome，避免 Playwright 误走 Rosetta x64 路径。
  writeFileSync(
    wrapperPath,
    `#!/bin/zsh\nexec arch -arm64 ${JSON.stringify(browserPath)} "$@"\n`,
    "utf8",
  );
  chmodSync(wrapperPath, 0o755);

  return wrapperPath;
}

export function getStableChromiumLaunchOptions() {
  const browserPath = getChromeBinaryPath();

  if (browserPath && existsSync(browserPath)) {
    return {
      executablePath: createArm64ChromeWrapper(browserPath),
      headless: true,
    };
  }

  return {
    channel: "chrome",
    headless: true,
  };
}

export async function launchStableChromium() {
  const { chromium } = resolvePlaywright();

  return chromium.launch(getStableChromiumLaunchOptions());
}

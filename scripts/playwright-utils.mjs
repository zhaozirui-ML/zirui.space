import { execFileSync } from "node:child_process";
import { chmodSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import os from "node:os";
import path from "node:path";

const require = createRequire(import.meta.url);

function readCommandOutput(command, args) {
  try {
    return execFileSync(command, args, { encoding: "utf8" }).trim();
  } catch {
    return null;
  }
}

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

function findCachedPlaywrightModulePath() {
  const homeDir = process.env.HOME;

  if (!homeDir) {
    return null;
  }

  const npxRoot = path.join(homeDir, ".npm", "_npx");

  if (!existsSync(npxRoot)) {
    return null;
  }

  const candidates = [];

  for (const entry of readdirSync(npxRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }

    const modulePath = path.join(npxRoot, entry.name, "node_modules", "playwright");
    const packageJsonPath = path.join(modulePath, "package.json");

    if (!existsSync(packageJsonPath)) {
      continue;
    }

    try {
      const stats = statSync(packageJsonPath);
      candidates.push({
        modulePath,
        mtimeMs: stats.mtimeMs,
      });
    } catch {
      // 缓存目录偶尔会被清理到一半，忽略异常候选继续找。
    }
  }

  candidates.sort((left, right) => right.mtimeMs - left.mtimeMs);

  return candidates[0]?.modulePath ?? null;
}

export function resolvePlaywright() {
  const explicitModulePath = process.env.PLAYWRIGHT_MODULE_PATH;
  const explicitModule = tryResolvePlaywrightFromPath(explicitModulePath);

  if (explicitModule) {
    return explicitModule;
  }

  try {
    return require("playwright-core");
  } catch {
    // 优先使用仓库里正式声明的轻量依赖，避免继续依赖本机缓存。
  }

  try {
    return require("playwright");
  } catch {
    const cachedModulePath = findCachedPlaywrightModulePath();
    const cachedModule = tryResolvePlaywrightFromPath(cachedModulePath);

    if (cachedModule) {
      return cachedModule;
    }

    throw new Error(
      [
        "找不到可用的 Playwright 模块。",
        "脚本已经自动尝试了这些来源：",
        "1. PLAYWRIGHT_MODULE_PATH",
        "2. 仓库自己的 node_modules/playwright-core",
        "3. 仓库自己的 node_modules/playwright",
        "4. 本机 ~/.npm/_npx 缓存里的 playwright",
        "如果这些都没有，才需要继续检查依赖安装是否完整。",
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

function isAppleSiliconHardware() {
  if (process.platform !== "darwin") {
    return false;
  }

  // 这里不能信 process.arch，因为当前终端可能跑在 Rosetta x64 下。
  return readCommandOutput("sysctl", ["-in", "hw.optional.arm64"]) === "1";
}

function createArm64ChromeWrapper(browserPath) {
  if (!(browserPath && isAppleSiliconHardware())) {
    return browserPath;
  }

  const wrapperDir = path.join(os.tmpdir(), "codex-playwright");
  const wrapperPath = path.join(wrapperDir, "chrome-arm64-wrapper.sh");

  mkdirSync(wrapperDir, { recursive: true });

  // 在 Apple Silicon 机器上强制用 arm64 启动 Chrome，绕开 Rosetta x64 导致的事件异常。
  writeFileSync(
    wrapperPath,
    `#!/bin/zsh\nexec arch -arm64 ${JSON.stringify(browserPath)} "$@"\n`,
    "utf8",
  );
  chmodSync(wrapperPath, 0o755);

  return wrapperPath;
}

export function getStableChromiumLaunchOptions() {
  const chromePath = getChromeBinaryPath();

  if (chromePath && existsSync(chromePath)) {
    return {
      executablePath: createArm64ChromeWrapper(chromePath),
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

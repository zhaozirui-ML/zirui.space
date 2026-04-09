import { spawn } from "node:child_process";
import { existsSync, readFileSync, rmSync } from "node:fs";
import path from "node:path";

const cwd = process.cwd();
const lockPath = path.join(cwd, ".next", "dev", "lock");

function isPidRunning(pid) {
  if (!Number.isInteger(pid) || pid <= 0) {
    return false;
  }

  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function readDevLock() {
  if (!existsSync(lockPath)) {
    return null;
  }

  try {
    return JSON.parse(readFileSync(lockPath, "utf8"));
  } catch {
    return null;
  }
}

function removeStaleLock() {
  if (!existsSync(lockPath)) {
    return;
  }

  // 这里主动清理失效锁文件，避免旧进程异常退出后卡住新的 dev 启动。
  rmSync(lockPath, { force: true });
}

function printReuseMessage(lockInfo) {
  const appUrl = lockInfo?.appUrl ?? "http://localhost:3000";
  const pid = lockInfo?.pid ?? "unknown";

  console.log("A dev server for this worktree is already running.");
  console.log(`Reusing existing server: ${appUrl}`);
  console.log(`PID: ${pid}`);
  console.log("Run `kill <PID>` first if you want to restart it.");
}

async function isServerResponsive(appUrl) {
  if (!appUrl) {
    return false;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 1500);

  try {
    const response = await fetch(appUrl, {
      cache: "no-store",
      redirect: "manual",
      signal: controller.signal,
    });

    return response.status >= 200 && response.status < 500;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

async function stopHungProcess(pid) {
  if (!isPidRunning(pid)) {
    return;
  }

  console.log(`Detected an unresponsive dev server (PID ${pid}). Restarting it.`);

  try {
    process.kill(pid, "SIGTERM");
  } catch {
    return;
  }

  const deadline = Date.now() + 5000;

  while (Date.now() < deadline) {
    if (!isPidRunning(pid)) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 150));
  }

  // 如果进程在合理时间内没有退出，再强制结束，避免 dev 锁一直卡住。
  process.kill(pid, "SIGKILL");
}

function startNextDev() {
  const nextBin =
    process.platform === "win32"
      ? path.join(cwd, "node_modules", ".bin", "next.cmd")
      : path.join(cwd, "node_modules", ".bin", "next");

  const child = spawn(nextBin, ["dev", "--webpack", ...process.argv.slice(2)], {
    cwd,
    stdio: "inherit",
  });

  child.on("exit", (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }

    process.exit(code ?? 1);
  });

  child.on("error", (error) => {
    console.error(error);
    process.exit(1);
  });
}

const lockInfo = readDevLock();

if (lockInfo?.pid && isPidRunning(lockInfo.pid)) {
  const isResponsive = await isServerResponsive(lockInfo.appUrl);

  if (isResponsive) {
    printReuseMessage(lockInfo);
    process.exit(0);
  }

  await stopHungProcess(lockInfo.pid);
}

if (lockInfo) {
  console.log("Found a stale or unhealthy Next.js dev lock. Cleaning it up before restart.");
  removeStaleLock();
}

startNextDev();

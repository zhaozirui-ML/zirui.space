import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const cwd = process.cwd();
const nodeModulesPath = path.join(cwd, "node_modules");
const pnpmCommand = process.platform === "win32" ? "pnpm.cmd" : "pnpm";

function runPnpm(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(pnpmCommand, args, {
      cwd,
      stdio: "inherit",
    });

    child.on("exit", (code, signal) => {
      if (signal) {
        reject(new Error(`pnpm ${args.join(" ")} stopped by signal ${signal}`));
        return;
      }

      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`pnpm ${args.join(" ")} failed with exit code ${code ?? 1}`));
    });

    child.on("error", reject);
  });
}

if (!existsSync(nodeModulesPath)) {
  // 新 worktree 通常没有 node_modules；这里自动补齐已有依赖，不会新增 package.json 里的新依赖。
  console.log("[codex-run] 当前 worktree 缺少 node_modules，开始执行 pnpm install。");
  await runPnpm(["install"]);
}

// 继续交给现有 dev 脚本处理端口占用、失效锁文件和已有 dev server 复用。
await runPnpm(["dev"]);

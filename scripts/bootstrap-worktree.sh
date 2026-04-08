#!/bin/sh

set -u

log() {
  printf '[worktree-bootstrap] %s\n' "$1"
}

repo_root="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"

if ! cd "$repo_root"; then
  log "无法进入仓库根目录，跳过 worktree 初始化。"
  exit 0
fi

if [ ! -f package.json ]; then
  log "当前目录没有 package.json，跳过依赖安装。"
  exit 0
fi

if ! command -v pnpm >/dev/null 2>&1; then
  log "系统里没有找到 pnpm，无法自动初始化当前 worktree。"
  exit 0
fi

if [ ! -d node_modules ]; then
  log "检测到当前 worktree 缺少 node_modules，开始执行 pnpm install。"

  if ! pnpm install; then
    log "pnpm install 失败。worktree 已创建，但依赖还没有准备好。"
    exit 0
  fi
else
  log "当前 worktree 已存在 node_modules，跳过 pnpm install。"
fi

log "开始执行 pnpm typecheck。"
if ! pnpm typecheck; then
  log "pnpm typecheck 失败，请根据上方输出继续处理。"
  exit 0
fi

log "开始执行 pnpm lint。"
if ! pnpm lint; then
  log "pnpm lint 失败，请根据上方输出继续处理。"
  exit 0
fi

log "worktree 初始化完成。"
exit 0

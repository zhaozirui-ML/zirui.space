# Playwright Phase 1: Browser Stability

## 目标
- 解决本地 Playwright 在当前机器上“浏览器能启动，但页面加载和交互像卡住一样”的问题。
- 让首页校验脚本可以稳定复用，而不是依赖一次性的本机缓存命令。
- 保持小步修改，不重构现有页面，只补稳定启动和验证链路。

## 改动
- 新增 `scripts/playwright-utils.mjs`：
  - 统一处理 Playwright 模块解析。
  - 优先使用仓库正式依赖 `playwright-core`，再回退到本机缓存。
  - 不再相信 `process.arch`，改用 `sysctl -in hw.optional.arm64` 判断机器真实架构。
  - 在 Apple Silicon 机器上自动生成 `arch -arm64` 的 Chrome wrapper，强制用原生 arm64 启动系统 Chrome。
- 新增 `scripts/playwright-doctor.mjs`：
  - 输出当前终端架构、机器真实架构、Chrome 二进制信息和实际启动参数。
  - 用最小页面读取流程验证浏览器是否真的稳定可用。
- 新增 `scripts/validate-homepage-playwright.mjs`：
  - 对首页做真实浏览器校验。
  - 先截图，再检查 blog 详情页返回链路。
  - 收紧 blog 链接选择器，避免误点 `/blog` 列表页。
- 更新 `package.json`：
  - 新增 `pnpm playwright:doctor`
  - 新增 `pnpm validate:homepage:playwright`
  - 正式接入 `playwright-core`
- 顺手补齐 blog 返回来源逻辑：
  - `app/(site)/blog/[slug]/page.jsx` 现在会读取 `searchParams.from`
  - `src/site/pages/BlogDetailPage.jsx` 现在支持通过 `returnHref` 返回首页或 blog 列表

## 验证结果
- 根因已确认：
  - 当前终端里的 Node 进程是 `x64`
  - 机器真实架构是 `arm64`
  - 之前 Playwright 跟着 Rosetta `x64` 进程启动 Chrome，导致页面生命周期事件不稳定
- 诊断脚本通过：
  - `pnpm playwright:doctor`
  - 输出已确认实际使用的是 arm64 Chrome wrapper
- 页面校验脚本通过：
  - `pnpm validate:homepage:playwright`
  - 已确认 blog 详情页可通过 `?from=/` 返回首页
- 静态检查通过：
  - `pnpm typecheck`
  - `pnpm lint`

## 下一步
- 如果后面要继续扩大自动化覆盖，优先新增更多“单页面验证脚本”，而不是先引入完整 E2E 测试体系。
- 如果后面需要跨机器协作，可以再补一份简短 README，说明：
  - 这套脚本默认依赖系统 Chrome
  - 为什么仓库使用 `playwright-core`
  - 出现架构问题时优先运行 `pnpm playwright:doctor`

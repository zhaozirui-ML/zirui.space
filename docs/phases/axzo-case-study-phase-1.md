# AXZO Case Study Phase 1

## 这次改动的目标
- 把 Figma 长页 `DS 官网设计` 首次接入到站点里。
- 不改整站信息架构，只把 `/work/axzo-design-system` 从占位骨架切换成真实案例页。
- 优先复用现有 Next.js 路由、作品集 token 和站点外壳，控制改动范围。

## 这次做了什么
- 新增 `AXZO` 案例页专用数据文件，把文案、图片路径、分组结构集中管理。
- 新增 `AXZO` 案例页组件，按 Figma 的章节顺序渲染：
  - 封面
  - 项目背景
  - 问题定义
  - 设计洞察
  - 官网定位
  - 设计目标
  - 设计探索
  - 设计实践
  - 成果与复盘
- 新增专用 CSS module，把这页的布局、卡片、长图容器和移动端堆叠独立出来。
- 下载并接入 Figma 里的关键图片资源到 `public/site/work/axzo-design-system/`。
- 修改 `WorkDetailPage`，让 `axzo-design-system` slug 使用新页面，其它案例继续走旧骨架。
- 生成桌面端、移动端和整页截图做可视化验证。

## 这次没做什么
- 没有改首页作品卡的文案和缩略图逻辑。
- 没有把其它案例页一起改成同样的结构。
- 没有正式接入 Figma 里使用的中文标题字体。
- 没有新增页面级 metadata、OG 图或结构化数据。
- 没有把这套案例页继续抽象成通用“长案例模板”。

## 改了哪些关键文件
- `src/site/data/axzo-design-system-case-study.js`
- `src/site/pages/AxzoDesignSystemCaseStudyPage.jsx`
- `src/site/styles/axzo-design-system-case-study.module.css`
- `src/site/pages/WorkDetailPage.jsx`
- `public/site/work/axzo-design-system/*`

## 为什么这样改
- 先做单案例接入，比“直接重写全部作品详情页体系”更安全，也更容易验证。
- 文案和图片单独放进 data 文件，后续你继续接别的案例时，可以复用同样的页面结构。
- 样式单独放 CSS module，避免把这页的特殊布局污染到其它页面。
- 图片先落到本地 `public`，比继续依赖 Figma 临时资源 URL 更稳定。

## 遇到了什么问题、怎么排查
- 初次跑校验失败：
  - 原因：当前 worktree 没有 `node_modules`，`tsc` 和 `eslint` 命令不存在。
  - 处理：执行 `pnpm install --frozen-lockfile`，只安装锁文件里已有依赖，没有新增包。
- 初次页面截图拿到的是旧骨架：
  - 原因：本地 `3000` 端口上的 Next server 不是当前 worktree 的最新内容。
  - 处理：停掉旧 server，在当前 worktree 重新启动 `pnpm dev`，改用 `3003` 验证。
- Playwright MCP 无法直接截图：
  - 原因：环境里的临时目录创建失败。
  - 处理：改用本机 Chrome headless 生成本地截图继续验证。

## 当前验证结果
- `pnpm typecheck` 通过。
- `pnpm lint` 通过。
- 页面已在本地 dev server 成功渲染：
  - 桌面端首屏截图已检查
  - 移动端首屏截图已检查
  - 整页长图截图已检查

## 下一步建议
- 如果你确认这页的视觉方向成立，下一步可以继续做下面几件事中的一个：
  1. 正式接入中文标题字体，替换当前的系统衬线近似方案。
  2. 优化首页 `AXZO Design System` 作品卡的 summary 和预览图，让入口和详情页叙事统一。
  3. 把这次的案例页结构提炼成一个可复用的长案例模板，方便继续接入别的项目。
  4. 继续微调移动端的纵向节奏，比如洞察图和长截图之间的留白。

# Case Study System Phase 1

## 这次改动的目标

- 把作品详情页从“单页临时实现”推进到“可复用的案例页体系”。
- 统一案例页的标题、目录、主题色来源和路由接入方式。
- 先让 `drawing-ledger-2-0`、`axzo-design-system`、`data-visualization-screen` 三个案例都进入同一套结构，再继续做媒体资源迁移。
- 顺手修复本地开发环境里 `pnpm dev` 的重复启动和假活进程问题，降低后续迭代时的摩擦。

## 这次做了什么

### 1. 建立共享的案例页组件层

- 新增共享标题组件：
  - `src/site/components/case-study/CaseStudyHeading.jsx`
- 新增共享目录组件：
  - `src/site/components/case-study/CaseStudyToc.jsx`
- 新增对应样式：
  - `src/site/styles/case-study-heading.module.css`
  - `src/site/styles/case-study-toc.module.css`

当前共享标题组件包含：

- `CaseStudyHeadingOne`
- `CaseStudyHeadingTwo`
- `CaseStudyHeadingThree`

目录组件支持：

- 一级、二级目录层级
- 当前 section 高亮
- 返回按钮
- 桌面端 absolute + sticky 布局
- 案例页主题色覆盖

### 2. 数据可视化案例页接入共享体系

- `src/site/components/work-detail/DataVisualizationScreenDetail.jsx`
- `src/site/data/data-visualization-screen-detail.js`
- `src/site/styles/data-visualization-screen-detail.module.css`

这一页已经完成：

- 独立长页实现
- 顶部导航隐藏、封面图置顶
- 目录组件接入
- 共享标题组件接入
- 832px 文本轨道 / 1200px 图片轨道拆分
- 案例页主题色变量接入

### 3. JoinLedger2 案例页接回当前项目并统一结构

- 新增/迁回：
  - `src/site/components/work/DrawingLedgerCaseStudy.jsx`
  - `src/site/data/work-details/drawing-ledger-2-0.js`
  - `src/site/styles/drawing-ledger-case-study.module.css`
  - `public/site/work/drawing-ledger-2-0/*`

这一页已经完成：

- 从旧分支接回独立长页
- 接入共享目录组件
- 原有本地标题封装删除，直接改用共享 `CaseStudyHeading`
- 页面主题色改为从 `work-items.js` 读取

### 4. AXZO 案例页接回当前项目并统一结构

- 新增/迁回：
  - `src/site/pages/AxzoDesignSystemCaseStudyPage.jsx`
  - `src/site/data/axzo-design-system-case-study.js`
  - `src/site/styles/axzo-design-system-case-study.module.css`
  - `public/site/work/axzo-design-system/*`
- 同时更新：
  - `src/site/pages/WorkDetailPage.jsx`

这一页已经完成：

- 从 `codex/project-axzo-ds` 分支迁回独立长页
- 用共享 `CaseStudyHeading` 替换本地 `SectionHeader`
- 接入共享目录组件
- 清理迁移后不再使用的旧标题样式
- 目录锚点和二级目录层级接齐

### 5. 统一案例页主题色来源

- 更新：
  - `src/site/data/work-items.js`

当前每个案例都支持：

- `detailTheme.headingAccentColor`

这意味着：

- 标题强调色
- 目录激活态强调色
- 目录 hover 圆点颜色

都不需要再分别在页面里手写一套颜色来源。

### 6. 统一三页目录的接入方式

三个案例页现在都使用同一套目录参数结构：

- `desktopShiftX`
- `desktopStartOffset`
- `desktopStickyTop`

说明：

- 三页不是“强行用同一组数值”
- 而是统一“参数字段和接入方式”
- 每页再根据自己的正文起点结构传不同值

这样可以兼顾：

- 页面真实版式差异
- 代码结构的一致性
- 后续统一调节时的可理解性

### 7. 修复本地开发环境的 dev 启动问题

- 新增：
  - `scripts/dev.mjs`
- 更新：
  - `package.json`

这次修复了两个问题：

- 同一个 worktree 已经有 dev server 在跑时，再次执行 `pnpm dev` 会红字失败
- 某些情况下旧 `next-server` 进程虽然还活着，但服务实际上已经卡死，脚本会误把它当成“可复用服务”

现在新的 `dev` 启动逻辑会：

- 优先读取 `.next/dev/lock`
- 检查旧服务是否真的能响应
- 服务健康就复用
- 服务卡死就自动结束旧进程、清理锁文件、重新启动

## 这次没做什么

- 没有正式接入新的中文标题字体
- 没有处理所有 `next/image` warning
- 没有把所有媒体资源都迁到 Supabase
- 没有统一精调三页目录的最终横向距离与视觉细节
- 没有抽象更高层的“长案例模板”页面壳

## 改了哪些关键文件

### 共享组件

- `src/site/components/case-study/CaseStudyHeading.jsx`
- `src/site/components/case-study/CaseStudyToc.jsx`
- `src/site/styles/case-study-heading.module.css`
- `src/site/styles/case-study-toc.module.css`

### 案例页

- `src/site/components/work-detail/DataVisualizationScreenDetail.jsx`
- `src/site/data/data-visualization-screen-detail.js`
- `src/site/styles/data-visualization-screen-detail.module.css`
- `src/site/components/work/DrawingLedgerCaseStudy.jsx`
- `src/site/data/work-details/drawing-ledger-2-0.js`
- `src/site/styles/drawing-ledger-case-study.module.css`
- `src/site/pages/AxzoDesignSystemCaseStudyPage.jsx`
- `src/site/data/axzo-design-system-case-study.js`
- `src/site/styles/axzo-design-system-case-study.module.css`
- `src/site/pages/WorkDetailPage.jsx`
- `src/site/data/work-items.js`

### 开发环境

- `scripts/dev.mjs`
- `package.json`

## 为什么这样改

- 先统一案例页“结构层”，比先继续堆页面细节更稳
- 标题、目录、主题色来源这类问题，一旦不早点收敛，后面案例越多越难统一
- 目录先做成共享组件，可以避免每页自己长一套交互逻辑
- 主题色先进入 `work-items.js`，后面新增案例时才不会继续散落配置
- 开发环境先修顺，是为了降低后面接入 Supabase 和继续改页面时的反馈成本

## 遇到了什么问题、怎么排查

### 1. 目录虽然复用了组件，但三页的接法最初不一致

排查结果：

- 数据可视化页和 AXZO 页已经显式传 `desktopShiftX / desktopStartOffset / desktopStickyTop`
- JoinLedger2 还保留旧的 `desktopTopOffset` 写法

处理方式：

- 不强行把三页目录改成同一组数值
- 而是把三页统一到同一组参数字段，再根据各自正文起点传不同值

### 2. 重复执行 `pnpm dev` 时会报错退出

排查结果：

- Next 16 会把当前 worktree 的 dev 进程信息写到 `.next/dev/lock`
- 再次启动时，如果发现同一个 worktree 已经有 dev server 在跑，会直接报错退出

处理方式：

- 把 `dev` 改成自己的小脚本入口
- 先检查锁文件和旧服务健康状态，再决定复用还是重启

### 3. `3002` 端口上的服务出现“假活着”

排查结果：

- 旧进程还在
- 端口也还在监听
- 但 `curl` 请求一直没有响应
- 日志里能看到 `write EPIPE`

处理方式：

- 脚本里新增健康检查
- 发现服务不响应时自动终止旧进程并重新启动

## 当前验证结果

- `pnpm typecheck` 通过
- `pnpm lint` 通过
- 三个案例页都已进入独立详情页或独立长页结构
- 三个案例页都已接入共享标题组件
- 三个案例页都已接入共享目录组件
- `pnpm dev` 在已有健康服务时会正常复用
- `pnpm dev` 在旧服务卡死时会自动恢复
- 当前 `http://localhost:3002` 可正常返回 `200 OK`

## 下一步建议

1. 继续接入 Supabase Storage，但先按“单案例小步迁移”推进
2. 优先迁移已经确认大部分资源存在于 Supabase 的案例页
3. 等所有图片和视频都接好之后，再统一微调三页目录的横向位置和视觉细节
4. 最后再处理反复出现的 `next/image` warning 和字体正式接入

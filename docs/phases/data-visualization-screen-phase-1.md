# Data Visualization Screen Phase 1

## 1. 这次改动的目标

这次不是一次性把整张 Figma 长页全部实现完，而是先完成一个清晰的第一阶段：

- 把 `data-visualization-screen` 从“详情页占位骨架”升级为“可访问、可继续扩展的真实案例页”
- 先实现 Figma 前半段内容：
  - 封面 Hero
  - 项目背景
  - 问题定义
  - 设计目标
- 保持改动只影响这一个案例 slug，不波及其他详情页

这样拆的原因是：

- 这张设计稿本身是长页，内容很多
- 一次性全接入，排查问题会更难
- 先完成前半段，可以先确认页面结构、资源组织方式、样式策略是不是合适

---

## 2. 这次做了什么

### 2.1 把当前案例切到专用详情页组件

文件：

- `src/site/pages/WorkDetailPage.jsx`

做了什么：

- 为 `data-visualization-screen` 增加了一个 `slug` 分流
- 只有这个案例会渲染新的专用长页组件
- 其他案例依然保留原来的通用占位骨架

为什么这样做：

- 风险最小
- 不需要重构整个详情页系统
- 第二阶段继续补内容时，也只需要在这一个专用组件里继续写

---

### 2.2 新增案例专用数据文件

文件：

- `src/site/data/data-visualization-screen-detail.js`

做了什么：

- 把第一阶段用到的文案、图片路径、问题卡片、目标卡片全部集中整理到一个对象里

为什么这样做：

- 让组件只负责“怎么渲染”
- 把内容和结构拆开，更容易继续补第二阶段
- 后续如果你要改文案，不用先在 JSX 里找半天

---

### 2.3 新增案例专用组件和局部样式

文件：

- `src/site/components/work-detail/DataVisualizationScreenDetail.jsx`
- `src/site/styles/data-visualization-screen-detail.module.css`

做了什么：

- 新增了只服务这一个案例页的 React 组件
- 新增了只服务这一个案例页的 CSS Module
- 实现了：
  - 全宽 Hero
  - 主视觉大图
  - 项目背景文字区
  - 问题定义 4 宫格卡片
  - 设计目标 3 张说明卡片

为什么用局部样式而不是继续往 `site-shell.module.css` 里堆：

- 这页是长案例页，样式特征和普通列表页不同
- 放在独立模块里更容易读，也更容易回退
- 后面第二阶段继续补图片区、成果区、复盘区时，样式不会和通用页面互相污染

---

### 2.4 把 Figma 资源下载为本地静态文件

文件目录：

- `public/site/work/data-visualization-screen/`

做了什么：

- 下载了 Hero 背景图
- 下载了 Hero 主图
- 下载了问题定义区的 4 个图标资源

为什么不直接继续用 Figma 返回的临时链接：

- Figma MCP 资源链接是临时的
- 后续链接失效后，页面会丢图
- 下载成本地后，页面更稳定，也方便第二阶段继续复用

---

### 2.5 更新了作品数据里的详情摘要

文件：

- `src/site/data/work-items.js`

做了什么：

- 把这个案例原来“还没开始做”的占位说明，替换成了更接近当前内容的摘要

为什么要改：

- 避免数据层还在说“骨架已预留”，但页面实际上已经进入真实实现阶段

---

## 3. 这次没做什么

这次刻意没有做下面这些内容：

- 没有接入 Figma 后半段的“设计实践”
- 没有接入“设计成果”
- 没有接入“项目复盘”
- 没有为这个案例引入新的正式标题字体
- 没有重构站点整体布局或通用详情页体系

原因是：

- 这次目标是先做最小可行的第一阶段
- 先把内容结构、资源落地、局部样式策略验证清楚
- 字体接入本身是独立决策，应该单独说明来源、范围和影响后再做

---

## 4. 为什么这样改

这次实现时有一个重要现实约束：

- Figma 标题使用的是单独的中文衬线字体
- 项目当前正式接入的站点字体是 `Ivy Presto` 和 `Satoshi`

所以这次采取了一个刻意保守的策略：

- 先用现有标题变量
- 再加系统宋体作为临时兜底
- 不在第一阶段里同时处理“页面实现”和“字体接入”两个变量

这样做的好处是：

- 你可以先判断页面结构和视觉节奏是否满意
- 如果后面决定要更高还原度，再单独做正式字体接入
- 每一步的变化都更容易验证和理解

---

## 5. 当前验证结果

这次已经完成的验证包括：

- `pnpm install --frozen-lockfile`
- `pnpm typecheck`
- `pnpm lint`
- 在 `3100` 端口启动当前 worktree 的 dev server
- 访问 `/work/data-visualization-screen`，确认已经不再是旧占位页
- 生成页面截图：
  - `.codex-artifacts/data-visualization-stage1.png`

当前确认结果：

- 路由已经接到新页面
- 前半段内容顺序正确
- 本地图片资源加载正常
- 样式作用域正确，没有污染其他页面

---

## 6. 改了哪些关键文件

- `src/site/pages/WorkDetailPage.jsx`
- `src/site/data/work-items.js`
- `src/site/data/data-visualization-screen-detail.js`
- `src/site/components/work-detail/DataVisualizationScreenDetail.jsx`
- `src/site/styles/data-visualization-screen-detail.module.css`
- `public/site/work/data-visualization-screen/*`

---

## 7. 下一步建议

最自然的第二阶段是继续按同样方式，把 Figma 后半段补进去：

- 设计实践
- 图片展示容器
- 设计成果
- 项目复盘

建议继续保持这次的做法：

- 先从 Figma 按区块拆节点
- 先把图片资源落本地
- 再把每一段接到同一个专用组件中

如果你想追求更高的标题还原度，建议把“正式中文标题字体接入”作为一个单独确认项，不要混在第二阶段内容接入里一起做。

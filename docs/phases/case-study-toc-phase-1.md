# 通用案例目录组件 Phase 1

## 这次改动的目标

- 把当前图纸台账案例页里的左侧目录，从“当前项目专用实现”整理成“后续案例页可复用组件”
- 保留现有桌面端交互和目录定位能力，同时把项目差异项收敛成可配置参数
- 明确移动端默认不展示目录，避免后续每个项目都重复判断

## 这次做了什么

- 新增了一个通用案例目录组件：
  - `src/site/components/case-study/CaseStudyToc.jsx`
- 新增了一个目录专用样式模块：
  - `src/site/styles/case-study-toc.module.css`
- 把原本散落在图纸台账案例页里的目录结构、交互逻辑、返回入口和桌面端定位规则，迁移到通用组件里
- 把当前图纸台账案例页改成直接消费这个通用组件
- 把当前项目需要变化的值，整理成配置传入：
  - `accentColor`
  - `titleColor`
  - `mutedColor`
  - `backHref`
  - `backLabel`
- 删除了原来的项目专用目录组件：
  - `src/site/components/work/WorkCaseStudyToc.jsx`
- 删除了原案例页样式文件里那批目录专用 `.toc*` 规则，避免两套样式并存

## 这次没做什么

- 还没有把目录配置抽到单独的数据文件里，目前仍然先放在当前案例页组件内
- 还没有把不同项目的主题色方案整理成统一的目录主题 token
- 还没有为第二个案例页真正接入并验证这套抽象
- 还没有给目录增加可选的移动端展示开关，这一版先固定为移动端隐藏

## 改了哪些关键文件

- `src/site/components/case-study/CaseStudyToc.jsx`
- `src/site/styles/case-study-toc.module.css`
- `src/site/components/work/DrawingLedgerCaseStudy.jsx`
- `src/site/styles/drawing-ledger-case-study.module.css`
- `docs/phases/case-study-toc-phase-1.md`

## 为什么这样改

- 你已经明确后续 2-5 个项目都会复用这套目录，所以继续每个项目重写一遍，维护成本会越来越高
- 这次只抽目录，不抽整篇案例页，是为了控制风险，避免一次性做成过重的“万能案例系统”
- 把颜色和返回文案做成配置，是因为这些确实会因项目不同而变化
- 把桌面展示、移动端隐藏作为组件默认行为，是因为这符合你当前的案例页使用场景，也能减少每个项目重复判断

## 遇到了什么问题、怎么排查

### 1. 当前目录逻辑和样式分散在项目专用文件里

- 问题：目录组件逻辑在 `WorkCaseStudyToc.jsx`，样式却混在 `drawing-ledger-case-study.module.css` 里
- 处理：把目录逻辑和样式一起迁到独立的通用组件和样式模块中

### 2. 目录位置不仅是视觉问题，还依赖案例页布局

- 问题：目录的左侧定位、sticky top、内容区对齐并不是纯目录内部问题
- 处理：把这些值保留为组件可配置项，但先给出和当前案例页一致的默认值

### 3. 需要保留之前尝试过的 hover 扩散背景实现

- 问题：你不想彻底删掉那套背景扩散代码，避免后续还要重写
- 处理：把这套实现保留在通用目录样式里，但默认透明度设为 `0`

## 当前验证结果

- `pnpm typecheck` 通过
- `pnpm lint` 通过
- 当前图纸台账案例页已经切到通用目录组件，没有保留旧的项目专用目录组件依赖
- 目录在移动端默认不展示
- 当前页面视觉效果保持不变，目录交互能力仍可用

## 下一步建议

- 做第二个案例页时，先直接复用 `CaseStudyToc`，只传新的目录内容和主题色
- 如果第二个案例页也需要相同的目录定位规则，就继续沿用默认值
- 如果第二个案例页的内容区宽度或顶部起点不同，再决定是否把：
  - `desktopTopOffset`
  - `desktopShiftX`
  - `levelIndent`
 进一步整理成更统一的布局 token
- 等第二个案例页验证完成后，再决定是否把目录配置抽到：
  - `src/site/data/case-study-toc/*`
 这类更清晰的配置目录中

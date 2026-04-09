# Supabase Storage Phase 3: Data Visualization

## 这次改动的目标

- 在素材已经上传完成的前提下，把 `Data Visualization` 这一页真正接到 Supabase。
- 保持小步修改，只改这一页的数据源和远程图片兼容，不改页面布局、不改目录、不改标题系统。
- 把这页本地目录名和 Supabase 实际目录名之间的差异记录清楚，避免后面重复排查。

## 这次做了什么

### 1. 确认了这页在 Supabase 里的真实目录名

本地目录是：

- `public/site/work/data-visualization-screen`

但你实际上传到 Supabase 的目录是：

- `work/data-visualization`

这意味着：

- 不能直接把本地路径 `/site/work/data-visualization-screen/...`
- 原样推导成 `work/data-visualization-screen/...`

否则页面会一直指向错误目录。

### 2. 在数据层集中处理路径映射

更新文件：

- `src/site/data/data-visualization-screen-detail.js`

这次新增了：

- `getStorageAssetUrl`
- `preferSupabaseAssets = true`
- `pendingSupabaseAssetPaths`
- `getStoragePathFromLocalSrc(localSrc)`
- `resolveAssetSource(localSrc)`

其中最关键的是 `getStoragePathFromLocalSrc(localSrc)`。

它负责把这页的本地路径：

- `/site/work/data-visualization-screen/...`

统一映射成 Supabase 路径：

- `work/data-visualization/...`

这样做的好处是：

- 目录名差异只在数据层处理一次
- 组件层不需要知道这件事
- 后面如果你把 Supabase 目录名改回和本地一致，也只需要改一个地方

### 3. 把这页的真实素材切到 Supabase

在数据对象里，这次已经把以下内容接到了 `resolveAssetSource(...)`：

- Hero 背景图
- Hero 主图
- 问题定义 4 张图标
- 设计实践主图
- 设计实践 4 张缩略图
- 设计成果总览图
- 复盘区 4 张缩略图

也就是说，这页目前所有真正来自图片文件的内容，都已经改成由数据层统一决定“走本地还是走 Supabase”。

### 4. 让页面层正确渲染远程图片

更新文件：

- `src/site/components/work-detail/DataVisualizationScreenDetail.jsx`

这次新增了：

- `shouldBypassNextImageOptimizer(source)`

并且给所有可能来自 Supabase 的 `<Image>` 都补上了：

- `unoptimized={shouldBypassNextImageOptimizer(...)}`

原因是：

- 本地图片和 Supabase 公开图片都能被 `<Image>` 使用
- 但远程图片如果继续走默认优化链路，在当前项目的本地开发环境里更容易引入额外干扰

这一步沿用的是前面案例页已经验证过的策略。

### 5. 把两块临时重建模块替换成真实视频

在 `组件化沉淀` 这一段里，之前有两块内容因为当时拿不到真实媒体素材，所以先用了手写重建的前端模块占位。

现在你已经把真实视频上传到了 Supabase，因此这次把它们正式替换成了真实媒体：

- `work/data-visualization/metric-card.mp4`
- `work/data-visualization/charts.mp4`

做法是：

- 在 `src/site/data/data-visualization-screen-detail.js` 的 `practice.systemization.demos` 里新增 `videoSrc`
- 在 `src/site/components/work-detail/DataVisualizationScreenDetail.jsx` 里删除原来的手写重建组件渲染
- 改为直接使用 `<video>` 标签播放真实视频

这样现在这一段展示的就不再是“仿出来的界面”，而是你项目里的真实演示内容。

## 这次没做什么

- 没有改 `AXZO` 当前默认仍走本地资源的状态
- 没有调整 `Design System` 和 `Drawing Ledger 2.0` 现有接法
- 没有接视频资源
- 没有改页面布局、目录位置、标题样式
- 没有把这套路径映射抽成全局公共规则
- 没有给视频补 `poster` 封面图
- 没有加入视频播放控件，当前是自动播放、静音、循环展示

## 改了哪些关键文件

- `src/site/data/data-visualization-screen-detail.js`
- `src/site/components/work-detail/DataVisualizationScreenDetail.jsx`
- `docs/phases/supabase-storage-phase-2.md`
- `docs/phases/supabase-storage-phase-3-data-visualization.md`
- `src/site/styles/data-visualization-screen-detail.module.css`

## 为什么这样改

- 这次素材已经上传完成，所以终于到了“先上传、再接代码”的正确时机
- 这页的特殊点在于目录名不一致，本地叫 `data-visualization-screen`，Supabase 叫 `data-visualization`
- 如果不把这个差异记录在数据层，后面很容易一边页面是好的，一边别人看代码又不知道为什么路径少了一截

## 遇到了什么问题、怎么排查

### 1. 一开始页面还在按错误目录名找资源

最初按本地目录名推导时，会自然得到：

- `work/data-visualization-screen/...`

但这个路径并不是你实际上传的目录。

后续根据你提供的 Supabase 后台截图，再配合终端请求验证，确认真实目录应为：

- `work/data-visualization/...`

### 2. 不能只改数据文件，不改页面图片组件

如果数据层已经返回远程 URL，但页面里的 `<Image>` 还完全按本地图片思路处理，就可能继续遇到不必要的优化链路干扰。

所以这次是两层一起收口：

- 数据层负责给出正确远程 URL
- 页面层负责告诉 Next：这是远程资源，直接渲染

### 3. 临时重建模块应该及时退场

前一个阶段里，这两块演示区曾经因为素材缺失，被临时写成了手工重建的前端模块。

这在“资源还不存在”的阶段是合理的占位策略，但一旦真实视频已经上传，如果继续保留手写版本，就会带来两个问题：

- 页面展示的不是项目真实素材
- 后续回看代码时，会误以为这里本来就应该是前端手写模块

所以这次在视频可用后，第一时间把这两个占位模块撤掉，改回真实视频。

## 当前验证结果

- `pnpm typecheck` 通过
- `pnpm lint` 通过
- `http://localhost:3001/work/data-visualization-screen` 可正常返回 `200`
- 页面输出中已经能看到多个 Supabase 远程资源地址，例如：
  - `work/data-visualization/hero-background.png`
  - `work/data-visualization/hero-dashboard.png`
  - `work/data-visualization/practice-main-chart.png`
  - `work/data-visualization/outcomes-overview.png`
  - `work/data-visualization/retrospective-1.png`
- 页面输出中也已经能看到两个真实视频地址：
  - `work/data-visualization/metric-card.mp4`
  - `work/data-visualization/charts.mp4`

这说明：

- 这页的数据层已经切到正确的 Supabase 路径
- 页面渲染层已经真正吃到远程资源
- `Data Visualization` 的图片和视频资源链路都已经跑通

## 下一步建议

1. 你先手动打开 `Data Visualization` 页面，确认图片都正常显示，没有漏图
2. 如果确认稳定，再考虑是否把这套“目录名映射”提炼成更通用的 Storage 规则
3. 后续接视频时，继续保持“先上传、再接代码”的顺序
4. 等图片和视频都接完后，再统一微调 3 张案例页的目录位置和节奏

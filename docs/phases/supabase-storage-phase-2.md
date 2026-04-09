# Supabase Storage Phase 2

## 这次改动的目标

- 在已有 `Supabase Storage Phase 1` 的基础上，先把案例页的 Storage 接法搭成可复用结构。
- 不急着把所有页面都真正切到远程资源，而是先把“数据层如何推导路径、页面层如何兼容远程图片”这条链路准备好。
- 保持“能回退”的接法，避免素材还没上传就把整页切坏。

## 这次做了什么

### 1. 先在 AXZO 上搭好可复用脚手架

这一步不是“正式切换到 Supabase”，而是先拿 `AXZO Design System` 这页把结构搭起来。

### 2. 给 AXZO 数据层补上 Storage 接法

更新文件：

- `src/site/data/axzo-design-system-case-study.js`

做法：

- 新增 `getStorageAssetUrl` 的接入
- 新增 `preferSupabaseAssets` 开关
- 新增 `pendingSupabaseAssetPaths` 集合，预留后续细粒度回退
- 新增 `resolveAssetSource(localSrc)`，根据本地路径自动推导 Storage 路径

这样现在这页的数据层能力变成：

- 已经具备从本地路径推导 Storage 路径的能力
- 如果后面某张图要临时回退，只需要把对应 Storage 路径放进 `pendingSupabaseAssetPaths`
- 页面组件不用重写

但这一步当时并没有最终启用远程资源，当前真实状态是：

- `src/site/data/axzo-design-system-case-study.js` 里的 `preferSupabaseAssets = false`

也就是说：

- AXZO 目前仍然默认走本地资源
- 只是 Storage 接法已经准备好了，等素材上传后可以直接打开

### 3. 让页面组件具备远程图兼容能力

更新文件：

- `src/site/pages/AxzoDesignSystemCaseStudyPage.jsx`

做法：

- 新增 `shouldBypassNextImageOptimizer(source)`
- 对所有可能来自 Supabase 的图片，自动加 `unoptimized`

这样做的原因是：

- 当前项目此前已经验证过，某些本地开发环境下 Next 图片代理层会误伤 Supabase 公开资源
- 先把页面层的兼容逻辑补好，后面真正切到远程时就只需要改数据源开关

## 这次没做什么

- 没有真正启用 `AXZO` 的远程资源
- 没有迁 `data-visualization-screen`
- 没有继续迁首页作品卡的 `AXZO` 缩略图
- 没有把 `pendingSupabaseAssetPaths` 做成自动探测逻辑
- 没有接入视频资源
- 没有整理 Supabase 资源命名规范

## 改了哪些关键文件

- `src/site/data/axzo-design-system-case-study.js`
- `src/site/pages/AxzoDesignSystemCaseStudyPage.jsx`

## 为什么这样改

- 先把接法搭对，比在素材没上传时强行切远程更稳
- 数据层先封装成“本地路径 + 可推导的远程路径 + 可回退”的方式，后面迁别的案例时可以直接复用同样模式
- 页面层先具备远程图兼容能力，等真正切换时可以把风险压到最小

## 遇到了什么问题、怎么排查

### 1. 直接用 `HEAD` 探测部分 Supabase 资源会返回 `400`

这不一定代表文件不存在。

后续排查中确认：

- `AXZO` 的实际资源 URL 可以正常 `200`
- 某些探测方式本身不够稳定，不适合作为“文件不存在”的唯一依据

### 2. “代码先接” 和 “素材先上传” 的顺序不能搞反

后续和用户一起确认后，明确了更稳的节奏应该是：

- 先上传素材
- 再切代码

所以这一步保留成：

- AXZO 的 Supabase 接法已经搭好
- 但不提前启用远程资源

## 当前验证结果

- `pnpm typecheck` 通过
- `pnpm lint` 通过
- `AXZO` 页面的代码已经具备切换到 Storage 的结构，但当前默认仍走本地资源
- 也就是说，这一步验证通过的是“接法准备完成”，不是“AXZO 已正式切到 Supabase”

## 下一步建议

1. 等某个案例的素材真正上传完成后，再打开对应页面的 `preferSupabaseAssets`
2. 继续确认 `data-visualization-screen` 在 Supabase 上的真实资源路径
3. 用同样的“远程优先 + 本地回退”模式迁移数据可视化案例
4. 再考虑是否要迁首页作品卡缩略图
5. 等图片迁完后，再开始接视频资源

# Supabase Storage Phase 2

## 1. 这次改动的目标

这次不是继续做 Storage 基础设施，而是把已经完成的能力真正应用到一个真实案例页上：

- 将 `AXZO Design System` 详情页的图片资源切到 Supabase Storage
- 保持页面结构、样式和文案不变
- 验证页面已经不再依赖本地 `public/site/work/axzo-design-system`

---

## 2. 这次做了什么

### 2.1 先验证 Supabase 路径是否真的可用

在改代码前，先逐个检查了这批文件在下面这个目录里是否能正常访问：

```text
portfolio-assets/work/axzo-design-system/
```

确认结果：

- `cover-background.png`
- `cover-card.png`
- `exploration-structure.png`
- `okr-screenshot.png`
- `practice-collaboration.png`
- `practice-data-viz.png`
- `practice-design-dev.png`
- `practice-homepage.png`
- `problem-collab.svg`
- `problem-dataviz.svg`
- `problem-entry.svg`
- `problem-ui.svg`
- `role-collab.png`
- `role-entry.png`
- `role-guide.png`
- `role-showcase.png`

都已经能返回 `200`。

这样做的原因是：

- 如果资源路径还没准备好，就不应该先改页面代码
- 先确认资源层没问题，再改数据层，排查会简单很多

---

### 2.2 把 AXZO 案例页的数据路径切到 Storage URL

文件：

- `src/site/data/axzo-design-system-case-study.js`

做了什么：

- 引入 `getStorageAssetUrl`
- 新增 `getAxzoAssetUrl(fileName)` 作为当前案例页的资源入口
- 把原本的本地路径：

```text
/site/work/axzo-design-system/...
```

改成：

```js
getAxzoAssetUrl("...")
```

这样改的意义是：

- 当前案例页资源来源更统一
- 后续如果 bucket 路径规则再调整，只需要改一个入口
- 数据文件不再被一长串 Supabase URL 干扰

---

### 2.3 给 AXZO 页面上的图片加 `unoptimized`

文件：

- `src/site/pages/AxzoDesignSystemCaseStudyPage.jsx`

做了什么：

- 给这个案例页里的 `Image` 增加了 `unoptimized`

这一步不是为了“偷懒”，而是为了降低远程图片切换时的风险，原因有两个：

- 这个页面里既有 PNG，也有远程 SVG
- 之前项目已经遇到过本地开发环境里 `next/image` 中转层影响远程资源显示的问题

所以这次先采用更稳的方式：

- 让浏览器直接请求 Supabase 公共资源
- 避免在“资源迁移”这一步再叠加图片代理问题

---

## 3. 这次没有做什么

- 没有删除本地 `public/site/work/axzo-design-system` 里的原始文件
- 没有把其它项目页一起迁移到 Supabase
- 没有改动页面布局、样式或内容结构
- 没有新增 Supabase SDK 依赖

这样做是有意的，因为这一步的目标只是：

- 验证 AXZO 详情页能否独立完成远程资源迁移

而不是顺手把整个项目都一起调整掉。

---

## 4. 改了哪些关键文件

- `src/site/data/axzo-design-system-case-study.js`
- `src/site/pages/AxzoDesignSystemCaseStudyPage.jsx`

---

## 5. 遇到的问题与排查

这次最关键的问题不是代码，而是资源路径。

最开始你虽然已经上传了资源，但它们被放到了错误目录里：

```text
work/data-visualization/
```

而不是 AXZO 应该使用的：

```text
work/axzo-design-system/
```

这一步如果不先排查清楚，就会出现一种很迷惑的状态：

- 你在 Supabase 控制台里“明明看到了文件”
- 但页面实际请求还是 `404`

后面在你把路径调整正确之后，才继续切换代码。

另外，Playwright 自动化验证这次依然没法使用。当前环境在初始化时会报：

```text
ENOENT: no such file or directory, mkdir '/.playwright-mcp'
```

所以这次页面验证只能采用替代方式，而不是浏览器自动化脚本。

---

## 6. 当前验证结果

已经完成的验证：

- `pnpm typecheck` 通过
- `pnpm lint` 通过
- 代码中已找不到 AXZO 旧的本地资源路径
- 本地页面 HTML 中已经能看到 Supabase 的 `work/axzo-design-system/...` 资源链接
- 页面响应头中的图片预加载链接也已经指向 Supabase

这说明当前结果已经满足：

- AXZO 详情页资源来源已从本地切换到 Supabase Storage

---

## 7. 下一步建议

最自然的下一步有两个：

1. 人工在页面上再看一遍 AXZO 详情页，确认所有图片和 SVG 图标都正常显示
2. 如果这条链路稳定，再用同样方式迁移下一个案例页，而不是一次性全量替换

这样可以继续保持你现在这套“小步验证、逐页迁移”的节奏。

# Supabase Storage Phase 1

## 1. 这次在做什么

这次接入的目标，不是一次性把整个项目迁到 Supabase，而是先完成一个最小闭环验证：

- 创建 Supabase 项目
- 创建公开 bucket：`portfolio-assets`
- 上传 1 张测试图片
- 在 Next 项目里成功显示这张远程图片
- 把当前接入方式整理成一个后续可扩展的基础结构

这次我们**刻意没有做**这些事情：

- 没有接 Supabase Database
- 没有做 CMS
- 没有管理项目文案
- 没有批量迁移首页和详情页资源
- 没有安装 `@supabase/supabase-js`

这样做的原因很简单：

- 先把“媒体资源仓库”这条链路跑通
- 把问题拆小，避免一开始就把 Storage、数据库、内容结构混在一起
- 后面每一步都可以在这个基础上继续迭代

---

## 2. 这次已经完成了什么

### 2.1 Supabase 控制台侧

你已经完成了下面这些操作：

- 创建了 Supabase 项目
- 创建了公开 bucket：`portfolio-assets`
- 按规划建立了目录结构的基础骨架
- 在 `home/images/` 下上传了测试图片 `storage-test.png`
- 拿到了公开 URL，并在浏览器中验证可以直接访问

本次验证使用的 bucket 结构方向是：

```text
portfolio-assets/
  home/
    images/
  work/
    drawing-ledger-2-0/
    axzo-design-system/
    data-visualization/
  shared/
```

后续项目目录下你计划继续细分：

- `cover/`
- `images/`
- `gifs/`
- `videos/`

这个结构是合理的，因为它同时满足：

- 首页资源和详情页资源可以分开管理
- 项目级资源不会互相混杂
- 视频、GIF、图片后续可以按类型拆开

---

## 3. 代码层这次改了什么

下面只记录这次 Supabase Storage 第一阶段接入相关的改动。

### 3.1 允许 Next 加载 Supabase 远程图片

文件：
- `next.config.mjs`

做了什么：

- 增加了 `images.remotePatterns`
- 放开了当前 Supabase 项目域名 `zikhatpucpynawwxbrun.supabase.co`
- 允许路径 `/storage/v1/object/public/**`

为什么要这样做：

- 项目首页作品图使用的是 `next/image`
- `next/image` 默认不会随便加载任意外部域名图片
- 所以要先在 Next 配置里把这个远程来源加入白名单

你可以把它理解成：

- Supabase 图片是“外部资源”
- Next 要先知道“这个外部来源是可信的”
- 否则即使 URL 没问题，页面里也可能不显示

---

### 3.2 用 1 张测试图替换首页 1 张本地图

文件：
- `src/site/data/work-items.js`

做了什么：

- 只把 `drawing-ledger-2-0` 这张首页作品图改成 Supabase 测试图
- 没动其他作品卡

为什么只改 1 张：

- 这是最符合“小范围验证接入”的方式
- 如果一开始就全量替换，出了问题会很难判断到底是哪一层出错
- 只换 1 张图，能最清楚地验证：
  - Storage 是否可用
  - 公开链接是否有效
  - Next 项目是否能正常引用

---

### 3.3 遇到的真实问题：不是图片太大，而是 `next/image` 中转失败

我们中途遇到了一个很重要的问题：

- 浏览器直接打开 Supabase 图片 URL 是正常的
- 但页面里却出现了“破图”图标

后来排查到真正原因是：

- `next/image` 会先经过 Next 自己的图片优化代理
- 在当前本地开发环境里，这个代理把 Supabase 地址解析成了一个它拒绝的 IP
- 因此不是图片坏了，也不是 Supabase 挂了，而是 **Next 的图片代理层阻止了加载**

当时服务日志里的核心错误是：

```text
upstream image ... resolved to private ip
```

这一步非常值得记住，因为它说明了一个重要概念：

- 浏览器能访问图片
- 不代表 `next/image` 的代理一定能访问图片

也就是说：

- “资源本身可访问”
- 和
- “Next 图片优化层愿意帮你转发这个资源”

是两件不同的事。

---

### 3.4 这次为什么加了 `unoptimized`

文件：
- `src/site/components/home/HomeWorksSection.jsx`

做了什么：

- 给首页作品图的 `Image` 临时加了 `unoptimized`

为什么这样做：

- 当前目标是验证 Supabase Storage 接入是否打通
- 不是现在就优化远程图片策略
- 加 `unoptimized` 后，浏览器会直接请求 Supabase 公开 URL
- 这样可以绕过 `next/image` 的中转代理问题

这一步要怎么理解：

- 它不是最终的“长期最佳方案”
- 它是验证阶段非常合适的小步修复

适用场景是：

- 你已经确认远程 URL 是好的
- 但本地 `next/image` 优化层拦住了
- 你当前更想先验证“业务链路通不通”

---

### 3.5 为什么后来又加了 `contain`

文件：
- `src/site/components/home/HomeWorksSection.jsx`
- `src/site/styles/home-page.module.css`

做了什么：

- 只给第一张测试图增加了一个单独样式
- 让它从 `cover` 切到 `contain`

为什么这样做：

- 测试图的原始尺寸是 `1280 x 717`
- 这张图的比例接近 `16:9`
- 但首页这张大卡片的图片区更高、更偏竖
- 如果继续用 `cover`，图片会为了填满容器而被裁切

这里你需要记住一个非常基础但非常重要的图像概念：

- `cover`：优先铺满容器，可能裁图
- `contain`：优先完整显示图片，可能留白

所以你后来看到的“整张图片完整出现，但四周有更多空白”，其实正是 `contain` 的正常结果。

这一步不是在修复接入问题，而是在帮助你更清楚地观察：

- 远程图片是否真的完整加载成功
- 当前测试图和卡片容器的比例是否匹配

---

## 4. 这次做的“配置整理”

当远程图已经成功显示之后，我们没有停留在“先写死一个长链接”的状态，而是继续做了一步很小但很重要的整理。

### 4.1 新增了 Storage URL 工具函数

文件：
- `src/site/lib/get-storage-asset-url.js`

做了什么：

- 新增 `getStorageAssetUrl(assetPath)`
- 把 Supabase Storage 基础地址和资源路径拼接起来

为什么这样做：

- 如果把整串长 URL 写死在很多数据文件里，后面会很难维护
- 抽成一个函数后，以后迁移资源时只需要写相对路径，例如：

```js
getStorageAssetUrl("home/images/storage-test.png")
```

而不是每次都写：

```text
https://zikhatpucpynawwxbrun.supabase.co/storage/v1/object/public/portfolio-assets/home/images/storage-test.png
```

这个变化的意义是：

- 从“临时验证写法”
- 向“后续可持续扩展写法”

迈了一小步。

---

### 4.2 新增了 `.env.local.example`

文件：
- `.env.local.example`

做了什么：

- 增加了环境变量示例：

```text
NEXT_PUBLIC_SUPABASE_STORAGE_BASE_URL=...
```

为什么要有这个文件：

- 它是给未来自己或其他协作者看的“模板”
- 说明项目需要这个环境变量
- 但不会把你的本地实际配置硬编码成唯一来源

---

### 4.3 正式补上了 `.env.local`

文件：
- `.env.local`

做了什么：

- 正式写入当前项目使用的 Storage 基础地址

为什么要这样做：

- 这样当前项目运行时真正使用的是本地配置
- 后面如果你换 Supabase 项目或换 bucket 地址，只要优先改这里
- 不需要反复改代码

这里要记住一个 Next 项目里的基础知识：

- `.env.local` 是“本机本项目实际生效的本地环境变量”
- `.env.local.example` 是“给人看的示例模板”

---

### 4.4 `.gitignore` 为什么要补 `.env.local`

文件：
- `.gitignore`

做了什么：

- 增加了 `.env.local`

为什么要这样做：

- `.env.local` 通常属于本地私有配置
- 默认不应该提交进 Git
- 即使现在这个变量只是 Storage 基础地址，这也是标准做法

---

## 5. 当前项目里和 Supabase Storage 有关的关键文件

如果你之后想复习，可以先从这几个文件看起：

- `next.config.mjs`
  - 控制 Next 是否允许加载 Supabase 远程图片

- `src/site/lib/get-storage-asset-url.js`
  - 控制如何把资源相对路径拼成完整的 Supabase URL

- `src/site/data/work-items.js`
  - 当前首页第一张作品图，已经使用这个工具函数读取远程资源

- `src/site/components/home/HomeWorksSection.jsx`
  - 控制首页作品图的图片组件渲染方式
  - 这里目前带有 `unoptimized`

- `src/site/styles/home-page.module.css`
  - 控制首页作品图的显示方式
  - 这里目前给测试图加了 `contain`

- `.env.local`
  - 当前项目实际使用的 Storage 基础地址

- `.env.local.example`
  - 环境变量模板

---

## 6. 当前已经验证成功的事情

到这个阶段，下面这些事情都已经被验证过了：

- Supabase 项目可正常使用
- `portfolio-assets` bucket 创建成功
- bucket 公开访问策略可用
- 上传的测试图片可以直接通过公开 URL 访问
- Next 项目可以显示 Supabase Storage 的远程图片
- 当前项目已经有一个最小可复用的 Storage URL 配置方式

换句话说：

这次“只把 Supabase 当媒体资源仓库”的第一阶段，已经跑通了最核心的一段链路。

---

## 7. 当前还没有做的事情

为了保持这次变更小、可控、易理解，我们现在**还没有做**这些事情：

- 没有安装 `@supabase/supabase-js`
- 没有在代码里上传文件到 Supabase
- 没有在代码里列出 bucket 内容
- 没有做文件元数据管理
- 没有设计数据库表
- 没有接入 CMS
- 没有批量迁移首页剩余图片
- 没有迁移详情页图片 / GIF / MP4

这不是缺失，而是有意控制节奏。

---

## 8. 为什么现在仍然不需要 `@supabase/supabase-js`

这是这次学习里一个很关键的判断。

当前你在做的事情是：

- 使用公开 bucket
- 使用公开 URL
- 在前端页面里显示远程媒体资源

对于这类场景，最小可用方式其实就是：

- 用公开 URL 直接访问资源

所以现在不装 `@supabase/supabase-js` 是合理的，因为：

- 还没有需要在代码里“上传文件”
- 还没有需要在代码里“列目录”
- 还没有需要在代码里“动态生成签名地址”
- 还没有需要做权限控制

什么时候才更适合引入 `@supabase/supabase-js`？

- 你开始想在代码里上传媒体
- 你想在管理界面里动态读取资源
- 你想用代码生成资源地址，而不是手动复制
- 你开始做更复杂的资源管理和权限策略

在那之前，继续用“公开 URL + 配置化路径”的方式，完全是合理的。

---

## 9. 这次接入里最值得记住的几个知识点

### 9.1 Storage 先打通，再谈内容管理

不要一上来就把 Storage、数据库、CMS、作品文案管理全部揉在一起。

先把这条链路跑通：

```text
上传文件 -> 拿到公开 URL -> 在项目里显示
```

这是更适合当前项目阶段的做法。

### 9.2 `next/image` 和“浏览器直接访问图片”不是同一层

浏览器能打开图片，不代表 `next/image` 一定能处理中转优化。

如果你再遇到“浏览器 URL 能开，但页面里破图”，第一反应要分开排查：

- 资源本身是否可访问
- Next 的图片代理层是否拦住了它

### 9.3 `cover` 和 `contain` 是视觉策略，不是接入成功与否的标志

这次后半段出现的“显示大小怪怪的”，本质上是：

- 图片比例
- 容器比例
- 显示策略

三者之间的关系问题。

它属于视觉呈现问题，不属于 Supabase Storage 接入失败。

---

## 10. 下一步建议怎么走

建议你继续按“小步验证”的节奏推进。

最自然的后续顺序是：

1. 再迁移 1 张首页图片  
   目的：验证这套方式不是只对 1 张图生效，而是可以重复使用

2. 开始为详情页定义资源路径规范  
   例如：
   - `work/drawing-ledger-2-0/cover/...`
   - `work/drawing-ledger-2-0/images/...`
   - `work/drawing-ledger-2-0/gifs/...`
   - `work/drawing-ledger-2-0/videos/...`

3. 等你真正需要“代码管理 Storage”时，再考虑 `@supabase/supabase-js`

---

## 11. 一句话总结

这次你不是“接入了一个完整 Supabase 后台”，而是先非常有节奏地完成了：

**把 Supabase Storage 作为公开媒体仓库接进 Next 项目，并成功验证了 1 张远程图片的完整链路。**

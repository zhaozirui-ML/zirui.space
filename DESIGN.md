# DESIGN

本文档用于沉淀当前项目里已经落地的设计系统内容，方便后续做细节调整、替换真实内容、继续扩展组件。

我会尽量用“设计师视角”来描述，而不是只写代码术语。

## 1. 当前设计系统的目标

这套设计系统目前服务于一个作品集个站，同时保留了继续扩展成更完整网站系统的能力。

当前整体风格关键词：

- 精致
- 轻盈
- 克制
- 小清新
- 轻卡片感

当前设计系统主要解决 4 件事：

- 统一颜色、字体、间距这些基础视觉规则
- 提供可复用的基础组件，比如 `Button`、`Input`、`Card`
- 用统一的 CSS Variables 让页面样式和组件样式共用一套 token
- 让首页可以通过“组合区块”的方式继续演进，而不是每次都推倒重做

## 2. 目录结构

### 2.1 设计系统本体

```text
design-system/
├── components/
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── Input.jsx
│   └── index.js
├── hooks/
│   └── useMediaQuery.js
├── tokens/
│   ├── colors.js
│   ├── spacing.js
│   ├── typography.js
│   └── index.js
├── index.js
└── styles.css
```

### 2.2 当前个人网站落地层

这一层不是“设计系统本体”，而是“使用设计系统搭出来的当前页面”。

```text
src/personal-site/
├── components/
│   └── SectionHeader.jsx
├── sections/
│   ├── AvatarHero.jsx
│   ├── BioHeader.jsx
│   ├── SocialStrip.jsx
│   ├── ResumeTimeline.jsx
│   ├── PortfolioGallery.jsx
│   ├── ContactSection.jsx
│   └── GlobalFooter.jsx
├── PersonalWebsite.jsx
├── personal-site.css
└── site-data.js
```

### 2.3 入口关系

- `App.jsx`
  - 只负责挂载 `PersonalWebsite`
- `app/layout.jsx`
  - 负责引入全局样式和设计系统 CSS Variables
- `design-system/index.js`
  - 负责统一导出组件、tokens、hook

## 3. 设计原则

当前这套系统不是走“强品牌、高装饰”的路线，而是走“内容优先、结构清晰”的路线。

### 3.1 视觉原则

- 背景尽量浅，避免大面积纯白造成刺眼
- 颜色对比不走强冲突，而是用层级、留白、边框来拉开关系
- 圆角比较柔和，整体偏“温和卡片”
- 阴影只做轻微托起，不做厚重悬浮

### 3.2 版式原则

- 用较大的留白制造节奏感
- 标题不追求复杂装饰，而追求清楚的层级
- 正文可读性优先，行高偏宽松
- 模块之间尽量是可拆分、可重排的

### 3.3 工程原则

- token 先行
- 组件复用优先
- 页面由 section 组合
- 数据尽量集中在 `site-data.js`

## 4. Tokens 沉淀

## 4.1 颜色系统

文件：`design-system/tokens/colors.js`

当前颜色值如下：


| Token          | 值         | 用途              |
| -------------- | --------- | --------------- |
| `canvas`       | `#fcfcfb` | 页面最外层背景         |
| `surface`      | `#ffffff` | 卡片、按钮、主要内容面     |
| `surfaceSoft`  | `#f9fafa` | 更柔和的浅层容器背景      |
| `surfaceMuted` | `#f4f5f6` | 输入框、弱强调背景       |
| `ink`          | `#14181b` | 最深层文字、主按钮背景     |
| `inkSoft`      | `#22262a` | 次一级深色文字         |
| `text`         | `#22262a` | 正文主文字           |
| `textSupport`  | `#4c5257` | 辅助说明、次级链接       |
| `textMuted`    | `#6d7378` | 次级正文            |
| `textSubtle`   | `#9fa3a7` | placeholder、弱提示 |
| `border`       | `#e3e5e8` | 标准边框            |
| `borderSoft`   | `#eeeff1` | 更轻的边框           |
| `borderMuted`  | `#e5e5e5` | chip、弱边界        |
| `accentSky`    | `#dff1f3` | 天空色强调           |
| `accentBlush`  | `#fdecea` | 柔和粉强调           |
| `accentSand`   | `#efe9e0` | 沙色强调            |


设计理解：

- 主系统几乎没有“品牌主色”，而是以中性色为主体
- 强调色只作为气氛辅助，不作为大面积主视觉
- 这意味着后续如果要建立更明确的个人品牌，可以优先从 `accentSky / accentBlush / accentSand` 入手

## 4.2 间距系统

文件：`design-system/tokens/spacing.js`


| Token     | 值         | 说明           |
| --------- | --------- | ------------ |
| `2xs`     | `0.25rem` | 极小间距         |
| `xs`      | `0.5rem`  | 标签、图标间距      |
| `sm`      | `0.75rem` | 小组件内间距       |
| `md`      | `1rem`    | 常规间距         |
| `lg`      | `1.5rem`  | 组件级间距        |
| `xl`      | `2rem`    | 大组件内边距       |
| `2xl`     | `3rem`    | 模块间距         |
| `3xl`     | `4rem`    | 更大模块间距       |
| `section` | `6rem`    | section 纵向间距 |
| `hero`    | `7.5rem`  | Hero 级大留白    |


设计理解：

- 这套系统的“呼吸感”主要来自 `2xl`、`3xl`、`section`、`hero`
- 如果你觉得页面太紧，可以优先调大 `section`
- 如果你觉得页面太散，可以优先调小 `section` 和 `hero`

## 4.3 字体系统

文件：`design-system/tokens/typography.js`

### 字体族


| Token     | 值                                                   | 作用       |
| --------- | --------------------------------------------------- | -------- |
| `display` | `Inter / Avenir Next / Helvetica Neue / sans-serif` | 大标题      |
| `ui`      | `Avenir Next / Inter / Segoe UI / sans-serif`       | 按钮、UI 文字 |
| `body`    | `Inter / Segoe UI / sans-serif`                     | 正文       |


### 字号层级


| Scale       | Size                          | Line Height | Weight | 用途                |
| ----------- | ----------------------------- | ----------- | ------ | ----------------- |
| `display`   | `clamp(3.2rem, 7vw, 5.25rem)` | `1.02`      | `400`  | 首页超大标题            |
| `headingLg` | `clamp(2.3rem, 4vw, 3.25rem)` | `1.08`      | `400`  | 大区块标题             |
| `headingMd` | `1.5rem`                      | `1.33`      | `500`  | 卡片标题 / section 标题 |
| `headingSm` | `1.125rem`                    | `1.45`      | `500`  | 小卡片标题             |
| `bodyLg`    | `1rem`                        | `1.7`       | `400`  | 正文                |
| `bodySm`    | `0.875rem`                    | `1.5`       | `400`  | 辅助正文              |
| `label`     | `0.875rem`                    | `1.4`       | `600`  | 按钮、字段标签           |
| `overline`  | `0.75rem`                     | `1.2`       | `600`  | eyebrow、微型说明      |


设计理解：

- `display` 和 `headingLg` 的字重都比较轻，目的是让页面看起来更克制
- `bodyLg` 的行高是 `1.7`，这说明系统对阅读舒适度有明确偏好
- 如果未来要做更强烈、更时尚的个人风格，可以先调标题字体和 `display` 比例，而不是先改颜色

## 4.4 全局 CSS Variables

文件：`design-system/tokens/index.js`

这里做的事情是：

- 把 JS 里的 token 转成全局 CSS 变量
- 页面和组件都通过这些变量吃到同一份设计值

额外已经沉淀的通用视觉 token：

- 圆角
  - `--ds-radius-sm: 0.75rem`
  - `--ds-radius-md: 1rem`
  - `--ds-radius-lg: 1.5rem`
  - `--ds-radius-xl: 1.75rem`
  - `--ds-radius-pill: 999px`
- 阴影
  - `--ds-shadow-soft: 0 18px 40px rgba(20, 24, 27, 0.06)`
  - `--ds-shadow-edge: inset 0 0 0 1px rgba(227, 229, 232, 1)`

## 5. 组件系统

## 5.1 Button

文件：`design-system/components/Button.jsx`

这是当前使用频率最高的基础组件之一，负责统一按钮的视觉规则。

### 当前支持的属性


| 属性             | 类型                     | 作用            |
| -------------- | ---------------------- | ------------- |
| `as`           | `string`               | 指定底层标签        |
| `children`     | `ReactNode`            | 按钮文案          |
| `className`    | `string`               | 追加类名          |
| `fullWidth`    | `boolean`              | 宽度撑满          |
| `href`         | `string`               | 有链接时自动渲染成 `a` |
| `leadingIcon`  | `ReactNode`            | 左图标           |
| `trailingIcon` | `ReactNode`            | 右图标           |
| `size`         | `"sm" | "md" | "icon"` | 尺寸            |
| `variant`      | 多种枚举                   | 视觉样式          |


### 当前支持的变体


| Variant      | 用途         |
| ------------ | ---------- |
| `primary`    | 主按钮        |
| `secondary`  | 次按钮        |
| `soft`       | 柔和弱强调按钮    |
| `ghost`      | 透明按钮       |
| `chip`       | 社媒、标签、轻量选项 |
| `link`       | 伪链接按钮      |
| `icon`       | 透明图标按钮     |
| `iconFilled` | 带底色的图标按钮   |


### 当前样式特征

- 默认是圆角 pill
- 主按钮用深色底 + 浅色字
- `chip` 更像胶囊标签，边框更轻，适合社媒入口
- `link` 去掉了边框、背景和固定高度，更适合卡片里的文字型 CTA

### 当前项目里的用法

- `SocialStrip` 用的是 `chip`
- `PortfolioGallery` 里的 “Case study” 用的是 `link`
- `ContactSection` 里的主按钮用的是 `primary`

## 5.2 Input

文件：`design-system/components/Input.jsx`

这是一个“带操作区的大输入容器”，当前更像一个任务输入框或消息输入框，而不是传统单行表单输入。

### 当前支持的属性


| 属性            | 类型         | 作用       |
| ------------- | ---------- | -------- |
| `actions`     | 数组         | 右侧图标按钮列表 |
| `className`   | `string`   | 追加类名     |
| `helperText`  | `string`   | 底部说明文字   |
| `id`          | `string`   | 字段 id    |
| `label`       | `string`   | 无障碍标签    |
| `onChange`    | `function` | 控制输入     |
| `placeholder` | `string`   | 占位文案     |
| `rows`        | `number`   | 文本域高度    |
| `value`       | `string`   | 当前值      |


### 视觉特征

- 有轻微的粉色径向渐变
- 整体是大圆角输入容器
- 下方有 helper text 和 action buttons

### 当前定位

- 更适合“创作输入”、“AI prompt 输入”、“留言输入”
- 不适合直接当标准表单输入框批量复用

如果后续要做标准表单体系，建议补：

- `TextField`
- `Textarea`
- `Select`
- `Checkbox / Radio`

## 5.3 Card

文件：`design-system/components/Card.jsx`

这是当前第二个很关键的复用组件。它的意义不是“只有一种卡片”，而是“用一套共同语言支持不同卡片形态”。

### 当前支持的属性


| 属性            | 类型                                         | 作用      |
| ------------- | ------------------------------------------ | ------- |
| `title`       | `string`                                   | 标题      |
| `description` | `string`                                   | 描述      |
| `eyebrow`     | `string`                                   | 小标题     |
| `meta`        | `string`                                   | 补充信息    |
| `href`        | `string`                                   | 链接地址    |
| `image`       | `string`                                   | 图片      |
| `imageAlt`    | `string`                                   | 图片替代文本  |
| `tone`        | `"light" | "dark"`                         | 浅色 / 深色 |
| `variant`     | `"feature" | "featureReverse" | "article"` | 版式变体    |


### 当前支持的版式


| Variant          | 说明            |
| ---------------- | ------------- |
| `feature`        | 左右分栏的大卡片      |
| `featureReverse` | 内容和图片顺序反转的大卡片 |
| `article`        | 上图下文的文章卡      |


### 当前视觉特征

- `feature` 默认是横向双栏
- `featureReverse` 适合做交错布局
- `article` 更适合作品、文章、博客列表

### 当前项目里的意义

虽然个人网站里的作品集目前没有直接调用 `Card.jsx`，而是写了专用 `portfolio-card` 结构，但它的视觉语言已经明显继承了 Card 的方向：

- 轻边框
- 柔和圆角
- 内容优先
- 媒体区与文字区有清晰分工

这意味着后续你可以考虑把 `PortfolioGallery` 慢慢收敛回 `Card` 体系里。

## 5.4 useMediaQuery

文件：`design-system/hooks/useMediaQuery.js`

这个 hook 的作用是：

- 订阅屏幕尺寸变化
- 在 React 环境里安全地处理 SSR 和客户端差异

当前实现亮点：

- 用的是 `useSyncExternalStore`
- 这比传统 `useEffect + useState` 更稳，尤其适合 Next.js

当前项目里它还没有被大规模用起来，但以后做响应式交互会很有价值。

## 6. 样式系统

文件：`design-system/styles.css`

这个文件负责基础组件的视觉实现，目前主要覆盖：

- Button 系列
- Input 系列
- Card 系列

### 当前风格共性

- 边框很轻
- 阴影很轻
- 圆角偏大
- 字体和 spacing 都依赖 token
- 组件本身尽量中性，避免过强品牌感

### 当前还没有完全系统化的部分

下面这些内容目前还主要在页面层，不在设计系统本体里：

- 表单字段的标准单行输入样式
- section 容器规则
- 时间线组件
- 作品卡片的业务型变体
- footer 的信息排版模式

也就是说，当前设计系统已经有“基础砖块”，但还没有完全沉淀出“页面级模块系统”。

## 7. 当前个人网站如何使用这套设计系统

## 7.1 页面入口

当前首页装配关系：

```text
App.jsx
  └── PersonalWebsite.jsx
        ├── AvatarHero
        ├── BioHeader
        ├── SocialStrip
        ├── ResumeTimeline
        ├── PortfolioGallery
        ├── ContactSection
        └── GlobalFooter
```

### 这层结构的意义

- `App.jsx` 保持极简
- 页面按照 section 组合
- 以后你改任何一个模块，都不用碰整个页面

## 7.2 当前数据层

文件：`src/personal-site/site-data.js`

这里集中存放：

- `profile`
- `socialLinks`
- `timelineItems`
- `portfolioItems`

这是后续你替换真实信息时最值得优先调整的文件。

### 为什么这一层重要

因为它把“内容”和“结构”分开了：

- 想换名字、简介、邮箱，不用去翻 JSX 结构
- 想换项目标题、年份、标签，也不用直接改组件

## 7.3 当前页面专用样式

文件：`src/personal-site/personal-site.css`

它主要负责：

- section 间距
- 头像区布局
- 时间线布局
- 作品网格布局
- 联系区布局
- 页脚布局

注意：

- 这个文件是“页面落地样式”
- `design-system/styles.css` 是“基础组件样式”

这两个层级要分开理解。

## 8. 后续如果要调整，应该改哪里

这是最实用的一部分。

### 8.1 想改整体气质

优先改：

- `design-system/tokens/colors.js`
- `design-system/tokens/typography.js`
- `design-system/tokens/spacing.js`

适合调整的内容：

- 页面更冷静还是更温暖
- 更像作品集还是更像产品官网
- 更紧凑还是更留白

### 8.2 想改按钮风格

优先改：

- `design-system/components/Button.jsx`
- `design-system/styles.css`

适合调整的内容：

- 主按钮更硬朗还是更柔和
- 社媒 chip 更圆还是更方
- 链接按钮是否需要 hover 强化

### 8.3 想改卡片风格

优先改：

- `design-system/components/Card.jsx`
- `design-system/styles.css`
- `src/personal-site/sections/PortfolioGallery.jsx`

适合调整的内容：

- 作品卡片是否需要更强图片感
- 是否改成整卡可点击
- 是否需要深浅两种卡片风格

### 8.4 想改个人信息

优先改：

- `src/personal-site/site-data.js`

适合调整的内容：

- 姓名
- 一句话简介
- 详细介绍
- 社媒链接
- 履历
- 项目列表

### 8.5 想改页面顺序或新增模块

优先改：

- `src/personal-site/PersonalWebsite.jsx`

适合调整的内容：

- 调整 section 顺序
- 新增新的模块
- 暂时隐藏某个模块

## 9. 当前系统已经具备的优点

- 入口足够干净
- token 已经独立
- 组件已经分层
- 页面结构已经 section 化
- 数据已经开始集中管理
- 后续继续替换真实内容的成本不高

## 10. 当前系统还值得继续补强的地方

这一部分不是“必须马上做”，而是后续可以逐步增强。

- 把页面层里重复出现的卡片模式再抽象一层
- 增加更标准的表单组件体系
- 给按钮和卡片补 hover / focus / active 的系统规则
- 补充移动端更细的响应式规范
- 给作品卡片建立统一的数据结构，比如 `title / summary / tags / href / image / year / role`
- 把设计系统从“组件级”继续推进到“模块级”

## 11. 一句话总结

当前这套系统已经不是“零散页面样式”，而是一个初步成型的轻量设计系统：

- 基础 token 已独立
- 基础组件已建立
- 页面装配已模块化
- 内容层已可集中维护

后续你每次想调细节，最好先判断你是在改：

- token
- 组件
- 页面 section
- 内容数据

只要先分清这四层，后面的调整就会很稳。

## 12. Portfolio Theme Token 草案

这一章是一个新的开始。

它不是要立刻推翻前面的通用设计系统，而是先把“作品集专用风格”单独整理出来，作为后续迭代作品集时的视觉准绳。

你可以把它理解成：

- 现有 `design-system` 是底层通用系统
- 新的 `portfolio theme` 是作品集专用主题层

这样做的好处是：

- 不会一下子破坏现在已经能工作的组件
- 后续作品集页面可以稳定沿用同一套气质
- 未来如果你要做别的页面，也不会被作品集视觉完全绑死

### 12.1 这套主题的气质关键词

基于这次 Figma 稿，我建议把作品集主题先定义成下面这组关键词：

- 叙事感
- 编辑感
- 温暖留白
- 理性但不冰冷
- 内容优先
- 大图展示
- 轻品牌感

这和当前系统的“小清新通用预览页”不完全一样。

当前系统更像：

- 通用组件展台
- 轻盈 UI
- 中性色为主

新的作品集主题更像：

- 作品案例长页
- 设计叙事页面
- 暖纸感底色
- 字体层级更有情绪

### 12.2 主题分层原则

这个原则很重要，后面所有实现都建议遵守。

#### Base Layer

继续保留当前这些能力：

- 基础 spacing 命名方式
- 基础圆角体系
- 基础组件骨架
- 响应式行为

#### Portfolio Theme Layer

单独新增作品集专用主题能力：

- 作品集标题字体
- 作品集暖色语义颜色
- 作品集 section 节奏
- 图注和强调标签规则
- 大图容器样式

### 12.3 建议新增的颜色 token

这一组是最值得优先补的，因为它们最直接决定作品集气质。

| Token 名称 | 建议值 | 用途 | 是否建议进入全局基础层 |
| --- | --- | --- | --- |
| `portfolioCanvas` | `#FCFBF8` | 作品集页面最外层底色 | 否，优先放作品集主题层 |
| `portfolioSurface` | `#FFFFFF` | 白色内容面、正文区 | 可以复用现有 `surface` |
| `portfolioSurfaceWarm` | `#F0EDE8` | 大图外层容器浅底 | 否 |
| `portfolioTextTitle` | `#2D2F30` | 主标题、章节标题 | 否，先放主题层 |
| `portfolioTextBody` | `#4A4D4E` | 正文说明 | 否，先放主题层 |
| `portfolioTextMuted` | `#7A7E80` | 图注、弱说明 | 否 |
| `portfolioBorderLight` | `#ECE9E4` | 大图容器、浅边框 | 否 |
| `portfolioBorderStrong` | `#DCD9D1` | 状态图、强调边界 | 否 |
| `portfolioAccentBrand` | `#B36A5E` | 强调标签、小标题、点睛色 | 否，作品集专用 |

设计理解：

- 这一组颜色明显偏暖，不像当前系统那样偏中性冷静
- `portfolioAccentBrand` 很关键，它不是“高饱和品牌主色”，而是很克制的棕红强调色
- 后续如果作品集继续扩展，尽量优先围绕这组暖色做变化，而不是再引入新的高饱和颜色

### 12.4 建议新增的字体 token

这部分决定“是不是你的作品集”。

| Token 名称 | 建议值 | 用途 | 说明 |
| --- | --- | --- | --- |
| `portfolioFontTitle` | `"FZQingKeBenYueSongS-R-GB", serif` | 封面标题、章节标题 | 作品集识别度来源，不建议给通用组件乱用 |
| `portfolioFontBody` | `"Inter", "Noto Sans SC", "Noto Sans JP", sans-serif` | 正文说明 | 保持可读性 |
| `portfolioFontLabel` | `"Inter", "Noto Sans SC", "Noto Sans JP", sans-serif` | 标签、强调小标题 | 和正文字体保持同一体系 |

建议的字级草案：

| Token 名称 | 建议值 | 用途 |
| --- | --- | --- |
| `portfolioTypeHero` | `48px / 48px / 400` | 封面主标题 |
| `portfolioTypeSectionTitle` | `24px / normal / 400` | 大章节标题 |
| `portfolioTypeBody` | `16px / 24px / 400 / -0.176px` | 正文 |
| `portfolioTypeLabel` | `16px / 24px / 500 / -0.176px` | 强调小标题 |
| `portfolioTypeBodySm` | `14px / 20px / 400 / -0.084px` | 辅助正文 |
| `portfolioTypeCaption` | `12px / 16px / 400` | 图注 |

设计理解：

- 当前系统标题偏 UI，新的标题系统偏 editorial
- 这意味着后续不要把 `portfolioFontTitle` 强行塞进所有按钮和卡片标题里
- 更合理的做法是只把它用在作品页的大标题和章节标题

### 12.5 建议新增的间距 token

当前系统已经有 `12 / 24 / 48 / 96` 这几个很好用的值，所以不需要全部重做。

建议在保留现有 spacing 命名的前提下，补这几个作品集专用值：

| Token 名称 | 建议值 | 用途 |
| --- | --- | --- |
| `portfolioSpace2xs` | `6px` | 极小图文贴合间距 |
| `portfolioSpaceXs` | `12px` | 小标题和正文间距 |
| `portfolioSpaceSm` | `24px` | 内容块基础间距 |
| `portfolioSpaceMd` | `48px` | 图文模块间距 |
| `portfolioSpaceLg` | `96px` | 大 section 内部节奏 |
| `portfolioSectionPaddingY` | `132px` | 作品页 section 上下留白 |
| `portfolioPageGutter` | `544px` | 1920 画板下的正文左右留白 |
| `portfolioContentWidth` | `832px` | 正文主列宽 |
| `portfolioHeroWidth` | `1440px` | Hero 内容宽 |

这里要特别注意：

- `132 / 544 / 832 / 1440` 更像“页面版式规则”
- 它们不太像通用设计系统 token
- 所以后续实现时，建议把它们放进 `portfolio layout tokens`，而不是直接并入全局 spacing

### 12.6 建议新增的圆角 token

| Token 名称 | 建议值 | 用途 |
| --- | --- | --- |
| `portfolioRadiusSm` | `8px` | 内层截图、小图卡 |
| `portfolioRadiusMd` | `16px` | 大图容器、卡片外壳 |
| `portfolioRadiusLg` | `24px` | 设备框、移动端展示卡 |
| `portfolioRadiusHero` | `64px` | 封面大背景底部圆角 |

设计理解：

- 当前系统已经有 `16` 和 `24`
- 真正需要补的是 `8` 和 `64`
- `64` 非常有作品页特征，不建议变成所有页面都默认使用的圆角

### 12.7 建议新增的阴影 token

| Token 名称 | 建议值 | 用途 |
| --- | --- | --- |
| `portfolioShadowCard` | `0 16px 32px -12px rgba(14, 18, 27, 0.1)` | 小图卡、迭代视觉图、设备截图托起感 |

设计理解：

- 当前系统的阴影更像“UI 容器默认壳层”
- 新作品集主题的阴影更像“局部展示增强”
- 所以后续实现时，阴影不要全局铺开，只在少数展示块里使用

### 12.8 建议新增的语义型组件 token

这是我额外建议你保留的一层。

因为如果只存颜色和字号，后面你还是很容易忘记“这个值到底该用在什么地方”。

| Token 名称 | 建议值 | 用途 |
| --- | --- | --- |
| `portfolioSectionBackground` | `portfolioSurface` | 普通 section 背景 |
| `portfolioMediaFrameBackground` | `portfolioSurfaceWarm` | 图片展示容器背景 |
| `portfolioMediaFrameBorder` | `portfolioBorderLight` | 图片展示容器边框 |
| `portfolioEyebrowColor` | `portfolioAccentBrand` | 强调标签 |
| `portfolioCaptionColor` | `portfolioTextMuted` | 图注文字 |
| `portfolioBodyColor` | `portfolioTextBody` | 正文 |
| `portfolioTitleColor` | `portfolioTextTitle` | 标题 |

这一层的好处是：

- 以后改风格时，不用每次回头找原始色值
- 你会更容易从“设计意图”角度理解 token

### 12.9 哪些建议先不要做成全局 token

这一部分反而很关键。

下面这些值虽然在 Figma 里出现得很多，但我不建议你现在就把它们都推成全局通用规则：

- 所有固定截图尺寸
- 所有单次页面里的绝对定位值
- `1920` 画板宽本身
- 个别对比图中的设备描边厚度
- 某个案例专属的大背景图样式

原因是：

- 这些更像“页面模板值”
- 不是“系统底层值”
- 如果太早全局化，后面你会被单个案例的版式绑住

### 12.10 下一步真正落代码时的推荐顺序

为了继续保持小步修改，我建议后面按这个顺序推进：

1. 先新增 `portfolio token draft` 对应的 JS token 文件，不替换旧 token
2. 先让作品集页面层开始吃新的颜色、标题字体和 section 节奏
3. 再补作品集专用的 `Section / MediaFrame / Caption` 这类模块样式
4. 最后才判断哪些 Button、Card 需要作品集变体

### 12.11 当前这一章的定位

这一章不是最终实现稿，而是“视觉规则草案”。

它的作用是：

- 帮你锁定方向
- 避免后面边做边漂
- 让你每次继续完善作品集时，都有同一套标准可参照

如果后面你确认这套方向没问题，下一步最合适的小步动作就是：

- 新建 `design-system/tokens/portfolio.js`
- 只把这里已经确认的 token 先落进去
- 暂时不改任何旧组件

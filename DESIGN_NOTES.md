# DESIGN NOTES

这份文档是 [DESIGN.md](/Users/zhaozirui/Desktop/AI%20Coding/Portfolio2026/DESIGN.md) 的补充说明。

如果说 `DESIGN.md` 是“主设计规范”，那这份文档更像：

- 设计背景笔记
- 更详细的组件说明
- 当前项目结构说明
- 后续可以继续补强的方向

它不负责定义最高优先级规则。  
真正需要优先遵守的设计标准，还是以 `DESIGN.md` 为准。

## 1. 这份补充文档的用途

这份文档适合在下面几种场景里使用：

- 想回顾这个项目现在是怎么搭起来的
- 想看比 `DESIGN.md` 更详细的 token 和组件解释
- 想快速找到“改什么应该去哪个文件”
- 想保留设计过程中的判断和演进方向，但又不想让主文档太长

## 2. 当前项目结构说明

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
│   ├── portfolio.js
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
  - 负责挂载 `PersonalWebsite`
- `app/page.jsx`
  - 复用 `App.jsx` 作为 Next.js 首页入口
- `app/layout.jsx`
  - 负责引入全局样式和设计系统 CSS Variables
- `design-system/index.js`
  - 统一导出组件、 tokens、hook

## 3. 当前通用设计系统的补充理解

### 3.1 当前整体气质

当前通用设计系统更接近下面这组关键词：

- 轻盈
- 克制
- 小清新
- 轻卡片感
- 中性 UI

它更像一个“可复用的通用前端底座”，而不是完整的作品集页面语言。

### 3.2 这套通用系统主要解决什么

- 统一颜色、字体、间距这些基础视觉规则
- 提供可复用的基础组件，比如 `Button`、`Input`、`Card`
- 用统一的 CSS Variables 让页面样式和组件样式共用一套 token
- 让页面能通过“组合区块”的方式继续演进，而不是每次推倒重做

## 4. Base Tokens 详细说明

### 4.1 颜色系统

文件：`design-system/tokens/colors.js`

| Token | 值 | 用途 |
| --- | --- | --- |
| `canvas` | `#fcfcfb` | 页面最外层背景 |
| `surface` | `#ffffff` | 卡片、按钮、主要内容面 |
| `surfaceSoft` | `#f9fafa` | 更柔和的浅层容器背景 |
| `surfaceMuted` | `#f4f5f6` | 输入框、弱强调背景 |
| `ink` | `#14181b` | 最深层文字、主按钮背景 |
| `inkSoft` | `#22262a` | 次一级深色文字 |
| `text` | `#22262a` | 正文主文字 |
| `textSupport` | `#4c5257` | 辅助说明、次级链接 |
| `textMuted` | `#6d7378` | 次级正文 |
| `textSubtle` | `#9fa3a7` | placeholder、弱提示 |
| `border` | `#e3e5e8` | 标准边框 |
| `borderSoft` | `#eeeff1` | 更轻的边框 |
| `borderMuted` | `#e5e5e5` | chip、弱边界 |
| `accentSky` | `#dff1f3` | 天空色强调 |
| `accentBlush` | `#fdecea` | 柔和粉强调 |
| `accentSand` | `#efe9e0` | 沙色强调 |

补充理解：

- 主系统几乎没有“强品牌主色”
- 强调色更像气氛辅助，而不是大面积视觉主角
- 如果以后有更明确的个人品牌色，应该优先放在 `portfolio` 主题层，而不是直接污染 base layer

### 4.2 间距系统

文件：`design-system/tokens/spacing.js`

| Token | 值 | 说明 |
| --- | --- | --- |
| `2xs` | `0.25rem` | 极小间距 |
| `xs` | `0.5rem` | 标签、图标间距 |
| `sm` | `0.75rem` | 小组件内间距 |
| `md` | `1rem` | 常规间距 |
| `lg` | `1.5rem` | 组件级间距 |
| `xl` | `2rem` | 大组件内边距 |
| `2xl` | `3rem` | 模块间距 |
| `3xl` | `4rem` | 更大模块间距 |
| `section` | `6rem` | section 纵向间距 |
| `hero` | `7.5rem` | Hero 级大留白 |

补充理解：

- 这套系统的“呼吸感”主要来自 `2xl`、`3xl`、`section`、`hero`
- 页面太紧时，通常优先调 section
- 页面太散时，通常优先调 `section` 和 `hero`

### 4.3 字体系统

文件：`design-system/tokens/typography.js`

#### 字体族

| Token | 值 | 作用 |
| --- | --- | --- |
| `display` | `Inter / Avenir Next / Helvetica Neue / sans-serif` | 大标题 |
| `ui` | `Avenir Next / Inter / Segoe UI / sans-serif` | 按钮、UI 文字 |
| `body` | `Inter / Segoe UI / sans-serif` | 正文 |

#### 字号层级

| Scale | Size | Line Height | Weight | 用途 |
| --- | --- | --- | --- | --- |
| `display` | `clamp(3.2rem, 7vw, 5.25rem)` | `1.02` | `400` | 首页超大标题 |
| `headingLg` | `clamp(2.3rem, 4vw, 3.25rem)` | `1.08` | `400` | 大区块标题 |
| `headingMd` | `1.5rem` | `1.33` | `500` | 卡片标题 / section 标题 |
| `headingSm` | `1.125rem` | `1.45` | `500` | 小卡片标题 |
| `bodyLg` | `1rem` | `1.7` | `400` | 正文 |
| `bodySm` | `0.875rem` | `1.5` | `400` | 辅助正文 |
| `label` | `0.875rem` | `1.4` | `600` | 按钮、字段标签 |
| `overline` | `0.75rem` | `1.2` | `600` | eyebrow、微型说明 |

补充理解：

- `display` 和 `headingLg` 的字重都偏轻
- `bodyLg` 行高较宽松，说明当前系统优先保证阅读舒适
- 如果以后要做更强烈、更时尚的变化，优先从作品集标题系统改起，不要先破坏 base layer

### 4.4 通用视觉 token

文件：`design-system/tokens/index.js`

当前已经沉淀的额外视觉 token：

- 圆角
  - `--ds-radius-sm: 0.75rem`
  - `--ds-radius-md: 1rem`
  - `--ds-radius-lg: 1.5rem`
  - `--ds-radius-xl: 1.75rem`
  - `--ds-radius-pill: 999px`
- 阴影
  - `--ds-shadow-soft: 0 18px 40px rgba(20, 24, 27, 0.06)`
  - `--ds-shadow-edge: inset 0 0 0 1px rgba(227, 229, 232, 1)`

## 5. 基础组件补充说明

### 5.1 Button

文件：`design-system/components/Button.jsx`

Button 是当前使用频率最高的基础组件之一，负责统一按钮视觉规则。

支持的属性：

| 属性 | 类型 | 作用 |
| --- | --- | --- |
| `as` | `string` | 指定底层标签 |
| `children` | `ReactNode` | 按钮文案 |
| `className` | `string` | 追加类名 |
| `fullWidth` | `boolean` | 宽度撑满 |
| `href` | `string` | 有链接时自动渲染成 `a` |
| `leadingIcon` | `ReactNode` | 左图标 |
| `trailingIcon` | `ReactNode` | 右图标 |
| `size` | `"sm" \| "md" \| "icon"` | 尺寸 |
| `variant` | 多种枚举 | 视觉样式 |

支持的变体：

- `primary`
- `secondary`
- `soft`
- `ghost`
- `chip`
- `link`
- `icon`
- `iconFilled`

补充理解：

- 默认是圆角 pill
- `chip` 更像胶囊标签
- `link` 更适合卡片里的文字型 CTA

### 5.2 Input

文件：`design-system/components/Input.jsx`

这个 Input 更像“带操作区的大输入容器”，不是传统单行表单输入。

适合：

- 创作输入
- AI prompt 输入
- 留言输入

不适合：

- 标准后台表单字段批量复用

如果以后需要更标准的表单体系，建议单独补：

- `TextField`
- `Textarea`
- `Select`
- `Checkbox / Radio`

### 5.3 Card

文件：`design-system/components/Card.jsx`

Card 的意义不是“只有一种卡片”，而是“用一套共同语言支持不同卡片形态”。

当前支持：

- `feature`
- `featureReverse`
- `article`

补充理解：

- `feature` 是横向双栏
- `featureReverse` 适合交错布局
- `article` 更适合作品、文章、博客列表

虽然当前个人网站里的作品集没有直接调用 `Card.jsx`，但视觉语言已经在继承它的方向：

- 轻边框
- 柔和圆角
- 内容优先
- 媒体区与文字区分工明确

### 5.4 useMediaQuery

文件：`design-system/hooks/useMediaQuery.js`

这个 hook 的作用：

- 订阅屏幕尺寸变化
- 在 React 环境里安全处理 SSR 和客户端差异

当前实现亮点：

- 用的是 `useSyncExternalStore`
- 比传统 `useEffect + useState` 更稳，尤其适合 Next.js

## 6. 当前页面层的补充说明

### 6.1 页面入口

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

这层结构的意义：

- `App.jsx` 保持极简
- 页面按 section 组合
- 调整某个模块时不用动整页

### 6.2 数据层

文件：`src/personal-site/site-data.js`

这里集中存放：

- `profile`
- `socialLinks`
- `timelineItems`
- `portfolioItems`

它的价值在于把“内容”和“结构”分开。

### 6.3 页面专用样式

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

## 7. 当前系统还可以继续补强的方向

这一部分不是强规则，只是后续可持续补充的方向。

- 把页面层里重复出现的卡片模式再抽象一层
- 增加更标准的表单组件体系
- 给按钮和卡片补 hover / focus / active 的系统规则
- 补充移动端更细的响应式规范
- 给作品卡片建立统一的数据结构，比如 `title / summary / tags / href / image / year / role`
- 把设计系统从“组件级”继续推进到“模块级”

## 8. 什么时候优先看这份文档

如果你正在做下面这些事，建议优先看 `DESIGN_NOTES.md`：

- 想理解这个项目当前是怎么长出来的
- 想看更完整的 token 解释
- 想知道组件在当前项目里分别承担什么角色
- 想看主文档里省略掉的补充背景

如果你正在做下面这些事，建议优先看 `DESIGN.md`：

- 想确定当前作品集页面必须遵守什么规则
- 想继续延续作品集主题
- 想知道后续新增页面该遵守什么视觉模式

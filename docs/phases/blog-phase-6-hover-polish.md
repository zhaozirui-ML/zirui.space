# Blog Phase 6

## 目标

参考 [Instruct Blog](https://instruct.ai/blog) 的 blog 卡片交互方式，重新收敛 `/blog` 列表页卡片的 hover 效果，让交互更简约、更克制，不再依赖明显的抬升和阴影。

## 改动

- 更新 `src/site/styles/blog-page.module.css` 中 `featuredCard` 和 `browseCard` 的 hover 逻辑。
- 移除原本依赖 `translateY` 和阴影的 hover 表达，改为以背景色轻微变化为主。
- 将 hover 过渡统一为 `200ms` 左右的颜色过渡，和参考站点更接近。
- 对深色 featured 卡片单独提供更轻的 hover 背景变化，避免在深背景上显得突兀。
- 把 hover 样式包进 `@media (hover: hover)`，保证触屏设备不会错误触发这类交互语气。

## 验证结果

- `pnpm typecheck` 通过。
- `pnpm lint` 通过。
- 通过抓取参考页源码，确认其 blog 卡片主要使用 `transition-colors duration-200 hover:bg-neutral-200` 这类轻量背景变化，而不是明显位移。
- 使用 Playwright CLI 重新检查了 `/blog` 页面默认态截图，确认：
  - 页面静态结构没有被 hover 改坏。
  - 默认卡片视觉依旧稳定，没有因 hover 改动引入额外边框或阴影残留。

## 下一步

- 如果你希望更进一步贴近参考站，可以继续把 hover 时标题和摘要的灰阶变化也做得更细。
- 如果你想保留一点作品集自身的个性，也可以只在 featured 卡片上保留非常轻的色彩变化，让 browse 卡片更接近纯中性风格。

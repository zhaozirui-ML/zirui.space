// 使用方式：
// 1. 复制这个文件，并把文件名改成你的文章 slug，例如 `my-new-post.js`
// 2. 把下面的 `blogPostTemplate` 改成对应的变量名，例如 `myNewPost`
// 3. 填完内容后，到 `index.js` 里 import 并加入 `blogPosts`
// 4. 如果文章有配图，把资源放到 `public/site/blog/<slug>/` 目录

export const blogPostTemplate = {
  slug: "my-new-post",
  // `featured` 会出现在 Featured 区域；`browse` 只出现在 Browse All 列表
  section: "browse",
  title: {
    zh: "这里填写中文标题",
    en: "Write the English title here",
  },
  summary: {
    zh: "用于列表卡片的短摘要，尽量控制在一两句话内。",
    en: "A short summary for the list card, ideally one or two sentences.",
  },
  detailSummary: {
    zh: "用于详情页开头和 SEO 的较长摘要，可以比 summary 更完整一些。",
    en: "A longer summary for the detail page and SEO metadata.",
  },
  // 当前项目的排序逻辑依赖这个日期格式：`YYYY年M月D日`
  date: "2026年5月6日",
  category: {
    zh: "指南",
    en: "GUIDE",
  },
  imageSrc: "/site/blog/my-new-post/cover.jpg",
  imageAlt: {
    zh: "这里填写列表封面的中文替代文本",
    en: "English alt text for the list cover image",
  },
  heroImageSrc: "/site/blog/my-new-post/cover.jpg",
  heroImageAlt: {
    zh: "这里填写头图的中文替代文本",
    en: "English alt text for the hero image",
  },
  // 只有文章详情真的提供了英文内容时，才保留为 true
  supportsEnglishDetail: true,
  contentBlocks: [
    {
      type: "heading",
      level: "h2",
      text: {
        zh: "第一部分标题",
        en: "First Section Heading",
      },
    },
    {
      type: "paragraph",
      text: {
        zh: "这里填写正文段落。建议先从最小可用内容开始，确认页面结构没问题后，再继续扩写。",
        en: "Write the paragraph content here. Start with the minimum viable content first, then expand after the layout looks correct.",
      },
    },
    {
      type: "list",
      ordered: false,
      items: [
        {
          text: {
            zh: "列表项一",
            en: "List item one",
          },
          nested: [],
        },
        {
          text: {
            zh: "列表项二",
            en: "List item two",
          },
          nested: [],
        },
      ],
    },
    {
      type: "image",
      src: "/site/blog/my-new-post/body-1.png",
      alt: {
        zh: "这里填写正文配图的中文替代文本",
        en: "English alt text for the inline image",
      },
    },
  ],
};

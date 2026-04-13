/**
 * @typedef {import("./get-localized-value").LocalizedValue<string>} LocalizedText
 */

export const siteShellDictionary = {
  footerCopyright: {
    zh: "© 2026 赵子锐 版权所有。",
    en: "© 2026 Zirui Zhao. All rights reserved.",
  },
  languageSwitchLabel: {
    zh: "切换网站语言",
    en: "Switch site language",
  },
  navigationAriaLabel: {
    zh: "主导航",
    en: "Primary navigation",
  },
};

export const homePageDictionary = {
  blogSectionSubtitle: {
    zh: "看看我在想什么",
    en: "See what I think about",
  },
  blogSectionTitle: {
    zh: "文章",
    en: "Blogs",
  },
  readArticleAriaLabel: {
    zh: "阅读文章",
    en: "Read article",
  },
  skillsSectionSubtitle: {
    zh: "看看我能做什么",
    en: "See what I can do",
  },
  skillsSectionTitle: {
    zh: "能力",
    en: "Skills",
  },
  viewProject: {
    zh: "查看项目",
    en: "View Project",
  },
  workSectionSubtitle: {
    zh: "看看我做过什么",
    en: "See what I do",
  },
  workSectionTitle: {
    zh: "精选作品",
    en: "Recent Works",
  },
};

export const workIndexDictionary = {
  metadataAriaLabel: {
    zh: "项目信息",
    en: "Project metadata",
  },
  pageSubtitle: {
    zh: "看看我做过什么",
    en: "See what I do",
  },
  pageTitle: {
    zh: "作品",
    en: "Works",
  },
  tabAriaLabel: {
    zh: "作品分类",
    en: "Work categories",
  },
};

export const blogIndexDictionary = {
  browseHeading: {
    zh: "全部文章",
    en: "Browse all",
  },
  featuredHeading: {
    zh: "精选文章",
    en: "Featured",
  },
  readArticleAriaLabel: {
    zh: "阅读文章",
    en: "Read article",
  },
};

export const aboutPageDictionary = {
  eyebrow: {
    zh: "关于",
    en: "About",
  },
  pageDescription: {
    zh: "这里后面适合承接个人介绍、经历、服务方式和联系方式，不需要再从首页里硬拆。",
    en: "This page is reserved for a fuller introduction, selected experience, collaboration approach, and contact details without forcing everything back into the homepage.",
  },
  pageTitle: {
    zh: "关于页骨架已经预留",
    en: "The About page structure is already reserved",
  },
  placeholderItems: {
    zh: [
      "个人简介和方法论。",
      "经历时间线或精选项目背景。",
      "联系方式、合作说明和外链入口。",
    ],
    en: [
      "A personal introduction and design approach.",
      "A career timeline or selected project context.",
      "Contact details, collaboration notes, and external links.",
    ],
  },
  placeholderTitle: {
    zh: "这一页后面可以继续拆成",
    en: "This page can be expanded with",
  },
};

export const untranslatedDetailDictionary = {
  backToBlog: {
    zh: "返回博客",
    en: "Back to Blog",
  },
  backToWork: {
    zh: "返回作品",
    en: "Back to Work",
  },
  blogEyebrow: {
    zh: "内容迁移中",
    en: "English version in progress",
  },
  blogTitle: {
    zh: "英文版文章还在整理中",
    en: "This article is not available in English yet",
  },
  description: {
    zh: "当前阶段先保证英文模式下不再混入中文正文。这个页面的英文版会在后续内容迁移完成后补齐。",
    en: "For this phase, English mode avoids mixing in Chinese body copy. A full English version will be added after the content migration is complete.",
  },
  noteItems: {
    zh: [
      "当前可先切回中文查看完整内容。",
      "后续会优先把正文从组件里抽到数据层，再补英文字段。",
    ],
    en: [
      "You can switch back to Chinese to read the full version right now.",
      "The next step is to move long-form content into structured data and add English copy there.",
    ],
  },
  noteTitle: {
    zh: "下一步会继续做什么",
    en: "What will happen next",
  },
  workEyebrow: {
    zh: "案例迁移中",
    en: "English case study in progress",
  },
  workTitle: {
    zh: "这个案例的英文版还在整理中",
    en: "This case study is not available in English yet",
  },
};

/**
 * @param {import("./config").SiteLanguage} language
 */
export function getRootMetadata(language) {
  return language === "en"
    ? {
        description:
          "A portfolio website built with a local design system and site-specific case studies.",
        title: "Zirui Zhao Portfolio",
      }
    : {
        description: "一个基于本地设计系统与案例叙事搭建的产品设计作品集。",
        title: "赵子锐作品集",
      };
}

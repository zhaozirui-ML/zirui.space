export const siteShellDictionary = {
  footerCopyright: {
    zh: "© 2026 赵子锐 版权所有。",
    en: "© 2026 Zirui Zhao. All rights reserved.",
  },
  languageSwitchLabel: {
    zh: "切换网站语言",
    en: "Switch site language",
  },
  languageSwitchToChineseLabel: {
    zh: "切换到中文",
    en: "Switch to Chinese",
  },
  languageSwitchToEnglishLabel: {
    zh: "切换到英文",
    en: "Switch to English",
  },
  navigationAriaLabel: {
    zh: "主导航",
    en: "Primary navigation",
  },
};

export const homePageDictionary = {
  blogsSectionSubtitle: {
    zh: "看看我在想什么",
    en: "See what I think about",
  },
  blogsSectionTitle: {
    zh: "文章",
    en: "Blogs",
  },
  blogsSectionViewArticle: {
    zh: "阅读文章",
    en: "Read Article",
  },
  skillsSectionSubtitle: {
    zh: "看看我能做什么",
    en: "See what I can do",
  },
  skillsSectionTitle: {
    zh: "能力",
    en: "Skills",
  },
  workSectionSubtitle: {
    zh: "看看我做过什么",
    en: "See what I do",
  },
  workSectionTitle: {
    zh: "精选作品",
    en: "Recent Works",
  },
  workSectionViewProject: {
    zh: "查看项目",
    en: "View Project",
  },
};

export const aboutPageDictionary = {
  contactEmailLabel: {
    zh: "邮箱",
    en: "Email",
  },
  contactPhoneLabel: {
    zh: "电话",
    en: "Phone",
  },
  contactSocialLabel: {
    zh: "社交链接",
    en: "Social links",
  },
  educationTitle: {
    zh: "教育",
    en: "Education",
  },
  experienceTitle: {
    zh: "经历",
    en: "Experience",
  },
  skillsTitle: {
    zh: "技能",
    en: "Skills",
  },
  aboutDescription: {
    zh: "这里会慢慢补上更完整的个人介绍、经历和联系方式。",
    en: "This page will gradually grow into a fuller introduction, experience summary, and contact hub.",
  },
  aboutEyebrow: {
    zh: "关于",
    en: "About",
  },
  aboutTitle: {
    zh: "关于页已经准备好了",
    en: "The About page is ready",
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
 * @returns {{ title: string, description: string }}
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

import { getLocalizedValue } from "./get-localized-value";
import { getSiteUrl } from "../lib/get-site-url";

export const siteShellDictionary = {
  brandHomeLabel: {
    zh: "返回首页",
    en: "Back to home",
  },
  languageSwitchToChineseLabel: {
    zh: "切换到中文",
    en: "Switch to Chinese",
  },
  languageSwitchToEnglishLabel: {
    zh: "切换到英文",
    en: "Switch to English",
  },
  languageTooltipChineseLabel: {
    zh: "中文",
    en: "Chinese",
  },
  languageTooltipEnglishLabel: {
    zh: "English",
    en: "English",
  },
  themeSwitchToDarkLabel: {
    zh: "切换到深色主题",
    en: "Switch to dark theme",
  },
  themeSwitchToLightLabel: {
    zh: "切换到浅色主题",
    en: "Switch to light theme",
  },
  themeTooltipMoonlightLabel: {
    zh: "月光模式",
    en: "Moonlight",
  },
  themeTooltipSunlightLabel: {
    zh: "阳光模式",
    en: "Sunlight",
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
  metadataDescription: {
    zh: "查看赵子瑞的经历、教育背景、技能结构与联系方式。",
    en: "Review Zhao Zirui's experience, education, skills, and contact details.",
  },
  pageTitle: {
    zh: "简历",
    en: "Resume",
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
};

export const workIndexDictionary = {
  explorationsNote: {
    zh: "最近的一些探索，还在持续打磨中。",
    en: "Recent explorations. Still cooking...",
  },
  metadataDescription: {
    zh: "浏览赵子瑞的产品设计案例、系统设计项目与探索作品。",
    en: "Browse Zhao Zirui's product design case studies, systems work, and explorations.",
  },
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
  metadataDescription: {
    zh: "阅读赵子瑞关于设计系统、复杂业务流程和产品设计思考的文章。",
    en: "Read Zhao Zirui's writing on design systems, complex workflows, and product design thinking.",
  },
  metadataTitle: {
    zh: "博客",
    en: "Blog",
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
 * @returns {import("next").Metadata}
 */
export function getRootMetadata(language) {
  const metadataBase = new URL(getSiteUrl());
  const resolvedTitle = language === "en" ? "Zhao Zirui Portfolio" : "赵子瑞作品集";
  const resolvedDescription =
    language === "en"
      ? "A portfolio website built with a local design system and site-specific case studies."
      : "一个基于本地设计系统与案例叙事搭建的产品设计作品集。";
  const socialImage = {
    alt: language === "en" ? "Share preview for Zhao Zirui Portfolio" : "赵子瑞作品集分享预览图",
    height: 630,
    url: "/opengraph-image",
    width: 1200,
  };

  return {
    alternates: {
      canonical: "/",
    },
    description: resolvedDescription,
    metadataBase,
    openGraph: {
      description: resolvedDescription,
      images: [socialImage],
      siteName: resolvedTitle,
      title: resolvedTitle,
      type: "website",
      url: "/",
    },
    title: resolvedTitle,
    twitter: {
      card: "summary_large_image",
      description: resolvedDescription,
      images: [socialImage.url],
      title: resolvedTitle,
    },
  };
}

/**
 * 为模块首页生成更具体的页面级 metadata，避免所有入口页共用同一份标题和描述。
 *
 * @param {{
 *   description: import("./get-localized-value").LocalizedValue<string>,
 *   language: import("./config").SiteLanguage,
 *   pathname?: string,
 *   title: import("./get-localized-value").LocalizedValue<string>,
 * }} options
 * @returns {import("next").Metadata}
 */
export function getPageMetadata({ description, language, pathname, title }) {
  const rootMetadata = getRootMetadata(language);
  const resolvedTitle = getLocalizedValue(title, language);
  const resolvedDescription = getLocalizedValue(description, language);
  const pageTitle =
    language === "en"
      ? `${resolvedTitle} | ${rootMetadata.title}`
      : `${resolvedTitle}｜${rootMetadata.title}`;

  return {
    alternates: pathname
      ? {
          canonical: pathname,
        }
      : undefined,
    description: resolvedDescription,
    openGraph: {
      description: resolvedDescription,
      images: ["/opengraph-image"],
      title: pageTitle,
      url: pathname,
    },
    title: pageTitle,
    twitter: {
      card: "summary_large_image",
      description: resolvedDescription,
      images: ["/opengraph-image"],
      title: pageTitle,
    },
  };
}

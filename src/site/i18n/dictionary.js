import { getLocalizedValue } from "./get-localized-value";
import { getSiteUrl } from "../lib/get-site-url";

const SOCIAL_IMAGE_URL = "/og/home-hero-og.png";

function getSocialImage(language) {
  return {
    alt: language === "en" ? "Share preview for Zhao Zirui Portfolio" : "赵子瑞作品集分享预览图",
    height: 630,
    url: SOCIAL_IMAGE_URL,
    width: 1200,
  };
}

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
    zh: "浏览赵子瑞的产品设计案例、系统设计项目与个人项目。",
    en: "Browse Zhao Zirui's product design case studies, systems work, and side projects.",
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
  const resolvedTitle =
    language === "en"
      ? "Zirui Zhao | Product Designer"
      : "赵子瑞｜产品设计作品集";
  const resolvedDescription =
    language === "en"
      ? "Explore Zirui Zhao's product design portfolio, featuring enterprise workflows, design systems, case studies, and AI-assisted design engineering experiments."
      : "浏览赵子瑞的产品设计作品集，了解企业级工作流、设计系统、案例研究与 AI 设计工程探索。";
  const socialImage = getSocialImage(language);

  return {
    alternates: {
      canonical: "/",
    },
    applicationName: "zirui.space",
    authors: [{ name: "Zirui Zhao", url: "/" }],
    category: "portfolio",
    creator: "Zirui Zhao",
    description: resolvedDescription,
    keywords: [
      "Zirui Zhao",
      "Zhao Zirui",
      "赵子瑞",
      "Product Designer",
      "UX Designer",
      "Design Systems",
      "Enterprise Product Design",
      "AI Design Engineering",
    ],
    metadataBase,
    openGraph: {
      description: resolvedDescription,
      images: [socialImage],
      locale: language === "en" ? "en_US" : "zh_CN",
      siteName: resolvedTitle,
      title: resolvedTitle,
      type: "website",
      url: "/",
    },
    publisher: "Zirui Zhao",
    robots: {
      follow: true,
      googleBot: {
        follow: true,
        index: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
      index: true,
    },
    title: resolvedTitle,
    twitter: {
      card: "summary_large_image",
      creator: "@zhaozirui",
      description: resolvedDescription,
      images: [socialImage.url],
      title: resolvedTitle,
    },
  };
}

/**
 * 给搜索引擎补充结构化语义：这个站点是谁的作品集、作者是谁、主要覆盖哪些主题。
 *
 * @param {import("./config").SiteLanguage} language
 * @returns {object}
 */
export function getRootStructuredData(language) {
  const siteUrl = getSiteUrl();
  const name = language === "en" ? "Zirui Zhao" : "赵子瑞";
  const description =
    language === "en"
      ? "Product designer focused on enterprise workflows, design systems, and AI-assisted design engineering."
      : "专注于企业级工作流、设计系统与 AI 设计工程的产品设计师。";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": `${siteUrl}/#person`,
        "@type": "Person",
        description,
        image: `${siteUrl}/site/home/avatar/home-avatar-cutout.png`,
        jobTitle: "Product Designer",
        name,
        sameAs: [
          "https://www.linkedin.com/in/zirui-zhao-509306246/",
          "https://github.com/zhaozirui-ML",
        ],
        url: siteUrl,
      },
      {
        "@id": `${siteUrl}/#website`,
        "@type": "WebSite",
        about: { "@id": `${siteUrl}/#person` },
        description,
        inLanguage: language === "en" ? "en-US" : "zh-CN",
        name: language === "en" ? "Zirui Zhao Portfolio" : "赵子瑞作品集",
        publisher: { "@id": `${siteUrl}/#person` },
        url: siteUrl,
      },
    ],
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
  const socialImage = getSocialImage(language);
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
      images: [socialImage],
      title: pageTitle,
      url: pathname,
    },
    title: pageTitle,
    twitter: {
      card: "summary_large_image",
      description: resolvedDescription,
      images: [socialImage.url],
      title: pageTitle,
    },
  };
}

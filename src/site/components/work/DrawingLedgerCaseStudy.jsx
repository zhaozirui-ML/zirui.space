import Image from "next/image";

import {
  CaseStudyHeadingOne,
  CaseStudyHeadingThree,
  CaseStudyHeadingTwo,
} from "../case-study/CaseStudyHeading";
import CaseStudyToc from "../case-study/CaseStudyToc";
import { drawingLedgerAssets as assets } from "../../data/work-details/drawing-ledger-2-0";
import styles from "../../styles/drawing-ledger-case-study.module.css";

const t = (zh, en) => ({ zh, en });

const optionAPros = [
  "待处理和已处理的内容非常清晰，一目了然。",
  "支持不同状态图纸按时间排序。",
];

const optionACons = [
  "待处理内容数量过多时展示不佳，已处理内容容易被挤出首屏，需要用户手动展开收起。",
  "上下空间紧张，每张卡片只适合展示关键信息，不适合承载太多字段。",
];

const optionBPros = [
  "模块分区更清晰，同时规避了方案 A 中页面数据展示不全的问题。",
  "上下空间充足，适合展示详细信息，卡片高度可扩展。",
];

const optionBCons = [
  "待处理数据较少时，画面会显得比较空。",
  "待处理和已处理分开后，上下文联系变弱，卡片在两个区域间跳变明显，理解成本变高。",
];

const roundTwoBenefits = [
  {
    body: "保住了用户习惯和海量数据的检索效率。",
    title: "保留表格",
  },
  {
    body: "实现“千人千面”的核心策略，把不同角色最需要关注的内容放在最显眼的位置。",
    title: "增加待办区",
  },
  {
    body: "界面改动成本小，底层逻辑无需完全重写，ROI 更高。",
    title: "研发友好",
  },
];

const assignmentCards = [
  {
    asset: assets.detailsUploader,
    description: "上传人：关注「解析中、待确认」的版本图纸",
  },
  {
    asset: assets.detailsConfirmor,
    description: "确认人：仅关注「待确认」的版本图纸",
  },
  {
    asset: assets.detailsIssuer,
    description: "下发人：仅关注「待下发」的版本图纸",
  },
  {
    asset: assets.detailsAdmin,
    description: "多权限角色：关注所有状态的版本图纸",
  },
];

const responsiveRules = {
  intro: "布局排列规则：",
  lead: "设 X = Viewport 宽度 - 侧边栏宽度 290px（64 + 226）",
  ranges: [
    "当 X 在 [1024px, 1280px) 区间时，呈现 3 列",
    "当 X 在 [1280px, 1920px] 区间时，呈现 4 列",
    "当 X 在 (1920px, 2048px] 区间时，呈现 5 列",
    "当 X 宽度大于 2048px 时，以每张卡片 360px 计算，横向排列并自动换行",
  ],
  cardSize: "卡片尺寸：最小宽度 300px，不设最大宽度；高度固定 65px",
};

const tocItems = [
  {
    hierarchy: "primary",
    id: "case-overview",
    label: "业务背景",
  },
  {
    hierarchy: "primary",
    id: "case-problem",
    label: "问题定位",
  },
  {
    hierarchy: "primary",
    id: "case-goal",
    label: "设计目标",
  },
  {
    hierarchy: "primary",
    id: "case-practice",
    label: "设计实践",
  },
  {
    hierarchy: "secondary",
    id: "case-analysis",
    label: "设计分析",
  },
  {
    hierarchy: "secondary",
    id: "case-round-one",
    label: "第一轮探索",
  },
  {
    hierarchy: "secondary",
    id: "case-round-two",
    label: "第二轮方案",
  },
  {
    hierarchy: "secondary",
    id: "case-polish",
    label: "设计打磨",
  },
  {
    hierarchy: "primary",
    id: "case-detail",
    label: "细节展开",
  },
  {
    hierarchy: "secondary",
    id: "case-assignment-logic",
    label: "代办区展示逻辑",
  },
  {
    hierarchy: "secondary",
    id: "case-workflow",
    label: "联动逻辑",
  },
  {
    hierarchy: "secondary",
    id: "case-responsive",
    label: "响应式设计",
  },
  {
    hierarchy: "primary",
    id: "case-mobile",
    label: "移动端设计",
  },
  {
    hierarchy: "secondary",
    id: "case-mobile-revamp",
    label: "视觉化改版",
  },
  {
    hierarchy: "secondary",
    id: "case-mobile-ai",
    label: "AI 辅助设计",
  },
  {
    hierarchy: "secondary",
    id: "case-mobile-iteration",
    label: "同步、反馈与迭代",
  },
  {
    hierarchy: "secondary",
    id: "case-mobile-interaction",
    label: "上滑交互",
  },
  {
    hierarchy: "secondary",
    id: "case-mobile-landed",
    label: "落地效果",
  },
  {
    hierarchy: "primary",
    id: "case-reflection",
    label: "复盘与反思",
  },
];

function resolveLocalizedValue(value, language) {
  if (Array.isArray(value)) {
    return value.map((item) => resolveLocalizedValue(item, language));
  }

  if (value && typeof value === "object") {
    if ("zh" in value || "en" in value) {
      return language === "en" ? value.en ?? value.zh : value.zh ?? value.en;
    }

    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [
        key,
        resolveLocalizedValue(nestedValue, language),
      ]),
    );
  }

  return value;
}

function resolveAssetAlt(asset, language) {
  const alt = resolveLocalizedValue(asset.alt, language);

  if (language !== "en" || typeof alt !== "string") {
    return alt;
  }

    const altMap = {
      "图纸台账 2.0 封面背景图": "Drawing Register 2.0 cover background",
      "图纸台账 2.0 封面主视觉": "Drawing Register 2.0 hero image",
      "问题定位区域背景图": "Problem definition section background",
      "旧版图纸台账页截图": "Old register page screenshot",
      "图纸生命周期状态流转关系图": "Drawing lifecycle state flow diagram",
      "用户任务梳理图": "User task analysis diagram",
      "Round 1 Option A 背景图": "Round 1 Option A background",
    "Round 1 Option A 方案截图": "Round 1 Option A screenshot",
    "Round 1 Option B 背景图": "Round 1 Option B background",
    "Round 1 Option B 方案截图": "Round 1 Option B screenshot",
    "Round 1 探索方案总览背景图": "Round 1 exploration overview background",
    "Round 1 探索方案总览": "Round 1 exploration overview",
    "Round 2 Option C 背景图": "Round 2 Option C background",
    "Round 2 Option C 融合视图截图": "Round 2 Option C blended view screenshot",
    "Round 2 最终视觉稿背景图": "Round 2 final visual background",
    "图纸台账 2.0 最终视觉稿": "Drawing Register 2.0 final visual",
    "代办区展示逻辑背景图": "Task area logic background",
    "上传人视角的待办区截图": "Uploader task area screenshot",
    "确认人视角的待办区截图": "Approver task area screenshot",
    "下发人视角的待办区截图": "Releaser task area screenshot",
    "多权限管理员视角的待办区截图": "Multi-role administrator task area screenshot",
    "图纸下发流程联动示意图": "Drawing release workflow demo",
    "响应式展示区域背景图": "Responsive section background",
    "待办区响应式展示示意图": "Responsive task area demo",
    "移动端改版对比背景图": "Mobile redesign comparison background",
    "移动端改版前页面": "Mobile before screenshot",
    "移动端改版后页面": "Mobile after screenshot",
    "移动端入口设计参考整理图": "Mobile entry reference board",
    "移动端入口探索图 1": "Mobile entry exploration 1",
    "移动端入口探索图 2": "Mobile entry exploration 2",
    "移动端入口探索图 3": "Mobile entry exploration 3",
    "移动端入口探索图 4": "Mobile entry exploration 4",
    "移动端视觉迭代版本 1": "Mobile visual iteration 1",
    "移动端视觉迭代版本 2": "Mobile visual iteration 2",
    "移动端视觉迭代版本 3": "Mobile visual iteration 3",
    "移动端视觉迭代版本 4": "Mobile visual iteration 4",
    "移动端 Tab 展开收起交互示意图": "Mobile tab expand/collapse demo",
    "项目图纸页面": "Project drawings page",
    "台账首页页面": "Register home page",
    "台账详情页面 1": "Register details page 1",
    "台账详情页面 2": "Register details page 2",
  };

  return altMap[alt] ?? alt;
}

function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

function MediaFigure({
  asset,
  backgroundAsset = null,
  caption,
  className = "",
  frameTone = "warm",
  frameHeight = null,
  imageClassName = "",
  imageHeight = null,
  imageFit = "cover",
  imageInsetTop = null,
  imageInsetX = null,
  priority = false,
  placeholder = null,
  language = "zh",
}) {
  /** @type {import("react").CSSProperties & Record<string, string>} */
  const frameStyles = {};

  if (frameHeight) {
    frameStyles["--case-media-frame-height"] = frameHeight;
  }

  if (imageHeight) {
    frameStyles["--case-media-inner-height"] = imageHeight;
  }

  if (imageInsetTop) {
    frameStyles["--case-media-inner-inset-top"] = imageInsetTop;
  }

  if (imageInsetX) {
    frameStyles["--case-media-inner-inset-x"] = imageInsetX;
  }

  const imageClassNameForMedia =
    imageFit === "contain" ? styles.mediaImageContain : styles.mediaImageCover;
  const videoClassNameForMedia =
    imageFit === "contain" ? styles.mediaVideoContain : styles.mediaVideoCover;

  return (
    <figure className={joinClassNames(styles.figure, className)}>
      <div
        className={joinClassNames(
          styles.mediaFrame,
          frameTone === "surface" ? styles.mediaFrameSurface : styles.mediaFrameWarm
        )}
        style={frameStyles}
      >
        {backgroundAsset?.src ? (
          <Image
            alt={resolveAssetAlt(backgroundAsset, language)}
            className={styles.mediaBackground}
            fill
            priority={priority}
            sizes="(max-width: 900px) calc(100vw - 2rem), 832px"
            src={backgroundAsset.src}
            unoptimized={backgroundAsset.unoptimized}
          />
        ) : null}

        {asset?.src ? (
          <div className={joinClassNames(styles.mediaInner, imageClassName)}>
            {asset.mediaType === "video" ? (
              <video
                aria-label={resolveAssetAlt(asset, language)}
                autoPlay
                className={videoClassNameForMedia}
                loop
                muted
                playsInline
                preload="metadata"
                src={asset.src}
              />
            ) : (
              <Image
                alt={resolveAssetAlt(asset, language)}
                className={imageClassNameForMedia}
                fill
                priority={priority}
                sizes="(max-width: 900px) calc(100vw - 2rem), 832px"
                src={asset.src}
                unoptimized={asset.unoptimized}
              />
            )}
          </div>
        ) : null}

        {!asset?.src && placeholder ? (
          <div className={styles.mediaPlaceholder}>{placeholder}</div>
        ) : null}
      </div>
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}

function OptionSummary({ cons, consLabel = "Cons", pros, prosLabel = "Pros", title }) {
  return (
    <article className={styles.summaryCard}>
      <h4 className={styles.summaryTitle}>{title}</h4>
      <div className={styles.summaryGroup}>
        <p className={styles.summaryLabel}>{prosLabel}</p>
        <ul className={styles.summaryList}>
          {pros.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className={styles.summaryGroup}>
        <p className={styles.summaryLabel}>{consLabel}</p>
        <ul className={styles.summaryList}>
          {cons.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function PendingAssetNotice({ body, eyebrow = "待接入资源", title }) {
  return (
    <div className={styles.pendingAssetNotice}>
      <p className={styles.pendingAssetEyebrow}>{eyebrow}</p>
      <p className={styles.pendingAssetTitle}>{title}</p>
      <p className={styles.pendingAssetBody}>{body}</p>
    </div>
  );
}

export default function DrawingLedgerCaseStudy({ backHref = "/work", language = "zh" }) {
  const display = (zh, en) => (language === "en" ? en : zh);
  const resolveAlt = (asset) => {
    const alt = resolveLocalizedValue(asset.alt, language);

    if (language !== "en" || typeof alt !== "string") {
      return alt;
    }

    const altMap = {
      "图纸台账 2.0 封面背景图": "Drawing Register 2.0 cover background",
      "图纸台账 2.0 封面主视觉": "Drawing Register 2.0 hero image",
      "问题定位区域背景图": "Problem definition section background",
      "旧版图纸台账页截图": "Old register page screenshot",
      "Round 1 Option A 背景图": "Round 1 Option A background",
      "Round 1 Option A 方案截图": "Round 1 Option A screenshot",
      "Round 1 Option B 背景图": "Round 1 Option B background",
      "Round 1 Option B 方案截图": "Round 1 Option B screenshot",
      "Round 1 探索方案总览背景图": "Round 1 exploration overview background",
      "Round 1 探索方案总览": "Round 1 exploration overview",
      "Round 2 Option C 背景图": "Round 2 Option C background",
      "Round 2 Option C 融合视图截图": "Round 2 Option C blended view screenshot",
      "Round 2 最终视觉稿背景图": "Round 2 final visual background",
      "图纸台账 2.0 最终视觉稿": "Drawing Register 2.0 final visual",
      "代办区展示逻辑背景图": "Task area logic background",
      "上传人视角的待办区截图": "Uploader task area screenshot",
      "确认人视角的待办区截图": "Approver task area screenshot",
      "下发人视角的待办区截图": "Releaser task area screenshot",
      "多权限管理员视角的待办区截图": "Multi-role administrator task area screenshot",
      "图纸下发流程联动示意图": "Drawing release workflow demo",
      "响应式展示区域背景图": "Responsive section background",
      "待办区响应式展示示意图": "Responsive task area demo",
      "移动端改版对比背景图": "Mobile redesign comparison background",
      "移动端改版前后对比图": "Mobile before and after comparison",
      "移动端入口设计参考整理图": "Mobile entry reference board",
      "移动端初版方案探索图": "Mobile initial concept exploration board",
      "移动端视觉设计迭代图": "Mobile visual design iteration board",
      "移动端 Tab 展开收起交互示意图": "Mobile tab expand/collapse demo",
      "移动端全部核心页面展示图": "All mobile core pages showcase",
    };

    return altMap[alt] ?? alt;
  };
  const localizedOptionAPros = optionAPros.map((item) =>
    language === "en"
      ? {
          "待处理和已处理的内容非常清晰，一目了然。":
            "Pending and processed content are clearly separated at a glance.",
          "支持不同状态图纸按时间排序。":
            "Supports time-based sorting across drawings in different states.",
        }[item] ?? item
      : item,
  );
  const localizedOptionACons = optionACons.map((item) =>
    language === "en"
      ? {
          "待处理内容数量过多时展示不佳，已处理内容容易被挤出首屏，需要用户手动展开收起。":
            "When too many pending items exist, the layout degrades and processed items can get pushed below the fold, requiring manual expand/collapse.",
          "上下空间紧张，每张卡片只适合展示关键信息，不适合承载太多字段。":
            "Vertical space is tight, so each card can only carry key information and not too many fields.",
        }[item] ?? item
      : item,
  );
  const localizedOptionBPros = optionBPros.map((item) =>
    language === "en"
      ? {
          "模块分区更清晰，同时规避了方案 A 中页面数据展示不全的问题。":
            "Clearer module separation while avoiding the incomplete data display problem from Option A.",
          "上下空间充足，适合展示详细信息，卡片高度可扩展。":
            "Enough vertical space for detailed information, and the card height can scale as needed.",
        }[item] ?? item
      : item,
  );
  const localizedOptionBCons = optionBCons.map((item) =>
    language === "en"
      ? {
          "待处理数据较少时，画面会显得比较空。":
            "When pending data is sparse, the page feels empty.",
          "待处理和已处理分开后，上下文联系变弱，卡片在两个区域间跳变明显，理解成本变高。":
            "Splitting pending and processed content weakens context, makes the card jump between zones more obvious, and raises comprehension cost.",
        }[item] ?? item
      : item,
  );
  const localizedRoundTwoBenefits = roundTwoBenefits.map((item) => ({
    title:
      language === "en"
        ? {
            保留表格: "Keep the table",
            增加待办区: "Add a task area",
            研发友好: "Engineering-friendly",
          }[item.title] ?? item.title
        : item.title,
    body:
      language === "en"
        ? {
            "保住了用户习惯和海量数据的检索效率。":
              "Preserves user habits and the retrieval efficiency needed for large-scale data.",
            "实现“千人千面”的核心策略，把不同角色最需要关注的内容放在最显眼的位置。":
              "Delivers the core 'different users, different views' strategy by placing each role's most important content in the most visible spot.",
            "界面改动成本小，底层逻辑无需完全重写，ROI 更高。":
              "Minimizes interface change cost, avoids a full backend rewrite, and improves ROI.",
          }[item.body] ?? item.body
        : item.body,
  }));
  const localizedAssignmentCards = assignmentCards.map((item) => ({
    ...item,
    description:
      language === "en"
        ? {
            "上传人：关注「解析中、待确认」的版本图纸":
              "Uploader: focus on drawings in processing and awaiting confirmation",
            "确认人：仅关注「待确认」的版本图纸":
              "Approver: focus only on drawings awaiting confirmation",
            "下发人：仅关注「待下发」的版本图纸":
              "Releaser: focus only on drawings awaiting release",
            "多权限角色：关注所有状态的版本图纸":
              "Multi-role user: focus on drawings in all states",
          }[item.description] ?? item.description
        : item.description,
  }));
  const localizedResponsiveRules =
    language === "en"
      ? {
          intro: "Layout rules:",
          lead: "Let X = viewport width - 290px sidebar width (64 + 226).",
          ranges: [
            "When X is in the [1024px, 1280px) range, show 3 columns.",
            "When X is in the [1280px, 1920px] range, show 4 columns.",
            "When X is in the (1920px, 2048px] range, show 5 columns.",
            "When X is wider than 2048px, lay out cards horizontally at 360px each and wrap automatically.",
          ],
          cardSize:
            "Card size: minimum width 300px, no maximum width, fixed height 65px.",
        }
      : responsiveRules;
  const localizedTocItems =
    language === "en"
      ? tocItems.map((item) => ({
          ...item,
          label:
            {
              "业务背景": "Business Background",
              "问题定位": "Problem Definition",
              "设计目标": "Design Goals",
              "设计实践": "Design Practice",
              "设计分析": "Design Analysis",
              "第一轮探索": "Round 1",
              "第二轮方案": "Round 2",
              "设计打磨": "Design Polish",
              "细节展开": "Details",
              "代办区展示逻辑": "Task area logic",
              "联动逻辑": "Workflow logic",
              "响应式设计": "Responsive design",
              "移动端设计": "Mobile design",
              "视觉化改版": "Visual revamp",
              "AI 辅助设计": "AI-assisted design",
              "同步、反馈与迭代": "Sync, feedback, and iteration",
              "上滑交互": "Swipe-up interaction",
              "落地效果": "Final delivery",
              "复盘与反思": "Reflection",
            }[item.label] ?? item.label,
        }))
      : tocItems;
  const tocTheme = {
    backHref,
    backLabel: display("返回", "Back"),
    desktopTopOffset: "var(--portfolio-space-section-y)",
    navLabel: display("页面目录", "Page contents"),
  };

  return (
    <article className={styles.caseStudy}>
      <section className={styles.heroSection} id="case-hero">
        <div className={styles.heroBackdrop}>
          <Image
            alt=""
            className={styles.heroBackdropImage}
            fill
            priority
            sizes="(max-width: 1600px) 100vw, 1440px"
            src={assets.coverBackground.src}
            unoptimized={assets.coverBackground.unoptimized}
          />
        </div>

        <div className={styles.heroInner}>
          <header className={styles.heroHeader}>
            <h1 className={styles.heroTitle}>{display("图纸台账 2.0", "Drawing Register 2.0")}</h1>
            <p className={styles.heroSubtitle}>
              {display(
                "从“信息坟墓”到“主动式协作中心”的设计重构",
                "Redesigning the experience from an information graveyard to an active collaboration hub",
              )}
            </p>
          </header>

          <div className={styles.heroMedia}>
            <Image
              alt={resolveAlt(assets.coverHero)}
              className={styles.heroMediaImage}
              fill
              priority
              sizes="(max-width: 1600px) 100vw, 1440px"
              src={assets.coverHero.src}
              unoptimized={assets.coverHero.unoptimized}
            />
          </div>
        </div>
      </section>

      <div className={styles.caseBody}>
        <CaseStudyToc items={localizedTocItems} {...tocTheme} />

        <section className={joinClassNames(styles.fullBleedSection, styles.sectionSurface)}>
          <div className={joinClassNames(styles.sectionContent, styles.sectionContentTightBottom)}>
            <div className={styles.blockStack}>
              <div className={styles.blockStack}>
                <div className={styles.sectionCluster}>
                  <CaseStudyHeadingOne
                    className={styles.anchoredHeader}
                    id="case-overview"
                    title={display("业务背景", "Business Background")}
                  >
                    <div className={styles.richText}>
                      <p>
                        {display(
                          "图纸台账是图纸管理功能模块中，记录图纸从上传到废弃整个生命周期状态流转的空间。台账系统主要涉及上传人、确认人、下发人及多权限管理员 4 类用户角色。",
                          "The drawing register is the space within the drawing management module that records how drawings move through their full lifecycle, from upload to deprecation. The register mainly involves four user roles: uploader, confirmer, releaser, and multi-permission administrator."
                        )}
                      </p>
                      <p>
                        {display(
                          "图纸台账 1.0 版本在我加入团队前已经完成。因为当时的核心目标是快速搭建核心功能并上线，所以没有针对不同角色做差异化设计，导致理解成本高、操作路径冗长，严重影响了图纸流转效率。",
                          "Version 1.0 of the drawing register had already been completed before I joined the team. At that stage, the core goal was to quickly build and launch the essential functionality, so the experience was not differentiated by role. As a result, the page was harder to understand, operation paths were longer, and drawing circulation efficiency was significantly affected."
                        )}
                      </p>
                    </div>
                  </CaseStudyHeadingOne>

                  <figure className={styles.figure}>
                    <div className={styles.lifecycleFigure}>
                      <Image
                        alt={resolveAlt(assets.lifecycleFlow)}
                        className={styles.lifecycleFigureImage}
                        height={468}
                        sizes="(max-width: 680px) calc(100vw - 2.5rem), (max-width: 900px) calc(100vw - 3rem), 880px"
                        src={assets.lifecycleFlow.src}
                        unoptimized={assets.lifecycleFlow.unoptimized}
                        width={1664}
                      />
                    </div>
                  </figure>
                </div>

                <div className={styles.sectionCluster}>
                  <CaseStudyHeadingOne
                    className={styles.anchoredHeader}
                    id="case-problem"
                    title={display("问题定位", "Problem Definition")}
                  >
                    <div className={styles.richText}>
                      <p>{display("旧版台账是一个死的数据容器，主要存在以下 3 大问题：", "The old register was essentially a static data container, and it mainly had three problems:")}</p>
                      <ul>
                        <li>{display("所有用户看到相同的数据，所以也会看到与自己不相关的专业、版本的图纸，给自己带来视觉干扰", "All users saw the same data, so they also saw unrelated disciplines and versions, which created visual noise.")}</li>
                        <li>{display("面对大量的图纸数据，各角色在查找关注的数据时，仿佛在一片数据海中捞针，效率低下", "With large amounts of drawing data, each role had to find what they cared about like searching for a needle in a haystack.")}</li>
                      </ul>
                    </div>
                  </CaseStudyHeadingOne>

                  <figure className={styles.figure}>
                    <div className={styles.problemFigure}>
                      <Image
                        alt={resolveAlt(assets.problemLedgerV1)}
                        className={styles.problemFigureImage}
                        height={936}
                        sizes="(max-width: 680px) calc(100vw - 2.5rem), (max-width: 900px) calc(100vw - 3rem), 880px"
                        src={assets.problemLedgerV1.src}
                        unoptimized={assets.problemLedgerV1.unoptimized}
                        width={1664}
                      />
                    </div>
                    <figcaption className={styles.caption}>{display("旧版图纸台账页", "Old register page")}</figcaption>
                  </figure>
                </div>

                  <CaseStudyHeadingOne
                    className={styles.anchoredHeader}
                    id="case-goal"
                    title={display("设计目标", "Design Goals")}
                  >
                    <div className={styles.richText}>
                    <p>{display("此次设计的核心目标，是把台账系统从「以数据为中心」转变为「以角色和任务为中心」。", "The core goal of this redesign was to shift the register system from being data-centered to being role- and task-centered.")}</p>
                    </div>
                  </CaseStudyHeadingOne>
              </div>

              <div className={styles.sectionFlow}>
                  <CaseStudyHeadingOne
                    className={styles.anchoredHeader}
                    id="case-practice"
                    title={display("设计实践", "Design Practice")}
                  >
                    <div className={styles.richText}>
                    <p>{display("在早期明确了图纸台账 2.0 改版要围绕细分用户角色和权限来重构体验之后，我在项目启动前就开始提前探索设计方案。", "Once it was clear that the v2 register needed to be reorganized around role-specific permissions, I started exploring solutions before the project officially kicked off.")}</p>
                    </div>
                  </CaseStudyHeadingOne>

                <div className={styles.sectionCluster}>
                  <CaseStudyHeadingTwo
                    accentColor="var(--portfolio-color-accent-brand)"
                    className={joinClassNames(styles.anchoredHeader, styles.caseSubheading)}
                    id="case-analysis"
                    title={display("设计分析", "Design Analysis")}
                  >
                    <div className={styles.richText}>
                      <p>{display("根据 JTBD 理论，用户不是在购买产品本身，而是在“雇佣”产品帮他们完成某项任务。那图纸台账模块本质上是在帮助哪些用户完成哪些任务？", "According to JTBD, users are not buying the product itself; they are hiring it to complete a task. So which users is the drawing register really helping, and what tasks are they trying to complete?")}</p>
                    </div>
                  </CaseStudyHeadingTwo>

                  <figure className={styles.figure}>
                    <div className={styles.taskTableFigure}>
                      <Image
                        alt={resolveAlt(assets.userTaskAnalysis)}
                        className={styles.taskTableFigureImage}
                        height={1018}
                        sizes="(max-width: 680px) calc(100vw - 2.5rem), (max-width: 900px) calc(100vw - 3rem), 880px"
                        src={assets.userTaskAnalysis.src}
                        unoptimized={assets.userTaskAnalysis.unoptimized}
                        width={1664}
                      />
                    </div>
                    <figcaption className={styles.caption}>{display("用户任务梳理", "User task analysis")}</figcaption>
                  </figure>
                </div>

                <div className={styles.sectionCluster}>
                  <CaseStudyHeadingTwo
                    accentColor="var(--portfolio-color-accent-brand)"
                    className={joinClassNames(styles.anchoredHeader, styles.caseSubheading)}
                    id="case-round-one"
                    title={display("第一轮：激进重构与现实阻力", "Round 1: Bold redesign and real-world constraints")}
                  >
                    <div className={styles.richText}>
                      <p>{display("明确了用户想完成的功能任务后，我最开始尝试引入“任务管理”范式，想把问题拆成「未处理 / 已处理」两种状态来重塑台账体验。", "After clarifying the user's functional needs, I first tried a task-management model and split the problem into pending vs. processed states to reshape the register experience.")}</p>
                      <ul>
                      <li>{display("未处理的任务：承接用户当前最关心的事项", "Pending tasks: cover what users care about most right now")}</li>
                      <li>{display("已处理的任务：承接用户次一级关注的历史内容", "Processed tasks: cover historical content users care about next")}</li>
                      </ul>
                      <p>{display("下面以“上传人”角色为例，展示第一轮探索。", "The first round is shown below using the uploader role as an example.")}</p>
                    </div>
                  </CaseStudyHeadingTwo>

                  <figure className={styles.figure}>
                    <div className={styles.singleMediaFigure}>
                      <Image
                        alt={resolveAlt(assets.round1OptionA)}
                        className={styles.singleMediaFigureImage}
                        height={938}
                        sizes="(max-width: 680px) calc(100vw - 2.5rem), (max-width: 900px) calc(100vw - 3rem), 880px"
                        src={assets.round1OptionA.src}
                        unoptimized={assets.round1OptionA.unoptimized}
                        width={1664}
                      />
                    </div>
                    <figcaption className={styles.caption}>
                      {display("Option A：待处理和未处理模块上下布局，且支持展开收起", "Option A: pending and processed modules stacked vertically with expand/collapse")}
                    </figcaption>
                  </figure>

                  <OptionSummary
                    cons={localizedOptionACons}
                    consLabel={display("缺点", "Cons")}
                    pros={localizedOptionAPros}
                    prosLabel={display("优点", "Pros")}
                    title={display("Option A", "Option A")}
                  />

                  <figure className={joinClassNames(styles.figure, styles.figureSectionBreak)}>
                    <div className={styles.singleMediaFigure}>
                      <Image
                        alt={resolveAlt(assets.round1OptionB)}
                        className={styles.singleMediaFigureImage}
                        height={938}
                        sizes="(max-width: 680px) calc(100vw - 2.5rem), (max-width: 900px) calc(100vw - 3rem), 880px"
                        src={assets.round1OptionB.src}
                        unoptimized={assets.round1OptionB.unoptimized}
                        width={1664}
                      />
                    </div>
                    <figcaption className={styles.caption}>
                      {display("Option B：待处理和已处理模块左右布局，用 Tab 组件区分", "Option B: pending and processed modules laid out side by side and separated by tabs")}
                    </figcaption>
                  </figure>

                  <OptionSummary
                    cons={localizedOptionBCons}
                    consLabel={display("缺点", "Cons")}
                    pros={localizedOptionBPros}
                    prosLabel={display("优点", "Pros")}
                    title={display("Option B", "Option B")}
                  />

                  <figure className={joinClassNames(styles.figure, styles.figureSectionBreak)}>
                    <div className={styles.singleMediaFigure}>
                      <Image
                        alt={resolveAlt(assets.round1Overview)}
                        className={styles.singleMediaFigureImage}
                        height={938}
                        sizes="(max-width: 680px) calc(100vw - 2.5rem), (max-width: 900px) calc(100vw - 3rem), 880px"
                        src={assets.round1Overview.src}
                        unoptimized={assets.round1Overview.unoptimized}
                        width={1664}
                      />
                    </div>
                    <figcaption className={styles.caption}>
                      {display("探索方案概览 · 第一轮", "Exploration overview · Round 1")}
                    </figcaption>
                  </figure>

                  <article className={styles.feedbackCard}>
                    <h3 className={styles.feedbackTitle}>{display("内部评审反馈", "Internal review feedback")}</h3>
                    <div className={styles.richText}>
                      <p>{display("这套方案在设计评审中遇到了阻力，核心问题集中在用户接受度与研发可行性两方面。", "This solution hit resistance in design review, mainly around user acceptance and implementation feasibility.")}</p>
                      <p className={styles.feedbackLabel}>{display("用户层面", "User side")}</p>
                      <ul>
                        <li>{display("处理海量工程图纸时，用户更看重高密度数据对比与表格式界面带来的全局掌控感", "When handling massive amounts of drawings, users care more about dense data comparison and the sense of control that table-based interfaces provide.")}</li>
                        <li>{display("B 端用户对熟悉界面存在依赖，大幅改版会提高学习成本，削弱接受度", "B2B users rely on familiar interfaces; a major redesign increases learning cost and lowers acceptance.")}</li>
                      </ul>
                      <p className={styles.feedbackLabel}>{display("研发层面", "Engineering side")}</p>
                      <ul>
                        <li>{display("方案涉及较大范围的底层重构，研发成本高，落地推进难度较大", "The proposal required a broad underlying refactor, which meant high engineering cost and harder rollout.")}</li>
                      </ul>
                    </div>
                  </article>
                </div>

                <div className={styles.sectionCluster}>
                  <CaseStudyHeadingTwo
                    accentColor="var(--portfolio-color-accent-brand)"
                    className={joinClassNames(styles.anchoredHeader, styles.caseSubheading)}
                    id="case-round-two"
                    title={display("第二轮：务实的敏捷设计", "Round 2: Practical agile design")}
                  >
                    <div className={styles.richText}>
                      <p>{display("基于第一轮反馈，我放弃“全盘推翻”，改成“渐进式增强”。通过“待办区 + 表格”的融合视图，在保留高密度表格的同时，把不同角色当前最重要的任务抬到顶部。", "Based on the first-round feedback, I abandoned the full rewrite and switched to incremental enhancement. A combined task-area + table view kept the dense table while surfacing each role's most important tasks at the top.")}</p>
                      <ul className={styles.emphasisList}>
                      {localizedRoundTwoBenefits.map((item) => (
                        <li key={item.title}>
                          <strong>{item.title}</strong>：{item.body}
                        </li>
                      ))}
                      </ul>
                    </div>
                  </CaseStudyHeadingTwo>

                  <figure className={styles.figure}>
                    <div className={styles.singleMediaFigure}>
                      <Image
                        alt={resolveAlt(assets.round2OptionC)}
                        className={styles.singleMediaFigureImage}
                        height={938}
                        sizes="(max-width: 680px) calc(100vw - 2.5rem), (max-width: 900px) calc(100vw - 3rem), 880px"
                        src={assets.round2OptionC.src}
                        unoptimized={assets.round2OptionC.unoptimized}
                        width={1664}
                      />
                    </div>
                    <figcaption className={styles.caption}>
                      {display("Option C：待办区 + 表格的融合视图", "Option C: a blended task area + table view")}
                    </figcaption>
                  </figure>
                </div>

                <div className={styles.sectionCluster}>
                  <CaseStudyHeadingTwo
                    accentColor="var(--portfolio-color-accent-brand)"
                    className={joinClassNames(styles.anchoredHeader, styles.caseSubheading)}
                    id="case-polish"
                    title={display("设计打磨", "Design Polish")}
                  >
                    <div className={styles.richText}>
                      <p>{display("第二轮方案与团队同步时非常顺利地通过了内部评审。在这个基础上，我继续对页面的视觉层级、字段展示与操作项进行精细化打磨。", "The second-round solution passed internal review smoothly when shared with the team. From there, I kept refining the page hierarchy, field presentation, and actions.")}</p>
                    </div>
                  </CaseStudyHeadingTwo>

                  <figure className={styles.figure}>
                    <div className={styles.singleMediaFigure}>
                      <Image
                        alt={resolveAlt(assets.round2FinalVisual)}
                        className={styles.singleMediaFigureImage}
                        height={938}
                        sizes="(max-width: 680px) calc(100vw - 2.5rem), (max-width: 900px) calc(100vw - 3rem), 880px"
                        src={assets.round2FinalVisual.src}
                        unoptimized={assets.round2FinalVisual.unoptimized}
                        width={1664}
                      />
                    </div>
                    <figcaption className={styles.caption}>
                      {display("最终版视觉稿", "Final visual draft")}
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={joinClassNames(styles.fullBleedSection, styles.sectionSurface)}>
          <div className={joinClassNames(styles.sectionContent, styles.sectionContentTightBottom, styles.sectionContentDetail)}>
            <div className={styles.sectionFlow}>
              <CaseStudyHeadingOne
                className={styles.anchoredHeader}
                id="case-detail"
                title={display("细节展开", "Details")}
              >
                <div className={styles.richText}>
                  <p>Design is all about detail.</p>
                </div>
              </CaseStudyHeadingOne>

              <div className={styles.sectionCluster}>
                  <CaseStudyHeadingTwo
                    accentColor="var(--portfolio-color-accent-brand)"
                    className={joinClassNames(styles.anchoredHeader, styles.caseSubheading)}
                    id="case-assignment-logic"
                  title={display("代办区展示逻辑", "Task area logic")}
                  >
                  <div className={styles.richText}>
                    <p>
                      {display(
                        "基于用户角色的注意力管理：不同权限的角色只需要关注自己要处理的任务，从而减少决策成本，提高操作效率。",
                        "Role-based attention management: each permission level only needs to focus on the tasks it must handle, reducing decision cost and improving efficiency.",
                      )}
                    </p>
                  </div>
                </CaseStudyHeadingTwo>

                <section className={styles.roleScrollerSection}>
                  <div className={styles.roleScrollerFrame}>
                    <Image
                      alt=""
                      className={styles.roleScrollerBackground}
                      fill
                      sizes="(max-width: 900px) calc(100vw - 2rem), 832px"
                      src={assets.detailsAssignmentsBackground.src}
                      unoptimized={assets.detailsAssignmentsBackground.unoptimized}
                    />

                    <div className={styles.roleScroller}>
                      {localizedAssignmentCards.map((item) => (
                        <article className={styles.roleCard} key={item.description}>
                          <p className={styles.roleCardTitle}>{item.description}</p>
                          <div className={styles.roleCardMedia}>
                            <Image
                              alt={resolveAlt(item.asset)}
                              className={styles.roleCardImage}
                              fill
                              sizes="(max-width: 900px) calc(100vw - 6rem), 736px"
                              src={item.asset.src}
                              unoptimized={item.asset.unoptimized}
                            />
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </section>
              </div>

              <div className={styles.sectionCluster}>
                  <CaseStudyHeadingTwo
                    accentColor="var(--portfolio-color-accent-brand)"
                    className={joinClassNames(styles.anchoredHeader, styles.caseSubheading)}
                    id="case-workflow"
                  title={display("代办区与表格的联动", "Workflow logic")}
                  >
                  <div className={styles.richText}>
                    <p>
                      {display(
                        "支持动态布局：代办区的版本图纸被下发后，会自动从代办区流入下方表格，并展示在表格顶部，整体逻辑更接近 transfer 组件的心智模型。",
                        "Supports dynamic layout: once a version drawing is released, it flows from the task area into the table below and appears at the top of the table, which more closely matches the mental model of a transfer component.",
                      )}
                    </p>
                  </div>
                </CaseStudyHeadingTwo>

                <figure className={styles.figure}>
                  <div className={styles.workflowDemoFrame}>
                    <Image
                      alt=""
                      className={styles.workflowDemoBackground}
                      fill
                      sizes="(max-width: 900px) calc(100vw - 2rem), 832px"
                      src={assets.detailsAssignmentsBackground.src}
                      unoptimized={assets.detailsAssignmentsBackground.unoptimized}
                    />
                    <div className={styles.workflowDemoVideoWrap}>
                      <video
                        aria-label={resolveAssetAlt(assets.workflowDemo, language)}
                        autoPlay
                        className={styles.workflowDemoVideo}
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        src={assets.workflowDemo.src}
                      />
                    </div>
                  </div>
                  <figcaption className={styles.caption}>
                    {display("图纸下发流程联动示意", "Drawing release workflow demo")}
                  </figcaption>
                </figure>
              </div>

              <div className={styles.sectionCluster}>
                  <CaseStudyHeadingTwo
                    accentColor="var(--portfolio-color-accent-brand)"
                    className={joinClassNames(styles.anchoredHeader, styles.caseSubheading)}
                    id="case-responsive"
                  title={display("响应式设计", "Responsive design")}
                  >
                  <div className={styles.richText}>
                    <p>
                      {display(
                        "为了营造更流畅的使用体验，我定义了代办区在不同屏幕宽度下的展示规则。",
                        "To create a smoother experience, I defined how the task area should behave at different screen widths.",
                      )}
                    </p>
                    <div className={styles.responsiveRulesBlock}>
                      <p className={styles.responsiveRulesLabel}>
                        {localizedResponsiveRules.intro}
                      </p>
                      <ul className={styles.responsiveRulesList}>
                        <li>
                          {localizedResponsiveRules.lead}
                          <ul className={styles.responsiveRulesSublist}>
                            {localizedResponsiveRules.ranges.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </li>
                        <li>{localizedResponsiveRules.cardSize}</li>
                      </ul>
                    </div>
                  </div>
                </CaseStudyHeadingTwo>

                <figure className={styles.figure}>
                  <div className={styles.responsiveDemoFrame}>
                    <Image
                      alt=""
                      className={styles.responsiveDemoBackground}
                      fill
                      sizes="(max-width: 900px) calc(100vw - 2rem), 832px"
                      src={assets.detailsResponsiveBackground.src}
                      unoptimized={assets.detailsResponsiveBackground.unoptimized}
                    />
                    <div className={styles.responsiveDemoVideoWrap}>
                      <video
                        aria-label={resolveAssetAlt(assets.responsiveDemo, language)}
                        autoPlay
                        className={styles.responsiveDemoVideo}
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        src={assets.responsiveDemo.src}
                      />
                    </div>
                  </div>
                  <figcaption className={styles.caption}>
                    {display("待办区响应式展示示意", "Responsive task area demo")}
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        <section className={joinClassNames(styles.fullBleedSection, styles.canvasSurface)}>
          <div className={styles.sectionContent}>
            <div className={styles.footerStack}>
              <div className={styles.sectionFlow}>
                <CaseStudyHeadingOne
                  className={styles.anchoredHeader}
                  id="case-mobile"
                  title={display("移动端设计", "Mobile design")}
                >
                  <div className={styles.richText}>
                    <p>
                      {display(
                        "与 Web 端不同，移动端图纸台账系统几乎是从 0 到 1 搭建的。这个项目的另一个目标，是补齐移动端能力，实现双端对齐。",
                        "Unlike the web version, the mobile drawing register system was built almost entirely from scratch. Another goal of the project was to close the mobile feature gap and align both platforms.",
                      )}
                    </p>
                  </div>
                </CaseStudyHeadingOne>

                <div className={styles.sectionCluster}>
                  <CaseStudyHeadingTwo
                    accentColor="var(--portfolio-color-accent-brand)"
                    className={joinClassNames(styles.anchoredHeader, styles.caseSubheading)}
                    id="case-mobile-revamp"
                  title={display("视觉化改版", "Visual revamp")}
                >
                    <div className={styles.richText}>
                      <p>
                        {display(
                          "在前期沟通里，PM 提出借这次补齐产品能力的机会，把图纸模块整体从“毛坯房”升级到“精装修”，提升视觉品质感。",
                          "In early discussions, the PM suggested using this opportunity to upgrade the drawing module from a 'rough shell' to a more polished experience and improve its visual quality.",
                        )}
                      </p>
                    </div>
                  </CaseStudyHeadingTwo>

                  <figure className={styles.figure}>
                    <div className={styles.mobileCompareFigure}>
                      <Image
                        alt={resolveAlt(assets.mobileBeforeAfter)}
                        className={styles.mobileCompareFigureImage}
                        height={938}
                        sizes="(max-width: 680px) calc(100vw - 2.5rem), (max-width: 900px) calc(100vw - 3rem), 880px"
                        src={assets.mobileBeforeAfter.src}
                        unoptimized={assets.mobileBeforeAfter.unoptimized}
                        width={1664}
                      />
                    </div>
                    <figcaption className={styles.caption}>{display("原版（左）VS 新版（右）", "Original (left) vs. redesigned (right)")}</figcaption>
                  </figure>
                </div>

                <div className={styles.sectionCluster}>
                  <CaseStudyHeadingThree
                    className={styles.caseSubheading}
                    descriptions={[
                      display("根据图纸工具类的业务属性，快速排除商品内容型入口，从线性图标和轻拟物风格开始做探索。", "Given the product category, I quickly ruled out shopping-style entry points and started exploring linear icons and soft skeuomorphic directions."),
                      display("探索轻拟物图标入口时，恰逢 OpenAI 刚推出了 GTP4o 的模型，吉普力风格刷屏社交网络。结合 4o 的生图能力，参考夸克入口的现代轻拟物图标设计，我快速完成了轻拟物风格入口的视觉探索。", "While exploring soft skeuomorphic entries, OpenAI had just released GPT-4o and Ghibli-style visuals were everywhere on social media. Combining 4o's image generation with the modern skeuomorphic style used in Quark, I quickly completed the visual exploration for that direction."),
                    ]}
                    hideLabel
                    label={display("探索", "Exploration")}
                  />

                  <CaseStudyHeadingThree
                    className={joinClassNames(styles.anchoredHeader, styles.caseSubheading)}
                    id="case-mobile-ai"
                    label={display("AI 辅助设计", "AI-assisted design")}
                    labelAs="h4"
                  >
                    <div className={styles.richText}>
                      <p>{display("概念设计前，我先收集了主流 App 的功能入口设计，发现主要有 3 类典型表达：", "Before concept design, I collected common entry patterns from mainstream apps and found three typical directions:")}</p>
                      <ul>
                        <li>{display("简约现代的线性图标", "Minimal modern line icons")}</li>
                        <li>{display("现代轻拟物风格图标", "Modern soft skeuomorphic icons")}</li>
                        <li>{display("以产品图或实物图为核心识别元素的商品内容型入口", "Product-content entries centered on product or real-world imagery")}</li>
                      </ul>
                      <p>{display("结合图纸业务属性，我快速排除了商品内容型入口，转而从线性图标和轻拟物风格开始探索。", "Given the drawing-oriented nature of the product, I ruled out product-content entries and moved on to line icons and soft skeuomorphic directions.")}</p>
                    </div>
                  </CaseStudyHeadingThree>

                  <figure className={styles.figure}>
                    <div className={styles.singleMediaFigure}>
                      <Image
                        alt={resolveAlt(assets.mobileReference)}
                        className={styles.singleMediaFigureImage}
                        height={938}
                        sizes="(max-width: 680px) calc(100vw - 2.5rem), (max-width: 900px) calc(100vw - 3rem), 880px"
                        src={assets.mobileReference.src}
                        unoptimized={assets.mobileReference.unoptimized}
                        width={1664}
                      />
                    </div>
                    <figcaption className={styles.caption}>
                      {display("产品收集参考", "Reference collection")}
                    </figcaption>
                  </figure>

                  <figure className={styles.figure}>
                    <div className={styles.explorationFigure}>
                      <Image
                        alt={resolveAlt(assets.mobileExploration)}
                        className={styles.explorationFigureImage}
                        height={840}
                        sizes="(max-width: 680px) calc(100vw - 2.5rem), (max-width: 900px) calc(100vw - 3rem), 880px"
                        src={assets.mobileExploration.src}
                        unoptimized={assets.mobileExploration.unoptimized}
                        width={1664}
                      />
                    </div>
                    <figcaption className={styles.caption}>{display("初版方案探索", "Initial concept exploration")}</figcaption>
                  </figure>
                </div>

                <div className={styles.sectionCluster}>
                  <CaseStudyHeadingThree
                    className={joinClassNames(styles.anchoredHeader, styles.caseSubheading)}
                    id="case-mobile-iteration"
                    label={display("同步、反馈与迭代", "Sync, feedback, and iteration")}
                    labelAs="h4"
                  >
                    <div className={styles.richText}>
                      <p>{display("第一版视觉上线后，有用户反馈选中效果在室外强光环境下不够清晰，因此我继续迭代了第二版视觉方案。", "After the first version went live, some users reported that the selected state was not clear enough in bright outdoor light, so I iterated on a second version.")}</p>
                    </div>
                  </CaseStudyHeadingThree>

                  <div className={styles.iterationFigure}>
                    <Image
                      alt={resolveAlt(assets.mobileIteration)}
                      className={styles.iterationFigureImage}
                      height={936}
                      sizes="(max-width: 680px) calc(100vw - 2.5rem), (max-width: 900px) calc(100vw - 3rem), 880px"
                      src={assets.mobileIteration.src}
                      unoptimized={assets.mobileIteration.unoptimized}
                      width={1664}
                    />
                  </div>
                  <p className={styles.caption}>{display("视觉设计迭代", "Visual design iteration")}</p>
                </div>

                <div className={styles.sectionCluster}>
                  <CaseStudyHeadingThree
                    className={joinClassNames(styles.anchoredHeader, styles.caseSubheading)}
                    id="case-mobile-interaction"
                    label={display("上滑交互", "Swipe-up interaction")}
                    labelAs="h4"
                  >
                    <div className={styles.richText}>
                      <p>
                        {display(
                          "默认情况下，视觉化 Tab 会占用较高屏效，因此我设计了顶部 Tab 与代办区的展开收起交互：列表上滑时收起，向下滑动时再次展开。",
                          "By default, the visual tab takes up a lot of screen space, so I designed a collapse/expand interaction between the top tab and the task area: it collapses when the list scrolls upward and expands again when scrolling down.",
                        )}
                      </p>
                    </div>
                  </CaseStudyHeadingThree>

                  <figure className={styles.figure}>
                    <div className={styles.singleMediaFigure}>
                      <video
                        aria-label={resolveAssetAlt(assets.mobileTabInteraction, language)}
                        autoPlay
                        className={styles.singleMediaFigureVideo}
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        src={assets.mobileTabInteraction.src}
                      />
                    </div>
                    <figcaption className={styles.caption}>
                      {display("Tab Bar 展开收起交互", "Tab bar expand/collapse interaction")}
                    </figcaption>
                  </figure>
                </div>

                <div className={styles.sectionCluster}>
                  <CaseStudyHeadingTwo
                    accentColor="var(--portfolio-color-accent-brand)"
                    className={joinClassNames(styles.anchoredHeader, styles.caseSubheading)}
                    id="case-mobile-landed"
                    title={display("落地效果", "Final delivery")}
                  >
                    <div className={styles.richText}>
                      <p>{display("图纸模块 App 端核心页面如下。", "The core pages of the drawing module app are shown below.")}</p>
                    </div>
                  </CaseStudyHeadingTwo>

                  <figure className={styles.figure}>
                    <div className={styles.mobileLandingFigure}>
                      <Image
                        alt={resolveAlt(assets.mobileLandedPages)}
                        className={styles.mobileLandingFigureImage}
                        height={938}
                        sizes="(max-width: 680px) calc(100vw - 2.5rem), (max-width: 900px) calc(100vw - 3rem), 880px"
                        src={assets.mobileLandedPages.src}
                        unoptimized={assets.mobileLandedPages.unoptimized}
                        width={1664}
                      />
                    </div>
                    <figcaption className={styles.caption}>{display("全部核心页面", "All core pages")}</figcaption>
                  </figure>
                </div>
              </div>

              <CaseStudyHeadingOne
                className={joinClassNames(styles.anchoredHeader, styles.reflectionHeader)}
                id="case-reflection"
                title={display("复盘与反思", "Reflection")}
              >
                <div className={styles.richText}>
                  <p>
                  {display(
                    "好的 B 端设计不一定是颠覆性的重构。这个项目让我更确定，真正有效的设计往往是在不打破原有心智模型的前提下，用更克制、更聪明的方式解决复杂痛点，并同时为研发团队节省资源。",
                    "Good B2B design is not necessarily a disruptive rewrite. This project made me even more certain that effective design often solves complex pain points in a more restrained and intelligent way without breaking existing mental models, while also saving engineering resources.",
                  )}
                  </p>
                </div>
              </CaseStudyHeadingOne>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}

import Image from "next/image";

import {
  CaseStudyHeadingOne,
  CaseStudyHeadingTwo,
} from "../case-study/CaseStudyHeading";
import CaseStudyToc from "../case-study/CaseStudyToc";
import { drawingLedgerAssets as assets } from "../../data/work-details/drawing-ledger-2-0";
import styles from "../../styles/drawing-ledger-case-study.module.css";

const lifecycleStates = [
  "上传完成",
  "解析中",
  "待确认",
  "待下发",
  "可使用",
  "已过期",
  "已废弃",
];

const taskAnalysisRows = [
  {
    scenario: "上传图纸后",
    tasks: ["查看刚上传的图纸", "查看历史上传记录", "了解图纸审批情况"],
    user: "上传人",
  },
  {
    scenario: "被推送确认待办",
    tasks: ["对待确认的图纸进行查看和确认操作", "查看历史确认记录"],
    user: "确认人",
  },
  {
    scenario: "被推送下发待办",
    tasks: ["对待下发的图纸进行查看和下发操作", "查看历史下发记录"],
    user: "下发人",
  },
  {
    scenario: "随时查看操作",
    tasks: ["承担以上所有任务"],
    user: "多权限管理员",
  },
];

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

const responsiveRules = [
  "设 X = Viewport 宽度 - 侧边栏宽度 290px（64 + 226）。",
  "当 X 在 [1024px, 1280px) 区间时，呈现 3 列。",
  "当 X 在 [1280px, 1920px] 区间时，呈现 4 列。",
  "当 X 在 (1920px, 2048px] 区间时，呈现 5 列。",
  "当 X 宽度大于 2048px 时，以每张卡片 360px 计算，横向排列并自动换行。",
  "卡片最小宽度 300px，高度固定 65px。",
];

const mobileExplorationAssets = [
  assets.mobileExplore1,
  assets.mobileExplore2,
  assets.mobileExplore3,
  assets.mobileExplore4,
];

const mobileIterationAssets = [
  {
    asset: assets.mobileIteration1,
    caption: "上线第一版",
  },
  {
    asset: assets.mobileIteration2,
    caption: "上线第一版",
  },
  {
    asset: assets.mobileIteration3,
    caption: "上线第二版",
  },
  {
    asset: assets.mobileIteration4,
    caption: "上线第二版",
  },
];

const mobileLandingAssets = [
  {
    // 用稳定 id 作为 React key，避免展示文案重复时触发重复 key 报错。
    id: "project-drawings",
    asset: assets.mobileLanded1,
    label: "项目图纸",
  },
  {
    id: "ledger-home",
    asset: assets.mobileLanded2,
    label: "台账首页",
  },
  {
    id: "ledger-detail-1",
    asset: assets.mobileLanded3,
    label: "台账详情",
  },
  {
    id: "ledger-detail-2",
    asset: assets.mobileLanded4,
    label: "台账详情",
  },
];

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
    label: "Round 1",
  },
  {
    hierarchy: "secondary",
    id: "case-round-two",
    label: "Round 2",
  },
  {
    hierarchy: "secondary",
    id: "case-polish",
    label: "Design Polish",
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
            alt=""
            className={styles.mediaBackground}
            fill
            priority={priority}
            sizes="100vw"
            src={backgroundAsset.src}
            unoptimized={backgroundAsset.unoptimized}
          />
        ) : null}

        {asset?.src ? (
          <div className={joinClassNames(styles.mediaInner, imageClassName)}>
            <Image
              alt={asset.alt}
              className={
                imageFit === "contain" ? styles.mediaImageContain : styles.mediaImageCover
              }
              fill
              priority={priority}
              sizes="(max-width: 900px) calc(100vw - 2rem), 832px"
              src={asset.src}
              unoptimized={asset.unoptimized}
            />
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

function OptionSummary({ cons, pros, title }) {
  return (
    <article className={styles.summaryCard}>
      <h4 className={styles.summaryTitle}>{title}</h4>
      <div className={styles.summaryGroup}>
        <p className={styles.summaryLabel}>Pros</p>
        <ul className={styles.summaryList}>
          {pros.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className={styles.summaryGroup}>
        <p className={styles.summaryLabel}>Cons</p>
        <ul className={styles.summaryList}>
          {cons.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function PendingAssetNotice({ body, title }) {
  return (
    <div className={styles.pendingAssetNotice}>
      <p className={styles.pendingAssetEyebrow}>待接入资源</p>
      <p className={styles.pendingAssetTitle}>{title}</p>
      <p className={styles.pendingAssetBody}>{body}</p>
    </div>
  );
}

export default function DrawingLedgerCaseStudy({
  headingAccentColor = "var(--portfolio-color-accent-brand)",
}) {
  /** @type {import("react").CSSProperties & Record<string, string>} */
  const pageThemeStyles = {
    "--drawing-ledger-heading-accent": headingAccentColor,
  };
  const tocTheme = {
    accentColor: "var(--drawing-ledger-heading-accent)",
    backHref: "/work",
    backLabel: "返回",
    desktopShiftX: "30rem",
    desktopStartOffset: "var(--portfolio-space-section-y)",
    desktopStickyTop: "2rem",
    mutedColor: "rgba(122, 126, 128, 0.92)",
    titleColor: "var(--portfolio-semantic-title-color)",
  };

  return (
    <article className={styles.caseStudy} style={pageThemeStyles}>
      <section className={styles.heroSection} id="case-hero">
        <div className={styles.heroBackdrop}>
          <Image
            alt=""
            className={styles.heroBackdropImage}
            fill
            priority
            sizes="100vw"
            src={assets.coverBackground.src}
            unoptimized={assets.coverBackground.unoptimized}
          />
        </div>

        <div className={styles.heroInner}>
          <header className={styles.heroHeader}>
            <h1 className={styles.heroTitle}>图纸台账 2.0</h1>
            <p className={styles.heroSubtitle}>从“信息坟墓”到“主动式协作中心”的设计重构</p>
          </header>

          <div className={styles.heroMedia}>
            <Image
              alt={assets.coverHero.alt}
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
        <CaseStudyToc items={tocItems} {...tocTheme} />

        <section className={joinClassNames(styles.fullBleedSection, styles.sectionSurface)}>
          <div className={styles.sectionContent}>
            <div className={styles.blockStack}>
              <div className={styles.blockStack}>
                <div className={styles.sectionCluster}>
                  <CaseStudyHeadingOne
                    className={styles.anchoredHeader}
                    id="case-overview"
                    title="业务背景"
                  >
                    <p>
                      图纸台账是图纸管理功能模块中，记录图纸从上传到废弃整个生命周期状态流转的空间。
                      台账系统主要涉及上传人、确认人、下发人及多权限管理员 4 类用户角色。
                    </p>
                    <p>
                      图纸台账 1.0 版本在我加入团队前已经完成。因为当时的核心目标是快速搭建核心功能并上线，
                      所以没有针对不同角色做差异化设计，导致理解成本高、操作路径冗长，严重影响了图纸流转效率。
                    </p>
                  </CaseStudyHeadingOne>

                  <section className={styles.chartCard}>
                    <h3 className={styles.chartTitle}>图纸生命周期状态流转关系图</h3>
                    <div className={styles.lifecycleFlow} aria-label="图纸状态流转图">
                      {lifecycleStates.map((state, index) => (
                        <div className={styles.lifecycleItem} key={state}>
                          <span className={styles.lifecycleChip}>{state}</span>
                          {index < lifecycleStates.length - 1 ? (
                            <span aria-hidden="true" className={styles.lifecycleConnector} />
                          ) : null}
                        </div>
                      ))}
                    </div>
                    <p className={styles.chartLegend}>图纸台账中涉及的状态</p>
                  </section>
                </div>

                <div className={styles.sectionCluster}>
                  <CaseStudyHeadingOne
                    className={styles.anchoredHeader}
                    id="case-problem"
                    title="问题定位"
                  >
                    <p>旧版台账是一个死的数据容器，主要存在以下 3 大问题：</p>
                    <ul>
                      <li>所有用户看到相同的数据，所以也会看到与自己不相关的专业、版本的图纸，给自己带来视觉干扰</li>
                      <li>面对大量的图纸数据，各角色在查找关注的数据时，仿佛在一片数据海中捞针，效率低下</li>
                    </ul>
                  </CaseStudyHeadingOne>

                  <MediaFigure
                    asset={assets.problemLedgerV1}
                    backgroundAsset={assets.problemBackground}
                    caption="旧版图纸台账页"
                  />
                </div>

                <CaseStudyHeadingOne
                  className={styles.anchoredHeader}
                  id="case-goal"
                  title="设计目标"
                >
                  <p>此次设计的核心目标，是把台账系统从「以数据为中心」转变为「以角色和任务为中心」。</p>
                </CaseStudyHeadingOne>
              </div>

              <div className={styles.sectionFlow}>
                <CaseStudyHeadingOne
                  className={styles.anchoredHeader}
                  id="case-practice"
                  title="设计实践"
                >
                  <p>
                    在早期明确了图纸台账 2.0 改版要围绕细分用户角色和权限来重构体验之后，
                    我在项目启动前就开始提前探索设计方案。
                  </p>
                </CaseStudyHeadingOne>

                <div className={styles.sectionCluster}>
                  <CaseStudyHeadingTwo
                    accentColor="var(--drawing-ledger-heading-accent)"
                    className={styles.anchoredHeader}
                    id="case-analysis"
                    title="设计分析"
                  >
                    <p>
                      根据 JTBD 理论，用户不是在购买产品本身，而是在“雇佣”产品帮他们完成某项任务。
                      那图纸台账模块本质上是在帮助哪些用户完成哪些任务？
                    </p>
                  </CaseStudyHeadingTwo>

                  <figure className={styles.figure}>
                    <div className={joinClassNames(styles.mediaFrame, styles.mediaFrameWarm, styles.taskPanel)}>
                      <p className={styles.taskPanelTitle}>User Task Analysis</p>
                      <div className={styles.taskTableWrap}>
                        <table className={styles.taskTable}>
                          <thead>
                            <tr>
                              <th>核心用户</th>
                              <th>主要场景</th>
                              <th>用户任务</th>
                            </tr>
                          </thead>
                          <tbody>
                            {taskAnalysisRows.map((row) => (
                              <tr key={row.user}>
                                <td>{row.user}</td>
                                <td>{row.scenario}</td>
                                <td>
                                  <ul className={styles.compactList}>
                                    {row.tasks.map((task) => (
                                      <li key={task}>{task}</li>
                                    ))}
                                  </ul>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <figcaption className={styles.caption}>Fig2. 用户任务梳理</figcaption>
                  </figure>
                </div>

                <div className={styles.sectionCluster}>
                  <CaseStudyHeadingTwo
                    accentColor="var(--drawing-ledger-heading-accent)"
                    className={styles.anchoredHeader}
                    id="case-round-one"
                    title="Round 1: 激进重构与现实阻力"
                  >
                    <p>
                      明确了用户想完成的功能任务后，我最开始尝试引入“任务管理”范式，
                      想把问题拆成「未处理 / 已处理」两种状态来重塑台账体验。
                    </p>
                    <ul>
                      <li>未处理的任务：承接用户当前最关心的事项</li>
                      <li>已处理的任务：承接用户次一级关注的历史内容</li>
                    </ul>
                    <p>下面以“上传人”角色为例，展示第一轮探索。</p>
                  </CaseStudyHeadingTwo>

                  <MediaFigure
                    asset={assets.round1OptionA}
                    backgroundAsset={assets.round1OptionABackground}
                    caption="Option A：待处理和未处理模块上下布局，且支持展开收起"
                  />

                  <OptionSummary cons={optionACons} pros={optionAPros} title="Option A" />

                  <MediaFigure
                    asset={assets.round1OptionB}
                    backgroundAsset={assets.round1OptionBBackground}
                    caption="Option B：待处理和已处理模块左右布局，用 Tab 组件区分"
                  />

                  <OptionSummary cons={optionBCons} pros={optionBPros} title="Option B" />

                  <MediaFigure
                    asset={assets.round1Overview}
                    backgroundAsset={assets.round1OverviewBackground}
                    caption="探索方案概览 · Round 1"
                  />

                  <article className={styles.feedbackCard}>
                    <h3 className={styles.feedbackTitle}>内部评审反馈</h3>
                    <div className={styles.richText}>
                      <p>这套方案在设计评审中遇到了阻力，核心问题集中在用户接受度与研发可行性两方面。</p>
                      <p className={styles.feedbackLabel}>用户层面</p>
                      <ul>
                        <li>处理海量工程图纸时，用户更看重高密度数据对比与表格式界面带来的全局掌控感</li>
                        <li>B 端用户对熟悉界面存在依赖，大幅改版会提高学习成本，削弱接受度</li>
                      </ul>
                      <p className={styles.feedbackLabel}>研发层面</p>
                      <ul>
                        <li>方案涉及较大范围的底层重构，研发成本高，落地推进难度较大</li>
                      </ul>
                    </div>
                  </article>
                </div>

                <div className={styles.sectionCluster}>
                  <CaseStudyHeadingTwo
                    accentColor="var(--drawing-ledger-heading-accent)"
                    className={styles.anchoredHeader}
                    id="case-round-two"
                    title="Round 2: 务实的敏捷设计"
                  >
                    <p>
                      基于第一轮反馈，我放弃“全盘推翻”，改成“渐进式增强”。
                      通过“待办区 + 表格”的融合视图，在保留高密度表格的同时，把不同角色当前最重要的任务抬到顶部。
                    </p>
                    <ul className={styles.emphasisList}>
                      {roundTwoBenefits.map((item) => (
                        <li key={item.title}>
                          <strong>{item.title}</strong>：{item.body}
                        </li>
                      ))}
                    </ul>
                  </CaseStudyHeadingTwo>

                  <MediaFigure
                    asset={assets.round2OptionC}
                    backgroundAsset={assets.round2OptionCBackground}
                    caption="Option C：待办区 + 表格的融合视图"
                  />
                </div>

                <div className={styles.sectionCluster}>
                  <CaseStudyHeadingTwo
                    accentColor="var(--drawing-ledger-heading-accent)"
                    className={styles.anchoredHeader}
                    id="case-polish"
                    title="Design Polish"
                  >
                    <p>
                      第二轮方案与团队同步时非常顺利地通过了内部评审。
                      在这个基础上，我继续对页面的视觉层级、字段展示与操作项进行精细化打磨。
                    </p>
                  </CaseStudyHeadingTwo>

                  <MediaFigure
                    asset={assets.round2FinalVisual}
                    backgroundAsset={assets.round2FinalBackground}
                    caption="最终版视觉稿"
                    frameTone="surface"
                    imageClassName={styles.shadowedInnerMedia}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={joinClassNames(styles.fullBleedSection, styles.sectionSurface)}>
          <div className={styles.sectionContent}>
            <div className={styles.sectionFlow}>
              <CaseStudyHeadingOne
                className={styles.anchoredHeader}
                id="case-detail"
                title="细节展开"
              >
                <p>Design is all about detail</p>
              </CaseStudyHeadingOne>

              <div className={styles.sectionCluster}>
                <CaseStudyHeadingTwo
                  accentColor="var(--drawing-ledger-heading-accent)"
                  className={styles.anchoredHeader}
                  id="case-assignment-logic"
                  title="代办区展示逻辑"
                >
                  <p>
                    <strong>基于用户角色的注意力管理</strong>：不同权限的角色只需要关注自己要处理的任务，
                    从而减少决策成本，提高操作效率。
                  </p>
                </CaseStudyHeadingTwo>

                <section className={styles.roleScrollerSection}>
                  <div className={styles.roleScrollerFrame}>
                    <Image
                      alt=""
                      className={styles.roleScrollerBackground}
                      fill
                      sizes="100vw"
                      src={assets.detailsAssignmentsBackground.src}
                      unoptimized={assets.detailsAssignmentsBackground.unoptimized}
                    />

                    <div className={styles.roleScroller}>
                      {assignmentCards.map((item) => (
                        <article className={styles.roleCard} key={item.description}>
                          <p className={styles.roleCardTitle}>{item.description}</p>
                          <div className={styles.roleCardMedia}>
                            <Image
                              alt={item.asset.alt}
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
                  accentColor="var(--drawing-ledger-heading-accent)"
                  className={styles.anchoredHeader}
                  id="case-workflow"
                  title="代办区与表格的联动"
                >
                  <p>
                    <strong>支持动态布局</strong>：代办区的版本图纸被下发后，会自动从代办区流入下方表格，
                    并展示在表格顶部，整体逻辑更接近 transfer 组件的心智模型。
                  </p>
                </CaseStudyHeadingTwo>

                <MediaFigure
                  asset={assets.workflowDemo}
                  backgroundAsset={assets.detailsAssignmentsBackground}
                  caption="图纸下发流程联动示意"
                  frameTone="surface"
                  placeholder={
                    <PendingAssetNotice
                      body="这里已经预留好正式容器。后续你把流程演示图上传到 Supabase 后，只需要补资源映射，不用动布局。"
                      title="流程演示图待接入"
                    />
                  }
                />
              </div>

              <div className={styles.sectionCluster}>
                <CaseStudyHeadingTwo
                  accentColor="var(--drawing-ledger-heading-accent)"
                  className={styles.anchoredHeader}
                  id="case-responsive"
                  title="响应式设计"
                >
                  <p>为了营造更流畅的使用体验，我定义了代办区在不同屏幕宽度下的展示规则。</p>
                  <ul>
                    {responsiveRules.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </CaseStudyHeadingTwo>

                <MediaFigure
                  asset={assets.responsiveDemo}
                  backgroundAsset={assets.detailsResponsiveBackground}
                  caption="待办区响应式展示示意"
                  frameTone="surface"
                  placeholder={
                    <PendingAssetNotice
                      body="目前先保留外层媒体结构和说明文案。等你把响应式演示图上传后，这里会自动长成完整视觉。"
                      title="响应式演示图待接入"
                    />
                  }
                />
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
                  title="移动端设计"
                >
                  <p>
                    与 Web 端不同，移动端图纸台账系统几乎是从 0 到 1 搭建的。
                    这个项目的另一个目标，是补齐移动端能力，实现双端对齐。
                  </p>
                </CaseStudyHeadingOne>

                <div className={styles.sectionCluster}>
                  <CaseStudyHeadingTwo
                    accentColor="var(--drawing-ledger-heading-accent)"
                    className={styles.anchoredHeader}
                    id="case-mobile-revamp"
                    title="视觉化改版 Revamping mobile app"
                  >
                    <p>
                      在前期沟通里，PM 提出借这次补齐产品能力的机会，
                      把图纸模块整体从“毛坯房”升级到“精装修”，提升视觉品质感。
                    </p>
                  </CaseStudyHeadingTwo>

                  <figure className={styles.figure}>
                    <div className={joinClassNames(styles.mediaFrame, styles.mediaFrameWarm, styles.mobileCompareFrame)}>
                      <Image
                        alt=""
                        className={styles.mediaBackground}
                        fill
                        sizes="100vw"
                        src={assets.mobileComparisonBackground.src}
                        unoptimized={assets.mobileComparisonBackground.unoptimized}
                      />
                      <div className={styles.mobileComparePhoneBefore}>
                        <Image
                          alt={assets.mobileBefore.alt}
                          className={styles.phoneImage}
                          fill
                          sizes="245px"
                          src={assets.mobileBefore.src}
                          unoptimized={assets.mobileBefore.unoptimized}
                        />
                      </div>
                      <div className={styles.mobileComparePhoneAfter}>
                        <Image
                          alt={assets.mobileAfter.alt}
                          className={styles.phoneImage}
                          fill
                          sizes="245px"
                          src={assets.mobileAfter.src}
                          unoptimized={assets.mobileAfter.unoptimized}
                        />
                      </div>
                      <p className={styles.beforeAfterLabelLeft}>Before</p>
                      <p className={styles.beforeAfterLabelRight}>After</p>
                    </div>
                    <figcaption className={styles.caption}>原版（左）VS 新版（右）</figcaption>
                  </figure>
                </div>

                <div className={styles.sectionCluster}>
                  <CaseStudyHeadingTwo
                    accentColor="var(--drawing-ledger-heading-accent)"
                    className={styles.anchoredHeader}
                    title="Exploration"
                  >
                    <p>图纸模块包含项目图纸、图纸台账、批注评论和设计变更 4 个子模块，核心任务是明确每个模块的视觉入口方案。</p>
                  </CaseStudyHeadingTwo>

                  <CaseStudyHeadingTwo
                    accentColor="var(--drawing-ledger-heading-accent)"
                    className={styles.anchoredHeader}
                    id="case-mobile-ai"
                    title="AI 辅助设计"
                  >
                    <p>概念设计前，我先收集了主流 App 的功能入口设计，发现主要有 3 类典型表达：</p>
                    <ul>
                      <li>简约现代的线性图标</li>
                      <li>现代轻拟物风格图标</li>
                      <li>以产品图或实物图为核心识别元素的商品内容型入口</li>
                    </ul>
                    <p>结合图纸业务属性，我快速排除了商品内容型入口，转而从线性图标和轻拟物风格开始探索。</p>
                  </CaseStudyHeadingTwo>

                  <MediaFigure
                    asset={assets.mobileReference}
                    caption="产品收集参考"
                    className={styles.shortFigure}
                    frameTone="warm"
                    imageClassName={styles.shortInnerMedia}
                  />

                  <div className={styles.explorationGridFrame}>
                    <div className={styles.explorationGrid}>
                      {mobileExplorationAssets.map((asset) => (
                        <div className={styles.explorationCell} key={asset.alt}>
                          <Image
                            alt={asset.alt}
                            className={styles.mediaImageCover}
                            fill
                            sizes="(max-width: 900px) calc(50vw - 2rem), 240px"
                            src={asset.src}
                            unoptimized={asset.unoptimized}
                          />
                        </div>
                      ))}
                    </div>
                    <p className={styles.caption}>初版方案探索</p>
                  </div>
                </div>

                <div className={styles.sectionCluster}>
                  <CaseStudyHeadingTwo
                    accentColor="var(--drawing-ledger-heading-accent)"
                    className={styles.anchoredHeader}
                    id="case-mobile-iteration"
                    title="同步、反馈与迭代"
                  >
                    <p>
                      第一版视觉上线后，有用户反馈选中效果在室外强光环境下不够清晰，
                      因此我继续迭代了第二版视觉方案。
                    </p>
                  </CaseStudyHeadingTwo>

                  <div className={styles.iterationFrame}>
                    <div className={styles.iterationGrid}>
                      {mobileIterationAssets.map((item) => (
                        <article className={styles.iterationCard} key={`${item.caption}-${item.asset.alt}`}>
                          <div className={styles.iterationImageWrap}>
                            <Image
                              alt={item.asset.alt}
                              className={styles.mediaImageCover}
                              fill
                              sizes="(max-width: 900px) calc(50vw - 2rem), 240px"
                              src={item.asset.src}
                              unoptimized={item.asset.unoptimized}
                            />
                          </div>
                          <p className={styles.iterationCaption}>{item.caption}</p>
                        </article>
                      ))}
                    </div>
                    <p className={styles.caption}>视觉设计迭代</p>
                  </div>
                </div>

                <div className={styles.sectionCluster}>
                  <CaseStudyHeadingTwo
                    accentColor="var(--drawing-ledger-heading-accent)"
                    className={styles.anchoredHeader}
                    id="case-mobile-interaction"
                    title="上滑交互"
                  >
                    <p>
                      默认情况下，视觉化 Tab 会占用较高屏效，因此我设计了顶部 Tab 与代办区的展开收起交互：
                      列表上滑时收起，向下滑动时再次展开。
                    </p>
                  </CaseStudyHeadingTwo>

                  <MediaFigure
                    asset={assets.mobileTabInteraction}
                    backgroundAsset={assets.problemBackground}
                    caption="Tab Bar 展开收起交互"
                    placeholder={
                      <PendingAssetNotice
                        body="交互演示图后续可以直接上传到 Supabase，并接到这个已经预留好的手机展示位里。"
                        title="移动端交互演示待接入"
                      />
                    }
                  />
                </div>

                <div className={styles.sectionCluster}>
                  <CaseStudyHeadingTwo
                    accentColor="var(--drawing-ledger-heading-accent)"
                    className={styles.anchoredHeader}
                    id="case-mobile-landed"
                    title="落地效果"
                  >
                    <p>图纸模块 App 端核心页面如下。</p>
                  </CaseStudyHeadingTwo>

                  <div className={styles.mobileLandingFrame}>
                    <div className={styles.mobileLandingGrid}>
                      {mobileLandingAssets.map((item) => (
                        <article className={styles.mobileLandingCard} key={item.id}>
                          <div className={styles.mobileLandingPhone}>
                            <Image
                              alt={item.asset.alt}
                              className={styles.phoneImage}
                              fill
                              sizes="(max-width: 900px) calc(50vw - 2rem), 160px"
                              src={item.asset.src}
                              unoptimized={item.asset.unoptimized}
                            />
                          </div>
                          <p className={styles.mobileLandingLabel}>{item.label}</p>
                        </article>
                      ))}
                    </div>
                    <p className={styles.caption}>全部核心页面</p>
                  </div>
                </div>
              </div>

              <CaseStudyHeadingOne
                className={styles.anchoredHeader}
                id="case-reflection"
                title="复盘与反思"
              >
                <p>
                  好的 B 端设计不一定是颠覆性的重构。这个项目让我更确定，
                  真正有效的设计往往是在不打破原有心智模型的前提下，
                  用更克制、更聪明的方式解决复杂痛点，并同时为研发团队节省资源。
                </p>
              </CaseStudyHeadingOne>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}

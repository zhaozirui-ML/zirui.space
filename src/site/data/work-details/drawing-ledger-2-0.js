import { getStorageAssetUrl } from "../../lib/get-storage-asset-url";

// 这里先默认走本地静态图，方便当前开发和视觉对齐。
// 等这些资源正式上传到 Supabase 后，只需要把这个开关切成 true，
// 或者把这里改成更细粒度的逐张切换逻辑，页面组件本身不用重写。
const preferSupabaseAssets = true;

// 这几个资源目前还没在 Supabase 上就位，所以测试阶段继续回退到本地或占位。
// 这样可以先验证大部分链路，不会因为少数缺图直接把整页切坏。
const pendingSupabaseAssetPaths = new Set([
  "work/drawing-ledger-2-0/workflow-demo.png",
  "work/drawing-ledger-2-0/responsive-demo.png",
  "work/drawing-ledger-2-0/mobile-tab-interaction.png",
  "work/drawing-ledger-2-0/mobile-landed-1.png",
]);

const assetDefinitions = {
  coverBackground: {
    alt: "",
    localSrc: "/site/work/drawing-ledger-2-0/cover-background.png",
    storagePath: "work/drawing-ledger-2-0/cover-background.png",
  },
  coverHero: {
    alt: "图纸台账 2.0 封面主视觉",
    localSrc: "/site/work/drawing-ledger-2-0/cover-hero.png",
    storagePath: "work/drawing-ledger-2-0/cover-hero.png",
  },
  problemBackground: {
    alt: "",
    localSrc: "/site/work/drawing-ledger-2-0/problem-background.png",
    storagePath: "work/drawing-ledger-2-0/problem-background.png",
  },
  problemLedgerV1: {
    alt: "旧版图纸台账页截图",
    localSrc: "/site/work/drawing-ledger-2-0/problem-ledger-v1.png",
    storagePath: "work/drawing-ledger-2-0/problem-ledger-v1.png",
  },
  round1OptionABackground: {
    alt: "",
    localSrc: "/site/work/drawing-ledger-2-0/round1-option-a-background.png",
    storagePath: "work/drawing-ledger-2-0/round1-option-a-background.png",
  },
  round1OptionA: {
    alt: "Round 1 Option A 方案截图",
    localSrc: "/site/work/drawing-ledger-2-0/round1-option-a.png",
    storagePath: "work/drawing-ledger-2-0/round1-option-a.png",
  },
  round1OptionBBackground: {
    alt: "",
    localSrc: "/site/work/drawing-ledger-2-0/round1-option-b-background.png",
    storagePath: "work/drawing-ledger-2-0/round1-option-b-background.png",
  },
  round1OptionB: {
    alt: "Round 1 Option B 方案截图",
    localSrc: "/site/work/drawing-ledger-2-0/round1-option-b.png",
    storagePath: "work/drawing-ledger-2-0/round1-option-b.png",
  },
  round1OverviewBackground: {
    alt: "",
    localSrc: "/site/work/drawing-ledger-2-0/round1-overview-background.png",
    storagePath: "work/drawing-ledger-2-0/round1-overview-background.png",
  },
  round1Overview: {
    alt: "Round 1 探索方案总览",
    localSrc: "/site/work/drawing-ledger-2-0/round1-overview.png",
    storagePath: "work/drawing-ledger-2-0/round1-overview.png",
  },
  round2OptionCBackground: {
    alt: "",
    localSrc: "/site/work/drawing-ledger-2-0/round2-option-c-background.png",
    storagePath: "work/drawing-ledger-2-0/round2-option-c-background.png",
  },
  round2OptionC: {
    alt: "Round 2 Option C 融合视图截图",
    localSrc: "/site/work/drawing-ledger-2-0/round2-option-c.png",
    storagePath: "work/drawing-ledger-2-0/round2-option-c.png",
  },
  round2FinalBackground: {
    alt: "",
    localSrc: "/site/work/drawing-ledger-2-0/round2-final-background.png",
    storagePath: "work/drawing-ledger-2-0/round2-final-background.png",
  },
  round2FinalVisual: {
    alt: "图纸台账 2.0 最终视觉稿",
    localSrc: "/site/work/drawing-ledger-2-0/round2-final-visual.png",
    storagePath: "work/drawing-ledger-2-0/round2-final-visual.png",
  },
  detailsAssignmentsBackground: {
    alt: "",
    localSrc: "/site/work/drawing-ledger-2-0/details-assignments-background.png",
    storagePath: "work/drawing-ledger-2-0/details-assignments-background.png",
  },
  detailsUploader: {
    alt: "上传人视角的待办区截图",
    localSrc: "/site/work/drawing-ledger-2-0/details-uploader.png",
    storagePath: "work/drawing-ledger-2-0/details-uploader.png",
  },
  detailsConfirmor: {
    alt: "确认人视角的待办区截图",
    localSrc: "/site/work/drawing-ledger-2-0/details-confirmor.png",
    storagePath: "work/drawing-ledger-2-0/details-confirmor.png",
  },
  detailsIssuer: {
    alt: "下发人视角的待办区截图",
    localSrc: "/site/work/drawing-ledger-2-0/details-issuer.png",
    storagePath: "work/drawing-ledger-2-0/details-issuer.png",
  },
  detailsAdmin: {
    alt: "多权限管理员视角的待办区截图",
    localSrc: "/site/work/drawing-ledger-2-0/details-admin.png",
    storagePath: "work/drawing-ledger-2-0/details-admin.png",
  },
  workflowDemo: {
    alt: "图纸下发流程联动示意图",
    localSrc: null,
    storagePath: "work/drawing-ledger-2-0/workflow-demo.png",
  },
  detailsResponsiveBackground: {
    alt: "",
    localSrc: "/site/work/drawing-ledger-2-0/details-responsive-background.png",
    storagePath: "work/drawing-ledger-2-0/details-responsive-background.png",
  },
  responsiveDemo: {
    alt: "待办区响应式展示示意图",
    localSrc: null,
    storagePath: "work/drawing-ledger-2-0/responsive-demo.png",
  },
  mobileComparisonBackground: {
    alt: "",
    localSrc: "/site/work/drawing-ledger-2-0/mobile-comparison-background.png",
    storagePath: "work/drawing-ledger-2-0/mobile-comparison-background.png",
  },
  mobileBefore: {
    alt: "移动端改版前页面",
    localSrc: "/site/work/drawing-ledger-2-0/mobile-before.png",
    storagePath: "work/drawing-ledger-2-0/mobile-before.png",
  },
  mobileAfter: {
    alt: "移动端改版后页面",
    localSrc: "/site/work/drawing-ledger-2-0/mobile-after.png",
    storagePath: "work/drawing-ledger-2-0/mobile-after.png",
  },
  mobileReference: {
    alt: "移动端入口设计参考整理图",
    localSrc: "/site/work/drawing-ledger-2-0/mobile-reference.png",
    storagePath: "work/drawing-ledger-2-0/mobile-reference.png",
  },
  mobileExplore1: {
    alt: "移动端入口探索图 1",
    localSrc: "/site/work/drawing-ledger-2-0/mobile-explore-1.png",
    storagePath: "work/drawing-ledger-2-0/mobile-explore-1.png",
  },
  mobileExplore2: {
    alt: "移动端入口探索图 2",
    localSrc: "/site/work/drawing-ledger-2-0/mobile-explore-2.png",
    storagePath: "work/drawing-ledger-2-0/mobile-explore-2.png",
  },
  mobileExplore3: {
    alt: "移动端入口探索图 3",
    localSrc: "/site/work/drawing-ledger-2-0/mobile-explore-3.png",
    storagePath: "work/drawing-ledger-2-0/mobile-explore-3.png",
  },
  mobileExplore4: {
    alt: "移动端入口探索图 4",
    localSrc: "/site/work/drawing-ledger-2-0/mobile-explore-4.png",
    storagePath: "work/drawing-ledger-2-0/mobile-explore-4.png",
  },
  mobileIteration1: {
    alt: "移动端视觉迭代版本 1",
    localSrc: "/site/work/drawing-ledger-2-0/mobile-iteration-1.png",
    storagePath: "work/drawing-ledger-2-0/mobile-iteration-1.png",
  },
  mobileIteration2: {
    alt: "移动端视觉迭代版本 2",
    localSrc: "/site/work/drawing-ledger-2-0/mobile-iteration-2.png",
    storagePath: "work/drawing-ledger-2-0/mobile-iteration-2.png",
  },
  mobileIteration3: {
    alt: "移动端视觉迭代版本 3",
    localSrc: "/site/work/drawing-ledger-2-0/mobile-iteration-3.png",
    storagePath: "work/drawing-ledger-2-0/mobile-iteration-3.png",
  },
  mobileIteration4: {
    alt: "移动端视觉迭代版本 4",
    localSrc: "/site/work/drawing-ledger-2-0/mobile-iteration-4.png",
    storagePath: "work/drawing-ledger-2-0/mobile-iteration-4.png",
  },
  mobileTabInteraction: {
    alt: "移动端 Tab 展开收起交互示意图",
    localSrc: null,
    storagePath: "work/drawing-ledger-2-0/mobile-tab-interaction.png",
  },
  mobileLanded1: {
    alt: "项目图纸页面",
    localSrc: "/site/work/drawing-ledger-2-0/mobile-before.png",
    storagePath: "work/drawing-ledger-2-0/mobile-landed-1.png",
  },
  mobileLanded2: {
    alt: "台账首页页面",
    localSrc: "/site/work/drawing-ledger-2-0/mobile-landed-2.png",
    storagePath: "work/drawing-ledger-2-0/mobile-landed-2.png",
  },
  mobileLanded3: {
    alt: "台账详情页面 1",
    localSrc: "/site/work/drawing-ledger-2-0/mobile-landed-3.png",
    storagePath: "work/drawing-ledger-2-0/mobile-landed-3.png",
  },
  mobileLanded4: {
    alt: "台账详情页面 2",
    localSrc: "/site/work/drawing-ledger-2-0/mobile-landed-4.png",
    storagePath: "work/drawing-ledger-2-0/mobile-landed-4.png",
  },
};

function resolveAssetSource(asset) {
  if (preferSupabaseAssets && !pendingSupabaseAssetPaths.has(asset.storagePath)) {
    return getStorageAssetUrl(asset.storagePath);
  }

  return asset.localSrc;
}

function shouldBypassNextImageOptimizer(source) {
  return typeof source === "string" && source.startsWith("http");
}

export const drawingLedgerAssets = Object.fromEntries(
  Object.entries(assetDefinitions).map(([key, asset]) => [
    key,
    (() => {
      const src = resolveAssetSource(asset);

      return {
        ...asset,
        src,
        unoptimized: shouldBypassNextImageOptimizer(src),
      };
    })(),
  ])
);

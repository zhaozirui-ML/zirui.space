import { getStorageAssetUrl } from "../../lib/get-storage-asset-url";

function createPreview(assetPath, alt, ratio) {
  return {
    alt,
    ratio,
    src: getStorageAssetUrl(assetPath),
  };
}

export const cloudtowerDesignSystemCaseStudy = {
  accentColor: "#68715D",
  category: "Web",
  framerUrl: "https://zirui.framer.website/design-system",
  showMigrationNote: false,
  showOverview: false,
  metadata: [
    { label: "Role", value: "Product Designer" },
    { label: "Timeline", value: "2023-2024" },
    { label: "Tool", value: "Figma" },
    { label: "Field", value: "Design System / Pattern / UI Map" },
  ],
  preview: createPreview(
    "work/cloudtower-design-system/work-preview.png",
    "CloudTower Design System preview",
    "782 / 505",
  ),
  slug: "cloudtower-design-system",
  summary:
    "完善 CloudTower UI 1.5 的组件文档，并把 Design Patterns 和 UI Map 一起整理出来。",
  subtitle:
    "完善 CloudTower UI 1.5 的组件文档，并整理 Design Patterns 和 UI Map。",
  sections: [
    {
      bullets: [
        "CloudTower UI 1.0.5 部分组件已经过时，无法与 CloudTower UI 1.1 对应。",
        "CloudTower UI 1.1 仅包含 Figma 组件，缺少组件开发所需的行为描述，如 hover 状态、视觉参数、场景使用指南、必要的交互说明等。",
        "到了 3.x 周期，Tag、Tooltip、Popover、Card 等组件都需要新的变体或更完整的规范。",
      ],
      descriptions: [
        "刚加入 SmartX 时，内部设计系统 CloudTower UI 的组件设计说明文档存在诸多不足。",
        "这意味着设计师能拿到组件，却很难直接判断它在真实业务里应该怎么用、怎么写、怎么交付。",
      ],
      id: "project-background",
      title: "问题与现状",
      type: "text",
    },
    {
      descriptions: [
        "CloudTower UI 1.5 的设计目标，是优先完善组件文档，并把 Design Patterns 和 UI Map 一起整理进完整的设计指南里。",
      ],
      id: "design-goals",
      title: "设计目标",
      type: "text",
    },
    {
      steps: [
        {
          body: "每个组件形成独立的设计文档，参考已有案例。",
          title: "拆分文档",
        },
        {
          body: "征集各场景中的组件使用实例，并分析是只需要拆分文档，还是要进一步改进组件设计。",
          title: "资料收集与分析",
        },
        {
          body: "通过竞品分析和业务场景需求梳理，确认复杂组件需要哪些行为说明和视觉参数。",
          title: "设计调研",
        },
        {
          body: "对需要优化的组件明确问题、产出初稿、评审并根据反馈继续 Refine。",
          title: "设计优化",
        },
        {
          body: "撰写设计文档并在设计团队与研发同学之间完成评审和交付。",
          title: "撰写设计文档",
        },
      ],
      descriptions: [
        "组件设计流程包含了从组件拆分到组件实现后走查的全流程。",
      ],
      id: "component-process",
      title: "组件优化设计流程",
      type: "steps",
    },
    {
      descriptions: [
        "我参与的设计系统的完善工作主要包含 Component、Pattern、UI Map 3 部分。下面展示部分项目案例：",
      ],
      id: "design-deliverables",
      title: "设计成果输出",
      subsections: [
        {
          body:
            "组件设计模块中，我主要负责导航类的组件优化，包含 Breadcrumb、Link、Pagination 等小项目。因为项目开始时，同步进行优先级更高的业务项目，所以这类项目的参与并不是很多。",
          cards: [
            {
              body: "用于展示当前页面在层级结构中的位置，并支持向上返回。",
              title: "Breadcrumb",
            },
            {
              body: "作为辅助导航使用，传达页面层级关系。",
              title: "Link",
            },
            {
              body: "支持单层级返回和页面跳转。",
              title: "Pagination",
            },
          ],
          note: "由于文件过大，完整内容请参考 Figma 链接。",
          title: "Component 文档示例",
          type: "cards",
        },
        {
          body:
            "Pattern 是从业务场景中抽离出来的可供复用的设计模式。Pattern 的沉淀与维护可为团队其他设计师提供良好的最佳实践，使产品更好用，让目标更加专注。",
          cards: [
            {
              body: "资源计数的展示仅支持「数字 + 对象」和「对象：数字」两种形式。",
              title: "资源计数",
            },
            {
              body: "Tag 文本过长时需要根据主语一致与否选择不同的处理方式。",
              title: "无法操作的场景处理",
            },
          ],
          note: "由于文件过大，完整内容请参考 Figma 链接。",
          title: "Pattern 文档示例",
          type: "cards",
        },
        {
          body:
            "UI Map 是对单一页面在不同版本中迭代功能的 Track 工具，方便设计师更好地追溯先前的设计决策，也为后续的设计提供更多的上下文。",
          cards: [
            {
              body: "移除 SMTX OS & SMTX ELF 集群的规则梳理。",
              title: "移除集群",
            },
            {
              body: "当集群还存在于特定的功能范围内时，展示这段内容和影响范围。",
              title: "范围信息",
            },
            {
              body: "从 CloudTower 中移除集群后的确认和异常处理。",
              title: "影响说明",
            },
          ],
          note: "由于文件过大，完整内容请参考 Figma 链接。",
          title: "UI Map 文档示例",
          type: "cards",
        },
      ],
      type: "subsections",
    },
  ],
  tocItems: [
    { hierarchy: "primary", id: "project-background", label: "问题与现状" },
    { hierarchy: "primary", id: "design-goals", label: "设计目标" },
    {
      hierarchy: "primary",
      id: "component-process",
      label: "组件优化设计流程",
    },
    { hierarchy: "primary", id: "design-deliverables", label: "设计成果输出" },
  ],
  title: "CloudTower Design System",
};

export const smtxElfVirtualizationCaseStudy = {
  accentColor: "#5E778C",
  category: "Web",
  framerUrl: "https://zirui.framer.website/smtx-elf",
  metadata: [
    { label: "Role", value: "Product Designer" },
    { label: "Timeline", value: "2023/7 - 2023/9" },
    { label: "Tool", value: "Figma" },
    { label: "Field", value: "UI/UX / Interaction Design" },
  ],
  preview: createPreview(
    "work/smtx-elf-virtualization/work-preview.png",
    "SMTX ELF Virtualization preview",
    "354 / 240",
  ),
  slug: "smtx-elf-virtualization",
  subtitle:
    "从资源池独立扩展的产品诉求出发，梳理一条新的虚拟化产品线应该怎么被理解和交付。",
  sections: [
    {
      bullets: [
        "客户希望通过独立的计算和存储资源池，来更灵活地扩展资源，并降低采购和故障域风险。",
        "SmartX 计划把 SMTX ELF 做成可独立销售、部署和扩展的虚拟化计算产品。",
      ],
      descriptions: [
        "这个项目的起点，不是一个单一页面，而是一个全新的产品方向。",
        "我需要先理解为什么要做 SMTX ELF，再把它翻译成可以被设计和研发一起执行的产品结构。",
      ],
      id: "project-background",
      title: "项目背景",
      type: "text",
    },
    {
      cards: [
        {
          body:
            "先明确 SMTX ELF 不是现有平台的附属功能，而是一条可以独立交付的新产品线。",
          title: "产品定义",
        },
        {
          body:
            "把计算、存储、资源池和扩展方式之间的关系梳理清楚，避免页面层信息混乱。",
          title: "资源关系",
        },
        {
          body:
            "将安装、部署、日常管理以外的核心模块拆成清晰任务，方便后续逐步落地。",
          title: "任务链路",
        },
      ],
      descriptions: [
        "这类项目最难的地方通常不是视觉，而是先把产品边界和信息结构说清楚。",
      ],
      id: "design-scope",
      title: "设计关注点",
      type: "cards",
    },
    {
      steps: [
        {
          body: "先定义术语和功能边界，让团队对“SMTX ELF”有统一理解。",
          title: "统一产品语言",
        },
        {
          body: "再梳理安装、资源池、计算资源和扩展关系，让页面结构更稳定。",
          title: "梳理核心对象",
        },
        {
          body: "把复杂关系拆成更容易理解的模块和流程，减少交付时的沟通成本。",
          title: "拆解交付颗粒度",
        },
        {
          body: "最终把产品从概念拉到可发布状态，让第一版能真正支持独立交付。",
          title: "推动落地",
        },
      ],
      descriptions: [
        "这条设计路径重点不是“做一个新界面”，而是先把新的产品语义搭起来。",
      ],
      id: "design-approach",
      title: "设计路径",
      type: "steps",
    },
    {
      cards: [
        {
          body:
            "SMTX ELF 最终作为独立产品方向落地，首个版本在 2023 年 12 月正式发布。",
          title: "产品落地",
        },
        {
          body:
            "前期对资源关系和任务链路的整理，帮助后续开发和交付拥有了更稳定的起点。",
          title: "交付价值",
        },
        {
          body:
            "这次设计也验证了：复杂产品的第一步往往不是画，而是先把边界说清楚。",
          title: "方法验证",
        },
      ],
      descriptions: [
        "虽然这个项目页面里呈现的是成型结果，但它真正解决的是一个更前置的问题：让新产品可以被清楚地理解、拆解和推进。",
      ],
      id: "project-outcome",
      title: "结果与复盘",
      type: "cards",
    },
  ],
  tocItems: [
    { hierarchy: "primary", id: "project-background", label: "项目背景" },
    { hierarchy: "primary", id: "design-scope", label: "设计关注点" },
    { hierarchy: "primary", id: "design-approach", label: "设计路径" },
    { hierarchy: "primary", id: "project-outcome", label: "结果与复盘" },
  ],
  title: "SMTX ELF Virtualization",
};

export const vmFeaturesOptimizationCaseStudy = {
  accentColor: "#587496",
  category: "Web",
  framerUrl: "https://zirui.framer.website/vm-optimization",
  metadata: [
    { label: "Role", value: "Product Designer" },
    { label: "Timeline", value: "2023/6 - 2023/8" },
    { label: "Tool", value: "Figma" },
    { label: "Field", value: "UI/UX / Interaction Design" },
  ],
  preview: createPreview(
    "work/vm-features-optimization/work-preview.png",
    "VM Features Optimization preview",
    "354 / 240",
  ),
  slug: "vm-features-optimization",
  subtitle:
    "把批量创建虚拟机时的命名和编辑流程，重构成更灵活、也更符合实际运维习惯的交互。",
  sections: [
    {
      bullets: [
        "虚拟机是 CloudTower 运维管理平台中的核心资源，因此批量创建流程直接影响高频使用体验。",
        "客户常常用 IP 地址来命名虚拟机，既会遇到连续 IP Range，也会遇到独立编辑名称的场景。",
        "原有两段式命名方式灵活性不足，没法很好匹配这些真实的命名习惯。",
      ],
      descriptions: [
        "这个项目的本质，是把一个高频操作中的“命名细节”做成更符合真实生产环境的交互。",
      ],
      id: "project-background",
      title: "项目背景",
      type: "text",
    },
    {
      cards: [
        {
          body: "快速构建连续的 IP Range，同时允许用户按自己的规则命名。",
          title: "灵活批量命名",
        },
        {
          body: "在批量创建过程中，还要支持单独编辑某一个或某几个虚拟机名称。",
          title: "独立编辑",
        },
        {
          body: "保留简单模式，让低复杂度场景继续保持直观易用。",
          title: "保留简单模式",
        },
      ],
      descriptions: [
        "需求看似简单，真正的难点是怎么同时保留效率、灵活性和理解成本之间的平衡。",
      ],
      id: "user-needs",
      title: "用户需求与痛点",
      type: "cards",
    },
    {
      cards: [
        {
          body:
            "方案 1 让批量编辑和单个编辑之间可以切换，但整体状态会更复杂。",
          title: "高级模式 + 逐个编辑",
        },
        {
          body:
            "方案 2 直接展示所有名称，操作简单，但界面会随着数量增长变得很长。",
          title: "高级模式 + 直接编辑",
        },
        {
          body:
            "方案 3 保留简单模式，同时引入表达式和可展开编辑，兼顾效率和灵活性。",
          title: "最终融合方案",
        },
      ],
      descriptions: [
        "这次探索的重点不是找一个最炫的交互，而是找一个在真实场景里最不容易出错的方案。",
      ],
      id: "concept-exploration",
      title: "概念设计与方案探索",
      type: "cards",
    },
    {
      formulas: [
        {
          code: "10.10.22.{{20+i}}",
          label: "表达式命名",
        },
        {
          code: "{{ 17 + i }}-hostname{{ i }}",
          label: "连续命名示例",
        },
        {
          code: "已修改",
          label: "输入偏离表达式时的状态提示",
        },
      ],
      descriptions: [
        "高级模式允许用户用表达式批量命名，单个字段如果被改写，则会进入“已修改”状态，方便识别。",
      ],
      id: "interaction-rules",
      title: "表达式与交互规则",
      type: "formula",
    },
    {
      bullets: [
        "简单模式和高级模式并存，让不同复杂度的创建任务有各自的入口。",
        "连续 IP 命名和独立编辑两类诉求终于可以放进同一套流程里处理。",
        "批量创建 VM 的效率和可理解性都得到了明显提升。",
      ],
      descriptions: [
        "最终方案把“灵活命名”和“可控编辑”放在同一个流程里，而不是让用户在两个不完整的方案之间做选择。",
      ],
      id: "project-outcome",
      title: "设计结果",
      type: "text",
    },
  ],
  tocItems: [
    { hierarchy: "primary", id: "project-background", label: "项目背景" },
    { hierarchy: "primary", id: "user-needs", label: "需求与痛点" },
    { hierarchy: "primary", id: "concept-exploration", label: "方案探索" },
    { hierarchy: "primary", id: "interaction-rules", label: "交互规则" },
    { hierarchy: "primary", id: "project-outcome", label: "设计结果" },
  ],
  title: "VM Features Optimization",
};

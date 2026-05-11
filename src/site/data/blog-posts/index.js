// 每篇博客拆成独立文件后，统一从这里聚合，页面层仍然只关心 blogPosts。
import { smartxDesignWorkflow } from "./smartx-design-workflow.js";
import { communicationAtWork } from "./communication-at-work.js";
import { goalsActivitiesTasksAndActions } from "./goals-activities-tasks-and-actions.js";
import { hammerAndNails } from "./hammer-and-nails.js";
import { obsidianFromHoneymoonToWakeup } from "./obsidian-from-honeymoon-to-wakeup.js";
import { minimalTodos } from "./minimal-todos.js";
import { codexWorktreeParallelDevelopment } from "./codex-worktree-parallel-development.js";

function getBlogDateTimestamp(date) {
  const match = date.match(/^(\d{4})年(\d{1,2})月(\d{1,2})日$/);

  if (!match) {
    return 0;
  }

  const [, year, month, day] = match;

  return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
}

// 新增文章时：先新建独立文件，再在这里 import，并加入下面的数组。
export const blogPosts = [
  codexWorktreeParallelDevelopment,
  smartxDesignWorkflow,
  communicationAtWork,
  goalsActivitiesTasksAndActions,
  hammerAndNails,
  obsidianFromHoneymoonToWakeup,
  minimalTodos,
];

export const featuredBlogPosts = blogPosts.filter((post) => post.section === "featured").slice(0, 3);

// Browse all 需要把 featured 文章也包含进来，并且按发布时间倒序显示。
export const blogIndexPosts = [...blogPosts].sort(
  (left, right) => getBlogDateTimestamp(right.date) - getBlogDateTimestamp(left.date)
);

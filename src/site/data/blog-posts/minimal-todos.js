export const minimalTodos = {
  slug: "minimal-todos",
  section: "browse",
  title: {
    zh: "简约 Todos",
    en: "Minimal Todos"
  },
  summary: {
    zh: "从传统待办事项列表的问题出发，重新理解 Burner List 这种更专注的待办方式。",
    en: "A look at why traditional todo lists break down, and how the Burner List model helps focus attention."
  },
  detailSummary: {
    zh: "这篇文章围绕传统 Todos 的问题、Burner List 系统的做法，以及它为什么能帮助人们重新聚焦最重要的任务。",
    en: "This article looks at the problems with traditional todos, how the Burner List system works, and why it helps people refocus on the most important tasks."
  },
  date: "2025年10月23日",
  category: {
    zh: "指南",
    en: "GUIDE"
  },
  imageSrc: "/site/blog/minimal-todos/cover.jpg",
  imageAlt: {
    zh: "简约 Todos 文章缩略图",
    en: "Thumbnail for Minimal Todos"
  },
  heroImageSrc: "/site/blog/minimal-todos/cover.jpg",
  heroImageAlt: {
    zh: "简约 Todos 文章 banner",
    en: "Banner image for Minimal Todos"
  },
  supportsEnglishDetail: true,
  contentBlocks: [
    {
      type: "heading",
      level: "h4",
      text: {
        zh: "传统 Todos 的问题",
        en: "The Problem with Traditional Todos"
      }
    },
    {
      type: "list",
      ordered: true,
      items: [
        {
          text: {
            zh: "传统的待办事项列表大多是对他人优先级的反应，而不是自己的优先级。",
            en: "Traditional todo lists mostly react to other people's priorities, not my own."
          },
          nested: []
        },
        {
          text: {
            zh: "完成任务后虽然会感到短暂的成就感，但更多的任务总是会接踵而来，让人感觉永远做不完。",
            en: "Even after finishing tasks, more tasks keep arriving, which makes it feel like the list never ends."
          },
          nested: []
        },
        {
          text: {
            zh: "待办事项列表会加剧生活中“未完成感”。",
            en: "Todo lists amplify the feeling of unfinished business in daily life."
          },
          nested: []
        }
      ]
    },
    {
      type: "paragraph",
      text: {
        zh: "相应的，它的好处是",
        en: "The upside is:"
      }
    },
    {
      type: "list",
      ordered: true,
      items: [
        {
          text: {
            zh: "帮助人们将事情记录下来，避免所有事情都堆积在大脑中，从而减轻压力。",
            en: "They help people write things down so everything doesn't stay in their head, which reduces stress."
          },
          nested: []
        },
        {
          text: {
            zh: "它可以将所有任务集中在一个地方，方便查看。",
            en: "They keep tasks in one place, making them easy to review."
          },
          nested: []
        }
      ]
    },
    {
      type: "heading",
      level: "h4",
      text: {
        zh: "Burner List 系统",
        en: "Burner List System"
      }
    },
    {
      type: "paragraph",
      text: {
        zh: "这是一个极其简单的纸质待办事项列表，强迫自己优先处理最重要的任务。它不是完美的，不会跟踪每一个细节，也无法同时处理多个项目。但正是这种局限性使得它更加专注。",
        en: "This is an extremely simple paper todo list that forces you to prioritize the most important task first. It is not perfect, does not track every detail, and cannot handle multiple projects at once. That limitation is exactly what makes it more focused."
      }
    },
    {
      type: "list",
      ordered: false,
      items: [
        {
          text: {
            zh: "材料：",
            en: "Materials:"
          },
          nested: [
            {
              ordered: false,
              items: [
                {
                  text: {
                    zh: "一张白纸",
                    en: "A blank sheet of paper"
                  },
                  nested: []
                },
                {
                  text: {
                    zh: "一支笔",
                    en: "A pen"
                  },
                  nested: []
                }
              ]
            }
          ]
        },
        {
          text: {
            zh: "步骤：",
            en: "Steps:"
          },
          nested: [
            {
              ordered: true,
              items: [
                {
                  text: {
                    zh: "制作两列：",
                    en: "Make two columns:"
                  },
                  nested: [
                    {
                      ordered: false,
                      items: [
                        {
                          text: {
                            zh: "可以折叠纸张、画一条竖线或将纸张分成两部分，精确性并不重要。",
                            en: "You can fold the paper, draw a vertical line, or split the page in two. Precision does not matter."
                          },
                          nested: []
                        },
                        {
                          text: {
                            zh: "重要的是创建了一个隐喻：左边 = 前置任务（front burner），右边 = 后置任务（back burner）。",
                            en: "What matters is the metaphor: left = front burner, right = back burner."
                          },
                          nested: []
                        }
                      ]
                    }
                  ]
                },
                {
                  text: {
                    zh: "前置任务：",
                    en: "Front burner:"
                  },
                  nested: [
                    {
                      ordered: false,
                      items: [
                        {
                          text: {
                            zh: "在左上角写下最重要的项目名称并划线。",
                            en: "Write the name of the most important project in the upper-left corner and underline it."
                          },
                          nested: []
                        },
                        {
                          text: {
                            zh: "然后列出与该项目相关的待办事项，这些任务是在未来几天内可以完成的，以推动项目进展。",
                            en: "Then list the tasks related to that project. These are tasks you can finish in the next few days to move the project forward."
                          },
                          nested: []
                        }
                      ]
                    }
                  ]
                },
                {
                  text: {
                    zh: "留出空白：",
                    en: "Leave space:"
                  },
                  nested: [
                    {
                      ordered: false,
                      items: [
                        {
                          text: {
                            zh: "保持第一列的其余部分空白。Burner List 的目的不是高效利用纸张面积，而是高效利用时间和精力。",
                            en: "Leave the rest of the first column blank. The goal of Burner List is not to use paper efficiently, but to use time and energy efficiently."
                          },
                          nested: []
                        },
                        {
                          text: {
                            zh: "空白空间可以让用户为最重要的项目添加更多任务，同时也有助于集中注意力。",
                            en: "The empty space helps users add more tasks to the most important project and also keeps attention focused."
                          },
                          nested: []
                        }
                      ]
                    }
                  ]
                },
                {
                  text: {
                    zh: "后置任务：",
                    en: "Back burner:"
                  },
                  nested: [
                    {
                      ordered: false,
                      items: [
                        {
                          text: {
                            zh: "在右上角写下第二重要的项目名称并划线，然后在其下方写下相关待办事项。",
                            en: "Write the name of the second most important project in the upper-right corner, underline it, and list the related tasks below."
                          },
                          nested: []
                        }
                      ]
                    }
                  ]
                },
                {
                  text: {
                    zh: "厨房水槽（Kitchen Sink）：",
                    en: "Kitchen sink:"
                  },
                  nested: [
                    {
                      ordered: false,
                      items: [
                        {
                          text: {
                            zh: "在右列的中间位置，列出任何不属于项目1或项目2的杂项任务。",
                            en: "In the middle of the right column, list any miscellaneous tasks that do not belong to project 1 or project 2."
                          },
                          nested: []
                        },
                        {
                          text: {
                            zh: "这些任务可以属于项目3、4或其他任何项目，但它们都被归入“厨房水槽”中。",
                            en: "These tasks could belong to project 3, 4, or any other project, but they all go into the \"kitchen sink\"."
                          },
                          nested: []
                        },
                        {
                          text: {
                            zh: "这种做法虽然与所有组织和生产力建议相悖，但通过限制空间和注意力，可以更好地利用时间。",
                            en: "Although this goes against most organization and productivity advice, limiting space and attention can help you use time better."
                          },
                          nested: []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "paragraph",
      text: {
        zh: "想象在页面左侧有一位厨师，他会将大部分注意力集中在前置任务上。虽然他也会偶尔关注后置任务，但前置任务才是主要的行动区域。",
        en: "Imagine a chef on the left side of the page. Most of their attention goes to the front burner tasks. They may glance at the back burner from time to time, but the front burner is the main action area."
      }
    },
    {
      type: "list",
      ordered: false,
      items: [
        {
          text: {
            zh: "Burner List 是有限的，无法容纳所有任务，因此需要放弃一些不那么重要的事情。",
            en: "Burner List is limited and cannot hold every task, so you need to let go of less important things."
          },
          nested: []
        },
        {
          text: {
            zh: "Burner List 是可丢弃的，随着任务的完成，它会很快变得过时。",
            en: "Burner List is disposable. As tasks are completed, the list becomes outdated quickly."
          },
          nested: []
        },
        {
          text: {
            zh: "重新创建列表的过程很重要，因为需要丢弃一些不再重要的未完成任务，并重新考虑当前最重要的任务是什么。",
            en: "Recreating the list matters because you need to discard unfinished tasks that are no longer important and reconsider what matters most right now."
          },
          nested: []
        },
        {
          text: {
            zh: "最重要的是一次只能有一个最重要的项目。",
            en: "The most important thing is to have only one most important project at a time."
          },
          nested: []
        }
      ]
    },
    {
      type: "heading",
      level: "h4",
      text: {
        zh: "总结",
        en: "Summary"
      }
    },
    {
      type: "paragraph",
      text: {
        zh: "Burner List 系统的目的让自己专注于最重要的任务，而不是试图处理所有任务。它是一个简单、专注的系统，适合希望减少待办事项列表复杂性的人。最后，最重要的是根据自己的实际需要灵活调整。毕竟，规则存在的本身就是用来打破的，前提是你需要先熟悉规则。",
        en: "The point of Burner List is to keep yourself focused on the most important tasks instead of trying to handle everything. It is a simple, focused system for people who want to reduce todo-list complexity. In the end, the key is to adapt it to your own needs. After all, rules exist to be broken, but only after you understand them."
      }
    }
  ]
};

# Visitor Analytics Setup

这个功能会记录全站的匿名首次访客，并生成一个只给站点所有者看的统计页。

## 1. 在 Supabase 执行 SQL

把 [docs/visitor-analytics.sql](/Users/zhaozirui/Desktop/AI Coding/Portfolio2026/docs/visitor-analytics.sql) 里的内容复制到 Supabase SQL Editor 执行。

它会创建：

- `public.visitors`
- `public.site_stats`
- 插入后自动累加 `site_stats.total_unique_visitors` 的 trigger

## 2. 配置环境变量

在本地或部署平台中补齐这些变量：

```bash
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
VISITOR_STATS_ACCESS_KEY=choose_a_long_random_string
```

说明：

- `SUPABASE_SERVICE_ROLE_KEY` 只能放在服务端，不能暴露到前端
- `VISITOR_STATS_ACCESS_KEY` 用来保护私有统计页

## 3. 查看私有统计页

页面地址：

```text
/visitor-stats?access=你的访问密钥
```

这个页面默认展示：

- 累计匿名首次访客
- 今日新增访客
- 来源渠道分布
- 首次落地页分布

## 4. 当前口径说明

- 统计对象是“匿名首次访客”，不是现实世界里绝对唯一的人数
- 同一浏览器首次进入后会写入一个本地 `visitor_id`
- 刷新页面不会重复累计
- 换浏览器、换设备、无痕模式，仍可能被当成新访客

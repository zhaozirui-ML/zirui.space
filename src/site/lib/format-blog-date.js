// 统一把 Blog 数据层里的中文日期转换成更简洁的年月格式。
// 这样页面展示可以保持一致，同时不需要回写每一篇文章的原始内容。
export function formatBlogDate(date) {
  const match = /^(\d{4})年(\d{1,2})月(?:\d{1,2})日$/.exec(date);

  if (!match) {
    return date;
  }

  const [, year, month] = match;

  return `${year}.${month.padStart(2, "0")}`;
}

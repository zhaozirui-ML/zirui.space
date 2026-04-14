/**
 * 统一把 Blog 数据层里的日期转换成更适合当前语言的展示格式。
 * 中文继续沿用 YYYY.MM，英文模式则展示成 "Month YYYY"。
 *
 * @param {string} date
 * @param {import("../i18n/config").SiteLanguage} [language="zh"]
 */
export function formatBlogDate(date, language = "zh") {
  const match = /^(\d{4})年(\d{1,2})月(?:\d{1,2})日$/.exec(date);

  if (!match) {
    return date;
  }

  const [, year, month] = match;

  if (language === "en") {
    const dateObject = new Date(Number(year), Number(month) - 1, 1);

    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(dateObject);
  }

  return `${year}.${month.padStart(2, "0")}`;
}

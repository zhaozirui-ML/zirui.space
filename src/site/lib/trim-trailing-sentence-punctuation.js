/**
 * 展示层用的小工具：只去掉句末一个中英文句号，避免影响原始数据内容。
 *
 * @param {string} text
 */
export function trimTrailingSentencePunctuation(text) {
  return text.replace(/[。.]$/, "");
}

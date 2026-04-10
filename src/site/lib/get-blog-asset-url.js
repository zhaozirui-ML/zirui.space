import { getStorageAssetUrl } from "./get-storage-asset-url";

// Blog 先按文章 slug 分目录管理，后面继续迁移时就只需要补文件名，不需要改页面逻辑。
export function getBlogAssetUrl(slug, fileName) {
  return getStorageAssetUrl(`blog/${slug}/${fileName}`);
}

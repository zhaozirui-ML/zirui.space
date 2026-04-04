const defaultStorageBaseUrl =
  "https://zikhatpucpynawwxbrun.supabase.co/storage/v1/object/public/portfolio-assets";

function normalizeBaseUrl(value) {
  return value.replace(/\/+$/, "");
}

function normalizeAssetPath(value) {
  return value.replace(/^\/+/, "");
}

// 先把 Storage 基础地址集中到一个入口，后面继续迁移图片时就不用到处改长链接。
const storageBaseUrl = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BASE_URL || defaultStorageBaseUrl
);

export function getStorageAssetUrl(assetPath) {
  return `${storageBaseUrl}/${normalizeAssetPath(assetPath)}`;
}

export { storageBaseUrl };

function normalizeSourcePath(source) {
  if (Array.isArray(source)) {
    return source[0] ?? null;
  }

  return typeof source === "string" ? source : null;
}

export function getReturnPath(source, fallback = "/work") {
  const normalizedSource = normalizeSourcePath(source);

  if (!normalizedSource) {
    return fallback;
  }

  // 只接受站内相对路径，避免把返回按钮变成外部跳转入口。
  if (!normalizedSource.startsWith("/") || normalizedSource.startsWith("//")) {
    return fallback;
  }

  if (normalizedSource.includes("://")) {
    return fallback;
  }

  return normalizedSource;
}

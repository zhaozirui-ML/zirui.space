export const COMMENTS_OWNER_ACCESS_STORAGE_KEY = "portfolio-comments-access-token";

function normalizeToken(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function getStoredCommentsAccessToken() {
  if (typeof window === "undefined") {
    return "";
  }

  return normalizeToken(
    window.localStorage.getItem(COMMENTS_OWNER_ACCESS_STORAGE_KEY),
  );
}

export function storeCommentsAccessToken(value) {
  if (typeof window === "undefined") {
    return "";
  }

  const accessToken = normalizeToken(value);

  if (!accessToken) {
    window.localStorage.removeItem(COMMENTS_OWNER_ACCESS_STORAGE_KEY);
    window.dispatchEvent(new Event("portfolio-comments-owner-change"));
    return "";
  }

  window.localStorage.setItem(COMMENTS_OWNER_ACCESS_STORAGE_KEY, accessToken);
  window.dispatchEvent(new Event("portfolio-comments-owner-change"));
  return accessToken;
}

export function clearCommentsAccessToken() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(COMMENTS_OWNER_ACCESS_STORAGE_KEY);
  window.dispatchEvent(new Event("portfolio-comments-owner-change"));
}

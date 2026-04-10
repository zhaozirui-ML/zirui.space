const MODULE_HOME_PATHS = new Set(["/", "/about", "/blog", "/work"]);

export function isModuleHomePath(pathname) {
  return MODULE_HOME_PATHS.has(pathname);
}

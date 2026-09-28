const base = import.meta.env.BASE_URL.replace(/\/$/, "");

const withTrailingSlash = (path: string) => (path.endsWith("/") ? path : `${path}/`);

/** Prefixes a root-relative path ("/el-carro/") with the configured base path. */
export function withBase(path: string): string {
  return `${base}${path}`;
}

export function isCurrentPage(href: string, pathname: string): boolean {
  return withTrailingSlash(withBase(href)) === withTrailingSlash(pathname);
}

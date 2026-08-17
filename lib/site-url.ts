export const SITE_ORIGIN = "https://boxingessential.com";

const SITE_HOSTS = new Set(["boxingessential.com", "www.boxingessential.com"]);

function stripPathTrailingSlash(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.replace(/\/+$/, "") || "/";
  }
  return pathname;
}

/** Normalize site links to the no-slash form. Leaves external URLs alone. */
export function canonicalizeHref(href: string | undefined | null): string {
  if (!href) return "";
  if (
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("javascript:")
  ) {
    return href;
  }

  try {
    if (href.startsWith("/") && !href.startsWith("//")) {
      const url = new URL(href, SITE_ORIGIN);
      url.pathname = stripPathTrailingSlash(url.pathname);
      return `${url.pathname}${url.search}${url.hash}`;
    }

    const absolute = href.startsWith("//") ? `https:${href}` : href;
    if (!/^https?:\/\//i.test(absolute)) {
      return canonicalizeHref(`/${href.replace(/^\/+/, "")}`);
    }

    const url = new URL(absolute);
    if (!SITE_HOSTS.has(url.hostname)) return href;

    url.pathname = stripPathTrailingSlash(url.pathname);
    const path = url.pathname === "/" ? "" : url.pathname;
    return `${SITE_ORIGIN}${path}${url.search}${url.hash}`;
  } catch {
    return href;
  }
}

export function toSitePath(slugOrPath: string): string {
  const canonical = canonicalizeHref(
    slugOrPath.startsWith("/") ? slugOrPath : `/${slugOrPath.replace(/^\/+/, "")}`
  );
  if (canonical.startsWith("http")) {
    try {
      const url = new URL(canonical);
      return `${url.pathname}${url.search}${url.hash}` || "/";
    } catch {
      return canonical;
    }
  }
  return canonical || "/";
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const RESERVED_SINGLE_SEGMENTS = new Set([
  "about",
  "admin",
  "api",
  "blog",
  "contact-us",
  "disclaimer",
  "live",
  "news",
  "privacy-policy",
  "shop",
  "sitemap",
  "terms-and-conditions",
  "training",
  "videos",
]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const extensionMatch = pathname.match(/^\/([^/]+)\.(jpg|jpeg|webp|png)$/i);
  if (extensionMatch) {
    const [, slug] = extensionMatch;
    return NextResponse.rewrite(new URL(`/api/image/${slug}`, request.url));
  }

  const singleSegment = pathname.match(/^\/([^/]+)$/);
  if (!singleSegment) {
    return NextResponse.next();
  }

  const slug = singleSegment[1];
  if (RESERVED_SINGLE_SEGMENTS.has(slug)) {
    return NextResponse.next();
  }

  const fetchDest = request.headers.get("sec-fetch-dest");
  if (fetchDest === "image") {
    return NextResponse.rewrite(new URL(`/api/image/${slug}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*-sitemap.xml).*)"],
};

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

/** Real files in /public — must not be rewritten to /api/image. */
const PUBLIC_STATIC_IMAGES = new Set(
  [
    "aboutBg.jpg",
    "aboutTrainingImg.jpg",
    "boxerPuncher.jpg",
    "counterPuncher.jpg",
    "livematch.jpg",
    "logo.png",
    "mAli.png",
    "mtyson.jpg",
    "outBoxer.jpg",
    "powerPuncher.jpg",
    "SRR.jpg",
    "swarmer.jpg",
  ].map((name) => name.toLowerCase())
);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Prefer non-trailing-slash URLs so Google consolidates duplicates
  if (pathname.length > 1 && pathname.endsWith("/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/\/+$/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  const extensionMatch = pathname.match(/^\/([^/]+)\.(jpg|jpeg|webp|png)$/i);
  if (extensionMatch) {
    const filename = pathname.slice(1).toLowerCase();
    if (PUBLIC_STATIC_IMAGES.has(filename)) {
      return NextResponse.next();
    }
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

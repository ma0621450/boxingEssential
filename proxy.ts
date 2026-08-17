import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SITE_ORIGIN } from "@/lib/site-url";

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

function canonicalRequestOrigin(request: NextRequest): string {
  const host =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    "";
  if (
    host.startsWith("localhost") ||
    host.startsWith("127.0.0.1") ||
    host.endsWith(".vercel.app")
  ) {
    return request.nextUrl.origin;
  }
  return SITE_ORIGIN;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const host =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    "";
  const origin = canonicalRequestOrigin(request);
  const cleanPath =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.replace(/\/+$/, "") || "/"
      : pathname;
  const slashFix = cleanPath !== pathname;
  const hostFix = origin === SITE_ORIGIN && host === "www.boxingessential.com";

  // One hop to https://boxingessential.com/slug (no slash, no www)
  if (slashFix || hostFix) {
    return NextResponse.redirect(new URL(`${origin}${cleanPath}${search}`), 308);
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

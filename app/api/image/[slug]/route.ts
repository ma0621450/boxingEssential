import { NextResponse } from "next/server";
import { getImageSourceByPathSlug } from "@/lib/image-source";

export const revalidate = 3600;

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const source = await getImageSourceByPathSlug(slug);

  if (!source?.imageUrl) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const upstream = await fetch(source.imageUrl, {
    next: { revalidate: 3600 },
  });

  if (!upstream.ok) {
    return new NextResponse("Upstream image unavailable", { status: 502 });
  }

  const bytes = await upstream.arrayBuffer();

  return new NextResponse(bytes, {
    headers: {
      "Content-Type": source.mimeType || upstream.headers.get("content-type") || "image/jpeg",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

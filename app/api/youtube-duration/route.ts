import { NextRequest, NextResponse } from "next/server";
import { fetchYoutubeDuration, getYoutubeId } from "@/lib/youtube";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  if (!getYoutubeId(url)) {
    return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
  }

  try {
    const duration = await fetchYoutubeDuration(url);

    if (!duration) {
      return NextResponse.json(
        { error: "Could not read duration for this video" },
        { status: 404 }
      );
    }

    return NextResponse.json({ duration });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch duration";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import {
  fetchYoutubeDuration,
  fetchYoutubeThumbnail,
  getYoutubeId,
} from "@/lib/youtube";
import { serverClient } from "@/lib/sanity";

export async function POST(request: NextRequest) {
  let body: { url?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const url = body.url?.trim();
  if (!url) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  const videoId = getYoutubeId(url);
  if (!videoId) {
    return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
  }

  try {
    const [duration, thumbnailBuffer] = await Promise.all([
      fetchYoutubeDuration(url),
      fetchYoutubeThumbnail(videoId),
    ]);

    let assetId: string | null = null;

    if (thumbnailBuffer) {
      const asset = await serverClient.assets.upload(
        "image",
        Buffer.from(thumbnailBuffer),
        { filename: `${videoId}-thumbnail.jpg` }
      );
      assetId = asset._id;
    }

    if (!duration && !assetId) {
      return NextResponse.json(
        { error: "Could not fetch video details from YouTube" },
        { status: 404 }
      );
    }

    return NextResponse.json({ duration: duration ?? null, assetId });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to sync from YouTube";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

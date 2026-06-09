export function getYoutubeId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
    /[?&]v=([^?&]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

export function getYoutubeThumbnail(url: string): string {
  const id = getYoutubeId(url);
  return id
    ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
    : "https://images.pexels.com/photos/4761352/pexels-photo-4761352.jpeg?auto=compress&cs=tinysrgb&w=800";
}

export function getYoutubeEmbedUrl(url: string): string {
  const id = getYoutubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : url;
}

/** Converts YouTube API ISO 8601 duration (e.g. PT10M24S) to M:SS or H:MM:SS */
export function formatIso8601Duration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "";

  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export async function fetchYoutubeDuration(url: string): Promise<string | null> {
  const videoId = getYoutubeId(url);
  if (!videoId) return null;

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    throw new Error("YOUTUBE_API_KEY is not configured");
  }

  const endpoint = new URL("https://www.googleapis.com/youtube/v3/videos");
  endpoint.searchParams.set("part", "contentDetails");
  endpoint.searchParams.set("id", videoId);
  endpoint.searchParams.set("key", apiKey);

  const res = await fetch(endpoint.toString(), {
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    throw new Error(`YouTube API error (${res.status})`);
  }

  const data = await res.json();
  const iso = data?.items?.[0]?.contentDetails?.duration as string | undefined;
  if (!iso) return null;

  return formatIso8601Duration(iso);
}

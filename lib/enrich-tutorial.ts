import type { SanityTutorial } from "./tutorial";
import { fetchYoutubeDuration } from "./youtube";

/** Fills duration from YouTube when missing (e.g. legacy tutorials). */
export async function withYoutubeDuration(
  raw: SanityTutorial
): Promise<SanityTutorial> {
  if (raw.duration || !raw.youtubeUrl) return raw;

  try {
    const duration = await fetchYoutubeDuration(raw.youtubeUrl);
    return duration ? { ...raw, duration } : raw;
  } catch {
    return raw;
  }
}

export async function withYoutubeDurationList(
  list: SanityTutorial[]
): Promise<SanityTutorial[]> {
  return Promise.all(list.map((item) => withYoutubeDuration(item)));
}

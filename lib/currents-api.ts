const CURRENTS_BASE = "https://api.currentsapi.services/v1";

const DEFAULT_NEWS_CATEGORY = "sports";

function revalidateSeconds(): number {
  const n = Number(process.env.CURRENTS_API_REVALIDATE_SECONDS);
  if (Number.isFinite(n) && n >= 60) return Math.floor(n);
  return 3600;
}

type CurrentsNewsItem = {
  id?: string;
  title?: string;
  description?: string;
};

type CurrentsSearchResponse = {
  status?: string;
  news?: CurrentsNewsItem[];
};

function stripTags(s: string): string {
  return s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function authHeader(rawKey: string): string {
  const trimmed = rawKey.trim();
  const mode = process.env.CURRENTS_AUTH_MODE?.trim().toLowerCase();
  if (mode === "bearer") return `Bearer ${trimmed}`;
  if (mode === "raw") return trimmed;
  if (/^bearer\s+/i.test(trimmed)) return trimmed;
  return trimmed;
}

async function fetchCurrentsNews(url: URL): Promise<CurrentsNewsItem[]> {
  const key = process.env.CURRENTS_API_KEY?.trim();
  if (!key) return [];

  try {
    const res = await fetch(url.toString(), {
      headers: { Authorization: authHeader(key) },
      next: { revalidate: revalidateSeconds() },
    });
    if (!res.ok) return [];

    const body = (await res.json()) as CurrentsSearchResponse;
    if (body.status && body.status !== "ok") return [];

    return Array.isArray(body.news) ? body.news : [];
  } catch {
    return [];
  }
}

function mergeNewsItems(batches: CurrentsNewsItem[][]): CurrentsNewsItem[] {
  const out: CurrentsNewsItem[] = [];
  const seen = new Set<string>();

  for (const batch of batches) {
    for (const item of batch) {
      const dedupeKey = item.id?.trim() || item.title?.trim().toLowerCase() || "";
      if (!dedupeKey || seen.has(dedupeKey)) continue;
      seen.add(dedupeKey);
      out.push(item);
    }
  }

  return out;
}

/**
 * Sports headlines from Currents API (latest-news + optional keyword search).
 * Not limited to boxing — uses category `sports` by default.
 */
export async function fetchSportsHeadlines(limit = 18): Promise<string[]> {
  const key = process.env.CURRENTS_API_KEY?.trim();
  if (!key) return [];

  const lang = process.env.CURRENTS_NEWS_LANGUAGE?.trim() || "en";
  const category =
    process.env.CURRENTS_NEWS_CATEGORY?.trim() || DEFAULT_NEWS_CATEGORY;
  const searchKeywords =
    process.env.CURRENTS_NEWS_KEYWORDS?.trim() || category;

  const latestSports = new URL(`${CURRENTS_BASE}/latest-news`);
  latestSports.searchParams.set("language", lang);
  latestSports.searchParams.set("category", category);

  const searchUrl = new URL(`${CURRENTS_BASE}/search`);
  searchUrl.searchParams.set("keywords", searchKeywords);
  searchUrl.searchParams.set("language", lang);
  searchUrl.searchParams.set("page", "1");

  const [fromLatest, fromSearch] = await Promise.all([
    fetchCurrentsNews(latestSports),
    fetchCurrentsNews(searchUrl),
  ]);

  const merged = mergeNewsItems([fromLatest, fromSearch]);

  const headlines: string[] = [];
  const seenTitles = new Set<string>();

  for (const item of merged) {
    const raw = item.title?.trim();
    if (!raw) continue;
    const cleaned = stripTags(raw);
    if (!cleaned || seenTitles.has(cleaned.toLowerCase())) continue;
    seenTitles.add(cleaned.toLowerCase());
    headlines.push(cleaned);
    if (headlines.length >= limit) break;
  }

  return headlines;
}

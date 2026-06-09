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
      headers: {
        Authorization: authHeader(key),
      },
      next: {
        revalidate: revalidateSeconds(),
      },
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
      const key =
        item.id?.trim() ||
        item.title?.trim().toLowerCase() ||
        "";

      if (!key || seen.has(key)) continue;

      seen.add(key);
      out.push(item);
    }
  }

  return out;
}

function isBoxingArticle(item: CurrentsNewsItem): boolean {
  const text = `${item.title ?? ""} ${item.description ?? ""}`
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ");

  let score = 0;

  // strong boxing signals
  const strongTerms = [
    "boxing",
    "heavyweight",
    "welterweight",
    "middleweight",
    "knockout",
    "tko",
    "wbc",
    "wba",
    "wbo",
    "ibf",
    "fight night",
    "title fight",
  ];

  // boxer names (VERY strong signal)
  const boxers = [
    "usyk",
    "fury",
    "anthony joshua",
    "joshua",
    "canelo",
    "crawford",
    "inoue",
    "bivol",
    "beterbiev",
    "gervonta",
    "shakur stevenson",
    "dmitry bivol",
    "eddie hearn",
  ];

  // scoring
  for (const term of strongTerms) {
    if (text.includes(term)) score += 2;
  }

  for (const boxer of boxers) {
    if (text.includes(boxer)) score += 4;
  }

  // penalty for clearly non-boxing sports
  const noiseTerms = [
    "french open",
    "tennis",
    "djokovic",
    "cricket",
    "football",
    "soccer",
    "nba",
    "nfl",
    "formula",
    "olympics",
  ];

  for (const bad of noiseTerms) {
    if (text.includes(bad)) score -= 6;
  }

  // FINAL RULE
  return score >= 4;
}

/**
 * MAIN FUNCTION
 * Fetch sports + filter down to boxing only
 */
export async function fetchSportsHeadlines(
  limit = 18
): Promise<string[]> {
  const key = process.env.CURRENTS_API_KEY?.trim();
  if (!key) return [];

  const lang =
    process.env.CURRENTS_NEWS_LANGUAGE?.trim() || "en";

  const category =
    process.env.CURRENTS_NEWS_CATEGORY?.trim() ||
    DEFAULT_NEWS_CATEGORY;

  // keep broad search for better coverage
  const searchKeywords =
    process.env.CURRENTS_NEWS_KEYWORDS?.trim() ||
    "boxing fight heavyweight title";

  const latestUrl = new URL(
    `${CURRENTS_BASE}/latest-news`
  );

  latestUrl.searchParams.set("language", lang);
  latestUrl.searchParams.set("category", category);

  const searchUrl = new URL(
    `${CURRENTS_BASE}/search`
  );

  searchUrl.searchParams.set("keywords", searchKeywords);
  searchUrl.searchParams.set("language", lang);
  searchUrl.searchParams.set("page", "1");

  const [latest, search] = await Promise.all([
    fetchCurrentsNews(latestUrl),
    fetchCurrentsNews(searchUrl),
  ]);

  const merged = mergeNewsItems([latest, search]);

  const headlines: string[] = [];
  const seen = new Set<string>();

  for (const item of merged) {
    if (!isBoxingArticle(item)) continue;

    const title = item.title?.trim();
    if (!title) continue;

    const clean = stripTags(title);
    const key = clean.toLowerCase();

    if (seen.has(key)) continue;

    seen.add(key);
    headlines.push(clean);

    if (headlines.length >= limit) break;
  }

  return headlines;
}
const DEFAULT_BASE = "https://boxing-data-api.p.rapidapi.com";
const RAPIDAPI_HOST = "boxing-data-api.p.rapidapi.com";

export type ScheduledFight = {
  id: string;
  title: string;
  date: string;
  location: string | null;
  venue: string | null;
  status: string;
  division?: { name: string } | null;
  fighters: {
    fighter_1: { name: string; full_name?: string };
    fighter_2: { name: string; full_name?: string };
  };
};

export type ScheduledEvent = {
  id: string;
  title: string;
  date: string;
  location: string | null;
  venue: string | null;
  broadcasters?: Array<Record<string, string>>;
};

function boxingApiBase(): string {
  const raw = process.env.BOXING_DATA_API_BASE_URL?.trim();
  if (!raw) return DEFAULT_BASE;
  return raw.replace(/\/$/, "");
}

function revalidateSeconds(): number {
  const n = Number(process.env.BOXING_DATA_REVALIDATE_SECONDS);
  if (Number.isFinite(n) && n >= 60) return Math.floor(n);
  return 1800;
}

function rapidHeaders(): HeadersInit | null {
  const key = process.env.RAPIDAPI_KEY?.trim();
  if (!key) return null;
  return {
    "Content-Type": "application/json",
    "x-rapidapi-key": key,
    "x-rapidapi-host": RAPIDAPI_HOST,
  };
}

type BoxingListResponse<T> = {
  data?: T[] | T;
  error?: Record<string, unknown>;
};

function isNonEmptyError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  return Object.keys(error as object).length > 0;
}

type BoxingErrorBody = {
  error?: { code?: string; message?: string };
  data?: unknown;
};

function parseDays(value: string | undefined, fallback: number): number {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 1) return fallback;
  return Math.min(365, Math.floor(n));
}

/** Lower RapidAPI tiers reject large `days` with DateOutOfRange; retry with smaller windows. */
const DATE_FALLBACK_DAYS = [30, 14, 7, 3, 1] as const;

async function fetchScheduleList<T>(path: string, baseParams: Record<string, string>): Promise<T[]> {
  const headers = rapidHeaders();
  if (!headers) return [];

  const requestedDays = parseDays(baseParams.days, 14);
  const dayCandidates = [requestedDays, ...DATE_FALLBACK_DAYS.filter((d) => d < requestedDays)];

  for (const days of dayCandidates) {
    const url = new URL(`${boxingApiBase()}${path}`);
    const params = { ...baseParams, days: String(days) };
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(k, v);
    }

    try {
      const res = await fetch(url.toString(), {
        headers,
        next: { revalidate: revalidateSeconds() },
      });

      const body = (await res.json()) as BoxingListResponse<T> & BoxingErrorBody;

      const errCode = body.error && typeof body.error === "object" ? (body.error as { code?: string }).code : undefined;
      if (!res.ok && errCode !== "DateOutOfRange") {
        return [];
      }
      if (errCode === "DateOutOfRange") {
        continue;
      }
      if (!res.ok) {
        continue;
      }

      if (isNonEmptyError(body.error)) {
        return [];
      }
      const { data } = body;
      if (!data) return [];
      return Array.isArray(data) ? data : [data];
    } catch {
      return [];
    }
  }

  return [];
}

export async function fetchUpcomingFights(): Promise<ScheduledFight[]> {
  return fetchScheduleList<ScheduledFight>("/v2/fights/schedule", {
    days: process.env.BOXING_UPCOMING_DAYS?.trim() || "14",
    date_sort: "ASC",
    page_size: process.env.BOXING_FIGHTS_PAGE_SIZE?.trim() || "6",
    page_num: "1",
  });
}

export async function fetchUpcomingEvents(): Promise<ScheduledEvent[]> {
  return fetchScheduleList<ScheduledEvent>("/v2/events/schedule", {
    days: process.env.BOXING_UPCOMING_DAYS?.trim() || "14",
    date_sort: "ASC",
    page_size: process.env.BOXING_EVENTS_PAGE_SIZE?.trim() || "6",
    page_num: "1",
  });
}

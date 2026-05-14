export const BASE_URL = "https://api.the-odds-api.com/v4";

export type OddsEvent = {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
};

export async function fetchUpcomingFights(): Promise<OddsEvent[]> {
  const apiKey = process.env.ODDS_API_KEY;
  if (!apiKey) {
    console.error("ODDS_API_KEY is not set in environment variables.");
    return [];
  }

  try {
    const url = `${BASE_URL}/sports/boxing_boxing/events?apiKey=${apiKey}`;
    const res = await fetch(url, {
      next: { revalidate: 86400 }, // Cache for 24 hours (1 request per day)
    });
    
    if (!res.ok) {
      console.error(`Odds API Error: ${res.status} ${res.statusText}`);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch upcoming fights from Odds API", error);
    return [];
  }
}

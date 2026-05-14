import { fetchSportsHeadlines } from "@/lib/currents-api";
import { fetchUpcomingFights, type OddsEvent } from "@/lib/odds-api";

export type HomeLiveData = {
  bouts: OddsEvent[];
  headlines: string[];
};

export async function getHomeLiveData(): Promise<HomeLiveData> {
  const [bouts, headlines] = await Promise.all([
    fetchUpcomingFights(),
    fetchSportsHeadlines(),
  ]);

  return { bouts, headlines };
}

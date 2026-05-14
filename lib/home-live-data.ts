import { fetchSportsHeadlines } from "@/lib/currents-api";
import {
  fetchScheduledBouts,
  fetchChampions,
  type Bout,
  type Boxer,
} from "@/lib/openboxing-api";

export type HomeLiveData = {
  bouts: Bout[];
  champions: Boxer[];
  headlines: string[];
};

export async function getHomeLiveData(): Promise<HomeLiveData> {
  const [bouts, rawChampions, headlines] = await Promise.all([
    fetchScheduledBouts(),
    fetchChampions(),
    fetchSportsHeadlines(),
  ]);

  // Just grab a handful of random champions for the homepage or the first few
  const champions = rawChampions.slice(0, 10);

  return { bouts, champions, headlines };
}

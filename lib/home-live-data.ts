import { fetchSportsHeadlines } from "@/lib/currents-api";
import {
  fetchUpcomingEvents,
  fetchUpcomingFights,
  type ScheduledEvent,
  type ScheduledFight,
} from "@/lib/boxing-data-api";

export type HomeLiveData = {
  fights: ScheduledFight[];
  events: ScheduledEvent[];
  headlines: string[];
};

export async function getHomeLiveData(): Promise<HomeLiveData> {
  const [fights, events, headlines] = await Promise.all([
    fetchUpcomingFights(),
    fetchUpcomingEvents(),
    fetchSportsHeadlines(),
  ]);

  return { fights, events, headlines };
}

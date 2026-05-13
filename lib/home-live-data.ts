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

function isRenderableFight(f: ScheduledFight): boolean {
  return Boolean(
    f.fighters?.fighter_1?.name?.trim() &&
      f.fighters?.fighter_2?.name?.trim()
  );
}

export async function getHomeLiveData(): Promise<HomeLiveData> {
  const [rawFights, events, headlines] = await Promise.all([
    fetchUpcomingFights(),
    fetchUpcomingEvents(),
    fetchSportsHeadlines(),
  ]);

  const fights = rawFights.filter(isRenderableFight);

  return { fights, events, headlines };
}

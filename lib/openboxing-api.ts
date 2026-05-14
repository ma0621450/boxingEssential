export const BASE_URL = "https://openboxing.org/api";

export type BoxerName = {
  first: string;
  last: string;
  short: string;
};

export type Boxer = {
  championId: number;
  name: BoxerName;
  born: string;
};

export type TitleOrg = {
  name: {
    full: string;
    short: string;
    abbreviation: string;
  };
};

export type Title = {
  weight: {
    class: string;
    lb: string;
  };
  org: TitleOrg;
  active: boolean;
};

export type Bout = {
  boutId: number;
  date: string;
  boxers: {
    boxerA: Boxer;
    boxerB: Boxer;
  };
  status: string;
  scheduledRounds: number;
  weight: {
    class: string;
    lb: string;
  };
  titles: Title[];
};

export async function fetchScheduledBouts(): Promise<Bout[]> {
  try {
    const res = await fetch(`${BASE_URL}/bouts/scheduled.json`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch scheduled bouts", error);
    return [];
  }
}

export async function fetchChampions(): Promise<Boxer[]> {
  try {
    const res = await fetch(`${BASE_URL}/champions/all.json`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch champions", error);
    return [];
  }
}

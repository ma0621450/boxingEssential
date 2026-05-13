import { format, isValid, parseISO } from "date-fns";
import { Calendar, MapPin, Swords } from "lucide-react";
import type { ScheduledFight } from "@/lib/boxing-data-api";

function formatBoutDate(iso: string): string {
  try {
    const d = parseISO(iso);
    if (!isValid(d)) return iso;
    return format(d, "EEE, MMM d, yyyy");
  } catch {
    return iso;
  }
}

function fighterLabel(f: { name: string; full_name?: string }): string {
  return f.full_name?.trim() || f.name;
}

type Props = {
  fights: ScheduledFight[];
};

export function HomeUpcomingFights({ fights }: Props) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 border-t border-border/30">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-primary mb-2">
            <Swords className="h-5 w-5" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-wider">Schedule</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Upcoming fights</h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-xl">
            Bouts on the horizon from the Boxing Data API. Dates and matchups update as promotions announce cards.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {fights.map((fight) => {
          const a = fighterLabel(fight.fighters.fighter_1);
          const b = fighterLabel(fight.fighters.fighter_2);
          const division = fight.division?.name;

          return (
            <article
              key={fight.id}
              className="group rounded-lg border border-border/60 bg-card/80 p-5 shadow-sm hover:border-primary/35 hover:bg-card transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <h3 className="text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                  {a} <span className="text-muted-foreground font-normal">vs</span> {b}
                </h3>
              </div>
              {division ? (
                <p className="text-xs font-medium text-primary/90 mb-3 uppercase tracking-wide">{division}</p>
              ) : null}
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 shrink-0 text-primary/80" aria-hidden />
                  <time dateTime={fight.date}>{formatBoutDate(fight.date)}</time>
                </div>
                {(fight.venue || fight.location) && (
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-primary/80" aria-hidden />
                    <span>
                      {[fight.venue, fight.location].filter(Boolean).join(" · ")}
                    </span>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

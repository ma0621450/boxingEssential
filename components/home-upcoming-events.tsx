import { format, isValid, parseISO } from "date-fns";
import { Calendar, MapPin, Trophy } from "lucide-react";
import type { ScheduledEvent } from "@/lib/boxing-data-api";

function formatEventDate(iso: string): string {
  try {
    const d = parseISO(iso);
    if (!isValid(d)) return iso;
    return format(d, "EEE, MMM d, yyyy · h:mm a");
  } catch {
    return iso;
  }
}

function summarizeBroadcasters(broadcasters: Array<Record<string, string>> | undefined): string | null {
  if (!broadcasters?.length) return null;
  const parts: string[] = [];
  for (const row of broadcasters) {
    const entries = Object.entries(row);
    const [country, name] = entries[0] ?? [];
    if (country && name) parts.push(`${country}: ${name}`);
    if (parts.length >= 2) break;
  }
  return parts.length ? parts.join(" · ") : null;
}

type Props = {
  events: ScheduledEvent[];
};

export function HomeUpcomingEvents({ events }: Props) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 border-t border-border/30">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-primary mb-2">
            <Trophy className="h-5 w-5" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-wider">Fight nights</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Upcoming events</h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-xl">
            Promoted cards and venues in the coming weeks. Individual bouts are listed above in Upcoming fights.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event) => {
          const broadcast = summarizeBroadcasters(event.broadcasters);

          return (
            <article
              key={event.id}
              className="rounded-lg border border-border/60 bg-card/80 p-5 md:p-6 hover:border-primary/35 hover:bg-card transition-colors flex flex-col gap-3"
            >
              <h3 className="text-lg font-semibold text-foreground leading-snug">{event.title}</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 shrink-0 text-primary/80" aria-hidden />
                  <time dateTime={event.date}>{formatEventDate(event.date)}</time>
                </div>
                {(event.venue || event.location) && (
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-primary/80" aria-hidden />
                    <span>{[event.venue, event.location].filter(Boolean).join(" · ")}</span>
                  </div>
                )}
                {broadcast ? (
                  <p className="text-xs text-muted-foreground/90 pt-1 border-t border-border/40">
                    {broadcast}
                  </p>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

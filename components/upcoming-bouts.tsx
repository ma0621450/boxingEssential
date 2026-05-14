import { OddsEvent } from "@/lib/odds-api";
import { Calendar, Swords } from "lucide-react";

export function UpcomingBouts({ bouts }: { bouts: OddsEvent[] }) {
  if (!bouts || bouts.length === 0) return null;

  return (
    <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-900/10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
              <span className="text-red-600">Upcoming</span> Fights
            </h2>
            <p className="text-zinc-400 mt-2 font-medium">The most anticipated clashes in the squared circle.</p>
          </div>
          <div className="flex items-center text-sm font-semibold text-red-500 uppercase tracking-widest bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20">
            <Calendar className="w-4 h-4 mr-2" /> Official Schedule
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {bouts.slice(0, 6).map((bout) => (
            <div key={bout.id} className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 hover:border-red-600/50 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">
                {new Date(bout.commence_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}
              </div>
              
              <div className="text-zinc-400 text-sm font-semibold mb-6 flex items-center gap-2 mt-2 uppercase tracking-wider">
                <Swords className="w-4 h-4 text-red-500" />
                Main Event Fight
              </div>
              
              <div className="flex justify-between items-center gap-4">
                <div className="flex-1 text-right">
                  <p className="text-2xl md:text-3xl font-black font-sans uppercase tracking-tight text-white group-hover:text-red-500 transition-colors">
                    {bout.home_team.split(' ').slice(-1)[0]}
                  </p>
                  <p className="text-sm text-zinc-500 uppercase tracking-widest">{bout.home_team.split(' ').slice(0, -1).join(' ')}</p>
                </div>
                <div className="text-xl md:text-2xl font-black text-red-600 italic px-4 drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]">
                  VS
                </div>
                <div className="flex-1 text-left">
                  <p className="text-2xl md:text-3xl font-black font-sans uppercase tracking-tight text-white group-hover:text-red-500 transition-colors">
                    {bout.away_team.split(' ').slice(-1)[0]}
                  </p>
                  <p className="text-sm text-zinc-500 uppercase tracking-widest">{bout.away_team.split(' ').slice(0, -1).join(' ')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

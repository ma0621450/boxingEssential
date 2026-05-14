import { Boxer } from "@/lib/openboxing-api";
import { Trophy } from "lucide-react";

export function CurrentChampions({ champions }: { champions: Boxer[] }) {
  if (!champions || champions.length === 0) return null;

  // For the homepage, we only take the top 10 from the passed props. 
  // It's assumed the caller sliced it or we slice it here to avoid a huge list.
  const topChamps = champions.slice(0, 10);

  return (
    <section className="py-24 bg-black text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 border-l-4 border-red-600 pl-6">
          <div className="flex items-center gap-3 mb-2 text-red-500 font-bold tracking-widest uppercase text-sm">
            <Trophy className="w-5 h-5" />
            <span>OpenBoxing Data</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
            Hall of <span className="text-red-600">Champions</span>
          </h2>
          <p className="text-zinc-400 mt-4 max-w-2xl text-lg">
            A look back at some of the greatest to ever hold the world titles. Legends of the sport, immortalized.
          </p>
        </div>

        <div className="flex overflow-x-auto pb-10 gap-6 hide-scrollbar snap-x cursor-grab active:cursor-grabbing">
          {topChamps.map((champ) => (
            <div 
              key={champ.championId} 
              className="flex-none w-72 md:w-80 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black border border-zinc-800 rounded-3xl p-8 snap-center hover:-translate-y-2 hover:border-zinc-700 hover:shadow-[0_20px_40px_-15px_rgba(220,38,38,0.2)] transition-all duration-300"
            >
              <div className="h-20 w-20 bg-gradient-to-br from-red-600/20 to-red-900/40 text-red-500 flex items-center justify-center rounded-2xl mb-8 font-black text-3xl shadow-inner border border-red-500/20">
                {champ.name.first[0]}{champ.name.last[0]}
              </div>
              <h3 className="text-2xl md:text-3xl font-black font-sans tracking-tight mb-2 leading-none">
                {champ.name.first} <span className="text-red-500 block mt-1">{champ.name.last}</span>
              </h3>
              <div className="flex items-center gap-2 mt-4 text-sm text-zinc-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-zinc-600"></span>
                Born: {champ.born ? new Date(champ.born).getFullYear() : "Unknown"}
              </div>
              
              <div className="mt-8 pt-6 border-t border-zinc-800/50 flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Legacy Icon</span>
                <span className="text-xs font-bold bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full border border-zinc-700">
                  ID: #{champ.championId}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}

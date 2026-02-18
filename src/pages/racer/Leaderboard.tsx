import { Trophy, Medal, TrendingUp } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";

const standings = [
  { rank: 1, name: "Elena Storm", country: "🇩🇪", points: 342, wins: 12, podiums: 18, races: 24, bestLap: "1:30.8" },
  { rank: 2, name: "Max Velocity", country: "🇧🇷", points: 318, wins: 9, podiums: 14, races: 24, bestLap: "1:31.5", isMe: true },
  { rank: 3, name: "Jake Thunder", country: "🇺🇸", points: 295, wins: 8, podiums: 13, races: 23, bestLap: "1:31.9" },
  { rank: 4, name: "Rio Masters", country: "🇧🇷", points: 271, wins: 7, podiums: 11, races: 22, bestLap: "1:32.4" },
  { rank: 5, name: "Sarah Connor", country: "🇬🇧", points: 248, wins: 6, podiums: 10, races: 24, bestLap: "1:32.7" },
  { rank: 6, name: "Kai Nakamura", country: "🇯🇵", points: 224, wins: 5, podiums: 9, races: 21, bestLap: "1:33.1" },
  { rank: 7, name: "Luca Ferrari", country: "🇮🇹", points: 198, wins: 4, podiums: 7, races: 20, bestLap: "1:33.5" },
  { rank: 8, name: "Amir Hassan", country: "🇸🇦", points: 175, wins: 3, podiums: 6, races: 19, bestLap: "1:33.8" },
];

const rankIcons: Record<number, { bg: string; text: string }> = {
  1: { bg: "bg-warning/20", text: "text-warning" },
  2: { bg: "bg-muted", text: "text-muted-foreground" },
  3: { bg: "bg-amber-700/20", text: "text-amber-600" },
};

export default function Leaderboard() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader title="LEADERBOARD" subtitle="Season standings — 2026 Championship" />

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[standings[1], standings[0], standings[2]].map((racer, idx) => {
          const displayRank = idx === 0 ? 2 : idx === 1 ? 1 : 3;
          const style = rankIcons[displayRank];
          return (
            <div key={racer.rank} className={`bg-card rounded-xl border p-5 text-center animate-fade-up card-glow ${racer.isMe ? "border-primary/30" : "border-border"} ${displayRank === 1 ? "ring-1 ring-warning/30" : ""}`} style={{ animationDelay: `${idx * 80}ms` }}>
              <div className={`w-12 h-12 rounded-xl ${style.bg} flex items-center justify-center text-xl font-bold font-racing mx-auto mb-3 ${style.text}`}>
                {displayRank}
              </div>
              <p className="text-lg">{racer.country}</p>
              <p className={`font-semibold text-sm mt-1 ${racer.isMe ? "text-primary" : "text-foreground"}`}>{racer.name}</p>
              <p className="text-xl font-bold font-racing text-foreground mt-2">{racer.points}</p>
              <p className="text-xs text-muted-foreground">points</p>
            </div>
          );
        })}
      </div>

      {/* Full Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden animate-fade-up" style={{ animationDelay: "240ms" }}>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {["Rank", "Racer", "Points", "Wins", "Podiums", "Races", "Best Lap"].map((h) => (
                <th key={h} className="text-left px-5 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {standings.map((racer) => {
              const style = rankIcons[racer.rank];
              return (
                <tr key={racer.rank} className={`transition-colors ${racer.isMe ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/30"}`}>
                  <td className="px-5 py-4">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-racing ${style?.bg || "bg-muted"} ${style?.text || "text-muted-foreground"}`}>
                      {racer.rank}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span>{racer.country}</span>
                      <span className={`text-sm font-medium ${racer.isMe ? "text-primary" : "text-foreground"}`}>
                        {racer.name} {racer.isMe && <span className="text-xs text-muted-foreground">(You)</span>}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm font-bold font-racing text-foreground">{racer.points}</td>
                  <td className="px-5 py-4 text-sm text-success font-medium">{racer.wins}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{racer.podiums}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{racer.races}</td>
                  <td className="px-5 py-4 text-sm font-racing text-primary">{racer.bestLap}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

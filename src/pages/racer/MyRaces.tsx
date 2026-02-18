import { Trophy, Timer, Flag, TrendingUp } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";

const races = [
  { id: "R24", track: "Silverstone Circuit", date: "Feb 15, 2026", position: 2, totalRacers: 12, bestLap: "1:32.1", points: 18, vehicle: "Ferrari F40", status: "completed" },
  { id: "R23", track: "Monaco Street Circuit", date: "Feb 8, 2026", position: 3, totalRacers: 8, bestLap: "1:12.9", points: 15, vehicle: "Ferrari F40", status: "completed" },
  { id: "R22", track: "Laguna Seca", date: "Feb 1, 2026", position: 1, totalRacers: 15, bestLap: "1:31.5", points: 25, vehicle: "Ferrari F40", status: "completed" },
  { id: "R21", track: "Nürburgring Nordschleife", date: "Jan 25, 2026", position: 2, totalRacers: 20, bestLap: "7:42.8", points: 18, vehicle: "McLaren 720S", status: "completed" },
  { id: "R20", track: "Silverstone Circuit", date: "Jan 18, 2026", position: 5, totalRacers: 12, bestLap: "1:35.4", points: 10, vehicle: "Porsche 911 GT3", status: "completed" },
  { id: "R25", track: "Silverstone Circuit", date: "Feb 20, 2026", position: 0, totalRacers: 12, bestLap: "—", points: 0, vehicle: "Ferrari F40", status: "upcoming" },
];

const positionColors: Record<number, string> = { 1: "text-warning", 2: "text-muted-foreground", 3: "text-amber-600" };

export default function MyRaces() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader title="MY RACES" subtitle="Your complete race history and upcoming events" />

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Races", value: "24", icon: Flag },
          { label: "Podium Finishes", value: "14", icon: Trophy },
          { label: "Total Points", value: "318", icon: TrendingUp },
        ].map((s, i) => (
          <div key={s.label} className="stat-card animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
              <s.icon className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold font-racing text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {races.map((race, i) => (
          <div key={race.id} className={`bg-card rounded-xl border p-5 card-glow animate-fade-up ${race.status === "upcoming" ? "border-primary/30 bg-primary/5" : "border-border"}`} style={{ animationDelay: `${i * 50}ms` }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {race.status === "upcoming" ? (
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-racing font-bold text-sm border border-primary/30">
                    UP
                  </div>
                ) : (
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold font-racing text-lg ${race.position === 1 ? "bg-warning/20 text-warning" : race.position <= 3 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                    P{race.position}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{race.track}</h3>
                    {race.status === "upcoming" && <span className="badge-status badge-primary text-xs">Upcoming</span>}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span>{race.date}</span>
                    <span>•</span>
                    <span>{race.vehicle}</span>
                    {race.status !== "upcoming" && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Timer className="w-3 h-3" />Best: {race.bestLap}</span>
                      </>
                    )}
                    <span className="font-racing text-primary">#{race.id}</span>
                  </div>
                </div>
              </div>

              {race.status !== "upcoming" && (
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className={`text-lg font-bold font-racing ${positionColors[race.position] || "text-foreground"}`}>
                      {race.position}/{race.totalRacers}
                    </p>
                    <p className="text-xs text-muted-foreground">finish</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold font-racing text-success">+{race.points}</p>
                    <p className="text-xs text-muted-foreground">points</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

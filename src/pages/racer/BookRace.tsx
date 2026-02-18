import { Flag, MapPin, Calendar, Clock, Filter, Search } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";

const availableRaces = [
  { id: "RF-4821", track: "Silverstone Circuit", date: "Feb 20, 2026", time: "10:00 AM", slots: 2, price: "$180", difficulty: "Expert", length: "5.89 km" },
  { id: "RF-4823", track: "Laguna Seca", date: "Feb 25, 2026", time: "9:00 AM", slots: 8, price: "$160", difficulty: "Intermediate", length: "3.60 km" },
  { id: "RF-4824", track: "Nürburgring Nordschleife", date: "Mar 1, 2026", time: "11:00 AM", slots: 17, price: "$320", difficulty: "Expert", length: "20.8 km" },
  { id: "RF-4825", track: "Circuit de la Sarthe", date: "Mar 8, 2026", time: "8:00 AM", slots: 18, price: "$280", difficulty: "Advanced", length: "13.6 km" },
  { id: "RF-4826", track: "Daytona International", date: "Mar 15, 2026", time: "2:00 PM", slots: 12, price: "$200", difficulty: "Intermediate", length: "4.02 km" },
];

const difficultyColors: Record<string, string> = {
  Expert: "badge-danger",
  Advanced: "badge-warning",
  Intermediate: "badge-success",
};

export default function BookRace() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader title="BOOK A RACE" subtitle="Find and reserve your next race slot" />

      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" placeholder="Search tracks..." />
        </div>
        <button className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-card border border-border text-sm text-muted-foreground hover:border-primary/40 transition-colors">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      <div className="space-y-3">
        {availableRaces.map((race, i) => (
          <div key={race.id} className="bg-card rounded-xl border border-border p-5 card-glow animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Flag className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{race.track}</h3>
                    <span className={`badge-status text-xs ${difficultyColors[race.difficulty]}`}>{race.difficulty}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{race.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{race.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{race.length}</span>
                    <span className="text-primary font-racing font-medium">{race.id}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-lg font-bold font-racing text-success">{race.price}</p>
                  <p className="text-xs text-muted-foreground">{race.slots} slots left</p>
                </div>
                <button className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all hover:shadow-glow whitespace-nowrap">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

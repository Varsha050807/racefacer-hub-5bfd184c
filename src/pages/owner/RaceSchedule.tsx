import { CalendarDays, MapPin, Clock, Users } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";

const schedule = [
  { id: "RF-4821", track: "Silverstone Circuit", date: "Feb 20, 2026", time: "10:00 AM", duration: "4h", slots: 12, booked: 10, status: "confirmed" },
  { id: "RF-4822", track: "Monaco Street Circuit", date: "Feb 22, 2026", time: "2:00 PM", duration: "3h", slots: 8, booked: 8, status: "full" },
  { id: "RF-4823", track: "Laguna Seca", date: "Feb 25, 2026", time: "9:00 AM", duration: "5h", slots: 15, booked: 7, status: "confirmed" },
  { id: "RF-4824", track: "Nürburgring Nordschleife", date: "Mar 1, 2026", time: "11:00 AM", duration: "6h", slots: 20, booked: 3, status: "open" },
  { id: "RF-4825", track: "Circuit de la Sarthe", date: "Mar 8, 2026", time: "8:00 AM", duration: "8h", slots: 18, booked: 0, status: "open" },
];

const statusStyles: Record<string, string> = { confirmed: "badge-success", full: "badge-primary", open: "badge-warning" };

export default function RaceSchedule() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader title="RACE SCHEDULE" subtitle="Upcoming events at your tracks" />
      <div className="space-y-3">
        {schedule.map((race, i) => (
          <div key={race.id} className="bg-card rounded-xl border border-border p-5 card-glow animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary font-racing">{race.date.split(" ")[1].replace(",", "")}</span>
                  <span className="text-xs text-muted-foreground">{race.date.split(" ")[0]}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{race.track}</h3>
                    <span className={`badge-status text-xs capitalize ${statusStyles[race.status]}`}>{race.status}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{race.time} • {race.duration}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{race.booked}/{race.slots} booked</span>
                    <span className="font-racing text-primary">{race.id}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="w-24 h-1.5 bg-muted rounded-full mb-1">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${(race.booked / race.slots) * 100}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground">{Math.round((race.booked / race.slots) * 100)}% full</p>
                </div>
                <button className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors border border-primary/20">
                  Manage
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

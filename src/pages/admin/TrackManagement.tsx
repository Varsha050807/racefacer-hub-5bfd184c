import { MapPin, Clock, Users, CheckCircle, AlertCircle, Plus } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import DashboardCard from "@/components/common/DashboardCard";

const tracks = [
  { id: 1, name: "Silverstone Circuit", location: "Northamptonshire, UK", length: "5.89 km", capacity: 150, booked: 142, status: "operational", type: "Formula" },
  { id: 2, name: "Monaco Street Circuit", location: "Monte Carlo, Monaco", length: "3.34 km", capacity: 80, booked: 78, status: "operational", type: "Street" },
  { id: 3, name: "Nürburgring Nordschleife", location: "Nürburg, Germany", length: "20.8 km", capacity: 200, booked: 87, status: "maintenance", type: "Endurance" },
  { id: 4, name: "Circuit de la Sarthe", location: "Le Mans, France", length: "13.6 km", capacity: 120, booked: 0, status: "closed", type: "Endurance" },
  { id: 5, name: "Laguna Seca", location: "California, USA", length: "3.60 km", capacity: 90, booked: 65, status: "operational", type: "Road Course" },
];

const statusStyles: Record<string, string> = {
  operational: "badge-success",
  maintenance: "badge-warning",
  closed: "badge-danger",
};

export default function TrackManagement() {
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="TRACK MANAGEMENT"
        subtitle="Monitor and manage racing venues"
        action={
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" /> Add Track
          </button>
        }
      />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {tracks.map((track, i) => {
          const occupancy = Math.round((track.booked / track.capacity) * 100);
          return (
            <div key={track.id} className="bg-card rounded-xl border border-border p-5 card-glow animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{track.name}</h3>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {track.location}
                  </div>
                </div>
                <span className={`badge-status text-xs ${statusStyles[track.status]} capitalize`}>{track.status}</span>
              </div>

              <div className="grid grid-cols-3 gap-3 my-4">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Length</p>
                  <p className="text-sm font-bold text-foreground font-racing mt-0.5">{track.length}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Capacity</p>
                  <p className="text-sm font-bold text-foreground font-racing mt-0.5">{track.capacity}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="text-xs font-medium text-foreground mt-0.5">{track.type}</p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-muted-foreground">Occupancy</span>
                  <span className={occupancy > 80 ? "text-success" : occupancy > 50 ? "text-warning" : "text-muted-foreground"}>{occupancy}%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${occupancy}%`,
                      background: occupancy > 80 ? "hsl(142 71% 45%)" : occupancy > 50 ? "hsl(38 92% 50%)" : "hsl(199 100% 45%)"
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

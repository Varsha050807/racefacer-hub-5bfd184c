import { Plus, Wrench, CheckCircle, AlertCircle } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";

const vehicles = [
  { id: "RF-001", name: "Ferrari F40", year: 2023, type: "Formula GT", status: "available", races: 42, revenue: "$28,400", lastService: "Jan 30, 2026", nextService: "Apr 30, 2026", image: "🏎️" },
  { id: "RF-002", name: "Porsche 911 GT3", year: 2022, type: "Road Course", status: "in-race", races: 38, revenue: "$24,200", lastService: "Feb 1, 2026", nextService: "May 1, 2026", image: "🚗" },
  { id: "RF-003", name: "Lamborghini Huracán", year: 2024, type: "Super GT", status: "maintenance", races: 29, revenue: "$19,600", lastService: "Jan 15, 2026", nextService: "Mar 15, 2026", image: "🚘" },
  { id: "RF-004", name: "McLaren 720S", year: 2023, type: "Formula GT", status: "available", races: 15, revenue: "$11,200", lastService: "Feb 5, 2026", nextService: "May 5, 2026", image: "🏁" },
];

const statusStyles: Record<string, { badge: string; icon: typeof CheckCircle; label: string }> = {
  available: { badge: "badge-success", icon: CheckCircle, label: "Available" },
  "in-race": { badge: "badge-primary", icon: CheckCircle, label: "In Race" },
  maintenance: { badge: "badge-warning", icon: Wrench, label: "Maintenance" },
};

export default function VehicleManagement() {
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="VEHICLE MANAGEMENT"
        subtitle="Your fleet of racing vehicles"
        action={
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" /> Add Vehicle
          </button>
        }
      />

      <div className="grid md:grid-cols-2 gap-4">
        {vehicles.map((v, i) => {
          const status = statusStyles[v.status];
          const StatusIcon = status.icon;
          return (
            <div key={v.id} className="bg-card rounded-xl border border-border p-6 card-glow animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl">{v.image}</div>
                  <div>
                    <h3 className="font-semibold text-foreground">{v.name}</h3>
                    <p className="text-xs text-muted-foreground">{v.id} • {v.year} • {v.type}</p>
                  </div>
                </div>
                <span className={`badge-status text-xs ${status.badge}`}>
                  <StatusIcon className="w-3 h-3" /> {status.label}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-border mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Total Races</p>
                  <p className="text-lg font-bold text-foreground font-racing">{v.races}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Revenue</p>
                  <p className="text-lg font-bold text-success font-racing">{v.revenue}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Last Service</p>
                  <p className="text-sm font-medium text-foreground">{v.lastService.split(",")[0]}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors border border-primary/20">
                  View Details
                </button>
                <button className="flex-1 py-2 rounded-lg bg-muted text-foreground text-xs font-medium hover:bg-muted/80 transition-colors border border-border">
                  Schedule Service
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

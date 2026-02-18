import { Search, Filter } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";

const bookings = [
  { id: "BK-8821", racer: "Max Velocity", race: "Silverstone Circuit", date: "Feb 20, 2026", vehicle: "Ferrari F40", status: "confirmed", amount: "$180" },
  { id: "BK-8822", racer: "Sarah Connor", race: "Monaco Circuit", date: "Feb 22, 2026", vehicle: "Porsche 911 GT3", status: "confirmed", amount: "$240" },
  { id: "BK-8823", racer: "Jake Thunder", race: "Laguna Seca", date: "Feb 25, 2026", vehicle: "McLaren 720S", status: "pending", amount: "$160" },
  { id: "BK-8824", racer: "Elena Storm", race: "Nürburgring", date: "Mar 1, 2026", vehicle: "Ferrari F40", status: "confirmed", amount: "$320" },
  { id: "BK-8825", racer: "Marcus Reed", race: "Silverstone Circuit", date: "Mar 5, 2026", vehicle: "Lamborghini Huracán", status: "cancelled", amount: "$180" },
  { id: "BK-8826", racer: "Rio Masters", race: "Monaco Circuit", date: "Mar 8, 2026", vehicle: "Porsche 911 GT3", status: "pending", amount: "$240" },
];

const statusBadge: Record<string, string> = { confirmed: "badge-success", pending: "badge-warning", cancelled: "badge-danger" };

export default function Bookings() {
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader title="BOOKINGS" subtitle="All race slot bookings" />
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" placeholder="Search bookings..." />
        </div>
        <button className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-card border border-border text-sm text-muted-foreground hover:border-primary/40 transition-colors">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden animate-fade-up">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {["Booking ID", "Racer", "Race", "Date", "Vehicle", "Amount", "Status"].map((h) => (
                <th key={h} className="text-left px-5 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-5 py-4 text-sm font-racing text-primary">{b.id}</td>
                <td className="px-5 py-4 text-sm font-medium text-foreground">{b.racer}</td>
                <td className="px-5 py-4 text-sm text-muted-foreground">{b.race}</td>
                <td className="px-5 py-4 text-sm text-muted-foreground">{b.date}</td>
                <td className="px-5 py-4 text-sm text-foreground">{b.vehicle}</td>
                <td className="px-5 py-4 text-sm font-medium text-success">{b.amount}</td>
                <td className="px-5 py-4"><span className={`badge-status text-xs capitalize ${statusBadge[b.status]}`}>{b.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

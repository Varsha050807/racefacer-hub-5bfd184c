import { BookOpen, Car, DollarSign, CalendarDays, TrendingUp, Clock } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import StatCard from "@/components/common/StatCard";
import DashboardCard from "@/components/common/DashboardCard";
import PageHeader from "@/components/common/PageHeader";

const earningsData = [
  { week: "W1", earnings: 3200 }, { week: "W2", earnings: 4100 }, { week: "W3", earnings: 3800 },
  { week: "W4", earnings: 5200 }, { week: "W5", earnings: 4700 }, { week: "W6", earnings: 6100 },
  { week: "W7", earnings: 5800 }, { week: "W8", earnings: 7200 },
];

const upcomingRaces = [
  { id: "RF-4821", track: "Silverstone Circuit", date: "Feb 20, 2026", time: "10:00 AM", slots: 12, booked: 10, price: "$180" },
  { id: "RF-4822", track: "Monaco Circuit", date: "Feb 22, 2026", time: "2:00 PM", slots: 8, booked: 8, price: "$240" },
  { id: "RF-4823", track: "Laguna Seca", date: "Feb 25, 2026", time: "9:00 AM", slots: 15, booked: 7, price: "$160" },
  { id: "RF-4824", track: "Nürburgring", date: "Mar 1, 2026", time: "11:00 AM", slots: 20, booked: 3, price: "$320" },
];

const vehicles = [
  { name: "Ferrari F40", plate: "RF-001", status: "available", nextRace: "Feb 20", lastService: "Jan 30" },
  { name: "Porsche 911 GT3", plate: "RF-002", status: "in-race", nextRace: "Feb 22", lastService: "Feb 1" },
  { name: "Lamborghini Huracán", plate: "RF-003", status: "maintenance", nextRace: "Mar 1", lastService: "Jan 15" },
];

const vehicleStatus: Record<string, string> = {
  available: "badge-success",
  "in-race": "badge-primary",
  maintenance: "badge-warning",
};

export default function OwnerDashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="OWNER DASHBOARD"
        subtitle="Manage your fleet and track bookings"
        action={
          <div className="text-right">
            <p className="text-xs text-muted-foreground">This Month</p>
            <p className="text-lg font-bold font-racing glow-text">$7,200</p>
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Today's Bookings" value="8" change="+3" trend="up" icon={BookOpen} delay={0} />
        <StatCard title="Active Vehicles" value="3" change="1 in service" trend="neutral" icon={Car} iconColor="text-warning" delay={80} />
        <StatCard title="Monthly Earnings" value="$7.2K" change="+18.4%" trend="up" icon={DollarSign} iconColor="text-success" delay={160} />
        <StatCard title="Upcoming Races" value="4" change="Next: Feb 20" trend="neutral" icon={CalendarDays} iconColor="text-primary" delay={240} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-4">
        {/* Earnings Chart */}
        <DashboardCard title="Earnings Trend" subtitle="Weekly earnings (USD)" className="lg:col-span-2" delay={300}>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={earningsData}>
              <defs>
                <linearGradient id="earnGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142 71% 45%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(142 71% 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
              <XAxis dataKey="week" tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 15% 18%)", borderRadius: "8px", color: "hsl(210 30% 94%)" }} formatter={(v) => [`$${Number(v).toLocaleString()}`, "Earnings"]} />
              <Area type="monotone" dataKey="earnings" stroke="hsl(142 71% 45%)" strokeWidth={2} fill="url(#earnGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </DashboardCard>

        {/* Vehicle Status */}
        <DashboardCard title="Fleet Status" subtitle="Your vehicles" delay={350}>
          <div className="space-y-3">
            {vehicles.map((v, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/30 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{v.name}</span>
                  <span className={`badge-status text-xs ${vehicleStatus[v.status]} capitalize`}>{v.status}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{v.plate}</span>
                  <span>•</span>
                  <span>Next: {v.nextRace}</span>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      {/* Upcoming Races Table */}
      <DashboardCard title="Upcoming Race Schedule" subtitle="Your booked race slots" delay={400}
        action={<button className="text-xs text-primary hover:underline">View schedule</button>}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Race ID</th>
                <th className="text-left py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Track</th>
                <th className="text-left py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date & Time</th>
                <th className="text-left py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Slots</th>
                <th className="text-left py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {upcomingRaces.map((race) => (
                <tr key={race.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3 text-sm font-racing font-medium text-primary">{race.id}</td>
                  <td className="py-3 text-sm text-foreground">{race.track}</td>
                  <td className="py-3">
                    <p className="text-sm text-foreground">{race.date}</p>
                    <p className="text-xs text-muted-foreground">{race.time}</p>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-muted rounded-full w-16">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${(race.booked / race.slots) * 100}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{race.booked}/{race.slots}</span>
                    </div>
                  </td>
                  <td className="py-3 text-sm font-medium text-success">{race.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>
  );
}

import { Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import PageHeader from "@/components/common/PageHeader";
import DashboardCard from "@/components/common/DashboardCard";

const monthlyRevenue = [
  { month: "Jan", revenue: 42000 }, { month: "Feb", revenue: 51000 }, { month: "Mar", revenue: 47000 },
  { month: "Apr", revenue: 63000 }, { month: "May", revenue: 58000 }, { month: "Jun", revenue: 75000 },
  { month: "Jul", revenue: 82000 }, { month: "Aug", revenue: 79000 },
];

const racesByTrack = [
  { track: "Silverstone", races: 48 }, { track: "Monaco", races: 32 }, { track: "Nürburgring", races: 21 },
  { track: "Laguna Seca", races: 19 }, { track: "Le Mans", races: 14 },
];

const userDistribution = [
  { name: "Racers", value: 342, color: "hsl(199 100% 45%)" },
  { name: "Owners", value: 38, color: "hsl(38 92% 50%)" },
  { name: "Admins", value: 7, color: "hsl(0 72% 51%)" },
];

export default function Reports() {
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="REPORTS"
        subtitle="Platform analytics and performance metrics"
        action={
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border text-sm text-foreground hover:border-primary/40 transition-colors">
            <Download className="w-4 h-4" /> Export PDF
          </button>
        }
      />

      <div className="grid lg:grid-cols-3 gap-4 mb-4">
        <DashboardCard title="Monthly Revenue" subtitle="USD earned per month" className="lg:col-span-2" delay={0}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 15% 18%)", borderRadius: "8px", color: "hsl(210 30% 94%)" }} formatter={(v) => [`$${Number(v).toLocaleString()}`, "Revenue"]} />
              <Bar dataKey="revenue" fill="hsl(199 100% 45%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </DashboardCard>

        <DashboardCard title="User Distribution" subtitle="By role" delay={100}>
          <div className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={userDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" strokeWidth={0}>
                  {userDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 15% 18%)", borderRadius: "8px", color: "hsl(210 30% 94%)" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-1.5 w-full">
              {userDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </DashboardCard>
      </div>

      <DashboardCard title="Races by Track" subtitle="Total races hosted per venue" delay={200}>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={racesByTrack} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" horizontal={false} />
            <XAxis type="number" tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="track" tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
            <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 15% 18%)", borderRadius: "8px", color: "hsl(210 30% 94%)" }} />
            <Bar dataKey="races" fill="hsl(199 100% 45%)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </DashboardCard>
    </div>
  );
}

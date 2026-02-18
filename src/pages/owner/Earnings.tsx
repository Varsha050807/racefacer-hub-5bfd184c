import { DollarSign, TrendingUp, Download } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import PageHeader from "@/components/common/PageHeader";
import DashboardCard from "@/components/common/DashboardCard";
import StatCard from "@/components/common/StatCard";

const monthlyEarnings = [
  { month: "Aug", earnings: 5200 }, { month: "Sep", earnings: 6100 }, { month: "Oct", earnings: 5800 },
  { month: "Nov", earnings: 7200 }, { month: "Dec", earnings: 8100 }, { month: "Jan", earnings: 6900 },
  { month: "Feb", earnings: 7200 },
];

const perVehicle = [
  { vehicle: "Ferrari F40", earnings: 28400 },
  { vehicle: "Porsche 911", earnings: 24200 },
  { vehicle: "Lamborghini", earnings: 19600 },
  { vehicle: "McLaren 720S", earnings: 11200 },
];

const transactions = [
  { id: "TX-991", racer: "Max Velocity", race: "Silverstone", date: "Feb 20", amount: 180, status: "paid" },
  { id: "TX-992", racer: "Sarah Connor", race: "Monaco", date: "Feb 22", amount: 240, status: "paid" },
  { id: "TX-993", racer: "Jake Thunder", race: "Laguna Seca", date: "Feb 25", amount: 160, status: "pending" },
  { id: "TX-994", racer: "Elena Storm", race: "Nürburgring", date: "Mar 1", amount: 320, status: "paid" },
];

export default function Earnings() {
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader title="EARNINGS" subtitle="Financial overview and transactions"
        action={
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border text-sm text-foreground hover:border-primary/40 transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Earnings" value="$83.4K" change="+18.4%" trend="up" icon={DollarSign} iconColor="text-success" delay={0} />
        <StatCard title="This Month" value="$7,200" change="+8.2%" trend="up" icon={TrendingUp} delay={80} />
        <StatCard title="Pending Payout" value="$1,480" change="2 transactions" trend="neutral" icon={DollarSign} iconColor="text-warning" delay={160} />
        <StatCard title="Avg per Race" value="$225" change="+$12" trend="up" icon={TrendingUp} iconColor="text-primary" delay={240} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-4">
        <DashboardCard title="Monthly Earnings" subtitle="Last 7 months" className="lg:col-span-2" delay={300}>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={monthlyEarnings}>
              <defs>
                <linearGradient id="eGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142 71% 45%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(142 71% 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 15% 18%)", borderRadius: "8px", color: "hsl(210 30% 94%)" }} formatter={(v) => [`$${Number(v).toLocaleString()}`, "Earnings"]} />
              <Area type="monotone" dataKey="earnings" stroke="hsl(142 71% 45%)" strokeWidth={2} fill="url(#eGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </DashboardCard>

        <DashboardCard title="By Vehicle" subtitle="Total earnings per car" delay={350}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={perVehicle} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "hsl(215 15% 55%)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <YAxis type="category" dataKey="vehicle" tick={{ fill: "hsl(215 15% 55%)", fontSize: 10 }} axisLine={false} tickLine={false} width={70} />
              <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 15% 18%)", borderRadius: "8px", color: "hsl(210 30% 94%)" }} formatter={(v) => [`$${Number(v).toLocaleString()}`, "Earnings"]} />
              <Bar dataKey="earnings" fill="hsl(199 100% 45%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </DashboardCard>
      </div>

      <DashboardCard title="Recent Transactions" delay={400}>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {["Transaction", "Racer", "Race", "Date", "Amount", "Status"].map((h) => (
                <th key={h} className="text-left pb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transactions.map((t) => (
              <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                <td className="py-3 text-sm font-racing text-primary">{t.id}</td>
                <td className="py-3 text-sm text-foreground">{t.racer}</td>
                <td className="py-3 text-sm text-muted-foreground">{t.race}</td>
                <td className="py-3 text-sm text-muted-foreground">{t.date}</td>
                <td className="py-3 text-sm font-medium text-success">${t.amount}</td>
                <td className="py-3"><span className={`badge-status text-xs ${t.status === "paid" ? "badge-success" : "badge-warning"}`}>{t.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </DashboardCard>
    </div>
  );
}

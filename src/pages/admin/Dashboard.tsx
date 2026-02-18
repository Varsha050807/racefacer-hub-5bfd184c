import { Users, Zap, DollarSign, AlertTriangle, TrendingUp, Shield, Activity } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import StatCard from "@/components/common/StatCard";
import DashboardCard from "@/components/common/DashboardCard";
import PageHeader from "@/components/common/PageHeader";

const revenueData = [
  { month: "Jan", revenue: 42000, target: 38000 },
  { month: "Feb", revenue: 51000, target: 42000 },
  { month: "Mar", revenue: 47000, target: 45000 },
  { month: "Apr", revenue: 63000, target: 50000 },
  { month: "May", revenue: 58000, target: 55000 },
  { month: "Jun", revenue: 75000, target: 60000 },
  { month: "Jul", revenue: 82000, target: 68000 },
];

const userGrowth = [
  { month: "Jan", admins: 5, owners: 18, racers: 142 },
  { month: "Feb", admins: 5, owners: 22, racers: 168 },
  { month: "Mar", admins: 6, owners: 25, racers: 201 },
  { month: "Apr", admins: 6, owners: 30, racers: 248 },
  { month: "May", admins: 7, owners: 35, racers: 294 },
  { month: "Jun", admins: 7, owners: 38, racers: 342 },
];

const alerts = [
  { id: 1, type: "warning", message: "Track B maintenance overdue", time: "2h ago" },
  { id: 2, type: "error", message: "Payment gateway timeout detected", time: "4h ago" },
  { id: 3, type: "info", message: "New Owner registration pending approval", time: "6h ago" },
  { id: 4, type: "success", message: "Monthly backup completed", time: "8h ago" },
];

const recentUsers = [
  { name: "Sarah Connor", role: "racer", joined: "2h ago", status: "active" },
  { name: "Marcus Reed", role: "owner", joined: "5h ago", status: "pending" },
  { name: "Elena Storm", role: "racer", joined: "1d ago", status: "active" },
  { name: "Jake Thunder", role: "racer", joined: "2d ago", status: "active" },
  { name: "Rio Masters", role: "owner", joined: "3d ago", status: "suspended" },
];

const alertColors: Record<string, string> = {
  warning: "badge-warning",
  error: "badge-danger",
  info: "badge-primary",
  success: "badge-success",
};

const statusColors: Record<string, string> = {
  active: "badge-success",
  pending: "badge-warning",
  suspended: "badge-danger",
};

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="ADMIN DASHBOARD"
        subtitle="Platform overview and system health"
        action={
          <div className="flex items-center gap-2 text-xs text-success">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            All systems operational
          </div>
        }
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Users" value="1,247" change="+12.4%" trend="up" icon={Users} delay={0} />
        <StatCard title="Active Races" value="38" change="+3" trend="up" icon={Zap} iconColor="text-warning" delay={80} />
        <StatCard title="Monthly Revenue" value="$82.4K" change="+9.8%" trend="up" icon={DollarSign} iconColor="text-success" delay={160} />
        <StatCard title="System Alerts" value="4" change="2 critical" trend="down" icon={AlertTriangle} iconColor="text-destructive" delay={240} />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-4 mb-4">
        <DashboardCard
          title="Revenue Overview"
          subtitle="Monthly revenue vs target"
          className="lg:col-span-2"
          delay={300}
          action={<span className="badge-status badge-success text-xs">+9.8% MoM</span>}
        >
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(199 100% 45%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(199 100% 45%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142 71% 45%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(142 71% 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 15% 18%)", borderRadius: "8px", color: "hsl(210 30% 94%)" }} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(199 100% 45%)" strokeWidth={2} fill="url(#revGrad)" name="Revenue" />
              <Area type="monotone" dataKey="target" stroke="hsl(142 71% 45%)" strokeWidth={2} fill="url(#targetGrad)" strokeDasharray="4 4" name="Target" />
            </AreaChart>
          </ResponsiveContainer>
        </DashboardCard>

        <DashboardCard title="User Growth" subtitle="By role, last 6 months" delay={350}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 15% 18%)", borderRadius: "8px", color: "hsl(210 30% 94%)" }} />
              <Bar dataKey="racers" fill="hsl(199 100% 45%)" radius={[2, 2, 0, 0]} name="Racers" />
              <Bar dataKey="owners" fill="hsl(38 92% 50%)" radius={[2, 2, 0, 0]} name="Owners" />
              <Bar dataKey="admins" fill="hsl(0 72% 51%)" radius={[2, 2, 0, 0]} name="Admins" />
            </BarChart>
          </ResponsiveContainer>
        </DashboardCard>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* System Alerts */}
        <DashboardCard title="System Alerts" subtitle="Recent platform events" delay={400}
          action={<button className="text-xs text-primary hover:underline">View all</button>}
        >
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/30 transition-colors">
                <span className={`badge-status ${alertColors[alert.type]} text-xs capitalize mt-0.5`}>{alert.type}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* Recent Users */}
        <DashboardCard title="Recent Registrations" subtitle="Newest platform users" delay={450}
          action={<button className="text-xs text-primary hover:underline">Manage users</button>}
        >
          <div className="space-y-2">
            {recentUsers.map((user, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary font-racing flex-shrink-0">
                  {user.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.joined}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`badge-status text-xs capitalize ${user.role === "racer" ? "badge-primary" : "badge-warning"}`}>{user.role}</span>
                  <span className={`badge-status text-xs capitalize ${statusColors[user.status]}`}>{user.status}</span>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}

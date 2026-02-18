import { TrendingUp, Timer, Zap, Target } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";
import PageHeader from "@/components/common/PageHeader";
import DashboardCard from "@/components/common/DashboardCard";
import StatCard from "@/components/common/StatCard";

const lapTimeHistory = [
  { race: "R18", time: 94.2 }, { race: "R19", time: 93.1 }, { race: "R20", time: 95.4 },
  { race: "R21", time: 462.8 / 6 }, { race: "R22", time: 91.5 }, { race: "R23", time: 72.9 },
  { race: "R24", time: 92.1 },
];

const sectorTimes = [
  { sector: "S1", avg: 28.4, best: 27.1 }, { sector: "S2", avg: 34.2, best: 32.8 },
  { sector: "S3", avg: 29.5, best: 28.3 }, { sector: "S4", avg: 31.1, best: 29.9 },
];

const radarData = [
  { skill: "Speed", value: 88 }, { skill: "Cornering", value: 76 }, { skill: "Braking", value: 82 },
  { skill: "Consistency", value: 91 }, { skill: "Strategy", value: 74 }, { skill: "Overtaking", value: 85 },
];

export default function PerformanceStats() {
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader title="PERFORMANCE STATS" subtitle="Detailed analysis of your driving data" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Best Lap Time" value="1:31.5" change="-0.4s PB" trend="up" icon={Timer} delay={0} />
        <StatCard title="Avg Lap Time" value="1:33.2" change="-0.8s" trend="up" icon={TrendingUp} iconColor="text-success" delay={80} />
        <StatCard title="Top Speed" value="284 km/h" change="+6 km/h" trend="up" icon={Zap} iconColor="text-warning" delay={160} />
        <StatCard title="Avg Position" value="2.8" change="-0.5" trend="up" icon={Target} iconColor="text-primary" delay={240} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-4">
        <DashboardCard title="Lap Time Trend" subtitle="Seconds, last 7 races" className="lg:col-span-2" delay={300}>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={lapTimeHistory}>
              <defs>
                <linearGradient id="lapGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(199 100% 45%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(199 100% 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
              <XAxis dataKey="race" tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis reversed tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 15% 18%)", borderRadius: "8px", color: "hsl(210 30% 94%)" }} formatter={(v) => [`${Number(v).toFixed(1)}s`, "Lap Time"]} />
              <Area type="monotone" dataKey="time" stroke="hsl(199 100% 45%)" strokeWidth={2} fill="url(#lapGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </DashboardCard>

        <DashboardCard title="Skill Radar" subtitle="Driving attributes breakdown" delay={340}>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(220 15% 18%)" />
              <PolarAngleAxis dataKey="skill" tick={{ fill: "hsl(215 15% 55%)", fontSize: 10 }} />
              <Radar name="Your Skills" dataKey="value" stroke="hsl(199 100% 45%)" fill="hsl(199 100% 45%)" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </DashboardCard>
      </div>

      <DashboardCard title="Sector Times" subtitle="Average vs best sector times (seconds)" delay={400}>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={sectorTimes}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
            <XAxis dataKey="sector" tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} domain={[25, 36]} />
            <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 15% 18%)", borderRadius: "8px", color: "hsl(210 30% 94%)" }} formatter={(v) => [`${v}s`]} />
            <Bar dataKey="avg" fill="hsl(199 100% 45%)" radius={[4, 4, 0, 0]} name="Average" />
            <Bar dataKey="best" fill="hsl(142 71% 45%)" radius={[4, 4, 0, 0]} name="Best" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardCard>
    </div>
  );
}

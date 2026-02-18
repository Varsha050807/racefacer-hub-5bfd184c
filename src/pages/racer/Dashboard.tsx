import { Flag, Timer, Trophy, TrendingUp, Calendar, Zap } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import StatCard from "@/components/common/StatCard";
import DashboardCard from "@/components/common/DashboardCard";
import PageHeader from "@/components/common/PageHeader";

const performanceTrend = [
  { race: "R18", position: 4, lapTime: 94.2 }, { race: "R19", position: 3, lapTime: 93.1 },
  { race: "R20", position: 5, lapTime: 95.4 }, { race: "R21", position: 2, lapTime: 92.8 },
  { race: "R22", position: 1, lapTime: 91.5 }, { race: "R23", position: 3, lapTime: 92.9 },
  { race: "R24", position: 2, lapTime: 92.1 },
];

const radarData = [
  { skill: "Speed", value: 88 }, { skill: "Cornering", value: 76 }, { skill: "Braking", value: 82 },
  { skill: "Consistency", value: 91 }, { skill: "Strategy", value: 74 }, { skill: "Overtaking", value: 85 },
];

const leaderboard = [
  { rank: 1, name: "Elena Storm", points: 342, wins: 12, country: "🇩🇪" },
  { rank: 2, name: "Max Velocity", points: 318, wins: 9, country: "🇧🇷", isMe: true },
  { rank: 3, name: "Jake Thunder", points: 295, wins: 8, country: "🇺🇸" },
  { rank: 4, name: "Rio Masters", points: 271, wins: 7, country: "🇧🇷" },
  { rank: 5, name: "Sarah Connor", points: 248, wins: 6, country: "🇬🇧" },
];

const raceHistory = [
  { id: "R24", track: "Silverstone", date: "Feb 15", pos: 2, bestLap: "1:32.1", points: 18 },
  { id: "R23", track: "Monaco", date: "Feb 8", pos: 3, bestLap: "1:12.9", points: 15 },
  { id: "R22", track: "Laguna Seca", date: "Feb 1", pos: 1, bestLap: "1:31.5", points: 25 },
  { id: "R21", track: "Nürburgring", date: "Jan 25", pos: 2, bestLap: "7:42.8", points: 18 },
];

export default function RacerDashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="RACER DASHBOARD"
        subtitle="Your performance and upcoming races"
        action={
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Global Rank</p>
              <p className="text-xl font-bold font-racing glow-text">#2</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Races" value="24" change="+3 this month" trend="up" icon={Flag} delay={0} />
        <StatCard title="Best Lap Time" value="1:31.5" change="-0.4s PB" trend="up" icon={Timer} iconColor="text-success" delay={80} />
        <StatCard title="Season Points" value="318" change="+18 last race" trend="up" icon={Zap} iconColor="text-warning" delay={160} />
        <StatCard title="Win Rate" value="37.5%" change="+2.5%" trend="up" icon={Trophy} iconColor="text-primary" delay={240} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-4">
        {/* Next Race */}
        <div className="bg-card rounded-xl border border-primary/30 p-6 card-glow animate-fade-up relative overflow-hidden" style={{ animationDelay: "300ms" }}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-8 translate-x-8" />
          <div className="flex items-center gap-2 mb-4">
            <div className="speed-line w-4" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Next Race</span>
          </div>
          <h3 className="text-xl font-bold text-foreground font-racing mb-1">Silverstone Circuit</h3>
          <p className="text-sm text-muted-foreground mb-4">Feb 20, 2026 • 10:00 AM</p>
          <div className="space-y-2 mb-5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Vehicle</span>
              <span className="text-foreground font-medium">Ferrari F40</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Grid Position</span>
              <span className="text-primary font-bold font-racing">P3</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Track Record</span>
              <span className="text-foreground">1:31.2</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-warning">
            <Calendar className="w-3 h-3" />
            <span>Starts in 2 days</span>
          </div>
        </div>

        {/* Performance Chart */}
        <DashboardCard title="Position Trend" subtitle="Last 7 races" delay={320}>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={performanceTrend}>
              <defs>
                <linearGradient id="posGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(199 100% 45%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(199 100% 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
              <XAxis dataKey="race" tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis reversed tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} domain={[1, 6]} />
              <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 15% 18%)", borderRadius: "8px", color: "hsl(210 30% 94%)" }} formatter={(v) => [`P${v}`, "Position"]} />
              <Area type="monotone" dataKey="position" stroke="hsl(199 100% 45%)" strokeWidth={2} fill="url(#posGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </DashboardCard>

        {/* Skill Radar */}
        <DashboardCard title="Skill Analysis" subtitle="Driving attributes" delay={360}>
          <ResponsiveContainer width="100%" height={180}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(220 15% 18%)" />
              <PolarAngleAxis dataKey="skill" tick={{ fill: "hsl(215 15% 55%)", fontSize: 10 }} />
              <Radar name="Skills" dataKey="value" stroke="hsl(199 100% 45%)" fill="hsl(199 100% 45%)" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </DashboardCard>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Leaderboard Preview */}
        <DashboardCard title="Leaderboard" subtitle="Season standings" delay={400}
          action={<button className="text-xs text-primary hover:underline">Full leaderboard</button>}
        >
          <div className="space-y-2">
            {leaderboard.map((racer) => (
              <div key={racer.rank} className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${racer.isMe ? "bg-primary/10 border border-primary/30" : "hover:bg-muted/50"}`}>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-racing flex-shrink-0 ${racer.rank === 1 ? "bg-warning/20 text-warning" : racer.rank === 2 ? "bg-muted-foreground/20 text-muted-foreground" : racer.rank === 3 ? "bg-amber-700/20 text-amber-600" : "bg-muted text-muted-foreground"}`}>
                  {racer.rank}
                </div>
                <span className="text-sm">{racer.country}</span>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${racer.isMe ? "text-primary" : "text-foreground"}`}>
                    {racer.name} {racer.isMe && <span className="text-xs">(You)</span>}
                  </p>
                  <p className="text-xs text-muted-foreground">{racer.wins} wins</p>
                </div>
                <span className="text-sm font-bold font-racing text-foreground">{racer.points} pts</span>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* Race History */}
        <DashboardCard title="Race History" subtitle="Recent results" delay={440}
          action={<button className="text-xs text-primary hover:underline">All races</button>}
        >
          <div className="space-y-2">
            {raceHistory.map((race) => (
              <div key={race.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold font-racing flex-shrink-0 ${race.pos === 1 ? "bg-warning/20 text-warning" : race.pos <= 3 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                  P{race.pos}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{race.track}</p>
                  <p className="text-xs text-muted-foreground">{race.date} • Best: {race.bestLap}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold font-racing text-success">+{race.points}</p>
                  <p className="text-xs text-muted-foreground">pts</p>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}

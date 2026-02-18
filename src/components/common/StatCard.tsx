import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  delay?: number;
}

export default function StatCard({ title, value, change, trend, icon: Icon, iconColor = "text-primary", delay = 0 }: StatCardProps) {
  return (
    <div
      className="stat-card animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center", `bg-current/10`)}>
          <Icon className={cn("w-5 h-5", iconColor)} />
        </div>
        {change && (
          <div className={cn("flex items-center gap-1 text-xs font-medium",
            trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground"
          )}>
            {trend === "up" && <TrendingUp className="w-3 h-3" />}
            {trend === "down" && <TrendingDown className="w-3 h-3" />}
            {change}
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground font-racing">{value}</p>
        <p className="text-sm text-muted-foreground mt-1">{title}</p>
      </div>
    </div>
  );
}

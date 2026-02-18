import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export default function PageHeader({ title, subtitle, action, className }: PageHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between mb-8 animate-fade-up", className)}>
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="speed-line w-4" />
          <h1 className="text-2xl font-bold font-racing text-foreground">{title}</h1>
        </div>
        {subtitle && <p className="text-muted-foreground text-sm ml-7">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

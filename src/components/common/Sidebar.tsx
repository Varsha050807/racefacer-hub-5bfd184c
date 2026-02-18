import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Users, Map, BarChart3, Settings,
  Car, CalendarDays, BookOpen, DollarSign,
  Flag, Trophy, TrendingUp, Menu, X, ChevronRight
} from "lucide-react";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

const roleNavItems: Record<UserRole, NavItem[]> = {
  admin: [
    { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { label: "User Management", path: "/admin/users", icon: Users },
    { label: "Track Management", path: "/admin/tracks", icon: Map },
    { label: "Reports", path: "/admin/reports", icon: BarChart3 },
    { label: "System Settings", path: "/admin/settings", icon: Settings },
  ],
  owner: [
    { label: "Dashboard", path: "/owner", icon: LayoutDashboard },
    { label: "Vehicle Management", path: "/owner/vehicles", icon: Car },
    { label: "Race Schedule", path: "/owner/schedule", icon: CalendarDays },
    { label: "Bookings", path: "/owner/bookings", icon: BookOpen },
    { label: "Earnings", path: "/owner/earnings", icon: DollarSign },
  ],
  racer: [
    { label: "Dashboard", path: "/racer", icon: LayoutDashboard },
    { label: "Book Race", path: "/racer/book", icon: Flag },
    { label: "My Races", path: "/racer/races", icon: Car },
    { label: "Performance Stats", path: "/racer/stats", icon: TrendingUp },
    { label: "Leaderboard", path: "/racer/leaderboard", icon: Trophy },
  ],
};

const roleLabels: Record<UserRole, string> = {
  admin: "Administration",
  owner: "Owner Portal",
  racer: "Racer Hub",
};

const roleBadgeColors: Record<UserRole, string> = {
  admin: "badge-danger",
  owner: "badge-warning",
  racer: "badge-primary",
};

export default function Sidebar() {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;
  const items = roleNavItems[user.role];

  return (
    <>
      {/* Mobile overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-background/80 z-30 lg:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      <aside
        className={cn(
          "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 z-40",
          "fixed lg:sticky top-0 h-screen",
          collapsed ? "w-14" : "w-60"
        )}
      >
        {/* Toggle */}
        <div className="h-16 flex items-center justify-end px-3 border-b border-sidebar-border flex-shrink-0">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-8 h-8 rounded-lg bg-sidebar-accent flex items-center justify-center hover:bg-sidebar-accent/80 transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Role Badge */}
        {!collapsed && (
          <div className="px-3 py-3 border-b border-sidebar-border">
            <div className="flex items-center gap-2">
              <div className="speed-line w-4" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {roleLabels[user.role]}
              </span>
            </div>
            <span className={cn("badge-status mt-1.5 text-xs capitalize", roleBadgeColors[user.role])}>
              {user.role}
            </span>
          </div>
        )}

        {/* Nav Items */}
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path.split("/").length <= 2}
              className={({ isActive }) =>
                cn("sidebar-item", isActive && "active", collapsed && "justify-center")
              }
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="p-3 border-t border-sidebar-border">
            <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg">
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold font-racing flex-shrink-0">
                {user.avatar}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

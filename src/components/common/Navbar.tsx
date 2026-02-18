import { Bell, ChevronDown, LogOut, User, Settings } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const roleColors: Record<string, string> = {
  admin: "badge-danger",
  owner: "badge-warning",
  racer: "badge-primary",
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { id: 1, text: "Race at Silverstone starts in 2h", time: "2h ago", unread: true },
    { id: 2, text: "New booking confirmed #RF-4821", time: "4h ago", unread: true },
    { id: 3, text: "System maintenance scheduled", time: "1d ago", unread: false },
  ];

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-40">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center pulse-glow">
            <span className="text-primary-foreground font-racing font-bold text-sm">R</span>
          </div>
        </div>
        <span className="font-racing font-bold text-lg tracking-wider glow-text">
          RACE<span className="text-foreground">FACER</span>
        </span>
        <div className="speed-line w-8 ml-1 opacity-60" />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setDropdownOpen(false); }}
            className="relative w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-card-elevated transition-colors"
          >
            <Bell className="w-4 h-4 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-11 w-80 bg-card border border-border rounded-xl shadow-elevated z-50 overflow-hidden animate-fade-up">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <span className="font-semibold text-sm">Notifications</span>
                <span className="badge-status badge-primary text-xs">2 new</span>
              </div>
              <div>
                {notifications.map((n) => (
                  <div key={n.id} className={`p-4 border-b border-border hover:bg-muted/50 transition-colors ${n.unread ? "bg-primary/5" : ""}`}>
                    <div className="flex gap-3 items-start">
                      {n.unread && <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />}
                      {!n.unread && <div className="w-1.5 h-1.5 flex-shrink-0" />}
                      <div>
                        <p className="text-sm text-foreground">{n.text}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setDropdownOpen(!dropdownOpen); setNotifOpen(false); }}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-secondary hover:bg-card-elevated transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold font-racing">
              {user?.avatar}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5 capitalize">{user?.role}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 top-12 w-52 bg-card border border-border rounded-xl shadow-elevated z-50 overflow-hidden animate-fade-up">
              <div className="p-3 border-b border-border">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
                <span className={`badge-status mt-1.5 text-xs capitalize ${roleColors[user?.role || "racer"]}`}>
                  {user?.role}
                </span>
              </div>
              <div className="p-1">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors">
                  <User className="w-4 h-4" /> Profile
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors">
                  <Settings className="w-4 h-4" /> Settings
                </button>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay to close dropdowns */}
      {(dropdownOpen || notifOpen) && (
        <div className="fixed inset-0 z-30" onClick={() => { setDropdownOpen(false); setNotifOpen(false); }} />
      )}
    </header>
  );
}

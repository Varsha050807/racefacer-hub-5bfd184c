import { Search, Filter, Plus, MoreHorizontal, Shield, User, Car } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";

const users = [
  { id: 1, name: "Alex Carter", email: "admin@racefacer.com", role: "admin", status: "active", joined: "Jan 15, 2024", races: 0 },
  { id: 2, name: "Jordan Blake", email: "owner@racefacer.com", role: "owner", status: "active", joined: "Feb 3, 2024", races: 0 },
  { id: 3, name: "Max Velocity", email: "racer@racefacer.com", role: "racer", status: "active", joined: "Mar 10, 2024", races: 24 },
  { id: 4, name: "Sarah Connor", email: "sarah@racefacer.com", role: "racer", status: "active", joined: "Apr 5, 2024", races: 18 },
  { id: 5, name: "Marcus Reed", email: "marcus@racefacer.com", role: "owner", status: "pending", joined: "May 20, 2024", races: 0 },
  { id: 6, name: "Elena Storm", email: "elena@racefacer.com", role: "racer", status: "active", joined: "Jun 1, 2024", races: 11 },
  { id: 7, name: "Jake Thunder", email: "jake@racefacer.com", role: "racer", status: "suspended", joined: "Jun 15, 2024", races: 6 },
  { id: 8, name: "Rio Masters", email: "rio@racefacer.com", role: "owner", status: "suspended", joined: "Jul 2, 2024", races: 0 },
];

const roleIcons = { admin: Shield, owner: Car, racer: User };
const roleBadge: Record<string, string> = { admin: "badge-danger", owner: "badge-warning", racer: "badge-primary" };
const statusBadge: Record<string, string> = { active: "badge-success", pending: "badge-warning", suspended: "badge-danger" };

export default function UserManagement() {
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="USER MANAGEMENT"
        subtitle="Manage platform users across all roles"
        action={
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" /> Add User
          </button>
        }
      />

      {/* Controls */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" placeholder="Search users..." />
        </div>
        <button className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-card border border-border text-sm text-muted-foreground hover:border-primary/40 transition-colors">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden animate-fade-up">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">User</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Role</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Joined</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Races</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => {
                const RoleIcon = roleIcons[user.role as keyof typeof roleIcons];
                return (
                  <tr key={user.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary font-racing">
                          {user.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`badge-status text-xs capitalize ${roleBadge[user.role]}`}>
                        <RoleIcon className="w-3 h-3" /> {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`badge-status text-xs capitalize ${statusBadge[user.status]}`}>{user.status}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{user.joined}</td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground font-racing">{user.races}</td>
                    <td className="px-6 py-4">
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-muted text-muted-foreground">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

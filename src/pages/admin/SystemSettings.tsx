import { Settings, Bell, Shield, Database, Palette, Save } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import DashboardCard from "@/components/common/DashboardCard";

export default function SystemSettings() {
  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader title="SYSTEM SETTINGS" subtitle="Platform configuration and preferences" />

      <div className="space-y-4">
        {/* General */}
        <DashboardCard title="General Settings" delay={0}>
          <div className="space-y-4">
            {[
              { label: "Platform Name", value: "Racefacer" },
              { label: "Support Email", value: "support@racefacer.com" },
              { label: "Default Timezone", value: "UTC+0" },
            ].map((field) => (
              <div key={field.label} className="flex items-center gap-4">
                <label className="text-sm text-muted-foreground w-40 flex-shrink-0">{field.label}</label>
                <input defaultValue={field.value} className="flex-1 px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground focus:outline-none focus:border-primary transition-colors" />
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* Notifications */}
        <DashboardCard title="Notification Settings" delay={100}>
          <div className="space-y-3">
            {[
              { label: "Email alerts for new registrations", enabled: true },
              { label: "SMS alerts for system errors", enabled: false },
              { label: "Weekly revenue summary", enabled: true },
              { label: "Race booking confirmations", enabled: true },
            ].map((setting) => (
              <div key={setting.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm text-foreground">{setting.label}</span>
                <div className={`w-10 h-5 rounded-full transition-colors cursor-pointer ${setting.enabled ? "bg-primary" : "bg-muted"} relative`}>
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-foreground transition-all ${setting.enabled ? "left-5" : "left-0.5"}`} />
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* Security */}
        <DashboardCard title="Security" delay={200}>
          <div className="space-y-3">
            {[
              { label: "Two-factor authentication", enabled: true },
              { label: "Session timeout (30 min)", enabled: true },
              { label: "IP whitelisting", enabled: false },
            ].map((setting) => (
              <div key={setting.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm text-foreground">{setting.label}</span>
                <div className={`w-10 h-5 rounded-full transition-colors cursor-pointer ${setting.enabled ? "bg-primary" : "bg-muted"} relative`}>
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-foreground transition-all ${setting.enabled ? "left-5" : "left-0.5"}`} />
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        <div className="flex justify-end">
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

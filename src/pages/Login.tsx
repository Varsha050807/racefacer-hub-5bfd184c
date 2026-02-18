import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, Zap } from "lucide-react";
import loginBg from "@/assets/login-bg.jpg";

const demoCredentials = [
  { role: "Admin", email: "admin@racefacer.com", password: "admin123", color: "badge-danger" },
  { role: "Owner", email: "owner@racefacer.com", password: "owner123", color: "badge-warning" },
  { role: "Racer", email: "racer@racefacer.com", password: "racer123", color: "badge-primary" },
];

const roleRedirects: Record<string, string> = {
  admin: "/admin",
  owner: "/owner",
  racer: "/racer",
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const success = login(email, password);
    if (success) {
      const storedUser = JSON.parse(localStorage.getItem("racefacer_user") || "{}");
      navigate(roleRedirects[storedUser.role] || "/");
    } else {
      setError("Invalid credentials. Use the demo accounts below.");
    }
    setLoading(false);
  };

  const fillCredentials = (cred: typeof demoCredentials[0]) => {
    setEmail(cred.email);
    setPassword(cred.password);
    setError("");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Form Panel */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-16 bg-background z-10 relative">
        {/* Logo */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center pulse-glow">
              <span className="text-primary-foreground font-racing font-bold text-lg">R</span>
            </div>
            <span className="font-racing font-bold text-2xl tracking-wider">
              <span className="glow-text">RACE</span>
              <span className="text-foreground">FACER</span>
            </span>
          </div>
          <div className="speed-line w-16 mt-1" />
          <p className="text-muted-foreground text-sm mt-3">Racing Management Platform</p>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to access your dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@racefacer.com"
              required
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all duration-200 hover:shadow-glow disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground font-medium">DEMO CREDENTIALS</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid gap-2">
            {demoCredentials.map((cred) => (
              <button
                key={cred.role}
                onClick={() => fillCredentials(cred)}
                className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/40 hover:bg-card-elevated transition-all text-left group"
              >
                <span className={`badge-status ${cred.color} text-xs w-14 justify-center`}>
                  {cred.role}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground">{cred.email}</p>
                  <p className="text-xs text-muted-foreground">{cred.password}</p>
                </div>
                <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                  Use →
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Background Image */}
      <div className="hidden lg:block flex-1 relative overflow-hidden">
        <img
          src={loginBg}
          alt="Racing track"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/20 to-background" />
        <div className="absolute inset-0 bg-background/40" />
        {/* Overlay text */}
        <div className="absolute bottom-12 left-12 right-12">
          <div className="speed-line w-12 mb-4" />
          <h2 className="font-racing text-3xl font-bold text-foreground mb-2">
            Built for<br />
            <span className="glow-text">Speed.</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-xs">
            Manage races, track bookings, and monitor performance — all in one place.
          </p>
        </div>
      </div>
    </div>
  );
}

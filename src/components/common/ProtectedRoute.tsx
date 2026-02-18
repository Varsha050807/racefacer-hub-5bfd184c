import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import MainLayout from "@/layouts/MainLayout";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRole: UserRole;
}

export default function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center pulse-glow">
            <span className="text-primary-foreground font-racing font-bold text-xl">R</span>
          </div>
          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== allowedRole) {
    const redirects: Record<UserRole, string> = { admin: "/admin", owner: "/owner", racer: "/racer" };
    return <Navigate to={redirects[user.role]} replace />;
  }

  return <MainLayout>{children}</MainLayout>;
}

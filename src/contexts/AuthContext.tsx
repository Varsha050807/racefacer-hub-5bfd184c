import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "admin" | "owner" | "racer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const DEMO_USERS: Record<string, { password: string; user: User }> = {
  "admin@racefacer.com": {
    password: "admin123",
    user: { id: "1", name: "Alex Carter", email: "admin@racefacer.com", role: "admin", avatar: "AC" },
  },
  "owner@racefacer.com": {
    password: "owner123",
    user: { id: "2", name: "Jordan Blake", email: "owner@racefacer.com", role: "owner", avatar: "JB" },
  },
  "racer@racefacer.com": {
    password: "racer123",
    user: { id: "3", name: "Max Velocity", email: "racer@racefacer.com", role: "racer", avatar: "MV" },
  },
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("racefacer_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("racefacer_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    const match = DEMO_USERS[email.toLowerCase()];
    if (match && match.password === password) {
      const u = match.user;
      setUser(u);
      localStorage.setItem("racefacer_user", JSON.stringify(u));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("racefacer_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

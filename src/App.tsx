import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/common/ProtectedRoute";

import LoginPage from "./pages/Login";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import TrackManagement from "./pages/admin/TrackManagement";
import Reports from "./pages/admin/Reports";
import SystemSettings from "./pages/admin/SystemSettings";

// Owner pages
import OwnerDashboard from "./pages/owner/Dashboard";
import VehicleManagement from "./pages/owner/VehicleManagement";
import RaceSchedule from "./pages/owner/RaceSchedule";
import Bookings from "./pages/owner/Bookings";
import Earnings from "./pages/owner/Earnings";

// Racer pages
import RacerDashboard from "./pages/racer/Dashboard";
import BookRace from "./pages/racer/BookRace";
import MyRaces from "./pages/racer/MyRaces";
import PerformanceStats from "./pages/racer/PerformanceStats";
import Leaderboard from "./pages/racer/Leaderboard";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute allowedRole="admin"><UserManagement /></ProtectedRoute>} />
            <Route path="/admin/tracks" element={<ProtectedRoute allowedRole="admin"><TrackManagement /></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute allowedRole="admin"><Reports /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute allowedRole="admin"><SystemSettings /></ProtectedRoute>} />

            {/* Owner Routes */}
            <Route path="/owner" element={<ProtectedRoute allowedRole="owner"><OwnerDashboard /></ProtectedRoute>} />
            <Route path="/owner/vehicles" element={<ProtectedRoute allowedRole="owner"><VehicleManagement /></ProtectedRoute>} />
            <Route path="/owner/schedule" element={<ProtectedRoute allowedRole="owner"><RaceSchedule /></ProtectedRoute>} />
            <Route path="/owner/bookings" element={<ProtectedRoute allowedRole="owner"><Bookings /></ProtectedRoute>} />
            <Route path="/owner/earnings" element={<ProtectedRoute allowedRole="owner"><Earnings /></ProtectedRoute>} />

            {/* Racer Routes */}
            <Route path="/racer" element={<ProtectedRoute allowedRole="racer"><RacerDashboard /></ProtectedRoute>} />
            <Route path="/racer/book" element={<ProtectedRoute allowedRole="racer"><BookRace /></ProtectedRoute>} />
            <Route path="/racer/races" element={<ProtectedRoute allowedRole="racer"><MyRaces /></ProtectedRoute>} />
            <Route path="/racer/stats" element={<ProtectedRoute allowedRole="racer"><PerformanceStats /></ProtectedRoute>} />
            <Route path="/racer/leaderboard" element={<ProtectedRoute allowedRole="racer"><Leaderboard /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

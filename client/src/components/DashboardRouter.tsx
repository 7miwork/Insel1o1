import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { authService, User } from "@/lib/auth-service";
import StudentDashboard from "@/pages/StudentDashboard";
import ProfessionalDashboard from "@/pages/ProfessionalDashboard";
import ParentDashboard from "@/pages/ParentDashboard";
import TeacherDashboard from "@/pages/TeacherDashboard";
import AdminDashboard from "@/pages/AdminDashboard";

export default function DashboardRouter() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      setLocation("/login");
    } else {
      setUser(currentUser);
      setLoading(false);
    }
  }, [setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-slate-200 border-t-slate-600 rounded-full animate-spin"></div>
          <p className="text-sm text-slate-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Route: professional users go to specialized dashboards
  if (user.role === "parent") {
    return <ParentDashboard />;
  }

  if (user.role === "teacher") {
    return <TeacherDashboard />;
  }

  if (user.role === "admin") {
    return <AdminDashboard />;
  }

  // Route students to their adventure dashboard
  if (user.role === "student") {
    return <StudentDashboard />;
  }

  // Default: professional dashboard (for unknown roles)
  return <ProfessionalDashboard user={user} />;
}

import { useState } from "react";
import { useLocation } from "wouter";
import { LogOut, Menu, X, BarChart3, Users, Settings, Bell, TrendingUp, Award } from "lucide-react";
import { authService, User } from "@/lib/auth-service";
import { useI18n } from "@/contexts/I18nContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import ParentDashboard from "./ParentDashboard";
import TeacherDashboard from "./TeacherDashboard";
import AdminDashboard from "./AdminDashboard";

export default function ProfessionalDashboard({ user }: { user: User }) {
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useI18n();

  // Route to appropriate dashboard based on role
  if (user.role === 'parent') {
    return <ParentDashboard />;
  }
  if (user.role === 'teacher') {
    return <TeacherDashboard />;
  }
  if (user.role === 'admin') {
    return <AdminDashboard />;
  }

  const handleLogout = async () => {
    await authService.logout();
    setLocation("/");
  };

  const getRoleLabel = (role: string) => {
    const roleLabels: Record<string, string> = {
      teacher: "Teacher Dashboard",
      parent: "Parent Portal",
      admin: "Admin Console",
      school: "School Management",
    };
    return roleLabels[role] || "Dashboard";
  };

  const getMenuItems = (role: string) => {
    const baseItems = [
      { icon: "📊", label: "Overview", active: true },
      { icon: "👥", label: "Users", active: false },
      { icon: "📈", label: "Analytics", active: false },
      { icon: "⚙️", label: "Settings", active: false },
    ];
    return baseItems;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f9fa" }}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 z-50 transform transition-transform md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          backgroundColor: "#ffffff",
          borderRight: "1px solid #e5e7eb",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: "#3b82f6" }}
            >
              📚
            </div>
            <span className="text-xl font-bold text-gray-900">Dao-Yu-101</span>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 mb-8">
            {getMenuItems(user.role).map((item, idx) => (
              <button
                key={idx}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-gray-700 hover:bg-gray-50"
                style={{
                  backgroundColor: item.active ? "#f3f4f6" : "transparent",
                  borderLeft: item.active ? "3px solid #3b82f6" : "3px solid transparent",
                }}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="absolute bottom-6 left-6 right-6 space-y-3">
            <LanguageSwitcher />
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 rounded-lg font-medium flex items-center gap-2 transition"
              style={{
                backgroundColor: "#fee2e2",
                color: "#dc2626",
              }}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64">
        {/* Top Navigation */}
        <nav
          className="sticky top-0 z-40 border-b"
          style={{
            backgroundColor: "#ffffff",
            borderColor: "#e5e7eb",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div className="px-6 py-4 flex items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden text-gray-700 hover:text-gray-900"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <h1 className="text-2xl font-bold text-gray-900">{getRoleLabel(user.role)}</h1>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.firstName}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
                <img
                  src={user.avatar}
                  alt={user.firstName}
                  className="w-10 h-10 rounded-full"
                />
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="p-6 md:p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Total Students", value: "2,450", icon: "👥", color: "#3b82f6" },
              { label: "Active Courses", value: "12", icon: "📚", color: "#10b981" },
              { label: "Avg. Performance", value: "78%", icon: "📈", color: "#f59e0b" },
              { label: "Completion Rate", value: "85%", icon: "✓", color: "#8b5cf6" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="rounded-xl p-6 border transition hover:shadow-lg"
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "#e5e7eb",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{stat.icon}</span>
                  <span
                    className="text-xs font-bold px-2 py-1 rounded"
                    style={{
                      backgroundColor: `${stat.color}20`,
                      color: stat.color,
                    }}
                  >
                    +12%
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Admin/School Dashboard Content */}
          <div
            className="rounded-xl p-6 border"
            style={{
              backgroundColor: "#ffffff",
              borderColor: "#e5e7eb",
            }}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-6">{getRoleLabel(user.role)}</h3>
            <p className="text-gray-600">Welcome to your {user.role} dashboard. More features coming soon!</p>
          </div>
        </div>
      </main>
    </div>
  );
}

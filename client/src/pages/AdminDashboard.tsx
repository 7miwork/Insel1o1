import { useState } from "react";
import { useLocation } from "wouter";
import { LogOut, Menu, X, Bell, Users, Building2, BarChart3, Settings, AlertCircle, TrendingUp, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { authService } from "@/lib/auth-service";
import { useI18n } from "@/contexts/I18nContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { mockSystemStats, mockActivityLogs, mockRevenueData, mockUserDistribution, mockEngagementData, mockSystemAlerts, mockUsers, mockSchools } from "@/data/admin-data";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'schools' | 'activity' | 'settings'>('overview');
  const { t } = useI18n();

  const handleLogout = async () => {
    await authService.logout();
    setLocation("/");
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'schools', label: 'Schools', icon: '🏫' },
    { id: 'activity', label: 'Activity', icon: '📋' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const renderOverviewTab = () => (
    <div className="space-y-8">
      {/* System Alerts */}
      {mockSystemAlerts.some(a => !a.resolved) && (
        <div className="space-y-3">
          {mockSystemAlerts.filter(a => !a.resolved).map((alert) => (
            <div
              key={alert.id}
              className="rounded-lg p-4 border-l-4 flex items-start gap-4"
              style={{
                backgroundColor: alert.type === 'error' ? '#fef2f2' : alert.type === 'warning' ? '#fffbeb' : '#f0f9ff',
                borderColor: alert.type === 'error' ? '#ef4444' : alert.type === 'warning' ? '#f59e0b' : '#3b82f6',
              }}
            >
              <AlertCircle
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                style={{
                  color: alert.type === 'error' ? '#ef4444' : alert.type === 'warning' ? '#f59e0b' : '#3b82f6',
                }}
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: mockSystemStats.totalUsers.toLocaleString(), icon: '👥', color: '#3b82f6' },
          { label: 'Total Schools', value: mockSystemStats.totalSchools, icon: '🏫', color: '#10b981' },
          { label: 'Active Users (24h)', value: mockSystemStats.activeUsers24h.toLocaleString(), icon: '🟢', color: '#f59e0b' },
          { label: 'System Uptime', value: `${mockSystemStats.systemUptime}%`, icon: '⬆️', color: '#8b5cf6' },
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
                ↑ 12%
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div
          className="lg:col-span-2 rounded-xl p-6 border"
          style={{
            backgroundColor: "#ffffff",
            borderColor: "#e5e7eb",
          }}
        >
          <h3 className="text-lg font-bold text-gray-900 mb-6">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockRevenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Distribution */}
        <div
          className="rounded-xl p-6 border"
          style={{
            backgroundColor: "#ffffff",
            borderColor: "#e5e7eb",
          }}
        >
          <h3 className="text-lg font-bold text-gray-900 mb-6">User Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockUserDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {mockUserDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {mockUserDistribution.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-bold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement Chart */}
      <div
        className="rounded-xl p-6 border"
        style={{
          backgroundColor: "#ffffff",
          borderColor: "#e5e7eb",
        }}
      >
        <h3 className="text-lg font-bold text-gray-900 mb-6">Weekly Engagement</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockEngagementData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <Line type="monotone" dataKey="engagement" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderUsersTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <button
          className="px-4 py-2 rounded-lg font-medium text-white transition"
          style={{ backgroundColor: '#3b82f6' }}
        >
          + Add User
        </button>
      </div>

      <div
        className="rounded-xl border overflow-hidden"
        style={{
          backgroundColor: "#ffffff",
          borderColor: "#e5e7eb",
        }}
      >
        <table className="w-full">
          <thead style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Role</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Login</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{user.firstName} {user.lastName}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: '#dbeafe',
                      color: '#1e40af',
                    }}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: user.status === 'active' ? '#dcfce7' : '#fee2e2',
                      color: user.status === 'active' ? '#166534' : '#991b1b',
                    }}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{new Date(user.lastLogin).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button className="text-blue-600 hover:text-blue-700 font-medium">Edit</button>
                  <button className="text-red-600 hover:text-red-700 font-medium">Suspend</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSchoolsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">School Management</h2>
        <button
          className="px-4 py-2 rounded-lg font-medium text-white transition"
          style={{ backgroundColor: '#3b82f6' }}
        >
          + Add School
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSchools.map((school) => (
          <div
            key={school.id}
            className="rounded-xl p-6 border"
            style={{
              backgroundColor: "#ffffff",
              borderColor: "#e5e7eb",
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{school.name}</h3>
                <p className="text-sm text-gray-600">{school.city}, {school.country}</p>
              </div>
              <span
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: school.status === 'active' ? '#dcfce7' : '#fee2e2',
                  color: school.status === 'active' ? '#166534' : '#991b1b',
                }}
              >
                {school.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-y border-gray-200">
              <div>
                <p className="text-2xl font-bold text-gray-900">{school.studentCount}</p>
                <p className="text-xs text-gray-600">Students</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{school.teacherCount}</p>
                <p className="text-xs text-gray-600">Teachers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{school.classCount}</p>
                <p className="text-xs text-gray-600">Classes</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600"><strong>Principal:</strong> {school.principalName}</p>
              <p className="text-sm text-gray-600"><strong>Plan:</strong> <span className="font-semibold capitalize">{school.subscriptionPlan}</span></p>
              <p className="text-sm text-gray-600"><strong>Expires:</strong> {new Date(school.subscriptionEndDate).toLocaleDateString()}</p>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition">Edit</button>
              <button className="flex-1 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition">Deactivate</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderActivityTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">System Activity</h2>

      <div
        className="rounded-xl border overflow-hidden"
        style={{
          backgroundColor: "#ffffff",
          borderColor: "#e5e7eb",
        }}
      >
        <table className="w-full">
          <thead style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">User</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Details</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Time</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockActivityLogs.map((log) => (
              <tr key={log.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{log.userName}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{log.action}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{log.details}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{new Date(log.timestamp).toLocaleString()}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: log.status === 'success' ? '#dcfce7' : '#fee2e2',
                      color: log.status === 'success' ? '#166534' : '#991b1b',
                    }}
                  >
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: 'Email Configuration', description: 'Configure email settings for notifications' },
          { title: 'API Keys', description: 'Manage API keys and integrations' },
          { title: 'Security Settings', description: 'Configure security policies and 2FA' },
          { title: 'Backup & Recovery', description: 'Configure automated backups' },
          { title: 'Maintenance Mode', description: 'Enable/disable maintenance mode' },
          { title: 'System Logs', description: 'View and export system logs' },
        ].map((setting, idx) => (
          <div
            key={idx}
            className="rounded-xl p-6 border flex items-center justify-between"
            style={{
              backgroundColor: "#ffffff",
              borderColor: "#e5e7eb",
            }}
          >
            <div>
              <h3 className="font-semibold text-gray-900">{setting.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{setting.description}</p>
            </div>
            <button
              className="px-4 py-2 rounded-lg font-medium text-white transition"
              style={{ backgroundColor: '#3b82f6' }}
            >
              Configure
            </button>
          </div>
        ))}
      </div>
    </div>
  );

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
              ⚙️
            </div>
            <span className="text-xl font-bold text-gray-900">Dao-Yu-101</span>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 mb-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-gray-700 hover:bg-gray-50"
                style={{
                  backgroundColor: activeTab === item.id ? "#f3f4f6" : "transparent",
                  borderLeft: activeTab === item.id ? "3px solid #3b82f6" : "3px solid transparent",
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
              <h1 className="text-2xl font-bold text-gray-900">Admin Console</h1>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">System Administrator</p>
                </div>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: "#3b82f6" }}
                >
                  A
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="p-6 md:p-8">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'users' && renderUsersTab()}
          {activeTab === 'schools' && renderSchoolsTab()}
          {activeTab === 'activity' && renderActivityTab()}
          {activeTab === 'settings' && renderSettingsTab()}
        </div>
      </main>
    </div>
  );
}

import React, { useState } from "react";
import { useLocation } from "wouter";
import {
  Home,
  BookOpen,
  BarChart3,
  Settings,
  Users,
  GraduationCap,
  CheckCircle2,
  TrendingUp,
  Plus,
  Shield,
  Building2,
  Server,
  Bell,
  FileText,
  Search,
  Eye,
  Edit3,
  Archive,
  AlertTriangle,
  Clock,
  UserX,
  Key,
  ClipboardList,
  BookMarked,
  Target,
  Activity,
  Calendar,
  ToggleLeft,
  History,
  LogOut,
  ShieldAlert,
  Fingerprint,
  X,
  Download,
  ArrowUpRight,
} from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { authService } from "@/lib/auth-service";
import { useAdminDashboardData } from "@/hooks/useAdminDashboardData";
import {
  DashboardLayout,
  type DashboardNavItem,
} from "@/components/DashboardLayout";
import { StatCard, SectionHeading } from "@/components/DashboardWidgets";

/* ── DEMO DATA (keine echte Systemüberwachung vorhanden) ── */
const SYSTEM_HEALTH = [
  { name: "Application Server", status: "healthy" as const, uptime: "99.97%", detail: "All endpoints responding normally" },
  { name: "Database", status: "healthy" as const, uptime: "99.99%", detail: "PostgreSQL cluster — 2 replicas" },
  { name: "API Gateway", status: "healthy" as const, uptime: "99.95%", detail: "Rate limiting active, no throttling" },
  { name: "CDN / Static Assets", status: "warning" as const, uptime: "99.80%", detail: "Elevated latency in EU-West region" },
  { name: "Email Service", status: "healthy" as const, uptime: "99.90%", detail: "SMTP queue normal" },
  { name: "Backup Service", status: "healthy" as const, uptime: "100%", detail: "Last backup: 2 hours ago" },
];

/* ── MAIN COMPONENT ── */
export default function AdminDashboard() {
  const { t } = useI18n();
  const [, setLocation] = useLocation();
  const [selectedTab, setSelectedTab] = useState<string>("overview");
  const adminData = useAdminDashboardData();

  const user = authService.getCurrentUser();
  const adminName = user?.firstName ?? "Admin";

  const navItems: DashboardNavItem[] = [
    { to: "/", id: "home", labelKey: "nav.home", icon: <Home className="w-4 h-4" /> },
    { to: "/courses", id: "courses", labelKey: "nav.courses", icon: <BookOpen className="w-4 h-4" /> },
    { to: "/login", id: "settings", labelKey: "nav.settings", icon: <Settings className="w-4 h-4" /> },
  ];

  const handleNav = (item: DashboardNavItem) => {
    if (item.to && item.to !== "#") setLocation(item.to);
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "users", label: "Users", icon: <Users className="w-4 h-4" /> },
    { id: "schools", label: "Schools & Classes", icon: <Building2 className="w-4 h-4" /> },
    { id: "health", label: "System Health", icon: <Server className="w-4 h-4" /> },
    { id: "security", label: "Security", icon: <ShieldAlert className="w-4 h-4" /> },
  ];

  return (
    <DashboardLayout
      titleKey="dashboard.adminDashboard"
      subtitleKey="dashboard.adminSubtitle"
      navItems={navItems}
      activeKey="/dashboard"
      onNavigate={handleNav}
    >
      {/* Loading State */}
      {adminData.loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-slate-300 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm text-slate-500">Loading admin dashboard...</p>
        </div>
      )}

      {/* Error State */}
      {!adminData.loading && adminData.error && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-sm text-red-600 mb-2">{adminData.error}</p>
          <button onClick={() => window.location.reload()} className="text-sm text-indigo-600 underline">Try again</button>
        </div>
      )}

      {/* Dashboard Content */}
      {!adminData.loading && !adminData.error && (
        <>
          {/* Tab bar */}
          <div className="mb-6 flex flex-wrap gap-1.5">
            {tabs.map((tab) => (
              <button key={tab.id} type="button" onClick={() => setSelectedTab(tab.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                  selectedTab === tab.id ? "bg-slate-800 text-white shadow-sm" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}>
                {tab.icon}{tab.label}
              </button>
            ))}
          </div>

          {selectedTab === "overview" && <OverviewSection adminName={adminName} data={adminData} />}
          {selectedTab === "users" && <UsersSection data={adminData} />}
          {selectedTab === "schools" && <SchoolsSection data={adminData} />}
          {selectedTab === "health" && <HealthSection />}
          {selectedTab === "security" && <SecuritySection />}
        </>
      )}
    </DashboardLayout>
  );
}

/* ── SECTION 1: Overview ── */
function OverviewSection({ adminName, data }: { adminName: string; data: ReturnType<typeof useAdminDashboardData> }) {
  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-6 text-white sm:p-8">
        <div className="relative">
          <h2 className="text-2xl font-bold sm:text-3xl">Willkommen, {adminName}!</h2>
          <p className="mt-1 text-sm text-slate-300">
            {data.totalUsers.toLocaleString()} Nutzer · {data.lessonsCompleted7d.toLocaleString()} Lektionen diese Woche
          </p>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Gesamtnutzer" value={data.totalUsers.toLocaleString()} icon={<Users className="w-5 h-5" />} accent="from-cyan-500 to-teal-600" trend={{ value: "+" + data.totalStudents, positive: true }} />
        <StatCard label="Kurse" value={data.totalCourses.toLocaleString()} icon={<BookOpen className="w-5 h-5" />} accent="from-emerald-500 to-teal-500" />
        <StatCard label="Lektionen abgeschlossen" value={data.lessonsCompleted.toLocaleString()} icon={<CheckCircle2 className="w-5 h-5" />} accent="from-violet-500 to-fuchsia-500" />
        <StatCard label="Klassen" value={data.totalClasses.toLocaleString()} icon={<Building2 className="w-5 h-5" />} accent="from-amber-400 to-orange-500" />
      </section>
    </div>
  );
}

/* ── SECTION 2: Users ── */
function UsersSection({ data }: { data: ReturnType<typeof useAdminDashboardData> }) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const recentUserList = data.recentUsers || [];
  const filtered = recentUserList.filter((u: any) => {
    const name = ((u.first_name || "") + " " + (u.last_name || "")).toLowerCase();
    const email = (u.email || "").toLowerCase();
    const matchSearch = name.includes(search.toLowerCase()) || email.includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-4">
      <SectionHeading icon={<Users className="w-4 h-4" />} title="User Management"
        action={<button type="button" className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 text-white px-3 py-2 text-xs font-semibold hover:bg-slate-700 transition-colors"><Plus className="h-3.5 w-3.5" /> Add User</button>} />
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search users by name or email..." value={search} onChange={e => setSearch(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm" />
        </div>
        <div className="flex gap-1.5">
          {["all", "student", "teacher", "parent", "admin"].map(r => (
            <button key={r} type="button" onClick={() => setRoleFilter(r)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${roleFilter === r ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              {r === "all" ? "All" : r.charAt(0).toUpperCase() + r.slice(1) + "s"}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <Users className="mx-auto h-8 w-8 text-slate-300 mb-2" />
          <p className="text-sm text-slate-500">Keine Nutzer gefunden</p>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((u: any) => (
                  <tr key={u.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-semibold text-slate-900">{u.first_name} {u.last_name}</p>
                        <p className="text-xs text-slate-500">{u.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${u.role === "admin" ? "bg-violet-100 text-violet-700" : u.role === "teacher" ? "bg-emerald-100 text-emerald-700" : u.role === "parent" ? "bg-amber-100 text-amber-700" : "bg-cyan-100 text-cyan-700"}`}>
                        {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{u.created_at ? new Date(u.created_at).toLocaleDateString() : "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100" title="View"><Eye className="h-3.5 w-3.5" /></button>
                        <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100" title="Edit"><Edit3 className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── SECTION 3: Schools & Classes ── */
function SchoolsSection({ data }: { data: ReturnType<typeof useAdminDashboardData> }) {
  const classList = data.classes || [];

  return (
    <div className="space-y-6">
      <SectionHeading icon={<Building2 className="w-4 h-4" />} title="Schools & Classes" />
      {classList.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <Building2 className="mx-auto h-8 w-8 text-slate-300 mb-2" />
          <p className="text-sm text-slate-500">Noch keine Klassen vorhanden</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {classList.map((s) => (
            <div key={s.id} className="rounded-xl border border-slate-200 bg-white p-4 hover:border-slate-300 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{s.name}</p>
                  <p className="text-xs text-slate-500">Erstellt am {new Date(s.created_at).toLocaleDateString()}</p>
                </div>
                <span className="inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700">active</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                <div className="rounded-lg bg-slate-50 p-2"><p className="text-base font-bold text-slate-900">{s.student_count}</p><p className="text-[10px] text-slate-500">Students</p></div>
                <div className="rounded-lg bg-slate-50 p-2"><p className="text-base font-bold text-slate-900">{s.teacher_id ? "1" : "0"}</p><p className="text-[10px] text-slate-500">Teacher</p></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── SECTION 4: System Health ── */
function HealthSection() {
  const statusColors = { healthy: "bg-emerald-100 text-emerald-700", warning: "bg-amber-100 text-amber-700", critical: "bg-rose-100 text-rose-700" };
  const statusDots = { healthy: "bg-emerald-500", warning: "bg-amber-500", critical: "bg-rose-500" };
  const statusLabels = { healthy: "Healthy", warning: "Warning", critical: "Critical" };

  return (
    <div className="space-y-6">
      <SectionHeading icon={<Server className="w-4 h-4" />} title="System Health" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SYSTEM_HEALTH.map(svc => (
          <div key={svc.name} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${statusDots[svc.status]}`} />
                <p className="text-sm font-semibold text-slate-900">{svc.name}</p>
              </div>
              <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${statusColors[svc.status]}`}>{statusLabels[svc.status]}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{svc.detail}</p>
            <p className="text-[10px] text-slate-400 mt-1">Uptime: {svc.uptime}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── SECTION 5: Security ── */
function SecuritySection() {
  return (
    <div className="space-y-6">
      <SectionHeading icon={<ShieldAlert className="w-4 h-4" />} title="Security Center" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
          <Shield className="mx-auto h-6 w-6 text-emerald-500" />
          <p className="text-xl font-bold text-slate-900 mt-1">2FA</p>
          <p className="text-[10px] font-semibold text-slate-500 uppercase">Enabled</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
          <Fingerprint className="mx-auto h-6 w-6 text-cyan-500" />
          <p className="text-xl font-bold text-slate-900 mt-1">847</p>
          <p className="text-[10px] font-semibold text-slate-500 uppercase">Logins Today</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
          <UserX className="mx-auto h-6 w-6 text-rose-500" />
          <p className="text-xl font-bold text-slate-900 mt-1">3</p>
          <p className="text-[10px] font-semibold text-slate-500 uppercase">Failed Today</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
          <AlertTriangle className="mx-auto h-6 w-6 text-amber-500" />
          <p className="text-xl font-bold text-slate-900 mt-1">1</p>
          <p className="text-[10px] font-semibold text-slate-500 uppercase">Suspicious</p>
        </div>
      </div>
    </div>
  );
}
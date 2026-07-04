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
import {
  DashboardLayout,
  type DashboardNavItem,
} from "@/components/DashboardLayout";
import { StatCard, SectionHeading } from "@/components/DashboardWidgets";

/* ── MOCK DATA ── */
const PLATFORM_STATS = {
  totalUsers: 12450,
  totalStudents: 8200,
  totalParents: 1900,
  totalTeachers: 1850,
  totalAdmins: 500,
  activeToday: 3210,
  activeWeek: 7840,
  lessonsCompleted: 284500,
  learningHours: 186200,
};

const USERS = [
  { id: "u1", name: "Anna Becker", email: "anna.becker@student.com", role: "student", status: "active", lastLogin: "15 min ago", school: "Riverside Academy" },
  { id: "u2", name: "Mr. Tom Werner", email: "tom.werner@school.edu", role: "teacher", status: "active", lastLogin: "1 hour ago", school: "Riverside Academy" },
  { id: "u3", name: "Michael Parent", email: "michael@parent.com", role: "parent", status: "active", lastLogin: "2 hours ago", school: "—" },
  { id: "u4", name: "Dr. Sarah Johnson", email: "sarah@riverside.edu", role: "teacher", status: "active", lastLogin: "3 hours ago", school: "Sunrise School" },
  { id: "u5", name: "Lukas Schafer", email: "lukas@student.com", role: "student", status: "inactive", lastLogin: "3 weeks ago", school: "Sunrise School" },
  { id: "u6", name: "Admin User", email: "admin@I-Land1o1.com", role: "admin", status: "active", lastLogin: "5 min ago", school: "—" },
  { id: "u7", name: "Mia Wagner", email: "mia@student.com", role: "student", status: "active", lastLogin: "30 min ago", school: "Nordsee Gymnasium" },
  { id: "u8", name: "Hans Mueller", email: "hans@parent.com", role: "parent", status: "active", lastLogin: "1 day ago", school: "—" },
];

const SCHOOLS_CLASSES = [
  { id: "s1", name: "Riverside Academy", city: "Berlin", students: 450, teachers: 35, classes: 18, status: "active" as const, plan: "Premium" },
  { id: "s2", name: "Sunrise School", city: "Munich", students: 320, teachers: 24, classes: 14, status: "active" as const, plan: "Standard" },
  { id: "s3", name: "Nordsee Gymnasium", city: "Hamburg", students: 180, teachers: 12, classes: 8, status: "active" as const, plan: "Standard" },
  { id: "s4", name: "Alpenblick Schule", city: "Vienna", students: 95, teachers: 8, classes: 4, status: "inactive" as const, plan: "Basic" },
];

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

      {selectedTab === "overview" && <OverviewSection adminName={adminName} />}
      {selectedTab === "users" && <UsersSection />}
      {selectedTab === "schools" && <SchoolsSection />}
      {selectedTab === "health" && <HealthSection />}
      {selectedTab === "security" && <SecuritySection />}
    </DashboardLayout>
  );
}

/* ── SECTION 1: Overview ── */
function OverviewSection({ adminName }: { adminName: string }) {
  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-6 text-white sm:p-8">
        <div className="relative">
          <h2 className="text-2xl font-bold sm:text-3xl">Willkommen, {adminName}!</h2>
          <p className="mt-1 text-sm text-slate-300">Plattform läuft bei 99.97% Uptime. {PLATFORM_STATS.activeToday.toLocaleString()} aktive Nutzer heute.</p>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Gesamtnutzer" value={PLATFORM_STATS.totalUsers.toLocaleString()} icon={<Users className="w-5 h-5" />} accent="from-cyan-500 to-teal-600" trend={{ value: "+12%", positive: true }} />
        <StatCard label="Aktiv Heute" value={PLATFORM_STATS.activeToday.toLocaleString()} icon={<Activity className="w-5 h-5" />} accent="from-emerald-500 to-teal-500" />
        <StatCard label="Lektionen abgeschlossen" value={(PLATFORM_STATS.lessonsCompleted / 1000).toFixed(0) + "K"} icon={<CheckCircle2 className="w-5 h-5" />} accent="from-violet-500 to-fuchsia-500" />
        <StatCard label="Lernstunden" value={(PLATFORM_STATS.learningHours / 1000).toFixed(0) + "K"} icon={<Clock className="w-5 h-5" />} accent="from-amber-400 to-orange-500" />
      </section>
    </div>
  );
}

/* ── SECTION 2: Users ── */
function UsersSection() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const filtered = USERS.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
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
      <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">School</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Last Login</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-semibold text-slate-900">{u.name}</p>
                      <p className="text-xs text-slate-500">{u.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${u.role === "admin" ? "bg-violet-100 text-violet-700" : u.role === "teacher" ? "bg-emerald-100 text-emerald-700" : u.role === "parent" ? "bg-amber-100 text-amber-700" : "bg-cyan-100 text-cyan-700"}`}>
                      {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 text-xs">{u.school}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${u.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${u.status === "active" ? "bg-emerald-500" : "bg-slate-400"}`} />{u.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{u.lastLogin}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100" title="View"><Eye className="h-3.5 w-3.5" /></button>
                      <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100" title="Edit"><Edit3 className="h-3.5 w-3.5" /></button>
                      <button className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600" title="Deactivate"><ToggleLeft className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── SECTION 3: Schools ── */
function SchoolsSection() {
  return (
    <div className="space-y-6">
      <SectionHeading icon={<Building2 className="w-4 h-4" />} title="Schools" />
      <div className="grid gap-3 sm:grid-cols-2">
        {SCHOOLS_CLASSES.map(s => (
          <div key={s.id} className="rounded-xl border border-slate-200 bg-white p-4 hover:border-slate-300 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-slate-900">{s.name}</p>
                <p className="text-xs text-slate-500">{s.city} · {s.plan} Plan</p>
              </div>
              <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${s.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{s.status}</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-slate-50 p-2"><p className="text-base font-bold text-slate-900">{s.students}</p><p className="text-[10px] text-slate-500">Students</p></div>
              <div className="rounded-lg bg-slate-50 p-2"><p className="text-base font-bold text-slate-900">{s.teachers}</p><p className="text-[10px] text-slate-500">Teachers</p></div>
              <div className="rounded-lg bg-slate-50 p-2"><p className="text-base font-bold text-slate-900">{s.classes}</p><p className="text-[10px] text-slate-500">Classes</p></div>
            </div>
          </div>
        ))}
      </div>
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

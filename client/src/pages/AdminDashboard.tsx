import React, { useState } from "react";
import { useLocation } from "wouter";
import {
  Home,
  Map as MapIcon,
  BookOpen,
  Trophy,
  BarChart3,
  Settings,
  Users,
  GraduationCap,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Plus,
  Shield,
  ChevronRight,
  Activity,
  Building2,
  Database,
  Server,
  HardDrive,
  AlertCircle,
  Search,
  Eye,
  Edit3,
  Archive,
  Upload,
  FileText,
  Clock,
  Bell,
  Lock,
  UserX,
  Key,
  ClipboardList,
  BookMarked,
  Target,
  Cpu,
  Wifi,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Calendar,
  BarChart2,
  MessageSquare,
  RefreshCw,
  Globe,
  Mail,
  LogOut,
  ShieldAlert,
  Fingerprint,
  History,
  ToggleLeft,
  X,
  Save,
  Image,
  Layers,
  MapPin,
  Phone,
} from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { authService } from "@/lib/auth-service";
import {
  DashboardLayout,
  type DashboardNavItem,
} from "@/components/DashboardLayout";
import { StatCard, SectionHeading } from "@/components/DashboardWidgets";

/* ─────────────────────────────────────────────────────────────────
   MOCK DATA
   ───────────────────────────────────────────────────────────────── */

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
  { id: "u6", name: "Admin User", email: "admin@insel1o1.com", role: "admin", status: "active", lastLogin: "5 min ago", school: "—" },
  { id: "u7", name: "Mia Wagner", email: "mia@student.com", role: "student", status: "active", lastLogin: "30 min ago", school: "Nordsee Gymnasium" },
  { id: "u8", name: "Hans Mueller", email: "hans@parent.com", role: "parent", status: "active", lastLogin: "1 day ago", school: "—" },
];

const SCHOOLS_CLASSES = [
  { id: "s1", name: "Riverside Academy", city: "Berlin", students: 450, teachers: 35, classes: 18, status: "active" as const, plan: "Premium" },
  { id: "s2", name: "Sunrise School", city: "Munich", students: 320, teachers: 24, classes: 14, status: "active" as const, plan: "Standard" },
  { id: "s3", name: "Nordsee Gymnasium", city: "Hamburg", students: 180, teachers: 12, classes: 8, status: "active" as const, plan: "Standard" },
  { id: "s4", name: "Alpenblick Schule", city: "Vienna", students: 95, teachers: 8, classes: 4, status: "inactive" as const, plan: "Basic" },
];

const CLASSES = [
  { id: "c1", name: "Class 9A", school: "Riverside Academy", subject: "Mathematics", teacher: "Mr. Werner", students: 28, avgGrade: "B+", completion: 76 },
  { id: "c2", name: "Class 9B", school: "Riverside Academy", subject: "Mathematics", teacher: "Mr. Werner", students: 24, avgGrade: "B", completion: 68 },
  { id: "c3", name: "Class 10A", school: "Sunrise School", subject: "Science", teacher: "Dr. Johnson", students: 22, avgGrade: "B+", completion: 82 },
  { id: "c4", name: "Class 10B", school: "Sunrise School", subject: "Science", teacher: "Dr. Johnson", students: 26, avgGrade: "B-", completion: 71 },
  { id: "c5", name: "Class 8A", school: "Nordsee Gymnasium", subject: "Language", teacher: "Ms. Braun", students: 20, avgGrade: "A-", completion: 88 },
];

const CONTENT = [
  { id: "ct1", type: "Course", name: "Mathematics Grade 9", lessons: 50, status: "published", lastEdited: "2 days ago" },
  { id: "ct2", type: "Course", name: "Science Grade 10", lessons: 45, status: "published", lastEdited: "1 week ago" },
  { id: "ct3", type: "Island", name: "Algebra Island", lessons: 12, status: "published", lastEdited: "3 days ago" },
  { id: "ct4", type: "Island", name: "Chemistry Lab", lessons: 10, status: "draft", lastEdited: "Yesterday" },
  { id: "ct5", type: "Quiz", name: "Fractions & Decimals", lessons: 1, status: "published", lastEdited: "5 days ago" },
  { id: "ct6", type: "Learning Path", name: "Beginner Mathematics", lessons: 30, status: "published", lastEdited: "1 week ago" },
  { id: "ct7", type: "Course", name: "Creative Writing", lessons: 20, status: "draft", lastEdited: "Today" },
];

const DAU_TREND = [
  { day: "Mon", value: 3210 }, { day: "Tue", value: 3450 }, { day: "Wed", value: 3680 },
  { day: "Thu", value: 3520 }, { day: "Fri", value: 3100 }, { day: "Sat", value: 1800 }, { day: "Sun", value: 1400 },
];
const WAU_TREND = [
  { week: "W1", value: 6800 }, { week: "W2", value: 7200 }, { week: "W3", value: 7540 }, { week: "W4", value: 7840 },
];
const MAU_TREND = [
  { month: "Jan", value: 9800 }, { month: "Feb", value: 10200 }, { month: "Mar", value: 11100 }, { month: "Apr", value: 11800 }, { month: "May", value: 12100 }, { month: "Jun", value: 12450 },
];

const COMPLETION_RATES = [
  { name: "Mathematics", rate: 74 }, { name: "Science", rate: 78 }, { name: "Language", rate: 70 },
  { name: "Creativity", rate: 65 }, { name: "Social Skills", rate: 82 },
];

const SYSTEM_HEALTH = [
  { name: "Application Server", status: "healthy" as const, uptime: "99.97%", detail: "All endpoints responding normally" },
  { name: "Database", status: "healthy" as const, uptime: "99.99%", detail: "PostgreSQL cluster — 2 replicas" },
  { name: "API Gateway", status: "healthy" as const, uptime: "99.95%", detail: "Rate limiting active, no throttling" },
  { name: "CDN / Static Assets", status: "warning" as const, uptime: "99.80%", detail: "Elevated latency in EU-West region" },
  { name: "Email Service", status: "healthy" as const, uptime: "99.90%", detail: "SMTP queue normal" },
  { name: "Backup Service", status: "healthy" as const, uptime: "100%", detail: "Last backup: 2 hours ago" },
];

const STORAGE = { used: 245, total: 500, unit: "GB", breakdown: [{ name: "User uploads", size: 85 }, { name: "Course content", size: 92 }, { name: "Database", size: 48 }, { name: "Logs & backups", size: 20 }] };

const ERROR_RATES = { today: 12, yesterday: 8, week: 14, trend: "stable" as const };

const REPORTS_MOST_ACTIVE = [
  { name: "Class 10A", metric: "92% avg completion", value: 92 },
  { name: "Class 9A", metric: "76% avg completion", value: 76 },
  { name: "Class 8A", metric: "88% avg completion", value: 88 },
];

const REPORTS_TOP_TEACHERS = [
  { name: "Dr. Sarah Johnson", metric: "156 students, 82% avg", value: 82 },
  { name: "Mr. Tom Werner", metric: "52 students, 72% avg", value: 72 },
  { name: "Ms. Braun", metric: "20 students, 88% avg", value: 88 },
];

const REPORTS_TOP_COURSES = [
  { name: "Mathematics Grade 9", completions: 1240, rating: 4.6 },
  { name: "Science Grade 10", completions: 980, rating: 4.7 },
  { name: "Beginner Mathematics", completions: 850, rating: 4.4 },
];

const NOTIFICATIONS_CENTER = [
  { id: "nc1", type: "system" as const, title: "Scheduled Maintenance", detail: "Platform will undergo maintenance tonight 02:00-04:00 UTC", time: "3 hours ago", read: false },
  { id: "nc2", type: "alert" as const, title: "High CPU Usage", detail: "Server load exceeded 85% threshold for 15 minutes", time: "5 hours ago", read: false },
  { id: "nc3", type: "report" as const, title: "Weekly Report Generated", detail: "Platform analytics report for Week 24 is ready", time: "Yesterday", read: true },
  { id: "nc4", type: "security" as const, title: "Multiple Failed Logins", detail: "3 failed login attempts from IP 192.168.1.45", time: "Yesterday", read: true },
  { id: "nc5", type: "system" as const, title: "Backup Completed", detail: "Nightly backup finished — 245 GB archived", time: "2 days ago", read: true },
];

const SECURITY_LOGINS = [
  { user: "Admin User", ip: "10.0.0.1", time: "5 min ago", status: "success" as const, location: "Berlin, DE" },
  { user: "Mr. Tom Werner", ip: "192.168.1.10", time: "1 hour ago", status: "success" as const, location: "Munich, DE" },
  { user: "Unknown", ip: "192.168.1.45", time: "3 hours ago", status: "failed" as const, location: "Unknown" },
  { user: "Anna Becker", ip: "10.0.0.50", time: "4 hours ago", status: "success" as const, location: "Berlin, DE" },
  { user: "Unknown", ip: "203.0.113.42", time: "Yesterday", status: "failed" as const, location: "Unknown" },
  { user: "Dr. Sarah Johnson", ip: "172.16.0.5", time: "Yesterday", status: "success" as const, location: "Hamburg, DE" },
];

const SECURITY_AUDIT = [
  { action: "Role changed", user: "Hans Mueller", detail: "student -> parent", time: "2 days ago", admin: "Admin User" },
  { action: "Account deactivated", user: "Lukas Schafer", detail: "Inactive for 3 weeks", time: "3 days ago", admin: "System" },
  { action: "Password reset", user: "Mia Wagner", detail: "Admin-initiated reset", time: "5 days ago", admin: "Admin User" },
];

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────────── */

export default function AdminDashboard() {
  const { t } = useI18n();
  const [, setLocation] = useLocation();
  const [selectedTab, setSelectedTab] = useState<string>("overview");

  const user = authService.getCurrentUser();
  const adminName = user?.firstName ?? "Admin";

  const navItems: DashboardNavItem[] = [
    { to: "/",            id: "home",         labelKey: "nav.home",         icon: <Home className="w-4 h-4" /> },
    { to: "/archipelago", id: "archipelago",  labelKey: "nav.archipelagos", icon: <MapIcon className="w-4 h-4" /> },
    { to: "/courses",     id: "courses",      labelKey: "nav.courses",      icon: <BookOpen className="w-4 h-4" /> },
    { to: "/leaderboard", id: "leaderboard",  labelKey: "nav.leaderboard",  icon: <Trophy className="w-4 h-4" /> },
    { to: "/login",       id: "settings",     labelKey: "nav.settings",     icon: <Settings className="w-4 h-4" /> },
  ];

  const handleNav = (item: DashboardNavItem) => {
    if (item.to && item.to !== "#") setLocation(item.to);
  };

  const tabs: { id: string; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "users", label: "Users", icon: <Users className="w-4 h-4" /> },
    { id: "schools", label: "Schools & Classes", icon: <Building2 className="w-4 h-4" /> },
    { id: "content", label: "Content", icon: <BookMarked className="w-4 h-4" /> },
    { id: "analytics", label: "Analytics", icon: <TrendingUp className="w-4 h-4" /> },
    { id: "health", label: "System Health", icon: <Server className="w-4 h-4" /> },
    { id: "reports", label: "Reports", icon: <FileText className="w-4 h-4" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
    { id: "security", label: "Security", icon: <ShieldAlert className="w-4 h-4" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
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
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${selectedTab === tab.id ? "bg-cyan-600 text-white shadow-sm" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}`}>
            {tab.icon}{tab.label}
          </button>
        ))}
      </div>

      {selectedTab === "overview" && <OverviewSection adminName={adminName} />}
      {selectedTab === "users" && <UsersSection />}
      {selectedTab === "schools" && <SchoolsSection />}
      {selectedTab === "content" && <ContentSection />}
      {selectedTab === "analytics" && <AnalyticsSection />}
      {selectedTab === "health" && <HealthSection />}
      {selectedTab === "reports" && <ReportsSection />}
      {selectedTab === "notifications" && <NotificationsSection />}
      {selectedTab === "security" && <SecuritySection />}
      {selectedTab === "settings" && <SettingsSection />}
    </DashboardLayout>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 1: Platform Overview
   ───────────────────────────────────────────────────────────────── */

function OverviewSection({ adminName }: { adminName: string }) {
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const dateStr = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <section className="relative overflow-hidden rounded-3xl border border-cyan-100 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-6 text-white shadow-lg sm:p-8">
        <div className="pointer-events-none absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 15% 25%, rgba(6,182,212,0.5) 0%, transparent 40%)" }} aria-hidden />
        <div className="relative">
          <h2 className="text-2xl font-extrabold sm:text-3xl">{greeting}, {adminName}!</h2>
          <p className="mt-1 text-sm text-slate-300">{dateStr}</p>
          <p className="mt-2 max-w-2xl text-sm text-slate-400 leading-relaxed">
            Platform is running at 99.97% uptime. 3,210 active users today. CDN latency elevated in EU-West — monitoring. 2 new user reports require attention.
          </p>
        </div>
      </section>

      {/* KPI Grid */}
      <section className="grid grid-cols-3 gap-3 lg:grid-cols-5">
        <StatCard label="Total Users" value={PLATFORM_STATS.totalUsers.toLocaleString()} icon={<Users className="w-5 h-5" />} accent="from-cyan-500 to-teal-600" trend={{ value: "+12%", positive: true }} />
        <StatCard label="Students" value={PLATFORM_STATS.totalStudents.toLocaleString()} icon={<GraduationCap className="w-5 h-5" />} accent="from-emerald-500 to-teal-500" />
        <StatCard label="Teachers" value={PLATFORM_STATS.totalTeachers.toLocaleString()} icon={<BookOpen className="w-5 h-5" />} accent="from-violet-500 to-violet-600" />
        <StatCard label="Parents" value={PLATFORM_STATS.totalParents.toLocaleString()} icon={<Users className="w-5 h-5" />} accent="from-amber-400 to-orange-500" />
        <StatCard label="Admins" value={PLATFORM_STATS.totalAdmins.toLocaleString()} icon={<Shield className="w-5 h-5" />} accent="from-rose-400 to-rose-500" />
      </section>
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Active Today" value={PLATFORM_STATS.activeToday.toLocaleString()} icon={<Activity className="w-5 h-5" />} accent="from-cyan-500 to-cyan-400" trend={{ value: "+5%", positive: true }} />
        <StatCard label="Active This Week" value={PLATFORM_STATS.activeWeek.toLocaleString()} icon={<Calendar className="w-5 h-5" />} accent="from-emerald-500 to-teal-500" />
        <StatCard label="Lessons Completed" value={(PLATFORM_STATS.lessonsCompleted / 1000).toFixed(0) + "K"} icon={<CheckCircle2 className="w-5 h-5" />} accent="from-violet-500 to-fuchsia-500" />
        <StatCard label="Learning Hours" value={(PLATFORM_STATS.learningHours / 1000).toFixed(0) + "K"} icon={<Clock className="w-5 h-5" />} accent="from-amber-400 to-orange-500" />
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 2: User Management
   ───────────────────────────────────────────────────────────────── */

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
      <SectionHeading icon={<Users className="w-4 h-4" />} title="User Management" description="Manage all platform accounts"
        action={<button type="button" className="btn btn-primary btn-sm"><Plus className="h-3.5 w-3.5" /> Add User</button>} />
      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search users by name or email..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm" />
        </div>
        <div className="flex gap-1.5">
          {["all", "student", "teacher", "parent", "admin"].map(r => (
            <button key={r} type="button" onClick={() => setRoleFilter(r)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${roleFilter === r ? "bg-cyan-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              {r === "all" ? "All" : r.charAt(0).toUpperCase() + r.slice(1) + "s"}
            </button>
          ))}
        </div>
      </div>
      {/* User Table */}
      <div className="card-elevated overflow-hidden">
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
                      <button type="button" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600" title="View"><Eye className="h-3.5 w-3.5" /></button>
                      <button type="button" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600" title="Edit"><Edit3 className="h-3.5 w-3.5" /></button>
                      <button type="button" className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600" title="Deactivate"><ToggleLeft className="h-3.5 w-3.5" /></button>
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

/* ─────────────────────────────────────────────────────────────────
   SECTION 3: School / Class Management
   ───────────────────────────────────────────────────────────────── */

function SchoolsSection() {
  return (
    <div className="space-y-6">
      {/* Schools */}
      <section>
        <SectionHeading icon={<Building2 className="w-4 h-4" />} title="Schools" description="Manage schools on the platform"
          action={<button type="button" className="btn btn-primary btn-sm"><Plus className="h-3.5 w-3.5" /> Add School</button>} />
        <div className="grid gap-3 sm:grid-cols-2">
          {SCHOOLS_CLASSES.map(s => (
            <div key={s.id} className="card card-interactive p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-extrabold text-slate-900">{s.name}</p>
                  <p className="text-xs text-slate-500">{s.city} · {s.plan} Plan</p>
                </div>
                <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${s.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{s.status}</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-slate-50 p-2"><p className="text-base font-extrabold text-slate-900">{s.students}</p><p className="text-[10px] text-slate-500">Students</p></div>
                <div className="rounded-lg bg-slate-50 p-2"><p className="text-base font-extrabold text-slate-900">{s.teachers}</p><p className="text-[10px] text-slate-500">Teachers</p></div>
                <div className="rounded-lg bg-slate-50 p-2"><p className="text-base font-extrabold text-slate-900">{s.classes}</p><p className="text-[10px] text-slate-500">Classes</p></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Classes */}
      <section>
        <SectionHeading icon={<ClipboardList className="w-4 h-4" />} title="Classes" description="All classes across all schools"
          action={<button type="button" className="btn btn-primary btn-sm"><Plus className="h-3.5 w-3.5" /> Create Class</button>} />
        <div className="card-elevated overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                <tr><th className="px-4 py-3">Class</th><th className="px-4 py-3">School</th><th className="px-4 py-3">Subject</th><th className="px-4 py-3">Teacher</th><th className="px-4 py-3">Students</th><th className="px-4 py-3">Avg</th><th className="px-4 py-3">Actions</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {CLASSES.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-semibold text-slate-900">{c.name}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">{c.school}</td>
                    <td className="px-4 py-3 text-xs text-slate-600">{c.subject}</td>
                    <td className="px-4 py-3 text-xs text-slate-600">{c.teacher}</td>
                    <td className="px-4 py-3 text-xs font-bold text-slate-900">{c.students}</td>
                    <td className="px-4 py-3 text-xs font-bold text-cyan-700">{c.avgGrade}</td>
                    <td className="px-4 py-3"><div className="flex gap-1"><button type="button" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"><Edit3 className="h-3.5 w-3.5" /></button><button type="button" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"><Archive className="h-3.5 w-3.5" /></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 4: Content Management
   ───────────────────────────────────────────────────────────────── */

function ContentSection() {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const filtered = CONTENT.filter(c => typeFilter === "all" || c.type.toLowerCase() === typeFilter);

  return (
    <div className="space-y-4">
      <SectionHeading icon={<BookMarked className="w-4 h-4" />} title="Content Management" description="Courses, lessons, islands, and quizzes"
        action={<button type="button" className="btn btn-primary btn-sm"><Plus className="h-3.5 w-3.5" /> Create Content</button>} />
      <div className="flex gap-1.5">
        {["all", "course", "island", "quiz", "learning path"].map(f => (
          <button key={f} type="button" onClick={() => setTypeFilter(f)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${typeFilter === f ? "bg-cyan-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
            {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1) + "s"}
          </button>
        ))}
      </div>
      <div className="card-elevated overflow-hidden">
        <div className="divide-y divide-slate-100">
          {filtered.map(c => (
            <div key={c.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50/50 transition-colors">
              <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm ${c.type === "Course" ? "bg-cyan-100 text-cyan-600" : c.type === "Island" ? "bg-emerald-100 text-emerald-600" : c.type === "Quiz" ? "bg-violet-100 text-violet-600" : "bg-amber-100 text-amber-600"}`}>
                {c.type === "Course" ? <BookOpen className="h-4 w-4" /> : c.type === "Island" ? <MapIcon className="h-4 w-4" /> : c.type === "Quiz" ? <Target className="h-4 w-4" /> : <Layers className="h-4 w-4" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-900">{c.name}</p>
                <p className="text-xs text-slate-500">{c.type} · {c.lessons} lessons · Edited {c.lastEdited}</p>
              </div>
              <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold ${c.status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{c.status}</span>
              <div className="flex gap-1 shrink-0">
                <button type="button" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100" title="Edit"><Edit3 className="h-3.5 w-3.5" /></button>
                <button type="button" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100" title="Archive"><Archive className="h-3.5 w-3.5" /></button>
                {c.status === "draft" && <button type="button" className="rounded-lg p-1.5 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600" title="Publish"><Upload className="h-3.5 w-3.5" /></button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 5: Platform Analytics
   ───────────────────────────────────────────────────────────────── */

function AnalyticsSection() {
  const maxDAU = Math.max(...DAU_TREND.map(d => d.value));
  const maxWAU = Math.max(...WAU_TREND.map(d => d.value));

  return (
    <div className="space-y-6">
      <SectionHeading icon={<BarChart3 className="w-4 h-4" />} title="Platform Analytics" description="Usage trends and engagement statistics" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* DAU */}
        <div className="card-elevated p-5">
          <h3 className="text-sm font-bold text-slate-900">Daily Active Users</h3>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">{DAU_TREND[DAU_TREND.length - 1].value.toLocaleString()}</p>
          <div className="flex h-24 items-end gap-1 mt-3">
            {DAU_TREND.map((d, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-0.5">
                <div className="w-full rounded bg-gradient-to-t from-cyan-500 to-cyan-400" style={{ height: `${(d.value / maxDAU) * 100}%` }} />
                <span className="text-[8px] text-slate-400">{d.day}</span>
              </div>
            ))}
          </div>
        </div>
        {/* WAU */}
        <div className="card-elevated p-5">
          <h3 className="text-sm font-bold text-slate-900">Weekly Active Users</h3>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">{WAU_TREND[WAU_TREND.length - 1].value.toLocaleString()}</p>
          <div className="flex h-24 items-end gap-2 mt-3">
            {WAU_TREND.map((d, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-0.5">
                <div className="w-full rounded bg-gradient-to-t from-emerald-500 to-emerald-400" style={{ height: `${(d.value / maxWAU) * 100}%` }} />
                <span className="text-[8px] text-slate-400">{d.week}</span>
              </div>
            ))}
          </div>
        </div>
        {/* MAU */}
        <div className="card-elevated p-5">
          <h3 className="text-sm font-bold text-slate-900">Monthly Active Users</h3>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">{MAU_TREND[MAU_TREND.length - 1].value.toLocaleString()}</p>
          <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1"><ArrowUpRight className="h-3 w-3" /> +{Math.round(((MAU_TREND[MAU_TREND.length - 1].value - MAU_TREND[0].value) / MAU_TREND[0].value) * 100)}% growth</p>
        </div>
      </div>
      {/* Lesson Completion Rates */}
      <div className="card-elevated p-5">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Lesson Completion Rates by Subject</h3>
        <div className="space-y-3">
          {COMPLETION_RATES.map(c => (
            <div key={c.name}>
              <div className="flex items-center justify-between text-xs"><span className="font-medium text-slate-700">{c.name}</span><span className="font-bold text-cyan-700">{c.rate}%</span></div>
              <div className="progress-track mt-1"><div className="progress-fill" style={{ width: `${c.rate}%` }} /></div>
            </div>
          ))}
        </div>
      </div>
      {/* Engagement */}
      <div className="card-elevated p-5">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Engagement Overview</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl bg-slate-50 p-3 text-center"><p className="text-2xl font-extrabold text-slate-900">24.5</p><p className="text-[10px] font-bold text-slate-500 uppercase">Avg Min/Day</p></div>
          <div className="rounded-xl bg-slate-50 p-3 text-center"><p className="text-2xl font-extrabold text-slate-900">8.2</p><p className="text-[10px] font-bold text-slate-500 uppercase">Avg Lessons/Week</p></div>
          <div className="rounded-xl bg-slate-50 p-3 text-center"><p className="text-2xl font-extrabold text-slate-900">76%</p><p className="text-[10px] font-bold text-slate-500 uppercase">Retention Rate</p></div>
          <div className="rounded-xl bg-slate-50 p-3 text-center"><p className="text-2xl font-extrabold text-slate-900">4.5</p><p className="text-[10px] font-bold text-slate-500 uppercase">Avg Quiz Score</p></div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 6: System Health
   ───────────────────────────────────────────────────────────────── */

function HealthSection() {
  const statusColors = { healthy: "bg-emerald-100 text-emerald-700", warning: "bg-amber-100 text-amber-700", critical: "bg-rose-100 text-rose-700" };
  const statusDots = { healthy: "bg-emerald-500", warning: "bg-amber-500", critical: "bg-rose-500" };
  const statusLabels = { healthy: "Healthy", warning: "Warning", critical: "Critical" };

  return (
    <div className="space-y-6">
      <SectionHeading icon={<Server className="w-4 h-4" />} title="System Health" description="Infrastructure and service status" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SYSTEM_HEALTH.map(svc => (
          <div key={svc.name} className="card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${statusDots[svc.status]}`} />
                <p className="text-sm font-bold text-slate-900">{svc.name}</p>
              </div>
              <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${statusColors[svc.status]}`}>{statusLabels[svc.status]}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{svc.detail}</p>
            <p className="text-[10px] text-slate-400 mt-1">Uptime: {svc.uptime}</p>
          </div>
        ))}
      </div>
      {/* Storage */}
      <div className="card-elevated p-5">
        <h3 className="text-sm font-bold text-slate-900 mb-3">Storage Usage</h3>
        <div className="flex items-center gap-3 mb-3">
          <div className="progress-track flex-1 progress-track-lg"><div className="progress-fill" style={{ width: `${(STORAGE.used / STORAGE.total) * 100}%` }} /></div>
          <span className="text-sm font-bold text-slate-900">{STORAGE.used} / {STORAGE.total} {STORAGE.unit}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {STORAGE.breakdown.map(b => (
            <div key={b.name} className="rounded-lg bg-slate-50 p-2.5 text-center">
              <p className="text-base font-extrabold text-slate-900">{b.size} GB</p>
              <p className="text-[10px] font-bold text-slate-500">{b.name}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Error Rates */}
      <div className="card-elevated p-5">
        <h3 className="text-sm font-bold text-slate-900 mb-3">Error Rates</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-slate-50 p-3 text-center"><p className="text-xl font-extrabold text-slate-900">{ERROR_RATES.today}</p><p className="text-[10px] font-bold text-slate-500">Today</p></div>
          <div className="rounded-lg bg-slate-50 p-3 text-center"><p className="text-xl font-extrabold text-slate-900">{ERROR_RATES.yesterday}</p><p className="text-[10px] font-bold text-slate-500">Yesterday</p></div>
          <div className="rounded-lg bg-slate-50 p-3 text-center"><p className="text-xl font-extrabold text-slate-900">{ERROR_RATES.week}</p><p className="text-[10px] font-bold text-slate-500">This Week (Peak)</p></div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 7: Reports
   ───────────────────────────────────────────────────────────────── */

function ReportsSection() {
  return (
    <div className="space-y-6">
      <SectionHeading icon={<FileText className="w-4 h-4" />} title="Reports" description="Platform performance and usage reports"
        action={<div className="flex gap-2">{["PDF", "Excel", "CSV"].map(fmt => (
          <button key={fmt} type="button" className="btn btn-outline btn-sm"><Download className="h-3.5 w-3.5" /> {fmt}</button>
        ))}</div>} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Most Active Classes */}
        <div className="card-elevated p-5">
          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2"><GraduationCap className="h-4 w-4 text-cyan-500" /> Most Active Classes</h3>
          <div className="space-y-2.5">
            {REPORTS_MOST_ACTIVE.map((r, i) => (
              <div key={r.name} className="flex items-center gap-3">
                <span className="text-lg font-extrabold text-slate-300">{i + 1}</span>
                <div className="flex-1"><p className="text-xs font-bold text-slate-900">{r.name}</p><p className="text-[10px] text-slate-500">{r.metric}</p></div>
                <div className="w-16"><div className="progress-track"><div className="progress-fill" style={{ width: `${r.value}%` }} /></div></div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Teachers */}
        <div className="card-elevated p-5">
          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2"><BookOpen className="h-4 w-4 text-emerald-500" /> Most Active Teachers</h3>
          <div className="space-y-2.5">
            {REPORTS_TOP_TEACHERS.map((r, i) => (
              <div key={r.name} className="flex items-center gap-3">
                <span className="text-lg font-extrabold text-slate-300">{i + 1}</span>
                <div className="flex-1"><p className="text-xs font-bold text-slate-900">{r.name}</p><p className="text-[10px] text-slate-500">{r.metric}</p></div>
                <div className="w-16"><div className="progress-track"><div className="progress-fill" style={{ width: `${r.value}%` }} /></div></div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Courses */}
        <div className="card-elevated p-5">
          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2"><Trophy className="h-4 w-4 text-amber-500" /> Most Completed Courses</h3>
          <div className="space-y-2.5">
            {REPORTS_TOP_COURSES.map((r, i) => (
              <div key={r.name} className="flex items-center gap-3">
                <span className="text-lg font-extrabold text-slate-300">{i + 1}</span>
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-900">{r.name}</p>
                  <p className="text-[10px] text-slate-500">{r.completions.toLocaleString()} completions · {r.rating} ★</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 8: Notifications Center
   ───────────────────────────────────────────────────────────────── */

function NotificationsSection() {
  const typeStyles = { system: "bg-slate-100 text-slate-600", alert: "bg-rose-100 text-rose-600", report: "bg-cyan-100 text-cyan-600", security: "bg-amber-100 text-amber-600" };
  const typeIcons: Record<string, string> = { system: "⚙️", alert: "🚨", report: "📊", security: "🔒" };

  return (
    <div className="space-y-4">
      <SectionHeading icon={<Bell className="w-4 h-4" />} title="Notifications Center" description="System notifications, alerts, and reports" />
      <div className="card-elevated p-4">
        <div className="space-y-2">
          {NOTIFICATIONS_CENTER.map(n => (
            <div key={n.id} className={`rounded-xl border p-4 transition-colors ${n.read ? "border-slate-100 bg-white" : "border-cyan-100 bg-cyan-50/50"}`}>
              <div className="flex items-start gap-3">
                <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm ${typeStyles[n.type]}`}>{typeIcons[n.type]}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-bold ${n.read ? "text-slate-700" : "text-slate-900"}`}>{n.title}</p>
                    {!n.read && <span className="h-2 w-2 rounded-full bg-cyan-500" />}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{n.detail}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 9: Security Center
   ───────────────────────────────────────────────────────────────── */

function SecuritySection() {
  return (
    <div className="space-y-6">
      <SectionHeading icon={<ShieldAlert className="w-4 h-4" />} title="Security Center" description="Login activity, audit history, and security monitoring" />

      {/* Security Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="card p-4 text-center"><Shield className="mx-auto h-6 w-6 text-emerald-500" /><p className="text-2xl font-extrabold text-slate-900 mt-1">2FA</p><p className="text-[10px] font-bold text-slate-500 uppercase">Enabled</p></div>
        <div className="card p-4 text-center"><Fingerprint className="mx-auto h-6 w-6 text-cyan-500" /><p className="text-2xl font-extrabold text-slate-900 mt-1">847</p><p className="text-[10px] font-bold text-slate-500 uppercase">Logins Today</p></div>
        <div className="card p-4 text-center"><UserX className="mx-auto h-6 w-6 text-rose-500" /><p className="text-2xl font-extrabold text-slate-900 mt-1">3</p><p className="text-[10px] font-bold text-slate-500 uppercase">Failed Today</p></div>
        <div className="card p-4 text-center"><AlertTriangle className="mx-auto h-6 w-6 text-amber-500" /><p className="text-2xl font-extrabold text-slate-900 mt-1">1</p><p className="text-[10px] font-bold text-slate-500 uppercase">Suspicious</p></div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Logins */}
        <div className="card-elevated p-5">
          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2"><LogOut className="h-4 w-4 text-cyan-500" /> Recent Logins</h3>
          <div className="space-y-2">
            {SECURITY_LOGINS.map((l, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg p-2 hover:bg-slate-50">
                <span className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${l.status === "success" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                  {l.status === "success" ? <CheckCircle2 className="h-4 w-4" /> : <X className="h-4 w-4" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900">{l.user}</p>
                  <p className="text-[10px] text-slate-500">IP: {l.ip} · {l.location}</p>
                </div>
                <span className="text-[10px] text-slate-400">{l.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Audit History */}
        <div className="card-elevated p-5">
          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2"><History className="h-4 w-4 text-violet-500" /> Audit History</h3>
          <div className="space-y-2">
            {SECURITY_AUDIT.map((a, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg p-2 hover:bg-slate-50">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600"><Key className="h-4 w-4" /></span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900">{a.action}</p>
                  <p className="text-[10px] text-slate-500">User: {a.user} · {a.detail}</p>
                  <p className="text-[10px] text-slate-400">By: {a.admin} · {a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 10: Platform Settings
   ───────────────────────────────────────────────────────────────── */

function SettingsSection() {
  const settingsGroups = [
    { title: "General Settings", icon: <Settings className="h-4 w-4 text-slate-500" />, items: ["Platform name & branding", "Default language", "Timezone", "Maintenance mode"] },
    { title: "Learning Settings", icon: <BookOpen className="h-4 w-4 text-cyan-500" />, items: ["Course approval workflow", "Quiz time limits", "Grading scale", "Certificate generation"] },
    { title: "User Settings", icon: <Users className="h-4 w-4 text-emerald-500" />, items: ["Registration policy", "Role permissions", "Account verification", "Data retention"] },
    { title: "Notification Settings", icon: <Bell className="h-4 w-4 text-amber-500" />, items: ["Email templates", "Push notifications", "SMS alerts", "Digest frequency"] },
    { title: "Security Settings", icon: <Shield className="h-4 w-4 text-rose-500" />, items: ["Two-factor authentication", "Password policy", "Session timeout", "IP allowlist"] },
  ];

  return (
    <div className="space-y-4">
      <SectionHeading icon={<Settings className="w-4 h-4" />} title="Platform Settings" description="Configure platform-wide settings" />
      <div className="space-y-3">
        {settingsGroups.map(group => (
          <div key={group.title} className="card-elevated p-5">
            <div className="flex items-center gap-2 mb-3">
              {group.icon}
              <h3 className="text-sm font-bold text-slate-900">{group.title}</h3>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {group.items.map(item => (
                <div key={item} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3 hover:border-cyan-200 transition-colors">
                  <span className="text-xs font-medium text-slate-700">{item}</span>
                  <button type="button" className="btn btn-outline btn-sm text-[10px] px-2 py-1">Configure</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
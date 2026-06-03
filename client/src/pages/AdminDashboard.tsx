import React, { useState } from "react";
import { useLocation } from "wouter";
import {
  Home,
  Map as MapIcon,
  BookOpen,
  Trophy,
  Star,
  BarChart3,
  Settings,
  User as UserIcon,
  Users,
  Building2,
  Activity,
  AlertCircle,
  TrendingUp,
  Plus,
  Shield,
  ChevronRight,
} from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import {
  DashboardLayout,
  type DashboardNavItem,
} from "@/components/DashboardLayout";
import {
  StatCard,
  SectionHeading,
} from "@/components/DashboardWidgets";

type Tab = "overview" | "users" | "schools" | "activity" | "settings";

const SYSTEM_STATS = {
  totalUsers: 12450,
  totalSchools: 32,
  activeUsers24h: 3210,
  systemUptime: 99.97,
  alerts: [
    { id: 1, level: "warning" as const, title: "High server load",      message: "API latency increased by 18% in the last hour." },
    { id: 2, level: "info"    as const, title: "Scheduled maintenance",  message: "Database optimization tonight at 02:00 UTC." },
  ],
};

const REVENUE_DATA = [
  { month: "Jan", revenue: 8200  },
  { month: "Feb", revenue: 9100  },
  { month: "Mar", revenue: 10400 },
  { month: "Apr", revenue: 11200 },
  { month: "May", revenue: 12300 },
  { month: "Jun", revenue: 13800 },
];

const USER_DIST = [
  { name: "Students",  value: 8200, color: "#06b6d4" },
  { name: "Teachers",  value: 1850, color: "#22c55e" },
  { name: "Parents",   value: 1900, color: "#f59e0b" },
  { name: "Admins",    value: 500,  color: "#a78bfa" },
];

const ENGAGEMENT = [
  { day: "Mon", value: 62 },
  { day: "Tue", value: 71 },
  { day: "Wed", value: 75 },
  { day: "Thu", value: 68 },
  { day: "Fri", value: 78 },
  { day: "Sat", value: 55 },
  { day: "Sun", value: 48 },
];

const USERS = [
  { id: 1, name: "Anna Becker",     email: "anna.becker@example.com",  role: "Student",  status: "active",   lastLogin: "2h ago"  },
  { id: 2, name: "Mr. Tom Werner",  email: "tom.werner@school.edu",    role: "Teacher",  status: "active",   lastLogin: "1d ago"  },
  { id: 3, name: "Lukas Schäfer",   email: "lukas.s@example.com",      role: "Student",  status: "inactive", lastLogin: "3w ago"  },
  { id: 4, name: "Dr. Sarah J.",    email: "sarah@riverside.edu",      role: "Teacher",  status: "active",   lastLogin: "5h ago"  },
  { id: 5, name: "Mia Wagner",      email: "mia.w@example.com",        role: "Student",  status: "active",   lastLogin: "30m ago" },
];

const SCHOOLS = [
  { id: 1, name: "Riverside Academy", city: "Berlin",  students: 450, teachers: 35, classes: 18, plan: "Premium",  endDate: "2025-12-31", status: "active"   as const },
  { id: 2, name: "Sunrise School",    city: "Munich",  students: 320, teachers: 24, classes: 14, plan: "Standard", endDate: "2025-08-15", status: "active"   as const },
  { id: 3, name: "Nordsee Gymnasium", city: "Hamburg", students: 180, teachers: 12, classes:  8, plan: "Standard", endDate: "2024-04-01", status: "inactive" as const },
];

const ACTIVITY_LOGS = [
  { id: 1, user: "Anna Becker",   action: "Lesson completed",  details: "Loops & Iteration",   time: "2h ago",  status: "success" },
  { id: 2, user: "Mr. Werner",    action: "Created quiz",      details: "Mathematics Module 5", time: "5h ago",  status: "success" },
  { id: 3, user: "System",        action: "Backup completed",  details: "Nightly snapshot",     time: "12h ago", status: "success" },
  { id: 4, user: "Sarah J.",      action: "Updated grade",      details: "Class 10A · 92/100",   time: "1d ago",  status: "success" },
  { id: 5, user: "System",        action: "Server alert",       details: "CPU load > 80%",        time: "2d ago",  status: "alert"   },
];

const SETTINGS_LIST = [
  { title: "Email configuration",   desc: "Configure email providers and templates" },
  { title: "API keys",                desc: "Manage integrations and webhooks" },
  { title: "Security",                desc: "Two-factor auth, password policies" },
  { title: "Backup & recovery",       desc: "Schedule and monitor backups" },
  { title: "Maintenance mode",        desc: "Take the platform offline temporarily" },
  { title: "System logs",             desc: "Export, view and search logs" },
];

export default function AdminDashboard() {
  const { t } = useI18n();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const navItems: DashboardNavItem[] = [
    { to: "/",            id: "home",         labelKey: "nav.home",         icon: <Home className="w-4 h-4" /> },
    { to: "/archipelago", id: "archipelago",  labelKey: "nav.archipelagos", icon: <MapIcon className="w-4 h-4" /> },
    { to: "/courses",     id: "courses",      labelKey: "nav.courses",      icon: <BookOpen className="w-4 h-4" /> },
    { to: "/dashboard",   id: "achievements", labelKey: "nav.achievements", icon: <Trophy className="w-4 h-4" /> },
    { to: "/dashboard",   id: "xp",           labelKey: "nav.xpLevels",     icon: <Star className="w-4 h-4" /> },
    { to: "/dashboard",   id: "progress",     labelKey: "nav.progress",     icon: <BarChart3 className="w-4 h-4" /> },
    { to: "/login",       id: "settings",     labelKey: "nav.settings",     icon: <Settings className="w-4 h-4" /> },
    { to: "/dashboard",   id: "profile",      labelKey: "nav.profile",      icon: <UserIcon className="w-4 h-4" /> },
  ];

  const tabs: { id: Tab; labelKey: string; icon: React.ReactNode }[] = [
    { id: "overview", labelKey: "dashboard.professionalDashboard", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "users",    labelKey: "dashboard.activeStudents",          icon: <Users className="w-4 h-4" /> },
    { id: "schools",  labelKey: "dashboard.totalUsers",              icon: <Building2 className="w-4 h-4" /> },
    { id: "activity", labelKey: "dashboard.recentActivity",         icon: <Activity className="w-4 h-4" /> },
    { id: "settings", labelKey: "common.settings",                  icon: <Settings className="w-4 h-4" /> },
  ];

  const handleNav = (item: DashboardNavItem) => {
    if (item.to && item.to !== "#") setLocation(item.to);
  };

  return (
    <DashboardLayout
      titleKey="dashboard.adminDashboard"
      subtitleKey="dashboard.adminSubtitle"
      navItems={navItems}
      activeKey="/dashboard"
      onNavigate={handleNav}
    >
      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
              activeTab === tab.id
                ? "bg-cyan-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {tab.icon}
            {t(tab.labelKey)}
          </button>
        ))}
      </div>

      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "users" && <UsersTab />}
      {activeTab === "schools" && <SchoolsTab />}
      {activeTab === "activity" && <ActivityTab />}
      {activeTab === "settings" && <SettingsTab />}
    </DashboardLayout>
  );
}

function OverviewTab() {
  const { t } = useI18n();
  return (
    <div className="space-y-6">
      {/* Alerts */}
      {SYSTEM_STATS.alerts.length > 0 && (
        <div className="space-y-3">
          {SYSTEM_STATS.alerts.map((a) => (
            <div
              key={a.id}
              className={`flex items-start gap-3 rounded-2xl border-l-4 p-4 ${
                a.level === "warning"
                  ? "border-amber-400 bg-amber-50"
                  : "border-cyan-400 bg-cyan-50"
              }`}
            >
              <AlertCircle
                className={`mt-0.5 h-5 w-5 shrink-0 ${
                  a.level === "warning" ? "text-amber-500" : "text-cyan-500"
                }`}
              />
              <div>
                <p className="text-sm font-bold text-slate-900">{a.title}</p>
                <p className="text-xs text-slate-600">{a.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label={t("dashboard.totalUsers")}   value={SYSTEM_STATS.totalUsers.toLocaleString()} icon={<Users className="w-5 h-5" />} accent="from-cyan-500 to-teal-600" trend={{ value: "+12%", positive: true }} />
        <StatCard label="Schools"                   value={SYSTEM_STATS.totalSchools} icon={<Building2 className="w-5 h-5" />} accent="from-emerald-500 to-teal-500" />
        <StatCard label={t("dashboard.activeNow")}   value={SYSTEM_STATS.activeUsers24h.toLocaleString()} icon={<Activity className="w-5 h-5" />} accent="from-amber-400 to-orange-500" trend={{ value: "+5%", positive: true }} />
        <StatCard label={t("dashboard.systemHealth")} value={`${SYSTEM_STATS.systemUptime}%`} icon={<Shield className="w-5 h-5" />} accent="from-violet-500 to-fuchsia-500" />
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 card-elevated p-5">
          <SectionHeading icon={<TrendingUp className="w-4 h-4" />} title="Monthly revenue" />
          <div className="flex h-44 items-end gap-2">
            {REVENUE_DATA.map((d) => {
              const max = Math.max(...REVENUE_DATA.map((r) => r.revenue));
              return (
                <div key={d.month} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className="w-full rounded-lg bg-gradient-to-t from-cyan-500 to-teal-400"
                    style={{ height: `${(d.revenue / max) * 100}%` }}
                    title={`€${d.revenue.toLocaleString()}`}
                  />
                  <span className="text-[10px] font-bold text-slate-500">{d.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card-elevated p-5">
          <SectionHeading icon={<Users className="w-4 h-4" />} title="User distribution" />
          <ul className="space-y-2">
            {USER_DIST.map((u) => (
              <li key={u.name} className="flex items-center gap-3">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ background: u.color }}
                  aria-hidden
                />
                <span className="flex-1 text-sm text-slate-700">{u.name}</span>
                <span className="text-sm font-bold text-cyan-700">{u.value.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="card-elevated p-5">
        <SectionHeading icon={<BarChart3 className="w-4 h-4" />} title="Weekly engagement" />
        <div className="flex h-44 items-end gap-2">
          {ENGAGEMENT.map((e) => {
            const max = Math.max(...ENGAGEMENT.map((x) => x.value));
            return (
              <div key={e.day} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-lg bg-gradient-to-t from-cyan-500 to-teal-400"
                  style={{ height: `${(e.value / max) * 100}%` }}
                  title={`${e.value}%`}
                />
                <span className="text-[10px] font-bold text-slate-500">{e.day}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function UsersTab() {
  return (
    <div className="card-elevated p-5">
      <SectionHeading
        icon={<Users className="w-4 h-4" />}
        title="User management"
        description="Manage all platform users"
        action={
          <button type="button" className="btn btn-primary btn-sm">
            <Plus className="h-4 w-4" />
            Add user
          </button>
        }
      />
      <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Last login</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {USERS.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-semibold text-slate-900">{u.name}</td>
                <td className="px-4 py-3 text-slate-600">{u.email}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full bg-cyan-50 px-2.5 py-0.5 text-xs font-bold text-cyan-700">
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      u.status === "active"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-600">{u.lastLogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SchoolsTab() {
  return (
    <div className="space-y-3">
      <SectionHeading
        icon={<Building2 className="w-4 h-4" />}
        title="School management"
        description="Manage all schools on the platform"
        action={
          <button type="button" className="btn btn-primary btn-sm">
            <Plus className="h-4 w-4" />
            Add school
          </button>
        }
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SCHOOLS.map((s) => (
          <div key={s.id} className="card card-interactive p-5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">{s.name}</h3>
                <p className="text-xs text-slate-500">{s.city}</p>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  s.status === "active"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {s.status}
              </span>
            </div>
            <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
              <Cell label="Students" value={s.students} />
              <Cell label="Teachers" value={s.teachers} />
              <Cell label="Classes"  value={s.classes} />
            </dl>
            <div className="mt-3 space-y-1 text-xs text-slate-600">
              <p>Plan: <strong className="text-slate-900">{s.plan}</strong></p>
              <p>Renews: {s.endDate}</p>
            </div>
            <div className="mt-3 flex gap-2">
              <button type="button" className="btn btn-outline btn-sm flex-1">
                Edit
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityTab() {
  return (
    <div className="card-elevated p-5">
      <SectionHeading icon={<Activity className="w-4 h-4" />} title="System activity" />
      <ul className="divide-y divide-slate-100">
        {ACTIVITY_LOGS.map((l) => (
          <li key={l.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
            <span
              className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ${
                l.status === "success"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {l.user.split(" ").map((p) => p[0]).join("").slice(0, 2)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">
                {l.user} <span className="font-normal text-slate-500">· {l.action}</span>
              </p>
              <p className="truncate text-xs text-slate-500">{l.details}</p>
            </div>
            <span className="text-xs text-slate-500">{l.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="card-elevated p-5">
      <SectionHeading icon={<Settings className="w-4 h-4" />} title="System settings" />
      <div className="grid gap-3 sm:grid-cols-2">
        {SETTINGS_LIST.map((s) => (
          <div
            key={s.title}
            className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 hover:border-cyan-300 transition-colors"
          >
            <div>
              <p className="text-sm font-bold text-slate-900">{s.title}</p>
              <p className="text-xs text-slate-500">{s.desc}</p>
            </div>
            <button type="button" className="btn btn-outline btn-sm">
              Configure
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Cell({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-slate-50 p-2">
      <p className="text-base font-extrabold text-slate-900">{value}</p>
      <p className="text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
    </div>
  );
}

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
  Compass,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  Users,
  GraduationCap,
} from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { authService, type User } from "@/lib/auth-service";
import {
  DashboardLayout,
  type DashboardNavItem,
} from "@/components/DashboardLayout";
import {
  StatCard,
  SectionHeading,
} from "@/components/DashboardWidgets";

interface ProfessionalDashboardProps {
  user: User;
}

const QUICK_ACTIONS: { id: string; title: string; description: string; icon: React.ReactNode; to: string; color: string }[] = [
  { id: "qa1", title: "Browse courses",     description: "Find new learning content", icon: <BookOpen className="w-5 h-5" />,     to: "/courses",      color: "from-cyan-500 to-teal-600" },
  { id: "qa2", title: "View archipelago",   description: "Continue your learning path", icon: <Compass className="w-5 h-5" />,    to: "/archipelago", color: "from-emerald-500 to-teal-500" },
  { id: "qa3", title: "Leaderboard",        description: "See where you rank",            icon: <Trophy className="w-5 h-5" />,     to: "/leaderboard", color: "from-amber-400 to-orange-500" },
  { id: "qa4", title: "My progress",        description: "Track XP and achievements",    icon: <BarChart3 className="w-5 h-5" />,   to: "/dashboard",   color: "from-violet-500 to-fuchsia-500" },
];

const UPCOMING: { id: number; title: string; type: "live" | "reminder" | "event"; when: string }[] = [
  { id: 1, title: "Live Q&A — Mathematics",   type: "live",     when: "Today 14:00" },
  { id: 2, title: "Quiz due: Loops",          type: "reminder", when: "Tomorrow"   },
  { id: 3, title: "Parent meeting",            type: "event",    when: "Friday 16:00" },
];

export default function ProfessionalDashboard({ user }: ProfessionalDashboardProps) {
  const { t } = useI18n();
  const [, setLocation] = useLocation();

  // Route sub-dashboards to their specialized variants
  // (handled by the route layer — this component renders only the generic
  // professional dashboard view.)
  void user;

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

  const handleNav = (item: DashboardNavItem) => {
    if (item.to && item.to !== "#") setLocation(item.to);
  };

  return (
    <DashboardLayout
      titleKey="dashboard.professionalDashboard"
      subtitleKey="dashboard.professionalSubtitle"
      navItems={navItems}
      activeKey="/dashboard"
      onNavigate={handleNav}
    >
      <div className="space-y-6">
        {/* Welcome hero */}
        <section
          className="relative overflow-hidden rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-600 via-cyan-700 to-teal-700 p-6 text-white shadow-lg sm:p-8"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              background:
                "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.15) 0%, transparent 40%)",
            }}
            aria-hidden
          />
          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold sm:text-3xl">
                {t("dashboard.welcomeBackExplorer")}
              </h2>
              <p className="mt-1 text-sm text-cyan-50/90">
                {t("dashboard.professionalSubtitle")}
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">
              <Star className="h-3.5 w-3.5" />
              {user?.role ?? "user"}
            </span>
          </div>
        </section>

        {/* KPIs */}
        <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard label={t("dashboard.activeStudents")} value="2,450" icon={<Users className="w-5 h-5" />} accent="from-cyan-500 to-teal-600" trend={{ value: "+12%", positive: true }} />
          <StatCard label={t("nav.courses")}            value="12"     icon={<BookOpen className="w-5 h-5" />} accent="from-emerald-500 to-teal-500" />
          <StatCard label={t("common.achievement") + " (avg)"} value="78%" icon={<GraduationCap className="w-5 h-5" />} accent="from-amber-400 to-orange-500" trend={{ value: "+3.4%", positive: true }} />
          <StatCard label={t("dashboard.engagement")} value="85%"    icon={<TrendingUp className="w-5 h-5" />} accent="from-violet-500 to-fuchsia-500" trend={{ value: "+5%", positive: true }} />
        </section>

        {/* Quick actions + Upcoming */}
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 card-elevated p-5">
            <SectionHeading
              icon={<Compass className="w-4 h-4" />}
              title={t("dashboard.quickActions")}
              description="Jump back into your day"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {QUICK_ACTIONS.map((qa) => (
                <button
                  key={qa.id}
                  type="button"
                  onClick={() => setLocation(qa.to)}
                  className="card card-interactive group p-4 text-left"
                >
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${qa.color} text-white shadow-sm transition-transform group-hover:scale-110`}
                  >
                    {qa.icon}
                  </span>
                  <p className="mt-3 text-sm font-bold text-slate-900">{qa.title}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{qa.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-cyan-700">
                    Open
                    <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="card-elevated p-5">
            <SectionHeading icon={<CheckCircle2 className="w-4 h-4" />} title="Upcoming" />
            <ul className="space-y-3">
              {UPCOMING.map((u) => (
                <li
                  key={u.id}
                  className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3"
                >
                  <span
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${
                      u.type === "live"
                        ? "bg-rose-100 text-rose-600"
                        : u.type === "reminder"
                        ? "bg-amber-100 text-amber-600"
                        : "bg-cyan-100 text-cyan-600"
                    }`}
                  >
                    {u.type === "live" ? "🔴" : u.type === "reminder" ? "⏰" : "📅"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">{u.title}</p>
                    <p className="text-xs text-slate-500">{u.when}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

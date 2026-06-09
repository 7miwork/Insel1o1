import React from "react";
import { useLocation } from "wouter";
import {
  Home,
  BookOpen,
  BarChart3,
  Settings,
  Users,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Calendar,
  FileText,
  Bell,
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

const QUICK_ACTIONS = [
  { id: "qa1", title: "Kurse durchsuchen", description: "Neue Lerninhalte finden", icon: <BookOpen className="w-5 h-5" />, to: "/courses", color: "from-cyan-500 to-teal-600" },
  { id: "qa2", title: "Berichte ansehen", description: "Fortschritt und Leistung", icon: <BarChart3 className="w-5 h-5" />, to: "/dashboard", color: "from-violet-500 to-fuchsia-500" },
  { id: "qa3", title: "Klassen verwalten", description: "Schüler und Kurse organisieren", icon: <Users className="w-5 h-5" />, to: "/school-dashboard", color: "from-amber-400 to-orange-500" },
  { id: "qa4", title: "Mitteilungen", description: "Benachrichtigungen prüfen", icon: <Bell className="w-5 h-5" />, to: "/dashboard", color: "from-emerald-500 to-teal-500" },
];

const UPCOMING = [
  { id: 1, title: "Live Q&A — Mathematik", type: "live" as const, when: "Heute 14:00" },
  { id: 2, title: "Test abgeben: Schleifen", type: "reminder" as const, when: "Morgen" },
  { id: 3, title: "Elternabend", type: "event" as const, when: "Freitag 16:00" },
];

export default function ProfessionalDashboard({ user }: ProfessionalDashboardProps) {
  const { t } = useI18n();
  const [, setLocation] = useLocation();

  const navItems: DashboardNavItem[] = [
    { to: "/", id: "home", labelKey: "nav.home", icon: <Home className="w-4 h-4" /> },
    { to: "/courses", id: "courses", labelKey: "nav.courses", icon: <BookOpen className="w-4 h-4" /> },
    { to: "/dashboard", id: "analytics", labelKey: "nav.analytics", icon: <BarChart3 className="w-4 h-4" /> },
    { to: "/school-dashboard", id: "school", labelKey: "nav.school", icon: <Users className="w-4 h-4" /> },
    { to: "/login", id: "settings", labelKey: "nav.settings", icon: <Settings className="w-4 h-4" /> },
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
        {/* Welcome hero - clean, professional */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-white sm:p-8">
          <div className="relative">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Willkommen zurück, {user?.firstName ?? "User"}
            </h2>
            <p className="mt-1 text-sm text-slate-300">
              {t("dashboard.professionalSubtitle")}
            </p>
          </div>
        </section>

        {/* KPIs - professional metrics */}
        <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard label="Aktive Schüler" value="2.450" icon={<Users className="w-5 h-5" />} accent="from-cyan-500 to-teal-600" trend={{ value: "+12%", positive: true }} />
          <StatCard label="Kurse" value="12" icon={<BookOpen className="w-5 h-5" />} accent="from-emerald-500 to-teal-500" />
          <StatCard label="Abschlussrate" value="78%" icon={<GraduationCap className="w-5 h-5" />} accent="from-amber-400 to-orange-500" trend={{ value: "+3.4%", positive: true }} />
          <StatCard label="Engagement" value="85%" icon={<TrendingUp className="w-5 h-5" />} accent="from-violet-500 to-fuchsia-500" trend={{ value: "+5%", positive: true }} />
        </section>

        {/* Quick actions + Upcoming */}
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-5">
            <SectionHeading
              icon={<BarChart3 className="w-4 h-4" />}
              title="Schnellzugriff"
              description="Häufig genutzte Aktionen"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {QUICK_ACTIONS.map((qa) => (
                <button
                  key={qa.id}
                  type="button"
                  onClick={() => setLocation(qa.to)}
                  className="group flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 p-4 text-left hover:border-slate-200 hover:bg-white transition-all"
                >
                  <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${qa.color} text-white shadow-sm`}>
                    {qa.icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{qa.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{qa.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <SectionHeading icon={<Calendar className="w-4 h-4" />} title="Termine" />
            <ul className="space-y-3 mt-3">
              {UPCOMING.map((u) => (
                <li key={u.id} className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3">
                  <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs ${
                    u.type === "live" ? "bg-rose-100 text-rose-600" : u.type === "reminder" ? "bg-amber-100 text-amber-600" : "bg-cyan-100 text-cyan-600"
                  }`}>
                    {u.type === "live" ? "🔴" : u.type === "reminder" ? "⏰" : "📅"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-900">{u.title}</p>
                    <p className="text-xs text-slate-500">{u.when}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <SectionHeading icon={<FileText className="w-4 h-4" />} title="Letzte Aktivitäten" description="Übersicht der letzten Ereignisse" />
          <div className="mt-4 space-y-3">
            {[
              { title: "Neue Anmeldung: Anna B.", time: "15 min ago", type: "user" },
              { title: "Kurs abgeschlossen: Mathematik Kl. 9", time: "1 hour ago", type: "course" },
              { title: "Bericht erstellt: Wochenstatistik", time: "2 hours ago", type: "report" },
              { title: "Test benotet: Bruchrechnung", time: "Yesterday", type: "quiz" },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3">
                <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs ${
                  activity.type === "user" ? "bg-emerald-100 text-emerald-600" :
                  activity.type === "course" ? "bg-cyan-100 text-cyan-600" :
                  activity.type === "report" ? "bg-violet-100 text-violet-600" : "bg-amber-100 text-amber-600"
                }`}>
                  {activity.type === "user" ? "👤" : activity.type === "course" ? "📚" : activity.type === "report" ? "📊" : "📝"}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{activity.title}</p>
                  <p className="text-xs text-slate-400">{activity.time}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
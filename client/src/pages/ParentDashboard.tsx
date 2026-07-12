import React, { useState } from "react";
import { useLocation } from "wouter";
import {
  Home,
  BookOpen,
  BarChart3,
  Settings,
  Users,
  Clock,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  Lightbulb,
  CheckCircle2,
  Circle,
  Play,
  Flame,
  Timer,
  FileText,
  AlertTriangle,
  CalendarCheck,
  BarChart2,
  BookMarked,
  Bell,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { authService } from "@/lib/auth-service";
import { useParentDashboardData } from "@/hooks/useParentDashboardData";
import {
  DashboardLayout,
  type DashboardNavItem,
} from "@/components/DashboardLayout";
import {
  StatCard,
  SectionHeading,
} from "@/components/DashboardWidgets";

/* ─────────────────────────────────────────────────────────────────
   MOCK DATA — placeholders
   ───────────────────────────────────────────────────────────────── */

// Demo-Daten, keine Subjects-Aufschlüsselung vorhanden
const SUBJECTS: any[] = [
  { name: "Mathematics", icon: "🎯", progress: 85, trend: 5, color: "from-cyan-500 to-cyan-400", bgColor: "bg-cyan-50", borderColor: "border-cyan-200", grade: "A" },
  { name: "Language", icon: "📚", progress: 78, trend: 3, color: "from-emerald-500 to-emerald-400", bgColor: "bg-emerald-50", borderColor: "border-emerald-200", grade: "B+" },
  { name: "Science", icon: "🧠", progress: 72, trend: 8, color: "from-violet-500 to-violet-400", bgColor: "bg-violet-50", borderColor: "border-violet-200", grade: "B" },
];

// Demo-Daten, kein Hausaufgaben-System vorhanden
const TASKS: any[] = [
  { id: "t1", title: "Math Worksheet", subject: "Mathematics", status: "pending", dueDate: "Tomorrow", priority: "high" },
  { id: "t2", title: "Science Experiment", subject: "Science", status: "in-progress", dueDate: "Wednesday", priority: "medium" },
  { id: "t3", title: "Reading Assignment", subject: "Language", status: "completed", dueDate: "Today", priority: "low" },
];

// Demo-Daten, kein Nachrichten-System vorhanden
const NOTIFICATIONS: any[] = [
  { id: "n1", type: "message", title: "Message from Teacher", detail: "Great progress this week!", time: "2 hours ago", read: false },
  { id: "n2", type: "assignment", title: "New Assignment", detail: "Math worksheet due tomorrow", time: "3 hours ago", read: false },
];

// Demo-Daten, Insights-Berechnung basiert auf nicht-vorhandenen Fächern
const DEMO_INSIGHTS = {
  strongestSubject: "Mathematics",
  weakestSubject: "Science",
  recommendedActivity: "Practice daily reading to improve language skills",
  weeklySummary: "Completed 6 lessons with an average score of 76%.",
};

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────────── */

export default function ParentDashboard() {
  const { t } = useI18n();
  const [, setLocation] = useLocation();
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [taskFilter, setTaskFilter] = useState("all");

  const user = authService.getCurrentUser();
  const parentName = user?.firstName ?? "Parent";

  const navItems: DashboardNavItem[] = [
    { to: "/", id: "home", labelKey: "nav.home", icon: <Home className="w-4 h-4" /> },
    { to: "/courses", id: "courses", labelKey: "nav.courses", icon: <BookOpen className="w-4 h-4" /> },
    { to: "/dashboard", id: "analytics", labelKey: "nav.analytics", icon: <BarChart3 className="w-4 h-4" /> },
    { to: "/login", id: "settings", labelKey: "nav.settings", icon: <Settings className="w-4 h-4" /> },
  ];

  const handleNav = (item: DashboardNavItem) => {
    if (item.to && item.to !== "#") setLocation(item.to);
  };

  const { loading, error, children: realChildren, hasNoChildren } = useParentDashboardData();

  const displayChildren = realChildren.length > 0 ? realChildren : [];
  const activeChild = selectedChildId ? displayChildren.find((c: any) => c.id === selectedChildId) || displayChildren[0] : displayChildren[0];

  const totalTasksDue = TASKS.filter((t: any) => t.status === "pending").length;
  const totalCompleted = TASKS.filter((t: any) => t.status === "completed").length;
  const avgProgress = displayChildren.length > 0 ? Math.round(displayChildren.reduce((sum: number, c: any) => sum + c.overallProgress, 0) / displayChildren.length) : 0;

  return (
    <DashboardLayout
      titleKey="dashboard.parentDashboard"
      subtitleKey="dashboard.parentSubtitle"
      navItems={navItems}
      activeKey="/dashboard"
      onNavigate={handleNav}
    >
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-slate-300 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm text-slate-500">Loading parent dashboard...</p>
        </div>
      )}

      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-sm text-red-600 mb-2">{error}</p>
          <button onClick={() => window.location.reload()} className="text-sm text-indigo-600 underline">Try again</button>
        </div>
      )}

      {!loading && !error && hasNoChildren && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Users className="h-12 w-12 text-slate-300 mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Noch kein Kind verknüpft</h2>
          <p className="text-sm text-slate-500 max-w-md">Du hast noch keine Kinder verknüpft.</p>
        </div>
      )}

      {!loading && !error && !hasNoChildren && (
        <div className="space-y-6">
          <WelcomeSection parentName={parentName} />

          <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard label="Children" value={displayChildren.length} icon={<Users className="w-5 h-5" />} accent="from-cyan-500 to-teal-600" />
            <StatCard label="Assignments Due" value={totalTasksDue} icon={<FileText className="w-5 h-5" />} accent="from-amber-400 to-orange-500" />
            <StatCard label="Completed" value={totalCompleted} icon={<CheckCircle2 className="w-5 h-5" />} accent="from-emerald-500 to-teal-500" />
            <StatCard label="Avg Progress" value={`${avgProgress}%`} icon={<TrendingUp className="w-5 h-5" />} accent="from-violet-500 to-fuchsia-500" />
          </section>

          <section>
            <SectionHeading icon={<Users className="w-4 h-4" />} title="My Children" description="Select a child" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {displayChildren.map((child: any) => (
                <button key={child.id} type="button" onClick={() => setSelectedChildId(child.id)}
                  className={`card card-interactive p-5 text-left ${selectedChildId === child.id ? "ring-2 ring-cyan-400" : ""}`}>
                  <span className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${child.avatarGradient} text-white font-bold`}>
                    {child.initials}
                  </span>
                  <p className="font-bold text-slate-900">{child.name}</p>
                  <p className="text-xs text-slate-500">{child.overallProgress}% progress · {child.weeklyMinutes} min this week</p>
                </button>
              ))}
            </div>
          </section>

          {activeChild && (
            <>
              <section>
                <SectionHeading icon={<BarChart2 className="w-4 h-4" />} title="Subject Performance" description="Progress across subjects" />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {SUBJECTS.map((s: any) => (
                    <div key={s.name} className={`card p-4 ${s.bgColor} ${s.borderColor} border`}>
                      <p className="font-bold text-sm">{s.name}</p>
                      <p className="text-xs text-slate-500">Grade: {s.grade}</p>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs"><span>Progress</span><span>{s.progress}%</span></div>
                        <div className="h-2 bg-slate-100 rounded-full mt-1"><div className="h-full bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full" style={{ width: `${s.progress}%` }} /></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <SectionHeading icon={<Clock className="w-4 h-4" />} title="Recent Activity" />
                  <div className="card-elevated p-5 space-y-2">
                    {(activeChild.recentActivities || []).slice(0, 3).map((activity: any, idx: number) => (
                      <div key={idx} className="flex gap-3 items-center border-b border-slate-100 pb-2 last:border-0">
                        <span className="text-2xl">{activity.icon}</span>
                        <div><p className="text-sm font-bold">{activity.title}</p><p className="text-xs text-slate-400">{activity.time}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <SectionHeading icon={<Bell className="w-4 h-4" />} title="Notifications" />
                  <div className="card-elevated p-4 space-y-2">
                    {NOTIFICATIONS.map((n: any) => (
                      <div key={n.id} className={`p-3 rounded-xl border ${n.read ? "bg-white border-slate-100" : "bg-cyan-50 border-cyan-100"}`}>
                        <p className="text-xs font-bold">{n.title}</p>
                        <p className="text-[11px] text-slate-500">{n.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section>
                <SectionHeading icon={<Flame className="w-4 h-4" />} title="Learning Consistency" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="card-elevated p-5 text-center">
                    <ShieldCheck className="mx-auto h-8 w-8 text-cyan-500" />
                    <p className="text-2xl font-extrabold">{activeChild.insights?.consistencyScore || 0}%</p>
                    <p className="text-xs text-slate-500">Consistency</p>
                  </div>
                  <div className="card-elevated p-5">
                    <Timer className="h-4 w-4 text-cyan-500 mb-2" />
                    <p className="text-2xl font-extrabold">{activeChild.weeklyMinutes}m</p>
                    <p className="text-xs text-slate-500">Weekly Time</p>
                  </div>
                  <div className="card-elevated p-5">
                    <BarChart2 className="h-4 w-4 text-violet-500 mb-2" />
                    <p className="text-2xl font-extrabold">{activeChild.insights?.avgQuizScore || 0}%</p>
                    <p className="text-xs text-slate-500">Avg Quiz Score</p>
                  </div>
                </div>
              </section>

              <section>
                <SectionHeading icon={<Lightbulb className="w-4 h-4" />} title="Insights" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="card-elevated p-5">
                    <TrendingUp className="h-4 w-4 text-emerald-600 mb-2" />
                    <p className="text-xs font-bold text-emerald-700">Strongest</p>
                    <p className="font-bold">{DEMO_INSIGHTS.strongestSubject}</p>
                  </div>
                  <div className="card-elevated p-5">
                    <TrendingDown className="h-4 w-4 text-rose-600 mb-2" />
                    <p className="text-xs font-bold text-rose-700">Needs Attention</p>
                    <p className="font-bold">{DEMO_INSIGHTS.weakestSubject}</p>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}

function WelcomeSection({ parentName }: { parentName: string }) {
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const dateStr = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <section className="relative overflow-hidden rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-600 via-cyan-700 to-teal-700 p-6 text-white shadow-lg">
      <div className="relative">
        <h2 className="text-2xl font-extrabold sm:text-3xl">{greeting}, {parentName}!</h2>
        <p className="mt-1 text-sm text-cyan-50/80">{dateStr}</p>
      </div>
    </section>
  );
}
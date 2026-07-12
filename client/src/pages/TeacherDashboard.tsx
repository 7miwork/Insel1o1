import React, { useState } from "react";
import { useLocation } from "wouter";
import {
  Home,
  BookOpen,
  BarChart3,
  Settings,
  Users,
  GraduationCap,
  ChevronRight,
  CheckCircle2,
  ClipboardList,
  Calendar,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
  Target,
  Brain,
  Palette,
  Heart,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  Send,
  Plus,
  FileText,
  BarChart2,
  BookMarked,
  Lightbulb,
  Eye,
  Circle,
  Play,
  Search,
  MessageCircle,
  Phone,
  Mail,
  CalendarCheck,
  ShieldAlert,
  UserX,
  Timer,
} from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { authService } from "@/lib/auth-service";
import { useTeacherDashboardData } from "@/hooks/useTeacherDashboardData";
import type { ClassData, StudentData, ActivityItem } from "@/hooks/useTeacherDashboardData";
import {
  DashboardLayout,
  type DashboardNavItem,
} from "@/components/DashboardLayout";
import { StatCard, SectionHeading } from "@/components/DashboardWidgets";

/* ─────────────────────────────────────────────────────────────────
   MOCK DATA — placeholders
   ───────────────────────────────────────────────────────────────── */

// Demo-Daten, keine Assignments-Tabelle vorhanden
const ASSIGNMENTS: any[] = [];
// Demo-Daten, keine Subjects-Aufschlüsselung vorhanden
const SUBJECTS: any[] = [];
// Demo-Daten, kein Difficulty-Tracking vorhanden
const HARDEST_LESSONS: any[] = [];
const EASIEST_LESSONS: any[] = [];
// Demo-Daten, kein Nachrichten-System vorhanden
const MESSAGES: any[] = [];
// Demo-Daten, kein Zeitreihen-Tracking vorhanden
const WEEKLY_TREND: any[] = [];

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────────── */

export default function TeacherDashboard() {
  const { t } = useI18n();
  const [, setLocation] = useLocation();
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [assignmentFilter, setAssignmentFilter] = useState<"all" | "active" | "draft" | "closed">("all");
  const [studentFilter, setStudentFilter] = useState<"all" | "at-risk" | "needs-attention" | "on-track">("all");

  const user = authService.getCurrentUser();
  const teacherName = user?.firstName ?? "Teacher";

  const navItems: DashboardNavItem[] = [
    { to: "/",            id: "home",         labelKey: "nav.home",         icon: <Home className="w-4 h-4" /> },
    { to: "/courses",     id: "courses",      labelKey: "nav.courses",      icon: <BookOpen className="w-4 h-4" /> },
    { to: "/dashboard",   id: "analytics",    labelKey: "nav.analytics",    icon: <BarChart3 className="w-4 h-4" /> },
    { to: "/school-dashboard", id: "school",  labelKey: "nav.school",       icon: <Users className="w-4 h-4" /> },
    { to: "/login",       id: "settings",     labelKey: "nav.settings",     icon: <Settings className="w-4 h-4" /> },
  ];

  const handleNav = (item: DashboardNavItem) => {
    if (item.to && item.to !== "#") setLocation(item.to);
  };

  const {
    loading,
    error,
    classes: realClasses,
    students: realStudents,
    activities: realActivities,
    totalDistinctStudents,
  } = useTeacherDashboardData();

  const displayClasses = realClasses;
  const displayStudents = realStudents;
  const displayActivities = realActivities;

  const activeClass = selectedClass || (displayClasses.length > 0 ? displayClasses[0] : null);
  const totalStudents = totalDistinctStudents || (activeClass ? activeClass.studentCount : 0);
  const totalOpenAssignments = 0; // Demo
  const totalNeedingHelp = displayStudents.filter(s => s.status !== "on-track").length;
  const avgProgress = activeClass ? activeClass.avgCompletion : (displayClasses.length > 0 ? Math.round(displayClasses.reduce((s, c) => s + c.avgCompletion, 0) / displayClasses.length) : 0);

  return (
    <DashboardLayout
      titleKey="dashboard.teacherDashboard"
      subtitleKey="dashboard.teacherSubtitle"
      navItems={navItems}
      activeKey="/dashboard"
      onNavigate={handleNav}
    >
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-slate-300 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm text-slate-500">Loading teacher dashboard...</p>
        </div>
      )}

      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-sm text-red-600 mb-2">{error}</p>
          <button onClick={() => window.location.reload()} className="text-sm text-indigo-600 underline">Try again</button>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-6">
          <WelcomeSection
            teacherName={teacherName}
            totalStudents={totalStudents}
            totalClasses={displayClasses.length}
            studentsNeedingHelp={totalNeedingHelp}
          />

          <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard label="Total Classes" value={displayClasses.length} icon={<ClipboardList className="w-5 h-5" />} accent="from-cyan-500 to-teal-600" />
            <StatCard label="Total Students" value={totalStudents} icon={<Users className="w-5 h-5" />} accent="from-emerald-500 to-teal-500" />
            <StatCard label="Open Assignments" value={totalOpenAssignments} icon={<FileText className="w-5 h-5" />} accent="from-amber-400 to-orange-500" />
            <StatCard label="Need Support" value={totalNeedingHelp} icon={<AlertTriangle className="w-5 h-5" />} accent="from-rose-400 to-rose-500" trend={{ value: `${totalNeedingHelp} students`, positive: false }} />
          </section>

          <section>
            <SectionHeading icon={<ClipboardList className="w-4 h-4" />} title="Class Overview" description="Select a class to view details" />
            {displayClasses.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
                <ClipboardList className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                <p className="text-sm text-slate-500">Noch keine Klassen vorhanden. Erstelle deine erste Klasse!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {displayClasses.map((cls) => {
                  const isActive = activeClass?.id === cls.id;
                  return (
                    <button key={cls.id} type="button" onClick={() => setSelectedClass(cls)} className={`card card-interactive p-4 text-left transition-all ${isActive ? "ring-2 ring-cyan-400 shadow-md" : ""}`}>
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${cls.color} text-white`}>
                          <Users className="h-5 w-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-extrabold text-slate-900">{cls.name}</p>
                          <p className="text-[10px] text-slate-500">{cls.subject}</p>
                        </div>
                      </div>
                      <div className="mt-3 space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                          <span>{cls.studentCount} students</span>
                          <span>{cls.avgCompletion}% avg</span>
                        </div>
                        <div className="progress-track">
                          <div className="progress-fill" style={{ width: `${cls.avgCompletion}%` }} />
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-slate-400">Grade: {cls.avgGrade}</span>
                          {cls.studentsNeedingHelp > 0 && (
                            <span className="flex items-center gap-0.5 text-amber-600 font-medium">
                              <AlertTriangle className="h-2.5 w-2.5" /> {cls.studentsNeedingHelp} at risk
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          <section>
            <SectionHeading
              icon={<ShieldAlert className="w-4 h-4" />}
              title="Students Requiring Attention"
              description="Students with performance or engagement issues"
              action={
                <div className="flex gap-1.5">
                  {(["all", "at-risk", "needs-attention"] as const).map((f) => (
                    <button key={f} type="button" onClick={() => setStudentFilter(f)} className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${studentFilter === f ? "bg-cyan-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                      {f === "all" ? "All" : f === "at-risk" ? "At Risk" : "Needs Attention"}
                    </button>
                  ))}
                </div>
              }
            />
            <div className="card-elevated overflow-hidden">
              <div className="divide-y divide-slate-100">
                {displayStudents.filter(s => studentFilter === "all" || s.status === studentFilter).map((student) => (
                  <div key={student.id} className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-slate-50/50">
                    <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${student.avatarGradient} text-xs font-extrabold text-white`}>
                      {student.initials}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-slate-900">{student.name}</p>
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          student.status === "at-risk" ? "bg-rose-100 text-rose-700" : student.status === "needs-attention" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                        }`}>
                          {student.status === "at-risk" ? "At Risk" : student.status === "needs-attention" ? "Attention" : "On Track"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">Class {student.className} · Completion: {student.completion}% · Last active: {student.lastActive}</p>
                      {student.issues.length > 0 && (
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {student.issues.map((issue, idx) => (
                            <span key={idx} className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600">
                              <AlertTriangle className="h-2.5 w-2.5 text-amber-500" />{issue}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <button type="button" className="btn btn-outline btn-sm shrink-0">
                      <Eye className="h-3.5 w-3.5" /> View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </DashboardLayout>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Welcome Section
   ───────────────────────────────────────────────────────────────── */

function WelcomeSection({ teacherName, totalStudents, totalClasses, studentsNeedingHelp }: { teacherName: string; totalStudents: number; totalClasses: number; studentsNeedingHelp: number }) {
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const dateStr = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  const helpText = studentsNeedingHelp > 0
    ? `${studentsNeedingHelp} students need your attention.`
    : "Aktuell benötigt kein Schüler zusätzliche Unterstützung.";

  const summary = `${totalStudents} Schüler in ${totalClasses} Klassen. ${helpText}`;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-600 via-cyan-700 to-teal-700 p-6 text-white shadow-lg sm:p-8">
      <div className="pointer-events-none absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 15% 25%, rgba(255,255,255,0.5) 0%, transparent 40%), radial-gradient(circle at 85% 75%, rgba(0,0,0,0.15) 0%, transparent 40%)" }} aria-hidden />
      <div className="relative">
        <h2 className="text-2xl font-extrabold sm:text-3xl">{greeting}, {teacherName}!</h2>
        <p className="mt-1 text-sm text-cyan-50/80">{dateStr}</p>
        <p className="mt-2 max-w-2xl text-sm text-cyan-50/90 leading-relaxed">
          {summary}
        </p>
      </div>
    </section>
  );
}
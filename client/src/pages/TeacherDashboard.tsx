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
   DATA TYPES
   ───────────────────────────────────────────────────────────────── */

interface ClassRoom {
  id: string;
  name: string;
  subject: string;
  studentCount: number;
  avgCompletion: number;
  avgGrade: string;
  openAssignments: number;
  studentsNeedingHelp: number;
  lastActivity: string;
  color: string;
}

interface Student {
  id: string;
  name: string;
  initials: string;
  className: string;
  avgGrade: number;
  completion: number;
  lastActive: string;
  status: "on-track" | "needs-attention" | "at-risk";
  avatarGradient: string;
  issues: string[];
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  className: string;
  status: "active" | "draft" | "closed";
  dueDate: string;
  completionRate: number;
  totalStudents: number;
  completedStudents: number;
}

interface ActivityItem {
  id: string;
  type: "lesson" | "quiz" | "achievement" | "submission";
  student: string;
  title: string;
  detail: string;
  time: string;
  icon: string;
  score?: number;
}

interface SubjectData {
  name: string;
  icon: React.ReactNode;
  avgProgress: number;
  avgGrade: string;
  trend: number;
  studentsAbove80: number;
  studentsBelow60: number;
  totalStudents: number;
  color: string;
  bgColor: string;
  borderColor: string;
}

interface LessonAnalytics {
  name: string;
  completionRate: number;
  avgScore: number;
  difficulty: "easy" | "medium" | "hard";
}

interface Message {
  id: string;
  from: string;
  subject: string;
  preview: string;
  time: string;
  read: boolean;
  type: "student" | "parent" | "system";
}

/* ─────────────────────────────────────────────────────────────────
   MOCK DATA
   ───────────────────────────────────────────────────────────────── */

const CLASSES: ClassRoom[] = [
  { id: "9a", name: "Class 9A", subject: "Mathematics", studentCount: 28, avgCompletion: 76, avgGrade: "B+", openAssignments: 3, studentsNeedingHelp: 4, lastActivity: "10 min ago", color: "from-cyan-500 to-teal-600" },
  { id: "9b", name: "Class 9B", subject: "Mathematics", studentCount: 24, avgCompletion: 68, avgGrade: "B", openAssignments: 2, studentsNeedingHelp: 6, lastActivity: "1 hour ago", color: "from-violet-500 to-violet-600" },
  { id: "10a", name: "Class 10A", subject: "Science", studentCount: 22, avgCompletion: 82, avgGrade: "B+", openAssignments: 1, studentsNeedingHelp: 2, lastActivity: "30 min ago", color: "from-emerald-500 to-teal-500" },
  { id: "10b", name: "Class 10B", subject: "Science", studentCount: 26, avgCompletion: 71, avgGrade: "B-", openAssignments: 4, studentsNeedingHelp: 5, lastActivity: "2 hours ago", color: "from-amber-400 to-orange-500" },
];

const STUDENTS: Student[] = [
  { id: "1", name: "Anna Becker", initials: "AB", className: "9A", avgGrade: 92, completion: 85, lastActive: "15 min ago", status: "on-track", avatarGradient: "from-cyan-500 to-teal-600", issues: [] },
  { id: "2", name: "Lukas Schafer", initials: "LS", className: "9B", avgGrade: 87, completion: 72, lastActive: "2 hours ago", status: "on-track", avatarGradient: "from-amber-400 to-orange-500", issues: [] },
  { id: "3", name: "Mia Wagner", initials: "MW", className: "10A", avgGrade: 95, completion: 92, lastActive: "5 min ago", status: "on-track", avatarGradient: "from-emerald-500 to-teal-500", issues: [] },
  { id: "4", name: "Noah Fischer", initials: "NF", className: "9A", avgGrade: 62, completion: 45, lastActive: "3 days ago", status: "at-risk", avatarGradient: "from-rose-400 to-rose-500", issues: ["Missing 3 assignments", "Low quiz scores", "Inactive for 3 days"] },
  { id: "5", name: "Sophie Keller", initials: "SK", className: "9B", avgGrade: 58, completion: 40, lastActive: "5 days ago", status: "at-risk", avatarGradient: "from-rose-400 to-rose-500", issues: ["No activity this week", "Failed last 2 quizzes", "Overdue assignments"] },
  { id: "6", name: "Ben Hoffmann", initials: "BH", className: "10A", avgGrade: 71, completion: 65, lastActive: "1 day ago", status: "needs-attention", avatarGradient: "from-amber-400 to-amber-500", issues: ["Below average in Science", "Missing homework"] },
  { id: "7", name: "Laura Braun", initials: "LB", className: "9A", avgGrade: 78, completion: 70, lastActive: "4 hours ago", status: "needs-attention", avatarGradient: "from-violet-400 to-violet-500", issues: ["Declining quiz scores"] },
  { id: "8", name: "Max Zimmermann", initials: "MZ", className: "10B", avgGrade: 55, completion: 38, lastActive: "4 days ago", status: "at-risk", avatarGradient: "from-rose-400 to-rose-500", issues: ["Multiple overdue assignments", "Very low engagement", "Needs parent contact"] },
];

// Demo-Daten, keine Assignments-Tabelle vorhanden
const ASSIGNMENTS: Assignment[] = [
  { id: "a1", title: "Math Worksheet: Quadratic Equations", subject: "Mathematics", className: "9A", status: "active", dueDate: "Tomorrow", completionRate: 64, totalStudents: 28, completedStudents: 18 },
  { id: "a2", title: "Science Lab Report: Chemical Reactions", subject: "Science", className: "10A", status: "active", dueDate: "Wednesday", completionRate: 45, totalStudents: 22, completedStudents: 10 },
  { id: "a3", title: "Language Essay: Book Report", subject: "Language", className: "9B", status: "active", dueDate: "Thursday", completionRate: 30, totalStudents: 24, completedStudents: 7 },
  { id: "a4", title: "Math Quiz: Trigonometry Basics", subject: "Mathematics", className: "9A", status: "active", dueDate: "Friday", completionRate: 0, totalStudents: 28, completedStudents: 0 },
  { id: "a5", title: "Science Project: Ecosystem Model", subject: "Science", className: "10B", status: "draft", dueDate: "Next week", completionRate: 0, totalStudents: 26, completedStudents: 0 },
  { id: "a6", title: "Math Worksheet: Algebra Review", subject: "Mathematics", className: "9B", status: "closed", dueDate: "Yesterday", completionRate: 88, totalStudents: 24, completedStudents: 21 },
];

const ACTIVITIES: ActivityItem[] = [
  { id: "act1", type: "quiz", student: "Anna Becker", title: "Completed Math Quiz", detail: "Quadratic Equations - Scored 92%", time: "15 min ago", icon: "📝", score: 92 },
  { id: "act2", type: "lesson", student: "Mia Wagner", title: "Finished Science Lesson", detail: "Chemical Bonding - Chapter 4", time: "30 min ago", icon: "📖" },
  { id: "act3", type: "submission", student: "Lukas Schafer", title: "Submitted Assignment", detail: "Algebra Review Worksheet", time: "1 hour ago", icon: "📄" },
  { id: "act4", type: "quiz", student: "Laura Braun", title: "Completed Language Quiz", detail: "Grammar Fundamentals - Scored 78%", time: "2 hours ago", icon: "📝", score: 78 },
  { id: "act5", type: "achievement", student: "Mia Wagner", title: "Top Scorer This Week", detail: "Highest average across all subjects", time: "Today", icon: "🏆" },
  { id: "act6", type: "lesson", student: "Ben Hoffmann", title: "Started Science Lesson", detail: "Photosynthesis - In progress", time: "3 hours ago", icon: "▶️" },
  { id: "act7", type: "submission", student: "Anna Becker", title: "Submitted Lab Report", detail: "Chemical Reactions Experiment", time: "4 hours ago", icon: "📄" },
];

// Demo-Daten, keine Subjects-Aufschlüsselung vorhanden
const SUBJECTS: SubjectData[] = [
  { name: "Mathematics", icon: <Target className="w-4 h-4" />, avgProgress: 74, avgGrade: "B+", trend: 3, studentsAbove80: 45, studentsBelow60: 8, totalStudents: 78, color: "from-cyan-500 to-cyan-400", bgColor: "bg-cyan-50", borderColor: "border-cyan-200" },
  { name: "Language", icon: <BookOpen className="w-4 h-4" />, avgProgress: 70, avgGrade: "B", trend: 1, studentsAbove80: 38, studentsBelow60: 12, totalStudents: 78, color: "from-emerald-500 to-emerald-400", bgColor: "bg-emerald-50", borderColor: "border-emerald-200" },
  { name: "Science", icon: <Brain className="w-4 h-4" />, avgProgress: 76, avgGrade: "B+", trend: 5, studentsAbove80: 42, studentsBelow60: 6, totalStudents: 48, color: "from-violet-500 to-violet-400", bgColor: "bg-violet-50", borderColor: "border-violet-200" },
  { name: "Creativity", icon: <Palette className="w-4 h-4" />, avgProgress: 68, avgGrade: "B-", trend: 0, studentsAbove80: 32, studentsBelow60: 10, totalStudents: 78, color: "from-amber-400 to-amber-300", bgColor: "bg-amber-50", borderColor: "border-amber-200" },
  { name: "Social Skills", icon: <Heart className="w-4 h-4" />, avgProgress: 82, avgGrade: "A-", trend: 2, studentsAbove80: 55, studentsBelow60: 3, totalStudents: 78, color: "from-rose-400 to-rose-300", bgColor: "bg-rose-50", borderColor: "border-rose-200" },
];

// Demo-Daten, kein Difficulty-Tracking vorhanden
const HARDEST_LESSONS: LessonAnalytics[] = [
  { name: "Quadratic Equations", completionRate: 52, avgScore: 64, difficulty: "hard" },
  { name: "Chemical Bonding", completionRate: 58, avgScore: 68, difficulty: "hard" },
  { name: "Trigonometry Basics", completionRate: 61, avgScore: 71, difficulty: "medium" },
  { name: "Advanced Grammar", completionRate: 65, avgScore: 73, difficulty: "medium" },
];

const EASIEST_LESSONS: LessonAnalytics[] = [
  { name: "Number Patterns", completionRate: 95, avgScore: 91, difficulty: "easy" },
  { name: "Photosynthesis Intro", completionRate: 92, avgScore: 88, difficulty: "easy" },
  { name: "Basic Vocabulary", completionRate: 90, avgScore: 87, difficulty: "easy" },
  { name: "Color Theory", completionRate: 88, avgScore: 85, difficulty: "easy" },
];

// Demo-Daten, kein Nachrichten-System vorhanden
const MESSAGES: Message[] = [
  { id: "m1", from: "Parent: Fischer", subject: "Question about Noah's progress", preview: "Hi, I noticed Noah hasn't been active recently. Can we schedule a meeting?", time: "2 hours ago", read: false, type: "parent" },
  { id: "m2", from: "Sophie Keller", subject: "Help with assignment", preview: "I'm having trouble understanding the grammar worksheet...", time: "5 hours ago", read: false, type: "student" },
  { id: "m3", from: "System", subject: "Weekly Report Ready", preview: "Class performance reports for Week 24 are now available.", time: "Yesterday", read: true, type: "system" },
  { id: "m4", from: "Parent: Zimmermann", subject: "Max's learning schedule", preview: "Max has been ill this week. Can we get an extension?", time: "Yesterday", read: true, type: "parent" },
];

// Demo-Daten, kein Zeitreihen-Tracking vorhanden
const WEEKLY_TREND = [
  { day: "Mon", minutes: 420, engagement: 88 },
  { day: "Tue", minutes: 380, engagement: 82 },
  { day: "Wed", minutes: 450, engagement: 91 },
  { day: "Thu", minutes: 395, engagement: 85 },
  { day: "Fri", minutes: 350, engagement: 78 },
  { day: "Sat", minutes: 120, engagement: 45 },
  { day: "Sun", minutes: 80, engagement: 32 },
];

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
  } = useTeacherDashboardData();

  const activeClass = selectedClass || (realClasses.length > 0 ? realClasses[0] : null);

  const totalStudents = activeClass ? activeClass.studentCount : (realClasses.reduce((s, c) => s + c.studentCount, 0) || 0);
  const totalOpenAssignments = 0; // Demo
  const totalNeedingHelp = realStudents.filter(s => s.status !== "on-track").length;
  const avgProgress = activeClass ? activeClass.avgCompletion : (realClasses.length > 0 ? Math.round(realClasses.reduce((s, c) => s + c.avgCompletion, 0) / realClasses.length) : 0);

  const displayClasses = realClasses.length > 0 ? realClasses : (activeClass ? [activeClass] : []);
  const displayStudents = realStudents.length > 0 ? realStudents : STUDENTS; // fallback to demo if no real data
  const displayActivities = realActivities.length > 0 ? realActivities : ACTIVITIES; // fallback to demo if no real data

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
        {/* ── SECTION 1: Dashboard Overview ── */}
        <WelcomeSection teacherName={teacherName} />

        <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard label="Total Classes" value={displayClasses.length || CLASSES.length} icon={<ClipboardList className="w-5 h-5" />} accent="from-cyan-500 to-teal-600" />
          <StatCard label="Total Students" value={totalStudents} icon={<Users className="w-5 h-5" />} accent="from-emerald-500 to-teal-500" />
          <StatCard label="Open Assignments" value={totalOpenAssignments} icon={<FileText className="w-5 h-5" />} accent="from-amber-400 to-orange-500" />
          <StatCard label="Need Support" value={totalNeedingHelp} icon={<AlertTriangle className="w-5 h-5" />} accent="from-rose-400 to-rose-500" trend={{ value: `${totalNeedingHelp} students`, positive: false }} />
        </section>

        {/* ── SECTION 2: Class Overview ── */}
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

        {/* ── SECTION 3: Students Requiring Attention ── */}
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

        {/* ── SECTION 4: Assignment Management ── */}
        <section>
          <SectionHeading
            icon={<FileText className="w-4 h-4" />}
            title="Assignment Management"
            description="Create and track assignments across all classes"
            action={
              <button type="button" className="btn btn-primary btn-sm">
                <Plus className="h-3.5 w-3.5" /> Create Assignment
              </button>
            }
          />
          {/* Filter tabs */}
          <div className="mb-3 flex gap-1.5">
            {(["all", "active", "draft", "closed"] as const).map((f) => (
              <button key={f} type="button" onClick={() => setAssignmentFilter(f)} className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${assignmentFilter === f ? "bg-cyan-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="card-elevated overflow-hidden">
            <div className="divide-y divide-slate-100">
              {ASSIGNMENTS.filter(a => assignmentFilter === "all" || a.status === assignmentFilter).map((assignment) => (
                <div key={assignment.id} className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-slate-50/50">
                  <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    assignment.status === "active" ? "bg-cyan-100 text-cyan-600" : assignment.status === "draft" ? "bg-slate-100 text-slate-500" : "bg-emerald-100 text-emerald-600"
                  }`}>
                    {assignment.status === "active" ? <Play className="h-4 w-4" /> : assignment.status === "draft" ? <FileText className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-900">{assignment.title}</p>
                    <p className="text-xs text-slate-500">{assignment.className} · {assignment.subject} · Due: {assignment.dueDate}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    {assignment.status === "closed" ? (
                      <span className="text-xs font-bold text-emerald-600">{assignment.completionRate}% completed</span>
                    ) : (
                      <div className="w-32">
                        <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                          <span>{assignment.completedStudents}/{assignment.totalStudents}</span>
                          <span>{assignment.completionRate}%</span>
                        </div>
                        <div className="progress-track mt-1">
                          <div className="progress-fill" style={{ width: `${assignment.completionRate}%` }} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 5: Subject Performance ── */}
        <section>
          <SectionHeading icon={<BarChart2 className="w-4 h-4" />} title="Subject Performance" description="Average progress and grades across all subjects" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SUBJECTS.map((subject) => (
              <div key={subject.name} className={`card p-4 ${subject.bgColor} ${subject.borderColor} border`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${subject.color} text-white`}>{subject.icon}</span>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{subject.name}</p>
                      <p className="text-[10px] font-bold text-slate-500">Avg Grade: {subject.avgGrade}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {subject.trend > 0 ? <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" /> : subject.trend < 0 ? <ArrowDownRight className="h-3.5 w-3.5 text-rose-600" /> : null}
                    <span className={`text-xs font-bold ${subject.trend > 0 ? "text-emerald-600" : subject.trend < 0 ? "text-rose-600" : "text-slate-500"}`}>
                      {subject.trend > 0 ? `+${subject.trend}%` : subject.trend < 0 ? `${subject.trend}%` : "—"}
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                    <span>Avg Progress</span><span>{subject.avgProgress}%</span>
                  </div>
                  <div className="progress-track mt-1"><div className="progress-fill" style={{ width: `${subject.avgProgress}%` }} /></div>
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="text-emerald-600 font-medium">{subject.studentsAbove80} above 80%</span>
                  <span className="text-rose-600 font-medium">{subject.studentsBelow60} below 60%</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 6: Activity Feed + SECTION 7: Communication ── */}
        <section className="grid gap-6 lg:grid-cols-3">
          {/* Activity Feed */}
          <div className="lg:col-span-2">
            <SectionHeading icon={<Clock className="w-4 h-4" />} title="Recent Activity" description="Student completions, quizzes, and achievements" />
            <div className="card-elevated p-5">
              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-200 via-cyan-300 to-transparent" />
                <div className="space-y-1">
                  {ACTIVITIES.map((activity, idx) => (
                    <div key={activity.id} className="relative flex gap-4 py-3 first:pt-0 last:pb-0">
                      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center">
                        <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-lg ${idx === 0 ? "bg-gradient-to-br from-cyan-500 to-teal-500 shadow-lg shadow-cyan-200" : "bg-white border-2 border-cyan-200"}`}>
                          {activity.icon}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-slate-900">{activity.student}</p>
                          {activity.score !== undefined && (
                            <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${activity.score >= 80 ? "bg-emerald-100 text-emerald-700" : activity.score >= 60 ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"}`}>
                              {activity.score}%
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">{activity.title}</p>
                        <p className="text-[11px] text-slate-400">{activity.detail} · {activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Communication Center */}
          <div>
            <SectionHeading icon={<MessageSquare className="w-4 h-4" />} title="Communication" description="Messages from students and parents" />
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <button type="button" className="card flex flex-col items-center gap-1.5 p-3 text-center hover:shadow-md transition-all">
                  <Send className="h-5 w-5 text-cyan-600" />
                  <span className="text-[10px] font-bold text-slate-700">Message Class</span>
                </button>
                <button type="button" className="card flex flex-col items-center gap-1.5 p-3 text-center hover:shadow-md transition-all">
                  <MessageCircle className="h-5 w-5 text-emerald-600" />
                  <span className="text-[10px] font-bold text-slate-700">Message Student</span>
                </button>
                <button type="button" className="card flex flex-col items-center gap-1.5 p-3 text-center hover:shadow-md transition-all">
                  <Mail className="h-5 w-5 text-violet-600" />
                  <span className="text-[10px] font-bold text-slate-700">Contact Parents</span>
                </button>
              </div>
              <div className="card-elevated p-4">
                <div className="space-y-2">
                  {MESSAGES.map((msg) => (
                    <div key={msg.id} className={`rounded-xl border p-3 transition-colors cursor-pointer ${msg.read ? "border-slate-100 bg-white" : "border-cyan-100 bg-cyan-50/50"}`}>
                      <div className="flex items-start gap-2.5">
                        <span className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ${msg.type === "parent" ? "bg-violet-100 text-violet-600" : msg.type === "student" ? "bg-cyan-100 text-cyan-600" : "bg-slate-100 text-slate-500"}`}>
                          {msg.type === "parent" ? "👨‍👩‍👧" : msg.type === "student" ? "🎓" : "📋"}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1">
                            <p className={`text-xs font-bold ${msg.read ? "text-slate-700" : "text-slate-900"}`}>{msg.from}</p>
                            {!msg.read && <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />}
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{msg.subject}</p>
                          <p className="text-[10px] text-slate-400">{msg.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 8: Analytics ── */}
        <section>
          <SectionHeading icon={<BarChart3 className="w-4 h-4" />} title="Analytics" description="Lesson difficulty, trends, and engagement statistics" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Hardest Lessons */}
            <div className="card-elevated p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <ShieldAlert className="h-4 w-4 text-rose-500" /> Hardest Lessons
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Lowest completion and score rates</p>
              <div className="mt-3 space-y-2.5">
                {HARDEST_LESSONS.map((lesson) => (
                  <div key={lesson.name}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-700">{lesson.name}</span>
                      <span className="text-rose-600 font-bold">{lesson.avgScore}%</span>
                    </div>
                    <div className="progress-track mt-1"><div className="progress-fill" style={{ width: `${lesson.completionRate}%` }} /></div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-0.5">
                      <span>{lesson.completionRate}% completion</span>
                      <span className="capitalize">{lesson.difficulty}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Most Successful Lessons */}
            <div className="card-elevated p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <TrendingUp className="h-4 w-4 text-emerald-500" /> Most Successful Lessons
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Highest completion and score rates</p>
              <div className="mt-3 space-y-2.5">
                {EASIEST_LESSONS.map((lesson) => (
                  <div key={lesson.name}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-700">{lesson.name}</span>
                      <span className="text-emerald-600 font-bold">{lesson.avgScore}%</span>
                    </div>
                    <div className="progress-track mt-1"><div className="progress-fill" style={{ width: `${lesson.completionRate}%` }} /></div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-0.5">
                      <span>{lesson.completionRate}% completion</span>
                      <span className="capitalize">{lesson.difficulty}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Engagement */}
            <div className="card-elevated p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <CalendarCheck className="h-4 w-4 text-cyan-500" /> Weekly Engagement
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Platform usage across all students</p>
              <div className="mt-3 grid grid-cols-7 gap-1.5">
                {WEEKLY_TREND.map((day, idx) => {
                  const maxEng = 100;
                  const height = (day.engagement / maxEng) * 100;
                  return (
                    <div key={idx} className="flex flex-col items-center gap-1">
                      <div className="flex h-16 w-full items-end justify-center">
                        <div
                          className={`w-full rounded-md ${day.engagement > 80 ? "bg-gradient-to-t from-emerald-400 to-emerald-300" : day.engagement > 50 ? "bg-gradient-to-t from-cyan-400 to-cyan-300" : "bg-gradient-to-t from-slate-300 to-slate-200"}`}
                          style={{ height: `${height}%` }}
                          title={`${day.engagement}% engagement`}
                        />
                      </div>
                      <span className="text-[9px] font-bold text-slate-400">{day.day}</span>
                      <span className="text-[8px] text-slate-400">{day.minutes}m</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-slate-50 p-2 text-center">
                  <p className="text-lg font-extrabold text-slate-900">2,195</p>
                  <p className="text-[10px] font-bold text-slate-500">Total Minutes</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-2 text-center">
                  <p className="text-lg font-extrabold text-slate-900">74%</p>
                  <p className="text-[10px] font-bold text-slate-500">Avg Engagement</p>
                </div>
              </div>
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

function WelcomeSection({ teacherName }: { teacherName: string }) {
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const dateStr = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <section className="relative overflow-hidden rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-600 via-cyan-700 to-teal-700 p-6 text-white shadow-lg sm:p-8">
      <div className="pointer-events-none absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 15% 25%, rgba(255,255,255,0.5) 0%, transparent 40%), radial-gradient(circle at 85% 75%, rgba(0,0,0,0.15) 0%, transparent 40%)" }} aria-hidden />
      <div className="relative">
        <h2 className="text-2xl font-extrabold sm:text-3xl">{greeting}, {teacherName}!</h2>
        <p className="mt-1 text-sm text-cyan-50/80">{dateStr}</p>
        <p className="mt-2 max-w-2xl text-sm text-cyan-50/90 leading-relaxed">
          3 students need your attention today. 4 assignments are active across your classes.
          Noah Fischer and Sophie Keller have been inactive for several days — consider reaching out to their parents.
        </p>
      </div>
    </section>
  );
}
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
  Clock,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  GraduationCap,
  Lightbulb,
  CheckCircle2,
  Circle,
  Play,
  Flame,
  Target,
  Bell,
  Brain,
  Palette,
  Heart,
  ArrowUpRight,
  ArrowDownRight,
  Timer,
  FileText,
  AlertTriangle,
  CalendarCheck,
  BarChart2,
  BookMarked,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { authService } from "@/lib/auth-service";
import {
  DashboardLayout,
  type DashboardNavItem,
} from "@/components/DashboardLayout";
import {
  StatCard,
  SectionHeading,
} from "@/components/DashboardWidgets";

/* ─────────────────────────────────────────────────────────────────
   DATA TYPES
   ───────────────────────────────────────────────────────────────── */

interface Child {
  id: string;
  name: string;
  initials: string;
  overallProgress: number;
  weeklyMinutes: number;
  lastActivity: string;
  lastActivityTime: string;
  avatarGradient: string;
  subjects: SubjectProgress[];
  recentActivities: Activity[];
  tasks: Task[];
  insights: ChildInsights;
}

interface SubjectProgress {
  name: string;
  icon: React.ReactNode;
  progress: number;
  trend: number;
  color: string;
  bgColor: string;
  borderColor: string;
  grade: string;
}

interface Activity {
  id: string;
  type: "quiz" | "lesson" | "feedback" | "milestone" | "streak";
  title: string;
  detail: string;
  time: string;
  icon: string;
}

interface Task {
  id: string;
  title: string;
  subject: string;
  status: "pending" | "in-progress" | "completed";
  dueDate: string;
  priority: "high" | "medium" | "low";
}

interface ChildInsights {
  strongestSubject: string;
  strongestSubjectScore: number;
  weakestSubject: string;
  weakestSubjectScore: number;
  recommendedActivity: string;
  weeklySummary: string;
  weeklyMinutes: number;
  weeklyMinutesGoal: number;
  weeklyGoalProgress: number;
  consistencyScore: number;
  completedLessonsThisWeek: number;
  totalLessonsThisWeek: number;
  avgQuizScore: number;
  avgQuizTrend: number;
}

interface Notification {
  id: string;
  type: "message" | "assignment" | "reminder" | "alert";
  title: string;
  detail: string;
  time: string;
  read: boolean;
}

/* ─────────────────────────────────────────────────────────────────
   MOCK DATA — realistic educational content
   ───────────────────────────────────────────────────────────────── */

const CHILDREN: Child[] = [
  {
    id: "1",
    name: "Anna Becker",
    initials: "AB",
    overallProgress: 76,
    weeklyMinutes: 245,
    lastActivity: "Completed Math Quiz",
    lastActivityTime: "15 min ago",
    avatarGradient: "from-cyan-500 to-teal-600",
    subjects: [
      { name: "Mathematics", icon: <Target className="w-4 h-4" />, progress: 85, trend: 5, color: "from-cyan-500 to-cyan-400", bgColor: "bg-cyan-50", borderColor: "border-cyan-200", grade: "A" },
      { name: "Language", icon: <BookOpen className="w-4 h-4" />, progress: 78, trend: 3, color: "from-emerald-500 to-emerald-400", bgColor: "bg-emerald-50", borderColor: "border-emerald-200", grade: "B+" },
      { name: "Science", icon: <Brain className="w-4 h-4" />, progress: 72, trend: 8, color: "from-violet-500 to-violet-400", bgColor: "bg-violet-50", borderColor: "border-violet-200", grade: "B" },
      { name: "Creativity", icon: <Palette className="w-4 h-4" />, progress: 80, trend: 2, color: "from-amber-400 to-amber-300", bgColor: "bg-amber-50", borderColor: "border-amber-200", grade: "A-" },
      { name: "Social Skills", icon: <Heart className="w-4 h-4" />, progress: 90, trend: 1, color: "from-rose-400 to-rose-300", bgColor: "bg-rose-50", borderColor: "border-rose-200", grade: "A" },
    ],
    recentActivities: [
      { id: "a1", type: "quiz", title: "Math Quiz Completed", detail: "Fractions & Decimals — Scored 92%", time: "15 min ago", icon: "📝" },
      { id: "a2", type: "lesson", title: "Science Lesson Finished", detail: "Solar System Exploration — Chapter 3", time: "1 hour ago", icon: "📖" },
      { id: "a3", type: "milestone", title: "12-Day Learning Streak", detail: "Anna has learned every day for 12 days straight", time: "Today", icon: "🔥" },
      { id: "a4", type: "feedback", title: "Teacher Feedback Received", detail: "Mrs. Schmidt: \"Excellent progress in creative writing!\"", time: "Yesterday", icon: "💬" },
      { id: "a5", type: "lesson", title: "Language Lesson Completed", detail: "Grammar Fundamentals — Chapter 5", time: "Yesterday", icon: "📚" },
    ],
    tasks: [
      { id: "t1", title: "Math Worksheet: Multiplication", subject: "Mathematics", status: "pending", dueDate: "Tomorrow", priority: "high" },
      { id: "t2", title: "Read Chapter 4 — The Water Cycle", subject: "Science", status: "in-progress", dueDate: "Wednesday", priority: "medium" },
      { id: "t3", title: "Creative Writing: My Favorite Season", subject: "Language", status: "pending", dueDate: "Thursday", priority: "medium" },
      { id: "t4", title: "Art Project: Self Portrait", subject: "Creativity", status: "completed", dueDate: "Today", priority: "low" },
      { id: "t5", title: "Quiz: Solar System", subject: "Science", status: "completed", dueDate: "Yesterday", priority: "high" },
    ],
    insights: {
      strongestSubject: "Social Skills",
      strongestSubjectScore: 90,
      weakestSubject: "Science",
      weakestSubjectScore: 72,
      recommendedActivity: "Review Solar System chapter with the interactive quiz to strengthen science understanding",
      weeklySummary: "Anna completed 8 lessons this week with an average quiz score of 89%. Her mathematics improved by 5% and she maintained strong consistency with daily learning sessions.",
      weeklyMinutes: 245,
      weeklyMinutesGoal: 300,
      weeklyGoalProgress: 82,
      consistencyScore: 92,
      completedLessonsThisWeek: 8,
      totalLessonsThisWeek: 10,
      avgQuizScore: 89,
      avgQuizTrend: 5,
    },
  },
  {
    id: "2",
    name: "Lukas Schäfer",
    initials: "LS",
    overallProgress: 68,
    weeklyMinutes: 188,
    lastActivity: "Finished Coding Lesson",
    lastActivityTime: "2 hours ago",
    avatarGradient: "from-amber-400 to-orange-500",
    subjects: [
      { name: "Mathematics", icon: <Target className="w-4 h-4" />, progress: 70, trend: 4, color: "from-cyan-500 to-cyan-400", bgColor: "bg-cyan-50", borderColor: "border-cyan-200", grade: "B" },
      { name: "Language", icon: <BookOpen className="w-4 h-4" />, progress: 65, trend: -2, color: "from-emerald-500 to-emerald-400", bgColor: "bg-emerald-50", borderColor: "border-emerald-200", grade: "B-" },
      { name: "Science", icon: <Brain className="w-4 h-4" />, progress: 75, trend: 6, color: "from-violet-500 to-violet-400", bgColor: "bg-violet-50", borderColor: "border-violet-200", grade: "B+" },
      { name: "Creativity", icon: <Palette className="w-4 h-4" />, progress: 60, trend: 1, color: "from-amber-400 to-amber-300", bgColor: "bg-amber-50", borderColor: "border-amber-200", grade: "C+" },
      { name: "Social Skills", icon: <Heart className="w-4 h-4" />, progress: 72, trend: 3, color: "from-rose-400 to-rose-300", bgColor: "bg-rose-50", borderColor: "border-rose-200", grade: "B" },
    ],
    recentActivities: [
      { id: "a1", type: "lesson", title: "Coding Lesson Finished", detail: "Block Programming — Loops & Conditions", time: "2 hours ago", icon: "💻" },
      { id: "a2", type: "quiz", title: "Language Quiz Completed", detail: "Grammar Fundamentals — Scored 78%", time: "Yesterday", icon: "📝" },
      { id: "a3", type: "milestone", title: "8-Day Learning Streak", detail: "Lukas has learned every day for 8 days", time: "Today", icon: "🔥" },
      { id: "a4", type: "feedback", title: "Teacher Feedback Received", detail: "Mr. Weber: \"Great improvement in science! Keep it up!\"", time: "2 days ago", icon: "💬" },
    ],
    tasks: [
      { id: "t1", title: "Language Worksheet: Verb Conjugation", subject: "Language", status: "pending", dueDate: "Tomorrow", priority: "high" },
      { id: "t2", title: "Science Experiment: Plant Growth", subject: "Science", status: "in-progress", dueDate: "Wednesday", priority: "medium" },
      { id: "t3", title: "Math Practice: Division", subject: "Mathematics", status: "completed", dueDate: "Today", priority: "medium" },
      { id: "t4", title: "Coding Challenge: Maze Runner", subject: "Creativity", status: "completed", dueDate: "Yesterday", priority: "low" },
    ],
    insights: {
      strongestSubject: "Science",
      strongestSubjectScore: 75,
      weakestSubject: "Language",
      weakestSubjectScore: 65,
      recommendedActivity: "Practice verb conjugation with the interactive grammar game to improve language skills",
      weeklySummary: "Lukas completed 6 lessons this week with an average quiz score of 76%. His science improved significantly but language skills need attention. Consider extra reading practice.",
      weeklyMinutes: 188,
      weeklyMinutesGoal: 300,
      weeklyGoalProgress: 63,
      consistencyScore: 78,
      completedLessonsThisWeek: 6,
      totalLessonsThisWeek: 10,
      avgQuizScore: 76,
      avgQuizTrend: 3,
    },
  },
];

const NOTIFICATIONS: Notification[] = [
  { id: "n1", type: "message", title: "Message from Mrs. Schmidt", detail: "Anna's creative writing has improved significantly this month. She's showing great progress.", time: "2 hours ago", read: false },
  { id: "n2", type: "assignment", title: "New Assignment: Math Worksheet", detail: "Multiplication practice due tomorrow for Anna.", time: "3 hours ago", read: false },
  { id: "n3", type: "reminder", title: "Learning Reminder", detail: "Lukas hasn't completed today's Language lesson yet.", time: "5 hours ago", read: true },
  { id: "n4", type: "alert", title: "Language Scores Dropping", detail: "Lukas' language quiz scores have decreased by 2% over the past two weeks.", time: "Yesterday", read: true },
  { id: "n5", type: "message", title: "Message from Mr. Weber", detail: "Lukas showed great improvement in the last science assessment.", time: "Yesterday", read: true },
  { id: "n6", type: "reminder", title: "Weekly Report Ready", detail: "Your children's weekly learning summary is available for review.", time: "2 days ago", read: true },
];

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────────── */

export default function ParentDashboard() {
  const { t } = useI18n();
  const [, setLocation] = useLocation();
  const [selectedChild, setSelectedChild] = useState<Child>(CHILDREN[0]);
  const [taskFilter, setTaskFilter] = useState<"all" | "pending" | "in-progress" | "completed">("all");

  const user = authService.getCurrentUser();
  const parentName = user?.firstName ?? "Parent";

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

  const totalTasksDue = CHILDREN.reduce((sum, c) => sum + c.tasks.filter(t => t.status === "pending").length, 0);
  const totalCompleted = CHILDREN.reduce((sum, c) => sum + c.tasks.filter(t => t.status === "completed").length, 0);
  const avgProgress = Math.round(CHILDREN.reduce((sum, c) => sum + c.overallProgress, 0) / CHILDREN.length);
  const unreadNotifications = NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <DashboardLayout
      titleKey="dashboard.parentDashboard"
      subtitleKey="dashboard.parentSubtitle"
      navItems={navItems}
      activeKey="/dashboard"
      onNavigate={handleNav}
    >
      <div className="space-y-6">
        {/* ── SECTION 1: Welcome Area ── */}
        <WelcomeSection parentName={parentName} />

        {/* ── Quick Stats ── */}
        <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            label="Children"
            value={CHILDREN.length}
            icon={<Users className="w-5 h-5" />}
            accent="from-cyan-500 to-teal-600"
          />
          <StatCard
            label="Assignments Due"
            value={totalTasksDue}
            icon={<FileText className="w-5 h-5" />}
            accent="from-amber-400 to-orange-500"
          />
          <StatCard
            label="Completed This Week"
            value={totalCompleted}
            icon={<CheckCircle2 className="w-5 h-5" />}
            accent="from-emerald-500 to-teal-500"
          />
          <StatCard
            label="Average Progress"
            value={`${avgProgress}%`}
            icon={<TrendingUp className="w-5 h-5" />}
            accent="from-violet-500 to-fuchsia-500"
            trend={{ value: "+4.2%", positive: true }}
          />
        </section>

        {/* ── SECTION 2: Children Overview ── */}
        <section>
          <SectionHeading
            icon={<Users className="w-4 h-4" />}
            title="My Children"
            description="Select a child to view detailed progress"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CHILDREN.map((child) => {
              const isActive = selectedChild.id === child.id;
              const pendingTasks = child.tasks.filter(t => t.status === "pending").length;
              return (
                <button
                  key={child.id}
                  type="button"
                  onClick={() => setSelectedChild(child)}
                  className={`card card-interactive group p-5 text-left transition-all ${
                    isActive ? "ring-2 ring-cyan-400 shadow-md" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${child.avatarGradient} text-lg font-extrabold text-white shadow-lg`}
                    >
                      {child.initials}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-extrabold text-slate-900">{child.name}</p>
                      <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {child.weeklyMinutes} min this week
                        </span>
                        {pendingTasks > 0 && (
                          <span className="flex items-center gap-1 text-amber-600 font-medium">
                            <AlertTriangle className="h-3 w-3" />
                            {pendingTasks} pending
                          </span>
                        )}
                      </div>
                      {/* Progress bar */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                          <span>Course Progress</span>
                          <span>{child.overallProgress}%</span>
                        </div>
                        <div className="progress-track mt-1">
                          <div className="progress-fill" style={{ width: `${child.overallProgress}%` }} />
                        </div>
                      </div>
                      {/* Last activity */}
                      <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-400">
                        <Clock className="h-3 w-3" />
                        {child.lastActivity} · {child.lastActivityTime}
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 shrink-0 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-cyan-500" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── SECTION 3: Subject Performance ── */}
        <section>
          <SectionHeading
            icon={<BarChart2 className="w-4 h-4" />}
            title={`${selectedChild.name}'s Subject Performance`}
            description="Progress and trends across all subjects"
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {selectedChild.subjects.map((subject) => (
              <div key={subject.name} className={`card p-4 ${subject.bgColor} ${subject.borderColor} border`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${subject.color} text-white`}>
                      {subject.icon}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{subject.name}</p>
                      <p className="text-[10px] font-bold text-slate-500">Grade: {subject.grade}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {subject.trend > 0 ? (
                      <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" />
                    ) : subject.trend < 0 ? (
                      <ArrowDownRight className="h-3.5 w-3.5 text-rose-600" />
                    ) : null}
                    <span className={`text-xs font-bold ${subject.trend > 0 ? "text-emerald-600" : subject.trend < 0 ? "text-rose-600" : "text-slate-500"}`}>
                      {subject.trend > 0 ? `+${subject.trend}%` : subject.trend < 0 ? `${subject.trend}%` : "—"}
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                    <span>Mastery</span>
                    <span>{subject.progress}%</span>
                  </div>
                  <div className="progress-track mt-1">
                    <div className="progress-fill" style={{ width: `${subject.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 4: Recent Activity + Notifications ── */}
        <section className="grid gap-6 lg:grid-cols-3">
          {/* Activity Timeline */}
          <div className="lg:col-span-2">
            <SectionHeading
              icon={<Clock className="w-4 h-4" />}
              title={`${selectedChild.name}'s Recent Activity`}
              description="Learning events and teacher interactions"
            />
            <div className="card-elevated p-5">
              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-200 via-cyan-300 to-transparent" />
                <div className="space-y-1">
                  {selectedChild.recentActivities.map((activity, idx) => (
                    <div key={activity.id} className="relative flex gap-4 py-3 first:pt-0 last:pb-0">
                      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center">
                        <span
                          className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-lg ${
                            idx === 0
                              ? "bg-gradient-to-br from-cyan-500 to-teal-500 shadow-lg shadow-cyan-200"
                              : "bg-white border-2 border-cyan-200"
                          }`}
                        >
                          {activity.icon}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1">
                        <p className="text-sm font-bold text-slate-900">{activity.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{activity.detail}</p>
                        <p className="text-[10px] text-slate-400 mt-1 font-medium">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div>
            <SectionHeading
              icon={<Bell className="w-4 h-4" />}
              title="Notifications"
              description="Messages and alerts"
            />
            <div className="card-elevated p-4">
              <div className="space-y-2">
                {NOTIFICATIONS.map((notif) => (
                  <div
                    key={notif.id}
                    className={`rounded-xl border p-3 transition-colors ${
                      notif.read
                        ? "border-slate-100 bg-white"
                        : "border-cyan-100 bg-cyan-50/50"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span
                        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ${
                          notif.type === "message"
                            ? "bg-blue-100 text-blue-600"
                            : notif.type === "assignment"
                            ? "bg-amber-100 text-amber-600"
                            : notif.type === "reminder"
                            ? "bg-rose-100 text-rose-600"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {notif.type === "message" ? "💬" : notif.type === "assignment" ? "📋" : notif.type === "reminder" ? "⏰" : "⚠️"}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className={`text-xs font-bold ${notif.read ? "text-slate-700" : "text-slate-900"}`}>{notif.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{notif.detail}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{notif.time}</p>
                      </div>
                      {!notif.read && (
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: Assignments ── */}
        <section>
          <SectionHeading
            icon={<FileText className="w-4 h-4" />}
            title={`${selectedChild.name}'s Assignments`}
            description="Homework, quizzes, and project deadlines"
            action={
              <div className="flex gap-1.5">
                {(["all", "pending", "in-progress", "completed"] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setTaskFilter(filter)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                      taskFilter === filter
                        ? "bg-cyan-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {filter === "all" ? "All" : filter === "in-progress" ? "In Progress" : filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            }
          />
          <div className="card-elevated overflow-hidden">
            <div className="divide-y divide-slate-100">
              {selectedChild.tasks
                .filter(task => taskFilter === "all" || task.status === taskFilter)
                .map((task) => (
                <div key={task.id} className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-slate-50/50">
                  <span className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    task.status === "completed"
                      ? "bg-emerald-100 text-emerald-600"
                      : task.status === "in-progress"
                      ? "bg-amber-100 text-amber-600"
                      : "bg-slate-100 text-slate-400"
                  }`}>
                    {task.status === "completed" ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : task.status === "in-progress" ? (
                      <Play className="h-3.5 w-3.5" />
                    ) : (
                      <Circle className="h-4 w-4" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-semibold ${task.status === "completed" ? "text-slate-400 line-through" : "text-slate-900"}`}>
                      {task.title}
                    </p>
                    <p className="text-xs text-slate-500">{task.subject}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-medium text-slate-500">{task.dueDate}</p>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      task.priority === "high"
                        ? "bg-rose-100 text-rose-700"
                        : task.priority === "medium"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-slate-100 text-slate-500"
                    }`}>
                      {task.priority === "high" ? "🔴" : task.priority === "medium" ? "🟡" : "⚪"}
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {selectedChild.tasks.filter(task => taskFilter === "all" || task.status === taskFilter).length === 0 && (
              <div className="px-5 py-8 text-center">
                <p className="text-sm text-slate-400">No tasks match this filter.</p>
              </div>
            )}
          </div>
        </section>

        {/* ── SECTION 6: Learning Consistency ── */}
        <section>
          <SectionHeading
            icon={<Flame className="w-4 h-4" />}
            title={`${selectedChild.name}'s Learning Consistency`}
            description="Daily learning habits and time investment"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Consistency Score */}
            <div className="card-elevated p-5 text-center">
              <ShieldCheck className="mx-auto h-8 w-8 text-cyan-500" />
              <p className="mt-2 text-3xl font-extrabold text-slate-900">{selectedChild.insights.consistencyScore}%</p>
              <p className="text-xs font-bold text-slate-500 mt-1">Consistency Score</p>
              <p className="text-[11px] text-slate-400 mt-2">
                Based on daily learning habits over the past 2 weeks
              </p>
            </div>

            {/* Weekly Time */}
            <div className="card-elevated p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Timer className="h-4 w-4 text-cyan-500" />
                Weekly Time
              </h3>
              <div className="mt-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-slate-900">{selectedChild.insights.weeklyMinutes}</span>
                  <span className="text-sm text-slate-500">/ {selectedChild.insights.weeklyMinutesGoal} min</span>
                </div>
                <div className="progress-track mt-2">
                  <div className="progress-fill" style={{ width: `${selectedChild.insights.weeklyGoalProgress}%` }} />
                </div>
                <p className="text-[11px] text-slate-400 mt-2">{selectedChild.insights.weeklyGoalProgress}% of weekly goal</p>
              </div>
            </div>

            {/* Quiz Performance */}
            <div className="card-elevated p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <BarChart2 className="h-4 w-4 text-violet-500" />
                Quiz Performance
              </h3>
              <div className="mt-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900">{selectedChild.insights.avgQuizScore}%</span>
                  <span className="flex items-center gap-0.5 text-xs font-bold text-emerald-600">
                    <ArrowUpRight className="h-3 w-3" />
                    +{selectedChild.insights.avgQuizTrend}%
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Average quiz score</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                  <BookMarked className="h-3.5 w-3.5" />
                  {selectedChild.insights.completedLessonsThisWeek} / {selectedChild.insights.totalLessonsThisWeek} lessons completed
                </div>
              </div>
            </div>
          </div>

          {/* Daily Activity Chart */}
          <div className="card-elevated p-5 mt-4">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-4">
              <CalendarCheck className="h-4 w-4 text-cyan-500" />
              Daily Learning Activity
            </h3>
            <div className="grid grid-cols-7 gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => {
                const minutes = [35, 42, 28, 45, 38, 30, 27][idx];
                const maxMin = 50;
                const height = (minutes / maxMin) * 100;
                const isToday = idx === new Date().getDay() - 1;
                return (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <div className="flex h-20 w-full items-end justify-center">
                      <div
                        className={`w-full rounded-lg transition-all ${
                          isToday
                            ? "bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-md shadow-cyan-200"
                            : minutes > 35
                            ? "bg-gradient-to-t from-emerald-400 to-emerald-300"
                            : "bg-gradient-to-t from-slate-200 to-slate-100"
                        }`}
                        style={{ height: `${height}%` }}
                        title={`${minutes} minutes`}
                      />
                    </div>
                    <span className={`text-[10px] font-bold ${isToday ? "text-cyan-700" : "text-slate-400"}`}>{day}</span>
                    <span className="text-[9px] text-slate-400">{minutes}m</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── SECTION 7: Parent Insights ── */}
        <section>
          <SectionHeading
            icon={<Lightbulb className="w-4 h-4" />}
            title={`${selectedChild.name}'s Insights`}
            description="Key observations and recommendations"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Strengths & Weaknesses */}
            <div className="card-elevated p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <BarChart2 className="h-4 w-4 text-cyan-600" />
                Subject Analysis
              </h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-3 border border-emerald-100">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                    <TrendingUp className="h-4 w-4" />
                  </span>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-emerald-700">Strongest Subject</p>
                    <p className="text-sm font-extrabold text-slate-900">{selectedChild.insights.strongestSubject}</p>
                  </div>
                  <span className="text-lg font-extrabold text-emerald-600">{selectedChild.insights.strongestSubjectScore}%</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-rose-50 p-3 border border-rose-100">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-rose-100 text-rose-600">
                    <TrendingDown className="h-4 w-4" />
                  </span>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-rose-700">Needs Attention</p>
                    <p className="text-sm font-extrabold text-slate-900">{selectedChild.insights.weakestSubject}</p>
                  </div>
                  <span className="text-lg font-extrabold text-rose-600">{selectedChild.insights.weakestSubjectScore}%</span>
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="card-elevated p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                Recommended Action
              </h3>
              <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50 p-4">
                <p className="text-sm text-slate-700 leading-relaxed">{selectedChild.insights.recommendedActivity}</p>
              </div>
            </div>

            {/* Weekly Summary */}
            <div className="card-elevated p-5 sm:col-span-2">
              <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <FileText className="h-4 w-4 text-violet-500" />
                Weekly Summary
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{selectedChild.insights.weeklySummary}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl bg-slate-50 p-3 text-center">
                  <p className="text-xl font-extrabold text-slate-900">{selectedChild.insights.completedLessonsThisWeek}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Lessons Done</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 text-center">
                  <p className="text-xl font-extrabold text-slate-900">{selectedChild.insights.totalLessonsThisWeek - selectedChild.insights.completedLessonsThisWeek}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Remaining</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 text-center">
                  <p className="text-xl font-extrabold text-slate-900">{selectedChild.insights.avgQuizScore}%</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Avg Score</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 text-center">
                  <p className="text-xl font-extrabold text-slate-900">{selectedChild.insights.weeklyMinutes}m</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Time Spent</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 1: Welcome Area
   ───────────────────────────────────────────────────────────────── */

function WelcomeSection({ parentName }: { parentName: string }) {
  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="relative overflow-hidden rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-600 via-cyan-700 to-teal-700 p-6 text-white shadow-lg sm:p-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at 15% 25%, rgba(255,255,255,0.5) 0%, transparent 40%), radial-gradient(circle at 85% 75%, rgba(0,0,0,0.15) 0%, transparent 40%)",
        }}
        aria-hidden
      />
      <div className="relative">
        <h2 className="text-2xl font-extrabold sm:text-3xl">
          {greeting}, {parentName}! 👋
        </h2>
        <p className="mt-1 text-sm text-cyan-50/80">{dateStr}</p>
        <p className="mt-2 max-w-2xl text-sm text-cyan-50/90 leading-relaxed">
          Both children are learning consistently this week. Anna is excelling in Mathematics and Social Skills, 
          while Lukas needs some extra support in Language. Check the insights below for personalized recommendations.
        </p>
      </div>
    </section>
  );
}
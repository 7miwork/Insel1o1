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
  Flame,
  GraduationCap,
  Sparkles,
  ChevronRight,
  Zap,
  Target,
  CheckCircle2,
  Lock,
  PlayCircle,
  Award,
  Clock,
} from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { authService } from "@/lib/auth-service";
import { StatusBadge, type LessonStatus } from "@/components/StatusBadge";
import { DashboardLayout, type DashboardNavItem } from "@/components/DashboardLayout";

interface Activity {
  id: number;
  title: string;
  type: "lesson" | "quiz" | "reward";
  time: string;
  xp: number;
  icon: React.ReactNode;
}

interface IslandProgress {
  id: number;
  name: string;
  emoji: string;
  status: LessonStatus;
  progress: number;
  lessons: { id: number; name: string; status: LessonStatus }[];
}

interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  status: "locked" | "in-progress" | "unlocked";
  progress: number;
}

const ACTIVITIES: Activity[] = [
  { id: 1, title: "Variables & Data Storage",  type: "lesson", time: "2h ago", xp: 50,  icon: <BookOpen className="w-4 h-4" /> },
  { id: 2, title: "Loops Challenge",            type: "quiz",   time: "5h ago", xp: 75,  icon: <Trophy className="w-4 h-4" /> },
  { id: 3, title: "First Wall Reward",           type: "reward", time: "1d ago", xp: 60,  icon: <Award  className="w-4 h-4" /> },
  { id: 4, title: "Agent Basics",                type: "lesson", time: "2d ago", xp: 50,  icon: <BookOpen className="w-4 h-4" /> },
  { id: 5, title: "Functions Mastery",           type: "lesson", time: "3d ago", xp: 80,  icon: <BookOpen className="w-4 h-4" /> },
];

const ISLANDS: IslandProgress[] = [
  {
    id: 1,
    name: "Mathematics Kingdom",
    emoji: "🏝️",
    status: "in-progress",
    progress: 85,
    lessons: [
      { id: 1, name: "Movement Basics",     status: "completed" },
      { id: 2, name: "Block Coding Intro",  status: "completed" },
      { id: 3, name: "Your First Program",  status: "in-progress" },
    ],
  },
  {
    id: 2,
    name: "Science Lab",
    emoji: "🔬",
    status: "available",
    progress: 40,
    lessons: [
      { id: 1, name: "Lab Safety",         status: "completed" },
      { id: 2, name: "First Experiment",   status: "available" },
    ],
  },
  {
    id: 3,
    name: "History Voyage",
    emoji: "⚓",
    status: "locked",
    progress: 0,
    lessons: [
      { id: 1, name: "Ancient Civilizations", status: "locked" },
    ],
  },
];

const ACHIEVEMENTS: Achievement[] = [
  { id: 1, name: "First Steps",      description: "Complete your first lesson",         icon: "🚀", status: "unlocked",    progress: 100 },
  { id: 2, name: "Quiz Master",      description: "Score 100% on 5 quizzes",            icon: "🎯", status: "in-progress", progress: 60  },
  { id: 3, name: "Streak Warrior",   description: "Maintain a 7-day streak",             icon: "🔥", status: "in-progress", progress: 85  },
  { id: 4, name: "Code Ninja",       description: "Complete the Programming Realm",     icon: "🥷", status: "locked",      progress: 0   },
  { id: 5, name: "Speed Runner",     description: "Complete a lesson in under 5 min",   icon: "⚡", status: "locked",      progress: 0   },
  { id: 6, name: "Marathon Runner",  description: "Complete 100 lessons",                icon: "🏃", status: "in-progress", progress: 42  },
];

export default function StudentDashboard() {
  const { t } = useI18n();
  const [, setLocation] = useLocation();
  const user = authService.getCurrentUser();

  const [xp] = useState(720);
  const [maxXp] = useState(1000);
  const [level] = useState(3);
  const [streak] = useState(12);
  const [coins] = useState(145);
  const xpPct = (xp / maxXp) * 100;
  const xpNeeded = maxXp - xp;

  const navItems: DashboardNavItem[] = [
    { to: "/",             id: "home",         labelKey: "nav.home",         icon: <Home className="w-4 h-4" /> },
    { to: "/archipelago",  id: "archipelago",  labelKey: "nav.archipelagos", icon: <MapIcon className="w-4 h-4" /> },
    { to: "/courses",      id: "courses",      labelKey: "nav.courses",      icon: <BookOpen className="w-4 h-4" /> },
    { to: "#",             id: "achievements", labelKey: "nav.achievements", icon: <Trophy className="w-4 h-4" />, badge: 8 },
    { to: "/dashboard",    id: "xp",           labelKey: "nav.xpLevels",     icon: <Star className="w-4 h-4" /> },
    { to: "/dashboard",    id: "progress",     labelKey: "nav.progress",     icon: <BarChart3 className="w-4 h-4" /> },
    { to: "/login",        id: "settings",     labelKey: "nav.settings",     icon: <Settings className="w-4 h-4" /> },
    { to: "/dashboard",    id: "profile",      labelKey: "nav.profile",      icon: <UserIcon className="w-4 h-4" /> },
  ];

  const handleNav = (item: DashboardNavItem) => {
    if (item.to && item.to !== "#") setLocation(item.to);
  };

  return (
    <DashboardLayout
      titleKey="dashboard.studentDashboard"
      subtitleKey="dashboard.studentSubtitle"
      navItems={navItems}
      activeKey="/dashboard"
      onNavigate={handleNav}
    >
      {/* ── Hero / Welcome ─────────────────────────────────────── */}
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
        <div className="relative grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              {t("dashboard.welcomeBackExplorer")}
            </span>
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              {t("dashboard.welcomeBackExplorer")}
            </h2>
            <p className="max-w-xl text-sm text-cyan-50/90 sm:text-base">
              {t("dashboard.recommendedLesson")}: <strong>Loops & Iteration</strong>
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={() => setLocation("/archipelago")}
                className="btn btn-accent btn-md"
              >
                <Compass className="h-4 w-4" />
                {t("dashboard.continueLearning")}
              </button>
              <button
                type="button"
                onClick={() => setLocation("/leaderboard")}
                className="btn btn-outline btn-md border-white/40 text-white hover:bg-white/10 hover:text-white"
              >
                <Trophy className="h-4 w-4" />
                {t("dashboard.viewLeaderboard")}
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
            <div className="grid grid-cols-2 gap-3">
              <Stat label={t("common.level")} value={level} icon={<GraduationCap className="h-4 w-4" />} />
              <Stat label={t("common.xp")} value={xp} icon={<Star className="h-4 w-4" />} />
              <Stat label={t("common.coins")} value={coins} icon={<Award className="h-4 w-4" />} />
              <Stat label={t("common.streak")} value={streak} icon={<Flame className="h-4 w-4" />} />
            </div>
          </div>
        </div>
      </section>

      {/* ── XP Progress ─────────────────────────────────────────── */}
      <section className="mt-6 card-elevated rounded-2xl p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              {t("dashboard.xpProgress")}
            </h3>
            <p className="text-sm text-slate-500">
              {`${xpNeeded} XP needed for next level`}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-extrabold text-cyan-700">
              {xp} <span className="text-sm font-semibold text-slate-400">/ {maxXp} XP</span>
            </p>
            <p className="text-xs font-semibold text-slate-500">Level {level}</p>
          </div>
        </div>
        <div className="progress-track progress-track-lg mt-4" aria-hidden>
          <div className="progress-fill" style={{ width: `${xpPct}%` }} />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
          <Pill label={t("dashboard.nextGoal")} value={`Level ${level + 1}`} icon={<Target className="h-4 w-4" />} />
          <Pill label={t("dashboard.weeklyGoal")} value="70%" icon={<Zap className="h-4 w-4" />} />
          <Pill label={t("dashboard.learningStreak")} value={`${streak} ${t("dashboard.daysShort")}`} icon={<Flame className="h-4 w-4" />} />
        </div>
      </section>

      {/* ── Quick Actions ───────────────────────────────────────── */}
      <section className="mt-6">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
          {t("dashboard.quickActions")}
        </h3>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <ActionCard
            onClick={() => setLocation("/archipelago")}
            icon={<Compass className="h-5 w-5" />}
            title={t("dashboard.continueLearning")}
            color="from-cyan-500 to-teal-600"
            desc={t("dashboard.exploreArchipelagos")}
          />
          <ActionCard
            onClick={() => setLocation("/leaderboard")}
            icon={<Trophy className="h-5 w-5" />}
            title={t("dashboard.viewLeaderboard")}
            color="from-amber-400 to-orange-500"
            desc="Top 100 explorer"
          />
          <ActionCard
            onClick={() => setLocation("/courses")}
            icon={<BookOpen className="h-5 w-5" />}
            title={t("dashboard.coursesOverview")}
            color="from-violet-500 to-fuchsia-500"
            desc="5 enrolled"
          />
          <ActionCard
            onClick={() => setLocation("/courses")}
            icon={<Trophy className="h-5 w-5" />}
            title={t("dashboard.viewAchievements")}
            color="from-emerald-500 to-teal-500"
            desc="8 unlocked"
          />
        </div>
      </section>

      {/* ── Islands + Achievements ─────────────────────────────── */}
      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Islands */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            {t("dashboard.coursesOverview")}
          </h3>
          {ISLANDS.map((island) => (
            <div
              key={island.id}
              className="card card-interactive p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl" aria-hidden>{island.emoji}</span>
                  <div>
                    <h4 className="font-bold text-slate-900">{island.name}</h4>
                    <p className="text-xs text-slate-500">
                      {island.lessons.length} {t("common.lesson").toLowerCase()}
                    </p>
                  </div>
                </div>
                <StatusBadge status={island.status} />
              </div>
              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500">
                  <span>{t("dashboard.averageProgress")}</span>
                  <span className="font-bold text-slate-700">{island.progress}%</span>
                </div>
                <div className="progress-track" aria-hidden>
                  <div
                    className={`progress-fill ${
                      island.status === "completed"
                        ? "progress-fill-gold"
                        : island.status === "in-progress"
                        ? "progress-fill"
                        : "progress-fill"
                    }`}
                    style={{
                      width: `${island.progress}%`,
                      opacity: island.status === "locked" ? 0.4 : 1,
                    }}
                  />
                </div>
              </div>
              <ul className="mt-4 space-y-1.5">
                {island.lessons.map((lesson) => (
                  <li
                    key={lesson.id}
                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm hover:bg-slate-50"
                  >
                    {lesson.status === "completed" ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : lesson.status === "in-progress" ? (
                      <PlayCircle className="h-4 w-4 text-cyan-500" />
                    ) : (
                      <Lock className="h-4 w-4 text-slate-400" />
                    )}
                    <span
                      className={
                        lesson.status === "locked"
                          ? "text-slate-400"
                          : "text-slate-700"
                      }
                    >
                      {lesson.name}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                disabled={island.status === "locked"}
                onClick={() => setLocation("/archipelago")}
                className="btn btn-primary btn-sm mt-4 w-full"
              >
                {island.status === "completed"
                  ? t("common.review")
                  : island.status === "in-progress"
                  ? t("dashboard.continueBtn")
                  : t("dashboard.start")}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Achievements + Activity */}
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
              {t("dashboard.achievementsOverview")}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {ACHIEVEMENTS.map((a) => (
                <div
                  key={a.id}
                  className={`relative rounded-2xl border p-3 text-center transition-all ${
                    a.status === "unlocked"
                      ? "border-amber-200 bg-amber-50"
                      : a.status === "in-progress"
                      ? "border-cyan-200 bg-cyan-50"
                      : "border-slate-200 bg-slate-50 opacity-60"
                  }`}
                >
                  <div className="text-2xl">{a.icon}</div>
                  <p className="mt-1 text-[11px] font-bold text-slate-900 line-clamp-1">
                    {a.name}
                  </p>
                  <p className="text-[10px] text-slate-500 line-clamp-2">
                    {a.description}
                  </p>
                  {a.status !== "unlocked" && a.progress > 0 && (
                    <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white">
                      <div
                        className="h-full bg-cyan-500"
                        style={{ width: `${a.progress}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Activity feed */}
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
              {t("dashboard.recentActivity")}
            </h3>
            <div className="card-elevated rounded-2xl p-4">
              {ACTIVITIES.length === 0 ? (
                <EmptyState
                  title={t("dashboard.noDataYet")}
                  description={t("dashboard.startFirstAdventure")}
                />
              ) : (
                <ol className="space-y-3">
                  {ACTIVITIES.map((a) => (
                    <li key={a.id} className="flex items-center gap-3">
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                        {a.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {a.title}
                        </p>
                        <p className="flex items-center gap-1 text-xs text-slate-500">
                          <Clock className="h-3 w-3" /> {a.time}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
                        +{a.xp} XP
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}

function Stat({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-white/10 p-3 backdrop-blur">
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-100/80">
        {icon}
        {label}
      </div>
      <div className="mt-1 text-lg font-extrabold text-white">{value}</div>
    </div>
  );
}

function Pill({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 py-2">
      <span className="text-slate-500">{icon}</span>
      <span className="text-sm font-bold text-slate-900">{value}</span>
      <span className="text-[10px] uppercase tracking-wider text-slate-500">
        {label}
      </span>
    </div>
  );
}

function ActionCard({
  onClick,
  icon,
  title,
  desc,
  color,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group card card-interactive p-4 text-left"
    >
      <span
        className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white shadow-sm transition-transform group-hover:scale-110`}
      >
        {icon}
      </span>
      <p className="mt-3 text-sm font-bold text-slate-900">{title}</p>
      <p className="mt-0.5 text-xs text-slate-500">{desc}</p>
    </button>
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center gap-2 py-6 text-center">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Sparkles className="h-5 w-5" />
      </span>
      <p className="text-sm font-semibold text-slate-700">{title}</p>
      <p className="text-xs text-slate-500">{description}</p>
    </div>
  );
}

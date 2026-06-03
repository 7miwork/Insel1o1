import React, { useState } from "react";
import { useLocation } from "wouter";
import {
  Compass,
  Flame,
  Map as MapIcon,
  Trophy,
  Star,
  Target,
  Lock,
  CheckCircle2,
  PlayCircle,
  ArrowRight,
  Swords,
  Clock,
  Shield,
  Zap,
  ChevronRight,
  Eye,
  Sparkles,
} from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { authService } from "@/lib/auth-service";
import { StatusBadge, type LessonStatus } from "@/components/StatusBadge";

/* ─── data ──────────────────────────────────────────────────────────────── */

interface Island {
  id: number;
  name: string;
  emoji: string;
  status: "visited" | "current" | "coming";
  progress: number;
  difficulty: string;
  lessons: { name: string; status: "done" | "active" | "locked" }[];
}

const JOURNEY: Island[] = [
  {
    id: 1,
    name: "Mathematics Kingdom",
    emoji: "🏝️",
    status: "visited",
    progress: 100,
    difficulty: "Beginner",
    lessons: [
      { name: "Movement Basics",    status: "done" },
      { name: "Block Coding Intro",  status: "done" },
      { name: "Your First Program",  status: "done" },
    ],
  },
  {
    id: 2,
    name: "Science Lab",
    emoji: "🔬",
    status: "current",
    progress: 40,
    difficulty: "Beginner",
    lessons: [
      { name: "Lab Safety",       status: "done" },
      { name: "First Experiment", status: "active" },
      { name: "Cell Biology",     status: "locked" },
    ],
  },
  {
    id: 3,
    name: "History Voyage",
    emoji: "⚓",
    status: "coming",
    progress: 0,
    difficulty: "Intermediate",
    lessons: [
      { name: "Ancient Civilizations", status: "locked" },
    ],
  },
  {
    id: 4,
    name: "Art Studio",
    emoji: "🎨",
    status: "coming",
    progress: 0,
    difficulty: "Intermediate",
    lessons: [
      { name: "Color Theory", status: "locked" },
    ],
  },
];

interface Quest {
  id: number;
  title: string;
  xp: number;
  completed: boolean;
  icon: React.ReactNode;
}

const DAILY_QUESTS: Quest[] = [
  { id: 1, title: "Learn for 30 minutes", xp: 50,  completed: true,  icon: <Clock className="w-5 h-5" /> },
  { id: 2, title: "Complete a quiz",       xp: 75,  completed: false, icon: <Target className="w-5 h-5" /> },
  { id: 3, title: "Earn 50 XP",            xp: 50,  completed: true,  icon: <Zap className="w-5 h-5" /> },
  { id: 4, title: "Read a story",          xp: 25,  completed: false, icon: <Eye className="w-5 h-5" /> },
];

const WEEKLY_QUESTS: Quest[] = [
  { id: 5, title: "Complete 5 lessons",    xp: 200, completed: false, icon: <CheckCircle2 className="w-5 h-5" /> },
  { id: 6, title: "Explore a new island",  xp: 150, completed: false, icon: <Compass className="w-5 h-5" /> },
  { id: 7, title: "Maintain a 7-day streak", xp: 300, completed: false, icon: <Flame className="w-5 h-5" /> },
];

interface Badge {
  id: number;
  name: string;
  icon: string;
  status: "unlocked" | "in-progress" | "locked";
  progress: number;
  description: string;
}

const BADGES: Badge[] = [
  { id: 1, name: "First Steps",      icon: "🚀", status: "unlocked",    progress: 100, description: "Complete your first lesson" },
  { id: 2, name: "Quiz Master",      icon: "🎯", status: "in-progress", progress: 60,  description: "Score 100% on 5 quizzes" },
  { id: 3, name: "Streak Warrior",   icon: "🔥", status: "in-progress", progress: 85,  description: "Maintain a 7-day streak" },
  { id: 4, name: "Block Builder",    icon: "🧱", status: "unlocked",    progress: 100, description: "Build 10 structures" },
  { id: 5, name: "Code Ninja",       icon: "🥷", status: "locked",      progress: 0,   description: "Complete the Programming Realm" },
  { id: 6, name: "Speed Runner",     icon: "⚡", status: "locked",      progress: 0,   description: "Finish a lesson in under 5 min" },
  { id: 7, name: "Marathon Runner",  icon: "🏃", status: "in-progress", progress: 42,  description: "Complete 100 lessons" },
  { id: 8, name: "Legend",           icon: "👑", status: "locked",      progress: 0,   description: "Reach level 30" },
];

interface Reward {
  id: number;
  icon: string;
  name: string;
  time: string;
  type: "xp" | "badge" | "unlock";
}

const REWARDS: Reward[] = [
  { id: 1, icon: "⭐", name: "50 XP earned",  time: "2h ago",  type: "xp" },
  { id: 2, icon: "🎯", name: "Quiz Master badge", time: "5h ago",  type: "badge" },
  { id: 3, icon: "🏝️", name: "Science Lab unlocked", time: "1d ago",  type: "unlock" },
  { id: 4, icon: "🧱", name: "Block Builder badge",  time: "3d ago",  type: "badge" },
];

/* ─── page ──────────────────────────────────────────────────────────────── */

export default function StudentDashboard() {
  const { t } = useI18n();
  const [, setLocation] = useLocation();
  const user = authService.getCurrentUser();

  const [level] = useState(5);
  const [xp] = useState(2450);
  const [maxXp] = useState(3000);
  const [streak] = useState(12);
  const [coins] = useState(340);
  const xpPct = (xp / maxXp) * 100;

  const currentIsland = JOURNEY.find((i) => i.status === "current");
  const completedIslands = JOURNEY.filter((i) => i.status === "visited").length;
  const totalBadges = BADGES.filter((b) => b.status === "unlocked").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c1222] via-[#0f1b2d] to-[#0a1628] text-white">
      {/* ── Hero: Player Card + Welcome ──────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-violet-500/8 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-8 sm:pt-14 sm:pb-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Player Card */}
            <div className="flex-shrink-0 w-full lg:w-80 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-2xl">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-2xl font-extrabold text-white shadow-lg shadow-amber-500/30">
                  {(user?.firstName?.[0] ?? "E").toUpperCase()}
                  {(user?.lastName?.[0] ?? "X").toUpperCase()}
                </div>
                <div>
                  <p className="text-lg font-extrabold text-white">
                    {user?.firstName ?? "Explorer"} {user?.lastName ?? ""}
                  </p>
                  <p className="text-sm text-cyan-300 font-semibold">
                    {t("adventure.codingExplorer")}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {/* Level */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400 flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-400" />
                    {t("common.level")}
                  </span>
                  <span className="text-lg font-extrabold text-amber-400">{level}</span>
                </div>

                {/* XP Bar */}
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>{xp} XP</span>
                    <span>{maxXp} XP</span>
                  </div>
                  <div className="progress-track" aria-hidden>
                    <div className="progress-fill progress-fill-xp" style={{ width: `${xpPct}%` }} />
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="text-center rounded-xl bg-white/5 p-2">
                    <p className="text-xs text-slate-400">{t("common.coins")}</p>
                    <p className="text-base font-extrabold text-amber-400">{coins}</p>
                  </div>
                  <div className="text-center rounded-xl bg-white/5 p-2">
                    <p className="text-xs text-slate-400">{t("common.streak")}</p>
                    <p className="text-base font-extrabold text-orange-400">{streak}d</p>
                  </div>
                  <div className="text-center rounded-xl bg-white/5 p-2">
                    <p className="text-xs text-slate-400">{t("dashboard.achievementsCount")}</p>
                    <p className="text-base font-extrabold text-violet-400">{totalBadges}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Welcome + Main CTA */}
            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                  {t("adventure.welcomeBack")}
                </h1>
                <p className="text-base sm:text-lg text-slate-400 mt-2 max-w-lg">
                  {t("dashboard.recommendedLesson")}: <strong className="text-cyan-300">Loops & Iteration</strong>
                </p>
              </div>

              {/* Main CTA — Continue Adventure */}
              <button
                type="button"
                onClick={() => currentIsland && setLocation(`/archipelago`)}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-lg font-extrabold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 hover:-translate-y-1"
              >
                <Compass className="w-6 h-6" />
                {t("adventure.continueAdventure")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-3 max-w-md">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-3 text-center">
                  <p className="text-2xl font-extrabold text-cyan-400">{completedIslands}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{t("adventure.visitedIslands")}</p>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-3 text-center">
                  <p className="text-2xl font-extrabold text-amber-400">{JOURNEY.length - completedIslands}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{t("adventure.comingIslands")}</p>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-3 text-center">
                  <p className="text-2xl font-extrabold text-violet-400">{streak}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{t("adventure.daysInARow")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 space-y-8">
        {/* ── Journey Map ───────────────────────────────────────── */}
        <section>
          <h2 className="text-xl font-extrabold text-white mb-4 flex items-center gap-2">
            <MapIcon className="w-5 h-5 text-cyan-400" />
            {t("adventure.yourJourney")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {JOURNEY.map((island, idx) => (
              <button
                key={island.id}
                type="button"
                onClick={() => island.status !== "coming" && setLocation("/archipelago")}
                className={`relative rounded-2xl p-5 border transition-all duration-300 text-left ${
                  island.status === "current"
                    ? "bg-white/10 border-cyan-400/50 shadow-lg shadow-cyan-500/20 hover:-translate-y-1"
                    : island.status === "visited"
                    ? "bg-white/5 border-white/10 hover:bg-white/8"
                    : "bg-white/[0.02] border-white/5 opacity-50"
                }`}
              >
                {/* Route connector */}
                {idx < JOURNEY.length - 1 && (
                  <div className="absolute top-1/2 -right-2 w-4 h-0.5 bg-white/20 hidden sm:block" />
                )}

                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-4xl drop-shadow-lg">{island.emoji}</span>
                  {island.status === "current" && (
                    <span className="px-2 py-0.5 rounded-full bg-cyan-400 text-cyan-900 text-[10px] font-bold uppercase">
                      {t("adventure.currentIsland")}
                    </span>
                  )}
                  {island.status === "visited" && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  )}
                  {island.status === "coming" && (
                    <Lock className="w-5 h-5 text-slate-600" />
                  )}
                </div>

                <h3 className="text-sm font-bold text-white mb-1">{island.name}</h3>
                <p className="text-xs text-slate-500 mb-2">{island.difficulty}</p>

                {island.status !== "coming" && (
                  <div className="w-full h-1.5 rounded-full bg-white/10 mb-2">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-cyan-300"
                      style={{ width: `${island.progress}%` }}
                    />
                  </div>
                )}

                <span className="text-xs text-slate-500">
                  {island.lessons.filter((l) => l.status === "done").length}/{island.lessons.length} lessons
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ── Two-column: Quests + Rewards ──────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quests */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Quests */}
            <section>
              <h2 className="text-lg font-extrabold text-white mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-amber-400" />
                {t("adventure.dailyQuests")}
              </h2>
              <div className="space-y-2">
                {DAILY_QUESTS.map((q) => (
                  <div
                    key={q.id}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                      q.completed
                        ? "bg-emerald-500/10 border border-emerald-500/30"
                        : "bg-white/5 border border-white/10 hover:bg-white/8"
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      q.completed ? "bg-emerald-500 text-white" : "bg-white/10 text-slate-400"
                    }`}>
                      {q.completed ? <CheckCircle2 className="w-4 h-4" /> : q.icon}
                    </span>
                    <span className={`flex-1 text-sm font-medium ${
                      q.completed ? "text-emerald-300" : "text-slate-300"
                    }`}>
                      {q.title}
                    </span>
                    <span className="text-xs font-bold text-amber-400">+{q.xp} XP</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Weekly Quests */}
            <section>
              <h2 className="text-lg font-extrabold text-white mb-3 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-violet-400" />
                {t("adventure.weeklyQuests")}
              </h2>
              <div className="space-y-2">
                {WEEKLY_QUESTS.map((q) => (
                  <div
                    key={q.id}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 bg-white/5 border border-white/10 hover:bg-white/8 transition-all"
                  >
                    <span className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 text-slate-400">
                      {q.icon}
                    </span>
                    <span className="flex-1 text-sm font-medium text-slate-300">{q.title}</span>
                    <span className="text-xs font-bold text-amber-400">+{q.xp} XP</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Rewards */}
          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-extrabold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                {t("adventure.lastRewards")}
              </h2>
              <div className="space-y-2">
                {REWARDS.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 bg-white/5 border border-white/10"
                  >
                    <span className="text-2xl">{r.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{r.name}</p>
                      <p className="text-xs text-slate-500">{r.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Streak card */}
            <section className="rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 p-5 text-center">
              <Flame className="w-10 h-10 text-orange-400 mx-auto mb-2 animate-pulse" />
              <p className="text-3xl font-extrabold text-orange-400">{streak}</p>
              <p className="text-sm text-orange-300">{t("adventure.daysInARow")}</p>
            </section>
          </div>
        </div>

        {/* ── Badge Collection ──────────────────────────────────── */}
        <section>
          <h2 className="text-xl font-extrabold text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            {t("dashboard.achievementsOverview")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {BADGES.map((badge) => (
              <div
                key={badge.id}
                className={`rounded-2xl border p-4 text-center transition-all ${
                  badge.status === "unlocked"
                    ? "bg-amber-500/10 border-amber-500/30 shadow-lg shadow-amber-500/10"
                    : badge.status === "in-progress"
                    ? "bg-cyan-500/10 border-cyan-500/30"
                    : "bg-white/[0.02] border-white/5 opacity-50"
                }`}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <p className="text-xs font-bold text-white">{badge.name}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{badge.description}</p>
                {badge.status !== "unlocked" && badge.progress > 0 && (
                  <div className="mt-2 h-1 w-full rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-cyan-400"
                      style={{ width: `${badge.progress}%` }}
                    />
                  </div>
                )}
                {badge.status === "unlocked" && (
                  <span className="inline-block mt-2 text-[10px] font-bold text-amber-400 uppercase">
                    Unlocked ✓
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  Compass,
  Map as MapIcon,
  Star,
  Target,
  Lock,
  CheckCircle2,
  ArrowRight,
  Shield,
  Eye,
  Sparkles,
  Zap,
  Anchor,
  Wind,
  Treasure,
  Trophy,
  LogOut,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { authService, type User } from "@/lib/auth-service";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface Voyage {
  archipelago: string;
  currentIsland: string;
  nextIsland: string;
  progress: number;
}

interface Activity {
  type: "lesson" | "island" | "xp" | "treasure";
  title: string;
  value?: number;
  timestamp: string;
}

interface Achievement {
  id: number;
  name: string;
  icon: string;
  status: "locked" | "discovered" | "collected";
  rarity: "common" | "uncommon" | "rare" | "legendary";
}

export default function StudentDashboard() {
  const { t } = useI18n();
  const [, setLocation] = useLocation();
  const user = authService.getCurrentUser() as User | null;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [level] = useState(5);
  const [xp] = useState(1250);
  const [maxXp] = useState(2000);
  const [rank] = useState("Navigator");

  // Mock data
  const voyage: Voyage = {
    archipelago: "Mystical Waters",
    currentIsland: "Island 5",
    nextIsland: "Island 6",
    progress: 65,
  };

  const activities: Activity[] = [
    {
      type: "lesson",
      title: "You completed Lesson 3: Advanced Functions",
      timestamp: "2 hours ago",
    },
    {
      type: "island",
      title: "You discovered a new island",
      value: 500,
      timestamp: "5 hours ago",
    },
    {
      type: "xp",
      title: "You earned 100 XP",
      timestamp: "1 day ago",
    },
    {
      type: "treasure",
      title: "You unlocked Treasure: Gold Dragon Coin",
      timestamp: "2 days ago",
    },
  ];

  const achievements: Achievement[] = [
    {
      id: 1,
      name: "First Steps",
      icon: "🗺️",
      status: "collected",
      rarity: "common",
    },
    {
      id: 2,
      name: "Sea Master",
      icon: "⚓",
      status: "collected",
      rarity: "uncommon",
    },
    { id: 3, name: "Legendary Sailor", icon: "🏴‍☠️", status: "discovered", rarity: "rare" },
    { id: 4, name: "Treasure Hunter", icon: "💎", status: "locked", rarity: "legendary" },
  ];

  const getRankColor = (rank: string) => {
    const rankColors: Record<string, string> = {
      Deckhand: "from-blue-400 to-blue-600",
      Explorer: "from-cyan-400 to-cyan-600",
      Navigator: "from-emerald-400 to-emerald-600",
      Captain: "from-amber-400 to-amber-600",
      "Master Captain": "from-red-400 to-red-600",
      "Legendary Explorer": "from-purple-400 to-purple-600",
    };
    return rankColors[rank] || "from-cyan-400 to-cyan-600";
  };

  const handleLogout = async () => {
    await authService.logout();
    setLocation("/");
  };

  const userName = user?.firstName
    ? `${user.firstName} ${user.lastName ?? ""}`.trim()
    : "Navigator";

  const xpPercentage = (xp / maxXp) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-blue-50 to-teal-50 text-slate-900">
      {/* Mobile menu overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Header - Captain's Deck */}
      <header className="sticky top-0 z-20 border-b border-amber-200 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLocation("/")}
                className="flex items-center gap-2 group"
              >
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-lg">
                  <Anchor className="h-5 w-5" />
                </div>
                <span className="hidden sm:inline font-bold text-lg bg-gradient-to-r from-amber-600 to-teal-600 bg-clip-text text-transparent">
                  {t("common.appName")}
                </span>
              </button>
            </div>

            {/* Title */}
            <div className="hidden sm:block text-center flex-1">
              <h1 className="text-lg font-bold text-amber-900">
                ⚓ {t("studentDashboard.captainsDeck")} ⚓
              </h1>
              <p className="text-xs text-amber-700">
                {t("studentDashboard.scrollToDiscover")}
              </p>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <LanguageSwitcher />
              <button
                onClick={() => setLocation("/settings")}
                className="p-2 rounded-lg hover:bg-amber-100 transition-colors"
                aria-label="Settings"
              >
                <Settings className="h-5 w-5 text-amber-700" />
              </button>
              <button
                onClick={() => setLocation("/")}
                className="hidden sm:flex p-2 rounded-lg hover:bg-red-100 transition-colors text-red-600"
                aria-label="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-amber-100 lg:hidden"
                aria-label="Toggle menu"
              >
                {sidebarOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Hero Section with Player Card */}
        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          {/* Player Card - Most Important */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-400 via-amber-300 to-amber-200 p-6 shadow-xl border-2 border-amber-500">
              {/* Decorative compass */}
              <div className="absolute -right-8 -top-8 opacity-10">
                <Compass className="h-32 w-32 text-amber-900" />
              </div>

              <div className="relative z-10">
                {/* Avatar placeholder */}
                <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center shadow-lg border-3 border-white">
                  <span className="text-2xl font-bold text-amber-900">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                </div>

                <h2 className="text-center text-xl font-bold text-amber-900 mb-1">
                  {userName}
                </h2>
                <p className="text-center text-sm text-amber-800 mb-4">{rank}</p>

                {/* Level and XP */}
                <div className="space-y-3">
                  <div className="bg-white/70 rounded-lg p-3 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-amber-900">
                        {t("studentDashboard.yourLevel")}
                      </span>
                      <span className="text-lg font-bold text-amber-700">{level}</span>
                    </div>
                    <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-500"
                        style={{ width: `${xpPercentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-amber-700 mt-1">
                      {xp} / {maxXp} XP
                    </p>
                  </div>

                  <button
                    onClick={() => setLocation("/archipelago")}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg transform hover:scale-105"
                  >
                    <Wind className="h-5 w-5" />
                    {t("studentDashboard.continueAdventure")}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Current Voyage Section */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="rounded-2xl border-2 border-teal-300 bg-white p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <MapIcon className="h-6 w-6 text-teal-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  🗺️ {t("studentDashboard.currentVoyage")}
                </h3>
              </div>

              <div className="space-y-4">
                {/* Voyage Info */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-3 border border-blue-200">
                    <p className="text-xs text-blue-600 font-semibold">
                      {t("studentDashboard.archipielago")}
                    </p>
                    <p className="text-sm font-bold text-blue-900 mt-1">
                      {voyage.archipelago}
                    </p>
                  </div>
                  <div className="rounded-lg bg-gradient-to-br from-cyan-50 to-cyan-100 p-3 border border-cyan-200">
                    <p className="text-xs text-cyan-600 font-semibold">
                      {t("studentDashboard.currentIsland")}
                    </p>
                    <p className="text-sm font-bold text-cyan-900 mt-1">
                      {voyage.currentIsland}
                    </p>
                  </div>
                  <div className="rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 border border-emerald-200">
                    <p className="text-xs text-emerald-600 font-semibold">
                      {t("studentDashboard.nextIsland")}
                    </p>
                    <p className="text-sm font-bold text-emerald-900 mt-1">
                      {voyage.nextIsland}
                    </p>
                  </div>
                </div>

                {/* Voyage Progress */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-slate-700">
                      {t("studentDashboard.voyageProgress")}
                    </span>
                    <span className="text-sm font-bold text-teal-600">{voyage.progress}%</span>
                  </div>
                  <div className="h-4 bg-slate-200 rounded-full overflow-hidden border border-teal-300">
                    <div
                      className="h-full bg-gradient-to-r from-teal-400 to-emerald-500 transition-all duration-500"
                      style={{ width: `${voyage.progress}%` }}
                    />
                  </div>
                </div>

                {/* Motivation */}
                <div className="rounded-lg bg-gradient-to-r from-amber-100 to-yellow-100 p-3 border border-amber-300">
                  <p className="text-sm font-semibold text-amber-900">
                    ✨ {t("studentDashboard.newIslandAwaits")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Treasure Collection - Achievements */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border-2 border-purple-300 bg-white p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  💎 {t("studentDashboard.treasureCollection")}
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`rounded-lg p-4 text-center transition-all duration-200 ${
                      achievement.status === "locked"
                        ? "bg-slate-100 opacity-60 border border-slate-300"
                        : achievement.status === "discovered"
                        ? "bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-400"
                        : "bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-amber-400 shadow-lg"
                    }`}
                  >
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <p className="text-xs font-bold text-slate-900">{achievement.name}</p>
                    <p className="text-xs text-slate-600 mt-1">
                      {achievement.status === "locked"
                        ? t("studentDashboard.lockedStatus")
                        : achievement.status === "discovered"
                        ? t("studentDashboard.discoveredStatus")
                        : t("studentDashboard.collectedStatus")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quests Section */}
          <div>
            <div className="rounded-2xl border-2 border-amber-300 bg-white p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-6 w-6 text-amber-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  ⚔️ {t("studentDashboard.dailyQuests")}
                </h3>
              </div>

              <div className="space-y-2">
                {[
                  { title: "Complete a lesson", done: true },
                  { title: "Explore an island", done: true },
                  { title: "Earn 200 XP", done: false },
                ].map((quest, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-amber-200"
                  >
                    {quest.done ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-amber-300 flex-shrink-0" />
                    )}
                    <span className={quest.done ? "line-through text-slate-500" : "text-slate-700"}>
                      {quest.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Captain's Log - Recent Activity */}
        <div className="mt-6 rounded-2xl border-2 border-cyan-300 bg-white p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <LogOut className="h-6 w-6 text-cyan-600" style={{ transform: "scaleX(-1)" }} />
            <h3 className="text-lg font-bold text-slate-900">
              📖 {t("studentDashboard.captainsLog")}
            </h3>
          </div>

          <div className="space-y-3">
            {activities.map((activity, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-cyan-200"
              >
                <div className="text-2xl flex-shrink-0">
                  {activity.type === "lesson" && "📚"}
                  {activity.type === "island" && "🏝️"}
                  {activity.type === "xp" && "⚡"}
                  {activity.type === "treasure" && "💰"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-900">{activity.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <button
            onClick={() => setLocation("/archipelago")}
            className="rounded-lg border-2 border-teal-300 bg-white p-4 text-center hover:bg-teal-50 transition-colors"
          >
            <MapIcon className="h-6 w-6 mx-auto text-teal-600 mb-2" />
            <span className="text-sm font-semibold text-slate-900">Archipelago</span>
          </button>
          <button
            onClick={() => setLocation("/progress")}
            className="rounded-lg border-2 border-emerald-300 bg-white p-4 text-center hover:bg-emerald-50 transition-colors"
          >
            <Target className="h-6 w-6 mx-auto text-emerald-600 mb-2" />
            <span className="text-sm font-semibold text-slate-900">Progress</span>
          </button>
          <button
            onClick={() => setLocation("/leaderboard")}
            className="rounded-lg border-2 border-amber-300 bg-white p-4 text-center hover:bg-amber-50 transition-colors"
          >
            <Trophy className="h-6 w-6 mx-auto text-amber-600 mb-2" />
            <span className="text-sm font-semibold text-slate-900">Ranking</span>
          </button>
          <button
            onClick={() => setLocation("/settings")}
            className="rounded-lg border-2 border-purple-300 bg-white p-4 text-center hover:bg-purple-50 transition-colors"
          >
            <Settings className="h-6 w-6 mx-auto text-purple-600 mb-2" />
            <span className="text-sm font-semibold text-slate-900">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}

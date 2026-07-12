import React, { useState } from "react";
import { useLocation } from "wouter";
import {
  Compass,
  Map as MapIcon,
  Star,
  Target,
  Lock,
  CheckCircle2,
  ArrowRight,
  LogOut,
  Settings,
  Menu,
  X,
  Anchor,
  Wind,
  Trophy,
  ScrollText,
  BookOpen,
} from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { authService, type User } from "@/lib/auth-service";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useStudentDashboardData } from "@/hooks/useStudentDashboardData";
import type { Voyage, Activity, Achievement } from "@/hooks/useStudentDashboardData";

export default function StudentDashboard() {
  const { t } = useI18n();
  const [, setLocation] = useLocation();
  const user = authService.getCurrentUser() as User | null;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    loading,
    error,
    hasNoCourses,
    level,
    xp,
    maxXp,
    rank,
    voyage,
    activities,
    achievements,
  } = useStudentDashboardData();

  const handleLogout = async () => {
    await authService.logout();
    setLocation("/");
  };

  const userName = user?.firstName
    ? `${user.firstName} ${user.lastName ?? ""}`.trim()
    : "Navigator";

  const xpPercentage = (xp / maxXp) * 100;

  const statusIcon = (s: string) => {
    if (s === "collected") return "⭐";
    if (s === "discovered") return "🔍";
    return "🔒";
  };

  const activityIcon = (type: string) => {
    if (type === "lesson") return "📚";
    if (type === "island") return "🏝️";
    if (type === "xp") return "⚡";
    return "💰";
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm text-slate-500">Loading your adventure...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-sm text-red-600 mb-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-indigo-600 hover:text-indigo-700 underline"
          >
            Try again
          </button>
        </div>
      );
    }

    if (hasNoCourses) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-5xl mb-4">🏝️</div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Starte dein erstes Abenteuer</h2>
          <p className="text-sm text-slate-500 mb-6 max-w-md">
            Es wurden noch keine Kurse für dich freigeschaltet. 
            Entdecke verfügbare Kurse und beginne deine Reise!
          </p>
          <button
            onClick={() => setLocation("/courses")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-teal-600 transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            Zu den Kursen
          </button>
        </div>
      );
    }

    return (
      <>
        {/* Primary CTA — Continue Adventure */}
        <button
          onClick={() => setLocation("/world")}
          className="w-full mb-6 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 text-lg shadow-md transition-colors"
        >
          <Wind className="h-6 w-6" />
          {t("studentDashboard.continueAdventure")}
          <ArrowRight className="h-5 w-5" />
        </button>

        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          {/* Player Card */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-amber-300 to-amber-200 p-5">
            <Compass className="absolute -right-6 -top-6 h-24 w-24 text-amber-500/20" />
            <div className="relative z-10">
              <div className="mb-3 h-16 w-16 rounded-full bg-white/80 flex items-center justify-center mx-auto shadow-sm">
                <span className="text-2xl font-bold text-amber-800">{userName.charAt(0).toUpperCase()}</span>
              </div>
              <h2 className="text-center text-lg font-bold text-amber-900 mb-0.5">{userName}</h2>
              <p className="text-center text-sm text-amber-700 mb-3">{rank}</p>
              <div className="bg-white/60 rounded-lg p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-amber-800">{t("studentDashboard.yourLevel")}</span>
                  <span className="text-sm font-bold text-amber-700">{level}</span>
                </div>
                <div className="h-1.5 bg-amber-200 rounded-full">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" style={{ width: `${xpPercentage}%` }} />
                </div>
                <p className="text-xs text-amber-700 mt-1">{xp} / {maxXp} {t("studentDashboard.captainXp")}</p>
              </div>
            </div>
          </div>

          {/* Current Voyage */}
          <div className="lg:col-span-2 rounded-xl bg-white p-5 border border-teal-200">
            <div className="flex items-center gap-2 mb-4">
              <MapIcon className="h-5 w-5 text-teal-600" />
              <h3 className="text-base font-semibold text-slate-900">{t("studentDashboard.currentVoyage")}</h3>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-xs text-blue-600 font-medium mb-0.5">{t("studentDashboard.archipielago")}</p>
                <p className="text-sm font-semibold text-slate-900">{voyage.archipelago}</p>
              </div>
              <div className="bg-cyan-50 rounded-lg p-3">
                <p className="text-xs text-cyan-600 font-medium mb-0.5">{t("studentDashboard.currentIsland")}</p>
                <p className="text-sm font-semibold text-slate-900">{voyage.currentIsland}</p>
              </div>
              <div className="bg-emerald-50 rounded-lg p-3">
                <p className="text-xs text-emerald-600 font-medium mb-0.5">{t("studentDashboard.nextIsland")}</p>
                <p className="text-sm font-semibold text-slate-900">{voyage.nextIsland}</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-slate-600">{t("studentDashboard.voyageProgress")}</span>
                <span className="text-xs font-bold text-teal-600">{voyage.progress}%</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full">
                <div className="h-full bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full" style={{ width: `${voyage.progress}%` }} />
              </div>
            </div>
            <div className="mt-3 text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
              ✨ {t("studentDashboard.newIslandAwaits")}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Treasure Collection */}
          <div className="lg:col-span-2 rounded-xl bg-white p-5 border border-amber-200">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-5 w-5 text-amber-600" />
              <h3 className="text-base font-semibold text-slate-900">{t("studentDashboard.treasureCollection")}</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {achievements.map((a) => (
                <div key={a.id} className={`rounded-lg p-3 text-center ${a.status === "locked" ? "bg-slate-100 opacity-60" : a.status === "discovered" ? "bg-yellow-50 border border-yellow-300" : "bg-amber-50 border border-amber-300"}`}>
                  <div className="text-2xl mb-1">{a.icon}</div>
                  <p className="text-xs font-medium text-slate-900">{a.name}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    <span>{statusIcon(a.status)} </span>
                    {a.status === "locked" ? t("studentDashboard.lockedStatus") : a.status === "discovered" ? t("studentDashboard.discoveredStatus") : t("studentDashboard.collectedStatus")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Quests */}
          <div className="rounded-xl bg-white p-5 border border-amber-200">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-amber-600" />
              <h3 className="text-base font-semibold text-slate-900">{t("studentDashboard.dailyQuests")}</h3>
            </div>
            <div className="space-y-2">
              {[{ title: "Complete a lesson", done: true }, { title: "Explore an island", done: true }, { title: "Earn 200 XP", done: false }].map((quest, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                  {quest.done ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2 border-amber-300 shrink-0" />
                  )}
                  <span className={`text-sm ${quest.done ? "line-through text-slate-400" : "text-slate-700"}`}>{quest.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Captain's Logbook */}
        <div className="mt-6 rounded-xl bg-white p-5 border border-cyan-200">
          <div className="flex items-center gap-2 mb-4">
            <ScrollText className="h-5 w-5 text-cyan-600" />
            <h3 className="text-base font-semibold text-slate-900">{t("studentDashboard.captainsLog")}</h3>
          </div>
          <div className="space-y-2">
            {activities.map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                <span className="text-lg shrink-0">{activityIcon(a.type)}</span>
                <div>
                  <p className="text-sm text-slate-900">{a.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{a.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-6 flex gap-3 justify-center flex-wrap">
          <button onClick={() => setLocation("/world")} className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-teal-600 transition-colors">
            <MapIcon className="h-4 w-4" /> Archipelago
          </button>
          <button onClick={() => setLocation("/progress")} className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-emerald-600 transition-colors">
            <Target className="h-4 w-4" /> Progress
          </button>
          <button onClick={() => setLocation("/leaderboard")} className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-amber-600 transition-colors">
            <Trophy className="h-4 w-4" /> Ranking
          </button>
          <button onClick={() => setLocation("/settings")} className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-purple-600 transition-colors">
            <Settings className="h-4 w-4" /> Settings
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/60 via-blue-50/60 to-white">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-slate-900/30 lg:hidden" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      )}

      {/* Header: Captain's Log */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-amber-200/60">
        <div className="mx-auto max-w-6xl px-4 py-2.5 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <button onClick={() => setLocation("/")} className="flex items-center gap-2 shrink-0">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <Anchor className="h-4 w-4 text-white" />
              </div>
              <span className="hidden sm:inline font-semibold text-sm text-amber-900">{t("common.appName")}</span>
            </button>

            <div className="flex items-center gap-3 text-center">
              <div className="hidden sm:flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white text-xs font-bold">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div className="text-left leading-tight">
                  <p className="text-xs font-semibold text-slate-900">{userName}</p>
                  <p className="text-[10px] text-slate-500">{t("studentDashboard.captainsDeck")}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <button onClick={() => setLocation("/settings")} className="p-1.5 rounded-md hover:bg-amber-100 transition-colors" aria-label="Settings">
                <Settings className="h-4 w-4 text-amber-700" />
              </button>
              <button onClick={handleLogout} className="p-1.5 rounded-md hover:bg-red-50 transition-colors" aria-label="Logout">
                <LogOut className="h-4 w-4 text-red-500" />
              </button>
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-md hover:bg-amber-100 lg:hidden">
                {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {renderContent()}
      </div>
    </div>
  );
}
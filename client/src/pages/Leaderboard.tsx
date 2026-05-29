import { useState } from "react";
import { useLocation } from "wouter";
import {
  Trophy,
  Medal,
  Flame,
  Star,
  Users,
  BookOpen,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  LogOut,
} from "lucide-react";
import { authService } from "@/lib/auth-service";
import { useI18n } from "@/contexts/I18nContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

// Mock leaderboard data
const globalLeaderboardData = [
  {
    rank: 1,
    name: "Alex Chen",
    school: "Riverside Academy",
    xp: 15420,
    level: 28,
    streak: 45,
    badges: 12,
    change: 0,
  },
  {
    rank: 2,
    name: "Emma Wilson",
    school: "Central High",
    xp: 14890,
    level: 27,
    streak: 38,
    badges: 10,
    change: 1,
  },
  {
    rank: 3,
    name: "Marcus Johnson",
    school: "Riverside Academy",
    xp: 14560,
    level: 26,
    streak: 32,
    badges: 9,
    change: -1,
  },
  {
    rank: 4,
    name: "Sophia Lee",
    school: "North District School",
    xp: 14120,
    level: 26,
    streak: 28,
    badges: 8,
    change: 0,
  },
  {
    rank: 5,
    name: "David Brown",
    school: "Central High",
    xp: 13890,
    level: 25,
    streak: 25,
    badges: 7,
    change: 2,
  },
  {
    rank: 6,
    name: "Lisa Garcia",
    school: "Riverside Academy",
    xp: 13450,
    level: 25,
    streak: 20,
    badges: 6,
    change: -1,
  },
  {
    rank: 7,
    name: "James Miller",
    school: "East Valley School",
    xp: 13120,
    level: 24,
    streak: 18,
    badges: 5,
    change: 0,
  },
  {
    rank: 8,
    name: "Nina Patel",
    school: "North District School",
    xp: 12890,
    level: 24,
    streak: 15,
    badges: 4,
    change: 1,
  },
];

const classLeaderboardData = [
  {
    rank: 1,
    name: "Alex Chen",
    xp: 5420,
    level: 18,
    streak: 15,
    badges: 5,
  },
  {
    rank: 2,
    name: "Sarah Kim",
    xp: 5120,
    level: 17,
    streak: 12,
    badges: 4,
  },
  {
    rank: 3,
    name: "Tom Anderson",
    xp: 4890,
    level: 17,
    streak: 10,
    badges: 3,
  },
  {
    rank: 4,
    name: "Jessica Liu",
    xp: 4560,
    level: 16,
    streak: 8,
    badges: 3,
  },
  {
    rank: 5,
    name: "Michael Zhang",
    xp: 4120,
    level: 15,
    streak: 5,
    badges: 2,
  },
];

const achievementBadges = [
  { id: 1, name: "First Steps", icon: "🎯", description: "Complete first lesson" },
  { id: 2, name: "Quiz Master", icon: "🧠", description: "Score 100% on 5 quizzes" },
  { id: 3, name: "Streak Warrior", icon: "🔥", description: "Maintain 7-day streak" },
  { id: 4, name: "Math Wizard", icon: "🧮", description: "Complete all Math courses" },
  { id: 5, name: "Science Explorer", icon: "🔬", description: "Complete all Science courses" },
  { id: 6, name: "Word Master", icon: "📚", description: "Complete all English courses" },
  { id: 7, name: "Code Ninja", icon: "💻", description: "Complete Programming Realm" },
  { id: 8, name: "Time Keeper", icon: "⏰", description: "Complete 50 lessons" },
  { id: 9, name: "Legend", icon: "👑", description: "Reach level 30" },
  { id: 10, name: "Speed Runner", icon: "⚡", description: "Complete lesson in under 5 min" },
  { id: 11, name: "Perfectionist", icon: "✨", description: "Score 100% on 10 quizzes" },
  { id: 12, name: "Marathon Runner", icon: "🏃", description: "Complete 100 lessons" },
];

export default function Leaderboard() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("global");
  const [selectedClass, setSelectedClass] = useState("9A");
  const { t } = useI18n();

  const handleLogout = async () => {
    await authService.logout();
    setLocation("/");
  };

  const getRankMedal = (rank: number) => {
    if (rank === 1) return <Medal className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-orange-600" />;
    return <span className="text-lg font-bold text-gray-600">{rank}</span>;
  };

  const renderGlobalLeaderboard = () => (
    <div className="space-y-6">
      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {globalLeaderboardData.slice(0, 3).map((player, idx) => (
          <div
            key={player.rank}
            className={`rounded-lg border-2 p-6 text-center ${
              idx === 0
                ? "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300 md:col-span-1 md:order-2 md:scale-105"
                : idx === 1
                  ? "bg-gradient-to-br from-gray-50 to-slate-50 border-gray-300 md:order-1"
                  : "bg-gradient-to-br from-orange-50 to-red-50 border-orange-300 md:order-3"
            }`}
          >
            <div className="flex justify-center mb-3">
              {getRankMedal(player.rank)}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{player.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{player.school}</p>

            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="text-3xl font-bold text-indigo-600 mb-1">
                {player.xp.toLocaleString()}
              </div>
              <p className="text-xs text-gray-600">{t("total_xp", "Total XP")}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-lg font-bold text-gray-900">{player.level}</p>
                <p className="text-xs text-gray-600">{t("level", "Level")}</p>
              </div>
              <div>
                <p className="text-lg font-bold text-red-500">{player.streak}</p>
                <p className="text-xs text-gray-600">{t("streak", "Streak")}</p>
              </div>
              <div>
                <p className="text-lg font-bold text-purple-600">{player.badges}</p>
                <p className="text-xs text-gray-600">{t("badges", "Badges")}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {t("global_rankings", "Global Rankings")}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  {t("rank", "Rank")}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  {t("student", "Student")}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  {t("school", "School")}
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                  {t("xp", "XP")}
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                  {t("level", "Level")}
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                  {t("streak", "Streak")}
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                  {t("change", "Change")}
                </th>
              </tr>
            </thead>
            <tbody>
              {globalLeaderboardData.map((player) => (
                <tr
                  key={player.rank}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      {getRankMedal(player.rank)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{player.name}</p>
                      <div className="flex gap-1 mt-1">
                        {Array.from({ length: player.badges }).map((_, i) => (
                          <span key={i} className="text-lg">
                            ⭐
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{player.school}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {player.xp.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-semibold text-gray-900">
                    {player.level}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Flame className="w-4 h-4 text-red-500" />
                      <span className="font-semibold text-gray-900">{player.streak}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {player.change > 0 ? (
                      <div className="flex items-center justify-center gap-1 text-green-600">
                        <ArrowUp className="w-4 h-4" />
                        <span className="font-semibold">{player.change}</span>
                      </div>
                    ) : player.change < 0 ? (
                      <div className="flex items-center justify-center gap-1 text-red-600">
                        <ArrowDown className="w-4 h-4" />
                        <span className="font-semibold">{Math.abs(player.change)}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderClassLeaderboard = () => (
    <div className="space-y-6">
      {/* Class Selector */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {t("select_class", "Select Class")}
        </label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          {["9A", "9B", "10A", "10B", "11A"].map((cls) => (
            <option key={cls} value={cls}>
              {t("class", "Class")} {cls}
            </option>
          ))}
        </select>
      </div>

      {/* Class Leaderboard Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {t("class", "Class")} {selectedClass} {t("rankings", "Rankings")}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  {t("rank", "Rank")}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  {t("student", "Student")}
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                  {t("xp", "XP")}
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                  {t("level", "Level")}
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                  {t("streak", "Streak")}
                </th>
              </tr>
            </thead>
            <tbody>
              {classLeaderboardData.map((player) => (
                <tr
                  key={player.rank}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      {getRankMedal(player.rank)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{player.name}</p>
                      <div className="flex gap-1 mt-1">
                        {Array.from({ length: player.badges }).map((_, i) => (
                          <span key={i} className="text-lg">
                            ⭐
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {player.xp.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-semibold text-gray-900">
                    {player.level}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Flame className="w-4 h-4 text-red-500" />
                      <span className="font-semibold text-gray-900">{player.streak}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          {t("available_achievements", "Available Achievements")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievementBadges.map((badge) => (
            <div
              key={badge.id}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow text-center"
            >
              <div className="text-5xl mb-3">{badge.icon}</div>
              <h4 className="font-semibold text-gray-900 mb-1">{badge.name}</h4>
              <p className="text-sm text-gray-600">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h1 className="text-2xl font-bold text-gray-900">
              {t("leaderboard", "Leaderboard")}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">{t("logout", "Logout")}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab("global")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === "global"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <Users className="w-5 h-5" />
            {t("global", "Global")}
          </button>

          <button
            onClick={() => setActiveTab("class")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === "class"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <BookOpen className="w-5 h-5" />
            {t("class", "Class")}
          </button>

          <button
            onClick={() => setActiveTab("achievements")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === "achievements"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <Star className="w-5 h-5" />
            {t("achievements", "Achievements")}
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "global" && renderGlobalLeaderboard()}
          {activeTab === "class" && renderClassLeaderboard()}
          {activeTab === "achievements" && renderAchievements()}
        </div>
      </div>
    </div>
  );
}

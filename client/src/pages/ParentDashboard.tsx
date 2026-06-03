import React, { useState, useMemo } from "react";
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
  Users,
  Clock,
  Calendar,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Award,
  GraduationCap,
  Lightbulb,
  Eye,
} from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import {
  DashboardLayout,
  type DashboardNavItem,
} from "@/components/DashboardLayout";
import {
  StatCard,
  SectionHeading,
  EmptyState,
} from "@/components/DashboardWidgets";

type Tab = "overview" | "progress" | "achievements" | "rec";

interface Child {
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  avgGrade: number;
  attendance: number;
  weeklyMinutes: number;
  trend: number[];
}

const CHILDREN: Child[] = [
  {
    id: "1",
    name: "Anna Becker",
    avatar: "AB",
    level: 5,
    xp: 1820,
    avgGrade: 92,
    attendance: 98,
    weeklyMinutes: 245,
    trend: [70, 75, 80, 84, 88, 92],
  },
  {
    id: "2",
    name: "Lukas Schäfer",
    avatar: "LS",
    level: 4,
    xp: 1640,
    avgGrade: 87,
    attendance: 95,
    weeklyMinutes: 188,
    trend: [62, 68, 72, 78, 82, 87],
  },
];

const RECOMMENDATIONS: { id: string; title: string; description: string; icon: React.ReactNode }[] = [
  { id: "r1", title: "Encourage daily reading",     description: "20 minutes of reading every day improves vocabulary by 30%.", icon: <BookOpen className="w-5 h-5" /> },
  { id: "r2", title: "Celebrate the streak",          description: "Your child is on a 12-day learning streak — keep the momentum going.", icon: <Sparkles className="w-5 h-5" /> },
  { id: "r3", title: "Try a new archipelago",         description: "The Programming Realm unlocks when Mathematics is complete.", icon: <Lightbulb className="w-5 h-5" /> },
];

export default function ParentDashboard() {
  const { t } = useI18n();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [selectedChild, setSelectedChild] = useState<Child>(CHILDREN[0]);

  const navItems: DashboardNavItem[] = [
    { to: "/",            id: "home",         labelKey: "nav.home",         icon: <Home className="w-4 h-4" /> },
    { to: "/archipelago", id: "archipelago",  labelKey: "nav.archipelagos", icon: <MapIcon className="w-4 h-4" /> },
    { to: "/courses",     id: "courses",      labelKey: "nav.courses",      icon: <BookOpen className="w-4 h-4" /> },
    { to: "/dashboard",   id: "achievements", labelKey: "nav.achievements", icon: <Trophy className="w-4 h-4" /> },
    { to: "/dashboard",   id: "xp",           labelKey: "nav.xpLevels",     icon: <Star className="w-4 h-4" /> },
    { to: "/dashboard",   id: "progress",     labelKey: "nav.progress",     icon: <BarChart3 className="w-4 h-4" /> },
    { to: "/login",       id: "settings",     labelKey: "nav.settings",     icon: <Settings className="w-4 h-4" /> },
    { to: "/dashboard",   id: "profile",      labelKey: "nav.profile",      icon: <UserIcon className="w-4 h-4" /> },
  ];

  const tabs: { id: Tab; labelKey: string; icon: React.ReactNode }[] = [
    { id: "overview",       labelKey: "dashboard.professionalDashboard", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "progress",       labelKey: "dashboard.progressOverview",     icon: <TrendingUp className="w-4 h-4" /> },
    { id: "achievements",   labelKey: "nav.achievements",              icon: <Trophy className="w-4 h-4" /> },
    { id: "rec", labelKey: "common.achievement",           icon: <Lightbulb className="w-4 h-4" /> },
  ];

  const handleNav = (item: DashboardNavItem) => {
    if (item.to && item.to !== "#") setLocation(item.to);
  };

  return (
    <DashboardLayout
      titleKey="dashboard.parentDashboard"
      subtitleKey="dashboard.parentSubtitle"
      navItems={navItems}
      activeKey="/dashboard"
      onNavigate={handleNav}
    >
      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
              activeTab === tab.id
                ? "bg-cyan-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {tab.icon}
            {t(tab.labelKey)}
          </button>
        ))}
      </div>

      {/* Child selector */}
      <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {CHILDREN.map((c) => {
          const isActive = selectedChild.id === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedChild(c)}
              className={`card card-interactive flex items-center gap-4 p-5 text-left ${
                isActive ? "ring-2 ring-cyan-400" : ""
              }`}
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 text-base font-extrabold text-white">
                {c.avatar}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-base font-extrabold text-slate-900">{c.name}</p>
                <p className="text-xs text-slate-500">
                  Level {c.level} · {c.xp} XP · {c.weeklyMinutes} {t("common.minutes").toLowerCase()} this week
                </p>
              </div>
              <div className="text-right">
                <p className="text-base font-extrabold text-cyan-700">{c.avgGrade}%</p>
                <p className="text-[10px] uppercase text-slate-400">avg</p>
              </div>
            </button>
          );
        })}
      </section>

      {activeTab === "overview" && <OverviewTab child={selectedChild} />}
      {activeTab === "progress" && <ProgressTab child={selectedChild} />}
      {activeTab === "achievements" && <AchievementsTab />}
      {activeTab === "rec" && <RecommendationsTab />}
    </DashboardLayout>
  );
}

function OverviewTab({ child }: { child: Child }) {
  const { t } = useI18n();
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label={t("common.level")} value={child.level} icon={<GraduationCap className="w-5 h-5" />} accent="from-cyan-500 to-teal-600" />
        <StatCard label={t("common.xp")} value={child.xp} icon={<Star className="w-5 h-5" />} accent="from-amber-400 to-orange-500" />
        <StatCard label={t("common.achievement") + " (avg)"} value={`${child.avgGrade}%`} icon={<Award className="w-5 h-5" />} accent="from-emerald-500 to-teal-500" />
        <StatCard label={t("dashboard.engagement")} value={`${child.attendance}%`} icon={<TrendingUp className="w-5 h-5" />} accent="from-violet-500 to-fuchsia-500" />
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 card-elevated p-5">
          <SectionHeading
            icon={<Clock className="w-4 h-4" />}
            title={t("dashboard.todayLearning")}
            description={`${child.weeklyMinutes} ${t("common.minutes").toLowerCase()} this week`}
          />
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 7 }).map((_, idx) => {
              const active = idx < 5;
              return (
                <div
                  key={idx}
                  className={`flex h-20 flex-col items-center justify-end rounded-xl p-2 text-[10px] font-bold ${
                    active
                      ? "bg-gradient-to-b from-cyan-500 to-teal-400 text-white"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  <span>{["M", "T", "W", "T", "F", "S", "S"][idx]}</span>
                  <span className="mt-1 text-sm">{active ? `${30 + idx * 5}m` : "—"}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card-elevated p-5">
          <SectionHeading icon={<Sparkles className="w-4 h-4" />} title="Recent achievements" />
          <ul className="space-y-3">
            {[
              { id: 1, title: "Quiz Master",    date: "Yesterday",  icon: "🎯" },
              { id: 2, title: "Streak Warrior", date: "3 days ago", icon: "🔥" },
              { id: 3, title: "First Wall",     date: "1 week ago", icon: "🧱" },
            ].map((a) => (
              <li key={a.id} className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden>{a.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{a.title}</p>
                  <p className="text-xs text-slate-500">{a.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function ProgressTab({ child }: { child: Child }) {
  const { t } = useI18n();
  return (
    <div className="space-y-6">
      <section className="card-elevated p-5">
        <SectionHeading
          icon={<TrendingUp className="w-4 h-4" />}
          title={t("dashboard.progressOverview")}
          description={`${child.name} · ${child.weeklyMinutes} ${t("common.minutes").toLowerCase()} this week`}
        />
        <div className="flex h-44 items-end gap-2">
          {child.trend.map((v, idx) => (
            <div key={idx} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-lg bg-gradient-to-t from-cyan-500 to-teal-400"
                style={{ height: `${v}%` }}
                title={`${v}%`}
              />
              <span className="text-[10px] font-bold text-slate-500">W{idx + 1}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label={t("common.lesson")} value="38 / 50" icon={<BookOpen className="w-5 h-5" />} accent="from-cyan-500 to-teal-600" />
        <StatCard label={t("dashboard.weeklyGoal")} value="70%" icon={<Calendar className="w-5 h-5" />} accent="from-emerald-500 to-teal-500" />
        <StatCard label={t("common.streak")} value="12" icon={<Sparkles className="w-5 h-5" />} accent="from-amber-400 to-orange-500" />
      </section>
    </div>
  );
}

function AchievementsTab() {
  const { t } = useI18n();
  return (
    <div className="card-elevated p-5">
      <SectionHeading
        icon={<Trophy className="w-4 h-4" />}
        title={t("dashboard.achievementsOverview")}
        description="Badges and milestones your child has reached"
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {[
          { id: 1, name: "First Steps",      icon: "🚀", status: "unlocked" },
          { id: 2, name: "Quiz Master",      icon: "🎯", status: "unlocked" },
          { id: 3, name: "Streak Warrior",   icon: "🔥", status: "in-progress" },
          { id: 4, name: "Marathon Runner",  icon: "🏃", status: "in-progress" },
          { id: 5, name: "Code Ninja",       icon: "🥷", status: "locked" },
          { id: 6, name: "Speed Runner",     icon: "⚡", status: "locked" },
          { id: 7, name: "Perfectionist",    icon: "💎", status: "locked" },
          { id: 8, name: "Legend",           icon: "👑", status: "locked" },
        ].map((a) => (
          <div
            key={a.id}
            className={`rounded-2xl border p-4 text-center transition-all ${
              a.status === "unlocked"
                ? "border-amber-200 bg-amber-50"
                : a.status === "in-progress"
                ? "border-cyan-200 bg-cyan-50"
                : "border-slate-200 bg-slate-50 opacity-60"
            }`}
          >
            <div className="text-3xl">{a.icon}</div>
            <p className="mt-2 text-sm font-bold text-slate-900">{a.name}</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-wider text-slate-500">
              {a.status === "unlocked" ? "Unlocked" : a.status === "in-progress" ? "In progress" : "Locked"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecommendationsTab() {
  const { t } = useI18n();
  return (
    <div className="card-elevated p-5">
      <SectionHeading
        icon={<Lightbulb className="w-4 h-4" />}
        title="Personalized recommendations"
        description="Helpful next steps for your child"
      />
      <ul className="space-y-3">
        {RECOMMENDATIONS.map((r) => (
          <li
            key={r.id}
            className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4"
          >
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 text-white">
              {r.icon}
            </span>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-900">{r.title}</p>
              <p className="text-xs text-slate-600">{r.description}</p>
            </div>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              aria-label={r.title}
            >
              <Eye className="h-4 w-4" />
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

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
  Building2,
  Users,
  GraduationCap,
  TrendingUp,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Plus,
  ChevronRight,
} from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import {
  DashboardLayout,
  type DashboardNavItem,
} from "@/components/DashboardLayout";
import {
  StatCard,
  SectionHeading,
} from "@/components/DashboardWidgets";

type Tab = "overview" | "classes" | "analytics" | "settings";

const STATS = {
  name: "Riverside Academy",
  students: 450,
  teachers: 35,
  classes: 18,
  averageProgress: 72,
  subscription: { plan: "Premium", endDate: "2025-12-31" },
  monthlyEngagement: [62, 68, 71, 74, 72, 76, 80, 78, 82, 85, 84, 88] as number[],
  subjectEnrollment: [
    { name: "Mathematics", value: 450 },
    { name: "English",     value: 420 },
    { name: "Science",     value: 380 },
    { name: "History",     value: 290 },
    { name: "Geography",   value: 310 },
    { name: "Programming", value: 200 },
  ],
};

const CLASS_PERFORMANCE = [
  { id: "9A",  students: 32, avgScore: 78 },
  { id: "9B",  students: 30, avgScore: 82 },
  { id: "10A", students: 28, avgScore: 75 },
  { id: "10B", students: 29, avgScore: 85 },
  { id: "11A", students: 31, avgScore: 88 },
];

const ACTIVITY: { id: number; type: "success" | "alert"; description: string; time: string }[] = [
  { id: 1, type: "success", description: "Class 9A completed Mathematics Module 5",     time: "2h ago" },
  { id: 2, type: "success", description: "Dr. Sarah Johnson joined as Science Teacher", time: "5h ago" },
  { id: 3, type: "alert",   description: "Class 10B has low engagement this week",     time: "1d ago" },
  { id: 4, type: "success", description: "Subscription renewed for 12 months",         time: "3d ago" },
  { id: 5, type: "success", description: "Advanced Programming Course added to catalog", time: "1w ago" },
];

export default function SchoolDashboard() {
  const { t } = useI18n();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const navItems: DashboardNavItem[] = [
    { to: "/",            id: "home",         labelKey: "nav.home",         icon: <Home className="w-4 h-4" /> },
    { to: "/world",       id: "archipelago",  labelKey: "nav.archipelagos", icon: <MapIcon className="w-4 h-4" /> },
    { to: "/courses",     id: "courses",      labelKey: "nav.courses",      icon: <BookOpen className="w-4 h-4" /> },
    { to: "/dashboard",   id: "achievements", labelKey: "nav.achievements", icon: <Trophy className="w-4 h-4" /> },
    { to: "/dashboard",   id: "xp",           labelKey: "nav.xpLevels",     icon: <Star className="w-4 h-4" /> },
    { to: "/dashboard",   id: "progress",     labelKey: "nav.progress",     icon: <BarChart3 className="w-4 h-4" /> },
    { to: "/login",       id: "settings",     labelKey: "nav.settings",     icon: <Settings className="w-4 h-4" /> },
    { to: "/dashboard",   id: "profile",      labelKey: "nav.profile",      icon: <UserIcon className="w-4 h-4" /> },
  ];

  const tabs: { id: Tab; labelKey: string; icon: React.ReactNode }[] = [
    { id: "overview",  labelKey: "dashboard.professionalDashboard", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "classes",   labelKey: "dashboard.activeStudents",          icon: <Users className="w-4 h-4" /> },
    { id: "analytics", labelKey: "dashboard.engagement",             icon: <TrendingUp className="w-4 h-4" /> },
    { id: "settings",  labelKey: "common.settings",                  icon: <Settings className="w-4 h-4" /> },
  ];

  const handleNav = (item: DashboardNavItem) => {
    if (item.to && item.to !== "#") setLocation(item.to);
  };

  return (
    <DashboardLayout
      titleKey="dashboard.schoolDashboard"
      subtitleKey="dashboard.schoolSubtitle"
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

      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "classes" && <ClassesTab />}
      {activeTab === "analytics" && <AnalyticsTab />}
      {activeTab === "settings" && <SettingsTab />}
    </DashboardLayout>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Students"     value={STATS.students}          icon={<Users className="w-5 h-5" />} accent="from-cyan-500 to-teal-600" trend={{ value: "+12", positive: true }} />
        <StatCard label="Teachers"     value={STATS.teachers}          icon={<GraduationCap className="w-5 h-5" />} accent="from-emerald-500 to-teal-500" />
        <StatCard label="Classes"      value={STATS.classes}           icon={<Building2 className="w-5 h-5" />} accent="from-violet-500 to-fuchsia-500" />
        <StatCard label="Avg progress" value={`${STATS.averageProgress}%`} icon={<TrendingUp className="w-5 h-5" />} accent="from-amber-400 to-orange-500" trend={{ value: "+3.4%", positive: true }} />
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 card-elevated p-5">
          <SectionHeading icon={<Building2 className="w-4 h-4" />} title={STATS.name} />
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Detail label="Plan" value={STATS.subscription.plan} />
            <Detail label="Renews on" value={STATS.subscription.endDate} />
            <Detail label="Courses offered" value="24" />
            <Detail label="Completed courses" value="156" />
            <Detail label="Ongoing courses" value="89" />
            <Detail label="Active subscription" value={<CheckCircle2 className="h-4 w-4 text-emerald-500 inline" />} />
          </dl>
        </div>
        <div className="card-elevated p-5">
          <SectionHeading icon={<CreditCard className="w-4 h-4" />} title="Subscription" />
          <p className="text-3xl font-extrabold text-cyan-700">{STATS.subscription.plan}</p>
          <p className="text-xs text-slate-500">Renews on {STATS.subscription.endDate}</p>
          <button type="button" className="btn btn-primary btn-sm mt-4 w-full">
            Manage plan
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      <section className="card-elevated p-5">
        <SectionHeading icon={<TrendingUp className="w-4 h-4" />} title="Recent activity" />
        <ul className="divide-y divide-slate-100">
          {ACTIVITY.map((a) => (
            <li key={a.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              {a.type === "success" ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-amber-500" />
              )}
              <p className="flex-1 text-sm text-slate-800">{a.description}</p>
              <span className="text-xs text-slate-500">{a.time}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function ClassesTab() {
  return (
    <div className="card-elevated p-5">
      <SectionHeading
        icon={<Users className="w-4 h-4" />}
        title="Class performance"
        description="Average scores per class"
        action={
          <button type="button" className="btn btn-primary btn-sm">
            <Plus className="h-4 w-4" />
            Add class
          </button>
        }
      />
      <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Class</th>
              <th className="px-4 py-3">Students</th>
              <th className="px-4 py-3">Avg score</th>
              <th className="px-4 py-3">Progress</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {CLASS_PERFORMANCE.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-bold text-slate-900">Class {c.id}</td>
                <td className="px-4 py-3 text-slate-600">{c.students}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full bg-cyan-50 px-2.5 py-0.5 text-xs font-bold text-cyan-700">
                    {c.avgScore}%
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="progress-track w-32" aria-hidden>
                    <div className="progress-fill" style={{ width: `${c.avgScore}%` }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AnalyticsTab() {
  const max = Math.max(...STATS.monthlyEngagement);
  return (
    <div className="space-y-6">
      <div className="card-elevated p-5">
        <SectionHeading
          icon={<TrendingUp className="w-4 h-4" />}
          title="Monthly engagement"
          description="Active students per month"
        />
        <div className="flex h-44 items-end gap-2">
          {STATS.monthlyEngagement.map((v, idx) => (
            <div key={idx} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-lg bg-gradient-to-t from-cyan-500 to-teal-400"
                style={{ height: `${(v / max) * 100}%` }}
                title={`${v}%`}
              />
              <span className="text-[10px] font-bold text-slate-500">
                {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][idx]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="card-elevated p-5">
        <SectionHeading
          icon={<BookOpen className="w-4 h-4" />}
          title="Subject enrollment"
          description="Students per subject"
        />
        <ul className="space-y-2">
          {STATS.subjectEnrollment.map((s) => (
            <li key={s.name} className="flex items-center gap-3">
              <span className="w-28 truncate text-sm font-semibold text-slate-700">{s.name}</span>
              <div className="progress-track flex-1" aria-hidden>
                <div
                  className="progress-fill"
                  style={{ width: `${(s.value / 500) * 100}%` }}
                />
              </div>
              <span className="w-12 text-right text-sm font-bold text-cyan-700">{s.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SettingsTab() {
  const { t } = useI18n();
  return (
    <div className="card-elevated p-5">
      <SectionHeading icon={<Settings className="w-4 h-4" />} title="School settings" />
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="School name" defaultValue={STATS.name} />
        <Field label="Contact email" placeholder="contact@school.edu" type="email" />
        <Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
        <Field label="Address" placeholder="123 School Street" />
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        <button type="button" className="btn btn-primary btn-md">
          {t("common.save")}
        </button>
        <button type="button" className="btn btn-outline btn-md">
          {t("common.cancel")}
        </button>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className="text-sm font-semibold text-slate-900">{value}</dd>
    </div>
  );
}

function Field({
  label,
  defaultValue,
  placeholder,
  type = "text",
}: {
  label: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-600">{label}</span>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="mt-1 w-full"
      />
    </label>
  );
}

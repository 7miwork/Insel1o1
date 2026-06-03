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
  GraduationCap,
  ChevronRight,
  CheckCircle2,
  ClipboardList,
  Calendar,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import {
  DashboardLayout,
  type DashboardNavItem,
} from "@/components/DashboardLayout";
import { StatCard, SectionHeading, EmptyState } from "@/components/DashboardWidgets";

type Tab = "overview" | "students" | "analytics" | "grading";

interface ClassRoom {
  id: string;
  name: string;
  studentCount: number;
  averageGrade: number;
  averageXP: number;
  lessonsCompleted: number;
  totalLessons: number;
  topStudent: { name: string; xp: number; avatar: string };
}

interface StudentRow {
  id: string;
  name: string;
  grade: string;
  level: number;
  xp: number;
  avgGrade: number;
  attendance: number;
  lastActive: string;
  avatar: string;
  trend: number[];
}

const CLASSES: ClassRoom[] = [
  {
    id: "9a",
    name: "Class 9A — Mathematics",
    studentCount: 28,
    averageGrade: 82,
    averageXP: 1450,
    lessonsCompleted: 38,
    totalLessons: 50,
    topStudent: { name: "Anna Becker",   xp: 1820, avatar: "AB" },
  },
  {
    id: "9b",
    name: "Class 9B — Mathematics",
    studentCount: 24,
    averageGrade: 78,
    averageXP: 1310,
    lessonsCompleted: 32,
    totalLessons: 50,
    topStudent: { name: "Lukas Schäfer", xp: 1640, avatar: "LS" },
  },
  {
    id: "10a",
    name: "Class 10A — Science",
    studentCount: 22,
    averageGrade: 86,
    averageXP: 1560,
    lessonsCompleted: 41,
    totalLessons: 50,
    topStudent: { name: "Mia Wagner",    xp: 1985, avatar: "MW" },
  },
];

const STUDENTS: StudentRow[] = [
  { id: "1", name: "Anna Becker",     grade: "9A", level: 5, xp: 1820, avgGrade: 92, attendance: 98, lastActive: "2h ago", avatar: "AB", trend: [70, 75, 80, 84, 88, 92] },
  { id: "2", name: "Lukas Schäfer",   grade: "9B", level: 4, xp: 1640, avgGrade: 87, attendance: 95, lastActive: "1d ago", avatar: "LS", trend: [62, 68, 72, 78, 82, 87] },
  { id: "3", name: "Mia Wagner",      grade: "10A", level: 6, xp: 1985, avgGrade: 95, attendance: 99, lastActive: "30m ago", avatar: "MW", trend: [80, 84, 88, 90, 92, 95] },
  { id: "4", name: "Noah Fischer",    grade: "9A", level: 3, xp: 1200, avgGrade: 78, attendance: 88, lastActive: "5h ago", avatar: "NF", trend: [55, 60, 65, 70, 75, 78] },
];

export default function TeacherDashboard() {
  const { t } = useI18n();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [selectedClass, setSelectedClass] = useState(CLASSES[0]);
  const [selectedStudent, setSelectedStudent] = useState<StudentRow | null>(null);

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
    { id: "overview", labelKey: "dashboard.professionalDashboard", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "students", labelKey: "dashboard.activeStudents",          icon: <Users className="w-4 h-4" /> },
    { id: "analytics", labelKey: "dashboard.engagement",             icon: <TrendingUp className="w-4 h-4" /> },
    { id: "grading",  labelKey: "common.achievement",               icon: <GraduationCap className="w-4 h-4" /> },
  ];

  const handleNav = (item: DashboardNavItem) => {
    if (item.to && item.to !== "#") setLocation(item.to);
  };

  return (
    <DashboardLayout
      titleKey="dashboard.teacherDashboard"
      subtitleKey="dashboard.teacherSubtitle"
      navItems={navItems}
      activeKey="/dashboard"
      onNavigate={handleNav}
    >
      {/* Tabs */}
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

      {activeTab === "overview" && (
        <OverviewTab
          selectedClass={selectedClass}
          onSelectClass={setSelectedClass}
        />
      )}
      {activeTab === "students" && (
        <StudentsTab
          students={STUDENTS}
          selectedStudent={selectedStudent}
          onSelect={setSelectedStudent}
        />
      )}
      {activeTab === "analytics" && <AnalyticsTab student={selectedStudent} />}
      {activeTab === "grading" && <GradingTab />}
    </DashboardLayout>
  );
}

function OverviewTab({
  selectedClass,
  onSelectClass,
}: {
  selectedClass: ClassRoom;
  onSelectClass: (c: ClassRoom) => void;
}) {
  const { t } = useI18n();
  const pct = Math.round(
    (selectedClass.lessonsCompleted / selectedClass.totalLessons) * 100
  );

  return (
    <div className="space-y-6">
      {/* Class selector */}
      <section>
        <SectionHeading
          icon={<Users className="w-4 h-4" />}
          title={t("dashboard.selectClass")}
          description={t("dashboard.activeStudents")}
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CLASSES.map((cls) => {
            const isActive = selectedClass.id === cls.id;
            return (
              <button
                key={cls.id}
                type="button"
                onClick={() => onSelectClass(cls)}
                className={`card card-interactive text-left p-5 ${
                  isActive ? "ring-2 ring-cyan-400" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900">{cls.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {cls.studentCount} {t("dashboard.activeStudents").toLowerCase()}
                    </p>
                  </div>
                  {isActive && (
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-cyan-600 text-white">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="text-slate-500">{t("dashboard.averageProgress")}</span>
                  <span className="font-bold text-cyan-700">
                    {Math.round((cls.lessonsCompleted / cls.totalLessons) * 100)}%
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* KPIs */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label={t("dashboard.activeStudents")}
          value={selectedClass.studentCount}
          icon={<Users className="w-5 h-5" />}
          accent="from-cyan-500 to-teal-600"
          trend={{ value: "+3", positive: true }}
        />
        <StatCard
          label={t("common.achievement") + " (avg)"}
          value={`${selectedClass.averageGrade}%`}
          icon={<GraduationCap className="w-5 h-5" />}
          accent="from-emerald-500 to-teal-500"
          trend={{ value: "+2.1%", positive: true }}
        />
        <StatCard
          label={t("common.xp") + " (avg)"}
          value={selectedClass.averageXP}
          icon={<Star className="w-5 h-5" />}
          accent="from-amber-400 to-orange-500"
          trend={{ value: "+120", positive: true }}
        />
        <StatCard
          label={t("common.lesson")}
          value={`${selectedClass.lessonsCompleted}/${selectedClass.totalLessons}`}
          icon={<ClipboardList className="w-5 h-5" />}
          accent="from-violet-500 to-fuchsia-500"
          trend={{ value: `${pct}%`, positive: pct >= 50 }}
        />
      </section>

      {/* Top performer + class progress */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 card-elevated p-5">
          <SectionHeading
            icon={<TrendingUp className="w-4 h-4" />}
            title={t("dashboard.averageProgress")}
            description={`${selectedClass.lessonsCompleted} / ${selectedClass.totalLessons} ${t("common.lesson").toLowerCase()}`}
          />
          <div className="progress-track progress-track-lg" aria-hidden>
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs">
            <Pill label="Completed" value={selectedClass.lessonsCompleted} icon={<CheckCircle2 className="w-4 h-4" />} />
            <Pill label="Remaining" value={selectedClass.totalLessons - selectedClass.lessonsCompleted} icon={<Calendar className="w-4 h-4" />} />
            <Pill label="Avg Grade"  value={`${selectedClass.averageGrade}%`} icon={<GraduationCap className="w-4 h-4" />} />
          </div>
        </div>
        <div className="card-elevated p-5">
          <SectionHeading icon={<Trophy className="w-4 h-4" />} title="Top performer" />
          <div className="flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-base font-extrabold text-white">
              {selectedClass.topStudent.avatar}
            </span>
            <div>
              <p className="text-base font-extrabold text-slate-900">
                {selectedClass.topStudent.name}
              </p>
              <p className="text-xs text-slate-500">
                {selectedClass.topStudent.xp} XP · Leading the class
              </p>
            </div>
          </div>
          <button type="button" className="btn btn-outline btn-sm mt-4 w-full">
            <MessageSquare className="h-4 w-4" />
            Send message
          </button>
        </div>
      </section>
    </div>
  );
}

function StudentsTab({
  students,
  selectedStudent,
  onSelect,
}: {
  students: StudentRow[];
  selectedStudent: StudentRow | null;
  onSelect: (s: StudentRow | null) => void;
}) {
  const { t } = useI18n();
  if (students.length === 0) {
    return (
      <EmptyState
        title={t("dashboard.noClasses")}
        description={t("dashboard.startFirstAdventure")}
      />
    );
  }
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 card-elevated p-5">
        <SectionHeading
          icon={<Users className="w-4 h-4" />}
          title={t("dashboard.activeStudents")}
          description="Tap a student to see details"
        />
        <ul className="divide-y divide-slate-100">
          {students.map((s) => {
            const isActive = selectedStudent?.id === s.id;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => onSelect(isActive ? null : s)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                    isActive ? "bg-cyan-50" : "hover:bg-slate-50"
                  }`}
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 text-xs font-extrabold text-white">
                    {s.avatar}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {s.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      Level {s.level} · {s.xp} XP
                    </p>
                  </div>
                  <div className="hidden text-right sm:block">
                    <p className="text-sm font-bold text-cyan-700">{s.avgGrade}%</p>
                    <p className="text-[10px] uppercase text-slate-400">avg</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {selectedStudent ? (
        <div className="card-elevated p-5">
          <SectionHeading icon={<UserIcon className="w-4 h-4" />} title={selectedStudent.name} />
          <dl className="space-y-3 text-sm">
            <Detail label="Class" value={selectedStudent.grade} />
            <Detail label="Level" value={String(selectedStudent.level)} />
            <Detail label="Total XP" value={String(selectedStudent.xp)} />
            <Detail label="Average grade" value={`${selectedStudent.avgGrade}%`} />
            <Detail label="Attendance" value={`${selectedStudent.attendance}%`} />
            <Detail label="Last active" value={selectedStudent.lastActive} />
          </dl>
          <button type="button" className="btn btn-primary btn-sm mt-5 w-full">
            View full progress
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="card-elevated flex items-center justify-center p-5">
          <EmptyState
            title={t("dashboard.selectStudent")}
            description="Pick a student from the list to see their details."
          />
        </div>
      )}
    </div>
  );
}

function AnalyticsTab({ student }: { student: StudentRow | null }) {
  const { t } = useI18n();
  if (!student) {
    return (
      <EmptyState
        title={t("dashboard.selectStudent")}
        description={t("dashboard.startFirstAdventure")}
      />
    );
  }
  const max = Math.max(...student.trend);
  const min = Math.min(...student.trend);
  return (
    <div className="space-y-6">
      <div className="card-elevated p-5">
        <SectionHeading
          icon={<TrendingUp className="w-4 h-4" />}
          title={student.name}
          description="Quiz performance over time"
        />
        <div className="flex h-40 items-end gap-2">
          {student.trend.map((value, idx) => {
            const heightPct = max === min ? 100 : ((value - min) / (max - min)) * 80 + 20;
            return (
              <div key={idx} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-lg bg-gradient-to-t from-cyan-500 to-teal-400"
                  style={{ height: `${heightPct}%` }}
                  title={`${value}%`}
                />
                <span className="text-[10px] font-bold text-slate-500">W{idx + 1}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <span>Min: {min}%</span>
          <span>Latest: {student.trend[student.trend.length - 1]}%</span>
          <span>Max: {max}%</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Attendance"  value={`${student.attendance}%`} icon={<CheckCircle2 className="w-5 h-5" />} accent="from-emerald-500 to-teal-500" />
        <StatCard label="Avg grade"   value={`${student.avgGrade}%`}     icon={<GraduationCap className="w-5 h-5" />} accent="from-cyan-500 to-teal-600" />
        <StatCard label="Total XP"    value={student.xp}                  icon={<Star className="w-5 h-5" />} accent="from-amber-400 to-orange-500" />
        <StatCard label="Level"       value={student.level}               icon={<Trophy className="w-5 h-5" />} accent="from-violet-500 to-fuchsia-500" />
      </div>
    </div>
  );
}

function GradingTab() {
  const { t } = useI18n();
  const [grade, setGrade] = useState(85);
  const [comment, setComment] = useState("");
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-1 card-elevated p-5">
        <SectionHeading icon={<GraduationCap className="w-4 h-4" />} title="Give a grade" />
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-600">Student</label>
            <select className="mt-1 w-full" aria-label="Student">
              {STUDENTS.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Grade</label>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="range"
                min={0}
                max={100}
                value={grade}
                onChange={(e) => setGrade(parseInt(e.target.value, 10))}
                className="flex-1 accent-cyan-600"
                aria-label="Grade"
              />
              <span className="w-12 text-right text-sm font-extrabold text-cyan-700">
                {grade}
              </span>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Comment</label>
            <textarea
              className="mt-1 h-24 resize-none"
              placeholder="Great improvement this week…"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <button type="button" className="btn btn-primary btn-md w-full">
            Submit grade
          </button>
        </div>
      </div>
      <div className="lg:col-span-2 card-elevated p-5">
        <SectionHeading
          icon={<BarChart3 className="w-4 h-4" />}
          title="Class grade distribution"
        />
        <div className="space-y-2">
          {STUDENTS.map((s) => (
            <div key={s.id} className="flex items-center gap-3">
              <span className="w-24 truncate text-sm font-semibold text-slate-700">{s.name}</span>
              <div className="progress-track flex-1" aria-hidden>
                <div
                  className="progress-fill"
                  style={{ width: `${s.avgGrade}%` }}
                />
              </div>
              <span className="w-12 text-right text-sm font-bold text-cyan-700">
                {s.avgGrade}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Pill({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 py-3">
      <span className="text-cyan-600">{icon}</span>
      <span className="text-base font-extrabold text-slate-900">{value}</span>
      <span className="text-[10px] uppercase tracking-wider text-slate-500">{label}</span>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-b-0 last:pb-0">
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className="text-sm font-semibold text-slate-900">{value}</dd>
    </div>
  );
}
       
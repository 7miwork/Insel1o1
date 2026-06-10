import React from "react";
import { useLocation } from "wouter";
import { BookOpen, ArrowLeft, CheckCircle2, Clock, Circle } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useI18n } from "@/contexts/I18nContext";

/**
 * Roadmap page – Live Development Transparency Layer
 *
 * UPDATE LOGIC FOR CLINE:
 * - This file is the single source of truth for product progress visibility.
 * - On any significant commit, scan the diff and update the relevant items:
 *   - Move items from "Planned" → "In Progress" → "Completed"
 *   - Add new items if a new feature area is introduced
 *   - Keep the visual order: Completed first, then In Progress, then Planned
 */
type Status = "completed" | "in_progress" | "planned";

interface RoadmapItem {
  title: string;
  status: Status;
}

const ROADMAP: RoadmapItem[] = [
  // 🟢 Completed
  { title: "Core platform setup (Vite + React + wouter)", status: "completed" },
  { title: "Student gamified system foundation", status: "completed" },
  { title: "SaaS dashboard structure (Student/Teacher/Parent/School/Admin)", status: "completed" },
  { title: "Multi-language i18n system (en / de / zh-TW)", status: "completed" },
  { title: "Landing page with Features & Security sections", status: "completed" },
  { title: "Pricing page with 4 plans & FAQ", status: "completed" },
  { title: "About page (Mission, Vision, Crew)", status: "completed" },
  { title: "Footer routing (smooth scroll + wouter routes)", status: "completed" },
  { title: "Coming-soon pages: Blog, Careers, Docs, Support, Community", status: "completed" },

  // 🟡 In Progress
  { title: "Content stabilization (i18n cleanup, raw key removal)", status: "in_progress" },
  { title: "Security & trust section (SaaS-grade transparency)", status: "in_progress" },
  { title: "Dashboard UX refinement (clean SaaS look)", status: "in_progress" },
  { title: "Authentication & demo accounts hardening", status: "in_progress" },
  { title: "Product roadmap (this page)", status: "in_progress" },

  // ⚪ Planned
  { title: "Real blog system (CMS, categories, search)", status: "planned" },
  { title: "Real careers system (open roles, application flow)", status: "planned" },
  { title: "Community expansion (forum, student discussions, teacher space)", status: "planned" },
  { title: "Documentation growth (getting started, platform overview, API)", status: "planned" },
  { title: "Support ticketing & knowledge base", status: "planned" },
  { title: "Notification preferences & email digests", status: "planned" },
  { title: "Mobile-first navigation & responsive dashboard polish", status: "planned" },
];

const statusMeta: Record<Status, { label: string; icon: React.ReactNode; color: string; chip: string; }> = {
  completed: {
    label: "Completed",
    icon: <CheckCircle2 className="h-4 w-4" />,
    color: "text-emerald-600",
    chip: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  in_progress: {
    label: "In Progress",
    icon: <Clock className="h-4 w-4" />,
    color: "text-amber-600",
    chip: "bg-amber-50 text-amber-700 border-amber-200",
  },
  planned: {
    label: "Planned",
    icon: <Circle className="h-4 w-4" />,
    color: "text-slate-500",
    chip: "bg-slate-50 text-slate-600 border-slate-200",
  },
};

export default function Roadmap() {
  const [, setLocation] = useLocation();
  const { t } = useI18n();

  const groups: { status: Status; items: RoadmapItem[] }[] = [
    { status: "completed", items: ROADMAP.filter((i) => i.status === "completed") },
    { status: "in_progress", items: ROADMAP.filter((i) => i.status === "in_progress") },
    { status: "planned", items: ROADMAP.filter((i) => i.status === "planned") },
  ];

  const total = ROADMAP.length;
  const done = ROADMAP.filter((i) => i.status === "completed").length;
  const inProg = ROADMAP.filter((i) => i.status === "in_progress").length;
  const pct = Math.round(((done + inProg * 0.5) / total) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600 text-white">
              <BookOpen className="h-4 w-4" />
            </span>
            <span className="font-bold text-slate-900">{t("roadmap.appName")}</span>
          </button>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => setLocation("/")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-cyan-700 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("roadmap.back")}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-16 sm:py-20">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            {t("roadmap.title")}
          </h1>
          <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            {t("roadmap.subtitle")}
          </p>
        </div>

        {/* Progress overview */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 mb-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-900">Overall progress</span>
            <span className="text-sm font-bold text-cyan-700">{pct}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
            <span><b className="text-slate-900">{done}</b> completed</span>
            <span><b className="text-slate-900">{inProg}</b> in progress</span>
            <span><b className="text-slate-900">{ROADMAP.filter(i => i.status === "planned").length}</b> planned</span>
          </div>
        </div>

        {/* Status groups */}
        <div className="space-y-10">
          {groups.map((group) => (
            <section key={group.status}>
              <div className="flex items-center gap-2 mb-4">
                <span className={statusMeta[group.status].color}>
                  {statusMeta[group.status].icon}
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  {statusMeta[group.status].label}
                </h2>
                <span className={`text-[10px] font-bold uppercase tracking-wider rounded-full border px-2 py-0.5 ${statusMeta[group.status].chip}`}>
                  {group.items.length}
                </span>
              </div>

              <ul className="space-y-2">
                {group.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 flex items-start gap-3"
                  >
                    <span className={`mt-0.5 flex-shrink-0 ${statusMeta[group.status].color}`}>
                      {statusMeta[group.status].icon}
                    </span>
                    <span className="flex-1">{item.title}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="text-xs text-slate-400 text-center mt-10">
          Updated continuously with every significant commit.
        </p>
      </main>
    </div>
  );
}

import React from "react";
import { useLocation } from "wouter";
import { BookOpen, ArrowLeft, FileText, Layers, GraduationCap, School, Clock } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useI18n } from "@/contexts/I18nContext";

/**
 * Docs page – Early Stage Product Structure
 * Transparent "in progress" SaaS design, no fake completeness.
 */
export default function Docs() {
  const [, setLocation] = useLocation();
  const { t } = useI18n();

  const sections = [
    { icon: <FileText className="h-4 w-4 text-cyan-600" />, title: "Getting Started", status: "Coming soon", desc: "First steps for students, parents and teachers." },
    { icon: <Layers className="h-4 w-4 text-amber-600" />, title: "Platform Overview", status: "In progress", desc: "How the Insel1o1 platform fits together." },
    { icon: <GraduationCap className="h-4 w-4 text-emerald-600" />, title: "Student System", status: "Planned", desc: "Learning paths, lessons, and progress." },
    { icon: <School className="h-4 w-4 text-violet-600" />, title: "School Dashboard", status: "Planned", desc: "Class management, analytics, and reports." },
  ];

  const statusColor = (status: string) => {
    if (status === "Coming soon") return "bg-amber-50 text-amber-700 border-amber-200";
    if (status === "In progress") return "bg-cyan-50 text-cyan-700 border-cyan-200";
    return "bg-slate-50 text-slate-600 border-slate-200";
  };

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
              <span className="font-bold text-slate-900">{t("docs.appName")}</span>
          </button>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => setLocation("/")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-cyan-700 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("docs.back")}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-16 sm:py-20">
        {/* Hero */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600 mb-6">
            <Clock className="h-3 w-3" />
            {t("docs.badge")}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Documentation is evolving
          </h1>
          <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            We are actively building structured learning and system documentation.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-3">
          {sections.map((s, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white p-6 flex items-start gap-4"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 border border-slate-200 flex-shrink-0">
                {s.icon}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="text-base font-semibold text-slate-900">{s.title}</h3>
                  <span className={`text-[10px] font-bold uppercase tracking-wider rounded-full border px-2 py-0.5 ${statusColor(s.status)}`}>
                    {s.status}
                  </span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <p className="text-xs text-slate-400 text-center mt-10">
          Docs will continuously expand as the platform grows.
        </p>
      </main>
    </div>
  );
}

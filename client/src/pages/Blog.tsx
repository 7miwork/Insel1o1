import React from "react";
import { useLocation } from "wouter";
import { BookOpen, ArrowLeft, Lightbulb, FileText, Bell } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useI18n } from "@/contexts/I18nContext";

/**
 * Blog page (Coming Soon)
 * A clean, calm "future expansion" experience.
 * No gamification, no island visuals — pure SaaS design.
 */
export default function Blog() {
  const [, setLocation] = useLocation();
  const { t } = useI18n();

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
              <span className="font-bold text-slate-900">{t("blog.appName")}</span>
          </button>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => setLocation("/")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-cyan-700 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("blog.back")}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        {/* Hero */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              {t("blog.badge")}
          </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              {t("blog.title")}
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
              {t("blog.subtitle")}
            </p>
        </div>

        {/* What to Expect */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 mb-8">
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-5">
              {t("blog.whatToExpect")}
            </h2>
          <div className="space-y-4">
            {[
                { icon: <Lightbulb className="h-4 w-4 text-amber-600" />, label: t("blog.item1") },
                { icon: <FileText className="h-4 w-4 text-cyan-600" />, label: t("blog.item2") },
                { icon: <BookOpen className="h-4 w-4 text-emerald-600" />, label: t("blog.item3") },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm text-slate-700">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 border border-slate-200">
                  {item.icon}
                </span>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* CTA – Get notified */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <Bell className="h-6 w-6 text-cyan-600 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-900 mb-2">{t("blog.ctaTitle")}</h2>
          <p className="text-sm text-slate-500 mb-5 max-w-md mx-auto">
            {t("blog.ctaDesc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t("blog.ctaPlaceholder")}
              disabled
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-500 placeholder:text-slate-400 cursor-not-allowed"
            />
            <button
              disabled
              className="rounded-xl bg-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-500 cursor-not-allowed"
            >
              {t("blog.ctaButton")}
            </button>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">{t("blog.ctaNote")}</p>
        </div>
      </main>
    </div>
  );
}

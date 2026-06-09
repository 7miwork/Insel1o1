import { useLocation } from "wouter";
import { GraduationCap, School, ArrowRight, Trophy, BookOpen, Shield } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { GlobalHeader } from "@/components/GlobalHeader";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [, setLocation] = useLocation();
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-white">
      <GlobalHeader
        ctaLabel={t("navigation.signIn")}
        ctaHref="/login"
      />

      {/* ── HERO ── Minimal, no animations, clean */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 md:pt-24 md:pb-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-4">
            {t("home.heroTitle")}
          </h1>
          <p className="text-lg text-slate-500 max-w-lg mx-auto leading-relaxed mb-10">
            {t("home.heroDescription")}
          </p>

          {/* ── Two Clear Entry Points ── */}
          <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto">
            <button
              onClick={() => setLocation("/student")}
              className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-amber-200 bg-amber-50/60 hover:bg-amber-50 hover:border-amber-300 px-5 py-5 text-center transition-all"
            >
              <GraduationCap className="w-6 h-6 text-amber-600" />
              <p className="font-bold text-slate-900 text-sm">Für Schüler</p>
              <p className="text-xs text-slate-500">Lernen als Abenteuer</p>
            </button>
            <button
              onClick={() => setLocation("/dashboard")}
              className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 px-5 py-5 text-center transition-all"
            >
              <School className="w-6 h-6 text-slate-500" />
              <p className="font-bold text-slate-900 text-sm">Für Schulen & Lehrer</p>
              <p className="text-xs text-slate-500">Professionelle Plattform</p>
            </button>
          </div>
        </div>
      </section>

      {/* ── Benefits (3 items, no icons beyond text) ── */}
      <section className="bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-18">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              {t("home.powerfulFeatures")}
            </h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              {t("home.featureDescription")}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: <BookOpen className="w-5 h-5 text-cyan-600" />, titleKey: "home.benefits.personalizedLearning" },
              { icon: <Trophy className="w-5 h-5 text-amber-600" />, titleKey: "home.benefits.gamification" },
              { icon: <Shield className="w-5 h-5 text-emerald-600" />, titleKey: "home.benefits.secureScalable" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <div className="mb-2">{item.icon}</div>
                <h3 className="font-semibold text-slate-900 text-sm">
                  {t(item.titleKey)}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── Simple, one row */}
      <section className="bg-white">
        <div className="max-w-md mx-auto px-4 sm:px-6 py-14 md:py-18 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
            {t("home.readyToTransform")}
          </h2>
          <p className="text-sm text-slate-500 mb-8">
            {t("home.joinThousands")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setLocation("/student")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-2.5 text-sm transition-all"
            >
              <GraduationCap className="w-4 h-4" />
              {t("common.startLearning")}
            </button>
            <button
              onClick={() => setLocation("/dashboard")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 py-2.5 text-sm transition-all"
            >
              <School className="w-4 h-4" />
              {t("navigation.signIn")}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
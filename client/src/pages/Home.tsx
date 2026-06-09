import { useLocation } from "wouter";
import {
  GraduationCap,
  School,
  ArrowRight,
  Sparkles,
  BookOpen,
} from "lucide-react";
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

      {/* ── HERO SECTION ── neutral, clean, premium */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-28 md:pb-20 text-center">
          {/* Subtle badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold tracking-wide mb-6">
            <Sparkles className="w-3.5 h-3.5 text-slate-400" />
            {t("home.tagline")}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-5">
            {t("home.heroTitle")}
          </h1>

          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
            {t("home.heroDescription")}
          </p>

          {/* ── Dual Entry ── */}
          <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            <button
              onClick={() => setLocation("/student")}
              className="group flex items-center justify-between gap-3 rounded-2xl border-2 border-amber-200 bg-amber-50 hover:bg-amber-100 hover:border-amber-300 px-6 py-5 text-left transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Für Schüler</p>
                  <p className="text-sm text-slate-500">Lerne durch ein Abenteuer</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <button
              onClick={() => setLocation("/dashboard")}
              className="group flex items-center justify-between gap-3 rounded-2xl border-2 border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 px-6 py-5 text-left transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <School className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Für Schulen & Lehrer</p>
                  <p className="text-sm text-slate-500">Professionelles Dashboard</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </section>

      {/* ── BENEFITS SECTION ── clean, minimal */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              {t("home.powerfulFeatures")}
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              {t("home.featureDescription")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "🎯", titleKey: "home.benefits.personalizedLearning" },
              { icon: "📊", titleKey: "home.benefits.realTimeTracking" },
              { icon: "🏆", titleKey: "home.benefits.gamification" },
              { icon: "🌍", titleKey: "home.benefits.multiLanguageSupport" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-100 bg-white p-5 hover:border-slate-200 hover:shadow-sm transition-all"
              >
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-slate-900 text-sm">
                  {t(item.titleKey)}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── simple, single */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            {t("home.readyToTransform")}
          </h2>
          <p className="text-slate-500 mb-8">
            {t("home.joinThousands")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setLocation("/student")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 text-sm transition-all"
            >
              <GraduationCap className="w-4 h-4" />
              {t("common.startLearning")}
            </button>
            <button
              onClick={() => setLocation("/dashboard")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold px-6 py-3 text-sm border border-slate-200 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              Zum Dashboard
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
import { useState } from "react";
import { useLocation } from "wouter";
import {
  BookOpen,
  Zap,
  Users,
  Trophy,
  ArrowRight,
  Globe,
  Sparkles,
  CheckCircle2,
  Map as MapIcon,
  PlayCircle,
  Star,
  GraduationCap,
  Compass,
  Route,
  TrendingUp,
  Home as HomeIcon,
  School,
  Award,
  Smartphone,
  Shield,
} from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { GlobalHeader } from "@/components/GlobalHeader";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [email, setEmail] = useState("");
  const [, setLocation] = useLocation();
  const { t } = useI18n();

  const features = [
    {
      icon: <Compass className="w-6 h-6" />,
      titleKey: "home.feature_adventureLearning",
      descriptionKey: "home.feature_adventureLearningDesc",
      color: "from-amber-400 to-orange-500",
    },
    {
      icon: <Route className="w-6 h-6" />,
      titleKey: "home.feature_interactivePaths",
      descriptionKey: "home.feature_interactivePathsDesc",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      titleKey: "home.feature_personalProgress",
      descriptionKey: "home.feature_personalProgressDesc",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: <HomeIcon className="w-6 h-6" />,
      titleKey: "home.feature_parentInsights",
      descriptionKey: "home.feature_parentInsightsDesc",
      color: "from-violet-500 to-purple-500",
    },
    {
      icon: <School className="w-6 h-6" />,
      titleKey: "home.feature_teacherDashboard",
      descriptionKey: "home.feature_teacherDashboardDesc",
      color: "from-rose-500 to-pink-500",
    },
    {
      icon: <Award className="w-6 h-6" />,
      titleKey: "home.feature_motivation",
      descriptionKey: "home.feature_motivationDesc",
      color: "from-fuchsia-500 to-pink-500",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      titleKey: "home.feature_learnAnywhere",
      descriptionKey: "home.feature_learnAnywhereDesc",
      color: "from-sky-500 to-indigo-500",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      titleKey: "home.feature_privacySecurity",
      descriptionKey: "home.feature_privacySecurityDesc",
      color: "from-slate-500 to-slate-600",
    },
  ];

  const stats = [
    { value: "50K+", label: t("home.activeStudents") },
    { value: "1,000+", label: t("home.courses") },
    { value: "98%", label: t("home.satisfaction") },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50">
      <GlobalHeader
        ctaLabel={t("navigation.signIn")}
        ctaHref="/login"
      />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-7 animate-fadeInUp">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              {t("home.tagline")}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.05] tracking-tight">
              {t("home.heroTitle")}
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              {t("home.heroDescription")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => setLocation("/register")}
                className="btn btn-primary btn-lg"
              >
                {t("common.startLearning")}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setLocation("/archipelago")}
                className="btn btn-accent btn-lg"
              >
                <MapIcon className="w-4 h-4" />
                {t("common.exploreArchipelagos")}
              </button>
              <button
                type="button"
                onClick={() => setLocation("/archipelago")}
                className="btn btn-outline btn-lg"
              >
                <PlayCircle className="w-4 h-4" />
                {t("common.beginAdventure")}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200/70">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <p className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-600 mt-1 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative animate-fadeInUp">
            <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-400 to-violet-400 rounded-3xl blur-3xl opacity-20" aria-hidden />
            <div className="relative card-elevated rounded-3xl p-6 sm:p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shadow-lg">
                    <BookOpen className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-900">
                      {t("home.archipelagoWelcomeTitle")}
                    </p>
                    <p className="text-sm text-slate-500">
                      {t("home.archipelagoWelcomeDesc")}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="font-semibold text-slate-700">
                        {t("home.mathKingdom")}
                      </span>
                      <span className="font-bold text-cyan-700">85%</span>
                    </div>
                    <div className="progress-track progress-track-lg" aria-hidden>
                      <div
                        className="progress-fill"
                        style={{ width: "85%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="font-semibold text-slate-700">
                        {t("home.englishLiterature")}
                      </span>
                      <span className="font-bold text-cyan-700">60%</span>
                    </div>
                    <div className="progress-track progress-track-lg" aria-hidden>
                      <div
                        className="progress-fill"
                        style={{ width: "60%" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-5 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-extrabold text-cyan-700">2,450</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      {t("home.xpEarned")}
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-teal-700">5</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      {t("home.level")}
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-orange-600">12</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      {t("home.streak")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Features */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
      >
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            {t("home.tagline")}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
            {t("home.powerfulFeatures")}
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t("home.featureDescription")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:border-slate-300 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center mb-5 shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}
              >
                {feature.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                {t(feature.titleKey)}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t(feature.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-3xl p-8 sm:p-12 lg:p-16 border border-cyan-100/50">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-8">
                {t("home.whyChooseTitle")}
              </h2>
              <ul className="space-y-3.5">
                {[
                  "home.benefits.personalizedLearning",
                  "home.benefits.realTimeTracking",
                  "home.benefits.gamification",
                  "home.benefits.multiLanguageSupport",
                  "home.benefits.teacherParentDashboards",
                  "home.benefits.secureScalable",
                ].map((key, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-slate-700 font-medium"
                  >
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                    {t(key)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div
                className="absolute -inset-4 bg-gradient-to-tr from-cyan-300 to-violet-300 rounded-3xl blur-2xl opacity-25"
                aria-hidden
              />
              <div className="relative card-elevated rounded-3xl p-7 sm:p-9">
                <div className="text-center mb-5">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 text-white shadow-md">
                    <Trophy className="w-7 h-7" />
                  </span>
                  <p className="text-slate-600 mt-3 font-semibold">
                    {t("home.trackProgress")}
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="font-semibold text-slate-700">
                        {t("home.learningConsistency")}
                      </span>
                      <span className="font-bold text-cyan-700">92%</span>
                    </div>
                    <div className="progress-track progress-track-lg" aria-hidden>
                      <div
                        className="progress-fill"
                        style={{ width: "92%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="font-semibold text-slate-700">
                        {t("home.courseCompletion")}
                      </span>
                      <span className="font-bold text-cyan-700">78%</span>
                    </div>
                    <div className="progress-track progress-track-lg" aria-hidden>
                      <div
                        className="progress-fill"
                        style={{ width: "78%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl p-10 sm:p-14 text-center bg-gradient-to-br from-cyan-600 via-cyan-700 to-teal-700 shadow-2xl">
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.2) 0%, transparent 40%)",
            }}
            aria-hidden
          />
          <div className="relative z-10 space-y-5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur text-white text-xs font-bold uppercase tracking-wider">
              <Star className="w-3.5 h-3.5" fill="currentColor" />
              {t("home.readyToTransform")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              {t("home.readyToTransform")}
            </h2>
            <p className="text-lg text-cyan-50/90 max-w-2xl mx-auto">
              {t("home.joinThousands")}
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-2"
              onSubmit={(e) => {
                e.preventDefault();
                setLocation("/register");
              }}
            >
              <input
                type="email"
                placeholder={t("home.enterEmail")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                aria-label={t("home.enterEmail")}
              />
              <button
                type="submit"
                className="btn btn-accent btn-lg shadow-xl"
              >
                <GraduationCap className="w-4 h-4" />
                {t("common.startLearning")}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

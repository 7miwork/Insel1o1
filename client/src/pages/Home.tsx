import { useLocation } from "wouter";
import { GraduationCap, School, ArrowRight, Trophy, BookOpen, Shield, BarChart3, Users, Compass, Lock, CheckCircle2, Globe } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { GlobalHeader } from "@/components/GlobalHeader";
import { Footer } from "@/components/Footer";

/* ─────────────────────────────────────────────────────────────────────
   MOCK FEATURE VISUALS (clean SaaS-style UI cards)
   ───────────────────────────────────────────────────────────────────── */

function FeatureVisualLearning() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-cyan-600" />
        </div>
        <div className="flex-1">
          <div className="h-2.5 bg-slate-200 rounded-full w-3/4 mb-1" />
          <div className="h-2 bg-slate-100 rounded-full w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        {["Math", "Science", "Language"].map((s, i) => (
          <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50">
            <div className="w-8 h-8 rounded-md bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
              {["M", "S", "L"][i]}
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold text-slate-700">{s}</div>
              <div className="mt-1 h-1.5 bg-slate-200 rounded-full">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${[75, 60, 85][i]}%` }} />
              </div>
            </div>
            <span className="text-[10px] font-bold text-slate-400">{[75, 60, 85][i]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureVisualProgress() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
            <Trophy className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <div className="h-2.5 bg-slate-200 rounded-full w-24 mb-1" />
            <div className="h-2 bg-slate-100 rounded-full w-16" />
          </div>
        </div>
        <span className="text-2xl font-bold text-slate-900">87%</span>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {[45, 72, 85, 68, 90, 30, 80].map((v, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="w-full h-16 rounded bg-slate-100 flex items-end">
              <div className={`w-full rounded ${v > 70 ? "bg-cyan-500" : v > 50 ? "bg-slate-300" : "bg-slate-200"}`} style={{ height: `${v}%` }} />
            </div>
            <span className="text-[8px] text-slate-400">{["M", "D", "M", "D", "F", "S", "S"][i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureVisualTeachers() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
          <Users className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="flex-1">
          <div className="h-2.5 bg-slate-200 rounded-full w-2/3 mb-1" />
          <div className="h-2 bg-slate-100 rounded-full w-1/3" />
        </div>
      </div>
      <div className="space-y-2">
        {[{ n: "Anna B.", g: "92%", s: "on-track" }, { n: "Lukas S.", g: "78%", s: "needs-attention" }, { n: "Mia W.", g: "95%", s: "on-track" }].map((student, i) => (
          <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-[10px] font-bold text-white">
              {student.n.split(" ").map(w => w[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-slate-700 truncate">{student.n}</div>
              <div className="text-[10px] text-slate-400">Grade: {student.g}</div>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
              student.s === "on-track" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
            }`}>
              {student.s === "on-track" ? "✓" : "!"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureVisualAnywhere() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
          <Compass className="w-4 h-4 text-violet-600" />
        </div>
        <div className="flex-1">
          <div className="h-2.5 bg-slate-200 rounded-full w-2/3 mb-1" />
          <div className="h-2 bg-slate-100 rounded-full w-1/2" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {["💻 Desktop", "📱 Tablet", "📱 Phone"].map((d, i) => (
          <div key={i} className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-center">
            <div className="text-xs text-slate-600">{d}</div>
            <div className="mt-1.5 h-1 bg-slate-200 rounded-full">
              <div className="h-full bg-violet-500 rounded-full" style={{ width: `${[95, 70, 85][i]}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   FEATURE BLOCK (alternating layout)
   ───────────────────────────────────────────────────────────────────── */

interface FeatureBlockProps {
  titleKey: string;
  descKey: string;
  visual: React.ReactNode;
  reverse?: boolean;
}

function FeatureBlock({ titleKey, descKey, visual, reverse = false }: FeatureBlockProps) {
  const { t } = useI18n();
  return (
    <div className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
          {t(titleKey)}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          {t(descKey)}
        </p>
      </div>
      {visual}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   LANDING PAGE
   ───────────────────────────────────────────────────────────────────── */

export default function Home() {
  const [, setLocation] = useLocation();
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-white">
      <GlobalHeader
        ctaLabel={t("navigation.signIn")}
        ctaHref="/login"
      />

      {/* ── HERO ── */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 md:pt-24 md:pb-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-4">
            {t("home.heroTitle")}
          </h1>
          <p className="text-lg text-slate-500 max-w-lg mx-auto leading-relaxed mb-10">
            {t("home.heroDescription")}
          </p>

          {/* Two entry points */}
          <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto">
            <button
              onClick={() => setLocation("/student")}
              className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-amber-200 bg-amber-50/60 hover:bg-amber-50 hover:border-amber-300 px-5 py-5 text-center transition-all"
            >
              <GraduationCap className="w-6 h-6 text-amber-600" />
              <p className="font-bold text-slate-900 text-sm">{t("home.heroStudentTitle")}</p>
              <p className="text-xs text-slate-500">{t("home.heroStudentSubtitle")}</p>
            </button>
            <button
              onClick={() => setLocation("/dashboard")}
              className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 px-5 py-5 text-center transition-all"
            >
              <School className="w-6 h-6 text-slate-500" />
              <p className="font-bold text-slate-900 text-sm">{t("home.heroTeacherTitle")}</p>
              <p className="text-xs text-slate-500">{t("home.heroTeacherSubtitle")}</p>
            </button>
          </div>
        </div>
      </section>

      {/* ── FEATURES SECTION ── SaaS-grade, alternating layout */}
      <section id="features" className="bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          {/* Section header */}
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              {t("home.powerfulFeatures")}
            </h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              {t("home.featureDescription")}
            </p>
          </div>

          {/* Feature 1: Learning Paths */}
          <FeatureBlock
            titleKey="home.feature_interactivePaths"
            descKey="home.feature_interactivePathsDesc"
            visual={<FeatureVisualLearning />}
          />

          {/* Feature 2: Progress Tracking */}
          <FeatureBlock
            titleKey="home.feature_personalProgress"
            descKey="home.feature_personalProgressDesc"
            visual={<FeatureVisualProgress />}
            reverse
          />

          {/* Feature 3: Teacher & Parent Dashboards */}
          <FeatureBlock
            titleKey="home.feature_teacherDashboard"
            descKey="home.feature_teacherDashboardDesc"
            visual={<FeatureVisualTeachers />}
          />

          {/* Feature 4: Learn Anywhere */}
          <FeatureBlock
            titleKey="home.feature_learnAnywhere"
            descKey="home.feature_learnAnywhereDesc"
            visual={<FeatureVisualAnywhere />}
            reverse
          />
        </div>
      </section>

      {/* ── TRUST / SECURITY SECTION ── */}
      <section id="security" className="bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          {/* Trust Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              {t("security.title")}
            </h2>
            <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
              {t("security.subtitle")}
            </p>
          </div>

          {/* Trust Principles – minimal, calm, no tech jargon */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: <Lock className="w-5 h-5 text-cyan-600" />, titleKey: "security.dataProtection", descKey: "security.dataProtectionDesc" },
              { icon: <GraduationCap className="w-5 h-5 text-amber-600" />, titleKey: "security.studentPrivacy", descKey: "security.studentPrivacyDesc" },
              { icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />, titleKey: "security.schoolCompliance", descKey: "security.schoolComplianceDesc" },
              { icon: <Globe className="w-5 h-5 text-violet-600" />, titleKey: "security.secureInfrastructure", descKey: "security.secureInfrastructureDesc" },
            ].map((item, idx) => (
              <div key={idx} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4">{item.icon}</div>
                <h3 className="font-semibold text-slate-900 text-sm mb-2">{t(item.titleKey)}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{t(item.descKey)}</p>
              </div>
            ))}
          </div>

          {/* Emergency Contacts – calm, clear, no fluff */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 mb-10">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">{t("security.emergencyTitle")}</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <p className="text-slate-600">
                  <span className="font-medium text-slate-900">Emergency (CH):</span> 144 Rescue Service
                </p>
                <p className="text-slate-600">
                  <span className="font-medium text-slate-900">Poison Control:</span> 145 (Tox Info Suisse)
                </p>
              </div>
              <div className="space-y-1.5">
                <p className="text-slate-600">
                  <span className="font-medium text-slate-900">Spital Schwyz:</span> 041 818 41 11
                </p>
                <p className="text-slate-600">
                  <span className="font-medium text-slate-900">Note:</span> Emergency practice is closed
                </p>
              </div>
            </div>
          </div>

          {/* Trust Statement */}
          <div className="text-center">
            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto">
              {t("security.trustStatement")}
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
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
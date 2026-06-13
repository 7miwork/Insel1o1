import { useLocation } from "wouter";
import { GraduationCap, School, ArrowRight } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { GlobalHeader } from "@/components/GlobalHeader";
import { Footer } from "@/components/Footer";

/* ─── FEATURE BLOCK ─── */

interface FeatureBlockProps {
  titleKey: string;
  descKey: string;
  reverse?: boolean;
}

function FeatureBlock({ titleKey, descKey, reverse = false }: FeatureBlockProps) {
  const { t } = useI18n();
  return (
    <div className={`grid md:grid-cols-2 gap-8 md:gap-12 items-start ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">{t(titleKey)}</h3>
        <p className="text-sm text-slate-500 leading-relaxed">{t(descKey)}</p>
      </div>
    </div>
  );
}

/* ─── LANDING PAGE ─── */

export default function Home() {
  const [, setLocation] = useLocation();
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-white">
      <GlobalHeader ctaLabel={t("navigation.signIn")} ctaHref="/login" />

      {/* ── HERO ── */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-20 pb-16 md:pt-28 md:pb-20 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-4">
            {t("home.heroTitle")}
          </h1>
          <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed mb-10">
            {t("home.heroDescription")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setLocation("/student")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-medium px-5 py-2.5 text-sm transition-colors"
            >
              <GraduationCap className="w-4 h-4" />
              {t("home.heroStudentTitle")}
            </button>
            <button
              onClick={() => setLocation("/dashboard")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium px-5 py-2.5 text-sm transition-colors"
            >
              <School className="w-4 h-4" />
              {t("home.heroTeacherTitle")}
            </button>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">{t("home.powerfulFeatures")}</h2>
            <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">{t("home.featureDescription")}</p>
          </div>
          <div className="space-y-10">
            <FeatureBlock titleKey="home.feature_interactivePaths" descKey="home.feature_interactivePathsDesc" />
            <FeatureBlock titleKey="home.feature_personalProgress" descKey="home.feature_personalProgressDesc" reverse />
            <FeatureBlock titleKey="home.feature_teacherDashboard" descKey="home.feature_teacherDashboardDesc" />
            <FeatureBlock titleKey="home.feature_learnAnywhere" descKey="home.feature_learnAnywhereDesc" reverse />
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section id="security" className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">{t("security.title")}</h2>
          <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed mb-10">{t("security.subtitle")}</p>
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            <div>
              <h3 className="font-medium text-slate-900 text-sm mb-1">{t("security.dataProtection")}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{t("security.dataProtectionDesc")}</p>
            </div>
            <div>
              <h3 className="font-medium text-slate-900 text-sm mb-1">{t("security.studentPrivacy")}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{t("security.studentPrivacyDesc")}</p>
            </div>
            <div>
              <h3 className="font-medium text-slate-900 text-sm mb-1">{t("security.schoolCompliance")}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{t("security.schoolComplianceDesc")}</p>
            </div>
            <div>
              <h3 className="font-medium text-slate-900 text-sm mb-1">{t("security.secureInfrastructure")}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{t("security.secureInfrastructureDesc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-slate-50">
        <div className="max-w-md mx-auto px-4 py-14 md:py-18 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">{t("home.readyToTransform")}</h2>
          <p className="text-sm text-slate-500 mb-8">{t("home.joinThousands")}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => setLocation("/student")} className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-medium px-5 py-2.5 text-sm transition-colors">
              <GraduationCap className="w-4 h-4" />
              {t("common.startLearning")}
            </button>
            <button onClick={() => setLocation("/dashboard")} className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium px-5 py-2.5 text-sm transition-colors">
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
import React from "react";
import { useLocation } from "wouter";
import { useI18n } from "@/contexts/I18nContext";
import { PRICING } from "@/data/pricing-config";
import { Compass, Check, ArrowRight } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function Pricing() {
  const { t } = useI18n();
  const [, setLocation] = useLocation();
  const p = PRICING;

  const plans = [
    {
      id: "subscription",
      name: t("pricing.plan1Name"),
      price: p.subscription.monthly,
      currency: p.subscription.currency,
      interval: t("pricing.perMonth"),
      description: t("pricing.plan1Desc"),
      popular: true,
      features: [
        { key: "interactivePlatform", included: true },
        { key: "videos", included: true },
        { key: "exercises", included: true },
        { key: "progressTracking", included: true },
        { key: "studentDashboard", included: true },
        { key: "parentDashboard", included: true },
        { key: "teacherSupport", included: true },
        { key: "allSubjects", included: true },
      ],
    },
    {
      id: "singleSubject",
      name: t("pricing.plan2Name"),
      price: p.singleSubject.monthly,
      currency: p.singleSubject.currency,
      interval: t("pricing.perMonth"),
      description: t("pricing.plan2Desc"),
      popular: false,
      features: [
        { key: "singleSubject", included: true },
        { key: "interactiveExercises", included: true },
        { key: "progressTracking", included: true },
        { key: "learningMaterials", included: true },
        { key: "parentDashboard", included: false },
        { key: "allSubjects", included: false },
        { key: "teacherSupport", included: false },
        { key: "videos", included: false },
      ],
    },
    {
      id: "island",
      name: t("pricing.plan3Name"),
      price: p.islands.price,
      currency: p.islands.currency,
      interval: t("pricing.oneTime"),
      description: t("pricing.plan3Desc"),
      popular: false,
      features: [
        { key: "singleIsland", included: true },
        { key: "islandContent", included: true },
        { key: "interactiveExercises", included: true },
        { key: "progressTracking", included: false },
        { key: "studentDashboard", included: false },
        { key: "parentDashboard", included: false },
        { key: "allSubjects", included: false },
      ],
    },
    {
      id: "privateLesson",
      name: t("pricing.plan4Name"),
      price: p.privateLesson.hourly,
      currency: p.privateLesson.currency,
      interval: t("pricing.perHour"),
      description: t("pricing.plan4Desc"),
      popular: false,
      features: [
        { key: "liveSession", included: true },
        { key: "personalizedSupport", included: true },
        { key: "directTeacher", included: true },
        { key: "flexibleScheduling", included: true },
        { key: "interactiveExercises", included: false },
        { key: "progressTracking", included: false },
        { key: "allSubjects", included: false },
      ],
    },
  ];

  const faqItems = [
    { q: "faq1", a: "faq1Answer" },
    { q: "faq2", a: "faq2Answer" },
    { q: "faq3", a: "faq3Answer" },
    { q: "faq4", a: "faq4Answer" },
    { q: "faq5", a: "faq5Answer" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => setLocation("/")} className="flex items-center gap-2 hover:opacity-80 transition">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600 text-white">
              <Compass className="h-4 w-4" />
            </span>
            <span className="font-bold text-slate-900">{t("common.appName")}</span>
          </button>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button onClick={() => setLocation("/login")} className="px-4 py-2 text-sm font-semibold text-cyan-600 hover:text-cyan-700 transition">
              {t("nav.signIn")}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            {t("pricing.title")}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t("pricing.subtitle")}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border-2 p-6 flex flex-col transition-shadow hover:shadow-lg ${
                plan.popular
                  ? "border-cyan-500 bg-white shadow-md"
                  : "border-slate-200 bg-white"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                  {t("pricing.mostPopular")}
                </span>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-1">{plan.name}</h3>
                <p className="text-sm text-slate-500 min-h-[2.5rem]">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                <span className="text-sm text-slate-500 ml-1">{plan.currency}</span>
                <span className="text-sm text-slate-500 ml-1">{plan.interval}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat.key} className="flex items-start gap-2 text-sm">
                    <span className={`mt-0.5 ${feat.included ? "text-emerald-500" : "text-slate-300"}`}>
                      <Check className="h-4 w-4" />
                    </span>
                    <span className={feat.included ? "text-slate-700" : "text-slate-400 line-through"}>
                      {t(`pricing.feature_${feat.key}`)}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setLocation("/register")}
                className={`w-full py-3 rounded-xl font-bold text-sm transition ${
                  plan.popular
                    ? "bg-cyan-600 text-white hover:bg-cyan-700 shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {t("pricing.cta")}
              </button>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">{t("pricing.comparisonTitle")}</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left px-6 py-4 font-semibold text-slate-700">{t("pricing.feature")}</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-center">{t("pricing.plan1Name")}</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-center">{t("pricing.plan2Name")}</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-center">{t("pricing.plan3Name")}</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-center">{t("pricing.plan4Name")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {plans[0].features.map((feat) => (
                  <tr key={feat.key} className="hover:bg-slate-50">
                    <td className="px-6 py-3 text-slate-700">{t(`pricing.feature_${feat.key}`)}</td>
                    {plans.map((plan) => {
                      const pf = plan.features.find((f) => f.key === feat.key);
                      return (
                        <td key={plan.id} className="px-6 py-3 text-center">
                          {pf?.included ? (
                            <Check className="h-4 w-4 text-emerald-500 mx-auto" />
                          ) : (
                            <span className="text-slate-300">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">{t("pricing.faqTitle")}</h2>
          <div className="space-y-3">
            {faqItems.map((faq, i) => (
              <details key={i} className="group rounded-xl border border-slate-200 bg-white overflow-hidden">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-semibold text-slate-900 hover:bg-slate-50 transition">
                  {t(`pricing.${faq.q}`)}
                  <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">
                  {t(`pricing.${faq.a}`)}
                </div>
              </details>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-slate-500">
          <p>{t("pricing.footer")}</p>
        </div>
      </footer>
    </div>
  );
}
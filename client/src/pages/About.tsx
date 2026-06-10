import React from "react";
import { useLocation } from "wouter";
import { useI18n } from "@/contexts/I18nContext";
import { CREW_MEMBERS } from "@/data/crew";
import { BookOpen, ArrowLeft } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

/**
 * About page for the client build (GitHub Pages).
 * Shows crew introduction, mission and vision.
 */
export default function About() {
  const { t } = useI18n();
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600 text-white">
              <BookOpen className="h-4 w-4" />
            </span>
            <span className="font-bold text-slate-900">Insel 1o1</span>
          </button>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => setLocation("/")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-cyan-700 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-8">
        {/* Intro */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-purple-800 mb-4">{t('about.intro')}</h1>
        </section>

        {/* Mission */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">{t('about.missionTitle')}</h2>
          <p className="text-gray-700">{t('about.missionContent')}</p>
        </section>

        {/* Vision */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-green-700 mb-2">{t('about.visionTitle')}</h2>
          <p className="text-gray-700">{t('about.visionContent')}</p>
        </section>

        {/* Crew Cards */}
        <section>
          <h2 className="text-2xl font-semibold text-orange-700 mb-6 text-center">{t('about.crewSectionTitle')}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CREW_MEMBERS.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                <div className="text-5xl mb-4" aria-hidden="true">{member.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t(member.roleKey)}</h3>
                <p className="text-gray-600">{t(member.descriptionKey)}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
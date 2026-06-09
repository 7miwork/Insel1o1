import React from "react";
import { useI18n } from "@/contexts/I18nContext";
import { CREW_MEMBERS } from "@/data/crew";

/**
 * About page for the client build (GitHub Pages).
 * Shows crew introduction, mission and vision.
 */
export default function About() {
  const { t } = useI18n();

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
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
              {/* Placeholder for icon – using the icon name as text */}
              <div className="text-5xl mb-4" aria-hidden="true">{member.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t(member.roleKey)}</h3>
              <p className="text-gray-600">{t(member.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

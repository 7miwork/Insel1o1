import React from 'react';
import { usei18n } from '@/contexts/i18nContext';
import { crew, CrewMember } from '@/data/crew';

/**
 * About page – crew introduction for the Insel1o1 platform.
 * All visible strings are fetched via the translation system using keys.
 * The page follows the existing design system: card‑based layout, responsive grid,
 * and pirate / island theming using emojis.
 */
export default function AboutPage() {
  const { t } = usei18n();

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
        <h2 className="text-2xl font-semibold text-orange-700 mb-6 text-center">{t('crewSectionTitle')}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {crew.map((member: CrewMember) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
            >
              <div className="text-5xl mb-4" aria-hidden="true">
                {member.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t(member.titleKey)}</h3>
              <p className="text-gray-600">{t(member.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

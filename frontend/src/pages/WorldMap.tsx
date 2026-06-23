import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameLayout from '@/components/gamified/GameLayout';
import { usei18n } from '@/contexts/i18nContext';
import { codingSubject, futureSubjects } from '@/data/hierarchy';
import type { FutureSubject } from '@/data/hierarchy';

/**
 * Level 3 — Subject World Map
 *
 * Displays all subjects as regions on the world map.
 * Coding is active and clickable.
 * Future subjects are shown inside fog with "Coming Soon".
 */
export default function WorldMapPage() {
  const { t } = usei18n();
  const navigate = useNavigate();

  const handleSubjectClick = (slug: string) => {
    navigate(`/archipelago?subject=${slug}`);
  };

  return (
    <GameLayout xp={2450} level={5} streak={12}>
      <div className="relative overflow-hidden rounded-3xl border border-[#b8ddd5]/60 bg-[#fafdfc]/80 px-5 py-8 shadow-[0_2px_20px_rgba(13,148,136,0.05)] backdrop-blur-sm md:px-10 md:py-12">
        {/* Ocean decorative elements */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <svg className="h-full w-full" aria-hidden="true">
            <defs>
              <pattern id="wave-pattern" x="0" y="0" width="120" height="24" patternUnits="userSpaceOnUse">
                <path d="M0,12 Q30,0 60,12 Q90,24 120,12" stroke="#5eead4" strokeWidth="1" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wave-pattern)" />
          </svg>
        </div>

        {/* Decorative elements */}
        <img src="/assets/images/islands/backgrounds/compass.svg" alt="" className="decor-float pointer-events-none absolute right-6 top-6 h-16 w-16 opacity-30 md:h-20 md:w-20" />
        <img src="/assets/images/islands/backgrounds/clouds.svg" alt="" className="decor-drift pointer-events-none absolute left-6 top-4 h-10 w-44 opacity-30" />
        <img src="/assets/images/islands/backgrounds/clouds.svg" alt="" className="pointer-events-none absolute right-24 top-10 h-8 w-40 opacity-25" />

        {/* Header */}
        <div className="relative mb-12 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#7aaba6]">
            Your Learning Journey
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-[#1a4a48] md:text-5xl">
            World of Islands
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#4a7a78] md:text-lg">
            A vast archipelago of knowledge awaits. Choose your subject and begin your adventure across the islands
            of learning.
          </p>
          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-[#5eead4] via-[#8fc5bc] to-[#e8d3a2]" />
        </div>

        {/* Active Subject: Coding */}
        <div className="relative mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#b8ddd5]/70 bg-white/80 text-lg shadow-sm">
              🏝️
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#1a4a48]">Available Now</h2>
              <p className="text-sm text-[#5a8a87]">Choose a subject to explore</p>
            </div>
          </div>

          <button
            onClick={() => handleSubjectClick(codingSubject.slug)}
            className="group relative w-full overflow-hidden rounded-2xl border-2 border-[#8fd6ce] bg-gradient-to-br from-[#f2fbfa] to-white p-6 text-left shadow-[0_2px_12px_rgba(13,148,136,0.10)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg md:p-8"
          >
            <div className="pointer-events-none absolute inset-0 opacity-10">
              <svg className="h-full w-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <path d="M50,180 Q100,140 180,160 Q260,180 320,140 Q360,110 400,130 L400,200 L0,200 Z" fill={codingSubject.colorPalette.accent} />
              </svg>
            </div>
            <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{codingSubject.icon}</span>
                <div>
                  <h3 className="text-xl font-bold text-[#1a4a48] sm:text-2xl">{codingSubject.title}</h3>
                  <p className="mt-1 text-sm text-[#5a8a87]">{codingSubject.description}</p>
                  <p className="mt-1 text-xs font-medium text-[#0d9488]">
                    {codingSubject.courses.length} courses available
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className="text-sm font-medium text-[#0d9488]">Explore</span>
                <span className="text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
              </div>
            </div>
          </button>
        </div>

        {/* Future Subjects (Coming Soon in fog) */}
        <div className="relative">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white/50 text-lg shadow-sm">
              🔮
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#6a8a88]">Coming Soon</h2>
              <p className="text-sm text-[#8a9e9d]">New worlds are being discovered</p>
            </div>
          </div>

          {/* Fog overlay container */}
          <div className="relative overflow-hidden rounded-2xl border border-[#d0dce0] bg-gradient-to-br from-[#f0f4f4]/90 to-[#e0eaea]/80 backdrop-blur-[1px]">
            {/* Fog gradient at the top */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/40" />

            {/* Subtle fog wave pattern */}
            <div className="pointer-events-none absolute inset-0 opacity-15">
              <svg className="h-full w-full" aria-hidden="true">
                <defs>
                  <pattern id="fog-pattern" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
                    <path d="M0,10 Q25,0 50,10 Q75,20 100,10" stroke="#94a3b8" strokeWidth="1" fill="none" opacity="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#fog-pattern)" />
              </svg>
            </div>

            <div className="relative z-10 grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:p-6">
              {futureSubjects.map((subject: FutureSubject) => (
                <div
                  key={subject.id}
                  className="relative flex items-center gap-4 rounded-xl border border-[#dce4e4] bg-white/60 px-5 py-4 opacity-70 select-none"
                >
                  <span className="text-2xl opacity-50">{subject.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-[#6a8a88]">{subject.title}</h3>
                    <p className="text-xs text-[#8a9e9d]">{subject.description}</p>
                  </div>
                  <span className="rounded-full border border-[#d0dcda] bg-[#e8f0ee]/60 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#8a9e9d]">
                    Coming Soon
                  </span>
                </div>
              ))}
            </div>

            {/* Fog overlay bottom */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_30px_rgba(148,163,184,0.12)]" />
          </div>
        </div>

        {/* Bottom decorative elements */}
        <div className="relative mt-8 flex items-center justify-center gap-4">
          <img src="/assets/images/islands/backgrounds/rocks.svg" alt="" className="decor-float h-7 opacity-40" />
          <p className="text-xs italic text-[#7aaba6]/80">Chart your own course</p>
          <img src="/assets/images/islands/backgrounds/boat.svg" alt="" className="decor-float h-7 opacity-40" style={{ animationDelay: '1.5s' }} />
        </div>
      </div>
    </GameLayout>
  );
}
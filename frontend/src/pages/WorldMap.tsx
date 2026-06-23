import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameLayout from '@/components/gamified/GameLayout';
import { usei18n } from '@/contexts/i18nContext';
import { codingSubject, futureSubjects } from '@/data/hierarchy';
import type { FutureSubject } from '@/data/hierarchy';

/**
 * Level 3 — Subject World Map
 *
 * A visually immersive world map showing all subject regions.
 * Coding appears as a large, clickable island region.
 * Future subjects sit in the foggy distance marked "Coming Soon".
 */
export default function WorldMapPage() {
  const { t } = usei18n();
  const navigate = useNavigate();

  return (
    <GameLayout xp={2450} level={5} streak={12}>
      {/* ── World map container ── */}
      <div className="relative overflow-hidden rounded-3xl border border-[#b8ddd5]/50 bg-gradient-to-b from-[#d4ece8] via-[#bce0d9] to-[#8fc5bc] shadow-[0_2px_30px_rgba(13,148,136,0.08)]">
        {/* Ocean wave pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-25">
          <svg className="h-full w-full" aria-hidden="true">
            <defs>
              <pattern id="world-ocean" x="0" y="0" width="140" height="28" patternUnits="userSpaceOnUse">
                <path d="M0,14 Q35,0 70,14 Q105,28 140,14" stroke="#5eead4" strokeWidth="1.5" fill="none" opacity="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#world-ocean)" />
          </svg>
        </div>

        {/* Deep water gradient at bottom */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#5faebb]/30 to-transparent" />

        {/* Decorative elements */}
        <img
          src="/assets/images/islands/backgrounds/compass.svg"
          alt=""
          className="decor-float pointer-events-none absolute right-8 top-8 h-20 w-20 opacity-25 md:h-24 md:w-24"
        />
        <img
          src="/assets/images/islands/backgrounds/clouds.svg"
          alt=""
          className="decor-drift pointer-events-none absolute left-8 top-6 h-12 w-52 opacity-25"
        />
        <img
          src="/assets/images/islands/backgrounds/clouds.svg"
          alt=""
          className="pointer-events-none absolute right-32 top-14 h-10 w-40 opacity-20"
        />
        <img
          src="/assets/images/islands/backgrounds/boat.svg"
          alt=""
          className="decor-float pointer-events-none absolute bottom-16 left-12 h-10 opacity-35"
          style={{ animationDelay: '1.5s' }}
        />

        {/* ── Header ── */}
        <div className="relative z-10 px-6 pb-6 pt-10 text-center md:px-10 md:pt-14">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#4a8a87]">
            Your Learning Journey
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-[#0d3d3b] md:text-5xl">
            World of Islands
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#3d7a78] md:text-base">
            A vast archipelago of knowledge awaits. Explore the regions below and begin your adventure.
          </p>
          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-[#5eead4] via-[#8fc5bc] to-[#e8d3a2]" />
        </div>

        {/* ── Map Area ── */}
        <div className="relative z-10 px-6 pb-12 md:px-10 md:pb-16">
          {/* === CODING — Active Region (large, prominent) === */}
          <div className="mb-10">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#2d7a6b]">Available Now</span>
            </div>

            <button
              onClick={() => navigate(`/archipelago?subject=${codingSubject.slug}`)}
              className="group relative w-full overflow-hidden rounded-2xl border-2 border-[#5eead4]/60 bg-gradient-to-br from-[#ecfdf7] via-[#f0fdfb] to-[#d6f5ef] text-left shadow-[0_4px_24px_rgba(13,148,136,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(13,148,136,0.18)] focus:outline-none focus:ring-2 focus:ring-teal-400/50"
            >
              {/* Island backdrop SVG — a large organic island shape */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <svg
                  className="h-full w-full"
                  viewBox="0 0 800 340"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden="true"
                >
                  {/* Island blob */}
                  <path
                    d="M80,280 C40,240 50,180 90,150 C130,120 180,100 240,110 C300,120 350,105 410,115 C470,125 530,110 580,130 C630,150 680,145 720,170 C760,195 770,240 740,270 C710,300 660,310 600,315 C540,320 470,310 400,305 C330,300 260,310 200,305 C140,300 100,295 80,280Z"
                    fill={codingSubject.colorPalette.sand}
                    fillOpacity={0.15}
                  />
                  {/* Inner green terrain */}
                  <path
                    d="M120,260 C95,225 110,180 145,160 C180,140 220,130 270,135 C320,140 370,130 420,138 C470,146 520,135 560,152 C600,169 640,168 670,186 C700,204 705,238 685,256 C665,274 625,280 580,282 C535,284 480,278 420,276 C360,274 300,278 250,276 C200,274 140,270 120,260Z"
                    fill={codingSubject.colorPalette.accent}
                    fillOpacity={0.12}
                  />
                  {/* Shadow underneath */}
                  <ellipse cx="400" cy="295" rx="350" ry="18" fill={codingSubject.colorPalette.water} fillOpacity={0.15} />
                </svg>
              </div>

              <div className="relative z-10 flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-8">
                {/* Left: icon + info */}
                <div className="flex items-start gap-5">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl border border-[#b8ddd5]/60 bg-white/80 text-3xl shadow-sm md:h-20 md:w-20 md:text-4xl">
                    {codingSubject.icon}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-2xl font-bold text-[#0d3d3b] md:text-3xl">{codingSubject.title}</h2>
                    <p className="mt-1 text-sm leading-relaxed text-[#4a7a78]">{codingSubject.description}</p>
                    <p className="mt-2 text-xs font-medium text-emerald-600">
                      {codingSubject.courses.length} courses · Begin your programming adventure
                    </p>
                  </div>
                </div>

                {/* Right: badge + arrow */}
                <div className="flex flex-shrink-0 items-center gap-3 self-end md:self-center">
                  <span className="rounded-full border border-[#5eead4]/50 bg-[#d6f5ef] px-3 py-1 text-xs font-semibold text-teal-700">
                    Explore →
                  </span>
                </div>
              </div>

              {/* Progress strip at bottom */}
              <div className="relative z-10 h-1.5 w-full bg-[#e8f0ef]/70">
                <div
                  className="h-1.5 rounded-r-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-500"
                  style={{ width: `${Math.round(
                    codingSubject.courses.reduce((s, c) => s + c.progress, 0) /
                      codingSubject.courses.length
                  )}%` }}
                />
              </div>
            </button>
          </div>

          {/* === FUTURE REGIONS — Coming Soon in the fog === */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-slate-300" />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6a8a88]">Discovering New Worlds</span>
            </div>

            {/* Fog container — mimics distant archipelago in mist */}
            <div className="relative overflow-hidden rounded-2xl border border-[#c5d8d5]/60 bg-gradient-to-b from-[#e2efed]/80 via-[#dae8e5]/70 to-[#ccdfdb]/80 backdrop-blur-[2px]">
              {/* Fog overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/20" />

              {/* Fog wave pattern */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
                <svg className="h-full w-full" aria-hidden="true">
                  <defs>
                    <pattern id="fog-waves" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
                      <path d="M0,10 Q25,2 50,10 Q75,18 100,10" stroke="#94a3b8" strokeWidth="1.2" fill="none" opacity="0.6"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#fog-waves)" />
                </svg>
              </div>

              {/* Mist particles */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[10%] top-[15%] h-24 w-48 rounded-full bg-white/40 blur-3xl" />
                <div className="absolute right-[20%] bottom-[10%] h-32 w-40 rounded-full bg-white/30 blur-3xl" />
                <div className="absolute left-[40%] top-[40%] h-20 w-36 rounded-full bg-white/35 blur-3xl" />
              </div>

              <div className="relative z-10 grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 md:p-5">
                {futureSubjects.map((subject) => (
                  <div
                    key={subject.id}
                    className="relative flex items-center gap-3 rounded-xl border border-[#c5d8d5]/50 bg-white/50 px-4 py-3.5 opacity-60 select-none backdrop-blur-sm"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#c5d8d5]/40 bg-white/60 text-lg opacity-60">
                      {subject.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-[#5a7a78]">{subject.title}</h3>
                      <p className="text-xs text-[#7a9a98] truncate">{subject.description}</p>
                    </div>
                    <span className="flex-shrink-0 rounded-full border border-[#c5d8d5]/40 bg-white/60 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#7a9a98]">
                      Coming Soon
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom rocks decoration */}
        <div className="relative z-10 flex items-center justify-center gap-4 pb-8">
          <img src="/assets/images/islands/backgrounds/rocks.svg" alt="" className="decor-float h-6 opacity-30" />
          <p className="text-xs italic text-[#5a8a87]/60">Chart your own course</p>
          <img src="/assets/images/islands/backgrounds/rocks.svg" alt="" className="decor-float h-6 opacity-30" style={{ animationDelay: '0.8s' }} />
        </div>

        {/* Bottom edge curve */}
        <div className="pointer-events-none relative z-10 h-6 bg-gradient-to-t from-[#8fc5bc]/40 to-transparent" />
      </div>
    </GameLayout>
  );
}
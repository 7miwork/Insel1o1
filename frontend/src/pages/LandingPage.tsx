import React, { useState } from 'react';
import { usei18n } from '@/contexts/i18nContext';
import { useNavigate } from 'react-router-dom';
import { features } from '@/data/features';
import { codingSubject, futureSubjects } from '@/data/hierarchy';
import type { FutureSubject } from '@/data/hierarchy';

/**
 * Public Landing Page (showcase for visitors).
 *
 * Includes a World Map preview section that visually shows
 * subject regions. Clicking any subject shows a friendly
 * preview card instead of navigating deeper — visitors
 * cannot access courses or lessons.
 */
export default function LandingPage() {
  const { t } = usei18n();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e8f4f2] via-[#cfe8e3] to-[#6bb7c9]">
      {/* ───── SECTION 1: HERO ───── */}
      <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#e8f4f2] via-[#cfe8e3] to-[#6bb7c9]">
        <div className="relative z-10 flex flex-col items-center px-6 py-24 text-center">
          <svg width="40" height="40" viewBox="0 0 80 80" fill="none" className="mb-6 opacity-75">
            <circle cx="40" cy="40" r="36" stroke="#d4a574" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            <polygon points="40,12 48,38 40,46 32,38" fill="#d4a574" />
          </svg>
          <h1 className="text-4xl font-bold leading-tight text-[#1a4a48] sm:text-5xl md:text-7xl">
            <span className="block">{t('landing.hero.title1')}</span>
            <span className="block text-[#d4a574]">{t('landing.hero.title2')}</span>
          </h1>
          <p className="mt-5 max-w-lg text-base text-[#4a7a78] sm:text-lg">
            {t('landing.hero.subtitle')}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={() => navigate('/register')}
              className="w-full rounded-xl bg-[#0d9488] px-8 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-[#115e59] hover:shadow-md sm:w-auto"
            >
              ⛵ {t('landing.hero.cta')}
            </button>
            <button
              onClick={() => navigate('/login')}
              className="w-full rounded-xl border border-[#b8ddd5]/80 bg-white/70 px-8 py-3 text-base font-medium text-[#2a5a58] transition-all hover:bg-white hover:border-[#8fc5bc] sm:w-auto"
            >
              {t('landing.hero.login')}
            </button>
          </div>
        </div>
      </section>

      {/* ───── SECTION 2: WORLD MAP PREVIEW (Public showcase) ───── */}
      <section className="bg-[#fafdfc] py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-[#1a4a48] sm:text-3xl md:text-4xl">Explore the World of Islands</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-[#5a8a87] sm:text-base">
              A vast archipelago of knowledge awaits. Choose a subject to preview — then log in to begin your adventure.
            </p>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[#5eead4] via-[#8fc5bc] to-[#e8d3a2]" />
          </div>

          {/* World Map Preview */}
          <div className="relative rounded-3xl border border-[#b8ddd5]/50 bg-gradient-to-b from-[#d4ece8] via-[#bce0d9] to-[#8fc5bc] shadow-[0_2px_30px_rgba(13,148,136,0.08)]">
            {/* Ocean wave pattern */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-20">
              <svg className="h-full w-full" aria-hidden="true">
                <defs>
                  <pattern id="public-ocean" x="0" y="0" width="140" height="28" patternUnits="userSpaceOnUse">
                    <path d="M0,14 Q35,0 70,14 Q105,28 140,14" stroke="#5eead4" strokeWidth="1.5" fill="none" opacity="0.6" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#public-ocean)" />
              </svg>
            </div>

            {/* Decorative elements — hidden on small screens to avoid overlap */}
            <img
              src="/assets/images/islands/backgrounds/clouds.svg"
              alt=""
              className="decor-drift pointer-events-none absolute left-6 top-4 h-10 w-44 opacity-25 max-md:hidden"
            />
            <img
              src="/assets/images/islands/backgrounds/compass.svg"
              alt=""
              className="decor-float pointer-events-none absolute right-6 top-6 h-16 w-16 opacity-25 max-md:hidden"
            />

            <div className="relative z-10 px-4 pb-8 pt-6 sm:px-6 sm:pb-10 sm:pt-8 md:px-8 md:pb-10 md:pt-8">
              {/* Map header */}
              <div className="mb-6 text-center">
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-[#4a8a87]">
                  Your Learning Journey
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-[#0d3d3b] sm:text-3xl md:text-4xl">
                  World of Islands
                </h2>
                <div className="mx-auto mt-3 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#5eead4] via-[#8fc5bc] to-[#e8d3a2]" />
              </div>

              {/* === CODING — Active region (public preview) === */}
              <div className="mb-6 md:mb-8">
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#2d7a6b]">Available Now</span>
                </div>

                <div className="group relative w-full rounded-2xl border-2 border-[#5eead4]/60 bg-gradient-to-br from-[#ecfdf7] via-[#f0fdfb] to-[#d6f5ef] text-left shadow-[0_4px_24px_rgba(13,148,136,0.12)]">
                  {/* Island backdrop SVG */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                    <svg className="h-full w-full" viewBox="0 0 800 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                      <path
                        d="M80,250 C40,210 50,160 90,135 C130,110 180,95 240,100 C300,105 350,95 410,100 C470,105 530,95 580,110 C630,125 680,125 720,145 C760,165 770,205 740,235 C710,265 660,270 600,275 C540,280 470,270 400,265 C330,260 260,270 200,265 C140,260 100,255 80,250Z"
                        fill={codingSubject.colorPalette.sand}
                        fillOpacity={0.15}
                      />
                      <path
                        d="M120,225 C95,195 110,155 145,138 C180,121 220,115 270,118 C320,121 370,112 420,118 C470,124 520,115 560,130 C600,145 640,145 670,160 C700,175 705,205 685,220 C665,235 625,240 580,242 C535,244 480,238 420,236 C360,234 300,238 250,236 C200,234 140,230 120,225Z"
                        fill={codingSubject.colorPalette.accent}
                        fillOpacity={0.12}
                      />
                    </svg>
                  </div>

                  <div className="relative z-10 flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5 md:p-6">
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-[#b8ddd5]/60 bg-white/80 text-2xl shadow-sm sm:h-14 sm:w-14 sm:text-3xl">
                        {codingSubject.icon}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold text-[#0d3d3b] sm:text-xl">{codingSubject.title}</h3>
                        <p className="mt-0.5 text-xs leading-relaxed text-[#4a7a78] sm:text-sm">{codingSubject.description}</p>
                        <p className="mt-1 text-[10px] font-medium text-emerald-600 sm:text-xs">
                          {codingSubject.courses.length} courses · Begin your programming adventure
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 sm:ml-auto">
                      <button
                        onClick={() => navigate('/register')}
                        className="w-full rounded-full border border-[#5eead4]/50 bg-white px-4 py-1.5 text-xs font-semibold text-teal-700 transition-all hover:bg-[#d6f5ef] hover:shadow-sm sm:w-auto"
                      >
                        Sign up to explore →
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* === FUTURE REGIONS — Coming Soon in fog === */}
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-300" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6a8a88]">Discovering New Worlds</span>
                </div>

                <div className="relative rounded-2xl border border-[#c5d8d5]/60 bg-gradient-to-b from-[#e2efed]/80 via-[#dae8e5]/70 to-[#ccdfdb]/80 backdrop-blur-[2px]">
                  {/* Fog overlay */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/30 via-transparent to-white/20" />

                  {/* Fog wave pattern */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.12]">
                    <svg className="h-full w-full" aria-hidden="true">
                      <defs>
                        <pattern id="public-fog" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
                          <path d="M0,10 Q25,2 50,10 Q75,18 100,10" stroke="#94a3b8" strokeWidth="1.2" fill="none" opacity="0.6" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#public-fog)" />
                    </svg>
                  </div>

                  {/* Mist particles */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
                    <div className="absolute -left-4 -top-4 h-24 w-48 rounded-full bg-white/40 blur-3xl" />
                    <div className="absolute -right-4 -bottom-4 h-32 w-40 rounded-full bg-white/30 blur-3xl" />
                  </div>

                  <div className="relative z-10 grid grid-cols-1 gap-2 p-3 sm:grid-cols-2 sm:gap-3 sm:p-4 md:p-5">
                    {futureSubjects.map((subject) => (
                      <div
                        key={subject.id}
                        className="flex items-center gap-2 rounded-xl border border-[#c5d8d5]/50 bg-white/50 px-3 py-2.5 opacity-60 select-none backdrop-blur-sm sm:gap-3 sm:px-4 sm:py-3"
                      >
                        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-[#c5d8d5]/40 bg-white/60 text-base opacity-60 sm:h-8 sm:w-8 sm:text-lg">
                          {subject.icon}
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-xs font-semibold text-[#5a7a78] sm:text-sm">{subject.title}</h3>
                          <p className="text-[10px] text-[#7a9a98] truncate sm:text-xs">{subject.description}</p>
                        </div>
                        <span className="flex-shrink-0 rounded-full border border-[#c5d8d5]/40 bg-white/60 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-[#7a9a98] sm:text-[9px]">
                          Coming Soon
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-[#7a9a98] sm:text-sm">
            Log in to explore courses, track progress, and continue your adventure.
          </p>
        </div>
      </section>

      {/* ───── SECTION 3: ARCHIPELAGO ───── */}
      <section className="bg-[#f5faf9] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-[#1a4a48] sm:text-3xl md:text-4xl">{t('landing.arc2.title')}</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-[#5a8a87] sm:text-base">{t('landing.arc2.subtitle')}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-6">
            {[
              { key: 'island1', emoji: '🏝️', desc: t('landing.arc2.island1') },
              { key: 'island2', emoji: '🗣️', desc: t('landing.arc2.island2') },
              { key: 'island3', emoji: '🔬', desc: t('landing.arc2.island3') },
              { key: 'island4', emoji: '📜', desc: t('landing.arc2.island4') },
              { key: 'island5', emoji: '🎨', desc: t('landing.arc2.island5') },
              { key: 'island6', emoji: '💎', desc: t('landing.arc2.island6') },
            ].map((item) => (
              <div
                key={item.key}
                className="rounded-2xl border border-[#b8ddd5]/60 bg-white/80 p-4 transition-all hover:bg-white hover:shadow-sm md:p-5"
              >
                <div className="mb-1 text-xl md:text-2xl">{item.emoji}</div>
                <h3 className="text-sm font-semibold text-[#1a4a48] sm:text-base">{item.desc}</h3>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-xs italic text-[#8a9e9d] sm:text-sm">{t('landing.arc2.desc2')}</p>
        </div>
      </section>

      {/* ───── SECTION 4: BENEFITS ───── */}
      <section className="bg-[#fafdfc] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-[#1a4a48] sm:text-3xl md:text-4xl">{t('landing.features.title')}</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-[#5a8a87] sm:text-base">{t('landing.features.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {features.map((item) => (
              <div
                key={item.key}
                className="overflow-hidden rounded-2xl border border-[#b8ddd5]/60 bg-white/80 p-5 shadow-sm transition-all hover:shadow-md md:p-6"
              >
                <div className="mb-2 text-xl">{item.icon}</div>
                <h3 className="text-base font-semibold text-[#1a4a48] sm:text-lg">{t(`landing.features.${item.key}Title`)}</h3>
                <p className="mt-1 text-xs leading-relaxed text-[#5a8a87] sm:text-sm">{t(`landing.features.${item.key}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── SECTION 5: CTA ───── */}
      <section className="bg-[#1a4a48] py-16 md:py-24">
        <div className="mx-auto max-w-xl px-6 text-center">
          <svg width="32" height="32" viewBox="0 0 80 80" fill="none" className="mx-auto mb-5 opacity-60">
            <circle cx="40" cy="40" r="36" stroke="#e8d3a2" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            <polygon points="40,12 48,38 40,46 32,38" fill="#e8d3a2" />
          </svg>
          <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">{t('landing.cta.title')}</h2>
          <p className="mt-2 text-sm text-white/60 sm:text-base">{t('landing.cta.subtitle')}</p>
          <button
            onClick={() => navigate('/register')}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#e8d3a2] px-8 py-3 text-base font-semibold text-[#1a4a48] transition-all hover:bg-[#d4b88c] hover:shadow-md"
          >
            ⛵ {t('landing.cta.button')}
          </button>
          <p className="mt-3 text-xs text-white/40 sm:text-sm">
            <button onClick={() => navigate('/login')} className="transition-colors hover:text-white/60">
              {t('landing.cta.login')}
            </button>
          </p>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="border-t border-[#b8ddd5]/50 bg-[#fafdfc] py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="19" fill="#1a4a48" stroke="#e8d3a2" strokeWidth="1.5" />
                <path d="M20 6 C20 6 14 18 14 22 C14 26 16.5 30 20 30 C23.5 30 26 26 26 22 C26 18 20 6 20 6Z" fill="#e8d3a2" />
              </svg>
              <span className="font-semibold text-[#1a4a48]">Insel 1o1</span>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/login')} className="transition-colors hover:text-[#2a5a58]">
                {t('common.login')}
              </button>
              <button onClick={() => navigate('/register')} className="transition-colors hover:text-[#2a5a58]">
                {t('common.register')}
              </button>
              <button onClick={() => navigate('/about')} className="transition-colors hover:text-[#2a5a58]">
                {t('navigation.about')}
              </button>
            </div>
          </div>
          <div className="mt-4 border-t border-[#b8ddd5]/50 pt-4 text-center">
            <p className="text-xs text-[#8a9e9d]">{t('landing.footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
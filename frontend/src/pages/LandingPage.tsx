'use client';

import React from 'react';
import { usei18n } from '@/contexts/i18nContext';
import { useNavigate } from 'react-router-dom';
import { features } from '@/data/features';

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

      {/* ───── SECTION 2: ARCHIPELAGO ───── */}
      <section className="bg-[#fafdfc] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-[#1a4a48] sm:text-4xl md:text-5xl">{t('landing.arc2.title')}</h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-[#5a8a87] md:text-lg">{t('landing.arc2.subtitle')}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
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
                className="rounded-2xl border border-[#b8ddd5]/60 bg-white/80 p-5 transition-all hover:bg-white hover:shadow-sm md:p-6"
              >
                <div className="mb-2 text-2xl md:text-3xl">{item.emoji}</div>
                <h3 className="text-base font-semibold text-[#1a4a48]">{item.desc}</h3>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm italic text-[#8a9e9d]">{t('landing.arc2.desc2')}</p>
        </div>
      </section>

      {/* ───── SECTION 3: BENEFITS ───── */}
      <section className="bg-[#f5faf9] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-[#1a4a48] sm:text-4xl md:text-5xl">{t('landing.features.title')}</h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-[#5a8a87] md:text-lg">{t('landing.features.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {features.map((item) => (
              <div
                key={item.key}
                className="overflow-hidden rounded-2xl border border-[#b8ddd5]/60 bg-white/80 p-6 shadow-sm transition-all hover:shadow-md md:p-8"
              >
                <div className="mb-3 text-2xl">{item.icon}</div>
                <h3 className="text-lg font-semibold text-[#1a4a48]">{t(`landing.features.${item.key}Title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5a8a87]">{t(`landing.features.${item.key}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── SECTION 4: CTA ───── */}
      <section className="bg-[#1a4a48] py-20 md:py-28">
        <div className="mx-auto max-w-xl px-6 text-center">
          <svg width="32" height="32" viewBox="0 0 80 80" fill="none" className="mx-auto mb-5 opacity-60">
            <circle cx="40" cy="40" r="36" stroke="#e8d3a2" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            <polygon points="40,12 48,38 40,46 32,38" fill="#e8d3a2" />
          </svg>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">{t('landing.cta.title')}</h2>
          <p className="mt-3 text-base text-white/60">{t('landing.cta.subtitle')}</p>
          <button
            onClick={() => navigate('/register')}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#e8d3a2] px-8 py-3 text-base font-semibold text-[#1a4a48] transition-all hover:bg-[#d4b88c] hover:shadow-md"
          >
            ⛵ {t('landing.cta.button')}
          </button>
          <p className="mt-4 text-sm text-white/40">
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
          <div className="mt-6 border-t border-[#b8ddd5]/50 pt-4 text-center">
            <p className="text-xs text-[#8a9e9d]">{t('landing.footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
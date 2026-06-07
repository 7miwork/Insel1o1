'use client';

import React from 'react';
import { usei18n } from '@/contexts/i18nContext';
import { useNavigate } from 'react-router-dom';
import { features } from '@/data/features';

// ──────────────── SIMPLIFIED LANDING PAGE ────────────────
// Clean, professional, minimal.
// Adventure as subtle theme, not as game UI.

export default function LandingPage() {
  const { t } = usei18n();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a3a5a]">
      {/* ───── SECTION 1: HERO ───── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a4a7a] via-[#1a6ba0] to-[#0d4a6a]">
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl mx-auto">
          {/* Subtle compass icon */}
          <svg width="36" height="36" viewBox="0 0 80 80" fill="none" className="mb-5 opacity-60">
            <circle cx="40" cy="40" r="36" stroke="#f5d742" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            <polygon points="40,12 48,38 40,46 32,38" fill="#f5d742" />
          </svg>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight mb-4">
            <span className="block">{t('landing.hero.title1')}</span>
            <span className="block text-[#f5d742]">{t('landing.hero.title2')}</span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg max-w-lg mb-8">
            {t('landing.hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button onClick={() => navigate('/register')}
              className="w-full sm:w-auto bg-[#f5d742] hover:bg-[#e8c830] text-[#0a2a4a] font-semibold px-8 py-3 rounded-xl text-base transition-all">
              ⛵ {t('landing.hero.cta')}
            </button>
            <button onClick={() => navigate('/login')}
              className="w-full sm:w-auto text-white/70 hover:text-white px-8 py-3 rounded-xl text-base transition-all border border-white/20 hover:border-white/40">
              {t('landing.hero.login')}
            </button>
          </div>
        </div>
      </section>

      {/* ───── SECTION 2: ARCHIPELAGO ───── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a4a7a] mb-3">
              {t('landing.arc2.title')}
            </h2>
            <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">
              {t('landing.arc2.subtitle')}
            </p>
          </div>

          {/* Clean island grid – 2 columns on mobile, 3 on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { key: 'island1', emoji: '🏝️', desc: t('landing.arc2.island1') },
              { key: 'island2', emoji: '🗣️', desc: t('landing.arc2.island2') },
              { key: 'island3', emoji: '🔬', desc: t('landing.arc2.island3') },
              { key: 'island4', emoji: '📜', desc: t('landing.arc2.island4') },
              { key: 'island5', emoji: '🎨', desc: t('landing.arc2.island5') },
              { key: 'island6', emoji: '💎', desc: t('landing.arc2.island6') },
            ].map((item) => (
              <div key={item.key} className="bg-gray-50 hover:bg-gray-100 rounded-2xl p-5 md:p-6 transition-colors border border-gray-100">
                <div className="text-2xl md:text-3xl mb-2">{item.emoji}</div>
                <h3 className="font-semibold text-[#0a4a7a] text-base">{item.desc}</h3>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-400 text-sm mt-8 italic">
            {t('landing.arc2.desc2')}
          </p>
        </div>
      </section>

      {/* ───── SECTION 3: BENEFITS ───── */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a4a7a] mb-3">
              {t('landing.features.title')}
            </h2>
            <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">
              {t('landing.features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {features.map((item) => (
              <div key={item.key} className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-[#0a4a7a] text-lg mb-2">
                  {t(`landing.features.${item.key}Title`)}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t(`landing.features.${item.key}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── SECTION 4: CTA ───── */}
      <section className="py-20 md:py-28 bg-[#0a2a4a]">
        <div className="max-w-xl mx-auto px-6 text-center">
          <svg width="28" height="28" viewBox="0 0 80 80" fill="none" className="mx-auto mb-5 opacity-50">
            <circle cx="40" cy="40" r="36" stroke="#f5d742" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            <polygon points="40,12 48,38 40,46 32,38" fill="#f5d742" />
          </svg>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            {t('landing.cta.title')}
          </h2>
          <p className="text-white/50 text-base mb-8">
            {t('landing.cta.subtitle')}
          </p>
          <button onClick={() => navigate('/register')}
            className="bg-[#f5d742] hover:bg-[#e8c830] text-[#0a2a4a] font-semibold px-8 py-3 rounded-xl text-base transition-all inline-flex items-center gap-2">
            ⛵ {t('landing.cta.button')}
          </button>
          <p className="text-white/20 text-sm mt-4">
            <button onClick={() => navigate('/login')} className="hover:text-white/40 transition-colors">
              {t('landing.cta.login')}
            </button>
          </p>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="bg-[#061a2a] text-white/30 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="19" fill="#0a4a7a" stroke="#f5d742" strokeWidth="1.5" />
                <path d="M20 6 C20 6 14 18 14 22 C14 26 16.5 30 20 30 C23.5 30 26 26 26 22 C26 18 20 6 20 6Z" fill="#f5d742" />
              </svg>
              <span className="text-white/50 font-semibold">Insel 1o1</span>
            </div>
            <LanguageToggle />
          <div className="flex gap-4 items-center">
            <button onClick={() => navigate('/login')} className="hover:text-white/50">{t('common.login')}</button>
            <button onClick={() => navigate('/register')} className="hover:text-white/50">{t('common.register')}</button>
            <button onClick={() => navigate('/about')} className="hover:text-white/50">{t('navigation.about')}</button>
          </div>
          </div>
          <div className="border-t border-white/10 mt-6 pt-4 text-center">
            <p>{t('landing.footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ──────────────── Language Toggle ────────────────
function LanguageToggle() {
  const { language, setLanguage } = usei18n();
  const languages = ['de', 'en', 'zh-TW'] as const;

  return (
    <div className="flex gap-1">
      {languages.map((l) => (
        <button key={l} onClick={() => setLanguage(l)}
          className={`px-2 py-0.5 rounded ${language === l ? 'bg-[#f5d742]/20 text-[#f5d742]' : 'hover:text-white/50'}`}>
          {l === 'de' ? 'DE' : l === 'en' ? 'EN' : '中文'}
        </button>
      ))}
    </div>
  );
}
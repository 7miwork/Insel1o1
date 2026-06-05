'use client';

import React, { useEffect, useState } from 'react';
import { usei18n } from '@/contexts/i18nContext';
import { useNavigate } from 'react-router-dom';

// ──────────────── Integrated Adventure World Page ────────────────
// KEINE Sections mehr. Keine Fullscreen-Blöcke.
// EINE durchgehende Weltkarte mit schwebenden Elementen.

export default function LandingPage() {
  const { t } = usei18n();
  const navigate = useNavigate();
  const [showHarbor, setShowHarbor] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const [activeIsland, setActiveIsland] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowHarbor(true), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollPos(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll progress (0-1)
  const progress = Math.min(scrollPos / (window.innerHeight * 2.5), 1);

  const islands = [
    { key: 'island1', emoji: '🏝️', x: 15, y: 30, color: '#4a8a3f' },
    { key: 'island2', emoji: '🗣️', x: 70, y: 20, color: '#3a7abf' },
    { key: 'island3', emoji: '🔬', x: 80, y: 55, color: '#c46a3a' },
    { key: 'island4', emoji: '📜', x: 25, y: 60, color: '#8b5a3a' },
    { key: 'island5', emoji: '🎨', x: 50, y: 45, color: '#c44a6a' },
    { key: 'island6', emoji: '💎', x: 55, y: 70, color: '#3a8ac4' },
    { key: 'boss', emoji: '👑', x: 88, y: 15, color: '#f5d742', isBoss: true },
  ];

  const routes = [
    { from: 0, to: 1 }, { from: 0, to: 3 }, { from: 3, to: 4 },
    { from: 4, to: 5 }, { from: 4, to: 2 }, { from: 1, to: 2 },
    { from: 2, to: 6 }, { from: 1, to: 6 },
  ];

  return (
    <div className="bg-[#0d3048]">
      {/* ================================================
         GLOBAL BACKGROUND (scrollt langsam)
         ================================================ */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {/* Sky / Ozean – Basis */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a2a4a] via-[#0d3a5a] to-[#0a2a4a]" />
        {/* Parallax Sterne */}
        <div className="absolute inset-0" style={{ transform: `translateY(${scrollPos * 0.1}px)` }}>
          {[...Array(30)].map((_, i) => (
            <div key={i} className="absolute w-0.5 h-0.5 bg-white rounded-full" style={{
              left: `${(i * 7 + 3) % 100}%`, top: `${(i * 4 + 2) % 50}%`,
              opacity: 0.2 + (i % 3) * 0.2,
            }} />
          ))}
        </div>
        {/* Horizont-Linie */}
        <div className="absolute top-[45%] left-0 right-0 h-0.5 bg-[#1a5a8a]/20" />
      </div>

      {/* ================================================
         SCROLL AREA (die ganze Seite scrollt)
         ================================================ */}
      <div className="relative" style={{ zIndex: 1 }}>

        {/* ───── HARBOR ENTRY ───── */}
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden"
             style={{ background: 'transparent' }}>
          {/* Harbor Atmosphäre */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a2a4a]/60 via-transparent to-[#0a2a4a]/80" />
          {/* Waves am unteren Rand */}
          <div className="absolute bottom-0 left-0 right-0 h-20">
            <div className="wave wave-1 opacity-30" />
            <div className="wave wave-2 opacity-20" />
          </div>
          {/* Horizont-Inseln */}
          <div className="absolute top-[35%] left-0 right-0 flex justify-around px-8 pointer-events-none opacity-40">
            <div className="w-12 h-6 bg-gradient-to-t from-[#2d5a27] to-[#3a7a2f] rounded-t-full" style={{ animation: 'sway 8s ease-in-out infinite' }} />
            <div className="w-16 h-8 bg-gradient-to-t from-[#2d5a27] to-[#3a7a2f] rounded-t-full" style={{ animation: 'sway 10s ease-in-out infinite 1.5s' }} />
            <div className="w-10 h-5 bg-gradient-to-t from-[#2d5a27] to-[#3a7a2f] rounded-t-full" style={{ animation: 'sway 7s ease-in-out infinite 3s' }} />
          </div>

          {/* Content – über der Karte schwebend */}
          <div className={`relative z-10 flex flex-col items-center justify-center px-4 transition-all duration-1000 ${showHarbor ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <svg width="40" height="40" viewBox="0 0 80 80" fill="none" className="mb-4">
              <circle cx="40" cy="40" r="38" stroke="#f5d742" strokeWidth="2" strokeDasharray="4 4" fill="none" />
              <polygon points="40,10 50,36 40,47 30,36" fill="#f5d742" />
              <polygon points="40,70 30,44 40,37 50,44" fill="#f5d742" opacity="0.6" />
              <circle cx="40" cy="42" r="4" fill="#f5d742" />
            </svg>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white text-center leading-tight mb-3">
              <span className="block">{t('landing.hero.title1')}</span>
              <span className="block text-[#f5d742]">{t('landing.hero.title2')}</span>
            </h1>
            <p className="text-white/40 text-sm md:text-base max-w-md text-center mb-6">
              {t('landing.hero.subtitle')}
            </p>
            {/* Kleines Aktions-Panel */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 max-w-xs w-full border border-white/20">
              <button onClick={() => navigate('/register')}
                className="w-full bg-[#f5d742] hover:bg-[#e8c830] text-[#0a2a4a] font-bold py-3 px-5 rounded-lg text-base transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
                ⛵ {t('landing.hero.cta')}
              </button>
              <button onClick={() => navigate('/login')}
                className="w-full text-white/60 hover:text-white py-2 px-5 rounded-lg text-sm transition-all mt-2 flex items-center justify-center gap-2">
                🗺️ {t('landing.hero.login')}
              </button>
            </div>

            {/* Scroll-Hinweis */}
            <div className="mt-8 animate-bounce">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="opacity-30">
                <path d="M7 13L12 18L17 13" /><path d="M7 6L12 11L17 6" />
              </svg>
            </div>
          </div>
        </div>

        {/* ───── WELTKARTE (dominant) ───── */}
        <div className="relative min-h-[200vh] overflow-hidden bg-gradient-to-b from-[#0d3048] via-[#1a4a6a] to-[#0a2a4a]">
          {/* Kartentextur */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 30 Q30 20 40 30 T60 30' stroke='white' fill='none' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px',
          }} />

          {/* Route-Linien (auf der Karte) */}
          <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
            {routes.map((r, i) => {
              const f = islands[r.from], t = islands[r.to];
              return (
                <path key={i} d={`M${f.x} ${f.y} Q${(f.x + t.x) / 2} ${(f.y + t.y) / 2 - 5} ${t.x} ${t.y}`}
                  stroke="#f5d742" strokeWidth="0.08" strokeDasharray="0.4 0.3" opacity={0.2 + progress * 0.3} />
              );
            })}
          </svg>

          {/* Insel-Marker */}
          {islands.map((island, idx) => {
            const isActive = activeIsland === idx;
            return (
              <div key={idx} className="absolute cursor-pointer z-10 transition-all duration-500"
                style={{
                  left: `${island.x}%`, top: `${island.y}%`,
                  transform: `translate(-50%, -50%) scale(${isActive ? 1.3 : 1})`,
                  opacity: 0.6 + progress * 0.4,
                }}
                onMouseEnter={() => setActiveIsland(idx)}
                onMouseLeave={() => setActiveIsland(null)}>
                <div className={`relative ${island.isBoss ? 'w-20 h-20' : 'w-14 h-14'}`}>
                  {island.isBoss && (
                    <>
                      <div className="absolute inset-0 rounded-full bg-[#f5d742]/15 blur-xl animate-pulse" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#f5d742] blur-sm" />
                    </>
                  )}
                  {/* Inselgrund */}
                  <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full ${island.isBoss ? 'w-16 h-10' : 'w-12 h-8'}`}
                    style={{ background: `linear-gradient(to top, ${island.color}, ${island.color}66)` }}>
                    {/* Palme / Baum (optional) */}
                    {idx % 2 === 0 && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-4 bg-[#4a3a2a] rounded-full">
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-3 bg-[#2d5a27] rounded-full" />
                      </div>
                    )}
                  </div>
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${island.isBoss ? 'text-3xl' : 'text-2xl'}`}>
                    {island.emoji}
                  </div>
                  {/* Label bei Hover */}
                  {isActive && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-semibold text-[#0a4a7a] shadow">
                      {island.isBoss ? t('landing.arc5.finalBadge') : t(`landing.arc2.${island.key}`)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Kompass (schwebt auf Karte) */}
          <div className="fixed top-20 right-4 pointer-events-none z-30" style={{ animation: 'float 6s ease-in-out infinite' }}>
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none" className="opacity-30">
              <circle cx="50" cy="50" r="45" stroke="#f5d742" strokeWidth="1.5" />
              <polygon points="50,10 56,46 50,52 44,46" fill="#f5d742" />
              <polygon points="50,90 44,54 50,48 56,54" fill="#f5d742" opacity="0.5" />
              <circle cx="50" cy="50" r="4" fill="#f5d742" />
            </svg>
          </div>

          {/* ───── QUEST PIN (auf Karte integriert) ───── */}
          {progress > 0.2 && progress < 0.7 && (
            <div className="absolute z-20" style={{ left: '30%', top: '35%', transform: 'translate(-50%, -50%)' }}>
              <div style={{ animation: 'float 4s ease-in-out infinite' }}>
                <div className="flex flex-col items-center">
                  <div className="text-lg mb-1">📌</div>
                  <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded shadow text-xs text-[#0a4a7a] font-semibold whitespace-nowrap">
                    {t('landing.arc2.desc1').substring(0, 30)}…
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ───── SCHATZINSEL (auf Karte integriert) ───── */}
          {progress > 0.4 && progress < 0.85 && (
            <div className="absolute z-20" style={{ left: '65%', top: '55%', transform: 'translate(-50%, -50%)' }}>
              <div className="flex flex-col items-center" style={{ animation: 'float 5s ease-in-out infinite 1s' }}>
                <div className="flex gap-1 mb-1">
                  <span className="text-xs rotate-12">⭐</span>
                  <span className="text-sm -rotate-6">💎</span>
                  <span className="text-xs rotate-20">🪙</span>
                </div>
                <div className="bg-[#f5d742]/80 backdrop-blur-sm px-2 py-0.5 rounded shadow text-[10px] text-[#0a2a4a] font-bold whitespace-nowrap">
                  ✦ {t('landing.arc4.title').substring(0, 20)} ✦
                </div>
              </div>
            </div>
          )}

          {/* ───── SCHRIFTROLLE (auf Karte integriert) ───── */}
          {progress > 0.6 && (
            <div className="absolute z-20" style={{ left: '50%', top: '35%', transform: 'translate(-50%, -50%)' }}>
              <div className="bg-[#f5eed8]/90 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg border border-[#c4a86a]/40 max-w-[200px]"
                style={{ fontFamily: "'Caveat', cursive" }}>
                <p className="text-[#0a4a7a] font-bold text-sm mb-1">{t('landing.arc5.title')}</p>
                <p className="text-[#7a6a5a] text-xs">{t('landing.arc5.subtitle').substring(0, 50)}…</p>
              </div>
            </div>
          )}

          {/* ───── "HIER GEHT ES LANG" – Pfad-Marker ───── */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-1 items-center opacity-30">
            <span className="text-xs">⋯</span>
            <span className="text-xs">→</span>
            <span className="text-xs">⋯</span>
            <span className="text-xs">→</span>
            <span className="text-xs">✨</span>
          </div>
        </div>

        {/* ───── BOTTOM – CALL TO VOYAGE ───── */}
        <div className="relative py-16 flex flex-col items-center justify-center text-center px-4 bg-gradient-to-t from-[#0a2a4a] to-transparent">
          <div className="max-w-xl">
            <svg width="32" height="32" viewBox="0 0 80 80" fill="none" className="mx-auto mb-4">
              <circle cx="40" cy="40" r="38" stroke="#f5d742" strokeWidth="2" strokeDasharray="4 4" fill="none" />
              <polygon points="40,10 50,36 40,47 30,36" fill="#f5d742" />
              <polygon points="40,70 30,44 40,37 50,44" fill="#f5d742" opacity="0.6" />
            </svg>
            <h2 className="text-2xl sm:text-4xl font-black text-[#f5d742] mb-2">
              {t('landing.cta.title')}
            </h2>
            <p className="text-white/40 text-sm mb-6 max-w-xs mx-auto">{t('landing.cta.subtitle')}</p>
            <button onClick={() => navigate('/register')}
              className="bg-[#f5d742] hover:bg-[#e8c830] text-[#0a2a4a] font-bold px-8 py-3 rounded-xl text-base transition-all hover:-translate-y-0.5 shadow-lg inline-flex items-center gap-2">
              ⛵ {t('landing.cta.button')}
            </button>
            <p className="text-white/20 text-xs mt-4">
              {t('landing.cta.login')} → 🗝️
            </p>
          </div>
        </div>

        {/* ───── FOOTER ───── */}
        <Footer />
      </div>
    </div>
  );
}

// ──────────────── Footer ────────────────
function Footer() {
  const { t, language, setLanguage } = usei18n();
  const navigate = useNavigate();
  const languages = ['de', 'en', 'zh-TW'] as const;
  const langLabels: Record<string, string> = { de: 'DE', en: 'EN', 'zh-TW': '中文' };

  return (
    <footer className="bg-[#0a1a2a]/80 text-white/40 py-6">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="19" fill="#0a4a7a" stroke="#f5d742" strokeWidth="1.5" />
              <path d="M20 6 C20 6 14 18 14 22 C14 26 16.5 30 20 30 C23.5 30 26 26 26 22 C26 18 20 6 20 6Z" fill="#f5d742" />
            </svg>
            <span className="text-white/60 font-semibold">Insel 1o1</span>
          </div>
          <div className="flex gap-1">
            {languages.map((l) => (
              <button key={l} onClick={() => setLanguage(l)}
                className={`px-2 py-0.5 rounded ${language === l ? 'bg-[#f5d742] text-[#0a2a4a] font-bold' : 'hover:text-white'}`}>
                {l === 'de' ? 'DE' : l === 'en' ? 'EN' : '中文'}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/login')} className="hover:text-white">{t('common.login')}</button>
            <button onClick={() => navigate('/register')} className="hover:text-white">{t('common.register')}</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
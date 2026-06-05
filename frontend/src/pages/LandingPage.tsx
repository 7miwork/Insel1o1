'use client';

import React, { useEffect, useState } from 'react';
import { usei18n } from '@/contexts/i18nContext';
import { useNavigate } from 'react-router-dom';

// ──────────────── Hooks ────────────────
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scene-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.scene').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ──────────────── Shared Decorations ────────────────

function ShipSvg({ className = '', fill = '#f5d742' }: { className?: string; fill?: string }) {
  const w = 120;
  const h = 100;
  return (
    <svg width={w} height={h} viewBox="0 0 200 160" fill="none" className={className}>
      <path d="M30 130 L100 40 L170 130 Z" fill={fill} opacity="0.8" />
      <rect x="95" y="40" width="10" height="90" fill={fill} opacity="0.9" />
      <path d="M100 50 L140 70 L100 60Z" fill={fill} opacity="0.6" />
      <path d="M100 50 L60 70 L100 60Z" fill={fill} opacity="0.4" />
      <path d="M10 130 L190 130 L210 150 L-10 150 Z" fill={fill} opacity="0.7" />
      <rect x="80" y="55" width="40" height="2" fill={fill} opacity="0.5" />
    </svg>
  );
}

// Simple curved separator between scenes
function SceneDivider() {
  return (
    <div className="relative h-12 w-full overflow-hidden">
      <svg viewBox="0 0 1440 48" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
        <path fill="#f8f4e8" d="M0,24 C360,48 1080,0 1440,24 L1440,48 L0,48 Z" opacity="0.6" />
      </svg>
    </div>
  );
}

// ──────────────── SCENE 1: THE HARBOR ────────────────

function HarborScene() {
  const { t } = usei18n();
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0d3048]">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a4a7a] via-[#1a6ba0] to-[#0d3048]" />

      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${3 + (i * 5) % 94}%`,
              top: `${2 + (i * 4) % 45}%`,
              opacity: 0.3 + (i % 4) * 0.2,
              animation: `twinkle ${3 + (i % 3)}s ease-in-out infinite ${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Moon */}
      <div className="absolute top-12 right-[15%] w-14 h-14 md:w-20 md:h-20 rounded-full bg-[#f5d742]/30 blur-sm" />
      <div className="absolute top-12 right-[15%] w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#f5d742]/50" />

      {/* Ocean */}
      <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-[#0a2a4a] via-[#0d3a5a] to-[#1a5a8a]" />
      <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-[#082040] to-transparent" />

      {/* Gentle waves */}
      <div className="absolute bottom-[25%] left-0 right-0 h-16">
        <div className="wave wave-1" />
        <div className="wave wave-2" />
      </div>

      {/* Distant islands on horizon */}
      <div className="absolute bottom-[52%] left-0 right-0 flex justify-around px-8 pointer-events-none">
        <div className="w-12 h-6 md:w-20 md:h-10 bg-gradient-to-t from-[#2d5a27] to-[#3a7a2f] rounded-t-full opacity-40" style={{ animation: 'sway 8s ease-in-out infinite' }} />
        <div className="w-16 h-8 md:w-28 md:h-14 bg-gradient-to-t from-[#2d5a27] to-[#3a7a2f] rounded-t-full opacity-30" style={{ animation: 'sway 10s ease-in-out infinite 2s' }} />
        <div className="w-10 h-5 md:w-16 md:h-8 bg-gradient-to-t from-[#2d5a27] to-[#3a7a2f] rounded-t-full opacity-35" style={{ animation: 'sway 7s ease-in-out infinite 1s' }} />
      </div>

      {/* Dock / Pier */}
      <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-[70%] max-w-lg">
        <div className="relative">
          {/* Wooden planks */}
          <div className="h-3 bg-[#5a3a1a] rounded-sm" />
          <div className="h-2 bg-[#4a2a0a] rounded-sm mt-0.5" />
          {/* Posts */}
          <div className="absolute -bottom-4 left-[15%] w-2 h-6 bg-[#4a2a0a] rounded-b-sm" />
          <div className="absolute -bottom-4 left-[45%] w-2 h-6 bg-[#4a2a0a] rounded-b-sm" />
          <div className="absolute -bottom-4 left-[75%] w-2 h-6 bg-[#4a2a0a] rounded-b-sm" />
        </div>
      </div>

      {/* Ship at dock */}
      <div className="absolute bottom-[30%] left-[15%] md:left-[20%] pointer-events-none" style={{ animation: 'dockSway 4s ease-in-out infinite' }}>
        <ShipSvg fill="#c4903a" />
      </div>

      {/* Lantern */}
      <div className="absolute bottom-[45%] right-[18%] pointer-events-none" style={{ animation: 'flicker 3s ease-in-out infinite' }}>
        <div className="w-3 h-5 bg-[#f5d742] rounded-sm opacity-70 blur-sm" />
        <div className="w-1 h-3 bg-[#f5d742] mx-auto mt-0.5" />
        <div className="w-4 h-1 bg-[#3a2a0a] mx-auto" />
      </div>

      {/* Content overlay */}
      <div className={`relative z-10 min-h-screen flex flex-col items-center justify-center px-4 transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Logo emblem */}
        <div className="mb-6">
          <svg width="56" height="56" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="38" stroke="#f5d742" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            <polygon points="40,10 50,36 40,44 30,36" fill="#f5d742" />
            <polygon points="40,70 30,44 40,36 50,44" fill="#f5d742" opacity="0.7" />
            <circle cx="40" cy="40" r="6" fill="#f5d742" />
            <circle cx="40" cy="40" r="38" stroke="#f5d742" strokeWidth="1" fill="none" />
          </svg>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white text-center leading-tight mb-4">
          <span className="block">{t('landing.hero.title1')}</span>
          <span className="block text-[#f5d742]">{t('landing.hero.title2')}</span>
        </h1>

        <p className="text-white/70 text-base sm:text-lg md:text-xl max-w-2xl text-center mb-10 leading-relaxed">
          {t('landing.hero.subtitle')}
        </p>

        {/* Action panel - like a game dialog */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 md:p-8 max-w-md w-full border border-white/20">
          <div className="space-y-3">
            <button
              onClick={() => navigate('/register')}
              className="w-full bg-[#f5d742] hover:bg-[#e8c830] text-[#0a2a4a] font-bold py-3.5 px-6 rounded-xl text-lg transition-all hover:-translate-y-0.5 hover:shadow-xl flex items-center justify-center gap-2 group"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12h12M12 5l7 7-7 7"/>
              </svg>
              ⛵ {t('landing.hero.cta')}
            </button>
            <button
              onClick={() => navigate('/login')}
              className="w-full text-white/80 hover:text-white py-2.5 px-6 rounded-xl text-base transition-all border border-white/20 hover:border-white/40 flex items-center justify-center gap-2"
            >
              🗺️ {t('landing.hero.login')}
            </button>
          </div>
        </div>

        {/* Hint */}
        <p className="text-white/40 text-xs mt-6 tracking-widest uppercase animate-pulse">
          {t('landing.arc1.subtitle')?.substring(0, 35)}…
        </p>
      </div>
    </section>
  );
}

// ──────────────── SCENE 2: THE WORLD MAP ────────────────

function WorldMapScene() {
  const { t } = usei18n();
  const [activeIsland, setActiveIsland] = useState<number | null>(null);

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
    <section className="relative py-16 md:py-24 overflow-hidden min-h-screen">
      {/* Parchment background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5eed8] via-[#f0e8d0] to-[#e8dcc0]" />

      {/* Aged paper texture */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 30 Q30 20 40 30 T60 30' stroke='%238b7355' fill='none' stroke-width='0.5'/%3E%3C/svg%3E")`,
        backgroundSize: '120px 120px',
      }} />

      {/* Burn marks / wear */}
      <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-[#8b7355]/5 blur-xl" />
      <div className="absolute bottom-12 right-12 w-32 h-32 rounded-full bg-[#8b7355]/5 blur-xl" />

      {/* Compass rose - decorative */}
      <div className="absolute top-8 right-8 pointer-events-none" style={{ animation: 'float 8s ease-in-out infinite' }}>
        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-30">
          <circle cx="50" cy="50" r="45" stroke="#8b7355" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="38" stroke="#8b7355" strokeWidth="1" strokeDasharray="3 3" />
          <polygon points="50,10 56,46 50,52 44,46" fill="#c4a86a" />
          <polygon points="50,90 44,54 50,48 56,54" fill="#8b7355" />
          <circle cx="50" cy="50" r="4" fill="#c4a86a" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Title */}
        <div className="scene opacity-0 transition-all duration-800 translate-y-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-[#0a4a7a] leading-tight">
              {t('landing.arc2.title')}
            </h2>
            <p className="text-[#7a6a5a] text-base md:text-lg mt-3 max-w-xl mx-auto">
              {t('landing.arc2.subtitle')}
            </p>
          </div>
        </div>

        {/* Map container */}
        <div className="scene opacity-0 transition-all duration-800 translate-y-6">
          <div className="relative w-full aspect-[4/3] md:aspect-[16/9] max-w-5xl mx-auto rounded-2xl overflow-hidden border-2 border-[#c4a86a]/30 shadow-2xl bg-gradient-to-br from-[#e8dcc8] to-[#d4c4a8]">
            {/* Grid lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" fill="none">
              {[...Array(8)].map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 75 + 20} x2="800" y2={i * 75 + 20} stroke="#8b7355" strokeWidth="0.5" opacity="0.15" />
              ))}
              {[...Array(10)].map((_, i) => (
                <line key={`v${i}`} x1={i * 80 + 40} y1="0" x2={i * 80 + 40} y2="600" stroke="#8b7355" strokeWidth="0.5" opacity="0.15" />
              ))}
            </svg>

            {/* Route lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" fill="none">
              {routes.map((route, idx) => {
                const from = islands[route.from];
                const to = islands[route.to];
                const fx = (from.x / 100) * 800;
                const fy = (from.y / 100) * 600;
                const tx = (to.x / 100) * 800;
                const ty = (to.y / 100) * 600;
                const mx = (fx + tx) / 2;
                const my = (fy + ty) / 2 - 30;
                return (
                  <path
                    key={idx}
                    d={`M${fx} ${fy} Q${mx} ${my} ${tx} ${ty}`}
                    stroke="#8b7355"
                    strokeWidth="1.5"
                    strokeDasharray="6 4"
                    opacity="0.3"
                  />
                );
              })}
            </svg>

            {/* Island markers */}
            {islands.map((island, idx) => {
              const isActive = activeIsland === idx;
              return (
                <div
                  key={idx}
                  className="absolute cursor-pointer transition-all duration-300 z-10"
                  style={{
                    left: `${island.x}%`,
                    top: `${island.y}%`,
                    transform: `translate(-50%, -50%) scale(${isActive ? 1.15 : 1})`,
                  }}
                  onMouseEnter={() => setActiveIsland(idx)}
                  onMouseLeave={() => setActiveIsland(null)}
                >
                  {/* Island shape */}
                  <div className={`relative ${island.isBoss ? 'w-14 h-14 md:w-20 md:h-20' : 'w-10 h-10 md:w-16 md:h-16'}`}>
                    {/* Glow for boss island */}
                    {island.isBoss && (
                      <div className="absolute inset-0 rounded-full bg-[#f5d742]/20 blur-md animate-pulse" />
                    )}
                    {/* Ground */}
                    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full ${
                      island.isBoss ? 'w-14 h-8 md:w-20 md:h-12' : 'w-10 h-6 md:w-16 md:h-10'
                    }`} style={{ background: `linear-gradient(to top, ${island.color}, ${island.color}88)` }} />
                    {/* Emoji */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                      island.isBoss ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
                    }`}>
                      {island.emoji}
                    </div>
                    {/* Label on hover */}
                    {isActive && (
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs md:text-sm font-semibold text-[#0a4a7a] shadow-lg border border-[#c4a86a]/30">
                        {t(`landing.arc2.${island.key}`)}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Sea monsters / decorations */}
            <div className="absolute bottom-[20%] left-[10%] text-lg opacity-15 pointer-events-none" style={{ animation: 'sway 6s ease-in-out infinite' }}>
              🐙
            </div>
            <div className="absolute bottom-[35%] right-[15%] text-lg opacity-15 pointer-events-none" style={{ animation: 'sway 8s ease-in-out infinite 2s' }}>
              🐋
            </div>

            {/* "Here be dragons" */}
            <div className="absolute bottom-2 right-4 text-[#8b7355] opacity-20 text-xs md:text-sm select-none" style={{ fontFamily: "'Caveat', cursive" }}>
              …here be dragons
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="scene opacity-0 transition-all duration-800 translate-y-6 mt-6">
          <p className="text-center text-[#8b7355]/60 text-sm italic">
            {t('landing.arc2.desc2')}
          </p>
        </div>
      </div>
    </section>
  );
}

// ──────────────── SCENE 3: THE ADVENTURES ────────────────

function AdventuresScene() {
  const { t } = usei18n();

  const adventures = [
    { key: 'feature1', emoji: '💻', label: 'Learn Coding', bg: 'from-emerald-700 to-emerald-500' },
    { key: 'feature2', emoji: '🧱', label: 'Build in Minecraft', bg: 'from-amber-700 to-amber-500' },
    { key: 'feature3', emoji: '🔭', label: 'Discover Technology', bg: 'from-blue-700 to-blue-500' },
    { key: 'feature4', emoji: '⚡', label: 'Master New Skills', bg: 'from-purple-700 to-purple-500' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0a2a4a] via-[#0d3a5a] to-[#0a2a4a] py-12 md:py-16">
      {/* Star field */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${5 + (i * 7) % 90}%`,
              top: `${5 + (i * 9) % 90}%`,
              opacity: 0.2 + (i % 3) * 0.2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="scene opacity-0 transition-all duration-800 translate-y-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
              {t('landing.features.title')}
            </h2>
            <p className="text-white/60 text-base md:text-lg mt-3 max-w-2xl mx-auto">
              {t('landing.features.subtitle')}
            </p>
          </div>
        </div>

        {/* Adventure entries - NOT cards, more like quest journal entries */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {adventures.map((adv, idx) => (
            <div key={idx} className="scene opacity-0 transition-all duration-800 translate-y-6">
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${adv.bg} opacity-60`} />
                <div className="absolute inset-0 bg-black/20" />

                {/* Content */}
                <div className="relative flex items-center gap-4 md:gap-6 p-4 md:p-6">
                  <div className="text-3xl md:text-4xl shrink-0">
                    {adv.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                      {t(`landing.features.${adv.key}Title`)}
                    </h3>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed line-clamp-2">
                      {t(`landing.features.${adv.key}Desc`)}
                    </p>
                  </div>
                  <div className="shrink-0 text-white/30 group-hover:text-white/60 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-gradient-to-r from-white/5 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ──────────────── SCENE 4: THE TREASURE ROOM ────────────────

function TreasureRoomScene() {
  const { t } = usei18n();

  const treasures = [
    { key: 'reward1', emoji: '⭐', label: 'XP & Level Up' },
    { key: 'reward2', emoji: '🏅', label: 'Achievement Badges' },
    { key: 'reward3', emoji: '🔥', label: 'Streak Bonuses' },
    { key: 'reward4', emoji: '💎', label: 'Treasure Chests' },
  ];

  return (
    <section className="relative overflow-hidden min-h-[70vh]">
      {/* Dark stone chamber */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1020] via-[#2a1a30] to-[#1a1020]" />

      {/* Stone texture */}
      <div className="absolute inset-0 opacity-[0.08]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='80' height='80' fill='none'/%3E%3Crect x='2' y='2' width='76' height='76' rx='4' stroke='%238b7355' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px',
      }} />

      {/* Golden light from above */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 md:w-60 md:h-60 bg-[#f5d742]/10 blur-3xl rounded-full" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-1 h-20 md:h-32 bg-gradient-to-b from-[#f5d742]/30 to-transparent" />

      {/* Floating sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute text-sm md:text-base"
            style={{
              left: `${10 + (i * 9) % 80}%`,
              top: `${20 + (i * 8) % 60}%`,
              animation: `float ${3 + (i % 3)}s ease-in-out infinite ${i * 0.5}s`,
              opacity: 0.2,
            }}
          >
            {['✨', '💫', '👑', '💰'][i % 4]}
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="scene opacity-0 transition-all duration-800 translate-y-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#f5d742] leading-tight">
              {t('landing.arc4.title')}
            </h2>
            <p className="text-[#c4a86a]/70 text-base md:text-lg mt-3 max-w-2xl mx-auto">
              {t('landing.arc4.subtitle')}
            </p>
          </div>
        </div>

        {/* Treasure display - arranged like artifacts on a pedestal */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
          {treasures.map((treasure, idx) => (
            <div key={idx} className="scene opacity-0 transition-all duration-800 translate-y-6">
              <div className="group relative flex flex-col items-center p-4 md:p-6 transition-all duration-300 hover:-translate-y-2">
                {/* Platform / pedestal */}
                <div className="absolute bottom-0 w-16 h-3 md:w-20 md:h-4 bg-gradient-to-r from-[#4a3a2a] via-[#6a5a4a] to-[#4a3a2a] rounded-sm" />
                
                {/* Treasure */}
                <div className="text-4xl md:text-5xl mb-6 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6">
                  {treasure.emoji}
                </div>

                {/* Label */}
                <h4 className="text-white/80 text-sm md:text-base font-semibold text-center">
                  {t(`landing.arc4.${treasure.key}`)}
                </h4>

                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{
                  background: 'radial-gradient(circle at 50% 40%, #f5d74222, transparent 70%)',
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Desc text like a scroll */}
        <div className="scene opacity-0 transition-all duration-800 translate-y-6">
          <div className="max-w-2xl mx-auto bg-[#2a1a30]/60 backdrop-blur-sm rounded-xl p-5 md:p-6 border border-[#c4a86a]/20 text-center">
            <p className="text-[#c4a86a]/80 leading-relaxed text-sm md:text-base">
              {t('landing.arc4.desc1')}
            </p>
            <p className="text-[#c4a86a]/60 leading-relaxed text-sm mt-3">
              {t('landing.arc4.desc2')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────── SCENE 5: THE LEGEND ────────────────

function LegendScene() {
  const { t } = usei18n();
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden min-h-screen">
      {/* Mystical fog */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f0e8d0] via-[#e0d4b0] to-[#d0c4a0]" />

      {/* Fog layers */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#f5eed8]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#c4b898]/80 to-transparent" />
      </div>

      {/* Mist */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[10%] w-48 h-48 md:w-72 md:h-72 rounded-full bg-[#c4a86a]/15 blur-3xl" />
        <div className="absolute top-1/3 right-[15%] w-40 h-40 md:w-56 md:h-56 rounded-full bg-[#8b7355]/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-36 h-36 rounded-full bg-[#c4a86a]/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Legendary island visual */}
          <div className="scene opacity-0 transition-all duration-800 translate-y-6">
            <div className="relative w-full aspect-square max-w-sm mx-auto">
              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-[#f5d742]/15 blur-3xl animate-pulse" />

              {/* Island illustration */}
              <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-2xl" fill="none">
                {/* Mist around island */}
                <ellipse cx="150" cy="220" rx="160" ry="60" fill="white" opacity="0.15" />
                <ellipse cx="150" cy="240" rx="170" ry="40" fill="#c4a86a" opacity="0.08" />

                {/* Island body */}
                <path d="M50 220 Q80 170 110 180 Q150 140 190 180 Q220 170 250 220 Z" fill="#4a6a2a" />

                {/* Mountain peak */}
                <path d="M90 200 L150 60 L210 200 Z" fill="#5a7a3a" />
                <path d="M120 200 L150 90 L190 200 Z" fill="#6a8a4a" />

                {/* Snow */}
                <path d="M145 75 L150 60 L155 75 Q150 80 145 75Z" fill="white" opacity="0.9" />

                {/* Trees */}
                <circle cx="70" cy="205" r="10" fill="#3a6a2a" />
                <circle cx="75" cy="200" r="7" fill="#4a7a3a" />
                <circle cx="220" cy="210" r="8" fill="#3a6a2a" />

                {/* Ancient ruins */}
                <rect x="155" y="155" width="8" height="15" fill="#8b7355" opacity="0.7" />
                <rect x="168" y="162" width="6" height="8" fill="#8b7355" opacity="0.5" />
                <rect x="178" y="158" width="7" height="12" fill="#8b7355" opacity="0.6" />

                {/* Glowing artifact */}
                <circle cx="165" cy="148" r="4" fill="#f5d742" opacity="0.8" />
                <circle cx="165" cy="148" r="8" fill="#f5d742" opacity="0.2" />

                {/* Clouds around peak */}
                <ellipse cx="100" cy="50" rx="25" ry="10" fill="white" opacity="0.3" />
                <ellipse cx="200" cy="40" rx="20" ry="8" fill="white" opacity="0.25" />
                <ellipse cx="150" cy="30" rx="30" ry="12" fill="white" opacity="0.2" />

                {/* Stars */}
                <circle cx="40" cy="20" r="1.5" fill="#f5d742" opacity="0.5" />
                <circle cx="260" cy="15" r="1.5" fill="#f5d742" opacity="0.4" />
                <circle cx="150" cy="8" r="2" fill="#f5d742" opacity="0.3" />
                <circle cx="80" cy="35" r="1" fill="#f5d742" opacity="0.4" />
                <circle cx="230" cy="30" r="1" fill="#f5d742" opacity="0.3" />
              </svg>

              {/* Crown badge */}
              <div className="absolute bottom-0 right-0 bg-gradient-to-br from-[#f5d742] to-[#c4a86a] rounded-xl p-3 md:p-4 shadow-2xl">
                <div className="text-center">
                  <div className="text-sm md:text-xl font-black text-[#0a2a4a]">
                    {t('landing.arc5.finalBadge')}
                  </div>
                  <div className="text-[10px] md:text-xs text-[#0a2a4a]/60 mt-0.5">
                    {t('landing.arc5.finalDesc')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legend text */}
          <div className="scene opacity-0 transition-all duration-800 translate-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0a4a7a] leading-tight mb-6">
              {t('landing.arc5.title')}
            </h2>
            <p className="text-[#5a4a3a] text-lg md:text-xl mb-4 font-medium">
              {t('landing.arc5.subtitle')}
            </p>
            <p className="text-[#7a6a5a] mb-4 leading-relaxed">
              {t('landing.arc5.desc1')}
            </p>
            <p className="text-[#7a6a5a] mb-8 leading-relaxed italic">
              {t('landing.arc5.desc2')}
            </p>

            {/* Set Sail button */}
            <button
              onClick={() => navigate('/register')}
              className="group bg-[#f5d742] hover:bg-[#e8c830] text-[#0a4a7a] font-bold px-8 py-3.5 rounded-full text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 flex items-center gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12h12M12 5l7 7-7 7"/>
              </svg>
              ⛵ {t('landing.cta.button')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────── FOOTER (minimal) ────────────────

function GameFooter() {
  const { t, language, setLanguage } = usei18n();
  const navigate = useNavigate();
  const languages = ['de', 'en', 'zh-TW'] as const;
  const langLabels: Record<string, string> = { de: 'DE', en: 'EN', 'zh-TW': '中文' };

  return (
    <footer className="bg-[#0a1a2a] text-white/50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="19" fill="#0a4a7a" stroke="#f5d742" strokeWidth="1.5" />
              <path d="M20 6 C20 6 14 18 14 22 C14 26 16.5 30 20 30 C23.5 30 26 26 26 22 C26 18 20 6 20 6Z" fill="#f5d742" />
              <circle cx="20" cy="22" r="3" fill="#0a4a7a" />
            </svg>
            <span className="font-bold text-white text-sm">Insel 1o1</span>
          </div>

          {/* Language */}
          <div className="flex gap-1">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`text-xs px-2 py-1 rounded transition-all ${
                  language === lang ? 'bg-[#f5d742] text-[#0a4a7a] font-bold' : 'text-white/50 hover:text-white'
                }`}
              >
                {langLabels[lang]}
              </button>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4 text-xs">
            <button onClick={() => navigate('/login')} className="hover:text-white transition-colors">
              {t('common.login')}
            </button>
            <button onClick={() => navigate('/register')} className="hover:text-white transition-colors">
              {t('common.register')}
            </button>
          </div>
        </div>

        <div className="border-t border-white/10 mt-6 pt-4 text-center text-xs text-white/30">
          {t('landing.footer.copyright')}
        </div>
      </div>
    </footer>
  );
}

// ──────────────── MAIN PAGE ────────────────

export default function LandingPage() {
  useReveal();

  return (
    <div className="bg-white">
      {/* Scene 1: The Harbor */}
      <HarborScene />

      {/* Scene 2: The World Map */}
      <WorldMapScene />

      {/* Scene 3: The Adventures */}
      <AdventuresScene />

      {/* Scene 4: The Treasure Room */}
      <TreasureRoomScene />

      {/* Scene 5: The Legend */}
      <LegendScene />

      {/* Footer */}
      <GameFooter />
    </div>
  );
}
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
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a4a7a] via-[#1a6ba0] to-[#0d3048]" />
      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-white rounded-full" style={{
            left: `${3 + (i * 5) % 94}%`, top: `${2 + (i * 4) % 45}%`,
            opacity: 0.3 + (i % 4) * 0.2, animation: `twinkle ${3 + (i % 3)}s ease-in-out infinite ${i * 0.4}s`,
          }} />
        ))}
      </div>
      {/* Moon */}
      <div className="absolute top-12 right-[15%] w-14 h-14 md:w-20 md:h-20 rounded-full bg-[#f5d742]/30 blur-sm" />
      <div className="absolute top-12 right-[15%] w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#f5d742]/50" />
      {/* Ocean */}
      <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-[#0a2a4a] via-[#0d3a5a] to-[#1a5a8a]" />
      <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-[#082040] to-transparent" />
      {/* Waves */}
      <div className="absolute bottom-[25%] left-0 right-0 h-16">
        <div className="wave wave-1" /><div className="wave wave-2" />
      </div>
      {/* Islands horizon */}
      <div className="absolute bottom-[52%] left-0 right-0 flex justify-around px-8 pointer-events-none">
        <div className="w-12 h-6 md:w-20 md:h-10 bg-gradient-to-t from-[#2d5a27] to-[#3a7a2f] rounded-t-full opacity-40" style={{ animation: 'sway 8s ease-in-out infinite' }} />
        <div className="w-16 h-8 md:w-28 md:h-14 bg-gradient-to-t from-[#2d5a27] to-[#3a7a2f] rounded-t-full opacity-30" style={{ animation: 'sway 10s ease-in-out infinite 2s' }} />
        <div className="w-10 h-5 md:w-16 md:h-8 bg-gradient-to-t from-[#2d5a27] to-[#3a7a2f] rounded-t-full opacity-35" style={{ animation: 'sway 7s ease-in-out infinite 1s' }} />
      </div>
      {/* Dock */}
      <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-[70%] max-w-lg">
        <div className="h-3 bg-[#5a3a1a] rounded-sm" />
        <div className="h-2 bg-[#4a2a0a] rounded-sm mt-0.5" />
        <div className="absolute -bottom-4" style={{ left: '15%', width: '8px', height: '24px' }}>
          <div className="w-full h-full bg-[#4a2a0a] rounded-b-sm" />
        </div>
        <div className="absolute -bottom-4" style={{ left: '45%', width: '8px', height: '24px' }}>
          <div className="w-full h-full bg-[#4a2a0a] rounded-b-sm" />
        </div>
        <div className="absolute -bottom-4" style={{ left: '75%', width: '8px', height: '24px' }}>
          <div className="w-full h-full bg-[#4a2a0a] rounded-b-sm" />
        </div>
      </div>
      {/* Ship */}
      <div className="absolute bottom-[30%] left-[15%] md:left-[20%] pointer-events-none" style={{ animation: 'dockSway 4s ease-in-out infinite' }}>
        <svg width="100" height="80" viewBox="0 0 200 160" fill="none">
          <path d="M30 130 L100 40 L170 130 Z" fill="#c4903a" opacity="0.8" />
          <rect x="95" y="40" width="10" height="90" fill="#c4903a" opacity="0.9" />
          <path d="M100 50 L140 70 L100 60Z" fill="#c4903a" opacity="0.6" />
          <path d="M100 50 L60 70 L100 60Z" fill="#c4903a" opacity="0.4" />
          <path d="M10 130 L190 130 L210 150 L-10 150 Z" fill="#c4903a" opacity="0.7" />
        </svg>
      </div>
      {/* Lantern */}
      <div className="absolute bottom-[45%] right-[18%] pointer-events-none" style={{ animation: 'flicker 3s ease-in-out infinite' }}>
        <div className="w-3 h-5 bg-[#f5d742] rounded-sm opacity-70 blur-sm" />
        <div className="w-1 h-3 bg-[#f5d742] mx-auto mt-0.5" />
        <div className="w-4 h-1 bg-[#3a2a0a] mx-auto" />
      </div>
      {/* Content */}
      <div className={`relative z-10 min-h-screen flex flex-col items-center justify-center px-4 transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <svg width="48" height="48" viewBox="0 0 80 80" fill="none" className="mb-6">
          <circle cx="40" cy="40" r="38" stroke="#f5d742" strokeWidth="2" strokeDasharray="4 4" fill="none" />
          <polygon points="40,10 50,36 40,44 30,36" fill="#f5d742" />
          <polygon points="40,70 30,44 40,36 50,44" fill="#f5d742" opacity="0.7" />
          <circle cx="40" cy="40" r="6" fill="#f5d742" />
        </svg>
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white text-center leading-tight mb-6">
          <span className="block">{t('landing.hero.title1')}</span>
          <span className="block text-[#f5d742]">{t('landing.hero.title2')}</span>
        </h1>
        <p className="text-white/60 text-base sm:text-lg max-w-lg text-center mb-8 leading-relaxed">
          {t('landing.hero.subtitle')}
        </p>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 max-w-sm w-full border border-white/20">
          <div className="space-y-3">
            <button onClick={() => navigate('/register')}
              className="w-full bg-[#f5d742] hover:bg-[#e8c830] text-[#0a2a4a] font-bold py-3.5 px-6 rounded-xl text-lg transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
              ⛵ {t('landing.hero.cta')}
            </button>
            <button onClick={() => navigate('/login')}
              className="w-full text-white/80 hover:text-white py-2.5 px-6 rounded-xl text-base transition-all border border-white/20 hover:border-white/40 flex items-center justify-center gap-2">
              🗺️ {t('landing.hero.login')}
            </button>
          </div>
        </div>
        <p className="text-white/30 text-xs mt-6 tracking-widest uppercase animate-pulse">
          {String(t('landing.arc1.subtitle')).substring(0, 35)}…
        </p>
      </div>
    </section>
  );
}

// ──────────────── SCENE 2: THE WORLD MAP ────────────────
// ALT: Container mit Border + Heading + Inhalt
// NEU: Die Karte IST der Hintergrund – auslaufend, randlos

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
    <section className="relative overflow-hidden min-h-screen">
      {/* Die Karte ist der gesamte Hintergrund – randlos, kein Container */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5eed8] via-[#f0e8d0] to-[#e8dcc0]" />
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 30 Q30 20 40 30 T60 30' stroke='%238b7355' fill='none' stroke-width='0.5'/%3E%3C/svg%3E")`,
        backgroundSize: '120px 120px',
      }} />
      {/* Burn marks */}
      <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-[#8b7355]/5 blur-xl" />
      <div className="absolute bottom-12 right-12 w-32 h-32 rounded-full bg-[#8b7355]/5 blur-xl" />

      {/* Compass schwebt DIREKT auf der Karte, kein Rahmen */}
      <div className="absolute top-6 right-6 pointer-events-none z-20" style={{ animation: 'float 8s ease-in-out infinite' }}>
        <svg width="56" height="56" viewBox="0 0 100 100" fill="none" className="opacity-40">
          <circle cx="50" cy="50" r="45" stroke="#8b7355" strokeWidth="1.5" />
          <polygon points="50,10 56,46 50,52 44,46" fill="#c4a86a" />
          <polygon points="50,90 44,54 50,48 56,54" fill="#8b7355" />
          <circle cx="50" cy="50" r="4" fill="#c4a86a" />
        </svg>
      </div>

      {/* Inseln fließen DIREKT auf dem Hintergrund – kein Container-Box */}
      {/* Route-Linien */}
      <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
        {routes.map((r, i) => {
          const f = islands[r.from], t = islands[r.to];
          const fx = f.x, fy = f.y, tx = t.x, ty = t.y;
          return (
            <path key={i} d={`M${fx} ${fy} Q${(fx + tx) / 2} ${(fy + ty) / 2 - 5} ${tx} ${ty}`}
              stroke="#8b7355" strokeWidth="0.15" strokeDasharray="0.8 0.5" opacity="0.3" />
          );
        })}
      </svg>

      {/* Insel-Marker direkt auf Hintergrund */}
      {islands.map((island, idx) => {
        const isActive = activeIsland === idx;
        return (
          <div key={idx} className="absolute cursor-pointer z-10 transition-all duration-300"
            style={{ left: `${island.x}%`, top: `${island.y}%`, transform: `translate(-50%, -50%) scale(${isActive ? 1.2 : 1})` }}
            onMouseEnter={() => setActiveIsland(idx)} onMouseLeave={() => setActiveIsland(null)}>
            <div className={`relative ${island.isBoss ? 'w-16 h-16' : 'w-12 h-12'}`}>
              {island.isBoss && <div className="absolute inset-0 rounded-full bg-[#f5d742]/25 blur-md animate-pulse" />}
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full ${island.isBoss ? 'w-14 h-8' : 'w-10 h-6'}`}
                style={{ background: `linear-gradient(to top, ${island.color}, ${island.color}88)` }} />
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${island.isBoss ? 'text-2xl' : 'text-xl'}`}>
                {island.emoji}
              </div>
              {isActive && (
                <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-semibold text-[#0a4a7a] shadow border border-[#c4a86a]/30">
                  {t(`landing.arc2.${island.key}`)}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Seeungeheuer fließen direkt */}
      <div className="absolute bottom-[15%] left-[8%] text-lg opacity-15 pointer-events-none" style={{ animation: 'sway 6s ease-in-out infinite' }}>🐙</div>
      <div className="absolute bottom-[30%] right-[10%] text-lg opacity-12 pointer-events-none" style={{ animation: 'sway 8s ease-in-out infinite 2s' }}>🐋</div>

      {/* Titel fließt über der Karte – ohne Box */}
      <div className="scene absolute top-[8%] left-1/2 -translate-x-1/2 z-20 opacity-0 transition-all duration-800 translate-y-6 text-center pointer-events-none">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-[#0a4a7a]/30 leading-tight drop-shadow-sm">
          {t('landing.arc2.title')}
        </h2>
      </div>
    </section>
  );
}

// ──────────────── SCENE 3: QUEST BOARD ────────────────
// ALT: AdventuresScene = Heading + Subtitle + 4 List-Items (Feature Section)
// NEU: QuestBoard = Ein Pinnbrett mit Zetteln in verschiedenen Winkeln, 
//      überlappend, an Fäden hängend, unterschiedliche Größen

function QuestBoardScene() {
  const { t } = usei18n();

  const quests = [
    { key: 'feature1', emoji: '💻', color: '#059669', height: 'h-28' },
    { key: 'feature2', emoji: '🧱', color: '#d97706', height: 'h-24' },
    { key: 'feature3', emoji: '🔭', color: '#2563eb', height: 'h-32' },
    { key: 'feature4', emoji: '⚡', color: '#7c3aed', height: 'h-20' },
  ];

  const rotations = ['-rotate-3', 'rotate-2', '-rotate-1', 'rotate-3'];
  const margins = ['mt-0', 'mt-8', '-mt-4', 'mt-12'];

  return (
    <section className="relative overflow-hidden min-h-screen bg-[#1a1020]">
      {/* Brett-Hintergrund */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2a1a20] via-[#3a2a28] to-[#2a1a20]" />
      <div className="absolute inset-0 opacity-[0.12]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #4a3a38 2px, #4a3a38 4px)',
        backgroundSize: '100% 80px',
      }} />
      {/* Holzmaserung */}
      <div className="absolute inset-0 opacity-[0.08]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q50 40 100 50 T200 50' stroke='%238b7355' fill='none' stroke-width='1'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 100px',
      }} />

      {/* Nagel-Ecken */}
      <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-[#8b7355] shadow-inner" />
      <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-[#8b7355] shadow-inner" />
      <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-[#8b7355] shadow-inner" />
      <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-[#8b7355] shadow-inner" />

      <div className="relative z-10 px-4 py-16 md:py-24">
        {/* Quest-Zettel – überlappend, verschiedene Winkel */}
        <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">
          {quests.map((quest, idx) => (
            <div key={idx} className="scene opacity-0 transition-all duration-800 translate-y-6" style={{ perspective: '800px' }}>
              <div className={`relative ${rotations[idx]} ${margins[idx]} transform-gpu hover:scale-105 hover:-translate-y-1 transition-all duration-300`}
                style={{ transformStyle: 'preserve-3d' }}>
                {/* Schatten */}
                <div className="absolute inset-0 bg-black/20 rounded-xl translate-y-1 translate-x-1" />
                {/* Zettel */}
                <div className={`relative bg-gradient-to-br from-[#f5eed8] to-[#e8dcc0] rounded-xl p-5 md:p-6 ${quest.height} border border-[#c4a86a]/30 shadow-lg`}
                  style={{ backgroundImage: 'linear-gradient(135deg, #f5eed8 0%, #e8dcc0 100%)' }}>
                  {/* Pin */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#c44a3a] shadow-md" />
                  {/* Faden */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-[#8b7355]/30" />
                  
                  <div className="flex items-start gap-4">
                    <div className="text-3xl md:text-4xl shrink-0 mt-1">{quest.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[#0a4a7a] text-base md:text-lg mb-1">
                        {t(`landing.features.${quest.key}Title`)}
                      </h3>
                      <p className="text-[#7a6a5a] text-sm md:text-base leading-relaxed">
                        {t(`landing.features.${quest.key}Desc`)}
                      </p>
                    </div>
                    {/* Abzeichnen-Häkchen */}
                    <div className="shrink-0 w-6 h-6 rounded-full border-2 border-[#c4a86a]/50 flex items-center justify-center text-[#c4a86a] text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      ✓
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ──────────────── SCENE 4: TREASURE CHEST ────────────────
// ALT: TreasureRoomScene = Heading + 4 Items im Row + Textblock (Grid)
// NEU: ChestSpillScene = Offene Schatzkiste, Münzen/Steine fallen 
//      organisch heraus – keine Zeilen, keine Grids

function ChestSpillScene() {
  const { t } = usei18n();

  const gems = [
    { key: 'reward1', emoji: '⭐', x: 20, y: 35, size: 'text-2xl', rot: 'rotate-12' },
    { key: 'reward2', emoji: '🏅', x: 55, y: 30, size: 'text-3xl', rot: '-rotate-6' },
    { key: 'reward3', emoji: '🔥', x: 75, y: 45, size: 'text-xl', rot: 'rotate-20' },
    { key: 'reward4', emoji: '💎', x: 35, y: 55, size: 'text-2xl', rot: '-rotate-15' },
    { key: 'coin1', emoji: '🪙', x: 45, y: 50, size: 'text-lg', rot: 'rotate-8' },
    { key: 'coin2', emoji: '🪙', x: 60, y: 55, size: 'text-base', rot: '-rotate-10' },
    { key: 'coin3', emoji: '🪙', x: 25, y: 50, size: 'text-lg', rot: 'rotate-5' },
    { key: 'coin4', emoji: '👑', x: 80, y: 30, size: 'text-xl', rot: '-rotate-3' },
  ];

  return (
    <section className="relative overflow-hidden min-h-screen">
      {/* Dunkle Kammer */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1020] via-[#2a1a30] to-[#1a1020]" />
      {/* Steinstruktur */}
      <div className="absolute inset-0 opacity-[0.08]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='2' y='2' width='56' height='56' rx='3' fill='none' stroke='%238b7355' stroke-width='0.3'/%3E%3C/svg%3E")`,
        backgroundSize: '50px 50px',
      }} />
      {/* Lichtstrahl von oben */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 md:w-48 md:h-48 bg-[#f5d742]/8 blur-3xl rounded-full" />
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-24 md:h-36 bg-gradient-to-b from-[#f5d742]/20 to-transparent" />

      {/* Schatzkiste – zentral */}
      <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 z-20">
        <div className="relative">
          {/* Kiste */}
          <div className="w-24 h-16 md:w-32 md:h-20 bg-gradient-to-b from-[#8b6914] to-[#6a4a0a] rounded-lg border-2 border-[#c4a86a]/50 shadow-2xl">
            {/* Goldbeschläge */}
            <div className="absolute top-1 left-1 right-1 h-0.5 bg-[#f5d742]/30 rounded" />
            <div className="absolute bottom-1 left-1 right-1 h-0.5 bg-[#f5d742]/30 rounded" />
            <div className="absolute top-2 bottom-2 left-1 w-0.5 bg-[#f5d742]/30 rounded" />
            <div className="absolute top-2 bottom-2 right-1 w-0.5 bg-[#f5d742]/30 rounded" />
            {/* Schloss */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-4 md:w-4 md:h-5 rounded-sm bg-[#f5d742]/40 border border-[#c4a86a]/60" />
            {/* Offener Deckel */}
            <div className="absolute -top-6 md:-top-8 left-0 right-0 h-6 md:h-8 bg-gradient-to-b from-[#a47a14] to-[#8b6914] rounded-t-lg border-t-2 border-l-2 border-r-2 border-[#c4a86a]/50"
              style={{ transform: 'rotateX(-30deg)', transformOrigin: 'bottom' }} />
          </div>
          {/* Goldglanz */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-12 md:w-28 md:h-16 bg-[#f5d742]/10 blur-xl rounded-full" />
        </div>
      </div>

      {/* Herausfallende Schätze – organisch verteilt, kein Grid */}
      <div className="absolute inset-0 z-10">
        {gems.map((gem) => (
          <div key={gem.key} className={`absolute ${gem.size} ${gem.rot} transition-all duration-500 hover:scale-150`}
            style={{
              left: `${gem.x}%`, top: `${gem.y}%`,
              animation: `spillDrop ${1.5 + Math.random()}s ease-out ${Math.random() * 2}s both, float ${3 + Math.random() * 2}s ease-in-out ${2 + Math.random() * 2}s infinite`,
              filter: 'drop-shadow(0 0 6px rgba(245, 215, 66, 0.3))',
            }}>
            {gem.emoji}
          </div>
        ))}
      </div>

      {/* Titel – dezent im Raum */}
      <div className="relative z-30 flex flex-col items-center justify-center min-h-screen px-4 pointer-events-none">
        <div className="scene opacity-0 transition-all duration-800 translate-y-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#f5d742] leading-tight drop-shadow-lg">
            {t('landing.arc4.title')}
          </h2>
          <p className="text-[#c4a86a]/60 text-sm md:text-base mt-2 max-w-xs mx-auto">
            {t('landing.arc4.subtitle')}
          </p>
        </div>
      </div>

      {/* Beschreibung als leises Flüstern */}
      <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 z-30 w-full max-w-md px-4 text-center pointer-events-none">
        <p className="text-[#c4a86a]/40 text-xs md:text-sm italic leading-relaxed">
          {t('landing.arc4.desc1')}
        </p>
      </div>
    </section>
  );
}

// ──────────────── SCENE 5: ANCIENT SCROLL ────────────────
// ALT: LegendScene = 2-Spalten: Image + Text + Button (Marketing CTA)
// NEU: AncientScrollScene = Eine Schriftrolle, die sich entrollt. 
//      Text erscheint wie von Hand geschrieben. Das Bild ist Teil der Rolle.

function AncientScrollScene() {
  const { t } = usei18n();
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden min-h-screen">
      {/* Pergament-Hintergrund */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5eed8] via-[#f0e8d0] to-[#e8dcc0]" />
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20 Q30 15 40 20 T60 20' stroke='%238b7355' fill='none' stroke-width='0.5'/%3E%3C/svg%3E")`,
        backgroundSize: '100px 100px',
      }} />

      {/* Schriftrollen-Rollen oben und unten */}
      <div className="absolute top-0 left-0 right-0 h-8 md:h-10">
        <div className="h-full bg-gradient-to-b from-[#c4a86a] to-[#a08850] rounded-b-full" />
        <div className="absolute left-3 top-0 w-4 h-full bg-gradient-to-r from-[#d4b86a] to-[#b49850] rounded-r-full" />
        <div className="absolute right-3 top-0 w-4 h-full bg-gradient-to-l from-[#d4b86a] to-[#b49850] rounded-l-full" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-20 md:py-28">
        {/* Inhalt der Schriftrolle – fließend, kein 2-Spalten-Layout */}
        <div className="scene opacity-0 transition-all duration-800 translate-y-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0a4a7a] leading-tight mb-6"
            style={{ fontFamily: "'Caveat', cursive" }}>
            {t('landing.arc5.title')}
          </h2>
        </div>

        {/* Geschriebener Text – wie von Hand */}
        <div className="space-y-6">
          <div className="scene opacity-0 transition-all duration-800 translate-y-6">
            <p className="text-[#5a4a3a] text-lg md:text-xl leading-relaxed"
              style={{ fontFamily: "'Caveat', cursive" }}>
              {t('landing.arc5.subtitle')}
            </p>
          </div>

          <div className="scene opacity-0 transition-all duration-800 translate-y-6">
            <p className="text-[#7a6a5a] leading-relaxed">
              {t('landing.arc5.desc1')}
            </p>
          </div>

          {/* Kleine Illustration in der Rolle – eingebettet, nicht separiert */}
          <div className="scene opacity-0 transition-all duration-800 translate-y-6 flex justify-center py-4">
            <svg width="160" height="80" viewBox="0 0 300 150" fill="none" className="opacity-60">
              <path d="M60 110 Q80 80 100 90 Q130 60 160 90 Q180 80 200 110 Z" fill="#5a7a3a" />
              <path d="M100 90 L140 30 L180 90 Z" fill="#6a8a4a" />
              <path d="M135 40 L140 30 L145 40 Q140 44 135 40Z" fill="white" opacity="0.8" />
              <ellipse cx="80" cy="30" rx="20" ry="8" fill="white" opacity="0.3" />
              <ellipse cx="180" cy="20" rx="16" ry="6" fill="white" opacity="0.2" />
              <circle cx="50" cy="15" r="1.5" fill="#f5d742" opacity="0.5" />
              <circle cx="220" cy="12" r="1.5" fill="#f5d742" opacity="0.4" />
            </svg>
          </div>

          <div className="scene opacity-0 transition-all duration-800 translate-y-6">
            <p className="text-[#7a6a5a] leading-relaxed italic">
              {t('landing.arc5.desc2')}
            </p>
          </div>

          {/* Siegel – kein Button, ein Wachssiegel */}
          <div className="scene opacity-0 transition-all duration-800 translate-y-6 flex justify-center pt-4">
            <button onClick={() => navigate('/register')}
              className="group relative bg-gradient-to-br from-[#c44a3a] to-[#8b2a1a] text-white font-bold px-8 py-4 rounded-full text-lg transition-all hover:-translate-y-0.5 hover:shadow-xl flex items-center gap-2"
              style={{ boxShadow: '0 4px 0 #6a1a0a' }}>
              <span className="text-xl">📜</span>
              {t('landing.cta.button')}
            </button>
          </div>
        </div>
      </div>

      {/* Schriftrollen-Rolle unten */}
      <div className="absolute bottom-0 left-0 right-0 h-8 md:h-10">
        <div className="h-full bg-gradient-to-t from-[#c4a86a] to-[#a08850] rounded-t-full" />
        <div className="absolute left-3 bottom-0 w-4 h-full bg-gradient-to-r from-[#d4b86a] to-[#b49850] rounded-r-full" />
        <div className="absolute right-3 bottom-0 w-4 h-full bg-gradient-to-l from-[#d4b86a] to-[#b49850] rounded-l-full" />
      </div>
    </section>
  );
}

// ──────────────── FOOTER ────────────────

function GameFooter() {
  const { t, language, setLanguage } = usei18n();
  const navigate = useNavigate();
  const languages = ['de', 'en', 'zh-TW'] as const;
  const langLabels: Record<string, string> = { de: 'DE', en: 'EN', 'zh-TW': '中文' };

  return (
    <footer className="bg-[#0a1a2a] text-white/50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="19" fill="#0a4a7a" stroke="#f5d742" strokeWidth="1.5" />
              <path d="M20 6 C20 6 14 18 14 22 C14 26 16.5 30 20 30 C23.5 30 26 26 26 22 C26 18 20 6 20 6Z" fill="#f5d742" />
              <circle cx="20" cy="22" r="3" fill="#0a4a7a" />
            </svg>
            <span className="font-bold text-white text-sm">Insel 1o1</span>
          </div>
          <div className="flex gap-1">
            {languages.map((lang) => (
              <button key={lang} onClick={() => setLanguage(lang)}
                className={`text-xs px-2 py-1 rounded transition-all ${language === lang ? 'bg-[#f5d742] text-[#0a4a7a] font-bold' : 'text-white/50 hover:text-white'}`}>
                {langLabels[lang]}
              </button>
            ))}
          </div>
          <div className="flex gap-4 text-xs">
            <button onClick={() => navigate('/login')} className="hover:text-white transition-colors">{t('common.login')}</button>
            <button onClick={() => navigate('/register')} className="hover:text-white transition-colors">{t('common.register')}</button>
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
      <HarborScene />
      <WorldMapScene />
      <QuestBoardScene />
      <ChestSpillScene />
      <AncientScrollScene />
      <GameFooter />
    </div>
  );
}
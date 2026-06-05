'use client';

import React, { useEffect, useState, useRef } from 'react';
import { usei18n } from '@/contexts/i18nContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// ──────────────── Types ────────────────
interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// ──────────────── Hooks ────────────────
function useScrollReveal(threshold = 0.15) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );
    document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [threshold]);
}

function useParallax() {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      document.querySelectorAll<HTMLElement>('[data-parallax-speed]').forEach((el) => {
        const speed = parseFloat(el.dataset.parallaxSpeed || '0.2');
        el.style.transform = `translateY(${scrolled * speed}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}

// ──────────────── Components ────────────────
function ScrollReveal({ children, className = '', delay = 0 }: ScrollRevealProps) {
  return (
    <div
      className={`reveal-on-scroll ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ──────── Floating Decorations ────────
function FloatingCompass() {
  return (
    <div className="absolute pointer-events-none" style={{ top: '15%', right: '8%', animation: 'float 6s ease-in-out infinite' }}>
      <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-30 md:opacity-40">
        <circle cx="50" cy="50" r="45" stroke="#f5d742" strokeWidth="2" />
        <circle cx="50" cy="50" r="35" stroke="#f5d742" strokeWidth="1.5" strokeDasharray="4 4" />
        <polygon points="50,15 58,48 50,55 42,48" fill="#f5d742" opacity="0.6" />
        <polygon points="50,85 42,52 50,45 58,52" fill="#e8b830" opacity="0.6" />
        <line x1="50" y1="10" x2="50" y2="90" stroke="#f5d742" strokeWidth="1" opacity="0.3" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="#f5d742" strokeWidth="1" opacity="0.3" />
        <circle cx="50" cy="50" r="5" fill="#f5d742" />
      </svg>
    </div>
  );
}

function FloatingClouds() {
  return (
    <>
      <div className="absolute pointer-events-none opacity-20" style={{ top: '8%', left: '5%', animation: 'drift 20s ease-in-out infinite' }}>
        <svg width="120" height="60" viewBox="0 0 200 80" fill="white" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="60" cy="50" rx="50" ry="25" />
          <ellipse cx="100" cy="40" rx="60" ry="30" />
          <ellipse cx="140" cy="50" rx="45" ry="22" />
        </svg>
      </div>
      <div className="absolute pointer-events-none opacity-15" style={{ top: '20%', right: '15%', animation: 'drift 25s ease-in-out infinite 5s' }}>
        <svg width="100" height="50" viewBox="0 0 200 80" fill="white" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="60" cy="50" rx="50" ry="25" />
          <ellipse cx="100" cy="40" rx="60" ry="30" />
          <ellipse cx="140" cy="50" rx="45" ry="22" />
        </svg>
      </div>
    </>
  );
}

function WaveDivider({ color, flipped }: { color: string; flipped?: boolean }) {
  return (
    <div className="relative h-16 md:h-24 w-full overflow-hidden" style={{ transform: flipped ? 'scaleY(-1)' : 'none' }}>
      <svg
        viewBox="0 0 1440 120"
        className="absolute bottom-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          fill={color}
          d="M0,40 C240,100 480,0 720,40 C960,80 1200,0 1440,40 L1440,120 L0,120 Z"
        />
      </svg>
    </div>
  );
}

// ──────────────── Sections ────────────────

function Navbar() {
  const { t, language, setLanguage } = usei18n();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages = ['de', 'en', 'zh-TW'] as const;
  const langLabels: Record<string, string> = { de: 'DE', en: 'EN', 'zh-TW': '中文' };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="19" fill={scrolled ? '#0a4a7a' : 'white'} stroke={scrolled ? '#0a4a7a' : 'white'} strokeWidth="1.5" />
              <path d="M20 6 C20 6 14 18 14 22 C14 26 16.5 30 20 30 C23.5 30 26 26 26 22 C26 18 20 6 20 6Z" fill={scrolled ? '#f5d742' : '#f5d742'} />
              <circle cx="20" cy="22" r="3" fill={scrolled ? '#0a4a7a' : '#0a4a7a'} />
            </svg>
            <span className={`font-bold text-lg md:text-xl ${scrolled ? 'text-[#0a4a7a]' : 'text-white'}`}>
              Insel 1o1
            </span>
          </a>

          {/* Right side */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Language Switch */}
            <div className="flex gap-1">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`text-xs md:text-sm px-2 py-1 rounded transition-all ${
                    language === lang
                      ? scrolled ? 'bg-[#0a4a7a] text-white' : 'bg-white text-[#0a4a7a]'
                      : scrolled ? 'text-gray-500 hover:text-[#0a4a7a]' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {langLabels[lang]}
                </button>
              ))}
            </div>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-[#f5d742] hover:bg-[#e8c830] text-[#0a4a7a] font-bold px-4 py-2 md:px-6 md:py-2.5 rounded-full text-sm md:text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                {t('navigation.dashboard')}
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className={`font-semibold px-4 py-2 md:px-6 md:py-2.5 rounded-full text-sm md:text-base transition-all ${
                  scrolled
                    ? 'bg-[#0a4a7a] hover:bg-[#0d5a8a] text-white'
                    : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30'
                }`}
              >
                {t('common.login')}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  const { t } = usei18n();
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ocean Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a4a7a] via-[#1a6ba0] to-[#2a7ab0]" />

      {/* Ocean layer 2 */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0d5a8a]/80 to-transparent" />

      {/* Waves animation */}
      <div className="absolute bottom-0 left-0 right-0 h-32">
        <div className="wave wave-1" />
        <div className="wave wave-2" />
        <div className="wave wave-3" />
      </div>

      {/* Sun glowing */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-40 h-40 md:w-60 md:h-60 rounded-full bg-gradient-to-b from-[#f5d742]/60 to-[#f5d742]/10 blur-3xl" />

      {/* Clouds */}
      <FloatingClouds />

      {/* Compass */}
      <FloatingCompass />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="mb-6">
            <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-6">
              <circle cx="50" cy="50" r="48" stroke="#f5d742" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
              <circle cx="50" cy="50" r="38" stroke="#f5d742" strokeWidth="1" fill="none" />
              <polygon points="50,12 58,42 50,50 42,42" fill="#f5d742" />
              <polygon points="50,88 42,58 50,50 58,58" fill="#f5d742" opacity="0.7" />
              <circle cx="50" cy="50" r="6" fill="#f5d742" />
            </svg>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-4">
            <span className="text-white block">{t('landing.hero.title1')}</span>
            <span className="text-[#f5d742] block">{t('landing.hero.title2')}</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <p className="text-white/80 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed">
            {t('landing.hero.subtitle')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={450}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/register')}
              className="group bg-[#f5d742] hover:bg-[#e8c830] text-[#0a4a7a] font-bold px-8 py-3.5 md:px-10 md:py-4 rounded-full text-lg md:text-xl transition-all shadow-2xl hover:shadow-[#f5d742]/40 hover:-translate-y-1"
            >
              <span className="flex items-center gap-2">
                {t('landing.hero.cta')}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
            <button
              onClick={() => navigate('/login')}
              className="text-white/80 hover:text-white font-medium px-6 py-3 rounded-full border border-white/20 hover:border-white/40 transition-all"
            >
              {t('landing.hero.login')}
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* Decorative islands at bottom */}
      <div className="absolute bottom-20 left-0 right-0 flex justify-around px-10 pointer-events-none">
        <div className="w-16 h-8 md:w-24 md:h-12 bg-gradient-to-t from-[#2d5a27] to-[#4a8a3f] rounded-t-full opacity-60" style={{ animation: 'sway 8s ease-in-out infinite' }} />
        <div className="w-20 h-10 md:w-32 md:h-16 bg-gradient-to-t from-[#2d5a27] to-[#4a8a3f] rounded-t-full opacity-50" style={{ animation: 'sway 10s ease-in-out infinite 2s' }} />
        <div className="w-12 h-6 md:w-20 md:h-10 bg-gradient-to-t from-[#2d5a27] to-[#4a8a3f] rounded-t-full opacity-40" style={{ animation: 'sway 7s ease-in-out infinite 1s' }} />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
          <path d="M7 13L12 18L17 13" />
          <path d="M7 6L12 11L17 6" />
        </svg>
      </div>
    </section>
  );
}

function Arc1Section() {
  const { t } = usei18n();

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-[#f8f4e8] via-[#fdf8ef] to-[#f0e8d5]">
      {/* Map-like texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} 
      />

      {/* Decorative corner elements */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-[#c4a86a]/30 rounded-tl-xl" />
      <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-[#c4a86a]/30 rounded-tr-xl" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-[#c4a86a]/30 rounded-bl-xl" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-[#c4a86a]/30 rounded-br-xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left - Visual Story */}
          <ScrollReveal>
            <div className="relative">
              {/* Parchment-like illustration area */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[#e8dcc8] to-[#d4c4a8] shadow-2xl">
                {/* Map lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 250 Q120 100 200 150 T350 80" stroke="#8b7355" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" />
                  <path d="M80 200 Q150 80 250 120 T380 60" stroke="#8b7355" strokeWidth="1" strokeDasharray="4 3" opacity="0.3" />
                  {/* Compass rose on map */}
                  <circle cx="50" cy="50" r="25" stroke="#8b7355" strokeWidth="1" opacity="0.4" />
                  <polygon points="50,28 54,47 50,50 46,47" fill="#c4a86a" opacity="0.5" />
                  <polygon points="50,72 46,53 50,50 54,53" fill="#8b7355" opacity="0.5" />
                  {/* Island markers */}
                  <circle cx="120" cy="100" r="18" fill="#4a8a3f" opacity="0.5" />
                  <circle cx="120" cy="100" r="12" fill="#5a9a4f" opacity="0.6" />
                  <circle cx="280" cy="80" r="22" fill="#4a8a3f" opacity="0.4" />
                  <circle cx="280" cy="80" r="14" fill="#5a9a4f" opacity="0.5" />
                  <circle cx="200" cy="180" r="15" fill="#4a8a3f" opacity="0.45" />
                  <circle cx="200" cy="180" r="10" fill="#5a9a4f" opacity="0.55" />
                  {/* X marks */}
                  <text x="310" y="200" fontSize="24" fill="#c4a86a" opacity="0.4" fontFamily="serif">✕</text>
                  <text x="60" y="160" fontSize="18" fill="#c4a86a" opacity="0.3" fontFamily="serif">✕</text>
                  {/* Ship */}
                  <path d="M320 220 L340 240 L300 240 Z" fill="#8b7355" opacity="0.4" />
                  <line x1="320" y1="240" x2="320" y2="200" stroke="#8b7355" strokeWidth="1.5" opacity="0.4" />
                </svg>

                {/* Overlay text on map */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-lg md:text-2xl text-[#8b7355] opacity-40 select-none" style={{ fontFamily: "'Caveat', cursive" }}>
                    Here be dragons...
                  </span>
                </div>
              </div>

              {/* Decorative pin */}
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#c4a86a] shadow-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" fill="#fff" />
                </svg>
              </div>
            </div>
          </ScrollReveal>

          {/* Right - Text */}
          <ScrollReveal delay={200}>
            <div>
              <span className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-[#c4a86a] mb-3">
                {t('common.appName')}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0a4a7a] mb-6 leading-tight">
                {t('landing.arc1.title')}
              </h2>
              <p className="text-lg md:text-xl text-[#5a4a3a] mb-6 font-medium">
                {t('landing.arc1.subtitle')}
              </p>
              <p className="text-[#7a6a5a] mb-4 leading-relaxed">
                {t('landing.arc1.desc1')}
              </p>
              <p className="text-[#7a6a5a] mb-8 leading-relaxed">
                {t('landing.arc1.desc2')}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-[#e8dcc8]">
                    <div className="font-display text-2xl md:text-3xl font-black text-[#0a4a7a] mb-1">
                      {['50+', '200+', '3+'][i - 1]}
                    </div>
                    <div className="text-xs md:text-sm text-[#7a6a5a]">
                      {t(`landing.arc1.stat${i}`)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <WaveDivider color="#1a6ba0" />
    </section>
  );
}

function Arc2Section() {
  const { t } = usei18n();

  const islands = [
    { key: 'island1', color: '#4a8a3f', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
    { key: 'island2', color: '#3a7abf', icon: 'M3 5v14l8 5V10L3 5zM21 5v14l-8 5V10l8-5z' },
    { key: 'island3', color: '#c46a3a', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
    { key: 'island4', color: '#8b5a3a', icon: 'M4 6h16v12H4zM8 2v4M16 2v4' },
    { key: 'island5', color: '#c44a6a', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10V2z' },
    { key: 'island6', color: '#3a8a7a', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10V2z' },
  ];

  const islandEmojis = ['🌴', '🗣️', '🔬', '📜', '🎨', '🧭'];

  return (
    <section className="relative py-20 md:py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #1a6ba0 0%, #2a7ab0 40%, #3a8ac0 100%)' }}>
      {/* Subtle wave overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 50 Q25 30 50 50 T100 50\' stroke=\'white\' fill=\'none\' stroke-width=\'1\'/%3E%3C/svg%3E")',
        backgroundSize: '100px 100px',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-[#f5d742]/80 mb-3">
              {t('gamification.archipelago')}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              {t('landing.arc2.title')}
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              {t('landing.arc2.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Island grid - organic layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
          {islands.map((island, idx) => (
            <ScrollReveal key={island.key} delay={idx * 100}>
              <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 hover:bg-white/20 transition-all duration-500 cursor-pointer hover:-translate-y-2 border border-white/10 hover:border-white/30">
                {/* Island icon */}
                <div className="text-4xl md:text-5xl mb-4 transition-transform duration-500 group-hover:scale-110">
                  {islandEmojis[idx]}
                </div>

                {/* Island body shape */}
                <div className="w-full h-3 md:h-4 rounded-full mb-4 opacity-60" style={{ 
                  background: `linear-gradient(90deg, ${island.color}88, ${island.color}44)` 
                }} />

                <h3 className="font-display text-lg md:text-xl font-bold text-white mb-2">
                  {t(`landing.arc2.${island.key}`)}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {idx === 0 ? t('landing.arc2.desc1').substring(0, 60) + '...' : ''}
                </p>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                  background: `radial-gradient(circle at 50% 100%, ${island.color}33, transparent 70%)`,
                }} />
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={600}>
          <div className="text-center mt-12">
            <p className="text-white/50 text-sm italic">
              {t('landing.arc2.desc2')}
            </p>
          </div>
        </ScrollReveal>
      </div>

      <WaveDivider color="#f8f4e8" />
    </section>
  );
}

function Arc3Section() {
  const { t } = usei18n();

  const skills = [
    { key: 'skill1', emoji: '⚔️', color: '#c44a3a' },
    { key: 'skill2', emoji: '🏗️', color: '#3a8a4a' },
    { key: 'skill3', emoji: '⚡', color: '#c4a830' },
    { key: 'skill4', emoji: '🎯', color: '#3a6ac4' },
  ];

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-[#f8f4e8] via-[#f0e8d5] to-[#e8dcc8]">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(#8b7355 1px, transparent 1px), linear-gradient(90deg, #8b7355 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Text */}
          <ScrollReveal>
            <div>
              <span className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-[#c4a86a] mb-3">
                {t('landing.arc3.title')}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0a4a7a] mb-6 leading-tight">
                {t('landing.arc3.title')}
              </h2>
              <p className="text-lg md:text-xl text-[#5a4a3a] mb-6 font-medium">
                {t('landing.arc3.subtitle')}
              </p>
              <p className="text-[#7a6a5a] mb-4 leading-relaxed">
                {t('landing.arc3.desc1')}
              </p>
              <p className="text-[#7a6a5a] mb-8 leading-relaxed">
                {t('landing.arc3.desc2')}
              </p>
            </div>
          </ScrollReveal>

          {/* Right - Skills Display */}
          <ScrollReveal delay={200}>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, idx) => (
                <div key={skill.key} className="group bg-white rounded-2xl p-5 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[#e8dcc8]">
                  <div className="text-3xl md:text-4xl mb-3">{skill.emoji}</div>
                  <h4 className="font-display font-bold text-[#0a4a7a] text-base md:text-lg mb-2">
                    {t(`landing.arc3.${skill.key}`)}
                  </h4>
                  <div className="w-8 h-1 rounded-full transition-all duration-300 group-hover:w-12" style={{ background: skill.color }} />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      <WaveDivider color="#1a6ba0" />
    </section>
  );
}

function Arc4Section() {
  const { t } = usei18n();

  const rewards = [
    { key: 'reward1', emoji: '⭐', color: '#f5d742' },
    { key: 'reward2', emoji: '🏅', color: '#c4a86a' },
    { key: 'reward3', emoji: '🔥', color: '#e86a3a' },
    { key: 'reward4', emoji: '💎', color: '#3a8ac4' },
  ];

  return (
    <section className="relative py-20 md:py-32 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a2a4a 0%, #1a3a5a 30%, #0d5a8a 70%, #1a6ba0 100%)' }}>
      {/* Treasure particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-xl md:text-2xl"
            style={{
              left: `${10 + (i * 8) % 80}%`,
              top: `${5 + (i * 13) % 90}%`,
              animation: `twinkle ${2 + (i % 3)}s ease-in-out infinite ${i * 0.3}s`,
              opacity: 0.3,
            }}
          >
            {['✨', '💫', '🌟', '💎'][i % 4]}
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-[#f5d742]/80 mb-3">
              {t('gamification.achievements.title')}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              {t('landing.arc4.title')}
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              {t('landing.arc4.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {rewards.map((reward, idx) => (
            <ScrollReveal key={reward.key} delay={idx * 100}>
              <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 border border-white/10 hover:border-white/30">
                <div className="text-4xl md:text-5xl mb-4 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
                  {reward.emoji}
                </div>
                <h4 className="font-display font-bold text-white text-base md:text-lg mb-2">
                  {t(`landing.arc4.${reward.key}`)}
                </h4>
                <div className="w-8 h-1 mx-auto rounded-full mt-3" style={{ background: reward.color }} />
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400}>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 max-w-3xl mx-auto border border-white/10">
            <p className="text-white/80 leading-relaxed mb-4">
              {t('landing.arc4.desc1')}
            </p>
            <p className="text-white/60 leading-relaxed">
              {t('landing.arc4.desc2')}
            </p>
          </div>
        </ScrollReveal>
      </div>

      <WaveDivider color="#f8f4e8" />
    </section>
  );
}

function Arc5Section() {
  const { t } = usei18n();

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-[#f8f4e8] via-[#f0e8d5] to-[#e0d4b8]">
      {/* Mystical fog */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-10" style={{
          background: 'radial-gradient(ellipse at 70% 50%, #c4a86a, transparent 60%)',
        }} />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-[#c4a86a]/10 blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-[#8b7355]/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left - Mystical island visual */}
          <ScrollReveal>
            <div className="relative">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Glow */}
                <div className="absolute inset-0 rounded-full bg-[#c4a86a]/20 blur-2xl animate-pulse" />
                
                {/* Mountain island */}
                <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-xl" fill="none">
                  {/* Water reflection */}
                  <ellipse cx="150" cy="250" rx="130" ry="30" fill="#c4a86a" opacity="0.1" />
                  
                  {/* Island base */}
                  <path d="M60 240 Q90 200 120 210 Q150 180 180 210 Q210 200 240 240 Z" fill="#5a7a3a" />
                  
                  {/* Mountain */}
                  <path d="M100 220 L150 80 L200 220 Z" fill="#6a8a4a" />
                  <path d="M130 220 L150 110 L180 220 Z" fill="#7a9a5a" />
                  
                  {/* Snow cap */}
                  <path d="M145 90 L150 80 L155 90 Q150 95 145 90Z" fill="white" opacity="0.8" />
                  
                  {/* Trees */}
                  <circle cx="90" cy="225" r="12" fill="#4a7a3a" />
                  <circle cx="95" cy="220" r="9" fill="#5a8a4a" />
                  <circle cx="200" cy="228" r="10" fill="#4a7a3a" />
                  <circle cx="205" cy="224" r="7" fill="#5a8a4a" />
                  
                  {/* Clouds around */}
                  <ellipse cx="120" cy="60" rx="30" ry="12" fill="white" opacity="0.4" />
                  <ellipse cx="200" cy="45" rx="25" ry="10" fill="white" opacity="0.3" />
                  
                  {/* Stars */}
                  <circle cx="60" cy="30" r="2" fill="#f5d742" opacity="0.6" />
                  <circle cx="240" cy="25" r="2" fill="#f5d742" opacity="0.5" />
                  <circle cx="150" cy="15" r="2" fill="#f5d742" opacity="0.7" />
                  <circle cx="100" cy="50" r="1.5" fill="#f5d742" opacity="0.4" />
                  <circle cx="220" cy="60" r="1.5" fill="#f5d742" opacity="0.3" />
                </svg>

                {/* Badge */}
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-[#f5d742] to-[#c4a86a] rounded-xl p-3 md:p-4 shadow-2xl">
                  <div className="text-center">
                    <div className="text-lg md:text-2xl font-black text-[#0a2a4a]">
                      {t('landing.arc5.finalBadge')}
                    </div>
                    <div className="text-xs text-[#0a2a4a]/60 mt-1">
                      {t('landing.arc5.finalDesc')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right text */}
          <ScrollReveal delay={200}>
            <div>
              <span className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-[#c4a86a] mb-3">
                {t('gamification.boss')}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0a4a7a] mb-6 leading-tight">
                {t('landing.arc5.title')}
              </h2>
              <p className="text-lg md:text-xl text-[#5a4a3a] mb-6 font-medium">
                {t('landing.arc5.subtitle')}
              </p>
              <p className="text-[#7a6a5a] mb-4 leading-relaxed">
                {t('landing.arc5.desc1')}
              </p>
              <p className="text-[#7a6a5a] mb-8 leading-relaxed italic">
                {t('landing.arc5.desc2')}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <WaveDivider color="#1a6ba0" />
    </section>
  );
}

function FeaturesSection() {
  const { t } = usei18n();

  const features = [
    { key: 'feature1', icon: '🎮' },
    { key: 'feature2', icon: '🧭' },
    { key: 'feature3', icon: '🏆' },
    { key: 'feature4', icon: '🌍' },
  ];

  return (
    <section className="relative py-20 md:py-32 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a2a4a 0%, #1a4a6a 50%, #0d5a8a 100%)' }}>
      {/* Wave background */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 Q50 80 100 100 T200 100' stroke='white' fill='none' stroke-width='1'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 100px',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              {t('landing.features.title')}
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              {t('landing.features.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {features.map((feature, idx) => (
            <ScrollReveal key={feature.key} delay={idx * 100}>
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 border border-white/10 hover:border-white/30">
                <div className="flex gap-4 md:gap-6 items-start">
                  <div className="text-3xl md:text-4xl shrink-0">{feature.icon}</div>
                  <div>
                    <h3 className="font-display text-lg md:text-xl font-bold text-white mb-2">
                      {t(`landing.features.${feature.key}Title`)}
                    </h3>
                    <p className="text-white/60 leading-relaxed text-sm md:text-base">
                      {t(`landing.features.${feature.key}Desc`)}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <WaveDivider color="#f8f4e8" />
    </section>
  );
}

function CtaSection() {
  const { t } = usei18n();
  const navigate = useNavigate();

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5d742] via-[#e8c830] to-[#d4b420]" />

      {/* Decorative compass */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full border border-[#0a4a7a]/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full border border-[#0a4a7a]/5" />
        
        {/* Ship silhouette */}
        <svg className="absolute bottom-10 left-10 w-32 h-32 md:w-48 md:h-48 opacity-10" viewBox="0 0 200 200" fill="none">
          <path d="M60 140 L100 80 L140 140 Z" fill="#0a4a7a" />
          <rect x="95" y="80" width="10" height="60" fill="#0a4a7a" />
          <path d="M100 85 L130 100 L100 95Z" fill="#0a4a7a" />
          <path d="M40 140 L160 140 L180 160 L20 160 Z" fill="#0a4a7a" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <ScrollReveal>
          <div className="mb-6">
            <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
              <circle cx="50" cy="50" r="48" stroke="#0a4a7a" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
              <circle cx="50" cy="50" r="38" stroke="#0a4a7a" strokeWidth="1" fill="none" />
              <polygon points="50,12 58,42 50,50 42,42" fill="#0a4a7a" />
              <polygon points="50,88 42,58 50,50 58,58" fill="#0a4a7a" opacity="0.7" />
              <circle cx="50" cy="50" r="6" fill="#0a4a7a" />
            </svg>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-[#0a4a7a] mb-6 leading-tight">
            {t('landing.cta.title')}
          </h2>
          <p className="text-lg md:text-xl text-[#0a4a7a]/70 max-w-2xl mx-auto mb-10">
            {t('landing.cta.subtitle')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/register')}
              className="group bg-[#0a4a7a] hover:bg-[#0d5a8a] text-white font-bold px-8 py-3.5 md:px-10 md:py-4 rounded-full text-lg md:text-xl transition-all shadow-2xl hover:shadow-[#0a4a7a]/40 hover:-translate-y-1"
            >
              <span className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h12M12 5l7 7-7 7"/>
                </svg>
                {t('landing.cta.button')}
              </span>
            </button>
            <button
              onClick={() => navigate('/login')}
              className="text-[#0a4a7a]/80 hover:text-[#0a4a7a] font-medium px-6 py-3 rounded-full border border-[#0a4a7a]/30 hover:border-[#0a4a7a]/60 transition-all"
            >
              {t('landing.cta.login')}
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = usei18n();

  return (
    <footer className="bg-[#0a1a2a] text-white/60 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="19" fill="#0a4a7a" stroke="#f5d742" strokeWidth="1.5" />
                <path d="M20 6 C20 6 14 18 14 22 C14 26 16.5 30 20 30 C23.5 30 26 26 26 22 C26 18 20 6 20 6Z" fill="#f5d742" />
                <circle cx="20" cy="22" r="3" fill="#0a4a7a" />
              </svg>
              <span className="font-bold text-white">Insel 1o1</span>
            </div>
            <p className="text-sm leading-relaxed">
              {t('landing.hero.subtitle')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-white mb-4">{t('landing.footer.about')}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">{t('landing.footer.about')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('landing.footer.contact')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('landing.footer.privacy')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('landing.footer.terms')}</a></li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <h4 className="font-semibold text-white mb-4">{t('gamification.archipelago')}</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><span className="text-xs">🌴</span> {t('landing.arc2.island1')}</li>
              <li className="flex items-center gap-2"><span className="text-xs">🗣️</span> {t('landing.arc2.island2')}</li>
              <li className="flex items-center gap-2"><span className="text-xs">🔬</span> {t('landing.arc2.island3')}</li>
              <li className="flex items-center gap-2"><span className="text-xs">📜</span> {t('landing.arc2.island4')}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm">
          <p>{t('landing.footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}

// ──────────────── Main Landing Page ────────────────

export default function LandingPage() {
  useScrollReveal();
  useParallax();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <Arc1Section />
      <Arc2Section />
      <Arc3Section />
      <Arc4Section />
      <Arc5Section />
      <FeaturesSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
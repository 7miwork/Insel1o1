'use client';

import React, { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usei18n } from '@/contexts/i18nContext';
import Link from 'next/link';

interface GameLayoutProps {
  children: ReactNode;
  xp?: number;
  level?: number;
  streak?: number;
}

export default function GameLayout({ children, xp = 0, level = 1, streak = 0 }: GameLayoutProps) {
  const { user, logout } = useAuth();
  const { t, language, setLanguage } = usei18n();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e8f4f2] via-[#cfe8e3] to-[#6bb7c9]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#c5ddd8]/60 bg-[#fafdfc]/80 backdrop-blur-md shadow-sm">
        <div className="mx-auto max-w-7xl px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link
              href="/world"
              className="text-lg font-bold tracking-wide text-[#1a6b6b] transition-colors hover:text-[#145c5c]"
            >
              <span className="inline-flex items-center gap-2">
                <span className="text-2xl">🗺️</span>
                <span className="font-semibold">Insel 1o1</span>
              </span>
            </Link>
            {/* Navigation links */}
            <nav className="hidden md:inline-flex items-center gap-6" aria-label="Main navigation">
              <Link
                href="/world"
                className="text-sm font-medium text-[#3d7a78] transition-colors hover:text-[#1a6b6b]"
              >
                World Map
              </Link>
              <Link
                href="/archipelago"
                className="text-sm font-medium text-[#3d7a78] transition-colors hover:text-[#1a6b6b]"
              >
                Archipelago
              </Link>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-[#3d7a78] transition-colors hover:text-[#1a6b6b]"
              >
                Dashboard
              </Link>
            </nav>
          </div>

          {/* Stats Bar */}
          <div className="hidden items-center gap-3 sm:flex">
            <div className="flex items-center gap-2 rounded-xl border border-[#e8d3a2]/80 bg-[#fefaf3] px-3 py-1.5 shadow-sm">
              <span className="text-sm">⭐</span>
              <span className="text-sm font-semibold text-[#8b6d2e]">{xp} XP</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-[#b8ddd5]/80 bg-[#f0faf8] px-3 py-1.5 shadow-sm">
              <span className="text-sm">📊</span>
              <span className="text-sm font-semibold text-[#2a6b68]">Lvl {level}</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-[#f3d5b8]/80 bg-[#fffaf5] px-3 py-1.5 shadow-sm">
              <span className="text-sm">🔥</span>
              <span className="text-sm font-semibold text-[#9b6b3d]">{streak} day</span>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-2.5">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'de' | 'zh-TW')}
              className="rounded-lg border border-[#b8ddd5]/80 bg-white/85 px-2.5 py-1.5 text-xs font-medium text-[#2a6b68] transition-colors hover:border-[#8fc5bc]"
            >
              <option value="en">EN</option>
              <option value="de">DE</option>
              <option value="zh-TW">中文</option>
            </select>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-[#f0c6c6] bg-[#fef5f5] px-3 py-1.5 text-xs font-medium text-[#b03d3d] transition-colors hover:bg-[#fce8e8] hover:border-[#e8a8a8]"
            >
              {t('common.logout')}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-5 py-8 md:px-6 md:py-10">{children}</main>

      {/* Footer */}
      <footer className="mt-16 border-t border-[#c5ddd8]/50 bg-[#fafdfc]/60 py-7 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-[#5a8a87]/75">
          <p className="leading-relaxed">
            Welcome, {user?.firstName || 'Explorer'}! Continue your journey across the islands.
          </p>
        </div>
      </footer>
    </div>
  );
}

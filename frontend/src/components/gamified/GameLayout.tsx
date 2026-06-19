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
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #d4e9f7 0%, #6bb7c9 40%, #4aa3b5 70%, #398a9c 100%)' }}>
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-md border-b border-teal-200/60 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/world" className="text-xl font-bold text-teal-800 hover:text-teal-600 transition-colors">
              <span className="flex items-center gap-2">
                <span className="text-2xl">🗺️</span>
                <span>Insel 1o1</span>
              </span>
            </Link>
            {/* Navigation links */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/world" className="text-sm font-medium text-teal-700 hover:text-teal-500 transition-colors">
                World Map
              </Link>
              <Link href="/archipelago" className="text-sm font-medium text-teal-700 hover:text-teal-500 transition-colors">
                Archipelago
              </Link>
              <Link href="/dashboard" className="text-sm font-medium text-teal-700 hover:text-teal-500 transition-colors">
                Dashboard
              </Link>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200/60">
              <span className="text-amber-500 text-sm">⭐</span>
              <span className="text-sm font-semibold text-amber-800">{xp} XP</span>
            </div>
            <div className="flex items-center gap-1.5 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200/60">
              <span className="text-teal-500 text-sm">📊</span>
              <span className="text-sm font-semibold text-teal-800">Lvl {level}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-200/60">
              <span className="text-orange-500 text-sm">🔥</span>
              <span className="text-sm font-semibold text-orange-800">{streak} day</span>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'de' | 'zh-TW')}
              className="px-2.5 py-1.5 bg-white/80 text-teal-800 rounded-lg border border-teal-200 text-xs font-medium"
            >
              <option value="en">EN</option>
              <option value="de">DE</option>
              <option value="zh-TW">中文</option>
            </select>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg border border-red-200 text-xs font-medium transition-colors"
            >
              {t('common.logout')}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-white/40 backdrop-blur-sm border-t border-teal-200/40 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-teal-700/70 text-sm">
          <p>Welcome, {user?.firstName || 'Explorer'}! Continue your journey across the islands.</p>
        </div>
      </footer>
    </div>
  );
}
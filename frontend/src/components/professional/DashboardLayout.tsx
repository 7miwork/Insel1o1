'use client';

import React, { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usei18n } from '@/contexts/i18nContext';
import { Link } from 'react-router-dom';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const { t, language, setLanguage } = usei18n();

  const handleLogout = async () => {
    await logout();
  };

  const navigationItems = [
    { label: t('navigation.dashboard'), href: '/dashboard' },
    { label: t('navigation.courses'), href: '/courses' },
    { label: t('navigation.parentDashboard'), href: '/dashboard/parent' },
    { label: t('navigation.profile'), href: '/profile' },
    { label: t('navigation.settings'), href: '/settings' },
    { label: t('navigation.about'), href: '/about' },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-b from-[#f5faf9] via-[#e8f4f2] to-[#d4ebe6]">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-[#b8ddd5]/60 bg-[#fafdfc]/90 shadow-sm transition-all duration-300">
        {/* Brand */}
        <div className="p-5 border-b border-[#b8ddd5]/50">
          <h1 className="text-lg font-bold text-[#1a4a48]">{t('common.appName')}</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-3">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-xl px-4 py-2.5 text-sm font-medium text-[#3d7a78] transition-all hover:bg-[#e8f4f2] hover:text-[#1a4a48]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom: language + logout */}
        <div className="space-y-2 border-t border-[#b8ddd5]/50 p-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'de' | 'zh-TW')}
            className="w-full rounded-lg border border-[#b8ddd5]/80 bg-white/90 px-3 py-2 text-sm text-[#2a5a58] transition-colors hover:border-[#8fc5bc]"
          >
            <option value="en">English</option>
            <option value="de">Deutsch</option>
            <option value="zh-TW">繁體中文</option>
          </select>
          <button
            onClick={handleLogout}
            className="w-full rounded-xl border border-[#f0c6c6]/90 bg-[#fef5f5] px-4 py-2 text-sm font-medium text-[#b03d3d] transition-colors hover:bg-[#fce8e8] hover:border-[#e8a8a8]"
          >
            {t('common.logout')}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-[#b8ddd5]/60 bg-[#fafdfc]/70 px-6 py-4 shadow-sm backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-[#1a4a48]">{title || t('navigation.dashboard')}</h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#5a8a87]">{user?.email}</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#b8ddd5]/80 bg-white/80 text-sm font-semibold text-[#2a5a58] shadow-sm">
                {user?.firstName?.charAt(0) || 'E'}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
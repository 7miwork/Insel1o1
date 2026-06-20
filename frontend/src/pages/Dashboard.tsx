'use client';

import React from 'react';
import DashboardLayout from '@/components/professional/DashboardLayout';
import { usei18n } from '@/contexts/i18nContext';

export default function DashboardPage() {
  const { t } = usei18n();

  return (
    <DashboardLayout title={t('gamification.title')}>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="overflow-hidden rounded-3xl border border-[#b8ddd5]/60 bg-[#fafdfc] p-8 shadow-[0_2px_20px_rgba(13,148,136,0.05)] backdrop-blur-sm">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#1a4a48] md:text-3xl">{t('gamification.title')}</h2>
            <p className="mx-auto mt-2 text-sm text-[#5a8a87]">Welcome back, Explorer</p>
            <button
              className="mt-5 rounded-xl bg-[#0d9488] px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#115e59] hover:shadow-md"
            >
              {t('gamification.continueAdventure')}
            </button>
          </div>
        </div>

        {/* Current Voyage */}
        <div className="overflow-hidden rounded-3xl border border-[#b8ddd5]/60 bg-[#fafdfc] p-8 shadow-[0_2px_20px_rgba(13,148,136,0.05)] backdrop-blur-sm">
          <h3 className="mb-4 text-lg font-semibold text-[#1a4a48]">{t('gamification.currentVoyage')}</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#b8ddd5]/70 bg-white/80 p-4 shadow-sm">
              <span className="text-xs font-medium text-[#5a8a87]">{t('gamification.currentIsland')}</span>
              <p className="mt-1 text-sm font-semibold text-[#22383a]">{t('gamification.currentIsland')}</p>
            </div>
            <div className="rounded-2xl border border-[#b8ddd5]/70 bg-white/80 p-4 shadow-sm">
              <span className="text-xs font-medium text-[#5a8a87]">{t('gamification.nextIsland')}</span>
              <p className="mt-1 text-sm font-semibold text-[#22383a]">{t('gamification.nextIsland')}</p>
            </div>
            <div className="rounded-2xl border border-[#b8ddd5]/70 bg-white/80 p-4 shadow-sm">
              <span className="text-xs font-medium text-[#5a8a87]">{t('gamification.progress')}</span>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#e8f0ef]">
                <div className="h-2 rounded-full bg-gradient-to-r from-[#5eead4] to-[#14b8a6]" style={{ width: '78%' }} />
              </div>
              <p className="mt-1 text-xs text-[#8a9e9d]">{t('gamification.timeLeft')}</p>
            </div>
          </div>
        </div>

        {/* Motivation */}
        <div className="text-center">
          <p className="text-base italic text-[#5a8a87]">{t('gamification.motivation')}</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
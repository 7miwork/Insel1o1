'use client';

import React from 'react';
import DashboardLayout from '@/components/professional/DashboardLayout';
import { usei18n } from '@/contexts/i18nContext';

export default function DashboardPage() {
  const { t } = usei18n();

  return (
    <DashboardLayout title={t('gamification.title')}>
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t('gamification.title')}
          </h2>
          <button
            className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition transform hover:scale-105"
          >
            {t('gamification.continueAdventure')}
          </button>
        </div>

        {/* Current Voyage */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {t('gamification.currentVoyage')}
          </h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="bg-gray-200 p-3 rounded">
              <span className="font-medium">{t('gamification.currentIsland')}</span>
              <p className="text-sm text-gray-600">{t('gamification.currentIsland')}</p>
            </div>
            <div className="bg-gray-200 p-3 rounded">
              <span className="font-medium">{t('gamification.nextIsland')}</span>
              <p className="text-sm text-gray-600">{t('gamification.nextIsland')}</p>
            </div>
            <div className="bg-gray-200 p-3 rounded flex items-center">
              <span className="font-medium">{t('gamification.progress')}</span>
              <div className="w-full bg-gray-300 rounded h-2 mt-1">
                <div className="h-2 bg-amber-500 rounded" style={{ width: '78%' }}></div>
              </div>
              <p className="text-xs text-gray-500">({t('gamification.timeLeft')})</p>
            </div>
          </div>
        </div>

        {/* Motivation */}
        <div className="text-center mt-6">
          <p className="text-lg text-gray-700 italic">{t('gamification.motivation')}</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
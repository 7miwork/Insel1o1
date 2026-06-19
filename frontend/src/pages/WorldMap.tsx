'use client';

import React from 'react';
import GameLayout from '@/components/gamified/GameLayout';
import { usei18n } from '@/contexts/i18nContext';
import { useNavigate } from 'react-router-dom';

interface Region {
  id: number;
  name: string;
  slug: string;
  description: string;
  totalIslands: number;
  completedIslands: number;
  progress: number;
  color: string;
  waterColor: string;
  accent: string;
  gridPosition: { col: number; row: number };
}

const regions: Region[] = [
  {
    id: 1,
    name: 'Mathematics Kingdom',
    slug: 'mathematics-kingdom',
    description: 'Master the fundamentals of mathematics',
    totalIslands: 3,
    completedIslands: 1,
    progress: 33,
    color: '#e8d3a2',
    waterColor: '#6bb7c9',
    accent: '#fbbf24',
    gridPosition: { col: 2, row: 1 },
  },
  {
    id: 2,
    name: 'English Literature',
    slug: 'english-literature',
    description: 'Explore the world of literature',
    totalIslands: 2,
    completedIslands: 0,
    progress: 15,
    color: '#d4a574',
    waterColor: '#5faebb',
    accent: '#d4a574',
    gridPosition: { col: 4, row: 1 },
  },
  {
    id: 3,
    name: 'Minecraft Education',
    slug: 'minecraft-education',
    description: 'Learn with block-based adventures',
    totalIslands: 2,
    completedIslands: 0,
    progress: 0,
    color: '#7cc46c',
    waterColor: '#5faebb',
    accent: '#3c8c40',
    gridPosition: { col: 1, row: 2 },
  },
  {
    id: 4,
    name: 'Python Island',
    slug: 'python',
    description: 'Master the Python programming language',
    totalIslands: 2,
    completedIslands: 0,
    progress: 0,
    color: '#e8d3a2',
    waterColor: '#6bb7c9',
    accent: '#6dd5ed',
    gridPosition: { col: 3, row: 2 },
  },
  {
    id: 5,
    name: 'Scratch Islands',
    slug: 'scratch',
    description: 'Build creative projects with visual blocks',
    totalIslands: 1,
    completedIslands: 0,
    progress: 0,
    color: '#e8d3a2',
    waterColor: '#6bb7c9',
    accent: '#f59e0b',
    gridPosition: { col: 5, row: 2 },
  },
  {
    id: 6,
    name: 'Computer Science',
    slug: 'computer-science',
    description: 'Explore the fundamentals of computing',
    totalIslands: 1,
    completedIslands: 0,
    progress: 0,
    color: '#6fbf73',
    waterColor: '#5faebb',
    accent: '#3b82f6',
    gridPosition: { col: 2, row: 3 },
  },
];

export default function WorldMapPage() {
  const { t } = usei18n();
  const navigate = useNavigate();

  const handleRegionClick = (slug: string) => {
    navigate(`/archipelago?course=${slug}`);
  };

  return (
    <GameLayout xp={2450} level={5} streak={12}>
      {/* World Map Container */}
      <div className="relative rounded-2xl bg-white/80 backdrop-blur-sm border border-teal-200/60 p-6 md:p-10 shadow-lg overflow-hidden">
        {/* Ocean decorative elements */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <svg className="w-full h-full">
            <defs>
              <pattern id="wave-pattern" x="0" y="0" width="120" height="24" patternUnits="userSpaceOnUse">
                <path d="M0,12 Q30,0 60,12 Q90,24 120,12" stroke="#5eead4" strokeWidth="1" fill="none"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wave-pattern)"/>
          </svg>
        </div>

        {/* Decorative elements */}
        <img src="/assets/images/islands/backgrounds/compass.svg" alt="" className="absolute top-6 right-6 w-20 h-20 opacity-25 pointer-events-none" />
        <img src="/assets/images/islands/backgrounds/clouds.svg" alt="" className="absolute top-4 left-4 w-56 h-12 opacity-40 pointer-events-none" />
        <img src="/assets/images/islands/backgrounds/clouds.svg" alt="" className="absolute top-10 right-24 w-40 h-8 opacity-30 pointer-events-none" />

        {/* Header */}
        <div className="relative mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-teal-900 mb-3 tracking-tight">
            World of Islands
          </h1>
          <p className="text-base md:text-lg text-teal-700/80 max-w-2xl mx-auto leading-relaxed">
            A vast archipelago of knowledge awaits. Choose your region and begin your adventure across the islands of learning.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-amber-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:block relative">
          <div className="grid grid-cols-5 gap-5 auto-rows-[180px]">
            {regions.map((region) => {
              const isActive = region.progress > 0 && region.progress < 100;
              const isCompleted = region.progress === 100;
              const isLocked = region.progress === 0 && region.id > 2;

              return (
                <button
                  key={region.id}
                  onClick={() => handleRegionClick(region.slug)}
                  className="relative group focus:outline-none"
                  style={{
                    gridColumn: `${region.gridPosition.col} / span 2`,
                    gridRow: `${region.gridPosition.row}`,
                  }}
                >
                  <div
                    className={`relative w-full h-full rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                      isCompleted
                        ? 'border-amber-300 bg-gradient-to-br from-amber-50/90 to-white/90 shadow-sm'
                        : isActive
                        ? 'border-teal-300 bg-gradient-to-br from-teal-50/90 to-white/90 shadow-sm'
                        : 'border-slate-200 bg-white/50'
                    } ${isLocked ? 'opacity-55' : 'hover:shadow-md hover:-translate-y-0.5'}`}
                  >
                    {/* SVG island preview */}
                    <div className="absolute inset-0 opacity-20">
                      <img
                        src={`/assets/images/islands/${region.slug}/island-1.svg`}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/images/islands/fallback/island-placeholder.svg';
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-4 h-full flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-base font-bold text-slate-800 leading-tight">{region.name}</h3>
                          <p className="text-xs text-slate-500 mt-0.5 leading-snug line-clamp-1">{region.description}</p>
                        </div>
                        <span className="flex-shrink-0 text-base">
                          {isCompleted ? '🏆' : isLocked ? '🔒' : isActive ? '⚓' : ''}
                        </span>
                      </div>

                      {!isLocked && (
                        <div>
                          <div className="flex justify-between text-xs text-slate-600 mb-1">
                            <span>{isCompleted ? 'Completed' : `${region.completedIslands}/${region.totalIslands} islands`}</span>
                            <span className="font-semibold">{region.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-1.5">
                            <div
                              className="h-1.5 rounded-full transition-all duration-500"
                              style={{
                                width: `${region.progress}%`,
                                background: isCompleted
                                  ? 'linear-gradient(90deg, #fbbf24, #f59e0b)'
                                  : 'linear-gradient(90deg, #5eead4, #14b8a6)',
                              }}
                            />
                          </div>
                        </div>
                      )}
                      {isLocked && (
                        <p className="text-xs text-slate-400 italic">Complete previous regions</p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tablet: 2-column compact */}
        <div className="hidden sm:block md:hidden relative">
          <div className="grid grid-cols-2 gap-4">
            {regions.map((region, index) => {
              const isActive = region.progress > 0 && region.progress < 100;
              const isCompleted = region.progress === 100;
              const isLocked = region.progress === 0 && index > 1;

              return (
                <button
                  key={region.id}
                  onClick={() => handleRegionClick(region.slug)}
                  className={`relative rounded-xl border-2 p-4 text-left transition-all ${
                    isCompleted
                      ? 'border-amber-300 bg-gradient-to-br from-amber-50/90 to-white/90'
                      : isActive
                      ? 'border-teal-300 bg-gradient-to-br from-teal-50/90 to-white/90'
                      : 'border-slate-200 bg-white/50'
                  } ${isLocked ? 'opacity-55' : 'hover:shadow-md'}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-bold text-slate-800">{region.name}</h3>
                    <span>{isCompleted ? '🏆' : isLocked ? '🔒' : isActive ? '⚓' : ''}</span>
                  </div>
                  {!isLocked && (
                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full transition-all" style={{
                        width: `${region.progress}%`,
                        background: isCompleted ? 'linear-gradient(90deg, #fbbf24, #f59e0b)' : 'linear-gradient(90deg, #5eead4, #14b8a6)',
                      }} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile: Vertical journey */}
        <div className="sm:hidden relative flex flex-col gap-5">
          <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-300 via-amber-200 to-slate-300 rounded-full" />

          {regions.map((region, index) => {
            const isActive = region.progress > 0 && region.progress < 100;
            const isCompleted = region.progress === 100;
            const isLocked = region.progress === 0 && index > 1;

            return (
              <button
                key={region.id}
                onClick={() => handleRegionClick(region.slug)}
                className="relative flex items-start gap-4 text-left group"
              >
                {/* Travel marker */}
                <div
                  className="relative z-10 w-[38px] h-[38px] rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  style={{
                    borderColor: isCompleted ? '#fbbf24' : isActive ? '#14b8a6' : '#cbd5e1',
                    backgroundColor: isCompleted ? '#fef3c7' : isActive ? '#ccfbf1' : '#f1f5f9',
                  }}
                >
                  <span className="text-sm">{isLocked ? '🔒' : isCompleted ? '🏆' : '⚓'}</span>
                </div>

                {/* Card */}
                <div className="flex-1 min-w-0">
                  <div className={`rounded-lg border p-3 ${
                    isCompleted
                      ? 'border-amber-200 bg-amber-50/60'
                      : isActive
                      ? 'border-teal-200 bg-teal-50/60'
                      : 'border-slate-200 bg-white/60'
                  } ${isLocked ? 'opacity-55' : ''}`}>
                    <h3 className="text-sm font-bold text-slate-800 truncate">{region.name}</h3>
                    {!isLocked && (
                      <div className="mt-2 w-full bg-slate-200 rounded-full h-1">
                        <div className="h-1 rounded-full" style={{
                          width: `${region.progress}%`,
                          background: isCompleted ? 'linear-gradient(90deg, #fbbf24, #f59e0b)' : 'linear-gradient(90deg, #5eead4, #14b8a6)',
                        }} />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom decorative elements */}
        <div className="relative mt-8 flex items-center justify-center gap-4">
          <img src="/assets/images/islands/backgrounds/rocks.svg" alt="" className="h-8 opacity-40" />
          <div className="text-xs text-teal-500/60 italic">Chart your own course</div>
          <img src="/assets/images/islands/backgrounds/boat.svg" alt="" className="h-8 opacity-40" />
        </div>
      </div>
    </GameLayout>
  );
}
'use client';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameLayout from '@/components/gamified/GameLayout';
import { usei18n } from '@/contexts/i18nContext';

interface Region {
  id: number;
  name: string;
  slug: string;
  description: string;
  totalIslands: number;
  completedIslands: number;
  progress: number;
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
      <div className="relative overflow-hidden rounded-3xl border border-[#b8ddd5]/60 bg-[#fafdfc]/80 px-5 py-8 shadow-[0_2px_20px_rgba(13,148,136,0.05)] backdrop-blur-sm md:px-10 md:py-12">
        {/* Ocean decorative elements */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <svg className="h-full w-full" aria-hidden="true">
            <defs>
              <pattern id="wave-pattern" x="0" y="0" width="120" height="24" patternUnits="userSpaceOnUse">
                <path d="M0,12 Q30,0 60,12 Q90,24 120,12" stroke="#5eead4" strokeWidth="1" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wave-pattern)" />
          </svg>
        </div>

        {/* Decorative elements */}
        <img src="/assets/images/islands/backgrounds/compass.svg" alt="" className="decor-float pointer-events-none absolute right-6 top-6 h-16 w-16 opacity-30 md:h-20 md:w-20" />
        <img src="/assets/images/islands/backgrounds/clouds.svg" alt="" className="decor-drift pointer-events-none absolute left-6 top-4 h-10 w-44 opacity-30" />
        <img src="/assets/images/islands/backgrounds/clouds.svg" alt="" className="pointer-events-none absolute right-24 top-10 h-8 w-40 opacity-25" />

        {/* Header */}
        <div className="relative mb-12 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#7aaba6]">
            Your Learning Journey
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-[#1a4a48] md:text-5xl">
            World of Islands
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#4a7a78] md:text-lg">
            A vast archipelago of knowledge awaits. Choose your region and begin your adventure across the islands
            of learning.
          </p>
          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-[#5eead4] via-[#8fc5bc] to-[#e8d3a2]" />
        </div>

        {/* Desktop Grid */}
        <div className="relative hidden md:block">
          <div className="grid grid-cols-5 auto-rows-[175px] gap-5">
            {regions.map((region) => {
              const isActive = region.progress > 0 && region.progress < 100;
              const isCompleted = region.progress === 100;
              const isLocked = region.progress === 0 && region.id > 2;

              return (
                <button key={region.id} onClick={() => handleRegionClick(region.slug)} className="group relative focus:outline-none" style={{
                    gridColumn: `${region.gridPosition.col} / span 2`,
                    gridRow: `${region.gridPosition.row}`,
                  }}>
                  <div
                    className={`relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border transition-all duration-300 ${
                      isCompleted
                        ? 'border-[#f0d78c] bg-gradient-to-br from-[#fffbf2] to-white shadow-[0_2px_12px_rgba(251,191,36,0.12)]'
                        : isActive
                        ? 'border-[#8fd6ce] bg-gradient-to-br from-[#f2fbfa] to-white shadow-[0_2px_12px_rgba(13,148,136,0.10)]'
                        : 'border-[#e2e8f0] bg-white/70'
                    } ${isLocked ? 'opacity-50' : 'hover:-translate-y-0.5 hover:shadow-lg'}`}
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-15">
                      <img src={`/assets/images/islands/${region.slug}/island-1.svg`} alt="" className="h-full w-full object-cover" onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/images/islands/fallback/island-placeholder.svg';
                        }} />
                    </div>

                    <div className="relative z-10 flex h-full flex-col justify-between p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-base font-semibold leading-snug text-[#22383a]">{region.name}</h3>
                          <p className="mt-1 line-clamp-1 text-xs leading-relaxed text-[#647a79]">{region.description}</p>
                        </div>
                        <span className="flex-shrink-0 text-lg">
                          {isCompleted ? '🏆' : isLocked ? '🔒' : isActive ? '⚓' : ''}
                        </span>
                      </div>

                      {!isLocked && (
                        <div>
                          <div className="mb-1.5 flex items-center justify-between text-xs text-[#5a7a78]">
                            <span className="font-medium">
                              {isCompleted ? 'Completed' : `${region.completedIslands}/${region.totalIslands} islands`}
                            </span>
                            <span className="font-semibold text-[#2a5a58]">{region.progress}%</span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e8f0ef]">
                            <div className="h-1.5 rounded-full transition-all duration-500" style={{
                                width: `${region.progress}%`,
                                background: isCompleted ? 'linear-gradient(90deg, #fbbf24, #f59e0b)' : 'linear-gradient(90deg, #5eead4, #14b8a6)',
                              }} />
                          </div>
                        </div>
                      )}
                      {isLocked && <p className="text-xs italic text-[#8a9e9d]">Complete previous regions</p>}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tablet: 2-column compact */}
        <div className="relative hidden sm:block md:hidden">
          <div className="grid grid-cols-2 gap-4">
            {regions.map((region, index) => {
              const isActive = region.progress > 0 && region.progress < 100;
              const isCompleted = region.progress === 100;
              const isLocked = region.progress === 0 && index > 1;

              return (
                <button key={region.id} onClick={() => handleRegionClick(region.slug)} className={`relative rounded-2xl border p-4 text-left transition-all duration-300 ${
                    isCompleted ? 'border-[#f0d78c] bg-gradient-to-br from-[#fffbf2] to-white shadow-sm' : isActive ? 'border-[#8fd6ce] bg-gradient-to-br from-[#f2fbfa] to-white shadow-sm' : 'border-[#e2e8f0] bg-white/70'
                  } ${isLocked ? 'opacity-50' : 'hover:-translate-y-0.5 hover:shadow-md'}`}>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-[#22383a]">{region.name}</h3>
                    <span className="text-base">
                      {isCompleted ? '🏆' : isLocked ? '🔒' : isActive ? '⚓' : ''}
                    </span>
                  </div>

                  {!isLocked && (
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#e8f0ef]">
                      <div className="h-1.5 rounded-full transition-all duration-500" style={{
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
        <div className="relative flex flex-col gap-6 sm:hidden">
          <div className="absolute left-[18px] top-2 bottom-2 w-0.5 rounded-full bg-gradient-to-b from-[#8fc5bc] via-[#e8d3a2] to-[#c8d8d6]" />

          {regions.map((region, index) => {
            const isActive = region.progress > 0 && region.progress < 100;
            const isCompleted = region.progress === 100;
            const isLocked = region.progress === 0 && index > 1;

            return (
              <button key={region.id} onClick={() => handleRegionClick(region.slug)} className="relative flex items-start gap-4 text-left group">
                <div
                  className="relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border-2"
                  style={{
                    borderColor: isCompleted ? '#fbbf24' : isActive ? '#14b8a6' : '#cbd5e1',
                    backgroundColor: isCompleted ? '#fef9ee' : isActive ? '#f0fdfc' : '#f8fafc',
                  }}
                >
                  <span className="text-sm">{isLocked ? '🔒' : isCompleted ? '🏆' : '⚓'}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div
                    className={`rounded-2xl border p-3.5 transition-all duration-300 ${
                      isCompleted
                        ? 'border-[#f0d78c] bg-gradient-to-br from-[#fffbf2] to-white'
                        : isActive
                        ? 'border-[#8fd6ce] bg-gradient-to-br from-[#f2fbfa] to-white'
                        : 'border-[#e2e8f0] bg-white/70'
                    } ${isLocked ? 'opacity-50' : ''}`}
                  >
                    <h3 className="text-sm font-semibold text-[#22383a] truncate">{region.name}</h3>
                    {!isLocked && (
                      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[#e8f0ef]">
                        <div className="h-1 rounded-full transition-all duration-500" style={{
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
          <img src="/assets/images/islands/backgrounds/rocks.svg" alt="" className="decor-float h-7 opacity-40" />
          <p className="text-xs italic text-[#7aaba6]/80">Chart your own course</p>
          <img src="/assets/images/islands/backgrounds/boat.svg" alt="" className="decor-float h-7 opacity-40" style={{ animationDelay: '1.5s' }} />
        </div>
      </div>
    </GameLayout>
  );
}
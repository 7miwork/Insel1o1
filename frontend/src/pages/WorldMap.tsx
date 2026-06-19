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

function VoyagePath({ from, to }: { from: Region; to: Region }) {
  const colDiff = to.gridPosition.col - from.gridPosition.col;
  const rowDiff = to.gridPosition.row - from.gridPosition.row;
  const centerX = from.gridPosition.col < to.gridPosition.col ? 'right' : 'left';

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      {colDiff > 0 && rowDiff === 0 && (
        <path
          d={`M ${from.gridPosition.col * 200 + 150} ${from.gridPosition.row * 220 + 110} Q ${(from.gridPosition.col + to.gridPosition.col) * 100 + 100} ${from.gridPosition.row * 220 + 40} ${to.gridPosition.col * 200 + 50} ${to.gridPosition.row * 220 + 110}`}
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="6 4"
          strokeLinecap="round"
        />
      )}
      {rowDiff > 0 && colDiff === 0 && (
        <path
          d={`M ${from.gridPosition.col * 200 + 100} ${from.gridPosition.row * 220 + 170} L ${from.gridPosition.col * 200 + 100} ${from.gridPosition.row * 220 + 130}`}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 3"
        />
      )}
    </svg>
  );
}

export default function WorldMapPage() {
  const { t } = usei18n();
  const navigate = useNavigate();

  const handleRegionClick = (slug: string) => {
    window.location.hash = `/archipelago?course=${slug}`;
    navigate(`/archipelago?course=${slug}`);
  };

  return (
    <GameLayout xp={2450} level={5} streak={12}>
      {/* World Map Container */}
      <div className="relative rounded-3xl border-2 border-amber-400/30 bg-gradient-to-br from-teal-700/40 via-cyan-800/30 to-teal-900/40 p-8 backdrop-blur-sm shadow-2xl overflow-hidden">
        {/* Ocean background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-teal-800/50 to-transparent" />
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <defs>
              <pattern id="waves" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
                <path d="M0,10 Q25,0 50,10 Q75,20 100,10" stroke="#5eead4" strokeWidth="1.5" fill="none" opacity="0.6"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#waves)"/>
          </svg>
          {/* Compass rose */}
          <img src="/assets/images/islands/backgrounds/compass.svg" alt="" className="absolute top-12 right-12 w-28 h-28 opacity-40" />
          {/* Clouds */}
          <img src="/assets/images/islands/backgrounds/clouds.svg" alt="" className="absolute top-8 left-8 w-72 h-16 opacity-50" />
          <img src="/assets/images/islands/backgrounds/clouds.svg" alt="" className="absolute top-20 right-32 w-56 h-12 opacity-40" />
          {/* Boat */}
          <img src="/assets/images/islands/backgrounds/boat.svg" alt="" className="absolute bottom-12 left-16 w-28 h-16 opacity-60" />
          {/* Rocks */}
          <img src="/assets/images/islands/backgrounds/rocks.svg" alt="" className="absolute bottom-8 right-12 w-40 h-14 opacity-50" />
        </div>

        {/* Header */}
        <div className="relative z-10 text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-bold mb-4"
              style={{
                background: 'linear-gradient(135deg, #5eead4, #fbbf24, #5eead4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 4px 30px rgba(94,234,212,0.3)',
              }}>
            🌍 World of Islands
          </h1>
          <p className="text-xl text-teal-50/80 max-w-3xl mx-auto leading-relaxed">
            A vast archipelago of knowledge awaits. Choose your region and begin your adventure across the islands of learning.
          </p>
        </div>

        {/* Desktop: Grid World Map */}
        <div className="hidden md:block relative z-10">
          <div className="grid grid-cols-5 gap-6 auto-rows-[200px]">
            {regions.map((region) => {
              const isActive = region.progress > 0;
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
                    className={`relative w-full h-full rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                      isCompleted
                        ? 'border-amber-400 shadow-amber-500/40'
                        : isActive
                        ? 'border-teal-400 shadow-teal-500/30'
                        : 'border-slate-500/40 opacity-60'
                    } ${isLocked ? 'grayscale' : 'hover:scale-105 hover:shadow-xl'}`}
                    style={{
                      background: `linear-gradient(135deg, ${region.waterColor}40, ${region.color}60)`,
                    }}
                  >
                    {/* Region background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-black/10" />

                    {/* SVG island preview */}
                    <div className="absolute inset-0 opacity-30">
                      <img
                        src={`/assets/images/islands/${region.slug}/island-1.svg`}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/images/islands/fallback/island-placeholder.svg';
                        }}
                      />
                    </div>

                    {/* Content overlay */}
                    <div className="relative z-10 p-5 h-full flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <h3 className="text-2xl font-bold text-white drop-shadow-lg">{region.name}</h3>
                        {isCompleted && <span className="text-2xl text-amber-400">✔</span>}
                        {isLocked && <span className="text-2xl text-slate-300">🔒</span>}
                        {isActive && !isCompleted && <span className="text-teal-300 text-xl">⚓</span>}
                      </div>

                      <div>
                        {/* Progress bar */}
                        {!isLocked && (
                          <div className="mb-2">
                            <div className="flex justify-between text-xs text-white/70 mb-1">
                              <span>{isCompleted ? 'Completed' : `${region.completedIslands}/${region.totalIslands} islands`}</span>
                              <span>{region.progress}%</span>
                            </div>
                            <div className="w-full bg-black/30 rounded-full h-2">
                              <div
                                className="h-2 rounded-full transition-all"
                                style={{
                                  width: `${region.progress}%`,
                                  background: isCompleted
                                    ? 'linear-gradient(90deg, #fbbf24, #f59e0b)'
                                    : 'linear-gradient(90deg, #5eead4, #2dd4bf)',
                                }}
                              />
                            </div>
                          </div>
                        )}
                        {isLocked && (
                          <p className="text-xs text-slate-300">Complete previous regions</p>
                        )}
                      </div>
                    </div>

                    {/* Locked overlay */}
                    {isLocked && (
                      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-4xl">🔒</span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile: Vertical list */}
        <div className="md:hidden relative z-10 flex flex-col gap-6">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-400/60 via-amber-400/60 to-slate-500/60" />

          {regions.map((region, index) => {
            const isActive = region.progress > 0;
            const isCompleted = region.progress === 100;
            const isLocked = region.progress === 0 && index > 1;

            return (
              <button
                key={region.id}
                onClick={() => handleRegionClick(region.slug)}
                className="relative flex items-center gap-4 text-left group focus:outline-none"
              >
                {/* Travel marker */}
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-full border-[3px] flex items-center justify-center shadow-xl"
                    style={{
                      borderColor: isCompleted ? '#fbbf24' : isActive ? '#5eead4' : '#64748b',
                      backgroundColor: isCompleted ? '#fef3c7' : isActive ? '#0d9488' : '#334155',
                    }}
                  >
                    {isLocked ? <span className="text-lg">🔒</span> : isCompleted ? <span className="text-lg">✔</span> : <span className="text-lg">⚓</span>}
                  </div>
                </div>

                {/* Region card */}
                <div
                  className={`flex-1 rounded-xl border-2 p-4 transition-all ${
                    isCompleted
                      ? 'border-amber-400 bg-gradient-to-r from-amber-50/80 to-white/90'
                      : isActive
                      ? 'border-teal-400 bg-gradient-to-r from-teal-50/80 to-white/90'
                      : 'border-slate-400/50 bg-slate-100/50 opacity-60'
                  } ${isLocked ? 'grayscale' : ''}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-800">{region.name}</h3>
                    <span className="text-xs text-slate-500">{region.totalIslands} islands</span>
                  </div>
                  {!isLocked && (
                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${region.progress}%`,
                          background: isCompleted
                            ? 'linear-gradient(90deg, #fbbf24, #f59e0b)'
                            : 'linear-gradient(90deg, #5eead4, #2dd4bf)',
                        }}
                      />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </GameLayout>
  );
}
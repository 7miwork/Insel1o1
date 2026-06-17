'use client';

import React, { useState } from 'react';
import GameLayout from '@/components/gamified/GameLayout';
import IslandVisual from '@/components/gamified/IslandVisual';
import { usei18n } from '@/contexts/i18nContext';
import Link from 'next/link';

interface Island {
  id: number;
  name: string;
  progress: number;
  locked: boolean;
  lessons: number;
  courseSlug?: string;
}

interface Archipelago {
  id: number;
  name: string;
  description: string;
  islands: Island[];
}

function toCourseSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

function getIslandStatus(island: Island, index: number, islands: Island[]): 'completed' | 'current' | 'locked' | 'upcoming' {
  if (island.progress === 100) return 'completed';
  if (index === 0 && island.progress > 0 && !island.locked) return 'current';
  if (!island.locked && island.progress > 0) {
    const prev = islands[index - 1];
    if (prev && prev.progress === 100) return 'current';
  }
  return island.locked ? 'locked' : 'upcoming';
}

/** Hand-drawn style voyage path SVG */
function VoyagePath({
  startX,
  startY,
  endX,
  endY,
  status,
  color,
}: {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  status: 'completed' | 'current' | 'locked';
  color: string;
}) {
  const midX = (startX + endX) / 2;
  const midY = Math.min(startY, endY) - 60;

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} preserveAspectRatio="none">
      <path
        d={`M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`}
        stroke={color}
        strokeWidth="4"
        fill="none"
        strokeDasharray={status === 'locked' ? '8 6' : '0'}
        strokeLinecap="round"
        opacity={status === 'locked' ? 0.35 : 0.85}
      />
      {status !== 'locked' && (
        <circle cx={midX} cy={midY} r="5" fill={color} opacity="0.9" />
      )}
    </svg>
  );
}

/** Explorer flag for current island */
function ExplorerFlag() {
  return (
    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}>
      <svg width="32" height="32" viewBox="0 0 32 32">
        <path d="M8,28 L8,8 L24,14 L8,20 Z" fill="#fbbf24" stroke="#b45309" stroke-width="1.5" strokeLinejoin="round"/>
        <circle cx="8" cy="28" r="3" fill="#b45309"/>
      </svg>
    </div>
  );
}

export default function ArchipelagoPage() {
  const { t } = usei18n();
  const [archipelagos] = useState<Archipelago[]>([
    {
      id: 1,
      name: 'Mathematics Kingdom',
      description: 'Master the fundamentals of mathematics',
      islands: [
        { id: 1, name: 'Algebra Island', progress: 100, locked: false, lessons: 5 },
        { id: 2, name: 'Geometry Island', progress: 60, locked: false, lessons: 6 },
        { id: 3, name: 'Calculus Island', progress: 0, locked: true, lessons: 8 },
      ],
    },
    {
      id: 2,
      name: 'English Literature',
      description: 'Explore the world of literature',
      islands: [
        { id: 4, name: 'Poetry Island', progress: 80, locked: false, lessons: 4 },
        { id: 5, name: 'Novel Island', progress: 30, locked: false, lessons: 7 },
      ],
    },
  ]);

  return (
    <GameLayout xp={2450} level={5} streak={12}>
      <div className="space-y-16">
        {/* World header */}
        <div className="relative text-center mb-16">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
            <img src="/assets/images/islands/backgrounds/compass.svg" alt="" className="w-48 h-48" />
          </div>
          <h1 className="relative text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-amber-200 to-teal-300 mb-6"
              style={{ textShadow: '0 4px 20px rgba(20,184,166,0.3)' }}>
            {t('gamification.archipelago')}
          </h1>
          <p className="relative text-xl text-teal-50/90 max-w-2xl mx-auto leading-relaxed">
            Chart your course through the islands of knowledge. Each island holds new adventures and treasures.
          </p>
        </div>

        {archipelagos.map((archipelago) => (
          <div
            key={archipelago.id}
            className="relative rounded-3xl border-2 border-teal-400/40 bg-gradient-to-br from-teal-800/30 via-amber-900/20 to-teal-900/40 p-6 md:p-10 backdrop-blur-sm shadow-2xl overflow-hidden"
          >
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
              <img src="/assets/images/islands/backgrounds/ocean-waves.svg" alt="" className="absolute bottom-0 left-0 right-0 w-full h-32 opacity-40" />
              <img src="/assets/images/islands/backgrounds/clouds.svg" alt="" className="absolute top-8 left-8 w-64 h-16 opacity-60" />
              <img src="/assets/images/islands/backgrounds/clouds.svg" alt="" className="absolute top-12 right-12 w-48 h-12 opacity-50" />
              <img src="/assets/images/islands/backgrounds/rocks.svg" alt="" className="absolute bottom-6 left-6 w-32 h-12 opacity-70" />
              <img src="/assets/images/islands/backgrounds/rocks.svg" alt="" className="absolute bottom-8 right-8 w-40 h-14 opacity-60" />
              <img src="/assets/images/islands/backgrounds/boat.svg" alt="" className="absolute bottom-16 right-16 w-24 h-14 opacity-50" />
            </div>

            <div className="relative z-10">
              {/* Archipelago title */}
              <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 flex items-center justify-center gap-4">
                  <span className="text-3xl">🏝️</span>
                  {archipelago.name}
                </h2>
                <p className="text-teal-100/80 text-lg max-w-xl mx-auto">{archipelago.description}</p>
              </div>

              {/* Map container */}
              <div className="relative">
                {/* Desktop: horizontal adventure route */}
                <div className="hidden md:grid grid-cols-3 gap-10 relative items-center">
                  {archipelago.islands.map((island, index) => {
                    const status = getIslandStatus(island, index, archipelago.islands);
                    const nextIsland = archipelago.islands[index + 1];
                    const pathStatus = nextIsland
                      ? getIslandStatus(nextIsland, index + 1, archipelago.islands) === 'locked'
                        ? 'locked'
                        : status === 'completed'
                        ? 'completed'
                        : 'current'
                      : 'locked';

                    const pathColor = pathStatus === 'completed' ? '#fbbf24' : pathStatus === 'current' ? '#5eead4' : '#64748b';

                    return (
                      <div key={island.id} className="relative">
                        {/* Voyage path connector */}
                        {nextIsland && (
                          <div className="absolute top-1/2 -right-5 w-10 h-10 z-20">
                            <VoyagePath
                              startX={0}
                              startY={20}
                              endX={40}
                              endY={20}
                              status={pathStatus}
                              color={pathColor}
                            />
                          </div>
                        )}

                        {/* Island card */}
                        <div className={`relative ${status === 'current' ? 'scale-110' : ''}`}>
                          {status === 'current' && <ExplorerFlag />}
                          <IslandCard island={island} status={status} courseSlug={toCourseSlug(archipelago.name)} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Mobile: vertical journey */}
                <div className="md:hidden flex flex-col gap-8 relative">
                  {/* Vertical voyage path */}
                  <div className="absolute left-7 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400/60 via-amber-400/60 to-slate-500/60" />

                  {archipelago.islands.map((island, index) => {
                    const status = getIslandStatus(island, index, archipelago.islands);
                    const nextIsland = archipelago.islands[index + 1];
                    const pathStatus = nextIsland
                      ? getIslandStatus(nextIsland, index + 1, archipelago.islands) === 'locked'
                        ? 'locked'
                        : status === 'completed'
                        ? 'completed'
                        : 'current'
                      : 'locked';

                    const pathColor = pathStatus === 'completed' ? '#fbbf24' : pathStatus === 'current' ? '#5eead4' : '#64748b';

                    return (
                      <div key={island.id} className="relative flex items-start gap-6">
                        {/* Travel marker */}
                        <div className="relative z-10 flex flex-col items-center pt-2">
                          <div
                            className="w-14 h-14 rounded-full border-[3px] flex items-center justify-center shadow-xl"
                            style={{
                              borderColor: pathColor,
                              backgroundColor: status === 'completed' ? '#fef3c7' : status === 'current' ? '#0d9488' : '#334155',
                            }}
                          >
                            {status === 'locked' ? <span className="text-lg">🔒</span> : <span className="text-lg">⚓</span>}
                          </div>
                          {/* Voyage path continuation */}
                          {nextIsland && (
                            <div className="absolute left-1/2 top-full w-1 h-8 -translate-x-1/2">
                              <svg viewBox="0 0 10 32" className="w-full h-full">
                                <path
                                  d="M5,0 Q8,16 5,32"
                                  stroke={pathColor}
                                  strokeWidth="3"
                                  fill="none"
                                  strokeDasharray={pathStatus === 'locked' ? '4 3' : '0'}
                                  opacity={pathStatus === 'locked' ? 0.5 : 0.8}
                                />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Island card */}
                        <div className={`flex-1 ${status === 'current' ? 'scale-105' : ''}`}>
                          {status === 'current' && <ExplorerFlag />}
                          <IslandCard island={island} status={status} courseSlug={toCourseSlug(archipelago.name)} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GameLayout>
  );
}

/** Reusable island card with adventure-map styling */
function IslandCard({
  island,
  status,
  courseSlug,
}: {
  island: Island;
  status: 'completed' | 'current' | 'locked' | 'upcoming';
  courseSlug: string;
}) {
  const baseClasses = 'relative overflow-hidden rounded-2xl border-2 transition-all duration-300';

  const stateClasses = {
    completed: 'border-amber-400 bg-gradient-to-br from-amber-50/90 to-yellow-100/90 shadow-amber-500/40',
    current: 'border-teal-400 bg-gradient-to-br from-teal-50/95 to-cyan-50/90 shadow-teal-500/50 scale-105 shadow-2xl',
    locked: 'border-slate-500/50 bg-slate-200/50 opacity-60 grayscale',
    upcoming: 'border-teal-300/60 bg-white/80 shadow-slate-400/20',
  };

  const hoverClasses = !island.locked && status !== 'locked' ? 'hover:scale-105 hover:shadow-xl' : '';

  return (
    <div className={`${baseClasses} ${stateClasses[status]} ${hoverClasses}`}>
      {/* Island visual - larger */}
      <div className="relative w-full h-40 overflow-hidden rounded-t-xl">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: status === 'locked'
              ? 'linear-gradient(to bottom, rgba(100,116,139,0.4), rgba(71,85,105,0.6))'
              : 'none',
          }}
        />
        <IslandVisual
          course={courseSlug}
          lesson={island.id}
          alt={island.name}
          className="w-full h-full object-cover"
          width={400}
          height={320}
        />
        {island.locked && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
            <div className="text-center">
              <span className="text-4xl mb-2 block">🔒</span>
              <p className="text-xs text-slate-200 font-medium">Complete previous island</p>
            </div>
          </div>
        )}
        {status === 'current' && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-teal-500 text-white text-xs font-bold rounded-full shadow-lg">
            CURRENT
          </div>
        )}
      </div>

      {/* Card content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
          {status === 'completed' && <span className="text-amber-500 text-2xl">✔</span>}
          {status === 'current' && <span className="text-teal-600 text-xl">⚑</span>}
          {island.name}
        </h3>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className={
              status === 'completed'
                ? 'text-amber-700 font-medium'
                : status === 'current'
                ? 'text-teal-700 font-medium'
                : 'text-slate-500'
            }>
              {island.progress === 100 ? 'Completed' : 'Progress'}
            </span>
            <span className="text-slate-700 font-bold">{island.progress}%</span>
          </div>
          <div
            className="w-full rounded-full h-3"
            style={{
              backgroundColor: status === 'completed' ? 'rgba(251,191,36,0.3)' : status === 'current' ? 'rgba(20,184,166,0.2)' : 'rgba(100,116,139,0.2)',
            }}
          >
            <div
              className="h-3 rounded-full transition-all"
              style={{
                width: `${island.progress}%`,
                background:
                  status === 'completed'
                    ? 'linear-gradient(90deg, #fbbf24, #f59e0b)'
                    : status === 'current'
                    ? 'linear-gradient(90deg, #5eead4, #2dd4bf)'
                    : 'linear-gradient(90deg, #94a3b8, #64748b)',
              }}
            />
          </div>
        </div>

        {/* Lessons count */}
        <p className="text-sm text-slate-600 mb-5">
          {island.lessons} {t('gamification.mission')}s
        </p>

        {/* Action button */}
        {!island.locked && (
          <button
            className={`w-full px-5 py-3 rounded-xl text-base font-bold transition-all ${
              status === 'completed'
                ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/30'
                : status === 'current'
                ? 'bg-teal-500 text-white hover:bg-teal-600 shadow-lg shadow-teal-500/40'
                : 'bg-slate-400 text-white hover:bg-slate-500'
            }`}
          >
            {status === 'completed' ? '✔ Completed' : 'Continue'}
          </button>
        )}

        {island.locked && (
          <div className="w-full px-5 py-3 bg-slate-300/50 text-slate-500 rounded-xl text-sm text-center border border-slate-400/30 font-medium">
            Locked
          </div>
        )}
      </div>
    </div>
  );
}
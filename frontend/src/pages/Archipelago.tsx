'use client';

import React, { useState } from 'react';
import GameLayout from '@/components/gamified/GameLayout';
import IslandVisual from '@/components/gamified/IslandVisual';
import { usei18n } from '@/contexts/i18nContext';

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

function getIslandStatus(
  island: Island,
  index: number,
  islands: Island[]
): 'completed' | 'current' | 'locked' | 'upcoming' {
  if (island.progress === 100) return 'completed';
  if (index === 0 && island.progress > 0 && !island.locked) return 'current';
  if (!island.locked && island.progress > 0) {
    const prev = islands[index - 1];
    if (prev && prev.progress === 100) return 'current';
  }
  return island.locked ? 'locked' : 'upcoming';
}

/** Premium explorer flag */
function ExplorerFlag() {
  return (
    <div className="absolute -top-3 -right-1 z-20" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
      <svg width="24" height="28" viewBox="0 0 24 28">
        <path d="M6,22 L6,6 L18,11 L6,16 Z" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="6" cy="22" r="2.5" fill="#b45309"/>
      </svg>
    </div>
  );
}

/** Voyage path connector */
function VoyagePath({
  status,
}: {
  status: 'completed' | 'current' | 'locked';
}) {
  const color = status === 'completed' ? '#fbbf24' : status === 'current' ? '#5eead4' : '#cbd5e1';

  return (
    <div className="flex items-center justify-center py-2">
      <svg width="60" height="20" viewBox="0 0 60 20">
        <path
          d="M2,10 Q15,0 30,10 Q45,20 58,10"
          stroke={color}
          strokeWidth="2.5"
          fill="none"
          strokeDasharray={status === 'locked' ? '5 4' : '0'}
          strokeLinecap="round"
          opacity={status === 'locked' ? 0.5 : 0.7}
        />
        {status !== 'locked' && (
          <circle cx="30" cy="10" r="3" fill={color} opacity="0.8"/>
        )}
      </svg>
    </div>
  );
}

/** Island card component */
function IslandCard({
  island,
  status,
  courseSlug,
  t,
}: {
  island: Island;
  status: 'completed' | 'current' | 'locked' | 'upcoming';
  courseSlug: string;
  t: (key: string) => string;
}) {
  const isLocked = island.locked || status === 'locked';

  return (
    <div
      className={`relative rounded-xl border-2 transition-all duration-300 overflow-hidden ${
        status === 'completed'
          ? 'border-amber-300 bg-gradient-to-br from-amber-50/90 to-white/90 shadow-sm'
          : status === 'current'
          ? 'border-teal-300 bg-gradient-to-br from-teal-50/95 to-white/95 shadow-md scale-[1.04]'
          : isLocked
          ? 'border-slate-200 bg-white/50 opacity-55'
          : 'border-slate-200 bg-white/80 hover:shadow-sm hover:-translate-y-0.5'
      }`}
    >
      {/* Island SVG */}
      <div className="relative w-full h-36 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: isLocked
              ? 'linear-gradient(to bottom, rgba(148,163,184,0.3), rgba(148,163,184,0.5))'
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

        {/* State overlays */}
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-[2px]">
            <div className="flex flex-col items-center gap-1">
              <span className="text-3xl">🔒</span>
              <span className="text-xs text-slate-500 font-medium">Locked</span>
            </div>
          </div>
        )}
        {status === 'current' && (
          <div className="absolute top-2 left-2 px-2.5 py-0.5 bg-teal-500/90 text-white text-xs font-semibold rounded-full shadow-sm backdrop-blur-sm">
            Active
          </div>
        )}
        {status === 'completed' && (
          <div className="absolute top-2 left-2 px-2.5 py-0.5 bg-amber-500/90 text-white text-xs font-semibold rounded-full shadow-sm backdrop-blur-sm flex items-center gap-1">
            <span>✔</span> Done
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4">
        <h3 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
          {status === 'completed' && <span className="text-amber-500 text-lg">🏆</span>}
          {status === 'current' && <span className="text-teal-600 text-sm">⚑</span>}
          {island.name}
        </h3>

        {/* Progress */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>{status === 'completed' ? 'Completed' : 'Progress'}</span>
            <span className="font-semibold text-slate-700">{island.progress}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{
                width: `${island.progress}%`,
                background:
                  status === 'completed'
                    ? 'linear-gradient(90deg, #fbbf24, #f59e0b)'
                    : status === 'current'
                    ? 'linear-gradient(90deg, #5eead4, #14b8a6)'
                    : 'linear-gradient(90deg, #94a3b8, #64748b)',
              }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {island.lessons} {t('gamification.mission')}s
          </p>
        </div>

        {/* Action */}
        {!isLocked && (
          <button
            className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all ${
              status === 'completed'
                ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-sm'
                : status === 'current'
                ? 'bg-teal-500 text-white hover:bg-teal-600 shadow-sm'
                : 'bg-slate-300 text-white hover:bg-slate-400'
            }`}
          >
            {status === 'completed' ? '✔ Completed' : 'Continue Learning'}
          </button>
        )}
        {isLocked && (
          <div className="w-full py-2.5 bg-slate-100 text-slate-400 rounded-lg text-xs text-center border border-slate-200 font-medium">
            Complete previous lesson
          </div>
        )}
      </div>
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
      <div className="space-y-12">
        {/* Page header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-teal-900 mb-3 tracking-tight">
            Archipelago
          </h1>
          <p className="text-base md:text-lg text-teal-700/80 max-w-2xl mx-auto leading-relaxed">
            Chart your course through the islands of knowledge. Each island holds new adventures and discoveries.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-amber-400 mx-auto mt-4 rounded-full" />
        </div>

        {archipelagos.map((archipelago) => {
          const courseSlug = toCourseSlug(archipelago.name);

          return (
            <div key={archipelago.id}>
              {/* Region heading */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-white/80 border border-teal-200/60 flex items-center justify-center text-lg shadow-sm">
                  🏝️
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-teal-900">{archipelago.name}</h2>
                  <p className="text-sm text-teal-600/70">{archipelago.description}</p>
                </div>
              </div>

              {/* Desktop: horizontal island route */}
              <div className="hidden md:block bg-white/60 backdrop-blur-sm rounded-xl border border-teal-200/50 p-8 shadow-sm">
                <div className="flex items-start justify-center gap-2">
                  {archipelago.islands.map((island, index) => {
                    const status = getIslandStatus(island, index, archipelago.islands);
                    const nextIsland = archipelago.islands[index + 1];
                    const nextStatus = nextIsland
                      ? getIslandStatus(nextIsland, index + 1, archipelago.islands)
                      : 'locked';

                    return (
                      <React.Fragment key={island.id}>
                        <div className="flex-1 max-w-xs relative">
                          {status === 'current' && <ExplorerFlag />}
                          <IslandCard island={island} status={status} courseSlug={courseSlug} t={t} />
                        </div>
                        {nextIsland && (
                          <div className="flex-shrink-0 pt-16">
                            <VoyagePath
                              status={
                                nextStatus === 'locked'
                                  ? 'locked'
                                  : status === 'completed'
                                  ? 'completed'
                                  : 'current'
                              }
                            />
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Mobile: vertical island route */}
              <div className="md:hidden bg-white/60 backdrop-blur-sm rounded-xl border border-teal-200/50 p-5 shadow-sm">
                <div className="relative flex flex-col items-center">
                  <div className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-300 via-amber-200 to-slate-200 rounded-full" />

                  {archipelago.islands.map((island, index) => {
                    const status = getIslandStatus(island, index, archipelago.islands);
                    const nextIsland = archipelago.islands[index + 1];
                    const nextStatus = nextIsland
                      ? getIslandStatus(nextIsland, index + 1, archipelago.islands)
                      : 'locked';

                    return (
                      <React.Fragment key={island.id}>
                        <div className="relative w-full max-w-sm">
                          {status === 'current' && <ExplorerFlag />}
                          <IslandCard island={island} status={status} courseSlug={courseSlug} t={t} />
                        </div>
                        {nextIsland && (
                          <div className="relative z-10">
                            <VoyagePath
                              status={
                                nextStatus === 'locked'
                                  ? 'locked'
                                  : status === 'completed'
                                  ? 'completed'
                                  : 'current'
                              }
                            />
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </GameLayout>
  );
}
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

function getIslandStatus(island: Island, index: number, islands: Island[]): 'completed' | 'current' | 'locked' | 'upcoming' {
  if (island.progress === 100) return 'completed';
  if (index === 0 && island.progress > 0 && !island.locked) return 'current';
  if (!island.locked && island.progress > 0) {
    const prev = islands[index - 1];
    if (prev && prev.progress === 100) return 'current';
  }
  return island.locked ? 'locked' : 'upcoming';
}

function ExplorerFlag() {
  return (
    <div className="absolute -top-3 -right-1 z-20" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
      <svg width="22" height="26" viewBox="0 0 24 28" aria-hidden="true">
        <path d="M6,22 L6,6 L18,11 L6,16 Z" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="6" cy="22" r="2.5" fill="#b45309" />
      </svg>
    </div>
  );
}

function VoyagePath({ status }: { status: 'completed' | 'current' | 'locked' }) {
  const stroke = status === 'completed' ? '#fbbf24' : status === 'current' ? '#14b8a6' : '#cbd5e1';
  const dotFill = status === 'locked' ? '#e2e8f0' : stroke;

  return (
    <div className="flex items-center justify-center py-2">
      <svg width="56" height="18" viewBox="0 0 60 20" aria-hidden="true">
        <path
          d="M2,10 Q15,0 30,10 Q45,20 58,10"
          stroke={stroke}
          strokeWidth="2.5"
          fill="none"
          strokeDasharray={status === 'locked' ? '5 4' : '0'}
          strokeLinecap="round"
          opacity={status === 'locked' ? 0.5 : 0.75}
        />
        <circle cx="30" cy="10" r={status === 'locked' ? 2.5 : 3} fill={dotFill} opacity={status === 'locked' ? 0.6 : 0.85} />
      </svg>
    </div>
  );
}

function IslandCard({ island, status, courseSlug, t }: { island: Island; status: 'completed' | 'current' | 'locked' | 'upcoming'; courseSlug: string; t: (key: string) => string }) {
  const isLocked = island.locked || status === 'locked';

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
        status === 'completed'
          ? 'border-[#f0d78c] bg-gradient-to-br from-[#fffbf2] to-white shadow-[0_2px_12px_rgba(251,191,36,0.12)]'
          : status === 'current'
          ? 'border-[#8fd6ce] bg-gradient-to-br from-[#f2fbfa] to-white shadow-[0_4px_16px_rgba(13,148,136,0.12)]'
          : isLocked
          ? 'border-[#e2e8f0] bg-white/60 opacity-50'
          : 'border-[#e2e8f0] bg-white/80 hover:-translate-y-0.5 hover:shadow-md'
      }`}
    >
      <div className="relative h-36 w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: isLocked ? 'linear-gradient(to bottom, rgba(148,163,184,0.25), rgba(148,163,184,0.45))' : 'none',
          }}
        />
        <IslandVisual course={courseSlug} lesson={island.id} alt={island.name} className="h-full w-full object-cover" width={400} height={320} />

        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-[2px]">
            <div className="flex flex-col items-center gap-1">
              <span className="text-3xl">🔒</span>
              <span className="text-xs font-medium text-slate-500">Locked</span>
            </div>
          </div>
        )}
        {status === 'current' && (
          <div className="absolute top-2 left-2 rounded-full bg-[#0d9488]/90 px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm backdrop-blur-sm">
            Active
          </div>
        )}
        {status === 'completed' && (
          <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-[#d97706]/90 px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm backdrop-blur-sm">
            <span>✔</span> Done
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-[#22383a]">
          {status === 'completed' && <span className="text-lg text-[#d97706]">🏆</span>}
          {status === 'current' && <span className="text-sm text-[#0d9488]">⚑</span>}
          {island.name}
        </h3>

        <div className="mb-3">
          <div className="mb-1 flex items-center justify-between text-xs text-[#5a7a78]">
            <span className="font-medium">{status === 'completed' ? 'Completed' : 'Progress'}</span>
            <span className="font-semibold text-[#2a5a58]">{island.progress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#e8f0ef]">
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
          <p className="mt-1 text-xs text-[#8a9e9d]">
            {island.lessons} {t('gamification.mission')}s
          </p>
        </div>

        {!isLocked && (
          <button
            className={`w-full rounded-xl py-2.5 text-sm font-semibold transition-all ${
              status === 'completed'
                ? 'bg-[#d97706] text-white shadow-sm hover:bg-[#b45309]'
                : status === 'current'
                ? 'bg-[#0d9488] text-white shadow-sm hover:bg-[#115e59]'
                : 'bg-[#cbd5e1] text-white hover:bg-[#94a3b8]'
            }`}
          >
            {status === 'completed' ? '✔ Completed' : 'Continue Learning'}
          </button>
        )}
        {isLocked && (
          <div className="w-full rounded-xl border border-slate-200 bg-slate-100 py-2.5 text-center text-xs font-medium text-slate-400">
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
      <div className="space-y-14">
        {/* Page header */}
        <div className="text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#7aaba6]">Your Learning Journey</p>
          <h1 className="text-4xl font-bold tracking-tight text-[#1a4a48] md:text-5xl">Archipelago</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#4a7a78] md:text-lg">
            Chart your course through the islands of knowledge. Each island holds new adventures and discoveries.
          </p>
          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-[#5eead4] via-[#8fc5bc] to-[#e8d3a2]" />
        </div>

        {archipelagos.map((archipelago) => {
          const courseSlug = toCourseSlug(archipelago.name);

          return (
            <div key={archipelago.id}>
              {/* Region heading */}
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#b8ddd5]/70 bg-white/80 text-lg shadow-sm">
                  🏝️
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#1a4a48]">{archipelago.name}</h2>
                  <p className="text-sm text-[#5a8a87]">{archipelago.description}</p>
                </div>
              </div>

              {/* Desktop: horizontal island route */}
              <div className="hidden overflow-hidden rounded-2xl border border-[#b8ddd5]/60 bg-[#fafdfc]/70 px-6 py-8 shadow-[0_2px_20px_rgba(13,148,136,0.05)] backdrop-blur-sm md:block md:px-8">
                <div className="flex items-start justify-center gap-3">
                  {archipelago.islands.map((island, index) => {
                    const status = getIslandStatus(island, index, archipelago.islands);
                    const nextIsland = archipelago.islands[index + 1];
                    const nextStatus = nextIsland ? getIslandStatus(nextIsland, index + 1, archipelago.islands) : 'locked';

                    return (
                      <React.Fragment key={island.id}>
                        <div className="relative w-full max-w-xs">
                          {status === 'current' && <ExplorerFlag />}
                          <IslandCard island={island} status={status} courseSlug={courseSlug} t={t} />
                        </div>
                        {nextIsland && (
                          <div className="flex-shrink-0 pt-16">
                            <VoyagePath
                              status={
                                nextStatus === 'locked' ? 'locked' : status === 'completed' ? 'completed' : 'current'
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
              <div className="overflow-hidden rounded-2xl border border-[#b8ddd5]/60 bg-[#fafdfc]/70 px-5 py-6 shadow-[0_2px_20px_rgba(13,148,136,0.05)] backdrop-blur-sm md:hidden">
                <div className="relative flex flex-col items-center">
                  <div className="absolute top-2 bottom-2 w-0.5 rounded-full bg-gradient-to-b from-[#8fc5bc] via-[#e8d3a2] to-[#c8d8d6]" />

                  {archipelago.islands.map((island, index) => {
                    const status = getIslandStatus(island, index, archipelago.islands);
                    const nextIsland = archipelago.islands[index + 1];
                    const nextStatus = nextIsland ? getIslandStatus(nextIsland, index + 1, archipelago.islands) : 'locked';

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
                                nextStatus === 'locked' ? 'locked' : status === 'completed' ? 'completed' : 'current'
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
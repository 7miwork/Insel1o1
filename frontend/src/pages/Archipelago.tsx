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

/** Map display names to course folder slugs */
function toCourseSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

/** Get island status for visual styling */
function getIslandStatus(island: Island, index: number, islands: Island[]): 'completed' | 'current' | 'locked' {
  if (island.progress === 100) return 'completed';
  if (index === 0 && island.progress > 0 && !island.locked) return 'current';
  if (!island.locked && island.progress > 0) {
    const prev = islands[index - 1];
    if (prev && prev.progress === 100) return 'current';
  }
  return island.locked ? 'locked' : 'upcoming';
}

/** SVG Voyage path between two points */
function VoyagePath({
  startX,
  startY,
  endX,
  endY,
  status,
}: {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  status: 'completed' | 'current' | 'locked';
}) {
  const midX = (startX + endX) / 2;
  const midY = Math.min(startY, endY) - 40;

  const pathColor = status === 'completed' ? '#fbbf24' : status === 'current' ? '#5eead4' : '#64748b';
  const strokeDasharray = status === 'locked' ? '6 4' : '0';

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      preserveAspectRatio="none"
    >
      <path
        d={`M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`}
        stroke={pathColor}
        strokeWidth="3"
        fill="none"
        strokeDasharray={strokeDasharray}
        strokeLinecap="round"
        opacity={status === 'locked' ? 0.4 : 0.8}
      />
      {status !== 'locked' && (
        <circle cx={midX} cy={midY} r="4" fill={pathColor} opacity="0.9" />
      )}
    </svg>
  );
}

/** Status indicator dot */
function StatusDot({ status }: { status: 'completed' | 'current' | 'locked' }) {
  if (status === 'completed') return null;

  const color = status === 'current' ? '#fbbf24' : '#64748b';
  const label = status === 'current' ? '⚑' : '·';

  return (
    <div
      className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-lg shadow-lg"
      style={{ backgroundColor: color, zIndex: 10 }}
    >
      {label}
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
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-amber-300 mb-4">
            {t('gamification.archipelago')}
          </h1>
          <p className="text-teal-100/80 text-lg">
            Chart your course through the islands of knowledge
          </p>
        </div>

        {archipelagos.map((archipelago) => (
          <div
            key={archipelago.id}
            className="relative rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-900/40 to-amber-900/20 p-6 md:p-8 backdrop-blur-sm shadow-xl"
          >
            {/* Water texture */}
            <div className="absolute inset-0 opacity-10 rounded-2xl pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <span className="text-2xl">🏝️</span>
                {archipelago.name}
              </h2>
              <p className="text-teal-200/80 mb-8">{archipelago.description}</p>

              {/* Map container */}
              <div className="relative">
                {/* Desktop: horizontal journey */}
                <div className="hidden md:grid grid-cols-3 gap-8 relative">
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

                    return (
                      <div key={island.id} className="relative">
                        {/* Voyage path connector */}
                        {nextIsland && (
                          <div className="absolute top-1/2 -right-4 w-8 h-8 z-20">
                            <svg viewBox="0 0 40 40" className="w-full h-full">
                              <path
                                d="M 0 20 Q 20 5 40 20"
                                stroke={pathStatus === 'completed' ? '#fbbf24' : pathStatus === 'current' ? '#5eead4' : '#64748b'}
                                strokeWidth="3"
                                fill="none"
                                strokeDasharray={pathStatus === 'locked' ? '4 3' : '0'}
                                opacity={pathStatus === 'locked' ? 0.4 : 0.8}
                                markerEnd={pathStatus !== 'locked' ? 'url(#arrowhead)' : ''}
                              />
                              <defs>
                                <marker
                                  id={`arrowhead-${island.id}`}
                                  markerWidth="6"
                                  markerHeight="6"
                                  refX="3"
                                  refY="3"
                                  orient="auto"
                                >
                                  <path
                                    d="M 0 0 L 6 3 L 0 6 z"
                                    fill={pathStatus === 'completed' ? '#fbbf24' : '#5eead4'}
                                  />
                                </marker>
                              </defs>
                            </svg>
                          </div>
                        )}

                        {/* Island card */}
                        <div className="relative">
                          <StatusDot status={status} />
                          <IslandCard island={island} status={status} courseSlug={toCourseSlug(archipelago.name)} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Mobile: vertical journey */}
                <div className="md:hidden flex flex-col gap-6 relative">
                  {/* Vertical path line */}
                  <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-500/40 via-amber-500/40 to-slate-500/40" />

                  {archipelago.islands.map((island, index) => {
                    const status = getIslandStatus(island, index, archipelago.islands);

                    return (
                      <div key={island.id} className="relative flex items-start gap-6">
                        {/* Travel marker on path */}
                        <div
                          className="relative z-10 w-16 h-16 rounded-full border-4 flex items-center justify-center shadow-lg"
                          style={{
                            borderColor: status === 'completed' ? '#fbbf24' : status === 'current' ? '#5eead4' : '#64748b',
                            backgroundColor: status === 'completed' ? '#fef3c7' : status === 'current' ? '#0d9488' : '#334155',
                          }}
                        >
                          {island.locked ? <span className="text-xl">🔒</span> : <span className="text-xl">⚓</span>}
                        </div>

                        {/* Island card */}
                        <div className="flex-1">
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

/** Reusable island card component with state-based styling */
function IslandCard({
  island,
  status,
  courseSlug,
}: {
  island: Island;
  status: 'completed' | 'current' | 'locked';
  courseSlug: string;
}) {
  const baseClasses = 'relative overflow-hidden rounded-xl border transition-all duration-300';

  const stateClasses = {
    completed: 'border-amber-400/50 bg-gradient-to-br from-amber-900/30 to-yellow-900/30 shadow-amber-500/20',
    current: 'border-teal-400/60 bg-gradient-to-br from-teal-900/40 to-cyan-900/30 shadow-teal-500/30 scale-105 shadow-xl',
    locked: 'border-slate-600/30 bg-slate-800/30 opacity-60',
  };

  const hoverClasses = !island.locked ? 'hover:scale-105 hover:shadow-lg' : '';

  return (
    <div className={`${baseClasses} ${stateClasses[status]} ${hoverClasses}`}>
      {/* Island visual */}
      <div className="relative w-full h-32 overflow-hidden rounded-t-xl">
        <div
          className="absolute inset-0 bg-gradient-to-b from-teal-800/20 to-amber-900/20"
          style={{
            backgroundImage: status === 'locked'
              ? 'linear-gradient(to bottom, rgba(15,23,42,0.4), rgba(15,23,42,0.6))'
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
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-[2px]">
            <div className="text-center">
              <span className="text-4xl mb-2 block">🔒</span>
              <p className="text-xs text-slate-300 font-medium">Unlock previous island</p>
            </div>
          </div>
        )}
      </div>

      {/* Card content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          {status === 'completed' && <span className="text-amber-400">✓</span>}
          {status === 'current' && <span className="text-teal-300">⚑</span>}
          {island.name}
        </h3>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span
              className={
                status === 'completed'
                  ? 'text-amber-300'
                  : status === 'current'
                  ? 'text-teal-300'
                  : 'text-slate-400'
              }
            >
              {island.progress === 100 ? 'Completed' : 'Progress'}
            </span>
            <span className="text-white font-semibold">{island.progress}%</span>
          </div>
          <div
            className="w-full rounded-full h-2"
            style={{
              backgroundColor: status === 'completed' ? 'rgba(251,191,36,0.2)' : 'rgba(100,116,139,0.2)',
            }}
          >
            <div
              className="h-2 rounded-full transition-all"
              style={{
                width: `${island.progress}%`,
                background:
                  status === 'completed'
                    ? 'linear-gradient(90deg, #fbbf24, #f59e0b)'
                    : status === 'current'
                    ? 'linear-gradient(90deg, #5eead4, #2dd4bf)'
                    : 'linear-gradient(90deg, #64748b, #475569)',
              }}
            />
          </div>
        </div>

        {/* Lessons count */}
        <p className="text-xs text-slate-300 mb-4">
          {island.lessons} {t('gamification.mission')}s
        </p>

        {/* Action button */}
        {!island.locked && (
          <button
            className={`w-full px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              status === 'completed'
                ? 'bg-amber-500/20 text-amber-200 border border-amber-500/30 hover:bg-amber-500/30'
                : status === 'current'
                ? 'bg-teal-500 text-white hover:bg-teal-600 shadow-lg shadow-teal-500/30'
                : 'bg-slate-600 text-slate-200 hover:bg-slate-500'
            }`}
          >
            {status === 'completed' ? '✓ Completed' : 'Continue'}
          </button>
        )}

        {island.locked && (
          <div className="w-full px-4 py-2 bg-slate-700/30 text-slate-400 rounded-lg text-sm text-center border border-slate-600/20">
            Locked
          </div>
        )}
      </div>
    </div>
  );
}
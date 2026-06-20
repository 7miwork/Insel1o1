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

function getCenterIsland(islands: Island[]): Island | null {
  const unlocked = islands.filter((i) => !i.locked);
  if (unlocked.length === 0) return islands[0];
  const current = unlocked.find((i) => i.progress > 0 && i.progress < 100);
  if (current) return current;
  const highestProgress = unlocked.reduce((a, b) => (a.progress > b.progress ? a : b), unlocked[0]);
  if (highestProgress.progress > 0) return highestProgress;
  return islands[0];
}

function getArchipelagoPositions(count: number): { x: number; y: number }[] {
  const positions: { x: number; y: number }[] = [];
  const center = { x: 50, y: 50 };
  positions.push(center);

  if (count <= 1) return positions;

  const radius = count <= 4 ? 32 : count <= 6 ? 36 : 40;
  const startAngle = -Math.PI / 2;

  for (let i = 0; i < count - 1; i++) {
    const angle = startAngle + (i * 2 * Math.PI) / (count - 1);
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    positions.push({ x, y });
  }

  return positions;
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

function VoyagePathDashed() {
  return (
    <div className="flex items-center justify-center py-1">
      <svg width="40" height="12" viewBox="0 0 40 12" aria-hidden="true">
        <path d="M2,6 Q10,0 20,6 Q30,12 38,6" stroke="#cbd5e1" strokeWidth="2" fill="none" strokeDasharray="4 3" strokeLinecap="round" opacity="0.7" />
      </svg>
    </div>
  );
}

interface IslandNodeProps {
  island: Island;
  status: 'completed' | 'current' | 'locked' | 'upcoming';
  courseSlug: string;
  t: (key: string) => string;
  size?: 'large' | 'normal';
  showLabel?: boolean;
}

function IslandNode({ island, status, courseSlug, t, size = 'normal', showLabel = true }: IslandNodeProps) {
  const isLocked = island.locked || status === 'locked';
  const isCurrent = status === 'current';
  const isCompleted = status === 'completed';

  const baseSize = size === 'large' ? 'w-36 h-36 sm:w-40 sm:h-40' : 'w-28 h-28 sm:w-32 sm:h-32';
  const innerSize = size === 'large' ? 'h-24 sm:h-28' : 'h-20 sm:h-24';
  const iconSize = size === 'large' ? 'text-3xl' : 'text-2xl';

  return (
    <button
      disabled={isLocked}
      className={`relative flex flex-col items-center justify-end ${baseSize} rounded-full border-2 transition-all duration-300 ${
        isCompleted
          ? 'border-[#f0d78c] bg-gradient-to-br from-[#fffbf2] to-[#fef3c7] shadow-[0_2px_12px_rgba(251,191,36,0.15)]'
          : isCurrent
          ? 'border-[#8fd6ce] bg-gradient-to-br from-[#f2fbfa] to-[#e8f9f7] shadow-[0_4px_20px_rgba(13,148,136,0.18)]'
          : isLocked
          ? 'border-[#e2e8f0] bg-white/50 opacity-50'
          : 'border-[#b8ddd5] bg-white/80 hover:-translate-y-0.5 hover:shadow-md'
      } ${isCurrent ? 'decor-pulse-gentle' : ''} ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {isCurrent && <ExplorerFlag />}

      <div className={`relative w-full ${innerSize} overflow-hidden rounded-full`}>
        <div
          className="absolute inset-0"
          style={{
            background: isLocked ? 'linear-gradient(to bottom, rgba(148,163,184,0.3), rgba(148,163,184,0.5))' : 'none',
          }}
        />
        <IslandVisual course={courseSlug} lesson={island.id} alt={island.name} className="h-full w-full object-cover" width={320} height={320} />

        {/* Status badges */}
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-[2px]">
            <span className="text-2xl">🔒</span>
          </div>
        )}
        {!isLocked && !isCurrent && !isCompleted && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`font-bold text-white drop-shadow-md ${size === 'large' ? 'text-2xl' : 'text-xl'}`}>
              {island.id}
            </span>
          </div>
        )}
      </div>

      {/* Label */}
      {showLabel && (
        <div className="mt-1 px-2 text-center">
          <p className={`font-semibold text-[#22383a] truncate ${size === 'large' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'}`}>
            {island.name}
          </p>
          {isCurrent && (
            <p className="text-[10px] font-medium text-[#0d9488]">Active</p>
          )}
          {isCompleted && (
            <p className="text-[10px] font-medium text-[#d97706]">✔ Done</p>
          )}
        </div>
      )}
    </button>
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
          const centerIsland = getCenterIsland(archipelago.islands);
          const centerIndex = centerIsland ? archipelago.islands.findIndex((i) => i.id === centerIsland.id) : 0;
          const positions = getArchipelagoPositions(archipelago.islands.length);

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

              {/* Desktop & Tablet: Archipelago cluster */}
              <div className="relative hidden overflow-hidden rounded-3xl border border-[#b8ddd5]/60 bg-gradient-to-br from-[#e8f4f2] via-[#fafdfc] to-[#f5faf9] px-6 py-10 shadow-[0_2px_20px_rgba(13,148,136,0.05)] backdrop-blur-sm md:block">
                <div className="relative mx-auto h-[520px] max-w-3xl">
                  {archipelago.islands.map((island, index) => {
                    const status = getIslandStatus(island, index, archipelago.islands);
                    const pos = positions[index];
                    const isCenter = index === centerIndex;

                    return (
                      <div
                        key={island.id}
                        className="absolute"
                        style={{
                          left: `${pos.x}%`,
                          top: `${pos.y}%`,
                          transform: 'translate(-50%, -50%)',
                          zIndex: isCenter ? 10 : 1,
                        }}
                      >
                        <IslandNode
                          island={island}
                          status={status}
                          courseSlug={courseSlug}
                          t={t}
                          size={isCenter ? 'large' : 'normal'}
                          showLabel={true}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile: Vertical stack */}
              <div className="overflow-hidden rounded-3xl border border-[#b8ddd5]/60 bg-[#fafdfc]/70 px-5 py-6 shadow-[0_2px_20px_rgba(13,148,136,0.05)] backdrop-blur-sm md:hidden">
                <div className="relative flex flex-col items-center">
                  <div className="absolute top-6 bottom-6 left-4 w-0.5 rounded-full bg-gradient-to-b from-[#8fc5bc] via-[#e8d3a2] to-[#c8d8d6]" />

                  {archipelago.islands.map((island, index) => {
                    const status = getIslandStatus(island, index, archipelago.islands);
                    const nextIsland = archipelago.islands[index + 1];
                    const nextStatus = nextIsland ? getIslandStatus(nextIsland, index + 1, archipelago.islands) : 'locked';

                    return (
                      <div key={island.id} className="relative w-full">
                        {index > 0 && (
                          <div className="relative z-10 flex justify-center">
                            <VoyagePathDashed />
                          </div>
                        )}
                        <div className="relative flex justify-center">
                          <IslandNode
                            island={island}
                            status={status}
                            courseSlug={courseSlug}
                            t={t}
                            size="normal"
                            showLabel={true}
                          />
                        </div>
                      </div>
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
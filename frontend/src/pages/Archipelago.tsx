'use client';

import React, { useState } from 'react';
import GameLayout from '@/components/gamified/GameLayout';
import ArchipelagoLayout from '@/components/gamified/ArchipelagoLayout';
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

              {/* Archipelago cluster layout */}
              <div className="overflow-hidden rounded-3xl border border-[#b8ddd5]/60 bg-gradient-to-br from-[#e8f4f2] via-[#fafdfc] to-[#f5faf9] px-4 py-8 shadow-[0_2px_20px_rgba(13,148,136,0.05)] backdrop-blur-sm sm:px-6 md:py-10">
                {/* Desktop / Tablet: cluster */}
                <div className="hidden md:block">
                  <ArchipelagoLayout lessons={archipelago.islands} courseSlug={courseSlug} t={t} />
                </div>

                {/* Mobile: vertical progression */}
                <div className="md:hidden">
                  <div className="relative mx-auto flex max-w-xs flex-col items-center">
                    <div className="absolute top-3 bottom-3 left-[18px] w-0.5 rounded-full bg-gradient-to-b from-[#8fc5bc] via-[#e8d3a2] to-[#c8d8d6]" />

                    {archipelago.islands.map((island, index) => {
                      const isLocked = island.locked;
                      const isCurrent = !isLocked && island.progress > 0 && island.progress < 100;
                      const isCompleted = island.progress === 100;

                      return (
                        <div key={island.id} className="relative w-full">
                          {index > 0 && (
                            <div className="relative z-10 flex justify-center py-1">
                              <svg width="32" height="10" viewBox="0 0 32 10" aria-hidden="true">
                                <path
                                  d="M2,5 Q8,0 16,5 Q24,10 30,5"
                                  stroke="#cbd5e1"
                                  strokeWidth="2"
                                  fill="none"
                                  strokeDasharray="3 3"
                                  strokeLinecap="round"
                                  opacity="0.7"
                                />
                              </svg>
                            </div>
                          )}

                          <div className="relative flex justify-center">
                            <button
                              disabled={isLocked}
                              className={`relative flex flex-col items-center justify-end transition-all duration-300 ${
                                isCompleted
                                  ? 'w-28 h-28 sm:w-32 sm:h-32'
                                  : isCurrent
                                  ? 'w-32 h-32 sm:w-36 sm:h-36'
                                  : 'w-28 h-28 sm:w-32 sm:h-32'
                              } rounded-full border-2`}
                              style={{
                                borderColor: isCompleted ? '#f0d78c' : isCurrent ? '#8fd6ce' : isLocked ? '#e2e8f0' : '#b8ddd5',
                                background: isCompleted
                                  ? 'linear-gradient(to bottom right, #fffbf2, #fef3c7)'
                                  : isCurrent
                                  ? 'linear-gradient(to bottom right, #f2fbfa, #e8f9f7)'
                                  : isLocked
                                  ? 'rgba(255,255,255,0.5)'
                                  : 'rgba(255,255,255,0.8)',
                                boxShadow: isCurrent
                                  ? '0 4px 20px rgba(13,148,136,0.18)'
                                  : isCompleted
                                  ? '0 2px 12px rgba(251,191,36,0.15)'
                                  : '0 1px 3px rgba(0,0,0,0.05)',
                                opacity: isLocked ? 0.5 : 1,
                              }}
                            >
                              {isCurrent && (
                                <div className="absolute -top-3 -right-1 z-20" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
                                  <svg width="22" height="26" viewBox="0 0 24 28" aria-hidden="true">
                                    <path d="M6,22 L6,6 L18,11 L6,16 Z" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5" strokeLinejoin="round" />
                                    <circle cx="6" cy="22" r="2.5" fill="#b45309" />
                                  </svg>
                                </div>
                              )}

                              <div className="relative w-full h-20 overflow-hidden rounded-full sm:h-24">
                                <div
                                  className="absolute inset-0"
                                  style={{
                                    background: isLocked ? 'linear-gradient(to bottom, rgba(148,163,184,0.3), rgba(148,163,184,0.5))' : 'none',
                                  }}
                                />
                                <img
                                  src={`/assets/images/islands/${courseSlug}/island-${island.id}.svg`}
                                  alt={island.name}
                                  className="h-full w-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/assets/images/islands/fallback/island-placeholder.svg';
                                  }}
                                />

                                {isLocked && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-[2px]">
                                    <span className="text-2xl">🔒</span>
                                  </div>
                                )}
                                {!isLocked && !isCurrent && !isCompleted && (
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xl font-bold text-white drop-shadow-md">{island.id}</span>
                                  </div>
                                )}
                              </div>

                              <div className="mt-1 w-28 px-2 text-center sm:w-32">
                                <p className="truncate text-xs font-semibold text-[#22383a] sm:text-sm">{island.name}</p>
                                {isCurrent && <p className="text-[10px] font-medium text-[#0d9488]">Active</p>}
                                {isCompleted && <p className="text-[10px] font-medium text-[#d97706]">✔ Done</p>}
                              </div>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </GameLayout>
  );
}
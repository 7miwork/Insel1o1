'use client';

import React, { useState } from 'react';
import GameLayout from '@/components/gamified/GameLayout';
import ArchipelagoClusterLayout from '@/components/gamified/ArchipelagoClusterLayout';
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
                <ArchipelagoClusterLayout lessons={archipelago.islands} courseSlug={courseSlug} t={t} />
              </div>
            </div>
          );
        })}
      </div>
    </GameLayout>
  );
}
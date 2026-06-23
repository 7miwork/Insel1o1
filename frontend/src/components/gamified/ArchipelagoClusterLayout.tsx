'use client';

import React, { useState } from 'react';
import IslandVisual from './IslandVisual';
import LockedIslandModal from './LockedIslandModal';
import type { LockedResource } from './LockedIslandModal';
import { usei18n } from '@/contexts/i18nContext';

export interface Lesson {
  id: number;
  name: string;
  progress: number;
  locked: boolean;
  lessons: number;
  courseSlug?: string;
}

export type LessonStatus = 'completed' | 'current' | 'locked' | 'upcoming';

function getLessonStatus(lesson: Lesson, index: number, lessons: Lesson[]): LessonStatus {
  if (lesson.progress === 100) return 'completed';
  if (index === 0 && lesson.progress > 0 && !lesson.locked) return 'current';
  if (!lesson.locked && lesson.progress > 0) {
    const prev = lessons[index - 1];
    if (prev && prev.progress === 100) return 'current';
  }
  return lesson.locked ? 'locked' : 'upcoming';
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

interface IslandNodeProps {
  lesson: Lesson;
  status: LessonStatus;
  courseSlug: string;
  t: (key: string) => string;
  size: 'large' | 'normal';
  /** Called when a locked island is clicked */
  onLockedClick?: () => void;
}

function IslandNode({ lesson, status, courseSlug, t, size, onLockedClick }: IslandNodeProps) {
  const isLocked = lesson.locked || status === 'locked';
  const isCurrent = status === 'current';
  const isCompleted = status === 'completed';

  const diameter = size === 'large' ? 'w-36 h-36 sm:w-40 sm:h-40' : 'w-28 h-28 sm:w-32 sm:h-32';
  const visualH = size === 'large' ? 'h-24 sm:h-28' : 'h-20 sm:h-24';

  const handleClick = () => {
    if (isLocked && onLockedClick) {
      onLockedClick();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`relative flex flex-col items-center justify-end ${diameter} rounded-full border-2 transition-all duration-300 cursor-pointer`}
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
      {isCurrent && <ExplorerFlag />}

      <div className={`relative w-full ${visualH} overflow-hidden rounded-full`}>
        <div
          className="absolute inset-0"
          style={{
            background: isLocked ? 'linear-gradient(to bottom, rgba(148,163,184,0.3), rgba(148,163,184,0.5))' : 'none',
          }}
        />
        <IslandVisual course={courseSlug} lesson={lesson.id} alt={lesson.name} className="h-full w-full object-cover" width={320} height={320} />

        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-[2px]">
            <span className="text-2xl">🔒</span>
          </div>
        )}
        {!isLocked && !isCurrent && !isCompleted && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`font-bold text-white drop-shadow-md ${size === 'large' ? 'text-2xl' : 'text-xl'}`}>
              {lesson.id}
            </span>
          </div>
        )}
      </div>

      <div className={`mt-1 px-2 text-center ${size === 'large' ? 'w-36 sm:w-40' : 'w-28 sm:w-32'}`}>
        <p
          className={`font-semibold text-[#22383a] truncate ${size === 'large' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'}`}
          title={lesson.name}
        >
          {lesson.name}
        </p>
        {isCurrent && <p className="text-[10px] font-medium text-[#0d9488]">Active</p>}
        {isCompleted && <p className="text-[10px] font-medium text-[#d97706]">✔ Done</p>}
      </div>
    </button>
  );
}

interface ArchipelagoClusterLayoutProps {
  lessons: Lesson[];
  courseSlug: string;
  t: (key: string) => string;
}

const COORDS: { [key: number]: { x: number; y: number } } = {
  2: { x: 0, y: -300 },
  1: { x: -220, y: -180 },
  3: { x: 220, y: -180 },
  10: { x: -320, y: 0 },
  4: { x: 320, y: 0 },
  9: { x: -220, y: 180 },
  5: { x: 220, y: 180 },
  8: { x: -100, y: 300 },
  6: { x: 100, y: 300 },
  7: { x: 0, y: 380 },
  11: { x: 0, y: 0 },
};

export default function ArchipelagoClusterLayout({ lessons, courseSlug, t }: ArchipelagoClusterLayoutProps) {
  const [lockedTarget, setLockedTarget] = useState<LockedResource | null>(null);

  return (
    <div className="relative mx-auto h-[760px] w-full max-w-3xl sm:h-[800px]">
      {/* Locked island modal */}
      <LockedIslandModal resource={lockedTarget} onClose={() => setLockedTarget(null)} />

      {/* Center anchor at 50% 50% */}
      <div className="absolute left-1/2 top-1/2 h-0 w-0" />

      {lessons.map((lesson) => {
        const index = lessons.findIndex((l) => l.id === lesson.id);
        const status = getLessonStatus(lesson, index, lessons);
        const isCenter = lesson.id === 11;
        const coord = COORDS[lesson.id] || { x: 0, y: 0 };

        return (
          <div
            key={lesson.id}
            className="absolute"
            style={{
              transform: `translate(calc(50% + ${coord.x}px), calc(50% + ${coord.y}px))`,
              zIndex: isCenter ? 10 : 1,
            }}
          >
            <IslandNode
              lesson={lesson}
              status={status}
              courseSlug={courseSlug}
              t={t}
              size={isCenter ? 'large' : 'normal'}
              onLockedClick={() =>
                setLockedTarget({
                  type: 'lesson',
                  title: lesson.name,
                })
              }
            />
          </div>
        );
      })}
    </div>
  );
}

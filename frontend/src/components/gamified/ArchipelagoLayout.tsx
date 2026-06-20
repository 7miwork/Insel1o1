'use client';

import React from 'react';
import IslandVisual from './IslandVisual';
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
  size?: 'large' | 'normal';
}

function IslandNode({ lesson, status, courseSlug, t, size = 'normal' }: IslandNodeProps) {
  const isLocked = lesson.locked || status === 'locked';
  const isCurrent = status === 'current';
  const isCompleted = status === 'completed';

  const diameter = size === 'large' ? 'w-36 h-36 sm:w-40 sm:h-40' : 'w-28 h-28 sm:w-32 sm:h-32';
  const visualH = size === 'large' ? 'h-24 sm:h-28' : 'h-20 sm:h-24';

  return (
    <button
      disabled={isLocked}
      className={`relative flex flex-col items-center justify-end ${diameter} rounded-full border-2 transition-all duration-300`}
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

interface ArchipelagoLayoutProps {
  lessons: Lesson[];
  courseSlug: string;
  t: (key: string) => string;
}

export default function ArchipelagoLayout({ lessons, courseSlug, t }: ArchipelagoLayoutProps) {
  const centerLesson = lessons.length > 0 ? lessons[Math.floor(lessons.length / 2)] : null;
  const centerIndex = centerLesson ? lessons.findIndex((l) => l.id === centerLesson.id) : 0;

  const organicPositions: { x: number; y: number }[] = [
    { x: 50, y: 50 },
  ];

  const pattern = [
    { x: 50, y: 18 },
    { x: 22, y: 26 },
    { x: 78, y: 26 },
    { x: 10, y: 46 },
    { x: 90, y: 46 },
    { x: 16, y: 70 },
    { x: 84, y: 70 },
    { x: 30, y: 82 },
    { x: 70, y: 82 },
    { x: 50, y: 78 },
  ];

  for (let i = 1; i < lessons.length; i++) {
    organicPositions.push(pattern[i - 1] || { x: 50, y: 50 });
  }

  return (
    <div className="relative mx-auto h-[560px] max-w-3xl sm:h-[600px]">
      {lessons.map((lesson, index) => {
        const status = getLessonStatus(lesson, index, lessons);
        const pos = organicPositions[index] || { x: 50, y: 50 };
        const isCenter = index === centerIndex;

        return (
          <div
            key={lesson.id}
            className="absolute"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: isCenter ? 10 : 1,
            }}
          >
            <IslandNode
              lesson={lesson}
              status={status}
              courseSlug={courseSlug}
              t={t}
              size={isCenter ? 'large' : 'normal'}
            />
          </div>
        );
      })}
    </div>
  );
}
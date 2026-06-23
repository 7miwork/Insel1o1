import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import GameLayout from '@/components/gamified/GameLayout';
import ArchipelagoClusterLayout from '@/components/gamified/ArchipelagoClusterLayout';
import { usei18n } from '@/contexts/i18nContext';
import { codingSubject, getCourseBySlug, getSubjectBySlug } from '@/data/hierarchy';
import type { Course, Subject } from '@/data/hierarchy';

/**
 * Level 2 — Course Archipelago
 *
 * Shows all courses within a subject.
 * Each course is displayed as a clickable island group card.
 * Clicking a course reveals its lesson islands (Level 1) using ArchipelagoClusterLayout.
 */
export default function ArchipelagoPage() {
  const { t } = usei18n();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const subjectSlug = searchParams.get('subject') || 'coding';
  const courseSlug = searchParams.get('course');

  // Resolve the subject (default to coding)
  const subject: Subject = getSubjectBySlug(subjectSlug) || codingSubject;

  // If a specific course is selected, show its lesson islands
  if (courseSlug) {
    return <CourseLessonView subject={subject} courseSlug={courseSlug} onBack={() => navigate(`/archipelago?subject=${subject.slug}`)} />;
  }

  return <CourseArchipelagoView subject={subject} onSelectCourse={(slug) => navigate(`/archipelago?subject=${subject.slug}&course=${slug}`)} />;
}

/**
 * Displays all courses within a subject as island group cards.
 */
function CourseArchipelagoView({
  subject,
  onSelectCourse,
}: {
  subject: Subject;
  onSelectCourse: (slug: string) => void;
}) {
  // Calculate overall progress
  const totalCourses = subject.courses.length;
  const completedCourses = subject.courses.filter((c) => c.progress === 100).length;
  const overallProgress = Math.round(
    subject.courses.reduce((sum, c) => sum + c.progress, 0) / totalCourses
  );

  return (
    <GameLayout xp={2450} level={5} streak={12}>
      <div className="space-y-10">
        {/* Page header */}
        <div className="text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#7aaba6]">
            {subject.title} Archipelago
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-[#1a4a48] md:text-5xl">
            {subject.icon} {subject.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#4a7a78] md:text-lg">
            {subject.description}
          </p>

          {/* Overall progress */}
          <div className="mx-auto mt-6 flex max-w-md items-center gap-3 rounded-xl border border-[#b8ddd5]/60 bg-white/70 px-4 py-2.5 shadow-sm">
            <span className="text-lg">📊</span>
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs text-[#5a8a87]">
                <span>{completedCourses}/{totalCourses} courses completed</span>
                <span className="font-semibold text-[#1a4a48]">{overallProgress}%</span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-[#e8f0ef]">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${overallProgress}%`,
                    background: 'linear-gradient(90deg, #5eead4, #14b8a6)',
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-[#5eead4] via-[#8fc5bc] to-[#e8d3a2]" />
        </div>

        {/* Course grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {subject.courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={() => onSelectCourse(course.slug)}
            />
          ))}
        </div>
      </div>
    </GameLayout>
  );
}

/**
 * A card representing a single course in the archipelago.
 * Shows title, lesson count, progress bar, and current lesson.
 */
function CourseCard({ course, onClick }: { course: Course; onClick: () => void }) {
  const isCompleted = course.progress === 100;
  const isLocked = course.progress === 0 && course.id !== 'makecode-block-coding';
  const isActive = !isCompleted && !isLocked;

  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={`group relative overflow-hidden rounded-2xl border-2 p-5 text-left transition-all duration-300 ${
        isCompleted
          ? 'border-[#f0d78c] bg-gradient-to-br from-[#fffbf2] to-white shadow-[0_2px_12px_rgba(251,191,36,0.12)]'
          : isActive
          ? 'border-[#8fd6ce] bg-gradient-to-br from-[#f2fbfa] to-white shadow-[0_2px_12px_rgba(13,148,136,0.10)]'
          : 'border-[#e2e8f0] bg-white/70 opacity-60'
      } ${isLocked ? '' : 'hover:-translate-y-1 hover:shadow-lg'}`}
    >
      {/* Decorative island silhouette */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <svg className="h-full w-full" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <ellipse cx="150" cy="180" rx="140" ry="30" fill={course.colorPalette.sand} />
          <path d="M80,160 Q100,100 150,80 Q200,100 220,160 Z" fill={course.colorPalette.accent} />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl text-lg shadow-sm"
              style={{
                backgroundColor: `${course.colorPalette.accent}15`,
                borderColor: course.colorPalette.accent,
                borderWidth: '1px',
              }}
            >
              {course.icon}
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-[#1a4a48] truncate">{course.title}</h3>
              <p className="text-xs text-[#5a8a87]">{course.totalLessons} lessons</p>
            </div>
          </div>
          <span className="text-lg flex-shrink-0">
            {isCompleted ? '🏆' : isLocked ? '🔒' : '📖'}
          </span>
        </div>

        {/* Description */}
        <p className="mt-3 text-xs leading-relaxed text-[#5a8a87] line-clamp-2">
          {course.description}
        </p>

        {/* Progress */}
        {!isLocked && (
          <div className="mt-4">
            <div className="mb-1 flex items-center justify-between text-xs text-[#5a8a87]">
              <span>{isCompleted ? 'Completed' : `Lesson ${course.currentLesson} of ${course.totalLessons}`}</span>
              <span className="font-semibold text-[#1a4a48]">{course.progress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#e8f0ef]">
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${course.progress}%`,
                  background: isCompleted
                    ? 'linear-gradient(90deg, #fbbf24, #f59e0b)'
                    : 'linear-gradient(90deg, #5eead4, #14b8a6)',
                }}
              />
            </div>
          </div>
        )}

        {isLocked && (
          <p className="mt-3 text-xs italic text-[#8a9e9d]">Complete previous course to unlock</p>
        )}

        {/* Explore hint */}
        {isActive && (
          <div className="mt-3 flex items-center gap-1 text-xs font-medium text-[#0d9488] opacity-0 transition-opacity group-hover:opacity-100">
            <span>Explore course</span>
            <span>→</span>
          </div>
        )}
      </div>
    </button>
  );
}

/**
 * Displays the lesson islands for a selected course (Level 1).
 * Reuses the existing ArchipelagoClusterLayout component.
 */
function CourseLessonView({
  subject,
  courseSlug,
  onBack,
}: {
  subject: Subject;
  courseSlug: string;
  onBack: () => void;
}) {
  const course = getCourseBySlug(courseSlug);

  if (!course) {
    return (
      <GameLayout xp={2450} level={5} streak={12}>
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-lg text-[#5a8a87]">Course not found</p>
          <button onClick={onBack} className="mt-4 text-sm font-medium text-[#0d9488] hover:underline">
            ← Back to courses
          </button>
        </div>
      </GameLayout>
    );
  }

  return (
    <GameLayout xp={2450} level={5} streak={12}>
      <div className="space-y-6">
        {/* Breadcrumb navigation */}
        <div className="flex items-center gap-2 text-xs font-medium text-[#5a8a87]">
          <button onClick={() => window.location.hash = '#/world'} className="hover:text-[#1a4a48] transition-colors">
            World Map
          </button>
          <span>/</span>
          <button onClick={onBack} className="hover:text-[#1a4a48] transition-colors">
            {subject.title}
          </button>
          <span>/</span>
          <span className="text-[#1a4a48]">{course.title}</span>
        </div>

        {/* Course header */}
        <div className="text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-[#7aaba6]">
            {subject.title} · Course
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-[#1a4a48] md:text-4xl">
            {course.icon} {course.title}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#4a7a78]">
            {course.description}
          </p>

          {/* Progress indicator */}
          <div className="mx-auto mt-4 flex max-w-xs items-center gap-3 rounded-lg border border-[#b8ddd5]/50 bg-white/60 px-3 py-2 shadow-sm">
            <span className="text-sm">📊</span>
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs text-[#5a8a87]">
                <span>Progress</span>
                <span className="font-semibold text-[#1a4a48]">{course.progress}%</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[#e8f0ef]">
                <div
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${course.progress}%`,
                    background: course.progress === 100
                      ? 'linear-gradient(90deg, #fbbf24, #f59e0b)'
                      : 'linear-gradient(90deg, #5eead4, #14b8a6)',
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mx-auto mt-4 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#5eead4] via-[#8fc5bc] to-[#e8d3a2]" />
        </div>

        {/* Lesson Islands (Level 1) — reuses existing ArchipelagoClusterLayout */}
        <div className="overflow-hidden rounded-3xl border border-[#b8ddd5]/60 bg-gradient-to-br from-[#e8f4f2] via-[#fafdfc] to-[#f5faf9] px-4 py-8 shadow-[0_2px_20px_rgba(13,148,136,0.05)] backdrop-blur-sm sm:px-6 md:py-10">
          <ArchipelagoClusterLayout
            lessons={course.islands.map((island) => ({
              id: island.id,
              name: island.name,
              progress: island.progress,
              locked: island.locked,
              lessons: island.lessons,
              courseSlug: course.slug,
            }))}
            courseSlug={course.slug}
            t={t}
          />
        </div>

        {/* Back button */}
        <div className="flex justify-center">
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-xl border border-[#b8ddd5]/60 bg-white/70 px-5 py-2.5 text-sm font-medium text-[#3d7a78] shadow-sm transition-all hover:bg-white hover:shadow-md"
          >
            ← Back to {subject.title} courses
          </button>
        </div>
      </div>
    </GameLayout>
  );
}
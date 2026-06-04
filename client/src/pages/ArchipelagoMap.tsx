import { useState, useCallback, useMemo } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, ChevronRight, Compass, Ship, Map as MapIcon, Sparkles, Lock, CheckCircle2, PlayCircle, Star, GraduationCap, Wind, Trophy, Zap } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { StatusBadge, type LessonStatus } from "@/components/StatusBadge";
import {
  programmingArchipelago,
  type ArchipelagoCourse,
} from "@/data/archipelago-config";

type ViewLevel = "world" | "course" | "lessons";

/**
 * ArchipelagoMap – The gamified learning map for the Programmier-Archipel.
 *
 * Three zoom levels:
 *   world   → Shows the archipelago with large course islands
 *   course  → Shows a specific course (e.g., Minecraft Education Basic)
 *   lessons → Shows the lesson islands inside a course (a learning path)
 *
 * Design: Tropical archipelago, pirate adventure theme, world map experience.
 */
export default function ArchipelagoMap() {
  const [, setLocation] = useLocation();
  const { t } = useI18n();
  const config = programmingArchipelago;

  const [viewLevel, setViewLevel] = useState<ViewLevel>("world");
  const [selectedCourse, setSelectedCourse] = useState<ArchipelagoCourse | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const goToCourse = useCallback((course: ArchipelagoCourse) => {
    setSelectedCourse(course);
    if (course.lessons.length > 0) {
      setViewLevel("course");
    }
  }, []);

  const goToLessons = useCallback(() => {
    setViewLevel("lessons");
  }, []);

  const goToLesson = useCallback(
    (lessonId: number) => {
      setLocation(`/lesson/${lessonId}`);
    },
    [setLocation]
  );

  const handleBack = useCallback(() => {
    if (viewLevel === "lessons") {
      setViewLevel("course");
    } else if (viewLevel === "course") {
      setSelectedCourse(null);
      setViewLevel("world");
    }
  }, [viewLevel]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-900 via-teal-800 to-emerald-900 overflow-hidden relative">
      {/* Ocean background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-800/60 via-teal-700/40 to-emerald-800/60" />
        <svg
          className="absolute bottom-0 w-full h-48 opacity-30"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0D9488" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#14B8A6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0D9488" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGrad)"
            d="M0,32 C360,64 720,0 1080,32 L1440,64 L1440,120 L0,120 Z"
            className="animate-wave-slow"
          />
          <path
            fill="url(#waveGrad)"
            d="M0,48 C360,80 720,16 1080,48 L1440,80 L1440,120 L0,120 Z"
            className="animate-wave-slower"
            opacity="0.6"
          />
        </svg>
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-cyan-300/30 rounded-full animate-float-slow" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-teal-300/20 rounded-full animate-float-slower" />
        <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-emerald-300/25 rounded-full animate-float-slow" />
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-cyan-200/20 rounded-full animate-float-slower" />
      </div>

      {/* Header */}
      <header className="relative z-20 bg-white/10 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {viewLevel !== "world" ? (
              <button
                onClick={handleBack}
                className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
            ) : null}
            <div className="flex items-center gap-2">
              <MapIcon className="w-5 h-5 text-cyan-300" />
              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {t(config.titleKey)}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-cyan-200/80">
            {viewLevel === "world" && (
              <span className="flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" />
                Explore & Discover
              </span>
            )}
            {viewLevel === "course" && selectedCourse && (
              <span className="flex items-center gap-1">
                <Ship className="w-3.5 h-3.5" />
                {t(selectedCourse.titleKey)}
              </span>
            )}
            {viewLevel === "lessons" && selectedCourse && (
              <span className="flex items-center gap-1">
                <Ship className="w-3.5 h-3.5" />
                {t(selectedCourse.titleKey)} → Learning Path
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {viewLevel === "world" && (
          <WorldMapView
            config={config}
            t={t}
            onCourseClick={goToCourse}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
          />
        )}

        {viewLevel === "course" && selectedCourse && (
          <CourseView
            course={selectedCourse}
            t={t}
            onExploreLessons={goToLessons}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
          />
        )}

        {viewLevel === "lessons" && selectedCourse && (
          <LessonsMapView
            course={selectedCourse}
            t={t}
            onLessonClick={goToLesson}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
          />
        )}
      </main>

      <footer className="relative z-20 text-center py-4 text-xs text-white/30">
        Set sail on your learning adventure 🌊⚓
      </footer>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          25% { transform: translateY(-15px) translateX(5px); opacity: 0.5; }
          50% { transform: translateY(-8px) translateX(-5px); opacity: 0.4; }
          75% { transform: translateY(-20px) translateX(3px); opacity: 0.5; }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px); opacity: 0.2; }
          50% { transform: translateY(-25px); opacity: 0.4; }
        }
        @keyframes wave-slow {
          0% { transform: translateX(0); }
          50% { transform: translateX(-10%); }
          100% { transform: translateX(0); }
        }
        @keyframes wave-slower {
          0% { transform: translateX(0); }
          50% { transform: translateX(10%); }
          100% { transform: translateX(0); }
        }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 8s ease-in-out infinite; }
        .animate-wave-slow { animation: wave-slow 8s ease-in-out infinite; }
        .animate-wave-slower { animation: wave-slower 12s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

// ─── World Map View ────────────────────────────────────────────────────────────
function WorldMapView({
  config,
  t,
  onCourseClick,
  hoveredId,
  setHoveredId,
}: {
  config: { titleKey: string; subtitleKey: string; courses: ArchipelagoCourse[] };
  t: (key: string, fallback?: string) => string;
  onCourseClick: (course: ArchipelagoCourse) => void;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}) {
  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">🗺️ Explore the Archipelago</h2>
        <p className="text-cyan-200/70 text-sm sm:text-base italic">
          {t(config.subtitleKey)}
        </p>
      </div>

      {/* Archipelago Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {config.courses.map((course) => {
          const isHovered = hoveredId === course.id;
          const lessonCount = course.lessons.length;
          const completedCount = course.lessons.filter((l) => l.completed).length;
          const progress = Math.round((completedCount / lessonCount) * 100);

          return (
            <div
              key={course.id}
              onClick={() => course.available && onCourseClick(course)}
              onMouseEnter={() => setHoveredId(course.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`relative overflow-hidden rounded-2xl transition-all duration-300 cursor-pointer ${
                course.available
                  ? isHovered
                    ? "scale-105 shadow-2xl"
                    : "hover:shadow-xl"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              {/* Background Hero Image placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-teal-600/30 opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

              <div className="relative p-6 sm:p-8 text-white min-h-96 flex flex-col">
                {/* Top section with emoji and info */}
                <div className="mb-auto">
                  <div className="text-5xl mb-4">🏝️</div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                    {t(course.titleKey)}
                  </h3>
                  <p className="text-cyan-100 text-sm sm:text-base mb-4 line-clamp-2">
                    {t(course.descriptionKey)}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
                      <p className="text-xs text-cyan-200">Islands</p>
                      <p className="text-lg font-bold">{lessonCount}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
                      <p className="text-xs text-amber-200">XP</p>
                      <p className="text-lg font-bold">{Math.round(lessonCount * 100)}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
                      <p className="text-xs text-emerald-200">Level</p>
                      <p className="text-lg font-bold">
                        {course.difficulty === "Beginner"
                          ? "⭐"
                          : course.difficulty === "Intermediate"
                          ? "⭐⭐"
                          : "⭐⭐⭐"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress section */}
                <div className="space-y-2 border-t border-white/10 pt-4">
                  <div className="flex justify-between text-sm">
                    <span>{t("archipelago.explored") ?? "Explored"}</span>
                    <span className="font-bold">{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-cyan-200">
                    {completedCount} of {lessonCount} islands discovered
                  </p>
                </div>

                {/* Status Badge */}
                {!course.available && (
                  <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-lg flex items-center gap-1">
                    <Lock className="w-4 h-4" />
                    <span className="text-xs font-bold">Locked</span>
                  </div>
                )}

                {course.isCurrent && (
                  <div className="absolute top-4 right-4 bg-amber-500/80 backdrop-blur-sm px-3 py-1 rounded-lg flex items-center gap-1">
                    <Wind className="w-4 h-4" />
                    <span className="text-xs font-bold">Current</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Course View ────────────────────────────────────────────────────────────
function CourseView({
  course,
  t,
  onExploreLessons,
  hoveredId,
  setHoveredId,
}: {
  course: ArchipelagoCourse;
  t: (key: string, fallback?: string) => string;
  onExploreLessons: () => void;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}) {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/20 to-teal-600/30 p-8 sm:p-12 border border-white/20 min-h-96 flex items-end">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        <div className="relative z-10 space-y-4 w-full">
          <div className="text-6xl">🏝️</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            {t(course.titleKey)}
          </h2>
          <p className="text-cyan-100 text-lg">
            {t(course.descriptionKey)}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 pt-4 border-t border-white/10">
            <div className="text-center">
              <p className="text-cyan-200 text-sm">Islands</p>
              <p className="text-2xl font-bold text-white">{course.lessons.length}</p>
            </div>
            <div className="text-center">
              <p className="text-amber-200 text-sm">Total XP</p>
              <p className="text-2xl font-bold text-white">{Math.round(course.lessons.length * 100)}</p>
            </div>
            <div className="text-center">
              <p className="text-emerald-200 text-sm">Completed</p>
              <p className="text-2xl font-bold text-white">{course.lessons.filter((l) => l.completed).length}</p>
            </div>
            <div className="text-center">
              <p className="text-rose-200 text-sm">Progress</p>
              <p className="text-2xl font-bold text-white">
                {Math.round((course.lessons.filter((l) => l.completed).length / course.lessons.length) * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Preview Cards */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          ⛓️ Island Path ({course.lessons.length} islands)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {course.lessons.map((lesson, idx) => {
            const isHovered = hoveredId === `lesson-${lesson.id}`;

            return (
              <div
                key={lesson.id}
                onMouseEnter={() => setHoveredId(`lesson-${lesson.id}`)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 transition-all duration-300 ${
                  isHovered ? "scale-105 shadow-xl border-cyan-300" : ""
                }`}
              >
                {/* Number Badge */}
                <div className="absolute top-3 left-3 bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>

                {/* Status Icons */}
                <div className="absolute top-3 right-3">
                  {lesson.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  ) : lesson.available ? (
                    <div className="w-6 h-6 rounded-full border-2 border-cyan-400 flex items-center justify-center">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                    </div>
                  ) : (
                    <Lock className="w-6 h-6 text-slate-400" />
                  )}
                </div>

                <div className="mt-6 space-y-2">
                  <h4 className="text-white font-bold line-clamp-2">{lesson.title}</h4>
                  <p className="text-cyan-100 text-sm line-clamp-2">{lesson.subtitle}</p>
                  <div className="flex gap-2 pt-2 text-xs text-cyan-200">
                    <span>⏱ {lesson.duration ?? 10}m</span>
                    <span>⭐ {lesson.xp ?? 50} XP</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={onExploreLessons}
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg transform hover:scale-105"
      >
        <Wind className="w-5 h-5" />
        Begin Your Voyage
      </button>
    </div>
  );
}

// ─── Lessons Map View ────────────────────────────────────────────────────────
function LessonsMapView({
  course,
  t,
  onLessonClick,
  hoveredId,
  setHoveredId,
}: {
  course: ArchipelagoCourse;
  t: (key: string, fallback?: string) => string;
  onLessonClick: (lessonId: number) => void;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}) {
  const completedCount = course.lessons.filter((l) => l.completed).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">⛓️ Island Learning Path</h2>
        <p className="text-cyan-200 text-sm">
          {completedCount} of {course.lessons.length} islands discovered
        </p>
      </div>

      {/* Overall Progress */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
        <div className="flex justify-between text-cyan-200 text-sm mb-2">
          <span>Voyage Progress</span>
          <span className="font-bold">
            {Math.round((completedCount / course.lessons.length) * 100)}%
          </span>
        </div>
        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden border border-cyan-300">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 transition-all duration-500"
            style={{
              width: `${(completedCount / course.lessons.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Lessons Grid - Island Path */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {course.lessons.map((lesson, idx) => {
          const isHovered = hoveredId === `${lesson.id}`;
          const isPrevious = idx === 0;
          const isCurrent = lesson.current;
          const isNext = idx === completedCount && lesson.available;

          return (
            <div
              key={lesson.id}
              onClick={() => lesson.available && onLessonClick(lesson.id)}
              onMouseEnter={() => setHoveredId(`${lesson.id}`)}
              onMouseLeave={() => setHoveredId(null)}
              className={`relative group overflow-hidden rounded-2xl p-6 transition-all duration-300 cursor-pointer ${
                lesson.completed
                  ? "bg-gradient-to-br from-emerald-500/20 to-green-600/20 border-2 border-emerald-400 shadow-lg"
                  : lesson.current
                  ? "bg-gradient-to-br from-amber-500/20 to-orange-600/20 border-2 border-amber-400 shadow-lg scale-105"
                  : lesson.available
                  ? "bg-white/10 border border-white/20 hover:border-cyan-300 " + (isHovered ? "scale-105 shadow-xl" : "")
                  : "bg-slate-800/20 border border-slate-600 opacity-40 cursor-not-allowed"
              }`}
            >
              {/* Island Number Badge */}
              <div
                className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 ${
                  lesson.completed
                    ? "bg-emerald-500 text-white"
                    : lesson.current
                    ? "bg-amber-500 text-white animate-pulse"
                    : lesson.available
                    ? "bg-cyan-500 text-white"
                    : "bg-slate-600 text-slate-300"
                }`}
              >
                {idx + 1}
              </div>

              {/* Status Icon */}
              <div className="absolute top-4 right-4">
                {lesson.completed ? (
                  <div className="flex items-center gap-1 bg-emerald-500/80 px-2 py-1 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span className="text-xs font-bold text-white">Done</span>
                  </div>
                ) : lesson.current ? (
                  <div className="flex items-center gap-1 bg-amber-500/80 px-2 py-1 rounded-lg animate-pulse">
                    <Compass className="w-4 h-4 text-white" />
                    <span className="text-xs font-bold text-white">Current</span>
                  </div>
                ) : lesson.available ? (
                  <div className="flex items-center gap-1 bg-cyan-500/80 px-2 py-1 rounded-lg">
                    <PlayCircle className="w-4 h-4 text-white" />
                    <span className="text-xs font-bold text-white">Ready</span>
                  </div>
                ) : (
                  <Lock className="w-5 h-5 text-slate-400" />
                )}
              </div>

              {/* Content */}
              <div className="mt-8 space-y-2">
                <h3 className="text-lg font-bold text-white line-clamp-2 group-hover:text-cyan-200 transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-sm text-cyan-100 line-clamp-2">{lesson.subtitle}</p>

                {/* Stats */}
                <div className="flex gap-3 pt-3 text-xs text-cyan-200 border-t border-white/10">
                  <span>⏱ {lesson.duration ?? 10} min</span>
                  <span>⚡ {lesson.xp ?? 50} XP</span>
                </div>
              </div>

              {/* Hover Label */}
              {lesson.available && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                  <p className="text-white font-bold text-sm flex items-center gap-1">
                    <Wind className="w-4 h-4" />
                    Start Lesson
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Motivation Message */}
      {completedCount < course.lessons.length && (
        <div className="bg-gradient-to-r from-amber-500/20 to-orange-600/20 border border-amber-400/50 rounded-xl p-6 text-center">
          <p className="text-white font-bold text-lg">
            {completedCount === course.lessons.length - 1
              ? "🎉 Almost there! One more island to complete this expedition!"
              : "⛵ Keep exploring! Adventure awaits!"}
          </p>
        </div>
      )}

      {completedCount === course.lessons.length && (
        <div className="bg-gradient-to-r from-emerald-500/20 to-green-600/20 border border-emerald-400/50 rounded-xl p-6 text-center">
          <p className="text-white font-bold text-lg">
            🏴‍☠️ Congratulations! You've mastered {t(course.titleKey)}!
          </p>
        </div>
      )}
    </div>
  );
}

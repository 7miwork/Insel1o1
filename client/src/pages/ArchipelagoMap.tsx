import { useState, useCallback } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, Compass, Ship, Map as MapIcon } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
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
 * Design: Tropical archipelago, calm colors, glassmorphism, gentle animations.
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
                {t("archipelago.startExploring")}
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
                {t(selectedCourse.titleKey)} → {t("archipelago.lessonPath")}
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
        {t("archipelago.dragHint")}
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
      {/* Subtitle */}
      <div className="text-center">
        <p className="text-cyan-200/70 text-sm sm:text-base italic">
          {t(config.subtitleKey)}
        </p>
      </div>

      {/* SVG World Map with large course islands */}
      <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-4 sm:p-8 border border-white/10 shadow-xl">
        <svg
          className="w-full h-64 sm:h-80 md:h-96 rounded-2xl"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id="oceanGrad" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#0D9488" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#115E59" stopOpacity="0.05" />
            </radialGradient>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <pattern id="wavePattern" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
              <path
                d="M0,7.5 Q3.75,3.75 7.5,7.5 T15,7.5"
                stroke="rgba(13,148,136,0.12)"
                fill="none"
                strokeWidth="0.4"
              />
            </pattern>
          </defs>

          <rect width="100" height="100" fill="url(#oceanGrad)" />
          <rect width="100" height="100" fill="url(#wavePattern)" />

          {/* Connection path between course islands */}
          {config.courses.filter(c => c.available).length > 1 && (
            <path
              d={config.courses
                .filter((c) => c.available)
                .map((c, i) => (i === 0 ? `M${c.x},${c.y}` : `L${c.x},${c.y}`))
                .join(" ")}
              stroke="rgba(253, 230, 138, 0.15)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="3,3"
            />
          )}

          {/* Course islands – significantly larger than lesson islands */}
          {config.courses.map((course) => {
            const isHovered = hoveredId === course.id;
            const lessonCount = course.lessons.length;

            return (
              <g
                key={course.id}
                onClick={() => course.available && onCourseClick(course)}
                onMouseEnter={() => setHoveredId(course.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={course.available ? "cursor-pointer" : "cursor-not-allowed"}
                style={{
                  transformOrigin: `${course.x}% ${course.y}%`,
                  opacity: course.available ? 1 : 0.4,
                }}
              >
                {/* Outer glow ring */}
                <circle
                  cx={course.x}
                  cy={course.y}
                  r={isHovered ? 20 : 17}
                  fill={course.color}
                  opacity={isHovered ? 0.2 : 0.08}
                  className="transition-all duration-500"
                />

                {/* Sandy beach ring */}
                <circle
                  cx={course.x}
                  cy={course.y}
                  r={isHovered ? 16 : 14}
                  fill="#FDE68A"
                  opacity="0.25"
                  className="transition-all duration-500"
                />

                {/* Main island */}
                <circle
                  cx={course.x}
                  cy={course.y}
                  r={isHovered ? 13 : 11}
                  fill={course.color}
                  filter="url(#softGlow)"
                  className="transition-all duration-500"
                />

                {/* Inner highlight */}
                <circle
                  cx={course.x - 3}
                  cy={course.y - 3}
                  r={isHovered ? 6 : 5}
                  fill="rgba(255,255,255,0.1)"
                  className="transition-all duration-500"
                />

                {/* Emoji icon – larger for course islands */}
                <text
                  x={course.x}
                  y={course.y + 3}
                  textAnchor="middle"
                  fontSize={isHovered ? "7" : "6"}
                  className="pointer-events-none transition-all duration-500"
                >
                  {course.emoji}
                </text>

                {/* Course label */}
                <text
                  x={course.x}
                  y={course.y + 22}
                  textAnchor="middle"
                  fontSize="2.5"
                  fill="white"
                  fontWeight="bold"
                  opacity={isHovered ? 1 : 0.8}
                  className="pointer-events-none transition-all duration-500"
                >
                  {t(course.titleKey).split(" Education")[0]}
                </text>

                {/* Lesson count badge */}
                {lessonCount > 0 && (
                  <g>
                    <circle
                      cx={course.x + 12}
                      cy={course.y - 10}
                      r="4"
                      fill="#FDE68A"
                      opacity="0.9"
                    />
                    <text
                      x={course.x + 12}
                      y={course.y - 8.5}
                      textAnchor="middle"
                      fontSize="2.5"
                      fill="#0D9488"
                      fontWeight="bold"
                      className="pointer-events-none"
                    >
                      {lessonCount}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {config.courses.map((course) => {
          const lessonCount = course.lessons.length;
          return (
            <div
              key={course.id}
              onClick={() => course.available && onCourseClick(course)}
              className={`relative group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 transition-all duration-300 overflow-hidden ${
                course.available
                  ? "hover:bg-white/15 hover:border-white/20 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl"
                style={{ backgroundColor: course.color }}
              />

              <div className="relative z-10 space-y-3">
                <div className="flex items-start justify-between">
                  <span className="text-5xl drop-shadow-lg">{course.emoji}</span>
                  <span className="text-xs font-semibold text-white bg-white/10 px-3 py-1.5 rounded-full">
                    {lessonCount > 0
                      ? `${lessonCount} ${t("archipelago.lesson_other")}`
                      : t("archipelago.comingSoon")}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">{t(course.titleKey)}</h3>
                <p className="text-sm text-cyan-200/70 line-clamp-2">
                  {t(course.descriptionKey)}
                </p>
                {course.available && lessonCount > 0 && (
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 group-hover:text-white transition-colors">
                      {t("archipelago.exploreCourse")}
                      <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
                    </span>
                  </div>
                )}
              </div>

              {/* Color accent bar */}
              <div
                className="absolute bottom-0 left-6 right-6 h-1 rounded-full opacity-40"
                style={{ backgroundColor: course.color }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Course View ────────────────────────────────────────────────────────────────
function CourseView({
  course,
  t,
  onExploreLessons,
}: {
  course: ArchipelagoCourse;
  t: (key: string, fallback?: string) => string;
  onExploreLessons: () => void;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}) {
  const lessonCount = course.lessons.length;

  return (
    <div className="space-y-8">
      {/* Course Hero */}
      <div
        className="relative rounded-3xl p-8 sm:p-12 overflow-hidden border border-white/10"
        style={{
          background: `linear-gradient(135deg, ${course.color}22, ${course.color}44)`,
        }}
      >
        <div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10"
          style={{ backgroundColor: course.color }}
        />
        <div
          className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10"
          style={{ backgroundColor: course.color }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <span className="text-6xl sm:text-7xl drop-shadow-xl">{course.emoji}</span>
          <div className="flex-1">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              {t(course.titleKey)}
            </h2>
            <p className="text-cyan-200/70 text-sm sm:text-base max-w-xl">
              {t(course.descriptionKey)}
            </p>
            <div className="flex items-center gap-4 mt-4">
              <span className="text-xs text-white/50 flex items-center gap-1">
                <Ship className="w-3.5 h-3.5" />
                {lessonCount > 0
                  ? `${lessonCount} ${t("archipelago.lesson_other")}`
                  : t("archipelago.comingSoon")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {lessonCount > 0 && (
        <>
          {/* Start Course Button */}
          <div className="text-center">
            <button
              onClick={onExploreLessons}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              style={{
                background: `linear-gradient(135deg, ${course.color}, ${course.color}dd)`,
              }}
            >
              {t("archipelago.startCourse")}
              <ChevronLeft className="w-5 h-5 rotate-180" />
            </button>
          </div>

          {/* Lesson preview cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {course.lessons.map((lesson, idx) => (
              <div
                key={lesson.id}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/5 flex items-center gap-3"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0"
                  style={{ backgroundColor: course.color }}
                >
                  {idx + 1}
                </div>
                <span className="text-xs text-cyan-200/70">
                  {t("archipelago.lesson")} {idx + 1}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Lessons Map View ───────────────────────────────────────────────────────────
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
  return (
    <div className="space-y-8">
      {/* Section Title */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
          {t("archipelago.lessonPath")}
        </h2>
        <p className="text-cyan-200/60 text-sm">
          {course.lessons.length} {t("archipelago.island_other")}
        </p>
      </div>

      {/* SVG Island Map with learning path */}
      <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-4 sm:p-8 border border-white/10 shadow-xl">
        <svg
          className="w-full h-64 sm:h-80 md:h-96 rounded-2xl"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id="islandOcean" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#0D9488" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#115E59" stopOpacity="0.05" />
            </radialGradient>
            <filter id="islandGlow">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <pattern id="wavePattern2" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
              <path
                d="M0,6 Q3,3 6,6 T12,6"
                stroke="rgba(13,148,136,0.1)"
                fill="none"
                strokeWidth="0.3"
              />
            </pattern>
          </defs>

          <rect width="100" height="100" fill="url(#islandOcean)" />
          <rect width="100" height="100" fill="url(#wavePattern2)" />

          {/* Learning path connection lines */}
          <path
            d={course.lessons
              .filter((l) => l.available)
              .map((l, i) => {
                if (i === 0) return `M${l.x},${l.y}`;
                return `L${l.x},${l.y}`;
              })
              .join(" ")}
            stroke={course.color}
            strokeWidth="0.5"
            fill="none"
            strokeDasharray="1.5,2"
            opacity="0.4"
          />

          {/* Start marker */}
          <text x={course.lessons[0]?.x ?? 10} y={(course.lessons[0]?.y ?? 10) - 8} textAnchor="middle" fontSize="2" fill="#FDE68A" opacity="0.6" fontWeight="bold">
            START
          </text>

          {/* Lesson Islands */}
          {course.lessons.map((lesson, idx) => {
            const isHovered = hoveredId === `lesson-${lesson.id}`;

            return (
              <g
                key={lesson.id}
                onClick={() => lesson.available && onLessonClick(lesson.id)}
                onMouseEnter={() => setHoveredId(`lesson-${lesson.id}`)}
                onMouseLeave={() => setHoveredId(null)}
                className={lesson.available ? "cursor-pointer" : "cursor-not-allowed"}
                style={{
                  transformOrigin: `${lesson.x}% ${lesson.y}%`,
                  opacity: lesson.available ? 1 : 0.35,
                }}
              >
                {/* Water ring */}
                <circle
                  cx={lesson.x}
                  cy={lesson.y}
                  r={lesson.isMainIsland || lesson.isFinalIsland ? (isHovered ? 11 : 9) : (isHovered ? 6.5 : 5.5)}
                  fill={course.color}
                  opacity={isHovered ? 0.25 : 0.1}
                  className="transition-all duration-500"
                />

                {/* Sandy beach */}
                <circle
                  cx={lesson.x}
                  cy={lesson.y}
                  r={lesson.isMainIsland || lesson.isFinalIsland ? (isHovered ? 9 : 7.5) : (isHovered ? 5 : 4.2)}
                  fill="#FDE68A"
                  opacity={lesson.isMainIsland ? 0.35 : 0.2}
                  className="transition-all duration-500"
                />

                {/* Island */}
                <circle
                  cx={lesson.x}
                  cy={lesson.y}
                  r={lesson.isMainIsland || lesson.isFinalIsland ? (isHovered ? 7.5 : 6.5) : (isHovered ? 4 : 3.5)}
                  fill={lesson.isFinalIsland ? "#7C3AED" : (lesson.isMainIsland ? "#7C3AED" : course.color)}
                  filter={lesson.isMainIsland ? "url(#islandGlow)" : "url(#islandGlow)"}
                  className={`transition-all duration-500 ${lesson.isMainIsland ? "animate-pulse-glow" : ""}`}
                />

                {/* Golden crown for main island */}
                  {(lesson.isMainIsland || lesson.isFinalIsland) && (
                  <text
                    x={lesson.x}
                    y={lesson.y - 9}
                    textAnchor="middle"
                    fontSize="3.5"
                    className="pointer-events-none"
                  >
                    👑
                  </text>
                )}

                {/* Lesson number */}
                <text
                  x={lesson.x}
                  y={lesson.y + 1.5}
                  textAnchor="middle"
                  fontSize={isHovered ? "3" : "2.5"}
                  fill={lesson.isMainIsland ? "#FDE68A" : "white"}
                  fontWeight="bold"
                  className="pointer-events-none transition-all duration-500"
                >
                  {idx + 1}
                </text>

                {/* Hover label - lesson name */}
                {isHovered && (
                  <g>
                    <text
                      x={lesson.x}
                      y={lesson.y - 8}
                      textAnchor="middle"
                      fontSize="2.2"
                      fill="white"
                      opacity="0.95"
                      fontWeight="bold"
                      className="pointer-events-none"
                    >
                      {t(lesson.titleKey)}
                    </text>
                    {lesson.subtitleKey && (
                      <text
                        x={lesson.x}
                        y={lesson.y - 5}
                        textAnchor="middle"
                        fontSize="1.6"
                        fill="#FDE68A"
                        opacity="0.8"
                        className="pointer-events-none"
                      >
                        {t(lesson.subtitleKey)}
                      </text>
                    )}
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Lesson Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {course.lessons.map((lesson, idx) => (
          <div
            key={lesson.id}
            onClick={() => lesson.available && onLessonClick(lesson.id)}
            className={`relative bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 transition-all duration-300 ${
              lesson.available
                ? "hover:bg-white/15 hover:border-white/20 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                : "opacity-40 cursor-not-allowed"
            }`}
          >
            <div className="flex flex-col items-center text-center gap-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: course.color }}
              >
                {idx + 1}
              </div>
              <span className="text-xs text-cyan-200/70">
                {t("archipelago.lesson")} {idx + 1}
              </span>
            </div>
            <div
              className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full opacity-30"
              style={{ backgroundColor: course.color }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

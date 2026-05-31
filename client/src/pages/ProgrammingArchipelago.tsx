import { useState, useCallback, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, Compass, Ship, Map as MapIcon } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import {
  programmingArchipelago,
  type ArchipelagoCourse,
} from "@/data/archipelago-config";

type ViewLevel = "world" | "course" | "lessons";

/**
 * ProgrammingArchipelago – The main gamified learning map.
 *
 * Three zoom levels:
 *   world   → Shows the Programmier-Archipel with all courses as islands
 *   course  → Shows a specific course (e.g., Minecraft Education)
 *   lessons → Shows the lesson islands inside a course (e.g., Block Coding Basic islands)
 *
 * Design: Tropical archipelago, calm colors, glassmorphism, gentle animations.
 */
export default function ProgrammingArchipelago() {
  const [, setLocation] = useLocation();
  const { t } = useI18n();
  const config = programmingArchipelago;

  const [viewLevel, setViewLevel] = useState<ViewLevel>("world");
  const [selectedCourse, setSelectedCourse] = useState<ArchipelagoCourse | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // ---------- Navigation ----------
  const goToCourse = useCallback((course: ArchipelagoCourse) => {
    setSelectedCourse(course);
    setViewLevel("course");
  }, []);

  const goToLessons = useCallback((course: ArchipelagoCourse) => {
    setSelectedCourse(course);
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

  // ---------- Render ----------
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-900 via-teal-800 to-emerald-900 overflow-hidden relative">
      {/* Ocean background with animated waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Deep water gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-800/60 via-teal-700/40 to-emerald-800/60" />

        {/* Animated wave patterns */}
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

        {/* Floating light particles */}
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

          {/* Breadcrumb */}
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
                {t(selectedCourse.titleKey)} → {t("archipelago.blockCodingBasic")}
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
            onExploreLessons={() => goToLessons(selectedCourse)}
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

      {/* Footer */}
      <footer className="relative z-20 text-center py-4 text-xs text-white/30">
        {t("archipelago.dragHint")}
      </footer>

      {/* Animations */}
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
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 8px rgba(13, 148, 136, 0.3); }
          50% { box-shadow: 0 0 20px rgba(13, 148, 136, 0.6); }
        }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 8s ease-in-out infinite; }
        .animate-wave-slow { animation: wave-slow 8s ease-in-out infinite; }
        .animate-wave-slower { animation: wave-slower 12s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
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

      {/* SVG World Map */}
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
              <feGaussianBlur stdDeviation="1.5" result="blur" />
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

          {/* Ocean base */}
          <rect width="100" height="100" fill="url(#oceanGrad)" />
          <rect width="100" height="100" fill="url(#wavePattern)" />

          {/* Course islands on the world map */}
          {config.courses.map((course) => {
            const isHovered = hoveredId === course.id;
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
                {/* Glow ring */}
                <circle
                  cx={course.x}
                  cy={course.y}
                  r={isHovered ? 11 : 9}
                  fill={course.color}
                  opacity={isHovered ? 0.25 : 0.1}
                  className="transition-all duration-500"
                />

                {/* Island base */}
                <circle
                  cx={course.x}
                  cy={course.y}
                  r={isHovered ? 8 : 6.5}
                  fill={course.color}
                  opacity="0.6"
                  filter="url(#softGlow)"
                  className="transition-all duration-500"
                />

                {/* Sandy ring */}
                <circle
                  cx={course.x}
                  cy={course.y}
                  r={isHovered ? 7 : 5.5}
                  fill="#FDE68A"
                  opacity="0.3"
                  className="transition-all duration-500"
                />

                {/* Inner island */}
                <circle
                  cx={course.x}
                  cy={course.y}
                  r={isHovered ? 5.5 : 4.5}
                  fill={course.color}
                  className="transition-all duration-500"
                />

                {/* Emoji icon */}
                <text
                  x={course.x}
                  y={course.y + 1.2}
                  textAnchor="middle"
                  fontSize={isHovered ? "4" : "3.5"}
                  className="pointer-events-none transition-all duration-500"
                >
                  {course.emoji}
                </text>

                {/* Label */}
                <text
                  x={course.x}
                  y={course.y + 13}
                  textAnchor="middle"
                  fontSize="2.2"
                  fill="white"
                  fontWeight="600"
                  opacity={isHovered ? 1 : 0.7}
                  className="pointer-events-none transition-all duration-500"
                >
                  {t(course.titleKey).split(" ")[0]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {config.courses.map((course) => (
          <div
            key={course.id}
            onClick={() => course.available && onCourseClick(course)}
            className={`relative group bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 transition-all duration-300 overflow-hidden ${
              course.available
                ? "hover:bg-white/15 hover:border-white/20 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            }`}
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl"
              style={{ backgroundColor: course.color }}
            />

            <div className="relative z-10 space-y-3">
              <div className="flex items-start justify-between">
                <span className="text-4xl drop-shadow-lg">{course.emoji}</span>
                <span className="text-[10px] font-semibold text-white bg-white/10 px-2.5 py-1 rounded-full">
                  {course.lessons.length} {t("archipelago.lesson_other")}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">{t(course.titleKey)}</h3>
              <p className="text-xs text-cyan-200/70 line-clamp-2">
                {t(course.descriptionKey)}
              </p>
              {course.available && (
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 group-hover:text-white transition-colors">
                    {t("archipelago.exploreCourse")}
                    <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
                  </span>
                </div>
              )}
              {!course.available && (
                <div className="pt-2">
                  <span className="text-xs text-amber-300/60 italic">
                    {t("archipelago.comingSoon")}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Course View ────────────────────────────────────────────────────────────────
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
      {/* Course Hero */}
      <div
        className="relative rounded-3xl p-8 sm:p-12 overflow-hidden border border-white/10"
        style={{
          background: `linear-gradient(135deg, ${course.color}22, ${course.color}44)`,
        }}
      >
        {/* Background decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10"
          style={{ backgroundColor: course.color }}
        />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10"
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
                {course.lessons.length} {t("archipelago.lesson_other")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Explore Button */}
      <div className="text-center">
        <button
          onClick={onExploreLessons}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          style={{
            background: `linear-gradient(135deg, ${course.color}, ${course.color}dd)`,
          }}
        >
          {t("archipelago.startLesson")}
          <ChevronLeft className="w-4 h-4 rotate-180" />
        </button>
      </div>

      {/* Lesson Preview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {course.lessons.map((lesson, idx) => (
          <div
            key={lesson.id}
            className={`bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/5 transition-all duration-300 ${
              lesson.available ? "hover:bg-white/10" : "opacity-40"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold text-cyan-300/60 w-5 h-5 flex items-center justify-center rounded-full bg-white/5">
                {idx + 1}
              </span>
              <span className="text-lg">{lesson.emoji}</span>
            </div>
            <p className="text-xs text-cyan-200/50">
              {t("archipelago.island_one")} {idx + 1}
            </p>
          </div>
        ))}
      </div>
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
          {t("archipelago.blockCodingBasic")}
        </h2>
        <p className="text-cyan-200/60 text-sm">
          {course.lessons.length} {t("archipelago.island_other")}
        </p>
      </div>

      {/* SVG Island Map */}
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
              <feGaussianBlur stdDeviation="1.2" result="blur" />
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

          {/* Connection lines between islands */}
          <path
            d={course.lessons
              .filter((l) => l.available)
              .map((l, i) => {
                if (i === 0) return `M${l.x},${l.y}`;
                return `L${l.x},${l.y}`;
              })
              .join(" ")}
            stroke="rgba(13,148,136,0.2)"
            strokeWidth="0.3"
            fill="none"
            strokeDasharray="2,2"
          />

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
                  r={isHovered ? 9 : 7}
                  fill={course.color}
                  opacity={isHovered ? 0.2 : 0.08}
                  className="transition-all duration-500"
                />

                {/* Sandy beach */}
                <circle
                  cx={lesson.x}
                  cy={lesson.y}
                  r={isHovered ? 6 : 5}
                  fill="#FDE68A"
                  opacity="0.2"
                  className="transition-all duration-500"
                />

                {/* Island */}
                <circle
                  cx={lesson.x}
                  cy={lesson.y}
                  r={isHovered ? 5 : 4}
                  fill={course.color}
                  filter="url(#islandGlow)"
                  className="transition-all duration-500"
                />

                {/* Lesson number */}
                <text
                  x={lesson.x}
                  y={lesson.y + 1}
                  textAnchor="middle"
                  fontSize={isHovered ? "3" : "2.5"}
                  fill="white"
                  fontWeight="bold"
                  className="pointer-events-none transition-all duration-500"
                >
                  {String(idx + 1).padStart(1, "0")}
                </text>

                {/* Label */}
                <text
                  x={lesson.x}
                  y={lesson.y + 10}
                  textAnchor="middle"
                  fontSize="2"
                  fill="white"
                  opacity={isHovered ? 0.9 : 0.5}
                  fontWeight="500"
                  className="pointer-events-none transition-all duration-500"
                >
                  {t("archipelago.island_one")} {idx + 1}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Lesson Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {course.lessons.map((lesson, idx) => (
          <div
            key={lesson.id}
            onClick={() => lesson.available && onLessonClick(lesson.id)}
            className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 transition-all duration-300 ${
              lesson.available
                ? "hover:bg-white/15 hover:border-white/20 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                : "opacity-40 cursor-not-allowed"
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Island number badge */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                style={{ backgroundColor: course.color }}
              >
                {idx + 1}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-white truncate">
                  {t("archipelago.island_one")} {idx + 1}
                </h4>
                <p className="text-xs text-cyan-200/50 mt-0.5">
                  {t("archipelago.blockCodingBasic")}
                </p>
              </div>

              <span className="text-lg">{lesson.emoji}</span>
            </div>

            {/* Bottom accent bar */}
            <div
              className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full opacity-40 transition-opacity duration-300"
              style={{
                backgroundColor: course.color,
                opacity: lesson.available ? 0.4 : 0.1,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState, useCallback, useMemo, useRef } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, Compass, Ship, Map as MapIcon, Lock, CheckCircle2, PlayCircle, Wind, Trophy, Target, Star, Anchor, Eye } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import {
  programmingArchipelago,
  type ArchipelagoCourse,
} from "@/data/archipelago-config";

type ViewLevel = "world" | "course" | "lessons";

export default function ArchipelagoMap() {
  const [, setLocation] = useLocation();
  const { t } = useI18n();
  const config = programmingArchipelago;

  const [viewLevel, setViewLevel] = useState<ViewLevel>("world");
  const [selectedCourse, setSelectedCourse] = useState<ArchipelagoCourse | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);

  const goToCourse = useCallback((course: ArchipelagoCourse) => {
    setSelectedCourse(course);
    if (course.lessons.length > 0) setViewLevel("course");
  }, []);

  const goToLesson = useCallback((lessonId: number) => {
    setLocation(`/lesson/${lessonId}`);
  }, [setLocation]);

  const handleBack = useCallback(() => {
    if (viewLevel === "lessons") { setViewLevel("course"); setSelectedLessonId(null); }
    else if (viewLevel === "course") { setSelectedCourse(null); setViewLevel("world"); }
    else setLocation("/dashboard");
  }, [viewLevel, setLocation]);

  const courses = config.courses;
  const totalLessons = courses.reduce((s, c) => s + c.lessons.length, 0);
  const completedLessons = courses.reduce((s, c) => s + c.lessons.filter(l => l.completed).length, 0);
  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 via-amber-800 to-amber-950 relative">
      {/* Parchment texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

      {/* Header */}
      <header className="relative z-20 bg-amber-950/50 backdrop-blur-sm border-b border-amber-700/40">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={handleBack} className="p-1.5 hover:bg-amber-700/30 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5 text-amber-200" />
            </button>
            <div className="flex items-center gap-2">
              <MapIcon className="w-4 h-4 text-amber-300" />
              <h1 className="text-base sm:text-lg font-bold text-amber-100 tracking-tight">
                {viewLevel === "world" ? t(config.titleKey) : selectedCourse ? t(selectedCourse.titleKey) : ""}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-amber-300/70">
            {viewLevel === "world" && <><Compass className="w-3 h-3" /> Explore & Discover</>}
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-4 sm:py-6">
        {viewLevel === "world" && (
          <div className="flex gap-4">
            {/* Map Area */}
            <div className="flex-1">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-xl overflow-hidden border-2 border-amber-700/50 shadow-2xl"
                style={{ background: "linear-gradient(135deg, #92400e 0%, #78350f 30%, #451a03 60%, #92400e 100%)" }}>
                {/* Grid lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                {/* Sea routes */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {courses.map((course, i) => {
                    if (i >= courses.length - 1) return null;
                    const next = courses[i + 1];
                    return (
                      <path key={`route-${course.id}`}
                        d={`M${course.x},${course.y} Q${(course.x + next.x) / 2 + 10},${(course.y + next.y) / 2 - 15} ${next.x},${next.y}`}
                        fill="none" stroke="#d97706" strokeWidth="0.3" strokeDasharray="2,1.5" opacity="0.5"
                      />
                    );
                  })}
                </svg>

                {/* Course nodes */}
                {courses.map((course) => {
                  const lessonCount = course.lessons.length;
                  const courseCompleted = course.lessons.filter(l => l.completed).length;
                  const allDone = course.available && lessonCount > 0 && courseCompleted === lessonCount;
                  const hasProgress = courseCompleted > 0 && !allDone;
                  const svgX = (course.x / 100) * 100;
                  const svgY = (course.y / 100) * 100;

                  return (
                    <button key={course.id}
                      onClick={() => course.available && goToCourse(course)}
                      disabled={!course.available}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none group"
                      style={{ left: `${svgX}%`, top: `${svgY}%` }}>
                      {/* Pulsing ring for current */}
                      {course.isCurrent && (
                        <div className="absolute inset-[-10px] rounded-full border-2 border-amber-400 animate-ping opacity-40" />
                      )}
                      {/* Node circle */}
                      <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-transform group-hover:scale-110
                        ${!course.available ? "opacity-40" : ""}
                        ${allDone ? "ring-2 ring-amber-400 shadow-lg shadow-amber-500/30" : ""}
                        ${hasProgress ? "ring-2 ring-amber-600" : ""}
                      `}
                        style={{
                          background: allDone
                            ? "radial-gradient(circle, #f59e0b 0%, #d97706 50%, #92400e 100%)"
                            : hasProgress
                            ? "radial-gradient(circle, #78716c 0%, #57534e 50%, #44403c 100%)"
                            : "radial-gradient(circle, #78716c 0%, #57534e 50%, #44403c 100%)"
                        }}>
                        <span className="text-2xl sm:text-3xl">{course.emoji}</span>
                      </div>
                      {/* Label */}
                      <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-amber-200 font-medium whitespace-nowrap drop-shadow-lg">
                        {t(course.titleKey)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right side panel */}
            <div className="hidden lg:block w-56 shrink-0 space-y-3">
              <div className="bg-amber-950/60 rounded-xl border border-amber-700/40 p-4">
                <h3 className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-3">Your Voyage</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-amber-200">Islands</span>
                    <span className="font-bold text-amber-100">{completedLessons}/{totalLessons}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-amber-200">Courses</span>
                    <span className="font-bold text-amber-100">{courses.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-amber-200">Progress</span>
                    <span className="font-bold text-amber-100">{progress}%</span>
                  </div>
                  <div className="h-1.5 bg-amber-900/60 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </div>
              <div className="bg-amber-950/60 rounded-xl border border-amber-700/40 p-4">
                <h3 className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-3">Legend</h3>
                <div className="space-y-2 text-xs text-amber-200">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500 ring-1 ring-amber-400" /> Completed
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-700" /> Available
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-900 ring-1 ring-amber-800" /> Locked
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-amber-600/50" style={{ borderTop: "1px dashed #d97706" }} /> Sea Route
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {viewLevel === "course" && selectedCourse && (
          <CourseView
            course={selectedCourse}
            t={t}
            onLessonClick={goToLesson}
          />
        )}

        {viewLevel === "lessons" && selectedCourse && (
          <LessonsMapView
            course={selectedCourse}
            t={t}
            onLessonClick={goToLesson}
          />
        )}
      </main>

      <footer className="relative z-20 text-center py-3 text-xs text-amber-600/50">
        Set sail on your learning adventure
      </footer>
    </div>
  );
}

// ─── Course View ────────────────────────────────────────────────────────────
function CourseView({ course, t, onLessonClick }: {
  course: ArchipelagoCourse;
  t: (key: string, fallback?: string) => string;
  onLessonClick: (id: number) => void;
}) {
  const completedCount = course.lessons.filter(l => l.completed).length;
  const total = course.lessons.length;
  const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Course header */}
      <div className="text-center space-y-1">
        <span className="text-4xl">{course.emoji}</span>
        <h2 className="text-2xl font-bold text-amber-100">{t(course.titleKey)}</h2>
        <p className="text-sm text-amber-300/70">{t(course.descriptionKey)}</p>
      </div>

      {/* Progress */}
      <div className="bg-amber-950/60 rounded-xl border border-amber-700/40 p-4 max-w-md mx-auto">
        <div className="flex justify-between text-sm text-amber-200 mb-1">
          <span>Voyage Progress</span>
          <span className="font-bold text-amber-100">{pct}%</span>
        </div>
        <div className="h-1.5 bg-amber-900/60 rounded-full">
          <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-xs text-amber-300/60 mt-1">{completedCount} of {total} islands discovered</p>
      </div>

      {/* Island path map */}
      <div className="relative w-full aspect-[3/1] rounded-xl overflow-hidden border border-amber-700/40 bg-amber-950/30">
        <svg className="w-full h-full" viewBox="0 0 100 35" preserveAspectRatio="xMidYMid meet">
          {/* Sea routes between islands */}
          {course.lessons.map((lesson, idx) => {
            if (idx >= course.lessons.length - 1) return null;
            const next = course.lessons[idx + 1];
            return (
              <path key={`path-${lesson.id}`}
                d={`M${lesson.x},${lesson.y} Q${(lesson.x + next.x) / 2},${(lesson.y + next.y) / 2 - 4} ${next.x},${next.y}`}
                fill="none" stroke="#d97706" strokeWidth="0.4" strokeDasharray="1.5,1" opacity="0.4"
              />
            );
          })}

          {/* Island nodes */}
          {course.lessons.map((lesson, idx) => {
            const isCompleted = lesson.completed;
            const isCurrent = lesson.current;
            const isAvailable = lesson.available;
            const size = lesson.isFinalIsland ? "12" : lesson.isMainIsland ? "10" : "7";
            const fontSize = lesson.isFinalIsland ? "5" : lesson.isMainIsland ? "4" : "3";

            return (
              <g key={lesson.id}
                onClick={() => isAvailable && onLessonClick(lesson.id)}
                className={isAvailable ? "cursor-pointer" : "cursor-not-allowed"}
                style={{ transition: "transform 0.2s" }}>
                {/* Pulsing for current */}
                {isCurrent && (
                  <circle cx={lesson.x} cy={lesson.y} r="8" fill="none" stroke="#f59e0b" strokeWidth="0.3" opacity="0.3">
                    <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                {/* Node background */}
                <circle cx={lesson.x} cy={lesson.y} r={size}
                  fill={isCompleted ? "#f59e0b" : isCurrent ? "#d97706" : isAvailable ? "#57534e" : "#44403c"}
                  stroke={isCompleted ? "#fbbf24" : isCurrent ? "#f59e0b" : isAvailable ? "#78716c" : "#57534e"}
                  strokeWidth={isCurrent ? "0.8" : "0.4"}
                />
                {/* Emoji */}
                <text x={lesson.x} y={lesson.y + fontSize * 0.35} textAnchor="middle" fontSize={fontSize}
                  className="pointer-events-none">{lesson.emoji}</text>
                {/* Lock icon */}
                {!isAvailable && (
                  <text x={lesson.x} y={lesson.y + fontSize * 0.35} textAnchor="middle" fontSize="4" fill="#78716c">🔒</text>
                )}
                {/* Number */}
                <text x={lesson.x} y={lesson.y + parseFloat(size) + 1.5} textAnchor="middle" fontSize="2" fill="#d4a574" opacity="0.7">
                  {idx + 1}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Lesson list */}
      <div className="space-y-2">
        {course.lessons.map((lesson, idx) => (
          <button key={lesson.id}
            onClick={() => lesson.available && onLessonClick(lesson.id)}
            disabled={!lesson.available}
            className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors
              ${lesson.completed ? "bg-amber-900/40 border border-amber-700/40" : ""}
              ${lesson.current ? "bg-amber-800/40 border border-amber-600/60 ring-1 ring-amber-500/30" : ""}
              ${lesson.available && !lesson.completed && !lesson.current ? "bg-amber-950/40 border border-amber-800/30 hover:bg-amber-900/40" : ""}
              ${!lesson.available ? "opacity-40 cursor-not-allowed bg-amber-950/20 border border-amber-900/20" : ""}
            `}>
            <span className="text-lg w-8 text-center">{lesson.completed ? "✅" : lesson.current ? "📍" : !lesson.available ? "🔒" : "○"}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-amber-100">{lesson.title}</p>
              <p className="text-xs text-amber-300/60 truncate">{lesson.subtitle || "Ready to explore"}</p>
            </div>
            <div className="text-xs text-amber-400/60 shrink-0">
              ⚡{lesson.xp ?? 50}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Lessons Map View ────────────────────────────────────────────────────────
function LessonsMapView({ course, t, onLessonClick }: {
  course: ArchipelagoCourse;
  t: (key: string, fallback?: string) => string;
  onLessonClick: (id: number) => void;
}) {
  const completedCount = course.lessons.filter(l => l.completed).length;
  const total = course.lessons.length;
  const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-amber-100">Learning Path</h2>
        <p className="text-sm text-amber-300/70">{completedCount} of {total} islands discovered</p>
      </div>

      <div className="bg-amber-950/60 rounded-xl border border-amber-700/40 p-4 max-w-md mx-auto">
        <div className="flex justify-between text-sm text-amber-200 mb-1">
          <span>Progress</span>
          <span className="font-bold text-amber-100">{pct}%</span>
        </div>
        <div className="h-1.5 bg-amber-900/60 rounded-full">
          <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="relative w-full aspect-[3/1] rounded-xl overflow-hidden border border-amber-700/40 bg-amber-950/30">
        <svg className="w-full h-full" viewBox="0 0 100 35" preserveAspectRatio="xMidYMid meet">
          {course.lessons.map((lesson, idx) => {
            if (idx >= course.lessons.length - 1) return null;
            const next = course.lessons[idx + 1];
            return (
              <path key={`path-${lesson.id}`}
                d={`M${lesson.x},${lesson.y} Q${(lesson.x + next.x) / 2},${(lesson.y + next.y) / 2 - 4} ${next.x},${next.y}`}
                fill="none" stroke="#d97706" strokeWidth="0.4" strokeDasharray="1.5,1" opacity="0.4"
              />
            );
          })}

          {course.lessons.map((lesson, idx) => {
            const isCompleted = lesson.completed;
            const isCurrent = lesson.current;
            const isAvailable = lesson.available;
            const size = lesson.isFinalIsland ? "12" : lesson.isMainIsland ? "10" : "7";
            const fontSize = lesson.isFinalIsland ? "5" : lesson.isMainIsland ? "4" : "3";

            return (
              <g key={lesson.id}
                onClick={() => isAvailable && onLessonClick(lesson.id)}
                className={isAvailable ? "cursor-pointer" : "cursor-not-allowed"}>
                {isCurrent && (
                  <circle cx={lesson.x} cy={lesson.y} r="8" fill="none" stroke="#f59e0b" strokeWidth="0.3" opacity="0.3">
                    <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle cx={lesson.x} cy={lesson.y} r={size}
                  fill={isCompleted ? "#f59e0b" : isCurrent ? "#d97706" : isAvailable ? "#57534e" : "#44403c"}
                  stroke={isCompleted ? "#fbbf24" : isCurrent ? "#f59e0b" : isAvailable ? "#78716c" : "#57534e"}
                  strokeWidth={isCurrent ? "0.8" : "0.4"}
                />
                <text x={lesson.x} y={lesson.y + fontSize * 0.35} textAnchor="middle" fontSize={fontSize}
                  className="pointer-events-none">{lesson.emoji}</text>
                {!isAvailable && (
                  <text x={lesson.x} y={lesson.y + fontSize * 0.35} textAnchor="middle" fontSize="4" fill="#78716c">🔒</text>
                )}
                <text x={lesson.x} y={lesson.y + parseFloat(size) + 1.5} textAnchor="middle" fontSize="2" fill="#d4a574" opacity="0.7">
                  {idx + 1}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="space-y-2">
        {course.lessons.map((lesson, idx) => (
          <button key={lesson.id}
            onClick={() => lesson.available && onLessonClick(lesson.id)}
            disabled={!lesson.available}
            className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors
              ${lesson.completed ? "bg-amber-900/40 border border-amber-700/40" : ""}
              ${lesson.current ? "bg-amber-800/40 border border-amber-600/60 ring-1 ring-amber-500/30" : ""}
              ${lesson.available && !lesson.completed && !lesson.current ? "bg-amber-950/40 border border-amber-800/30 hover:bg-amber-900/40" : ""}
              ${!lesson.available ? "opacity-40 cursor-not-allowed bg-amber-950/20 border border-amber-900/20" : ""}
            `}>
            <span className="text-lg w-8 text-center">{lesson.completed ? "✅" : lesson.current ? "📍" : !lesson.available ? "🔒" : "○"}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-amber-100">{lesson.title}</p>
              <p className="text-xs text-amber-300/60 truncate">{lesson.subtitle || "Ready to explore"}</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-amber-400/60 shrink-0">
              <span>⏱{lesson.duration ?? 10}m</span>
              <span>⚡{lesson.xp ?? 50}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
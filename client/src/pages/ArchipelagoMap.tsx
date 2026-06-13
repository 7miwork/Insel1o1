import { useState, useCallback, useMemo, useRef } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, Compass, Ship, Map as MapIcon, Lock, CheckCircle2, PlayCircle, Wind, Trophy, Target, Star, Anchor, Eye } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import {
  programmingArchipelago,
  type ArchipelagoCourse,
} from "@/data/archipelago-config";

/* ── Decorative Compass Rose SVG ── */
function CompassRose({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={{ width: "120px", height: "120px" }}>
      <g opacity="0.7">
        {/* Outer ring */}
        <circle cx="50" cy="50" r="48" fill="none" stroke="#2c1810" strokeWidth="0.8" />
        <circle cx="50" cy="50" r="45" fill="none" stroke="#2c1810" strokeWidth="0.4" strokeDasharray="3,2" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="#2c1810" strokeWidth="0.3" />
        {/* 8-pointed star */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const isMajor = angle % 90 === 0;
          const innerR = isMajor ? 8 : 16;
          const outerR = isMajor ? 40 : 32;
          const rad = (angle * Math.PI) / 180;
          const x1 = 50 + Math.sin(rad) * innerR;
          const y1 = 50 - Math.cos(rad) * innerR;
          const x2 = 50 + Math.sin(rad) * outerR;
          const y2 = 50 - Math.cos(rad) * outerR;
          return (
            <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={isMajor ? "#1a0e06" : "#3b2416"} strokeWidth={isMajor ? "2" : "1"} opacity={isMajor ? "0.9" : "0.6"} />
          );
        })}
        {/* Cardinal labels */}
        <text x="50" y="8" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#1a0e06">N</text>
        <text x="92" y="52" textAnchor="middle" fontSize="4" fill="#2c1810">E</text>
        <text x="50" y="95" textAnchor="middle" fontSize="4" fill="#2c1810">S</text>
        <text x="8" y="52" textAnchor="middle" fontSize="4" fill="#2c1810">W</text>
        {/* Center circle */}
        <circle cx="50" cy="50" r="3" fill="#2c1810" opacity="0.8" />
        <circle cx="50" cy="50" r="1.5" fill="#0d0705" />
      </g>
    </svg>
  );
}

/* ── Decorative Sea Elements SVG Layer ── */
function SeaElements() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
      {/* Wave lines */}
      <path d="M5,90 Q15,88 25,90 Q35,92 45,90 Q55,88 65,90 Q75,92 85,90 Q95,88 100,90" fill="none" stroke="#6b4226" strokeWidth="0.15" opacity="0.25" />
      <path d="M0,94 Q10,92 20,94 Q30,96 40,94 Q50,92 60,94 Q70,96 80,94 Q90,92 100,94" fill="none" stroke="#6b4226" strokeWidth="0.12" opacity="0.2" />

      {/* Small sailing ship 1 */}
      <g transform="translate(12,72) scale(0.4)" opacity="0.35">
        <path d="M0,0 Q5,-4 10,0" fill="#6b4226" stroke="#6b4226" strokeWidth="0.5" />
        <line x1="5" y1="0" x2="5" y2="-6" stroke="#6b4226" strokeWidth="0.4" />
        <path d="M5,-6 Q8,-3 5,-1" fill="#6b4226" opacity="0.7" />
      </g>

      {/* Small sailing ship 2 */}
      <g transform="translate(82,82) scale(0.35) rotate(-15)" opacity="0.3">
        <path d="M0,0 Q4,-3 8,0" fill="#6b4226" stroke="#6b4226" strokeWidth="0.5" />
        <line x1="4" y1="0" x2="4" y2="-5" stroke="#6b4226" strokeWidth="0.4" />
        <path d="M4,-5 Q6,-2.5 4,-0.5" fill="#6b4226" opacity="0.7" />
      </g>

      {/* Whale tail */}
      <g transform="translate(25,12) scale(0.3)" opacity="0.25">
        <path d="M0,0 Q3,-5 6,0" fill="none" stroke="#6b4226" strokeWidth="0.8" />
        <path d="M2,-1 Q4,-6 6,-1" fill="none" stroke="#6b4226" strokeWidth="0.6" />
      </g>

      {/* Sea serpent */}
      <g transform="translate(70,15) scale(0.3)" opacity="0.2">
        <path d="M0,0 Q3,-2 6,0 Q9,2 12,0 Q15,-2 18,0" fill="none" stroke="#6b4226" strokeWidth="0.8" />
        <circle cx="18" cy="0" r="1" fill="#6b4226" />
      </g>

      {/* Small fish */}
      <g transform="translate(55,8) scale(0.2)" opacity="0.25">
        <path d="M0,0 Q4,-2 8,0 Q4,2 0,0 Z" fill="#6b4226" />
        <path d="M0,0 L-2,-1.5 L-2,1.5 Z" fill="#6b4226" />
      </g>

      {/* Clouds */}
      <g transform="translate(15,3)" opacity="0.15">
        <ellipse cx="0" cy="0" rx="4" ry="1.5" fill="#6b4226" />
        <ellipse cx="3" cy="-0.5" rx="3" ry="1.2" fill="#6b4226" />
      </g>
      <g transform="translate(78,6)" opacity="0.12">
        <ellipse cx="0" cy="0" rx="3.5" ry="1.3" fill="#6b4226" />
        <ellipse cx="2.5" cy="-0.4" rx="2.5" ry="1" fill="#6b4226" />
      </g>

      {/* "Here be Dragons" text */}
      <text x="18" y="22" fontSize="2.2" fontFamily="serif" fontStyle="italic" fill="#4a2d1b" opacity="0.4" transform="rotate(-8, 18, 22)">
        Here be Dragons
      </text>

      {/* "Mare Incognitum" text */}
      <text x="72" y="38" fontSize="1.8" fontFamily="serif" fontStyle="italic" fill="#4a2d1b" opacity="0.25" transform="rotate(5, 72, 38)">
        Mare Incognitum
      </text>

      {/* Treasure X marks */}
      <g transform="translate(42,78) scale(0.25)" opacity="0.4">
        <line x1="-2" y1="-2" x2="2" y2="2" stroke="#1a0e06" strokeWidth="1" />
        <line x1="2" y1="-2" x2="-2" y2="2" stroke="#1a0e06" strokeWidth="1" />
      </g>

      {/* Wind lines */}
      <g opacity="0.2">
        <path d="M88,42 Q90,41 92,42" fill="none" stroke="#6b4226" strokeWidth="0.3" />
        <path d="M89,44 Q91,43 93,44" fill="none" stroke="#6b4226" strokeWidth="0.25" />
      </g>

      {/* Anchor */}
      <g transform="translate(8,88) scale(0.2)" opacity="0.25">
        <line x1="0" y1="0" x2="0" y2="8" stroke="#6b4226" strokeWidth="1.2" />
        <circle cx="0" cy="-1" r="1.5" fill="none" stroke="#6b4226" strokeWidth="0.8" />
        <path d="M-3,8 Q0,6 3,8" fill="none" stroke="#6b4226" strokeWidth="1" />
      </g>

      {/* Star */}
      <g transform="translate(92,10) scale(0.25)" opacity="0.3">
        <polygon points="0,-4 1.2,-1.2 4,0 1.2,1.2 0,4 -1.2,1.2 -4,0 -1.2,-1.2" fill="#2c1810" />
      </g>

      {/* Coastline decorations - bottom left */}
      <path d="M2,97 Q5,95 8,96 Q11,97 13,95" fill="none" stroke="#6b4226" strokeWidth="0.12" opacity="0.2" />
      {/* Coastline decorations - top right */}
      <path d="M88,2 Q91,3 93,2 Q95,1 97,3" fill="none" stroke="#6b4226" strokeWidth="0.12" opacity="0.15" />
      {/* Cross-hatch depth markers */}
      <g transform="translate(5,50)" opacity="0.1">
        <line x1="0" y1="-1" x2="0" y2="1" stroke="#6b4226" strokeWidth="0.2" />
        <line x1="-1" y1="0" x2="1" y2="0" stroke="#6b4226" strokeWidth="0.2" />
      </g>
      <g transform="translate(95,50)" opacity="0.1">
        <line x1="0" y1="-1" x2="0" y2="1" stroke="#6b4226" strokeWidth="0.2" />
        <line x1="-1" y1="0" x2="1" y2="0" stroke="#6b4226" strokeWidth="0.2" />
      </g>
      {/* Rope border decoration */}
      <path d="M3,99 Q8,98 13,99 Q18,100 23,99 Q28,98 33,99 Q38,100 43,99 Q48,98 53,99 Q58,100 63,99 Q68,98 73,99 Q78,100 83,99 Q88,98 93,99 Q97,100 99,99" fill="none" stroke="#6b4226" strokeWidth="0.15" strokeDasharray="1,0.5" opacity="0.12" />
    </svg>
  );
}

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
    <div className="min-h-screen relative"
      style={{ background: "linear-gradient(180deg, #3b2416 0%, #4a2d1b 35%, #5a3821 65%, #3b2416 100%)" }}>
      {/* Wood grain texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 3px,
            rgba(255,255,255,0.03) 3px,
            rgba(255,255,255,0.03) 4px
          ), repeating-linear-gradient(
            85deg,
            transparent,
            transparent 8px,
            rgba(0,0,0,0.05) 8px,
            rgba(0,0,0,0.05) 9px
          )`
        }} />

      {/* Header */}
      <header className="relative z-20 border-b"
        style={{ background: "rgba(44,24,16,0.85)", backdropFilter: "blur(4px)", borderColor: "rgba(107,66,38,0.4)" }}>
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={handleBack} className="p-1.5 rounded-lg transition-colors"
              style={{ color: "#e6d3aa" }}>
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <MapIcon className="w-4 h-4" style={{ color: "#d8c49a" }} />
              <h1 className="text-base sm:text-lg font-bold tracking-tight" style={{ color: "#f1e3bf" }}>
                {viewLevel === "world" ? t(config.titleKey) : selectedCourse ? t(selectedCourse.titleKey) : ""}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs" style={{ color: "#b8a48a" }}>
            {viewLevel === "world" && <><Compass className="w-3 h-3" /> Explore & Discover</>}
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-4 sm:py-6">
        {viewLevel === "world" && (
          <div className="flex gap-4">
            {/* Map Area */}
            <div className="flex-1">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-lg overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #d8c49a 0%, #e6d3aa 20%, #f1e3bf 50%, #e6d3aa 80%, #d8c49a 100%)",
                  border: "3px solid #a08c6a",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.7), 0 4px 12px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.15), 2px 2px 0 1px rgba(58,36,22,0.3)"
                }}>
                {/* Parchment noise texture */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px" }} />
                {/* Blue water layer inside the map */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: "radial-gradient(ellipse at 50% 50%, rgba(157,200,216,0.35) 0%, rgba(132,184,203,0.25) 40%, rgba(110,167,187,0.30) 100%)"
                }} />
                {/* Burnt/aged edges */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  boxShadow: "inset 0 0 60px rgba(90,56,33,0.4), inset 0 0 120px rgba(44,24,16,0.3)",
                  borderRadius: "inherit"
                }} />
                {/* Fold lines */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
                  <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-amber-100" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-amber-100" />
                </div>
                {/* Grid lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2c1810" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
                {/* Compass Rose - top right */}
                <div className="absolute top-3 right-3 pointer-events-none">
                  <CompassRose />
                </div>
                {/* Decorative sea elements */}
                <SeaElements />

                {/* Sea routes */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {courses.map((course, i) => {
                    if (i >= courses.length - 1) return null;
                    const next = courses[i + 1];
                    return (
                      <path key={`route-${course.id}`}
                        d={`M${course.x},${course.y} Q${(course.x + next.x) / 2 + 10},${(course.y + next.y) / 2 - 15} ${next.x},${next.y}`}
                        fill="none" stroke="#8b5e3c" strokeWidth="0.3" strokeDasharray="2,1.5" opacity="0.6"
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
                        <div className="absolute inset-[-10px] rounded-full border-2 animate-ping opacity-40"
                          style={{ borderColor: "#7fa35d" }} />
                      )}
                      {/* Node circle */}
                      <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-transform group-hover:scale-110
                        ${!course.available ? "opacity-40" : ""}
                        ${allDone ? "ring-2 shadow-lg" : ""}
                        ${hasProgress ? "ring-2" : ""}
                      `}
                        style={{
                          background: allDone
                            ? "radial-gradient(circle, #7fa35d 0%, #6b8e4e 50%, #4a6b35 100%)"
                            : hasProgress
                            ? "radial-gradient(circle, #84b8cb 0%, #6ea7bb 50%, #4a8a9e 100%)"
                            : "radial-gradient(circle, #9a8a7a 0%, #7a6a5a 50%, #5a4a3a 100%)",
                          ...(allDone ? { boxShadow: "0 4px 12px rgba(107,142,78,0.4)", borderColor: "#7fa35d" } : {}),
                          ...(hasProgress ? { borderColor: "#6ea7bb" } : {})
                        }}>
                        <span className="text-2xl sm:text-3xl">{course.emoji}</span>
                      </div>
                      {/* Label */}
                      <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap drop-shadow-lg"
                        style={{ color: "#2c1810" }}>
                        {t(course.titleKey)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right side panel */}
            <div className="hidden lg:block w-56 shrink-0 space-y-3">
              <div className="rounded-xl p-4" style={{ background: "rgba(44,24,16,0.85)", border: "1px solid rgba(107,66,38,0.4)" }}>
                <h3 className="text-xs uppercase tracking-wider font-semibold mb-3" style={{ color: "#d8c49a" }}>Your Voyage</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "#b8a48a" }}>Islands</span>
                    <span className="font-bold" style={{ color: "#e6d3aa" }}>{completedLessons}/{totalLessons}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "#b8a48a" }}>Courses</span>
                    <span className="font-bold" style={{ color: "#e6d3aa" }}>{courses.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "#b8a48a" }}>Progress</span>
                    <span className="font-bold" style={{ color: "#e6d3aa" }}>{progress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(107,66,38,0.3)" }}>
                    <div className="h-full rounded-full transition-all"
                      style={{ background: "linear-gradient(to right, #7fa35d, #6b8e4e)", width: `${progress}%` }} />
                  </div>
                </div>
              </div>
              <div className="rounded-xl p-4" style={{ background: "rgba(44,24,16,0.75)", border: "1px solid rgba(107,66,38,0.3)" }}>
                <h3 className="text-xs uppercase tracking-wider font-semibold mb-3" style={{ color: "#d8c49a" }}>Legend</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2" style={{ color: "#b8a48a" }}>
                    <div className="w-3 h-3 rounded-full" style={{ background: "#7fa35d", border: "1px solid #6b8e4e" }} /> Completed
                  </div>
                  <div className="flex items-center gap-2" style={{ color: "#b8a48a" }}>
                    <div className="w-3 h-3 rounded-full" style={{ background: "#6ea7bb" }} /> Available
                  </div>
                  <div className="flex items-center gap-2" style={{ color: "#b8a48a" }}>
                    <div className="w-3 h-3 rounded-full" style={{ background: "#5a4a3a", border: "1px solid #4a3a2a" }} /> Locked
                  </div>
                  <div className="flex items-center gap-2" style={{ color: "#b8a48a" }}>
                    <div className="w-4 h-0.5" style={{ borderTop: "1px dashed #8b5e3c" }} /> Sea Route
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

      <footer className="relative z-20 text-center py-3 text-xs" style={{ color: "rgba(184,164,138,0.5)" }}>
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
        <h2 className="text-2xl font-bold" style={{ color: "#f1e3bf" }}>{t(course.titleKey)}</h2>
        <p className="text-sm" style={{ color: "#b8a48a" }}>{t(course.descriptionKey)}</p>
      </div>

      {/* Progress */}
      <div className="rounded-xl p-4 max-w-md mx-auto" style={{ background: "rgba(44,24,16,0.85)", border: "1px solid rgba(107,66,38,0.4)" }}>
        <div className="flex justify-between text-sm mb-1" style={{ color: "#b8a48a" }}>
          <span>Voyage Progress</span>
          <span className="font-bold" style={{ color: "#e6d3aa" }}>{pct}%</span>
        </div>
        <div className="h-1.5 rounded-full" style={{ background: "rgba(107,66,38,0.3)" }}>
          <div className="h-full rounded-full transition-all" style={{ background: "linear-gradient(to right, #7fa35d, #6b8e4e)", width: `${pct}%` }} />
        </div>
        <p className="text-xs mt-1" style={{ color: "rgba(184,164,138,0.6)" }}>{completedCount} of {total} islands discovered</p>
      </div>

      {/* Island path map */}
      <div className="relative w-full aspect-[3/1] rounded-xl overflow-hidden" style={{ background: "rgba(44,24,16,0.3)", border: "1px solid rgba(107,66,38,0.4)" }}>
        <svg className="w-full h-full" viewBox="0 0 100 35" preserveAspectRatio="xMidYMid meet">
          {/* Sea routes between islands */}
          {course.lessons.map((lesson, idx) => {
            if (idx >= course.lessons.length - 1) return null;
            const next = course.lessons[idx + 1];
            return (
              <path key={`path-${lesson.id}`}
                d={`M${lesson.x},${lesson.y} Q${(lesson.x + next.x) / 2},${(lesson.y + next.y) / 2 - 4} ${next.x},${next.y}`}
                fill="none" stroke="#8b5e3c" strokeWidth="0.4" strokeDasharray="1.5,1" opacity="0.5"
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
                  <circle cx={lesson.x} cy={lesson.y} r="8" fill="none" stroke="#7fa35d" strokeWidth="0.3" opacity="0.3">
                    <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                {/* Node background */}
                <circle cx={lesson.x} cy={lesson.y} r={size}
                  fill={isCompleted ? "#7fa35d" : isCurrent ? "#6ea7bb" : isAvailable ? "#84b8cb" : "#5a4a3a"}
                  stroke={isCompleted ? "#6b8e4e" : isCurrent ? "#6ea7bb" : isAvailable ? "#6ea7bb" : "#4a3a2a"}
                  strokeWidth={isCurrent ? "0.8" : "0.4"}
                />
                {/* Emoji */}
                <text x={lesson.x} y={lesson.y + fontSize * 0.35} textAnchor="middle" fontSize={fontSize}
                  className="pointer-events-none">{lesson.emoji}</text>
                {/* Lock icon */}
                {!isAvailable && (
                  <text x={lesson.x} y={lesson.y + fontSize * 0.35} textAnchor="middle" fontSize="4" fill="#7a6a5a">🔒</text>
                )}
                {/* Number */}
                <text x={lesson.x} y={lesson.y + parseFloat(size) + 1.5} textAnchor="middle" fontSize="2" fill="#2c1810" opacity="0.7">
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
            className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors`}
            style={{
              background: lesson.completed ? "rgba(107,142,78,0.15)" : lesson.current ? "rgba(110,167,187,0.15)" : lesson.available ? "rgba(44,24,16,0.5)" : "rgba(44,24,16,0.2)",
              border: `1px solid ${lesson.completed ? "rgba(107,142,78,0.4)" : lesson.current ? "rgba(110,167,187,0.5)" : lesson.available ? "rgba(107,66,38,0.3)" : "rgba(107,66,38,0.15)"}`,
              opacity: !lesson.available ? 0.4 : 1,
              cursor: !lesson.available ? "not-allowed" : "pointer"
            }}>
            <span className="text-lg w-8 text-center">{lesson.completed ? "✅" : lesson.current ? "📍" : !lesson.available ? "🔒" : "○"}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium" style={{ color: "#f1e3bf" }}>{lesson.title}</p>
              <p className="text-xs truncate" style={{ color: "rgba(184,164,138,0.6)" }}>{lesson.subtitle || "Ready to explore"}</p>
            </div>
            <div className="text-xs shrink-0" style={{ color: "rgba(216,196,154,0.6)" }}>
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
        <h2 className="text-2xl font-bold" style={{ color: "#f1e3bf" }}>Learning Path</h2>
        <p className="text-sm" style={{ color: "#b8a48a" }}>{completedCount} of {total} islands discovered</p>
      </div>

      <div className="rounded-xl p-4 max-w-md mx-auto" style={{ background: "rgba(44,24,16,0.85)", border: "1px solid rgba(107,66,38,0.4)" }}>
        <div className="flex justify-between text-sm mb-1" style={{ color: "#b8a48a" }}>
          <span>Progress</span>
          <span className="font-bold" style={{ color: "#e6d3aa" }}>{pct}%</span>
        </div>
        <div className="h-1.5 rounded-full" style={{ background: "rgba(107,66,38,0.3)" }}>
          <div className="h-full rounded-full transition-all" style={{ background: "linear-gradient(to right, #7fa35d, #6b8e4e)", width: `${pct}%` }} />
        </div>
      </div>

      <div className="relative w-full aspect-[3/1] rounded-xl overflow-hidden" style={{ background: "rgba(44,24,16,0.3)", border: "1px solid rgba(107,66,38,0.4)" }}>
        <svg className="w-full h-full" viewBox="0 0 100 35" preserveAspectRatio="xMidYMid meet">
          {course.lessons.map((lesson, idx) => {
            if (idx >= course.lessons.length - 1) return null;
            const next = course.lessons[idx + 1];
            return (
              <path key={`path-${lesson.id}`}
                d={`M${lesson.x},${lesson.y} Q${(lesson.x + next.x) / 2},${(lesson.y + next.y) / 2 - 4} ${next.x},${next.y}`}
                fill="none" stroke="#8b5e3c" strokeWidth="0.4" strokeDasharray="1.5,1" opacity="0.5"
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
                  <circle cx={lesson.x} cy={lesson.y} r="8" fill="none" stroke="#7fa35d" strokeWidth="0.3" opacity="0.3">
                    <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle cx={lesson.x} cy={lesson.y} r={size}
                  fill={isCompleted ? "#7fa35d" : isCurrent ? "#6ea7bb" : isAvailable ? "#84b8cb" : "#5a4a3a"}
                  stroke={isCompleted ? "#6b8e4e" : isCurrent ? "#6ea7bb" : isAvailable ? "#6ea7bb" : "#4a3a2a"}
                  strokeWidth={isCurrent ? "0.8" : "0.4"}
                />
                <text x={lesson.x} y={lesson.y + fontSize * 0.35} textAnchor="middle" fontSize={fontSize}
                  className="pointer-events-none">{lesson.emoji}</text>
                {!isAvailable && (
                  <text x={lesson.x} y={lesson.y + fontSize * 0.35} textAnchor="middle" fontSize="4" fill="#7a6a5a">🔒</text>
                )}
                <text x={lesson.x} y={lesson.y + parseFloat(size) + 1.5} textAnchor="middle" fontSize="2" fill="#2c1810" opacity="0.7">
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
            className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors`}
            style={{
              background: lesson.completed ? "rgba(107,142,78,0.15)" : lesson.current ? "rgba(110,167,187,0.15)" : lesson.available ? "rgba(44,24,16,0.5)" : "rgba(44,24,16,0.2)",
              border: `1px solid ${lesson.completed ? "rgba(107,142,78,0.4)" : lesson.current ? "rgba(110,167,187,0.5)" : lesson.available ? "rgba(107,66,38,0.3)" : "rgba(107,66,38,0.15)"}`,
              opacity: !lesson.available ? 0.4 : 1,
              cursor: !lesson.available ? "not-allowed" : "pointer"
            }}>
            <span className="text-lg w-8 text-center">{lesson.completed ? "✅" : lesson.current ? "📍" : !lesson.available ? "🔒" : "○"}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium" style={{ color: "#f1e3bf" }}>{lesson.title}</p>
              <p className="text-xs truncate" style={{ color: "rgba(184,164,138,0.6)" }}>{lesson.subtitle || "Ready to explore"}</p>
            </div>
            <div className="flex items-center gap-2 text-xs shrink-0" style={{ color: "rgba(216,196,154,0.6)" }}>
              <span>⏱{lesson.duration ?? 10}m</span>
              <span>⚡{lesson.xp ?? 50}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
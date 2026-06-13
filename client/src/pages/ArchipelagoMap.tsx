import { useState, useCallback, useMemo, useRef } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, Compass, Ship, Map as MapIcon, Lock, CheckCircle2, PlayCircle, Wind, Trophy, Target, Star, Anchor, Eye, X } from "lucide-react";
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
        <circle cx="50" cy="50" r="48" fill="none" stroke="#2c1810" strokeWidth="0.8" />
        <circle cx="50" cy="50" r="45" fill="none" stroke="#2c1810" strokeWidth="0.4" strokeDasharray="3,2" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="#2c1810" strokeWidth="0.3" />
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
        <text x="50" y="8" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#1a0e06">N</text>
        <text x="92" y="52" textAnchor="middle" fontSize="4" fill="#2c1810">E</text>
        <text x="50" y="95" textAnchor="middle" fontSize="4" fill="#2c1810">S</text>
        <text x="8" y="52" textAnchor="middle" fontSize="4" fill="#2c1810">W</text>
        <circle cx="50" cy="50" r="3" fill="#2c1810" opacity="0.8" />
        <circle cx="50" cy="50" r="1.5" fill="#0d0705" />
      </g>
    </svg>
  );
}

/** Safely convert a YouTube URL to an embed-compatible URL */
function toYouTubeEmbed(url: string): string {
  if (!url) return "";
  // youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  // youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  // youtube.com/embed/VIDEO_ID (already embed)
  if (url.includes("youtube.com/embed/")) return url;
  // Fallback: return as-is (Vimeo, MP4, etc.)
  return url;
}

/* ── Decorative Sea Elements SVG Layer ── */
function SeaElements() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path d="M5,90 Q15,88 25,90 Q35,92 45,90 Q55,88 65,90 Q75,92 85,90 Q95,88 100,90" fill="none" stroke="#6b4226" strokeWidth="0.15" opacity="0.25" />
      <path d="M0,94 Q10,92 20,94 Q30,96 40,94 Q50,92 60,94 Q70,96 80,94 Q90,92 100,94" fill="none" stroke="#6b4226" strokeWidth="0.12" opacity="0.2" />
      <g transform="translate(12,72) scale(0.4)" opacity="0.35">
        <path d="M0,0 Q5,-4 10,0" fill="#6b4226" stroke="#6b4226" strokeWidth="0.5" />
        <line x1="5" y1="0" x2="5" y2="-6" stroke="#6b4226" strokeWidth="0.4" />
        <path d="M5,-6 Q8,-3 5,-1" fill="#6b4226" opacity="0.7" />
      </g>
      <g transform="translate(82,82) scale(0.35) rotate(-15)" opacity="0.3">
        <path d="M0,0 Q4,-3 8,0" fill="#6b4226" stroke="#6b4226" strokeWidth="0.5" />
        <line x1="4" y1="0" x2="4" y2="-5" stroke="#6b4226" strokeWidth="0.4" />
        <path d="M4,-5 Q6,-2.5 4,-0.5" fill="#6b4226" opacity="0.7" />
      </g>
      <g transform="translate(25,12) scale(0.3)" opacity="0.25">
        <path d="M0,0 Q3,-5 6,0" fill="none" stroke="#6b4226" strokeWidth="0.8" />
        <path d="M2,-1 Q4,-6 6,-1" fill="none" stroke="#6b4226" strokeWidth="0.6" />
      </g>
      <g transform="translate(70,15) scale(0.3)" opacity="0.2">
        <path d="M0,0 Q3,-2 6,0 Q9,2 12,0 Q15,-2 18,0" fill="none" stroke="#6b4226" strokeWidth="0.8" />
        <circle cx="18" cy="0" r="1" fill="#6b4226" />
      </g>
      <g transform="translate(55,8) scale(0.2)" opacity="0.25">
        <path d="M0,0 Q4,-2 8,0 Q4,2 0,0 Z" fill="#6b4226" />
        <path d="M0,0 L-2,-1.5 L-2,1.5 Z" fill="#6b4226" />
      </g>
      <g transform="translate(15,3)" opacity="0.15">
        <ellipse cx="0" cy="0" rx="4" ry="1.5" fill="#6b4226" />
        <ellipse cx="3" cy="-0.5" rx="3" ry="1.2" fill="#6b4226" />
      </g>
      <g transform="translate(78,6)" opacity="0.12">
        <ellipse cx="0" cy="0" rx="3.5" ry="1.3" fill="#6b4226" />
        <ellipse cx="2.5" cy="-0.4" rx="2.5" ry="1" fill="#6b4226" />
      </g>
      <text x="18" y="22" fontSize="2.2" fontFamily="serif" fontStyle="italic" fill="#4a2d1b" opacity="0.4" transform="rotate(-8, 18, 22)">
        Here be Dragons
      </text>
      <text x="72" y="38" fontSize="1.8" fontFamily="serif" fontStyle="italic" fill="#4a2d1b" opacity="0.25" transform="rotate(5, 72, 38)">
        Mare Incognitum
      </text>
      <g transform="translate(42,78) scale(0.25)" opacity="0.4">
        <line x1="-2" y1="-2" x2="2" y2="2" stroke="#1a0e06" strokeWidth="1" />
        <line x1="2" y1="-2" x2="-2" y2="2" stroke="#1a0e06" strokeWidth="1" />
      </g>
      <g opacity="0.2">
        <path d="M88,42 Q90,41 92,42" fill="none" stroke="#6b4226" strokeWidth="0.3" />
        <path d="M89,44 Q91,43 93,44" fill="none" stroke="#6b4226" strokeWidth="0.25" />
      </g>
      <g transform="translate(8,88) scale(0.2)" opacity="0.25">
        <line x1="0" y1="0" x2="0" y2="8" stroke="#6b4226" strokeWidth="1.2" />
        <circle cx="0" cy="-1" r="1.5" fill="none" stroke="#6b4226" strokeWidth="0.8" />
        <path d="M-3,8 Q0,6 3,8" fill="none" stroke="#6b4226" strokeWidth="1" />
      </g>
      <g transform="translate(92,10) scale(0.25)" opacity="0.3">
        <polygon points="0,-4 1.2,-1.2 4,0 1.2,1.2 0,4 -1.2,1.2 -4,0 -1.2,-1.2" fill="#2c1810" />
      </g>
      <path d="M2,97 Q5,95 8,96 Q11,97 13,95" fill="none" stroke="#6b4226" strokeWidth="0.12" opacity="0.2" />
      <path d="M88,2 Q91,3 93,2 Q95,1 97,3" fill="none" stroke="#6b4226" strokeWidth="0.12" opacity="0.15" />
      <g transform="translate(5,50)" opacity="0.1">
        <line x1="0" y1="-1" x2="0" y2="1" stroke="#6b4226" strokeWidth="0.2" />
        <line x1="-1" y1="0" x2="1" y2="0" stroke="#6b4226" strokeWidth="0.2" />
      </g>
      <g transform="translate(95,50)" opacity="0.1">
        <line x1="0" y1="-1" x2="0" y2="1" stroke="#6b4226" strokeWidth="0.2" />
        <line x1="-1" y1="0" x2="1" y2="0" stroke="#6b4226" strokeWidth="0.2" />
      </g>
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
  const [enteringIsland, setEnteringIsland] = useState(false);

  const goToCourse = useCallback((course: ArchipelagoCourse) => {
    setSelectedCourse(course);
    setEnteringIsland(true);
    // Delay the actual view change for zoom animation
    setTimeout(() => {
      setEnteringIsland(false);
      if ((course.lessons ?? []).length > 0) setViewLevel("course");
    }, 600);
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
  const totalLessons = courses.reduce((s, c) => s + (c.lessons ?? []).length, 0);
  const completedLessons = courses.reduce((s, c) => s + (c.lessons ?? []).filter((l: any) => l.completed).length, 0);
  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="min-h-screen relative"
      style={{ background: "linear-gradient(180deg, #3b2416 0%, #4a2d1b 35%, #5a3821 65%, #3b2416 100%)" }}>
      {/* Wood grain texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 4px), repeating-linear-gradient(85deg, transparent, transparent 8px, rgba(0,0,0,0.05) 8px, rgba(0,0,0,0.05) 9px)`
        }} />

      {/* Header */}
      <header className="relative z-30 border-b"
        style={{ background: "rgba(44,24,16,0.9)", backdropFilter: "blur(4px)", borderColor: "rgba(107,66,38,0.4)" }}>
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
        {/* ─── WORLD VIEW ─── */}
        {viewLevel === "world" && (
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-lg overflow-hidden transition-all duration-500"
                style={{
                  background: "linear-gradient(135deg, #d8c49a 0%, #e6d3aa 20%, #f1e3bf 50%, #e6d3aa 80%, #d8c49a 100%)",
                  border: "3px solid #a08c6a",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.7), 0 4px 12px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.15), 2px 2px 0 1px rgba(58,36,22,0.3)",
                  filter: enteringIsland ? "blur(8px) brightness(0.5)" : "none",
                  transform: enteringIsland ? "scale(1.05)" : "scale(1)"
                }}>
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px" }} />
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: "radial-gradient(ellipse at 50% 50%, rgba(157,200,216,0.35) 0%, rgba(132,184,203,0.25) 40%, rgba(110,167,187,0.30) 100%)"
                }} />
                <div className="absolute inset-0 pointer-events-none" style={{
                  boxShadow: "inset 0 0 60px rgba(90,56,33,0.4), inset 0 0 120px rgba(44,24,16,0.3)",
                  borderRadius: "inherit"
                }} />
                <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
                  <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-amber-100" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-amber-100" />
                </div>
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2c1810" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
                <div className="absolute top-3 right-3 pointer-events-none">
                  <CompassRose />
                </div>
                <SeaElements />
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {courses.map((course, i) => {
                    if (i >= courses.length - 1) return null;
                    const next = courses[i + 1];
                    return (
                      <path key={`route-${course.id}`}
                        d={`M${course.x},${course.y} Q${(course.x + next.x) / 2 + 10},${(course.y + next.y) / 2 - 15} ${next.x},${next.y}`}
                        fill="none" stroke="#8b5e3c" strokeWidth="0.3" strokeDasharray="2,1.5" opacity="0.6" />
                    );
                  })}
                </svg>
                {courses.map((course) => {
                  const courseLessons = course.lessons ?? [];
                  const lessonCount = courseLessons.length;
                  const courseCompleted = courseLessons.filter((l: any) => l.completed).length;
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
                      {course.isCurrent && (
                        <div className="absolute inset-[-10px] rounded-full border-2 animate-ping opacity-40"
                          style={{ borderColor: "#7fa35d" }} />
                      )}
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
                      <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap drop-shadow-lg"
                        style={{ color: "#2c1810" }}>
                        {t(course.titleKey)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
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

        {/* ─── ISLAND VIEW (Course) ─── */}
        {viewLevel === "course" && selectedCourse && (
          <IslandView
            course={selectedCourse}
            t={t}
            onLessonClick={goToLesson}
          />
        )}

        {viewLevel === "lessons" && selectedCourse && (
          <IslandView
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

/* ══════════════════════════════════════════════════════════════════════════════
   🏝️ ISLAND VIEW — Immersive lesson navigation
   ══════════════════════════════════════════════════════════════════════════════ */
function IslandView({ course, t, onLessonClick }: {
  course: ArchipelagoCourse;
  t: (key: string, fallback?: string) => string;
  onLessonClick: (id: number) => void;
}) {
  const [showShowcase, setShowShowcase] = useState(false);
  if (!course) return null;
  const lessons = course.lessons ?? [];
  const showcaseVideo = course.media?.introVideoUrl;
  const completedCount = lessons.filter((l: any) => l.completed).length;
  const total = lessons.length;
  const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  // Compute viewBox that fits all lessons with padding
  const xs = lessons.map((l: any) => l.x ?? 50);
  const ys = lessons.map((l: any) => l.y ?? 50);
  const minX = xs.length > 0 ? Math.max(0, Math.min(...xs) - 10) : 0;
  const maxX = xs.length > 0 ? Math.min(100, Math.max(...xs) + 10) : 100;
  const minY = ys.length > 0 ? Math.max(0, Math.min(...ys) - 12) : 0;
  const maxY = ys.length > 0 ? Math.min(100, Math.max(...ys) + 12) : 100;
  const vw = Math.max(maxX - minX, 1);
  const vh = Math.max(maxY - minY, 1);

  return (
    <div className="max-w-6xl mx-auto space-y-4 animate-[islandEnter_0.6s_ease-out]">
      {/* ── Island Name Banner ── */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs"
          style={{ background: "rgba(44,24,16,0.8)", border: "1px solid rgba(107,66,38,0.4)", color: "#b8a48a" }}>
          <span className="text-lg">{course.emoji}</span>
          <span>Island Overview</span>
          <span className="opacity-50">•</span>
          <span style={{ color: "#e6d3aa" }}>{completedCount}/{total} discovered</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight" style={{ color: "#f1e3bf" }}>
          {t(course.titleKey)}
        </h2>
        <p className="text-sm max-w-lg mx-auto" style={{ color: "#b8a48a" }}>
          {t(course.descriptionKey)}
        </p>
        {showcaseVideo && (
          <button
            onClick={() => setShowShowcase(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-colors hover:opacity-80"
            style={{ background: "rgba(107,66,38,0.3)", border: "1px solid rgba(107,66,38,0.5)", color: "#d8c49a" }}
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>Watch Island Timelapse</span>
          </button>
        )}
      </div>

      {/* ── Island Map (the main parchment overlay) ── */}
      <div className="relative rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #f5e6c8 0%, #e8d4aa 30%, #f1e3bf 60%, #e6d3aa 100%)",
          border: "3px solid #a08c6a",
          boxShadow: "0 40px 120px rgba(0,0,0,0.6), 0 10px 30px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.15), 3px 3px 0 1px rgba(58,36,22,0.25)",
          transform: "scale(1.01)",
          minHeight: "400px"
        }}>
        {/* Parchment noise */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px" }} />
        {/* Water tint */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse at 50% 45%, rgba(132,184,203,0.12) 0%, rgba(110,167,187,0.08) 50%, transparent 80%)"
        }} />
        {/* Aged edges */}
        <div className="absolute inset-0 pointer-events-none" style={{
          boxShadow: "inset 0 0 50px rgba(90,56,33,0.25), inset 0 0 100px rgba(44,24,16,0.15)"
        }} />
        {/* Compass rose small */}
        <div className="absolute top-2 right-2 pointer-events-none opacity-50" style={{ transform: "scale(0.35)", transformOrigin: "top right" }}>
          <CompassRose />
        </div>

        {/* ── SVG Island Map ── */}
        <svg className="w-full" viewBox={`${minX} ${minY} ${vw} ${vh}`}
          preserveAspectRatio="xMidYMid meet" style={{ minHeight: "380px" }}>

          {/* Island shape — organic blob behind lessons */}
          <ellipse cx={(minX + maxX) / 2} cy={(minY + maxY) / 2}
            rx={vw * 0.42} ry={vh * 0.38}
            fill="url(#islandGreen)" opacity="0.18" />
          <ellipse cx={(minX + maxX) / 2 - 5} cy={(minY + maxY) / 2 + 3}
            rx={vw * 0.38} ry={vh * 0.33}
            fill="url(#islandGreen)" opacity="0.12" />

          <defs>
            <radialGradient id="islandGreen">
              <stop offset="0%" stopColor="#7fa35d" />
              <stop offset="60%" stopColor="#6b8e4e" />
              <stop offset="100%" stopColor="#4a6b35" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ── Paths between lessons ── */}
          {lessons.map((lesson: any, idx: number) => {
            if (idx >= lessons.length - 1) return null;
            const next = lessons[idx + 1] as any;
            if (!next) return null;
            const isPathVisible = lesson.completed || lesson.current;
            const isPathLocked = !lesson.completed && !lesson.current && !next.available;

            // Bezier control points for organic curves
            const cx1 = lesson.x + (next.x - lesson.x) * 0.3 + (idx % 2 === 0 ? 3 : -3);
            const cy1 = lesson.y - 4 - (idx * 2 % 5);
            const cx2 = lesson.x + (next.x - lesson.x) * 0.7 + (idx % 2 === 0 ? -2 : 4);
            const cy2 = next.y - 3 - ((idx + 1) * 2 % 4);

            return (
              <g key={`path-${lesson.id}`}>
                {/* Fog shadow for locked paths */}
                {isPathLocked && (
                  <path
                    d={`M${lesson.x},${lesson.y} C${cx1},${cy1} ${cx2},${cy2} ${next.x},${next.y}`}
                    fill="none" stroke="#5a4a3a" strokeWidth="2.5" opacity="0.15"
                    strokeDasharray="4,3"
                  />
                )}
                {/* Main path */}
                <path
                  d={`M${lesson.x},${lesson.y} C${cx1},${cy1} ${cx2},${cy2} ${next.x},${next.y}`}
                  fill="none"
                  stroke={isPathVisible ? "#8b5e3c" : "#7a6a5a"}
                  strokeWidth={isPathVisible ? "1.2" : "0.8"}
                  strokeDasharray={isPathVisible ? "none" : "3,2"}
                  opacity={isPathVisible ? 0.6 : 0.25}
                  strokeLinecap="round"
                />
                {/* Path direction indicator for visible paths */}
                {isPathVisible && (
                  <circle
                    cx={lesson.x + (next.x - lesson.x) * 0.5 + (idx % 2 === 0 ? 1.5 : -1.5)}
                    cy={lesson.y + (next.y - lesson.y) * 0.5 - 2}
                    r="0.6" fill="#8b5e3c" opacity="0.35"
                  />
                )}
              </g>
            );
          })}

          {/* ── Lesson Nodes (Landmarks) ── */}
          {lessons.map((lesson: any, idx: number) => {
            const isCompleted = lesson.completed;
            const isCurrent = lesson.current;
            const isAvailable = lesson.available;
            const isLocked = !isAvailable;
            const isFinal = lesson.isFinalIsland;
            const isMain = lesson.isMainIsland;
            const nodeSize = isFinal ? 9 : isMain ? 7.5 : 6;
            const fontSize = isFinal ? 5 : isMain ? 4.5 : 3.5;

            return (
              <g key={lesson.id}
                onClick={() => isAvailable && onLessonClick(lesson.id)}
                className={isAvailable ? "cursor-pointer group" : "cursor-not-allowed"}
                style={{ transition: "transform 0.2s" }}>

                {/* Fog cloud for locked nodes */}
                {isLocked && (
                  <>
                    <circle cx={lesson.x} cy={lesson.y} r={nodeSize + 4} fill="rgba(90,74,58,0.12)" />
                    <circle cx={lesson.x - 2} cy={lesson.y + 1} r={nodeSize + 2} fill="rgba(90,74,58,0.08)" />
                  </>
                )}

                {/* Pulsing ring for current */}
                {isCurrent && (
                  <>
                    <circle cx={lesson.x} cy={lesson.y} r={nodeSize + 3} fill="none" stroke="#7fa35d" strokeWidth="0.6" opacity="0.25">
                      <animate attributeName="r" values={`${nodeSize + 3};${nodeSize + 6};${nodeSize + 3}`} dur="2.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.25;0.08;0.25" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx={lesson.x} cy={lesson.y} r={nodeSize + 1} fill="none" stroke="#7fa35d" strokeWidth="0.4" opacity="0.4">
                      <animate attributeName="r" values={`${nodeSize + 1};${nodeSize + 3};${nodeSize + 1}`} dur="2s" repeatCount="indefinite" />
                    </circle>
                  </>
                )}

                {/* Node background circle */}
                <circle cx={lesson.x} cy={lesson.y} r={nodeSize}
                  fill={isCompleted ? "#7fa35d" : isCurrent ? "#6ea7bb" : isAvailable ? "#84b8cb" : "#5a4a3a"}
                  stroke={isCompleted ? "#6b8e4e" : isCurrent ? "#4a8a5a" : isAvailable ? "#5a8a9e" : "#4a3a2a"}
                  strokeWidth={isCurrent ? "0.8" : "0.5"}
                  style={{
                    filter: isCompleted ? "drop-shadow(0 2px 4px rgba(107,142,78,0.4))" : isCurrent ? "drop-shadow(0 2px 6px rgba(110,167,187,0.5))" : "drop-shadow(0 2px 3px rgba(0,0,0,0.3))"
                  }}
                />

                {/* Inner highlight for completed/current */}
                {(isCompleted || isCurrent) && (
                  <circle cx={lesson.x - nodeSize * 0.2} cy={lesson.y - nodeSize * 0.2} r={nodeSize * 0.35}
                    fill="white" opacity="0.15" />
                )}

                {/* Lesson emoji as "building" */}
                <text x={lesson.x} y={lesson.y + fontSize * 0.35} textAnchor="middle" fontSize={fontSize}
                  className="pointer-events-none"
                  style={{ filter: isLocked ? "grayscale(1) opacity(0.4)" : "none" }}>
                  {lesson.emoji}
                </text>

                {/* Flag for completed */}
                {isCompleted && (
                  <g transform={`translate(${lesson.x + nodeSize * 0.6},${lesson.y - nodeSize * 0.9})`}>
                    <line x1="0" y1="0" x2="0" y2="-3.5" stroke="#2c1810" strokeWidth="0.4" />
                    <path d="M0,-3.5 L3,-2.5 L0,-1.5" fill="#e74c3c" opacity="0.8" />
                  </g>
                )}

                {/* Lock icon overlay */}
                {isLocked && (
                  <text x={lesson.x} y={lesson.y + fontSize * 0.35} textAnchor="middle" fontSize="3" fill="#4a3a2a" opacity="0.5">
                    🔒
                  </text>
                )}

                {/* Lesson name label */}
                <text x={lesson.x} y={lesson.y + nodeSize + 2.5} textAnchor="middle" fontSize="1.8"
                  fill={isLocked ? "#7a6a5a" : "#2c1810"}
                  opacity={isLocked ? 0.4 : 0.8}
                  fontFamily="serif"
                  className="pointer-events-none"
                  style={{ fontStyle: "italic" }}>
                  {(lesson.title ?? "").length > 18 ? (lesson.title ?? "").substring(0, 16) + "…" : (lesson.title ?? "")}
                </text>

                {/* Step number */}
                <text x={lesson.x} y={lesson.y + nodeSize + 4.5} textAnchor="middle" fontSize="1.2"
                  fill="#6b4226" opacity="0.4" className="pointer-events-none">
                  {idx + 1}
                </text>
              </g>
            );
          })}
        </svg>

        {/* ── Bottom legend strip ── */}
        <div className="flex items-center justify-center gap-6 py-2 px-4 text-xs"
          style={{ borderTop: "1px solid rgba(160,140,106,0.4)", color: "#6b4226" }}>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#7fa35d" }} />
            <span>Discovered</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#6ea7bb" }} />
            <span>Current Quest</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#84b8cb" }} />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#5a4a3a" }} />
            <span>Locked</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>🚩</span>
            <span>Completed</span>
          </div>
        </div>
      </div>

      {/* ── XP Summary ── */}
      <div className="flex items-center justify-center gap-4 text-xs" style={{ color: "rgba(184,164,138,0.5)" }}>
        <span>⚡ {lessons.reduce((s: number, l: any) => s + (l.xp ?? 50), 0)} XP available</span>
        <span>•</span>
        <span>⏱ {lessons.reduce((s: number, l: any) => s + (l.duration ?? 10), 0)} min total</span>
      </div>

      {/* ── Showcase Video Overlay ── */}
      {showShowcase && showcaseVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setShowShowcase(false)}>
          <div className="relative w-full max-w-3xl mx-4"
            onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowShowcase(false)}
              className="absolute -top-10 right-0 p-1.5 rounded-full transition-colors"
              style={{ color: "#d8c49a" }}>
              <X className="w-5 h-5" />
            </button>
            <div className="relative rounded-xl overflow-hidden shadow-2xl"
              style={{ paddingBottom: "56.25%", border: "2px solid rgba(107,66,38,0.5)" }}>
              <iframe
                src={toYouTubeEmbed(showcaseVideo)}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`${course.name} Showcase`}
              />
            </div>
            {course.media?.description && (
              <p className="text-center text-xs mt-3" style={{ color: "rgba(184,164,138,0.6)" }}>
                {course.media.description}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

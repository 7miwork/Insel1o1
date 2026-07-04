import { useState, useCallback, useMemo, useRef, useEffect } from "react";
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
    <svg viewBox="0 0 120 120" className={className} style={{ width: "120px", height: "120px" }}>
      <g opacity="0.85">
        <circle cx="60" cy="60" r="52" fill="none" stroke="#2c1810" strokeWidth="1" />
        <circle cx="60" cy="60" r="44" fill="none" stroke="#2c1810" strokeWidth="0.55" strokeDasharray="5,3" />
        <circle cx="60" cy="60" r="36" fill="none" stroke="#2c1810" strokeWidth="0.4" />
        {[...Array(16).keys()].map((i) => {
          const angle = i * 22.5;
          const rad = (angle * Math.PI) / 180;
          const inner = i % 2 === 0 ? 12 : 18;
          const outer = i % 2 === 0 ? 44 : 52;
          return (
            <line key={angle}
              x1={60 + Math.sin(rad) * inner}
              y1={60 - Math.cos(rad) * inner}
              x2={60 + Math.sin(rad) * outer}
              y2={60 - Math.cos(rad) * outer}
              stroke="#2c1810"
              strokeWidth={i % 4 === 0 ? 1.6 : 0.9}
              opacity={i % 4 === 0 ? 0.9 : 0.55} />
          );
        })}
        {['N', 'E', 'S', 'W'].map((letter, idx) => {
          const angle = idx * 90;
          const rad = (angle * Math.PI) / 180;
          const x = 60 + Math.sin(rad) * 58;
          const y = 60 - Math.cos(rad) * 58 + (letter === 'S' ? 1 : 0);
          return (
            <text key={letter} x={x} y={y} textAnchor="middle" fontSize="6" fontWeight="700" fill="#2c1810" style={{ fontFamily: 'IM Fell English SC, serif' }}>
              {letter}
            </text>
          );
        })}
        <polygon points="60,24 63,34 60,30 57,34" fill="#2c1810" opacity="0.95" />
        <circle cx="60" cy="60" r="3" fill="#2c1810" opacity="0.9" />
        <circle cx="60" cy="60" r="1.2" fill="#0d0705" />
      </g>
    </svg>
  );
}

function wrapLabelText(text: string, maxChars: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxChars || !current) {
      current = next;
    } else {
      lines.push(current);
      current = word;
      if (lines.length === 2) break;
    }
  }
  if (current && lines.length < 2) lines.push(current);
  return lines;
}

/** Safely convert a YouTube URL to an embed-compatible URL */
function toYouTubeEmbed(url: string): string {
  if (!url) return "";
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  if (url.includes("youtube.com/embed/")) return url;
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
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 4px), repeating-linear-gradient(85deg, transparent, transparent 8px, rgba(0,0,0,0.05) 8px, rgba(0,0,0,0.05) 9px)`
        }} />

      <header className="relative z-30 border-b"
        style={{ background: "rgba(44,24,16,0.9)", backdropFilter: "blur(4px)", borderColor: "rgba(107,66,38,0.4)" }}>
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={handleBack} className="p-1.5 rounded-lg transition-colors" style={{ color: "#e6d3aa" }}>
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
            <div className="flex-1">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-lg overflow-hidden transition-all duration-500"
                style={{
                  background: "linear-gradient(135deg, #d8c49a 0%, #e6d3aa 20%, #f1e3bf 50%, #e6d3aa 80%, #d8c49a 100%)",
                  border: "3px solid #a08c6a",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.7), 0 4px 12px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.15), 2px 2px 0 1px rgba(58,36,22,0.3)",
                  filter: enteringIsland ? "blur(8px) brightness(0.5)" : "none",
                  transform: enteringIsland ? "scale(1.05)" : "scale(1)"
                }}>
                <SeaElements />
                <div className="absolute top-3 right-3 pointer-events-none">
                  <CompassRose />
                </div>
                {courses.map((course) => {
                  const courseLessons = course.lessons ?? [];
                  const lessonCount = courseLessons.length;
                  const courseCompleted = courseLessons.filter((l: any) => l.completed).length;
                  const allDone = course.available && lessonCount > 0 && courseCompleted === lessonCount;
                  const hasProgress = courseCompleted > 0 && !allDone;
                  return (
                    <button key={course.id}
                      onClick={() => course.available && goToCourse(course)}
                      disabled={!course.available}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none group"
                      style={{ left: `${course.x}%`, top: `${course.y}%` }}>
                      <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${!course.available ? "opacity-40" : ""} ${allDone ? "ring-2 shadow-lg" : ""} ${hasProgress ? "ring-2" : ""}`}
                        style={{
                          background: allDone ? "radial-gradient(circle, #7fa35d 0%, #6b8e4e 50%, #4a6b35 100%)" : hasProgress ? "radial-gradient(circle, #84b8cb 0%, #6ea7bb 50%, #4a8a9e 100%)" : "radial-gradient(circle, #9a8a7a 0%, #7a6a5a 50%, #5a4a3a 100%)",
                          ...(allDone ? { boxShadow: "0 4px 12px rgba(107,142,78,0.4)", borderColor: "#7fa35d" } : {}),
                          ...(hasProgress ? { borderColor: "#6ea7bb" } : {})
                        }}>
                        <span className="text-2xl sm:text-3xl">{course.emoji}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {viewLevel === "course" && selectedCourse && (
          <IslandView course={selectedCourse} t={t} onLessonClick={goToLesson} />
        )}
        {viewLevel === "lessons" && selectedCourse && (
          <IslandView course={selectedCourse} t={t} onLessonClick={goToLesson} />
        )}
      </main>

      <footer className="relative z-20 text-center py-3 text-xs" style={{ color: "rgba(184,164,138,0.5)" }}>
        Set sail on your learning adventure
      </footer>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   🏝️ ISLAND VIEW — Large explorable scrollable canvas
   ══════════════════════════════════════════════════════════════════════════════ */
function IslandView({ course, t, onLessonClick }: {
  course: ArchipelagoCourse;
  t: (key: string, fallback?: string) => string;
  onLessonClick: (id: number) => void;
}) {
  const [showShowcase, setShowShowcase] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  if (!course) return null;
  const lessons = course.lessons ?? [];
  const showcaseVideo = course.media?.introVideoUrl;
  const completedCount = lessons.filter((l: any) => l.completed).length;
  const total = lessons.length;

  const desktopBreakpoint = 1200;
  const tabletBreakpoint = 700;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => setIsMobile(window.innerWidth < tabletBreakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const getLessonPos = (l: any) => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    const x = w >= desktopBreakpoint ? (l.x ?? 50) : (w >= tabletBreakpoint ? (l.tabletX ?? l.x ?? 50) : 50);
    const y = w >= desktopBreakpoint ? (l.y ?? 50) : (w >= tabletBreakpoint ? (l.tabletY ?? l.y ?? 50) : 50);
    return { x: Math.min(100, Math.max(0, x)), y: Math.min(100, Math.max(0, y)) };
  };

  const positions = lessons.map((l: any) => getLessonPos(l));
  const xs = positions.map((p) => p.x);
  const ys = positions.map((p) => p.y);
  const pad = 25;
  const minX = xs.length > 0 ? Math.max(0, Math.min(...xs) - pad) : 0;
  const maxX = xs.length > 0 ? Math.max(...xs) + pad : 100;
  const minY = ys.length > 0 ? Math.max(0, Math.min(...ys) - pad) : 0;
  const maxY = ys.length > 0 ? Math.max(...ys) + pad : 100;
  const vw = Math.max(maxX - minX, 1);
  const vh = Math.max(maxY - minY, 1);

  // Calculate world bounding box for canvas sizing
  // World bounds: minY=0, maxY=125, so vh=125
  // Scale factor converts viewBox units to pixels
  const CANVAS_SCALE = 14; // pixels per SVG unit (higher = more resolution)
  const worldWidth = Math.max(vw * CANVAS_SCALE, 1100); // min 1100px wide
  const worldHeight = Math.max(vh * CANVAS_SCALE + 400, 1800); // +400 bottom margin
  const BOTTOM_PAD = 400;
  return (
    <div className="w-full space-y-4 animate-[islandEnter_0.6s_ease-out]">
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
          <button onClick={() => setShowShowcase(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-colors hover:opacity-80"
            style={{ background: "rgba(107,66,38,0.3)", border: "1px solid rgba(107,66,38,0.5)", color: "#d8c49a" }}>
            <PlayCircle className="w-3.5 h-3.5" />
            <span>Watch Island Timelapse</span>
          </button>
        )}
      </div>

      {/* ── SCROLLABLE CANVAS: large parchment area, no clipping ── */}
      <div className="relative w-full overflow-auto"
        style={{
          background: "linear-gradient(145deg, #f5e6c8 0%, #e8d4aa 30%, #f1e3bf 60%, #e6d3aa 100%)",
          border: "3px solid #a08c6a",
          boxShadow: "0 40px 120px rgba(0,0,0,0.6), 0 10px 30px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.15), 3px 3px 0 1px rgba(58,36,22,0.25)",
          borderRadius: "1rem",
        }}>
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='250' height='250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")", backgroundSize: "220px 220px" }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(circle at 50% 55%, rgba(48,96,104,0.14) 0%, rgba(36,74,80,0.08) 30%, transparent 70%)"
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          boxShadow: "inset 0 0 40px rgba(90,56,33,0.22), inset 0 0 110px rgba(44,24,16,0.12)"
        }} />

        {!isMobile && (
          <div style={{ width: `${worldWidth}px`, height: `${worldHeight + 140}px`, padding: "60px 40px 80px 40px", boxSizing: "border-box" }}>
            {/* SVG canvas sized exactly to world bounds */}
            <svg viewBox={`${minX} ${minY} ${vw} ${vh}`}
              preserveAspectRatio="xMidYMid meet"
              style={{ width: "100%", height: "100%", display: "block" }}>

              <defs>
                <radialGradient id="islandGreen">
                  <stop offset="0%" stopColor="#7fa35d" />
                  <stop offset="60%" stopColor="#6b8e4e" />
                  <stop offset="100%" stopColor="#4a6b35" stopOpacity="0" />
                </radialGradient>
                <filter id="paperGrain">
                  <feTurbulence type="fractalNoise" baseFrequency="0.17" numOctaves="2" result="noise" />
                  <feColorMatrix type="saturate" values="0.2" />
                  <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
                </filter>
              </defs>

              <rect x={minX} y={minY} width={vw} height={vh}
                fill="rgba(248,236,211,0.28)"
                filter="url(#paperGrain)" />
              <path d={`M${minX + vw*0.1},${minY + vh*0.1} C${minX + vw*0.2},${minY + vh*0.05} ${minX + vw*0.4},${minY + vh*0.08} ${minX + vw*0.52},${minY + vh*0.15} C${minX + vw*0.67},${minY + vh*0.25} ${minX + vw*0.72},${minY + vh*0.42} ${minX + vw*0.85},${minY + vh*0.48} C${minX + vw*0.94},${minY + vh*0.54} ${minX + vw*0.98},${minY + vh*0.65} ${minX + vw*0.9},${minY + vh*0.78}`}
                fill="none" stroke="rgba(82,57,34,0.16)" strokeWidth="0.4" opacity="0.55" />

              {lessons.map((lesson: any, idx: number) => {
                if (idx >= lessons.length - 1) return null;
                const next = lessons[idx + 1] as any;
                if (!next) return null;
                const isPathVisible = lesson.completed || lesson.current;
                const cx1 = lesson.x + (next.x - lesson.x) * 0.3 + (idx % 2 === 0 ? 3 : -3);
                const cy1 = lesson.y - 4 - (idx * 2 % 5);
                const cx2 = lesson.x + (next.x - lesson.x) * 0.7 + (idx % 2 === 0 ? -2 : 4);
                const cy2 = next.y - 3 - ((idx + 1) * 2 % 4);
                return (
                  <g key={`path-${lesson.id}`}>
                    <path d={`M${lesson.x},${lesson.y} C${cx1},${cy1} ${cx2},${cy2} ${next.x},${next.y}`}
                      fill="none"
                      stroke={isPathVisible ? "#8b5e3c" : "#7a6a5a"}
                      strokeWidth={isPathVisible ? "1.2" : "0.8"}
                      strokeDasharray={isPathVisible ? "none" : "3,2"}
                      opacity={isPathVisible ? 0.6 : 0.25}
                      strokeLinecap="round" />
                  </g>
                );
              })}

              {lessons.map((lesson: any, idx: number) => {
                const isCompleted = lesson.completed;
                const isCurrent = lesson.current;
                const isAvailable = lesson.available;
                const isLocked = !isAvailable;
                const isFinal = lesson.isFinalIsland;
                const isMain = lesson.isMainIsland;
                const pos = getLessonPos(lesson);
                const nodeSize = isFinal ? 14 : isMain ? 12 : 8;
                const labelWidth = isFinal ? 22 : isMain ? 18 : 16;
                const labelFontSize = isFinal ? 3.5 : isMain ? 3.2 : 2.8;

                const islandPath = `M${pos.x - nodeSize * 1.2},${pos.y + nodeSize * 0.2} C${pos.x - nodeSize * 1.4},${pos.y - nodeSize * 1.1} ${pos.x - nodeSize * 0.3},${pos.y - nodeSize * 1.8} ${pos.x + nodeSize * 0.6},${pos.y - nodeSize * 1.4} C${pos.x + nodeSize * 1.6},${pos.y - nodeSize * 1.2} ${pos.x + nodeSize * 1.5},${pos.y + nodeSize * 0.7} ${pos.x + nodeSize * 0.8},${pos.y + nodeSize * 1.4} C${pos.x + nodeSize * 0.2},${pos.y + nodeSize * 1.75} ${pos.x - nodeSize * 0.9},${pos.y + nodeSize * 1.45} ${pos.x - nodeSize * 1.3},${pos.y + nodeSize * 0.6} Z`;
                const shorePath = `M${pos.x - nodeSize * 1.15},${pos.y + nodeSize * 0.4} C${pos.x - nodeSize * 1.25},${pos.y - nodeSize * 0.2} ${pos.x - nodeSize * 0.15},${pos.y - nodeSize * 0.9} ${pos.x + nodeSize * 0.55},${pos.y - nodeSize * 0.55} C${pos.x + nodeSize * 1.25},${pos.y - nodeSize * 0.38} ${pos.x + nodeSize * 1.2},${pos.y + nodeSize * 0.45} ${pos.x + nodeSize * 0.75},${pos.y + nodeSize * 0.95}`;

                return (
                  <g key={lesson.id}
                    onClick={() => isAvailable && onLessonClick(lesson.id)}
                    className={isAvailable ? "cursor-pointer group" : "cursor-not-allowed"}>

                    <path d={islandPath}
                      fill={isCompleted ? "#e6d8b4" : isCurrent ? "#f4e8c7" : isAvailable ? "#f7ecd7" : "#ccc0a4"}
                      stroke="#7a5f3d"
                      strokeWidth="0.8"
                      opacity="0.98"
                      style={{ filter: "drop-shadow(0 2px 6px rgba(36,24,12,0.18))" }} />
                    <path d={shorePath}
                      fill="none"
                      stroke="#e4cfa8"
                      strokeWidth="1.5"
                      opacity="0.85"
                      strokeLinecap="round" />

                    <path d={`M${pos.x - nodeSize * 0.7},${pos.y - nodeSize * 0.2} C${pos.x - nodeSize * 0.3},${pos.y - nodeSize * 0.8} ${pos.x + nodeSize * 0.2},${pos.y - nodeSize * 0.9} ${pos.x + nodeSize * 0.8},${pos.y - nodeSize * 0.35}`}
                      fill="none"
                      stroke="#6b8e4e"
                      strokeWidth="0.6"
                      opacity="0.75"
                      strokeLinecap="round" />
                    <circle cx={pos.x + nodeSize * 0.45} cy={pos.y - nodeSize * 0.37} r="1.2" fill="#4f7a35" opacity="0.9" />
                    <path d={`M${pos.x + nodeSize * 0.53},${pos.y - nodeSize * 0.18} l-0.8,-1.5 l0.4,0.2 l-0.4,-0.2`} fill="#4f7a35" opacity="0.85" />

                    {isLocked && (
                      <g transform={`translate(${pos.x + nodeSize * 0.6},${pos.y - nodeSize * 0.3})`}>
                        <circle cx="0" cy="0" r="3.8" fill="rgba(116,80,40,0.18)" />
                        <path d="M-1,1 Q0,-1 1,1" fill="none" stroke="#7a5a2f" strokeWidth="0.9" />
                        <path d="M-1.2,0.5 L-0.8,0.5" stroke="#7a5a2f" strokeWidth="0.9" />
                        <path d="M-2,0.2 L2,0.2" stroke="#7a5a2f" strokeWidth="0.7" />
                      </g>
                    )}

                    {isCurrent && (
                      <g transform={`translate(${pos.x},${pos.y - nodeSize * 0.35})`}>
                        <path d="M0,-1.6 l0.7,1.4 h-1.4 z" fill="#7f4c1c" stroke="#4b2f18" strokeWidth="0.5" />
                        <line x1="0" y1="-1.6" x2="0" y2="-3.4" stroke="#4b2f18" strokeWidth="0.4" />
                      </g>
                    )}

                    <text x={pos.x} y={pos.y + nodeSize * 1.7} textAnchor="middle" fontSize={labelFontSize}
                      fontFamily="Inter, system-ui, sans-serif"
                      className="pointer-events-none"
                      style={{ fill: isLocked ? "#7a6a5a" : "#3d2b1a", fontWeight: 600 }}>
                      {wrapLabelText(lesson.titleKey ? t(lesson.titleKey) : lesson.title, isFinal ? 22 : isMain ? 18 : 16).map((line, lineIndex) => (
                        <tspan key={lineIndex} x={pos.x} dy={lineIndex === 0 ? 0 : labelFontSize * 1.2}>{line}</tspan>
                      ))}
                    </text>

                    {isLocked && (
                      <text x={pos.x} y={pos.y + nodeSize * 2.4} textAnchor="middle" fontSize="2"
                        fontFamily="IM Fell English SC, serif"
                        fill="#7a5a2f" opacity="0.8">
                        Coming Soon
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        )}

        {/* ── Mobile: Vertical Journey ── */}
        {isMobile && (
          <div className="px-4 py-6">
            <div className="mx-auto max-w-sm space-y-4">
              {lessons.map((lesson: any, idx: number) => {
                const isCompleted = lesson.completed;
                const isCurrent = lesson.current;
                const isAvailable = lesson.available;
                const isLocked = !isAvailable;
                return (
                  <div key={lesson.id} className="relative flex items-center gap-3">
                    {idx < lessons.length - 1 && (
                      <div className="absolute left-6 top-12 h-8 w-0.5 border-l-2 border-dashed"
                        style={{ borderColor: "rgba(139,94,60,0.5)" }} />
                    )}
                    <button
                      onClick={() => isAvailable && onLessonClick(lesson.id)}
                      disabled={isLocked}
                      className={`relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-2 text-2xl transition-all ${isLocked ? "cursor-not-allowed opacity-40" : "cursor-pointer active:scale-95"}`}
                      style={{
                        borderColor: isCompleted ? "#6b8e4e" : isCurrent ? "#4a8a5a" : isAvailable ? "#5a8a9e" : "#4a3a2a",
                        background: isCompleted ? "linear-gradient(135deg, #7fa35d, #6b8e4e)" : isCurrent ? "linear-gradient(135deg, #6ea7bb, #4a8a9e)" : isAvailable ? "linear-gradient(135deg, #84b8cb, #5a8a9e)" : "#5a4a3a",
                        boxShadow: isCurrent ? "0 0 0 3px rgba(110,167,187,0.3)" : "none",
                        minHeight: "44px", minWidth: "44px",
                      }}>
                      <span className="relative z-10">{isLocked ? "🔒" : lesson.emoji}</span>
                      {isCompleted && <span className="absolute -right-1 -top-1 text-xs">✅</span>}
                      {isCurrent && <span className="absolute -right-1 -top-1 text-xs">⚡</span>}
                    </button>
                    <div className={`flex-1 rounded-xl border p-3 ${isLocked ? "opacity-50" : ""}`}
                      style={{
                        borderColor: isCompleted ? "#6b8e4e" : isCurrent ? "#4a8a5a" : isAvailable ? "#5a8a9e" : "#4a3a2a",
                        background: "rgba(245,230,200,0.9)", minHeight: "44px",
                      }}>
                      <p className="text-sm font-bold" style={{ color: "#2c1810" }}>
                        {idx + 1}. {lesson.title || lesson.titleKey}
                      </p>
                      {isCurrent && <p className="text-xs" style={{ color: "#4a8a5a" }}>Current Quest</p>}
                      {isCompleted && <p className="text-xs" style={{ color: "#6b8e4e" }}>Discovered</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {!isMobile && (
          <div className="sticky bottom-0 left-0 right-0 flex items-center justify-center gap-4 py-2 px-4 text-xs flex-wrap"
            style={{ borderTop: "1px solid rgba(160,140,106,0.4)", color: "#6b4226", background: "rgba(245,230,200,0.95)" }}>
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
        )}
      </div>

      <div className="flex items-center justify-center gap-4 text-xs" style={{ color: "rgba(184,164,138,0.5)" }}>
        <span>⚡ {lessons.reduce((s: number, l: any) => s + (l.xp ?? 50), 0)} XP available</span>
        <span>•</span>
        <span>⏱ {lessons.reduce((s: number, l: any) => s + (l.duration ?? 10), 0)} min total</span>
      </div>

      {showShowcase && showcaseVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setShowShowcase(false)}>
          <div className="relative w-full max-w-3xl mx-4" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowShowcase(false)}
              className="absolute -top-10 right-0 p-1.5 rounded-full transition-colors" style={{ color: "#d8c49a" }}>
              <X className="w-5 h-5" />
            </button>
            <div className="relative rounded-xl overflow-hidden shadow-2xl"
              style={{ paddingBottom: "56.25%", border: "2px solid rgba(107,66,38,0.5)" }}>
              <iframe
                src={toYouTubeEmbed(showcaseVideo)}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`${course.name} Showcase`} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
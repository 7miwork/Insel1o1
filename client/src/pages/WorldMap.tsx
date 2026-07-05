import { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, Compass, Ship, Map as MapIcon, Lock, CheckCircle2,
  PlayCircle, Wind, Trophy, Eye, X, Anchor
} from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import {
  programmingArchipelago,
  type ArchipelagoCourse,
} from "@/data/archipelago-config";

/* ── Types ── */
type ViewLevel = "world" | "subject" | "archipelago" | "island";

interface SubjectRegion {
  id: string;
  name: string;
  subtitle: string;
  emoji: string;
  color: string;
  lightColor: string;
  available: boolean;
  route: string;
  totalCourses: number;
  completedCourses: number;
  x: number;
  y: number;
}

const SUBJECTS: SubjectRegion[] = [
  {
    id: "coding",
    name: "Coding Archipelago",
    subtitle: "Begin your programming adventure.",
    emoji: "⚓",
    color: "#0D9488",
    lightColor: "#CCFBF1",
    available: true,
    route: "/world/coding",
    totalCourses: 2,
    completedCourses: 0,
    x: 56,
    y: 62,
  },
  {
    id: "mathematics",
    name: "Mathematics Kingdom",
    subtitle: "Coming Soon",
    emoji: "🔢",
    color: "#7c5e3a",
    lightColor: "#f5e6c8",
    available: false,
    route: "#",
    totalCourses: 0,
    completedCourses: 0,
    x: 14,
    y: 22,
  },
  {
    id: "science",
    name: "Science Isles",
    subtitle: "Coming Soon",
    emoji: "🔬",
    color: "#7c5e3a",
    lightColor: "#f5e6c8",
    available: false,
    route: "#",
    totalCourses: 0,
    completedCourses: 0,
    x: 84,
    y: 28,
  },
  {
    id: "language",
    name: "Language Archipelago",
    subtitle: "Coming Soon",
    emoji: "📖",
    color: "#7c5e3a",
    lightColor: "#f5e6c8",
    available: false,
    route: "#",
    totalCourses: 0,
    completedCourses: 0,
    x: 32,
    y: 76,
  },
];

/* ── Decorative SVGs ── */
function CompassRose() {
  return (
    <svg viewBox="0 0 100 100" style={{ width: "80px", height: "80px" }}>
      <g opacity="0.6">
        <circle cx="50" cy="50" r="48" fill="none" stroke="#2c1810" strokeWidth="0.6" />
        <circle cx="50" cy="50" r="44" fill="none" stroke="#2c1810" strokeWidth="0.3" strokeDasharray="3,2" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const isMajor = angle % 90 === 0;
          const innerR = isMajor ? 8 : 16;
          const outerR = isMajor ? 38 : 30;
          const rad = (angle * Math.PI) / 180;
          return (
            <line key={angle}
              x1={50 + Math.sin(rad) * innerR} y1={50 - Math.cos(rad) * innerR}
              x2={50 + Math.sin(rad) * outerR} y2={50 - Math.cos(rad) * outerR}
              stroke={isMajor ? "#1a0e06" : "#3b2416"} strokeWidth={isMajor ? "1.8" : "0.8"} opacity={isMajor ? "0.8" : "0.5"} />
          );
        })}
        <text x="50" y="10" textAnchor="middle" fontSize="4.5" fontWeight="bold" fill="#1a0e06">N</text>
        <circle cx="50" cy="50" r="2.5" fill="#2c1810" opacity="0.6" />
      </g>
    </svg>
  );
}

function SeaWaves() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path d="M5,88 Q15,84 25,88 Q35,92 45,88 Q55,84 65,88 Q75,92 85,88 Q95,84 100,88" fill="none" stroke="#7a5635" strokeWidth="0.18" opacity="0.26" />
      <path d="M0,94 Q10,91 20,94 Q30,97 40,94 Q50,91 60,94 Q70,97 80,94 Q90,91 100,94" fill="none" stroke="#7a5635" strokeWidth="0.14" opacity="0.18" />
      <path d="M8,72 Q18,68 28,72 Q38,76 48,72 Q58,68 68,72 Q78,76 88,72" fill="none" stroke="#7a5635" strokeWidth="0.1" opacity="0.16" />
      <path d="M15,78 C20,72 30,74 35,70" fill="none" stroke="#7a5635" strokeWidth="0.08" opacity="0.18" />
      <g transform="translate(12,74) scale(0.28)" opacity="0.32">
        <path d="M0,0 Q4,-3 8,0" fill="#7a5635" />
        <line x1="4" y1="0" x2="4" y2="-5" stroke="#7a5635" strokeWidth="0.28" />
      </g>
      <g transform="translate(80,78) scale(0.24) rotate(-8)" opacity="0.24">
        <path d="M0,0 Q3,-2 6,0" fill="#7a5635" />
        <line x1="3" y1="0" x2="3" y2="-4" stroke="#7a5635" strokeWidth="0.28" />
      </g>
      <g transform="translate(38,20) scale(0.5) rotate(12)" opacity="0.14">
        <path d="M0,0 Q4,-4 8,0 Q4,-2 0,0" fill="none" stroke="#7a5635" strokeWidth="0.18" />
      </g>
    </svg>
  );
}

/* ── Main WorldMap Component ── */
export default function WorldMap() {
  const [, setLocation] = useLocation();
  const { t } = useI18n();
  
  // Parse URL to determine view level
  const parseHash = useCallback((hash: string): { level: ViewLevel; subjectId?: string; archipelagoId?: string; islandId?: string } => {
    const parts = hash.replace("#", "").split("/").filter(Boolean);
    if (parts.length === 0 || parts[0] !== "world") return { level: "world" };
    if (parts.length === 1) return { level: "world" };
    if (parts.length === 2 && parts[1]) return { level: "subject", subjectId: parts[1] };
    if (parts.length === 3 && parts[1] && parts[2]) return { level: "archipelago", subjectId: parts[1], archipelagoId: parts[2] };
    if (parts.length === 4 && parts[1] && parts[2] && parts[3]) return { level: "island", subjectId: parts[1], archipelagoId: parts[2], islandId: parts[3] };
    return { level: "world" };
  }, []);

  const [viewState, setViewState] = useState<{ level: ViewLevel; subjectId?: string; archipelagoId?: string; islandId?: string }>({ level: "world" });
  const [isAnimating, setIsAnimating] = useState(false);
  const [animOrigin, setAnimOrigin] = useState<{ x: number; y: number } | undefined>();
  const [animDirection, setAnimDirection] = useState<"forward" | "backward">("forward");

  // Sync with URL
  useEffect(() => {
    const handleHashChange = () => {
      setViewState(parseHash(window.location.hash));
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [parseHash]);

  const currentSubject = useMemo(() => SUBJECTS.find(s => s.id === viewState.subjectId), [viewState.subjectId]);
  const currentArchipelago = useMemo(() => {
    if (!viewState.archipelagoId || !currentSubject) return null;
    const arch = programmingArchipelago;
    // Check if this archipelagoId matches any course
    const course = arch.courses.find(c => c.id === viewState.archipelagoId);
    return course ? arch : null;
  }, [viewState.archipelagoId, currentSubject]);

  // World view
  const goToSubject = useCallback((subject: SubjectRegion, e: React.MouseEvent) => {
    if (!subject.available) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const origin = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    setAnimOrigin(origin);
    setAnimDirection("forward");
    setIsAnimating(true);
    
    const newHash = `#/world/${subject.id}`;
    if (window.location.hash !== newHash) {
      window.location.hash = newHash;
    }
    
    setTimeout(() => setIsAnimating(false), 700);
  }, []);

  const goToArchipelago = useCallback((course: ArchipelagoCourse, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const origin = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    setAnimOrigin(origin);
    setAnimDirection("forward");
    setIsAnimating(true);
    
    const newHash = `#/world/${viewState.subjectId}/${course.id}`;
    if (window.location.hash !== newHash) {
      window.location.hash = newHash;
    }
    
    setTimeout(() => setIsAnimating(false), 700);
  }, [viewState.subjectId]);

  const goToIsland = useCallback((islandId: string, e?: React.MouseEvent) => {
    const origin = e ? {
      x: (e.currentTarget as HTMLElement).getBoundingClientRect().left + (e.currentTarget as HTMLElement).getBoundingClientRect().width / 2,
      y: (e.currentTarget as HTMLElement).getBoundingClientRect().top + (e.currentTarget as HTMLElement).getBoundingClientRect().height / 2,
    } : undefined;
    setAnimOrigin(origin);
    setAnimDirection("forward");
    setIsAnimating(true);
    
    const newHash = `#/world/${viewState.subjectId}/${viewState.archipelagoId}/${islandId}`;
    if (window.location.hash !== newHash) {
      window.location.hash = newHash;
    }
    
    setTimeout(() => setIsAnimating(false), 700);
  }, [viewState]);

  const goToLesson = useCallback((lessonId: string) => {
    setLocation(`/lesson/${lessonId}`);
  }, [setLocation]);

  const goBack = useCallback(() => {
    setAnimDirection("backward");
    setIsAnimating(true);
    
    const parts = window.location.hash.replace("#", "").split("/").filter(Boolean);
    if (parts.length <= 2) {
      window.location.hash = "#/world";
    } else if (parts.length === 3) {
      window.location.hash = `#/world/${parts[1]}`;
    } else if (parts.length === 4) {
      window.location.hash = `#/world/${parts[1]}/${parts[2]}`;
    } else {
      window.location.hash = `#/world/${parts[1]}/${parts[2]}`;
    }
    
    setTimeout(() => setIsAnimating(false), 700);
  }, []);

  const canGoBack = viewState.level !== "world";

  return (
    <div className="min-h-screen relative"
      style={{ background: "linear-gradient(180deg, #3b2416 0%, #4a2d1b 35%, #5a3821 65%, #3b2416 100%)" }}>
      {/* Wood grain overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 4px), repeating-linear-gradient(85deg, transparent, transparent 8px, rgba(0,0,0,0.05) 8px, rgba(0,0,0,0.05) 9px)`
        }} />

      {/* Header */}
      <header className="relative z-30 border-b"
        style={{ background: "rgba(44,24,16,0.9)", backdropFilter: "blur(4px)", borderColor: "rgba(107,66,38,0.4)" }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {canGoBack && (
              <button onClick={goBack} className="p-1.5 rounded-lg transition-colors" style={{ color: "#e6d3aa" }}>
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center gap-2">
              <MapIcon className="w-5 h-5" style={{ color: "#d8c49a" }} />
              <h1 className="text-lg font-bold tracking-tight" style={{ color: "#f1e3bf" }}>
                {viewState.level === "world" ? "World of Learning" :
                 viewState.level === "subject" && currentSubject ? currentSubject.name :
                 viewState.level === "archipelago" && currentArchipelago ? t(currentArchipelago.titleKey) :
                 viewState.level === "island" ? "Island Detail" : ""}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs" style={{ color: "#b8a48a" }}>
            <Compass className="w-3 h-3" />
            <span>
              {viewState.level === "world" ? "Choose your adventure" :
               viewState.level === "subject" ? "Explore the archipelago" :
               viewState.level === "archipelago" ? "Discover islands" :
               "Island preview"}
            </span>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {/* WORLD VIEW */}
          {viewState.level === "world" && (
            <motion.div
              key="world"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl"
              style={{
                background: "linear-gradient(180deg, #f7e1c0 0%, #e2c7a5 12%, transparent 24%), radial-gradient(circle at 52% 42%, #e2f3f9 0%, #a8d4e1 28%, #6b9db0 54%, #3b6d81 100%)",
                border: "4px solid rgba(95,66,41,0.95)",
                boxShadow: "inset 0 0 112px rgba(0,0,0,0.18), 0 40px 120px rgba(0,0,0,0.48)",
                backgroundImage: "radial-gradient(circle at 18% 14%, rgba(255,255,255,0.16) 0%, transparent 14%), radial-gradient(circle at 84% 78%, rgba(255,255,255,0.08) 0%, transparent 18%), repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(0,0,0,0.03) 10px, rgba(0,0,0,0.03) 11px), repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,0,0,0.03) 10px, rgba(0,0,0,0.03) 11px)",
              }}>
              <div id="world-map-container" className="relative w-full h-full" style={{ minHeight: "480px" }}>
                <div className="absolute inset-4 rounded-[1.5rem] border border-[#8b6d4f] bg-[rgba(255,250,238,0.94)] shadow-[inset_0_0_40px_rgba(90,56,33,0.18)] pointer-events-none" />
                <div className="absolute inset-6 rounded-[1.25rem] pointer-events-none"
                  style={{ background: "linear-gradient(180deg, rgba(255,250,238,0.94) 0%, rgba(244,228,199,0.94) 34%, rgba(232,206,168,0.92) 100%)" }} />
                <div className="absolute inset-8 rounded-[1.25rem] opacity-[0.08] pointer-events-none"
                  style={{ backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0.03) 0%, transparent 1px, transparent 100%), linear-gradient(rgba(0,0,0,0.03) 0%, transparent 1px, transparent 100%)", backgroundSize: "50px 50px" }} />
                {/* Decorative parchment inset SVG: torn edge + rhumb lines + larger compass */}
                <svg className="absolute inset-10 pointer-events-none" viewBox="0 0 100 60" preserveAspectRatio="none" style={{ mixBlendMode: 'multiply', opacity: 0.98 }}>
                  <defs>
                    <linearGradient id="parchGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#fffaf0" stopOpacity="0.99" />
                      <stop offset="100%" stopColor="#efe0bf" stopOpacity="0.96" />
                    </linearGradient>
                  </defs>
                  <rect x="0" y="0" width="100" height="60" rx="3" fill="url(#parchGrad)" stroke="#b89f7e" strokeWidth="0.9" />

                  {/* torn / scalloped edge */}
                  <path d="M1,4 C6,2 10,8 16,6 C22,4 28,10 34,6 C40,2 46,8 52,6 C58,4 64,10 70,6 C76,2 82,8 88,6 C94,4 98,8 99,6" fill="none" stroke="#a07b50" strokeWidth="0.9" opacity="0.95" />
                  <path d="M1,56 C6,58 10,52 16,54 C22,56 28,50 34,54 C40,58 46,52 52,54 C58,56 64,50 70,54 C76,58 82,52 88,54 C94,56 98,52 99,54" fill="none" stroke="#a07b50" strokeWidth="0.9" opacity="0.95" />
                  <path d="M1,4 L1,56" fill="none" stroke="#a07b50" strokeWidth="0.9" opacity="0.95" />
                  <path d="M99,4 L99,56" fill="none" stroke="#a07b50" strokeWidth="0.9" opacity="0.95" />

                  {/* subtle rhumb / contour lines */}
                  <g opacity="0.18" stroke="#876543" strokeWidth="0.22" fill="none">
                    <path d="M6,8 C20,6 30,10 46,8 C62,6 74,10 94,8" />
                    <path d="M6,20 C22,18 34,22 50,20 C66,18 78,22 94,20" />
                    <path d="M6,34 C22,32 34,36 50,34 C66,32 78,36 94,34" />
                  </g>

                  {/* rhumb-like dashed cross-lines */}
                  <g stroke="#6b4d30" strokeWidth="0.16" opacity="0.14">
                    <path d="M10,6 L90,54" strokeDasharray="5,6" />
                    <path d="M10,54 L90,6" strokeDasharray="5,6" />
                  </g>

                  {/* larger decorative compass, anchored bottom-right inside inset */}
                  <g transform="translate(74,40) scale(1.6)" opacity="0.96">
                    <circle cx="6" cy="6" r="6" fill="none" stroke="#5a3f2a" strokeWidth="0.8" />
                    <g transform="translate(6,6)">
                      {[0,45,90,135,180,225,270,315].map((a) => (
                        <line key={a} x1={0} y1={0} x2={Math.sin((a*Math.PI)/180)*5} y2={-Math.cos((a*Math.PI)/180)*5} stroke="#2c1810" strokeWidth={a%90===0?0.9:0.5} opacity={0.9} />
                      ))}
                      <polygon points="0,-5 1.4,0 0.0,-1.8 -1.4,0" fill="#2c1810" opacity="0.95" />
                    </g>
                    <text x="6" y="-2" textAnchor="middle" fontSize="3" fill="#2c1810" style={{ fontFamily: 'IM Fell English SC, serif' }}>N</text>
                  </g>
                </svg>
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px" }} />
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 50% 55%, rgba(230,230,218,0.18) 0%, rgba(214,193,158,0.12) 40%, transparent 70%)" }} />
                <div className="absolute inset-0 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 80px rgba(90,56,33,0.18), inset 0 0 140px rgba(44,24,16,0.10)" }} />
                <SeaWaves />
                <div className="absolute inset-0 pointer-events-none"
                  style={{ backgroundImage: "radial-gradient(circle at 28% 20%, rgba(255,255,255,0.12) 0%, transparent 15%), radial-gradient(circle at 72% 80%, rgba(255,255,255,0.08) 0%, transparent 18%)" }} />
                <div className="absolute top-5 left-5 rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-[#5d3e24]"
                  style={{ background: "rgba(247,233,209,0.88)", border: "1px solid rgba(128,98,74,0.45)" }}>
                  NAVIGATOR'S CHART
                </div>
                <div className="absolute bottom-6 right-6 pointer-events-none opacity-[0.92]">
                  <CompassRose />
                </div>

                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05]">
                  <defs>
                    <pattern id="worldGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M40 0 L0 0 0 40" fill="none" stroke="#4a321e" strokeWidth="0.5" opacity="0.55" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#worldGrid)" />
                  <path d="M10,20 L90,20 M10,40 L90,40 M10,60 L90,60 M10,80 L90,80" fill="none" stroke="#4a321e" strokeWidth="0.3" opacity="0.18" />
                  <path d="M20,10 L20,90 M40,10 L40,90 M60,10 L60,90 M80,10 L80,90" fill="none" stroke="#4a321e" strokeWidth="0.3" opacity="0.18" />
                </svg>

                {/* Subject Regions */}
                <div className="relative w-full h-full" style={{ minHeight: "480px" }}>
                  {SUBJECTS.map((subject) => (
                    <motion.div
                      key={subject.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${subject.x}%`,
                        top: `${subject.y}%`,
                        zIndex: subject.available ? 10 : 1,
                      }}
                      whileHover={subject.available ? { scale: 1.1 } : {}}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                      <button
                        onClick={(e) => goToSubject(subject, e)}
                        disabled={!subject.available}
                        className={`relative flex flex-col items-center ${subject.available ? "cursor-pointer group" : "cursor-default"}`}>
                        {/* Fog for locked regions */}
                        {!subject.available && (
                          <div className="absolute inset-0 rounded-full pointer-events-none z-20">
                            <div className="absolute inset-0 rounded-full"
                              style={{ background: "radial-gradient(circle, rgba(245,230,200,0.5) 0%, rgba(210,190,160,0.6) 50%, rgba(180,160,130,0.7) 100%)" }} />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Lock className="w-6 h-6" style={{ color: "#7c5e3a" }} />
                            </div>
                          </div>
                        )}
                        <div className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center border-2`}
                          style={{
                            borderColor: subject.available ? "#a08c6a" : "rgba(160,140,106,0.4)",
                            background: subject.available
                              ? "radial-gradient(circle at 40% 35%, #e8d4aa 0%, #d8c49a 40%, #c8b48a 100%)"
                              : "radial-gradient(circle at 40% 35%, rgba(200,185,160,0.6) 0%, rgba(180,165,140,0.5) 50%, rgba(160,145,120,0.4) 100%)",
                            boxShadow: subject.available
                              ? "0 8px 30px rgba(90,56,33,0.2), inset 0 -4px 10px rgba(90,56,33,0.1)"
                              : "none",
                            opacity: subject.available ? 1 : 0.6,
                          }}>
                          {subject.available && (
                            <div className="absolute top-3 left-4 w-10 h-5 rounded-full bg-white/20 blur-sm" />
                          )}
                          <span className="text-4xl sm:text-5xl relative z-10">{subject.emoji}</span>
                          {subject.available && (
                            <>
                              <div className="absolute bottom-6 left-4 w-3 h-4 rounded-full" style={{ background: "#7b6239" }} />
                              <div className="absolute bottom-5 right-4 w-2.5 h-3 rounded-full" style={{ background: "#7b6239" }} />
                              <div className="absolute bottom-4 left-6 w-1.5 h-2 rounded-full" style={{ background: "#c2a274" }} />
                            </>
                          )}
                        </div>
                        <div className="mt-2 text-center max-w-[140px]">
                          <p className={`font-bold text-sm sm:text-base truncate ${subject.available ? "text-[#3b271b]" : "text-[#7c5e3a]"}`}>
                            {subject.name}
                          </p>
                          <p className="text-[10px] sm:text-xs italic" style={{ color: subject.available ? "#6b4226" : "#7c5e3a" }}>
                            {subject.subtitle}
                          </p>
                          {!subject.available && (
                            <p className="text-[10px] mt-1" style={{ color: "#8a7256" }}>
                              Locked until future voyages
                            </p>
                          )}
                          {subject.available && (
                            <div className="flex items-center justify-center gap-1 mt-1">
                              <span className="text-[10px] font-medium" style={{ color: subject.color }}>
                                {subject.completedCourses}/{subject.totalCourses} courses
                              </span>
                              <ChevronLeft className="w-3 h-3" style={{ color: subject.color }} />
                            </div>
                          )}
                        </div>
                      </button>
                    </motion.div>
                  ))}

                  {/* Voyage paths */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M50,55 Q35,40 18,25" fill="none" stroke="#8b5e3c" strokeWidth="0.3" strokeDasharray="2,1.5" opacity="0.3" />
                    <path d="M50,55 Q65,42 82,30" fill="none" stroke="#8b5e3c" strokeWidth="0.3" strokeDasharray="2,1.5" opacity="0.3" />
                    <path d="M50,55 Q38,68 25,80" fill="none" stroke="#8b5e3c" strokeWidth="0.3" strokeDasharray="2,1.5" opacity="0.3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          )}

          {/* SUBJECT VIEW - show list of archipelagos */}
          {viewState.level === "subject" && currentSubject && (
            <motion.div
              key="subject"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="space-y-4">
              {/* Subject header */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs"
                  style={{ background: "rgba(44,24,16,0.8)", border: "1px solid rgba(107,66,38,0.4)", color: "#b8a48a" }}>
                  <span className="text-lg">{currentSubject.emoji}</span>
                  <span>Subject Overview</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight" style={{ color: "#f1e3bf" }}>
                  {currentSubject.name}
                </h2>
                <p className="text-sm max-w-lg mx-auto" style={{ color: "#b8a48a" }}>
                  {currentSubject.subtitle}
                </p>
              </div>

              {/* Courses / Archipelagos */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-lg overflow-hidden"
                style={{
                  background: "radial-gradient(circle at 40% 20%, #f7e6c1 0%, #e0c794 30%, #c6a76f 60%, #af8c55 100%)",
                  border: "4px solid rgba(96,68,42,0.95)",
                  boxShadow: "0 14px 40px rgba(0,0,0,0.55), inset 0 0 120px rgba(255,255,255,0.08)",
                  backgroundImage: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.12) 0%, transparent 15%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.08) 0%, transparent 18%)",
                }}>
                <div className="absolute inset-0 pointer-events-none"
                  style={{ backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 15%), repeating-linear-gradient(0deg, transparent, transparent 12px, rgba(0,0,0,0.02) 12px, rgba(0,0,0,0.02) 13px)" }} />
                <SeaWaves />
                <div className="absolute top-3 right-3 pointer-events-none">
                  <CompassRose />
                </div>
                <div className="absolute top-4 left-4 rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-[#4c3522]"
                  style={{ background: "rgba(255,250,234,0.88)", border: "1px solid rgba(117,87,61,0.5)" }}>
                  ARCHIPELAGO CHART
                </div>
                {programmingArchipelago.courses.map((course) => (
                  <motion.button
                    key={course.id}
                    onClick={(e) => goToArchipelago(course, e)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none"
                    style={{ left: `${course.x}%`, top: `${course.y}%` }}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.96 }}>
                    <div className="relative w-20 h-20 sm:w-20 sm:h-20 rounded-full flex items-center justify-center"
                      style={{
                        background: "radial-gradient(circle, #e8d2b0 0%, #c29a66 55%, #8f7046 100%)",
                        border: "2px solid rgba(123,78,42,0.9)",
                        boxShadow: "0 8px 18px rgba(72,42,16,0.35)",
                      }}>
                      <span className="text-2xl sm:text-3xl">{course.emoji}</span>
                      <div className="absolute inset-x-0 bottom-0 h-1 rounded-b-full bg-gradient-to-r from-[#8b5a2d] via-[#b07c45] to-[#8b5a2d] opacity-70" />
                    </div>
                    <div className="mt-2 text-center max-w-[140px]">
                      <p className="font-bold text-sm truncate" style={{ color: "#3b2717" }}>
                        {t(course.titleKey)}
                      </p>
                      <p className="text-[10px] italic" style={{ color: "#6b4226" }}>
                        {course.lessons.length} lessons
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ARCHIPELAGO VIEW - show individual lesson islands */}
          {viewState.level === "archipelago" && currentArchipelago && (() => {
            const course = currentArchipelago.courses[0];
            if (!course) return null;
            
            return (
              <motion.div
                key="archipelago"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="space-y-4">
              {/* Archipelago header */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs"
                  style={{ background: "rgba(44,24,16,0.8)", border: "1px solid rgba(107,66,38,0.4)", color: "#b8a48a" }}>
                  <span className="text-lg">{course.emoji}</span>
                  <span>Archipelago Overview</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight" style={{ color: "#f1e3bf" }}>
                  {t(course.titleKey)}
                </h2>
                <p className="text-sm max-w-lg mx-auto" style={{ color: "#b8a48a" }}>
                  {course.lessons.length} lessons to discover
                </p>
              </div>

              {/* Lesson Islands */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-lg overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #d8c49a 0%, #e6d3aa 20%, #f1e3bf 50%, #e6d3aa 80%, #d8c49a 100%)",
                  border: "3px solid #a08c6a",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.7), 0 4px 12px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.15)",
                }}>
                <SeaWaves />
                <div className="absolute inset-0 pointer-events-none"
                  style={{ backgroundImage: "radial-gradient(circle at 20% 15%, rgba(255,255,255,0.08) 0%, transparent 14%), radial-gradient(circle at 75% 80%, rgba(255,255,255,0.07) 0%, transparent 16%)" }} />
                <div className="absolute top-3 right-3 pointer-events-none">
                  <CompassRose />
                </div>
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {course.lessons.slice(0, -1).map((lesson, idx) => {
                    const nextLesson = course.lessons[idx + 1];
                    if (!nextLesson) return null;
                    return (
                      <path key={`${lesson.id}-${nextLesson.id}`}
                        d={`M${lesson.x},${lesson.y} Q${(lesson.x + nextLesson.x) / 2 + 5},${(lesson.y + nextLesson.y) / 2 - 8} ${nextLesson.x},${nextLesson.y}`}
                        fill="none"
                        stroke="#7b542f"
                        strokeWidth="0.35"
                        strokeDasharray="2,2"
                        opacity="0.35" />
                    );
                  })}
                </svg>
                {/* Lesson island buttons */}
                {course.lessons.map((lesson) => (
                  <motion.button
                    key={lesson.id}
                    onClick={(e) => goToIsland(lesson.id, e)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none"
                    style={{
                      left: `${lesson.x}%`,
                      top: `${lesson.y}%`
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}>
                    <div className="relative w-14 h-14 sm:w-18 sm:h-18 rounded-full flex items-center justify-center"
                      style={{
                        background: lesson.available !== false
                          ? "radial-gradient(circle, #f4ecd7 0%, #d4b68a 45%, #96714a 100%)"
                          : "radial-gradient(circle, #7e6c5a 0%, #5f5144 55%, #3e3228 100%)",
                        border: "2px solid rgba(116,80,43,0.9)",
                        boxShadow: "0 6px 18px rgba(56,34,17,0.25)",
                        opacity: lesson.available !== false ? 1 : 0.55,
                      }}>
                      <span className="text-xl sm:text-2xl">{lesson.emoji || "🏝️"}</span>
                      {!lesson.available && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Lock className="w-4 h-4" style={{ color: "#7c5e3a" }} />
                        </div>
                      )}
                    </div>
                    <div className="mt-1 text-center max-w-[100px]">
                      <p className="text-[10px] sm:text-xs font-medium truncate" style={{ color: "#3a2b1f" }}>
                        {lesson.titleKey ? t(lesson.titleKey) : lesson.title}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Back button */}
              <div className="flex justify-center">
                <button 
                  onClick={() => window.location.hash = `#/world/${viewState.subjectId}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors"
                  style={{ background: "rgba(44,24,16,0.8)", color: "#b8a48a" }}>
                  <ChevronLeft className="w-4 h-4" />
                  Back to {currentSubject.name}
                </button>
              </div>
            </motion.div>
              );
          })()}

          {/* ISLAND DETAIL VIEW */}
          {viewState.level === "island" && currentSubject && currentArchipelago && (() => {
            const course = currentArchipelago.courses[0];
            if (!course) return null;
            const lesson = course.lessons.find(l => l.id === viewState.islandId) || course.lessons[0];
            if (!lesson) return null;
            
            return (
              <motion.div
                key="island"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto">
                <div className="rounded-2xl p-8 text-center space-y-6"
                  style={{
                    background: "linear-gradient(145deg, #f5e6c8 0%, #e8d4aa 50%, #f1e3bf 100%)",
                    border: "3px solid #a08c6a",
                    boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
                  }}>
                  <div className="relative inline-block">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full flex items-center justify-center mx-auto"
                      style={{
                        background: "radial-gradient(circle at 40% 35%, #f4e2c7 0%, #d6b892 45%, #a57d57 100%)",
                        border: "3px solid rgba(123,81,45,0.9)",
                        boxShadow: "0 12px 40px rgba(90,56,33,0.35), inset 0 -6px 20px rgba(90,56,33,0.18)",
                      }}>
                      <span className="text-5xl sm:text-6xl">{lesson.emoji || "🏝️"}</span>
                      <div className="absolute top-2 left-4 w-14 h-6 rounded-full bg-white/20 blur-sm" />
                      <div className="absolute bottom-5 left-5 w-3 h-4 rounded-full" style={{ background: "#7b5b2e" }} />
                      <div className="absolute bottom-4 right-6 w-2.5 h-3.5 rounded-full" style={{ background: "#8d6d44" }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight" style={{ color: "#2c1810" }}>
                      {lesson.titleKey ? t(lesson.titleKey) : lesson.title}
                    </h2>
                    {lesson.descriptionKey && (
                      <p className="text-sm max-w-md mx-auto italic" style={{ color: "#6b4226" }}>
                        {t(lesson.descriptionKey)}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-center gap-4 text-xs" style={{ color: "#6b4226" }}>
                    <span>⏱ {course.lessons.reduce((s: number, l: any) => s + (l.duration ?? 10), 0)} min</span>
                    <span>•</span>
                    <span>⭐ {course.lessons.reduce((s: number, l: any) => s + (l.xpReward ?? 50), 0)} XP</span>
                  </div>

                  <button
                    onClick={() => {
                      if (lesson.id) goToLesson(lesson.id);
                      else if (lesson.id) goToLesson(lesson.id);
                    }}
                    disabled={lesson.available === false}
                    className={`inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-lg transition-all ${lesson.available !== false ? "hover:scale-105" : "opacity-50 cursor-not-allowed"}`}
                    style={{
                      background: lesson.available !== false ? "linear-gradient(135deg, #8b5e2d, #c09b6a)" : "#7c5e3a",
                      color: lesson.available !== false ? "#2b1607" : "#e4d3b5",
                      boxShadow: lesson.available !== false ? "0 10px 24px rgba(148,108,59,0.35)" : "none",
                      border: lesson.available !== false ? "1px solid rgba(80,51,27,0.35)" : "1px solid rgba(124,94,58,0.5)",
                    }}>
                    <PlayCircle className="w-6 h-6" />
                    {lesson.available !== false ? "Start Lesson" : "🔒 Locked"}
                  </button>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </main>

      <footer className="relative z-20 text-center py-3 text-xs" style={{ color: "rgba(184,164,138,0.4)" }}>
        Every great journey begins with a single step
      </footer>
    </div>
  );
}
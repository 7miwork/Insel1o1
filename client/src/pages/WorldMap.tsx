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
    x: 50,
    y: 55,
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
    x: 18,
    y: 25,
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
    x: 82,
    y: 30,
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
    x: 25,
    y: 80,
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
      <path d="M5,90 Q15,88 25,90 Q35,92 45,90 Q55,88 65,90 Q75,92 85,90 Q95,88 100,90" fill="none" stroke="#6b4226" strokeWidth="0.12" opacity="0.18" />
      <path d="M0,94 Q10,92 20,94 Q30,96 40,94 Q50,92 60,94 Q70,96 80,94 Q90,92 100,94" fill="none" stroke="#6b4226" strokeWidth="0.1" opacity="0.14" />
      <g transform="translate(8,75) scale(0.3)" opacity="0.3">
        <path d="M0,0 Q4,-3 8,0" fill="#6b4226" />
        <line x1="4" y1="0" x2="4" y2="-5" stroke="#6b4226" strokeWidth="0.3" />
      </g>
      <g transform="translate(85,80) scale(0.25) rotate(-10)" opacity="0.25">
        <path d="M0,0 Q3,-2 6,0" fill="#6b4226" />
        <line x1="3" y1="0" x2="3" y2="-4" stroke="#6b4226" strokeWidth="0.3" />
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
              className="relative rounded-2xl overflow-auto"
              style={{
                background: "linear-gradient(145deg, #f5e6c8 0%, #e8d4aa 30%, #f1e3bf 50%, #e6d3aa 80%, #d8c49a 100%)",
                border: "3px solid #a08c6a",
                boxShadow: "0 40px 120px rgba(0,0,0,0.6), 0 10px 30px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.15)",
                minHeight: "500px",
                maxHeight: "80vh",
              }}>
              <div id="world-map-container" className="relative w-full h-full" style={{ minHeight: "480px" }}>
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px" }} />
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 50% 55%, rgba(132,184,203,0.20) 0%, rgba(110,167,187,0.12) 40%, transparent 70%)" }} />
                <div className="absolute inset-0 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 60px rgba(90,56,33,0.25), inset 0 0 120px rgba(44,24,16,0.15)" }} />
                <SeaWaves />
                <CompassRose />

                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]">
                  <defs>
                    <pattern id="worldGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                      <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#2c1810" strokeWidth="0.8" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#worldGrid)" />
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
                              <div className="absolute bottom-4 left-3 w-2 h-3 rounded-full" style={{ background: "#7fa35d" }} />
                              <div className="absolute bottom-3 right-4 w-1.5 h-2.5 rounded-full" style={{ background: "#6b8e4e" }} />
                              <div className="absolute bottom-5 left-6 w-1.5 h-2 rounded-full" style={{ background: "#8fc75d" }} />
                            </>
                          )}
                        </div>
                        <div className="mt-2 text-center max-w-[140px]">
                          <p className={`font-bold text-sm sm:text-base truncate ${subject.available ? "text-[#2c1810]" : "text-[#7c5e3a]"}`}>
                            {subject.name}
                          </p>
                          <p className="text-[10px] sm:text-xs italic" style={{ color: subject.available ? "#6b4226" : "#7c5e3a" }}>
                            {subject.subtitle}
                          </p>
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
                  background: "linear-gradient(135deg, #d8c49a 0%, #e6d3aa 20%, #f1e3bf 50%, #e6d3aa 80%, #d8c49a 100%)",
                  border: "3px solid #a08c6a",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.7), 0 4px 12px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.15)",
                }}>
                <SeaWaves />
                <div className="absolute top-3 right-3 pointer-events-none">
                  <CompassRose />
                </div>
                
                {programmingArchipelago.courses.map((course, idx) => (
                  <motion.button
                    key={course.id}
                    onClick={(e) => goToArchipelago(course, e)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none"
                    style={{ left: `${25 + idx * 50}%`, top: `${50}%` }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}>
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center"
                      style={{
                        background: "radial-gradient(circle, #9a8a7a 0%, #7a6a5a 50%, #5a4a3a 100%)",
                        border: "2px solid #a08c6a",
                        boxShadow: "0 8px 24px rgba(90,56,33,0.3)",
                      }}>
                      <span className="text-2xl sm:text-3xl">{course.emoji}</span>
                      <div className="absolute -bottom-1 left-2 w-1.5 h-2 rounded-full" style={{ background: "#7fa35d" }} />
                      <div className="absolute -bottom-1 right-3 w-1 h-1.5 rounded-full" style={{ background: "#6b8e4e" }} />
                    </div>
                    <div className="mt-2 text-center max-w-[140px]">
                      <p className="font-bold text-sm truncate" style={{ color: "#2c1810" }}>
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
                <div className="absolute top-3 right-3 pointer-events-none">
                  <CompassRose />
                </div>
                
                {/* Lesson island buttons */}
                {course.lessons.map((lesson, idx) => (
                  <motion.button
                    key={lesson.id}
                    onClick={(e) => goToIsland(lesson.id, e)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none"
                    style={{ 
                      left: `${20 + (idx % 4) * 20}%`,
                      top: `${20 + Math.floor(idx / 4) * 25}%`
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}>
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
                      style={{
                        background: lesson.available !== false 
                          ? "radial-gradient(circle, #84b8cb 0%, #6ea7bb 50%, #5a8a9e 100%)"
                          : "radial-gradient(circle, #9a8a7a 0%, #7a6a5a 50%, #5a4a3a 100%)",
                        border: "2px solid #a08c6a",
                        boxShadow: "0 4px 16px rgba(90,56,33,0.3)",
                        opacity: lesson.available !== false ? 1 : 0.5,
                      }}>
                      <span className="text-xl sm:text-2xl">{lesson.emoji || "🏝️"}</span>
                      {!lesson.available && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Lock className="w-4 h-4" style={{ color: "#7c5e3a" }} />
                        </div>
                      )}
                    </div>
                    <div className="mt-1 text-center max-w-[100px]">
                      <p className="text-[10px] sm:text-xs font-medium truncate" style={{ color: "#2c1810" }}>
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
                        background: "radial-gradient(circle at 40% 35%, #e8d4aa 0%, #d8c49a 40%, #c8b48a 100%)",
                        border: "3px solid #a08c6a",
                        boxShadow: "0 12px 40px rgba(90,56,33,0.3), inset 0 -6px 20px rgba(90,56,33,0.15)",
                      }}>
                      <span className="text-5xl sm:text-6xl">{lesson.emoji || "🏝️"}</span>
                      <div className="absolute top-3 left-5 w-12 h-6 rounded-full bg-white/20 blur-md" />
                      <div className="absolute bottom-4 left-4 w-2.5 h-3.5 rounded-full" style={{ background: "#7fa35d" }} />
                      <div className="absolute bottom-3 right-5 w-2 h-3 rounded-full" style={{ background: "#6b8e4e" }} />
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
                      background: lesson.available !== false ? "linear-gradient(135deg, #0D9488, #0F766E)" : "#7c5e3a",
                      color: "#f1e3bf",
                      boxShadow: lesson.available !== false ? "0 8px 24px rgba(13,148,136,0.4)" : "none",
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
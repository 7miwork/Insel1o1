import { useState } from "react";
import { useLocation } from "wouter";
import { Compass, Map as MapIcon, Ship, ChevronRight, Lock, Anchor } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

/* ── Compass Rose ── */
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

/* ── Decorative Sea Elements ── */
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
    route: "/archipelago",
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

export default function WorldMap() {
  const [, setLocation] = useLocation();
  const { t } = useI18n();
  const [hoveredSubject, setHoveredSubject] = useState<string | null>(null);

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
            <MapIcon className="w-5 h-5" style={{ color: "#d8c49a" }} />
            <h1 className="text-lg font-bold tracking-tight" style={{ color: "#f1e3bf" }}>
              World of Learning
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs" style={{ color: "#b8a48a" }}>
            <Compass className="w-3 h-3" />
            <span>Choose your adventure</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-6">
        {/* ── World Map Parchment ── */}
        <div className="relative rounded-2xl overflow-auto"
          style={{
            background: "linear-gradient(145deg, #f5e6c8 0%, #e8d4aa 30%, #f1e3bf 50%, #e6d3aa 80%, #d8c49a 100%)",
            border: "3px solid #a08c6a",
            boxShadow: "0 40px 120px rgba(0,0,0,0.6), 0 10px 30px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.15)",
            minHeight: "500px",
            maxHeight: "80vh",
          }}>
          {/* Parchment noise */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px" }} />
          
          {/* Water tint */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 55%, rgba(132,184,203,0.20) 0%, rgba(110,167,187,0.12) 40%, transparent 70%)" }} />
          
          {/* Aged edges */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: "inset 0 0 60px rgba(90,56,33,0.25), inset 0 0 120px rgba(44,24,16,0.15)" }} />

          <SeaWaves />
          <CompassRose />

          {/* SVG grid layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]">
            <defs>
              <pattern id="worldGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#2c1810" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#worldGrid)" />
          </svg>

          {/* ── Subject Regions ── */}
          <div className="relative w-full h-full" style={{ minHeight: "480px" }}>
            {SUBJECTS.map((subject) => {
              const isHovered = hoveredSubject === subject.id;
              return (
                <div
                  key={subject.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                  style={{
                    left: `${subject.x}%`,
                    top: `${subject.y}%`,
                    zIndex: subject.available ? 10 : 1,
                  }}>
                  <button
                    onClick={() => subject.available && setLocation(subject.route)}
                    disabled={!subject.available}
                    onMouseEnter={() => setHoveredSubject(subject.id)}
                    onMouseLeave={() => setHoveredSubject(null)}
                    className={`relative flex flex-col items-center transition-transform ${subject.available ? "cursor-pointer group" : "cursor-default"} ${isHovered && subject.available ? "scale-110" : "scale-100"}`}>
                    
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

                    {/* Region island circle */}
                    <div className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center border-2 transition-all ${subject.available ? "hover:shadow-lg" : ""}`}
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
                      {/* Inner island highlight */}
                      {subject.available && (
                        <div className="absolute top-3 left-4 w-10 h-5 rounded-full bg-white/20 blur-sm" />
                      )}
                      {/* Emoji icon */}
                      <span className="text-4xl sm:text-5xl relative z-10">{subject.emoji}</span>
                      {/* Small trees/vegetation */}
                      {subject.available && (
                        <>
                          <div className="absolute bottom-4 left-3 w-2 h-3 rounded-full" style={{ background: "#7fa35d" }} />
                          <div className="absolute bottom-3 right-4 w-1.5 h-2.5 rounded-full" style={{ background: "#6b8e4e" }} />
                          <div className="absolute bottom-5 left-6 w-1.5 h-2 rounded-full" style={{ background: "#8fc75d" }} />
                        </>
                      )}
                    </div>

                    {/* Label */}
                    <div className="mt-2 text-center max-w-[140px]">
                      <p className={`font-bold text-sm sm:text-base truncate ${subject.available ? "text-[#2c1810]" : "text-[#7c5e3a]"}`}>
                        {subject.name}
                      </p>
                      <p className="text-[10px] sm:text-xs italic" style={{ color: subject.available ? "#6b4226" : "#7c5e3a" }}>
                        {subject.subtitle}
                      </p>
                      {subject.available && (
                        <div className="flex items-center justify-center gap-1 mt-1">
                          <span className="text-[10px] font-medium" style={{ color: "#0D9488" }}>
                            {subject.completedCourses}/{subject.totalCourses} courses
                          </span>
                          <ChevronRight className="w-3 h-3" style={{ color: "#0D9488" }} />
                        </div>
                      )}
                    </div>
                  </button>
                </div>
              );
            })}

            {/* ── Voyage path between regions ── */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Decorative dashed route lines between available regions */}
              <path d="M50,55 Q35,40 18,25" fill="none" stroke="#8b5e3c" strokeWidth="0.3" strokeDasharray="2,1.5" opacity="0.3" />
              <path d="M50,55 Q65,42 82,30" fill="none" stroke="#8b5e3c" strokeWidth="0.3" strokeDasharray="2,1.5" opacity="0.3" />
              <path d="M50,55 Q38,68 25,80" fill="none" stroke="#8b5e3c" strokeWidth="0.3" strokeDasharray="2,1.5" opacity="0.3" />
            </svg>
          </div>
        </div>

        {/* ── Legend ── */}
        <div className="mt-4 flex items-center justify-center gap-6 text-xs flex-wrap"
          style={{ color: "rgba(184,164,138,0.7)" }}>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: "#d8c49a", border: "1px solid #a08c6a" }} />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: "rgba(180,165,140,0.5)", border: "1px solid rgba(160,140,106,0.4)" }} />
            <span>Coming Soon</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>🚢</span>
            <span>Sea Route</span>
          </div>
        </div>

        {/* ── Mobile: Vertical Subject List ── */}
        <div className="mt-6 md:hidden space-y-3">
          <p className="text-xs uppercase tracking-wider text-center" style={{ color: "rgba(184,164,138,0.5)" }}>
            Explore Subjects
          </p>
          {SUBJECTS.map((subject) => (
            <button
              key={subject.id}
              onClick={() => subject.available && setLocation(subject.route)}
              disabled={!subject.available}
              className={`w-full flex items-center gap-3 rounded-xl border p-4 transition-all ${subject.available ? "cursor-pointer active:scale-[0.98]" : "cursor-default opacity-50"}`}
              style={{
                borderColor: subject.available ? "rgba(160,140,106,0.5)" : "rgba(160,140,106,0.2)",
                background: subject.available ? "rgba(245,230,200,0.9)" : "rgba(245,230,200,0.4)",
              }}>
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 text-2xl"
                style={{
                  borderColor: subject.available ? "#a08c6a" : "rgba(160,140,106,0.3)",
                  background: subject.available ? "radial-gradient(circle at 40% 35%, #e8d4aa, #d8c49a)" : "rgba(200,185,160,0.3)",
                }}>
                <span className="relative">{subject.emoji}</span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold" style={{ color: subject.available ? "#2c1810" : "#7c5e3a" }}>
                  {subject.name}
                </p>
                <p className="text-xs italic" style={{ color: subject.available ? "#6b4226" : "#7c5e3a" }}>
                  {subject.subtitle}
                </p>
              </div>
              {!subject.available && <Lock className="w-4 h-4" style={{ color: "#7c5e3a" }} />}
              {subject.available && <ChevronRight className="w-4 h-4" style={{ color: "#0D9488" }} />}
            </button>
          ))}
        </div>
      </main>

      <footer className="relative z-20 text-center py-3 text-xs" style={{ color: "rgba(184,164,138,0.4)" }}>
        Every great journey begins with a single step
      </footer>
    </div>
  );
}
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/professional/DashboardLayout';
import { usei18n } from '@/contexts/i18nContext';
import { codingSubject, futureSubjects } from '@/data/hierarchy';
import type { FutureSubject } from '@/data/hierarchy';

/**
 * Student Dashboard
 *
 * The dashboard embeds the World Map as its main content area.
 * This gives students immediate access to the adventure:
 *
 *   Dashboard → World Map → Subject → Course → Lessons
 *
 * The WorldMap component is reused here directly so both
 * the public showcase and the student dashboard share the same component.
 */
export default function DashboardPage() {
  const { t } = usei18n();
  const navigate = useNavigate();

  return (
    <DashboardLayout title={t('gamification.title')}>
      <div className="space-y-8">
        {/* ── Greeting / Summary ── */}
        <div className="overflow-hidden rounded-3xl border border-[#b8ddd5]/60 bg-gradient-to-br from-[#fafdfc] to-[#ecf9f6] px-6 py-6 shadow-[0_2px_20px_rgba(13,148,136,0.05)] md:px-8 md:py-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#1a4a48] md:text-3xl">{t('gamification.title')}</h2>
              <p className="mt-1 text-sm text-[#5a8a87]">Welcome back, Explorer · Your adventure continues</p>
            </div>
            <button
              onClick={() => navigate('/world')}
              className="flex items-center gap-2 rounded-xl bg-[#0d9488] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#115e59] hover:shadow-md"
            >
              🗺️ {t('gamification.continueAdventure')}
            </button>
          </div>

          {/* Quick stats */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#b8ddd5]/60 bg-white/80 px-4 py-3 shadow-sm">
              <span className="text-xs font-medium text-[#5a8a87]">Current Island</span>
              <p className="mt-0.5 text-sm font-semibold text-[#22383a]">Getting Started</p>
            </div>
            <div className="rounded-2xl border border-[#b8ddd5]/60 bg-white/80 px-4 py-3 shadow-sm">
              <span className="text-xs font-medium text-[#5a8a87]">Next Destination</span>
              <p className="mt-0.5 text-sm font-semibold text-[#22383a]">Variables & Logic</p>
            </div>
            <div className="rounded-2xl border border-[#b8ddd5]/60 bg-white/80 px-4 py-3 shadow-sm">
              <span className="text-xs font-medium text-[#5a8a87]">Overall Progress</span>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#e8f0ef]">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-[#5eead4] to-[#14b8a6] transition-all duration-500"
                  style={{
                    width: `${Math.round(
                      codingSubject.courses.reduce((s, c) => s + c.progress, 0) /
                        codingSubject.courses.length
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── World Map (Reused Component) ── */}
        <div className="overflow-hidden rounded-3xl border border-[#b8ddd5]/50 bg-gradient-to-b from-[#d4ece8] via-[#bce0d9] to-[#8fc5bc] shadow-[0_2px_30px_rgba(13,148,136,0.08)]">
          {/* Ocean wave pattern */}
          <div className="pointer-events-none absolute inset-0 opacity-25">
            <svg className="h-full w-full" aria-hidden="true">
              <defs>
                <pattern id="dash-ocean" x="0" y="0" width="140" height="28" patternUnits="userSpaceOnUse">
                  <path d="M0,14 Q35,0 70,14 Q105,28 140,14" stroke="#5eead4" strokeWidth="1.5" fill="none" opacity="0.6" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dash-ocean)" />
            </svg>
          </div>

          {/* Decorative elements */}
          <img
            src="/assets/images/islands/backgrounds/clouds.svg"
            alt=""
            className="decor-drift pointer-events-none absolute left-6 top-4 h-10 w-44 opacity-25"
          />
          <img
            src="/assets/images/islands/backgrounds/compass.svg"
            alt=""
            className="decor-float pointer-events-none absolute right-6 top-6 h-16 w-16 opacity-25 md:h-20 md:w-20"
          />

          {/* Map content */}
          <div className="relative z-10 px-6 pb-10 pt-8 md:px-10 md:pt-10">
            {/* Map header */}
            <div className="mb-8 text-center">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-[#4a8a87]">
                Your Learning Journey
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-[#0d3d3b] md:text-4xl">
                World of Islands
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-sm text-[#3d7a78]">
                Chart your course through islands of knowledge
              </p>
              <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[#5eead4] via-[#8fc5bc] to-[#e8d3a2]" />
            </div>

            {/* === CODING — Active Region === */}
            <div className="mb-8">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#2d7a6b]">Available Now</span>
              </div>

              <button
                onClick={() => navigate(`/archipelago?subject=${codingSubject.slug}`)}
                className="group relative w-full overflow-hidden rounded-2xl border-2 border-[#5eead4]/60 bg-gradient-to-br from-[#ecfdf7] via-[#f0fdfb] to-[#d6f5ef] text-left shadow-[0_4px_24px_rgba(13,148,136,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(13,148,136,0.18)] focus:outline-none focus:ring-2 focus:ring-teal-400/50"
              >
                {/* Island backdrop SVG */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <svg className="h-full w-full" viewBox="0 0 800 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <path
                      d="M80,250 C40,210 50,160 90,135 C130,110 180,95 240,100 C300,105 350,95 410,100 C470,105 530,95 580,110 C630,125 680,125 720,145 C760,165 770,205 740,235 C710,265 660,270 600,275 C540,280 470,270 400,265 C330,260 260,270 200,265 C140,260 100,255 80,250Z"
                      fill={codingSubject.colorPalette.sand}
                      fillOpacity={0.15}
                    />
                    <path
                      d="M120,225 C95,195 110,155 145,138 C180,121 220,115 270,118 C320,121 370,112 420,118 C470,124 520,115 560,130 C600,145 640,145 670,160 C700,175 705,205 685,220 C665,235 625,240 580,242 C535,244 480,238 420,236 C360,234 300,238 250,236 C200,234 140,230 120,225Z"
                      fill={codingSubject.colorPalette.accent}
                      fillOpacity={0.12}
                    />
                    <ellipse cx="400" cy="258" rx="350" ry="14" fill={codingSubject.colorPalette.water} fillOpacity={0.12} />
                  </svg>
                </div>

                <div className="relative z-10 flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between md:p-7">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-[#b8ddd5]/60 bg-white/80 text-3xl shadow-sm md:h-16 md:w-16 md:text-4xl">
                      {codingSubject.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#0d3d3b] md:text-2xl">{codingSubject.title}</h3>
                      <p className="mt-1 text-sm text-[#4a7a78]">{codingSubject.description}</p>
                      <p className="mt-1.5 text-xs font-medium text-emerald-600">
                        {codingSubject.courses.length} courses · Begin your programming adventure
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 self-end md:self-center">
                    <span className="rounded-full border border-[#5eead4]/50 bg-[#d6f5ef] px-3 py-1 text-xs font-semibold text-teal-700">
                      Explore →
                    </span>
                  </div>
                </div>

                {/* Progress strip */}
                <div className="relative z-10 h-1.5 w-full bg-[#e8f0ef]/70">
                  <div
                    className="h-1.5 rounded-r-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-500"
                    style={{
                      width: `${Math.round(
                        codingSubject.courses.reduce((s, c) => s + c.progress, 0) /
                          codingSubject.courses.length
                      )}%`,
                    }}
                  />
                </div>
              </button>
            </div>

            {/* === FUTURE REGIONS — Coming Soon in fog === */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-slate-300" />
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6a8a88]">Discovering New Worlds</span>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-[#c5d8d5]/60 bg-gradient-to-b from-[#e2efed]/80 via-[#dae8e5]/70 to-[#ccdfdb]/80 backdrop-blur-[2px]">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/20" />
                <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
                  <svg className="h-full w-full" aria-hidden="true">
                    <defs>
                      <pattern id="fog-waves-dash" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
                        <path d="M0,10 Q25,2 50,10 Q75,18 100,10" stroke="#94a3b8" strokeWidth="1.2" fill="none" opacity="0.6" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#fog-waves-dash)" />
                  </svg>
                </div>
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute left-[10%] top-[15%] h-24 w-48 rounded-full bg-white/40 blur-3xl" />
                  <div className="absolute right-[20%] bottom-[10%] h-32 w-40 rounded-full bg-white/30 blur-3xl" />
                </div>

                <div className="relative z-10 grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 md:p-5">
                  {futureSubjects.map((subject) => (
                    <div
                      key={subject.id}
                      className="relative flex items-center gap-3 rounded-xl border border-[#c5d8d5]/50 bg-white/50 px-4 py-3.5 opacity-60 select-none backdrop-blur-sm"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#c5d8d5]/40 bg-white/60 text-lg opacity-60">
                        {subject.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-[#5a7a78]">{subject.title}</h3>
                        <p className="text-xs text-[#7a9a98] truncate">{subject.description}</p>
                      </div>
                      <span className="flex-shrink-0 rounded-full border border-[#c5d8d5]/40 bg-white/60 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#7a9a98]">
                        Coming Soon
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
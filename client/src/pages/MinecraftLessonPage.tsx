import React, { useState, useMemo } from "react";
import { useLocation, useRoute } from "wouter";
import {
  ChevronLeft,
  Clock,
  Star,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Code2,
  Lightbulb,
  Hammer,
  Trophy,
  ArrowRight,
  RotateCcw,
  Ship,
  Map,
  Compass,
  Anchor,
} from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import {
  MINECRAFT_LESSONS,
  type Lesson,
  type QuizQuestion,
} from "@/data/minecraft-island";
import { VideoContainer } from "@/components/VideoContainer";
import { QuizSection } from "@/components/QuizSection";
import { RewardSection } from "@/components/RewardSection";
import { RewardAnimation } from "@/components/RewardAnimation";
import { calculateQuizReward, calculateLessonReward } from "@/lib/reward-system";

/**
 * Phase accent colors — warm, expedition-friendly tones
 */
const phaseAccents: Record<Lesson["phase"], { from: string; to: string; ring: string }> = {
  "getting-started": { from: "#0d9488", to: "#115e59", ring: "#14b8a6" },
  "loops":          { from: "#0f766e", to: "#065f46", ring: "#10b981" },
  "conditionals":   { from: "#d97706", to: "#92400e", ring: "#f59e0b" },
  "creative":       { from: "#0e7490", to: "#164e63", ring: "#06b6d4" },
  "final-project":  { from: "#ca8a04", to: "#78350f", ring: "#eab308" },
};

const difficultyKeyMap: Record<Lesson["difficulty"], string> = {
  beginner: "lesson.beginner",
  intermediate: "lesson.intermediate",
  advanced: "lesson.advanced",
};

const phaseLabelMap: Record<Lesson["phase"], string> = {
  "getting-started": "lesson.gettingStarted",
  "loops": "lesson.loops",
  "conditionals": "lesson.conditionals",
  "creative": "lesson.creative",
  "final-project": "lesson.finalProject",
};

export const MinecraftLessonPage: React.FC = () => {
  const [, params] = useRoute('/lesson/:id');
  const lessonId = parseInt(params?.id || '1', 10);
  const [, setLocation] = useLocation();
  const { t } = useI18n();

  const lesson = MINECRAFT_LESSONS.find((l) => l.id === lessonId) as Lesson | undefined;
  const [showRewardAnimation, setShowRewardAnimation] = useState(false);
  const [reward, setReward] = useState({ xp: 0, coins: 0 });
  const [completed, setCompleted] = useState(false);

  const totalLessons = MINECRAFT_LESSONS.length;
  const lessonIndex = lesson ? MINECRAFT_LESSONS.findIndex(l => l.id === lesson.id) : -1;

  const accent = useMemo(
    () => (lesson ? phaseAccents[lesson.phase] : phaseAccents["getting-started"]),
    [lesson]
  );

  // Lesson not found
  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-teal-50 flex items-center justify-center px-4">
        <div className="max-w-md text-center rounded-2xl bg-white border-2 border-amber-200 p-8 shadow-lg">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 mx-auto flex items-center justify-center mb-4">
            <Compass className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            {t("lesson.lessonNotFound")}
          </h1>
          <p className="text-slate-600 mt-2">
            {t("lesson.lessonNotFoundDesc")}
          </p>
          <button
            type="button"
            onClick={() => setLocation('/archipelago')}
            className="btn btn-primary btn-md mt-5"
          >
            <ChevronLeft className="w-4 h-4" />
            {t("lesson.backToArchipelago")}
          </button>
        </div>
      </div>
    );
  }

  const handleQuizComplete = (result: {
    correctCount: number;
    total: number;
    score: number;
  }) => {
    const difficulty =
      lesson.difficulty === 'beginner'
        ? 'easy'
        : lesson.difficulty === 'intermediate'
        ? 'medium'
        : 'hard';

    const quizReward = calculateQuizReward(result.score, difficulty);
    const lessonReward = calculateLessonReward(lesson.difficulty, 1800);
    const totalXP = quizReward.baseXP + quizReward.bonusXP + lessonReward.xp;
    const totalCoins = quizReward.coinReward + lessonReward.coins;

    setReward({ xp: totalXP, coins: totalCoins });
    setShowRewardAnimation(true);
    setCompleted(true);
  };

  const heroStyle = {
    background: `linear-gradient(135deg, ${accent.from} 0%, ${accent.to} 100%)`,
  };

  // Build journey dots (show up to 5 surrounding lessons)
  const journeyStart = Math.max(0, lessonIndex - 2);
  const journeyEnd = Math.min(totalLessons - 1, lessonIndex + 2);
  const journeyItems = [];
  for (let i = journeyStart; i <= journeyEnd; i++) {
    const targetId = MINECRAFT_LESSONS[i].id;
    let dotStatus: 'past' | 'current' | 'future' = 'future';
    if (i < lessonIndex) dotStatus = 'past';
    else if (i === lessonIndex) dotStatus = 'current';
    else dotStatus = 'future';
    journeyItems.push({ id: targetId, status: dotStatus });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 via-white to-teal-50/30">
      {showRewardAnimation && (
        <RewardAnimation
          xp={reward.xp}
          coins={reward.coins}
          onComplete={() => setShowRewardAnimation(false)}
        />
      )}

      {/* ========================================================
          1. HERO BANNER — Expedition Ship Deck
          ======================================================== */}
      <header
        className="relative overflow-hidden text-white"
        style={heroStyle}
      >
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.1) 0%, transparent 40%)",
          }}
          aria-hidden
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <button
            type="button"
            onClick={() => setLocation('/archipelago')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 hover:text-white mb-6 transition-colors"
            aria-label={t("lesson.backToArchipelago")}
          >
            <ChevronLeft className="w-4 h-4" />
            {t("lesson.backToArchipelago")}
          </button>

          {/* Island name + chapter */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-wider">
              <Ship className="w-3.5 h-3.5" />
              {t("common.lesson")} {lesson.id}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-semibold">
              <GraduationCap className="w-3.5 h-3.5" />
              {t(difficultyKeyMap[lesson.difficulty])}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-semibold">
              <Clock className="w-3.5 h-3.5" />
              {lesson.duration} {t("lesson.minutesShort")}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-semibold">
              <Star className="w-3.5 h-3.5" fill="currentColor" />
              +{lesson.xpReward} XP
            </span>
          </div>

          {/* Lesson title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight max-w-3xl">
            {lesson.title}
          </h1>

          {/* Lesson progress — where we are in the journey */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="text-sm text-white/80 font-medium flex items-center gap-1.5">
              <Map className="w-4 h-4" />
              {t("lesson.lesson")} {lessonIndex + 1} {t("lesson.of")} {totalLessons}
            </span>
            <div className="journey-route">
              {journeyItems.map((item, idx) => (
                <React.Fragment key={item.id}>
                  {idx > 0 && (
                    <span
                      className={`journey-line ${
                        item.status === 'current' || item.status === 'past' ? 'completed' : ''
                      }`}
                    />
                  )}
                  <span
                    className={`journey-dot ${
                      item.status === 'past' ? 'active' : item.status === 'current' ? 'current' : ''
                    }`}
                  />
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-white/90 mt-4 max-w-3xl">
            {lesson.description}
          </p>
        </div>
      </header>

      {/* ========================================================
          MAIN — sections
          ======================================================== */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* 2. OVERVIEW — Expedition Briefing */}
        <section
          className="lesson-section animate-fadeInUp"
          aria-label={t("lesson.overview")}
        >
          <div className="lesson-section-title">
            <span className="icon-bubble" aria-hidden>
              <BookOpen className="w-5 h-5" />
            </span>
            <h2>{t("lesson.overview")}</h2>
          </div>
          <p className="text-slate-600 leading-relaxed">{lesson.description}</p>
        </section>

        {/* 3. LEARNING OBJECTIVES — Mission Checklist */}
        {lesson.objectives?.length > 0 && (
          <section
            className="lesson-section animate-fadeInUp"
            aria-label={t("lesson.learningObjectives")}
          >
            <div className="lesson-section-title">
              <span
                className="icon-bubble"
                style={{
                  background: "linear-gradient(135deg,#d1fae5,#6ee7b7)",
                  color: "#065f46",
                }}
                aria-hidden
              >
                <CheckCircle2 className="w-5 h-5" />
              </span>
              <h2>{t("lesson.learningObjectives")}</h2>
            </div>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {lesson.objectives.map((obj, idx) => (
                <li key={idx} className="objective-item">
                  <CheckCircle2
                    className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600"
                    aria-hidden
                  />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 4. VIDEO — Captain's Briefing / Scout Report */}
        <VideoContainer
          enabled={Boolean(lesson.video?.enabled)}
          label={t("lesson.videoContainer")}
        />

        {/* 5. LESSON CONTENT — Captain's Log */}
        <section
          className="lesson-section animate-fadeInUp"
          aria-label={t("lesson.content")}
        >
          <div className="lesson-section-title">
            <span
              className="icon-bubble"
              style={{
                background: "linear-gradient(135deg,#fde68a,#fbbf24)",
                color: "#92400e",
              }}
              aria-hidden
            >
              <Sparkles className="w-5 h-5" />
            </span>
            <h2>{t("lesson.content")}</h2>
          </div>
          <div className="captains-log whitespace-pre-wrap text-slate-700 leading-relaxed">
            {lesson.content}
          </div>

          {lesson.codeBlocks && lesson.codeBlocks.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-slate-900">
                <Code2 className="w-5 h-5 text-emerald-600" />
                {t("lesson.codeBlocks")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {lesson.codeBlocks.map((block, idx) => (
                  <div
                    key={idx}
                    className="card p-4 hover:border-amber-300 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl shrink-0" aria-hidden>
                        {block.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900">{block.name}</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          {block.description}
                        </p>
                        <code className="block mt-3 bg-slate-900 text-emerald-300 rounded-lg px-3 py-2 text-sm font-mono overflow-x-auto">
                          {block.example}
                        </code>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {lesson.studentActivity && (
            <div className="mt-8">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-3 text-slate-900">
                <Hammer className="w-5 h-5 text-amber-600" />
                {t("lesson.studentActivity")}
              </h3>
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900 whitespace-pre-wrap">
                {lesson.studentActivity}
              </div>
            </div>
          )}

          {lesson.teacherTip && (
            <div className="mt-6">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-3 text-slate-900">
                <Lightbulb className="w-5 h-5 text-violet-600" />
                {t("lesson.teacherTip")}
              </h3>
              <div className="rounded-xl border-l-4 border-amber-400 bg-amber-50 p-4 text-slate-700">
                {lesson.teacherTip}
              </div>
            </div>
          )}
        </section>

        {/* 6. MISSION */}
        {lesson.objectives?.length > 0 && (
          <section
            className="lesson-section animate-fadeInUp"
            aria-label={t("lesson.mission")}
          >
            <div className="lesson-section-title">
              <span
                className="icon-bubble"
                style={{
                  background: "linear-gradient(135deg,#a5f3fc,#22d3ee)",
                  color: "#155e75",
                }}
                aria-hidden
              >
                <Trophy className="w-5 h-5" />
              </span>
              <h2>{t("lesson.mission")}</h2>
            </div>
            <div className="rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50 to-amber-50 p-5 sm:p-6">
              <p className="text-base sm:text-lg text-teal-900 font-medium">
                {lesson.objectives[0]}
              </p>
              {lesson.objectives.length > 1 && (
                <ul className="mt-3 grid sm:grid-cols-2 gap-2">
                  {lesson.objectives.slice(1).map((o, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-amber-800 flex items-start gap-2"
                    >
                      <ArrowRight
                        className="w-4 h-4 mt-0.5 shrink-0 text-amber-500"
                        aria-hidden
                      />
                      {o}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}

        {/* 7. QUIZ — Treasure Challenge */}
        {lesson.quiz && lesson.quiz.length > 0 && (
          <QuizSection
            questions={lesson.quiz}
            xpPreview={lesson.xpReward}
            onComplete={handleQuizComplete}
            onRetry={() => setCompleted(false)}
          />
        )}

        {/* 8. REWARD — Island Cleared */}
        {completed && (
          <RewardSection
            xp={reward.xp}
            coins={reward.coins}
            title={t("lesson.lessonComplete")}
            description={t("lesson.lessonCompleteDesc")}
            unlocks={lesson.unlocks}
            onBackToMap={() => setLocation("/archipelago")}
            onContinue={() =>
              lesson.unlocks?.[0] && setLocation(`/lesson/${lesson.unlocks[0]}`)
            }
          />
        )}
      </main>

      {/* 9. FOOTER NAVIGATION */}
      <footer className="border-t border-amber-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setLocation("/archipelago")}
            className="btn btn-outline btn-md"
          >
            <ChevronLeft className="w-4 h-4" />
            {t("lesson.backToMap")}
          </button>

          {!completed && lesson.quiz && lesson.quiz.length > 0 && (
            <span className="text-sm text-slate-500 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-500" />
              +{lesson.xpReward} {t("common.xp")} {t("lesson.xpPreview").toLowerCase()}
            </span>
          )}

          {completed && (
            <button
              type="button"
              onClick={() => {
                setCompleted(false);
              }}
              className="btn btn-ghost btn-md"
            >
              <RotateCcw className="w-4 h-4" />
              {t("common.retry")}
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default MinecraftLessonPage;
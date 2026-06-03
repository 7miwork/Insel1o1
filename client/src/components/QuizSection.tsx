import React, { useState } from "react";
import { CheckCircle2, XCircle, ArrowRight, Sparkles, Lightbulb, Trophy, Star, RotateCcw } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import type { QuizQuestion } from "@/data/minecraft-island";

export type AnswerRecord = {
  questionIndex: number;
  selectedOption: number;
  isCorrect: boolean;
};

interface QuizSectionProps {
  questions: QuizQuestion[];
  /** XP reward shown to the user before starting the challenge. */
  xpPreview?: number;
  /** Called when the user finishes the quiz with the full answer log. */
  onComplete?: (result: {
    answers: AnswerRecord[];
    correctCount: number;
    total: number;
    score: number; // 0-100
  }) => void;
  /** Called when the user wants to retry. */
  onRetry?: () => void;
  /** Show the result screen directly (after parent-side completion). */
  externalResult?: {
    correctCount: number;
    total: number;
    score: number;
  } | null;
}

const letterFor = (i: number) => String.fromCharCode(65 + i);

export const QuizSection: React.FC<QuizSectionProps> = ({
  questions,
  xpPreview = 0,
  onComplete,
  onRetry,
  externalResult,
}) => {
  const { t } = useI18n();
  const [phase, setPhase] = useState<"intro" | "running" | "review" | "result">(
    "intro"
  );
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [reviewing, setReviewing] = useState(false);

  const total = questions.length;
  const current = questions[questionIndex];
  const lastRecord = answers[answers.length - 1];

  const start = () => {
    setPhase("running");
    setQuestionIndex(0);
    setAnswers([]);
    setSelected(null);
    setReviewing(false);
  };

  const pick = (idx: number) => {
    if (reviewing) return;
    setSelected(idx);
  };

  const confirm = () => {
    if (selected === null || !current) return;
    const isCorrect = selected === current.correctAnswer;
    const newAnswers: AnswerRecord[] = [
      ...answers,
      { questionIndex, selectedOption: selected, isCorrect },
    ];
    setAnswers(newAnswers);
    setReviewing(true);
  };

  const next = () => {
    if (questionIndex < total - 1) {
      setQuestionIndex((i) => i + 1);
      setSelected(null);
      setReviewing(false);
    } else {
      const correctCount = answers.filter((x) => x.isCorrect).length;
      const score = Math.round((correctCount / total) * 100);
      setPhase("result");
      onComplete?.({ answers, correctCount, total, score });
    }
  };

  // Helper used in the result phase to derive a score from collected answers.
  // (not used in production flow anymore — kept for backwards compatibility)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _countCorrect = (a: AnswerRecord[]) => a.filter((x) => x.isCorrect).length;

  if (phase === "intro") {
    return (
      <section
        className="lesson-section animate-fadeInUp"
        aria-label={t("lesson.startQuiz")}
      >
        <div className="lesson-section-title">
          <span
            className="icon-bubble"
            style={{
              background: "linear-gradient(135deg,#fde68a,#fcd34d)",
              color: "#92400e",
            }}
            aria-hidden
          >
            <Trophy className="w-5 h-5" />
          </span>
          <h2>{t("common.knowledgeChallenge")}</h2>
        </div>

        <div className="space-y-5">
          <p className="text-base text-[hsl(var(--muted-foreground))]">
            {t("lesson.startQuizDesc")}
          </p>

          {xpPreview > 0 && (
            <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100">
                <Star className="w-5 h-5 text-amber-500" fill="currentColor" />
              </span>
              <div>
                <p className="text-sm font-semibold">{t("lesson.xpPreview")}</p>
                <p className="text-2xl font-extrabold leading-none mt-0.5">
                  +{xpPreview} XP
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={start}
              className="btn btn-accent btn-lg"
            >
              <Sparkles className="w-4 h-4" />
              {t("lesson.startQuiz")}
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-sm text-[hsl(var(--muted-foreground))]">
              {total} {t("common.lesson").toLowerCase()}
            </span>
          </div>
        </div>
      </section>
    );
  }

  if (phase === "result") {
    const result =
      externalResult ?? {
        correctCount: answers.filter((x) => x.isCorrect).length,
        total,
        score: Math.round(
          (answers.filter((x) => x.isCorrect).length / total) * 100
        ),
      };
    return (
      <section
        className="lesson-section animate-fadeInUp"
        aria-label={t("lesson.quizComplete")}
      >
        <div className="lesson-section-title">
          <span
            className="icon-bubble"
            style={{
              background: "linear-gradient(135deg,#bbf7d0,#4ade80)",
              color: "#14532d",
            }}
            aria-hidden
          >
            <Trophy className="w-5 h-5" />
          </span>
          <h2>{t("lesson.quizComplete")}</h2>
        </div>

        <div className="space-y-5 text-center">
          <p className="text-base text-[hsl(var(--muted-foreground))]">
            {t("lesson.quizCompleteDesc")}
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-5">
              <p className="text-xs uppercase tracking-wider text-cyan-700 font-semibold">
                {t("lesson.yourScore")}
              </p>
              <p className="mt-2 text-4xl font-extrabold text-cyan-700">
                {result.score}%
              </p>
              <p className="mt-1 text-sm text-cyan-700/80">
                {result.correctCount} / {result.total}
              </p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
              <p className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">
                {t("lesson.rewardEarned")}
              </p>
              <p className="mt-2 text-4xl font-extrabold text-emerald-700">
                +{xpPreview}
              </p>
              <p className="mt-1 text-sm text-emerald-700/80">XP</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-1">
            {onRetry && (
              <button
                type="button"
                onClick={() => {
                  onRetry();
                  start();
                }}
                className="btn btn-outline btn-md"
              >
                <RotateCcw className="w-4 h-4" />
                {t("common.retry")}
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }

  // running + review
  if (!current) return null;
  const progressPct = ((questionIndex + (reviewing ? 1 : 0)) / total) * 100;

  return (
    <section
      className="lesson-section animate-fadeInUp"
      aria-label={t("common.knowledgeChallenge")}
    >
      {/* Progress */}
      <div className="mb-5">
        <div className="flex items-center justify-between text-sm font-medium text-[hsl(var(--muted-foreground))] mb-2">
          <span>
            {t("lesson.quizProgress")}
          </span>
          <span>
            {questionIndex + (reviewing ? 1 : 0)} {t("lesson.of")} {total}
          </span>
        </div>
        <div className="progress-track progress-track-lg" aria-hidden>
          <div
            className="progress-fill"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <h3 className="text-xl font-bold mb-1 text-[hsl(var(--foreground))]">
        {t("lesson.question")} {questionIndex + 1}
      </h3>
      <p className="text-base text-[hsl(var(--foreground))] mb-5">
        {current.question}
      </p>

      <div className="space-y-2.5 mb-4" role="radiogroup" aria-label={current.question}>
        {current.options.map((opt, idx) => {
          let cls = "quiz-option";
          if (reviewing) {
            if (idx === current.correctAnswer) cls += " is-correct";
            else if (idx === lastRecord?.selectedOption) cls += " is-incorrect";
          } else if (selected === idx) {
            cls += " is-selected";
          }
          return (
            <button
              key={idx}
              type="button"
              className={cls}
              onClick={() => pick(idx)}
              disabled={reviewing}
              role="radio"
              aria-checked={selected === idx}
            >
              <span className="letter">{letterFor(idx)}</span>
              <span className="flex-1">{opt}</span>
              {reviewing && idx === current.correctAnswer && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              )}
              {reviewing &&
                idx === lastRecord?.selectedOption &&
                idx !== current.correctAnswer && (
                  <XCircle className="w-5 h-5 text-rose-600" />
                )}
            </button>
          );
        })}
      </div>

      {/* Feedback / Explanation */}
      {reviewing && (
        <div
          className={`mb-4 rounded-xl border p-4 ${
            lastRecord?.isCorrect
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-rose-200 bg-rose-50 text-rose-800"
          }`}
        >
          <div className="flex items-center gap-2 font-bold mb-1">
            {lastRecord?.isCorrect ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                {t("lesson.correct")}
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5" />
                {t("lesson.incorrect")}
              </>
            )}
          </div>
          {current.explanation && (
            <div className="flex items-start gap-2 text-sm">
              <Lightbulb className="w-4 h-4 mt-0.5 shrink-0" />
              <span>
                <span className="font-semibold">{t("lesson.explanation")}: </span>
                {current.explanation}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm text-[hsl(var(--muted-foreground))]">
          {t("lesson.selectAnswer")}
        </span>
        {!reviewing ? (
          <button
            type="button"
            onClick={confirm}
            className="btn btn-primary btn-md"
            disabled={selected === null}
          >
            {t("common.submit")}
          </button>
        ) : (
          <button
            type="button"
            onClick={next}
            className="btn btn-primary btn-md"
          >
            {questionIndex < total - 1
              ? t("lesson.nextQuestion")
              : t("lesson.finishQuiz")}
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </section>
  );
};

export default QuizSection;

import React, { useEffect, useState } from "react";
import { Star, Trophy, Award, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

interface RewardSectionProps {
  /** XP earned in this lesson. */
  xp: number;
  /** Coins earned in this lesson. */
  coins?: number;
  /** Title for the badge earned. */
  badgeName?: string;
  /** Description for the badge earned. */
  badgeDescription?: string;
  /** ID(s) of lessons that are unlocked as a result. */
  unlocks?: number[];
  /** Optional title above the reward card. */
  title?: string;
  /** Optional description above the reward card. */
  description?: string;
  /** CTA to continue the journey (e.g. "Next Lesson"). */
  onContinue?: () => void;
  /** CTA to go back to the archipelago map. */
  onBackToMap?: () => void;
}

const confettiColors = [
  "#06b6d4",
  "#22d3ee",
  "#facc15",
  "#fb923c",
  "#4ade80",
  "#a78bfa",
];

const Confetti: React.FC = () => {
  const [pieces, setPieces] = useState<
    Array<{ id: number; left: number; color: string; delay: number; rotate: number }>
  >([]);

  useEffect(() => {
    const newPieces = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: 5 + Math.random() * 90,
      color: confettiColors[i % confettiColors.length],
      delay: Math.random() * 0.4,
      rotate: Math.random() * 360,
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti"
          style={{
            left: `${p.left}%`,
            top: "40%",
            background: p.color,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export const RewardSection: React.FC<RewardSectionProps> = ({
  xp,
  coins = 0,
  badgeName,
  badgeDescription,
  unlocks = [],
  title,
  description,
  onContinue,
  onBackToMap,
}) => {
  const { t } = useI18n();

  return (
    <section
      className="lesson-section animate-fadeInUp"
      aria-label={t("lesson.rewardEarned")}
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
        <h2>{t("lesson.rewardEarned")}</h2>
      </div>

      <div className="reward-card relative">
        <Confetti />
        <div className="relative z-10 space-y-5">
          <div className="flex justify-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/70 shadow-inner">
              <Sparkles className="w-7 h-7 text-amber-700" />
            </span>
          </div>
          <h3 className="text-2xl font-extrabold">
            {title || t("lesson.lessonComplete")}
          </h3>
          {description && (
            <p className="text-sm text-amber-900/80 max-w-md mx-auto">
              {description}
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-2">
            <div className="rounded-xl bg-white/60 backdrop-blur p-4 border border-amber-200/60">
              <p className="text-xs uppercase tracking-wider text-amber-800 font-semibold flex items-center justify-center gap-1">
                <Star className="w-3.5 h-3.5" fill="currentColor" />
                {t("common.xp")}
              </p>
              <p className="reward-amount mt-1 text-amber-900">+{xp}</p>
            </div>
            {coins > 0 && (
              <div className="rounded-xl bg-white/60 backdrop-blur p-4 border border-amber-200/60">
                <p className="text-xs uppercase tracking-wider text-amber-800 font-semibold flex items-center justify-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  {t("common.coins")}
                </p>
                <p className="reward-amount mt-1 text-amber-900">+{coins}</p>
              </div>
            )}
          </div>

          {badgeName && (
            <div className="mt-4 inline-flex items-center gap-3 rounded-full bg-white/70 backdrop-blur px-4 py-2 border border-amber-200/60">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white">
                <Trophy className="w-4 h-4" />
              </span>
              <div className="text-left">
                <p className="text-sm font-bold text-amber-900">{badgeName}</p>
                {badgeDescription && (
                  <p className="text-xs text-amber-800/80">{badgeDescription}</p>
                )}
              </div>
            </div>
          )}

          {unlocks.length > 0 && (
            <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
              <p className="text-sm font-bold flex items-center gap-2 justify-center">
                <CheckCircle2 className="w-4 h-4" />
                {t("lesson.unlockedContent")}
              </p>
              <p className="text-xs mt-1 text-emerald-800/80">
                {unlocks.length === 1
                  ? t("common.lesson")
                  : `${unlocks.length} ${t("common.lesson").toLowerCase()}`}
              </p>
            </div>
          )}
        </div>
      </div>

      {(onContinue || onBackToMap) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {onBackToMap && (
            <button
              type="button"
              onClick={onBackToMap}
              className="btn btn-outline btn-md"
            >
              {t("lesson.backToMap")}
            </button>
          )}
          {onContinue && (
            <button
              type="button"
              onClick={onContinue}
              className="btn btn-primary btn-md"
            >
              {t("lesson.continueToNext")}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default RewardSection;

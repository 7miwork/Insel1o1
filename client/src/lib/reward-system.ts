// Reward System for Dao-Yu-101
// Handles XP, coins, and achievement calculations

export interface RewardData {
  xp: number;
  coins: number;
  achievement?: string;
  levelUp?: boolean;
  newLevel?: number;
}

export interface QuizReward {
  baseXP: number;
  coinReward: number;
  bonusXP: number; // For perfect score
  achievement?: string;
}

// XP thresholds for level progression
const XP_PER_LEVEL = 500;
const MAX_LEVEL = 50;

export const calculateLevelFromXP = (totalXP: number): number => {
  const level = Math.floor(totalXP / XP_PER_LEVEL) + 1;
  return Math.min(level, MAX_LEVEL);
};

export const getXPForNextLevel = (currentXP: number): number => {
  const currentLevel = calculateLevelFromXP(currentXP);
  const nextLevelXP = currentLevel * XP_PER_LEVEL;
  return nextLevelXP - currentXP;
};

export const getProgressToNextLevel = (currentXP: number): number => {
  const currentLevel = calculateLevelFromXP(currentXP);
  const levelStartXP = (currentLevel - 1) * XP_PER_LEVEL;
  const levelEndXP = currentLevel * XP_PER_LEVEL;
  return ((currentXP - levelStartXP) / (levelEndXP - levelStartXP)) * 100;
};

// Quiz reward calculations
export const calculateQuizReward = (
  score: number, // 0-100
  difficulty: 'easy' | 'medium' | 'hard'
): QuizReward => {
  let baseXP = 0;
  let coinReward = 0;
  let bonusXP = 0;
  let achievement = undefined;

  // Base XP by difficulty
  switch (difficulty) {
    case 'easy':
      baseXP = 50;
      coinReward = 10;
      break;
    case 'medium':
      baseXP = 100;
      coinReward = 20;
      break;
    case 'hard':
      baseXP = 150;
      coinReward = 30;
      break;
  }

  // Score multiplier (50-100% score = 0.5-1.0x multiplier)
  const scoreMultiplier = Math.max(0.5, score / 100);
  baseXP = Math.floor(baseXP * scoreMultiplier);
  coinReward = Math.floor(coinReward * scoreMultiplier);

  // Perfect score bonus
  if (score === 100) {
    bonusXP = 50;
    achievement = 'perfect_score';
  }

  // High score achievement
  if (score >= 90 && score < 100) {
    achievement = 'high_score';
  }

  return {
    baseXP,
    coinReward,
    bonusXP,
    achievement,
  };
};

// Lesson completion reward
export const calculateLessonReward = (
  lessonDifficulty: 'beginner' | 'intermediate' | 'advanced',
  completionTime: number // in seconds
): RewardData => {
  let baseXP = 0;
  let coins = 0;
  let achievement = undefined;

  // Base XP by difficulty
  switch (lessonDifficulty) {
    case 'beginner':
      baseXP = 100;
      coins = 20;
      break;
    case 'intermediate':
      baseXP = 200;
      coins = 40;
      break;
    case 'advanced':
      baseXP = 300;
      coins = 60;
      break;
  }

  // Time bonus (faster = more bonus, max 30 min = full bonus)
  const maxTime = 30 * 60; // 30 minutes
  const timeBonus = Math.max(0, 1 - completionTime / maxTime) * 0.5; // 0-50% bonus
  const bonusXP = Math.floor(baseXP * timeBonus);

  return {
    xp: baseXP + bonusXP,
    coins,
    achievement,
  };
};

// Island completion reward
export const calculateIslandReward = (
  islandNumber: number,
  lessonsCompleted: number,
  totalLessons: number
): RewardData => {
  const baseXP = islandNumber * 500;
  const coins = islandNumber * 100;
  const completionPercentage = (lessonsCompleted / totalLessons) * 100;

  let achievement = undefined;
  if (completionPercentage === 100) {
    achievement = `island_${islandNumber}_complete`;
  }

  return {
    xp: baseXP,
    coins,
    achievement,
  };
};

// Streak bonus calculation
export const calculateStreakBonus = (streakDays: number): number => {
  // 1% bonus per day, max 50% at 50 days
  return Math.min(streakDays, 50);
};

// Achievement definitions
export const ACHIEVEMENTS = {
  first_lesson: {
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎓',
    xpReward: 50,
  },
  perfect_score: {
    name: 'Perfect Score',
    description: 'Get 100% on a quiz',
    icon: '⭐',
    xpReward: 100,
  },
  high_score: {
    name: 'High Score',
    description: 'Get 90% or higher on a quiz',
    icon: '🌟',
    xpReward: 50,
  },
  island_1_complete: {
    name: 'Island Explorer',
    description: 'Complete Island 1: Minecraft Coding',
    icon: '🏝️',
    xpReward: 500,
  },
  level_10: {
    name: 'Leveling Up',
    description: 'Reach Level 10',
    icon: '📈',
    xpReward: 200,
  },
  level_25: {
    name: 'Veteran Learner',
    description: 'Reach Level 25',
    icon: '🏆',
    xpReward: 500,
  },
  streak_7: {
    name: 'Week Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    xpReward: 100,
  },
  streak_30: {
    name: 'Consistency Champion',
    description: 'Maintain a 30-day learning streak',
    icon: '💪',
    xpReward: 500,
  },
};

export type AchievementKey = keyof typeof ACHIEVEMENTS;

export const getAchievementData = (achievementKey: AchievementKey) => {
  return ACHIEVEMENTS[achievementKey];
};

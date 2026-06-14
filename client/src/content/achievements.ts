/**
 * Achievements — Content definitions for the achievement/badge system
 *
 * Single source of truth for all learning achievements and badges.
 * To add a new achievement: add an entry to `achievements` array.
 *
 * Achievement types:
 *   - "completion" — earned by finishing a lesson/island/course
 *   - "streak"     — earned by maintaining a learning streak
 *   - "mastery"    — earned by mastering a skill
 *   - "exploration" — earned by discovering content
 */

export type AchievementCategory = "completion" | "streak" | "mastery" | "exploration";

export interface Achievement {
  /** Unique identifier */
  id: string;
  /** Display title (plain text, not i18n key) */
  title: string;
  /** Short description */
  description: string;
  /** Emoji icon for the badge */
  icon: string;
  /** Category */
  category: AchievementCategory;
  /** XP reward for earning this achievement */
  xpReward: number;
  /** Condition to unlock (human-readable, for display) */
  condition?: string;
}

/**
 * All available achievements in the system.
 * Currently a placeholder — real data comes from the backend.
 */
export const achievements: Achievement[] = [
  {
    id: "first-lesson",
    title: "Erste Schritte",
    description: "Complete your first lesson",
    icon: "🧭",
    category: "completion",
    xpReward: 100,
    condition: "Complete 1 lesson",
  },
  {
    id: "island-explorer",
    title: "Insel-Entdecker",
    description: "Complete all lessons on an island",
    icon: "🏝️",
    category: "completion",
    xpReward: 500,
    condition: "Complete all lessons in a course",
  },
  {
    id: "week-streak",
    title: "Wochen-Läufer",
    description: "Maintain a 7-day learning streak",
    icon: "🔥",
    category: "streak",
    xpReward: 300,
    condition: "Learn every day for 7 days",
  },
  {
    id: "archipelago-master",
    title: "Archipel-Meister",
    description: "Complete every island in the archipelago",
    icon: "🏆",
    category: "mastery",
    xpReward: 2000,
    condition: "Complete all courses",
  },
];
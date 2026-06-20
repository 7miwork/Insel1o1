/**
 * Content File — Island & Lesson Definitions
 *
 * Single source of truth for all island and lesson data.
 * UI components MUST import from this file.
 * NO hardcoded lesson data inside React components.
 *
 * To add a new island: add an entry to `islands`
 * To add a lesson: add to the lessons array of an island
 */

import {
  MINECRAFT_LESSONS,
  type QuizQuestion,
  type CodeBlock,
  type LessonVideo,
} from "@/data/minecraft-island";

// ─── Types ────────────────────────────────────────────────────────────

/** Optional cinematic / showcase media for an island */
export type IslandMedia = {
  /** Cinematic / timelapse / build video URL (YouTube, Vimeo, mp4) */
  introVideoUrl?: string;
  /** Fallback thumbnail image URL */
  introImageUrl?: string;
  /** Optional narrative text describing the showcase */
  description?: string;
};

export type Lesson = {
  /** Unique lesson ID (maps to /lesson/:id route) */
  id: string;
  /** Display title */
  title: string;
  /** Short description */
  description?: string;

  // ── learning content ──
  /** YouTube (incl. unlisted), Vimeo, direct mp4, etc. */
  videoUrl?: string;
  /** Link to external resource */
  externalUrl?: string;

  // ── progression ──
  isLocked?: boolean;
  isCompleted?: boolean;

  // ── map positioning (for island view) ──
  x?: number;
  y?: number;

  // ── optional metadata ──
  duration?: string;
  /** Emoji icon for the map node */
  emoji?: string;
  /** i18n key for the lesson title */
  titleKey?: string;
  /** i18n key for the lesson subtitle */
  subtitleKey?: string;
  /** Whether this lesson is available to play */
  available?: boolean;
  /** Whether this is a special main island (larger node) */
  isMainIsland?: boolean;
  /** Whether this is the final destination */
  isFinalIsland?: boolean;

  // ── rich content (for lesson page) ──
  phase?: "getting-started" | "loops" | "conditionals" | "creative" | "final-project";
  difficulty?: "beginner" | "intermediate" | "advanced";
  objectives?: string[];
  content?: string;
  codeBlocks?: CodeBlock[];
  studentActivity?: string;
  teacherTip?: string;
  quiz?: QuizQuestion[];
  video?: LessonVideo;
  xpReward?: number;
  unlocks?: number[];
};

export type Island = {
  /** Unique island identifier */
  id: string;
  /** Display name */
  name: string;
  /** Theme category */
  theme: "programming" | "science" | "language" | "math";

  /** Color theme for the island */
  color: string;
  /** Light color for backgrounds */
  lightColor: string;
  /** Emoji representing this island */
  emoji: string;
  /** i18n key for the island title */
  titleKey: string;
  /** i18n key for the island description */
  descriptionKey: string;

  /** Lessons belonging to this island */
  lessons: Lesson[];

  /** Position on the world map (0–100 for SVG viewBox) */
  x: number;
  y: number;

  /** Whether this island is available */
  available: boolean;

  /** Optional theme icon */
  icon?: string;

  /** Optional cinematic showcase / timelapse media */
  media?: IslandMedia;
};

// ─── Helpers ──────────────────────────────────────────────────────────

const toStr = (id: number) => String(id);

// Build the detailed lessons for "minecraft-block-coding" from
// the existing MINECRAFT_LESSONS + the map positions from the
// archipelago config (which were defined inline before).

/** Archipelago cluster layout — Level 1
 *  Lesson 11 is the center destination (largest).
 *  Lessons 1-10 surround it in a natural archipelago shape.
 *  Coordinates are in SVG viewBox units (0-100), centered around lesson 11 at (50, 50). */
const MINECRAFT_POSITIONS: Array<{ id: number; x: number; y: number; isMainIsland?: boolean; isFinalIsland?: boolean; emoji: string; titleKey: string; subtitleKey?: string }> = [
  { id: 2,  x: 50, y: 12, emoji: "🧠", titleKey: "archipelago.lesson2", subtitleKey: "archipelago.lesson2sub" },
  { id: 1,  x: 28, y: 28, emoji: "🧭", titleKey: "archipelago.lesson1", subtitleKey: "archipelago.lesson1sub" },
  { id: 3,  x: 72, y: 28, emoji: "🔢", titleKey: "archipelago.lesson3", subtitleKey: "archipelago.lesson3sub" },
  { id: 10, x: 18, y: 50, emoji: "🏙️", titleKey: "archipelago.lesson10", subtitleKey: "archipelago.lesson10sub" },
  { id: 4,  x: 82, y: 50, emoji: "🧩", titleKey: "archipelago.lesson4", subtitleKey: "archipelago.lesson4sub" },
  { id: 9,  x: 28, y: 72, emoji: "🎮", titleKey: "archipelago.lesson9", subtitleKey: "archipelago.lesson9sub" },
  { id: 5,  x: 72, y: 72, emoji: "🌉", titleKey: "archipelago.lesson5", subtitleKey: "archipelago.lesson5sub" },
  { id: 8,  x: 40, y: 88, emoji: "⚙️", titleKey: "archipelago.lesson8", subtitleKey: "archipelago.lesson8sub" },
  { id: 6,  x: 60, y: 88, emoji: "🎨", titleKey: "archipelago.lesson6", subtitleKey: "archipelago.lesson6sub" },
  { id: 7,  x: 50, y: 100, emoji: "🔍", titleKey: "archipelago.lesson7", subtitleKey: "archipelago.lesson7sub" },
  { id: 11, x: 50, y: 50, emoji: "🏰", titleKey: "archipelago.lesson11", subtitleKey: "archipelago.lesson11sub", isMainIsland: true, isFinalIsland: true },
];

/** Archipelago cluster layout — Level 2 (Bedingungen & Funktionen)
 *  Lesson 31 is the center destination (largest).
 *  Lessons 21-30 surround it in a natural archipelago shape.
 *  Coordinates are in SVG viewBox units (0-100), centered around lesson 31 at (50, 50). */
const LEVEL2_POSITIONS: Array<{ id: number; x: number; y: number; isFinalIsland?: boolean; emoji: string; titleKey: string; subtitleKey?: string }> = [
  { id: 22, x: 50, y: 12, emoji: "🔀",  titleKey: "archipelago.l2Lesson2", subtitleKey: "archipelago.l2Lesson2sub" },
  { id: 21, x: 28, y: 28, emoji: "❓",  titleKey: "archipelago.l2Lesson1", subtitleKey: "archipelago.l2Lesson1sub" },
  { id: 23, x: 72, y: 28, emoji: "📦",  titleKey: "archipelago.l2Lesson3", subtitleKey: "archipelago.l2Lesson3sub" },
  { id: 30, x: 18, y: 50, emoji: "🏗️",  titleKey: "archipelago.l2Lesson10", subtitleKey: "archipelago.l2Lesson10sub" },
  { id: 24, x: 82, y: 50, emoji: "🔧",  titleKey: "archipelago.l2Lesson4", subtitleKey: "archipelago.l2Lesson4sub" },
  { id: 29, x: 28, y: 72, emoji: "🎲",  titleKey: "archipelago.l2Lesson9", subtitleKey: "archipelago.l2Lesson9sub" },
  { id: 25, x: 72, y: 72, emoji: "⚖️",  titleKey: "archipelago.l2Lesson5", subtitleKey: "archipelago.l2Lesson5sub" },
  { id: 28, x: 40, y: 88, emoji: "🔬",  titleKey: "archipelago.l2Lesson8", subtitleKey: "archipelago.l2Lesson8sub" },
  { id: 26, x: 60, y: 88, emoji: "♟️",  titleKey: "archipelago.l2Lesson6", subtitleKey: "archipelago.l2Lesson6sub" },
  { id: 27, x: 50, y: 100, emoji: "🗼", titleKey: "archipelago.l2Lesson7", subtitleKey: "archipelago.l2Lesson7sub" },
  { id: 31, x: 50, y: 50, emoji: "🏖️", titleKey: "archipelago.l2Lesson11", subtitleKey: "archipelago.l2Lesson11sub", isMainIsland: true, isFinalIsland: true },
];

/** Merge rich lesson content from MINECRAFT_LESSONS with map positions */
function buildMinecraftLessons(): Lesson[] {
  return MINECRAFT_LESSONS.map((ml) => {
    const pos = MINECRAFT_POSITIONS.find((p) => p.id === ml.id);
    return {
      id: toStr(ml.id),
      title: ml.title,
      description: ml.description,
      videoUrl: ml.video?.enabled ? ml.video.url : undefined,
      emoji: pos?.emoji ?? "🏝️",
      titleKey: pos?.titleKey,
      subtitleKey: pos?.subtitleKey,
      x: pos?.x ?? 50,
      y: pos?.y ?? 50,
      available: true,
      isMainIsland: pos?.isMainIsland,
      isFinalIsland: pos?.isFinalIsland,
      duration: `${ml.duration} min`,
      // rich content from the original Lesson type
      phase: ml.phase,
      difficulty: ml.difficulty,
      objectives: ml.objectives,
      content: ml.content,
      codeBlocks: ml.codeBlocks,
      studentActivity: ml.studentActivity,
      teacherTip: ml.teacherTip,
      quiz: ml.quiz,
      video: ml.video,
      xpReward: ml.xpReward,
      unlocks: ml.unlocks,
    };
  });
}

/** Merge Level 2 lessons from MINECRAFT_LESSONS with Level 2 map positions */
function buildLevel2Lessons(): Lesson[] {
  return MINECRAFT_LESSONS.filter((ml) => ml.id >= 21 && ml.id <= 31).map((ml) => {
    const pos = LEVEL2_POSITIONS.find((p) => p.id === ml.id);
    return {
      id: toStr(ml.id),
      title: ml.title,
      description: ml.description,
      videoUrl: ml.video?.enabled ? ml.video.url : undefined,
      emoji: pos?.emoji ?? "🏝️",
      titleKey: pos?.titleKey,
      subtitleKey: pos?.subtitleKey,
      x: pos?.x ?? 50,
      y: pos?.y ?? 50,
      available: true,
      isFinalIsland: pos?.isFinalIsland,
      duration: `${ml.duration} min`,
      phase: ml.phase,
      difficulty: ml.difficulty,
      objectives: ml.objectives,
      content: ml.content,
      codeBlocks: ml.codeBlocks,
      studentActivity: ml.studentActivity,
      teacherTip: ml.teacherTip,
      quiz: ml.quiz,
      video: ml.video,
      xpReward: ml.xpReward,
      unlocks: ml.unlocks,
    };
  });
}

// ─── Island Data ──────────────────────────────────────────────────────

export const islands: Island[] = [
  {
    id: "minecraft-block-coding",
    name: "Minecraft Block Coding",
    theme: "programming",
    color: "#0D9488",
    lightColor: "#CCFBF1",
    emoji: "⛏️",
    titleKey: "archipelago.minecraftBlockCoding",
    descriptionKey: "archipelago.minecraftBlockCodingDesc",
    x: 35,
    y: 50,
    available: true,
    lessons: buildMinecraftLessons(),
    media: {
      introVideoUrl: "https://youtu.be/2TStogXT1lc",
      description: "Minecraft Education timelapse showing how the island worlds were designed and built.",
    },
  },
  {
    id: "minecraft-advanced",
    name: "Level 2: Bedingungen & Funktionen",
    theme: "programming",
    color: "#0F766E",
    lightColor: "#D1FAE5",
    emoji: "🧊",
    titleKey: "archipelago.minecraftAdvanced",
    descriptionKey: "archipelago.minecraftAdvancedDesc",
    x: 70,
    y: 50,
    available: true,
    lessons: buildLevel2Lessons(),
  },
];

// ─── Convenience Accessors ────────────────────────────────────────────

/** Find a lesson by its string ID across all islands */
export function findLesson(lessonId: string): Lesson | undefined {
  for (const island of islands) {
    const found = island.lessons.find((l) => l.id === lessonId);
    if (found) return found;
  }
  return undefined;
}

/** Find a lesson by its numeric ID (legacy route support) */
export function findLessonById(id: number): Lesson | undefined {
  return findLesson(String(id));
}

/** Find the island that contains a given lesson */
export function findIslandByLessonId(lessonId: string): Island | undefined {
  return islands.find((island) => island.lessons.some((l) => l.id === lessonId));
}

/** Get all lessons flattened across islands */
export function getAllLessons(): Lesson[] {
  return islands.flatMap((island) => island.lessons);
}

/** Get the next lesson after a given lesson */
export function getNextLesson(currentLessonId: string): Lesson | undefined {
  const all = getAllLessons();
  const idx = all.findIndex((l) => l.id === currentLessonId);
  return idx >= 0 && idx < all.length - 1 ? all[idx + 1] : undefined;
}
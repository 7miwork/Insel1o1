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

/** Map positions from the old archipelago config (x,y 0–100) */
const MINECRAFT_POSITIONS: Array<{ id: number; x: number; y: number; isMainIsland?: boolean; isFinalIsland?: boolean; emoji: string; titleKey: string; subtitleKey?: string }> = [
  { id: 1,  x: 8,  y: 15, emoji: "🧭", titleKey: "archipelago.lesson1", subtitleKey: "archipelago.lesson1sub" },
  { id: 2,  x: 22, y: 12, emoji: "🧠", titleKey: "archipelago.lesson2", subtitleKey: "archipelago.lesson2sub" },
  { id: 3,  x: 36, y: 15, emoji: "🔢", titleKey: "archipelago.lesson3", subtitleKey: "archipelago.lesson3sub" },
  { id: 4,  x: 50, y: 12, emoji: "🧩", titleKey: "archipelago.lesson4", subtitleKey: "archipelago.lesson4sub" },
  { id: 5,  x: 64, y: 15, emoji: "🌉", titleKey: "archipelago.lesson5", subtitleKey: "archipelago.lesson5sub" },
  { id: 6,  x: 78, y: 18, emoji: "🎨", titleKey: "archipelago.lesson6", subtitleKey: "archipelago.lesson6sub" },
  { id: 7,  x: 85, y: 32, emoji: "🔍", titleKey: "archipelago.lesson7", subtitleKey: "archipelago.lesson7sub" },
  { id: 8,  x: 78, y: 48, emoji: "⚙️", titleKey: "archipelago.lesson8", subtitleKey: "archipelago.lesson8sub" },
  { id: 9,  x: 64, y: 52, emoji: "🎮", titleKey: "archipelago.lesson9", subtitleKey: "archipelago.lesson9sub" },
  { id: 10, x: 48, y: 55, emoji: "🏙️", titleKey: "archipelago.lesson10", subtitleKey: "archipelago.lesson10sub" },
  { id: 11, x: 32, y: 65, emoji: "🏰", titleKey: "archipelago.lesson11", subtitleKey: "archipelago.lesson11sub", isFinalIsland: true },
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
    name: "Minecraft Advanced",
    theme: "programming",
    color: "#7C3AED",
    lightColor: "#EDE9FE",
    emoji: "⚡",
    titleKey: "archipelago.minecraftAdvanced",
    descriptionKey: "archipelago.minecraftAdvancedDesc",
    x: 70,
    y: 50,
    available: true,
    lessons: [],
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
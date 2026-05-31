/**
 * Archipelago Configuration
 *
 * JSON-ready structure for the Programmier-Archipel.
 * Designed to be easily extended with more courses and lessons.
 *
 * Architecture:
 *   Archipelago
 *     └── Course
 *           └── Lessons (represented as islands)
 *
 * To add a new course, simply add an entry to the `courses` array.
 * Each course has a `lessons` array where each lesson is an island on the course map.
 */

export interface ArchipelagoLesson {
  /** Unique lesson ID (maps to /lesson/:id route and Minecraft lesson data) */
  id: number;
  /** i18n key for the lesson title */
  titleKey: string;
  /** i18n key for the lesson description */
  descriptionKey: string;
  /** Emoji or icon identifier */
  emoji: string;
  /** Position on the course map (0-100 for SVG viewBox) */
  x: number;
  /** Position on the course map (0-100 for SVG viewBox) */
  y: number;
  /** Whether this lesson is currently available */
  available: boolean;
}

export interface ArchipelagoCourse {
  /** Unique course identifier */
  id: string;
  /** i18n key for the course title */
  titleKey: string;
  /** i18n key for the course description */
  descriptionKey: string;
  /** Color theme for the course (Tailwind color name or hex) */
  color: string;
  /** Light variant of the color for backgrounds */
  lightColor: string;
  /** Emoji representing this course */
  emoji: string;
  /** Position on the world map (0-100 for SVG viewBox) */
  x: number;
  /** Position on the world map (0-100 for SVG viewBox) */
  y: number;
  /** Lessons belonging to this course */
  lessons: ArchipelagoLesson[];
  /** Whether this course is currently available */
  available: boolean;
}

export interface ArchipelagoConfig {
  /** i18n key for the archipelago title */
  titleKey: string;
  /** i18n key for the subtitle */
  subtitleKey: string;
  /** Unique identifier */
  id: string;
  /** Courses in this archipelago */
  courses: ArchipelagoCourse[];
}

/**
 * The Programmier-Archipel configuration.
 *
 * Currently contains:
 * - Minecraft Education → Block Coding Basic (6 lessons → Insel 1–6)
 *
 * To extend, add new courses to the `courses` array following the same structure.
 * For future archipelagos, create new ArchipelagoConfig objects and register them
 * in a top-level map.
 */
export const programmingArchipelago: ArchipelagoConfig = {
  id: "programming",
  titleKey: "archipelago.title",
  subtitleKey: "archipelago.subtitle",
  courses: [
    {
      id: "minecraft-education",
      titleKey: "archipelago.minecraftEducation",
      descriptionKey: "archipelago.blockCodingBasic",
      color: "#0D9488", // teal-600
      lightColor: "#CCFBF1", // teal-100
      emoji: "⛏️",
      x: 50,
      y: 50,
      available: true,
      lessons: [
        {
          id: 1,
          titleKey: "archipelago.island_one",
          descriptionKey: "archipelago.blockCodingBasic",
          emoji: "🏝️",
          x: 15,
          y: 20,
          available: true,
        },
        {
          id: 2,
          titleKey: "archipelago.island_one",
          descriptionKey: "archipelago.blockCodingBasic",
          emoji: "🏝️",
          x: 35,
          y: 15,
          available: true,
        },
        {
          id: 3,
          titleKey: "archipelago.island_one",
          descriptionKey: "archipelago.blockCodingBasic",
          emoji: "🏝️",
          x: 55,
          y: 20,
          available: true,
        },
        {
          id: 4,
          titleKey: "archipelago.island_one",
          descriptionKey: "archipelago.blockCodingBasic",
          emoji: "🏝️",
          x: 75,
          y: 15,
          available: true,
        },
        {
          id: 5,
          titleKey: "archipelago.island_one",
          descriptionKey: "archipelago.blockCodingBasic",
          emoji: "🏝️",
          x: 85,
          y: 40,
          available: true,
        },
        {
          id: 6,
          titleKey: "archipelago.island_one",
          descriptionKey: "archipelago.blockCodingBasic",
          emoji: "🏝️",
          x: 70,
          y: 65,
          available: true,
        },
      ],
    },
  ],
};

/**
 * Placeholder course template for future additions.
 * Copy and customize this when adding new courses.
 */
export function createPlaceholderCourse(
  id: string,
  titleKey: string,
  emoji: string,
  color: string,
  x: number,
  y: number,
  lessonCount: number = 4
): ArchipelagoCourse {
  const lessons: ArchipelagoLesson[] = [];
  for (let i = 0; i < lessonCount; i++) {
    lessons.push({
      id: 9000 + i,
      titleKey: "archipelago.comingSoon",
      descriptionKey: "archipelago.inDevelopment",
      emoji: "🔮",
      x: 15 + i * 22,
      y: 20 + (i % 2) * 30,
      available: false,
    });
  }
  return {
    id,
    titleKey,
    descriptionKey: "archipelago.inDevelopment",
    color,
    lightColor: color + "22",
    emoji,
    x,
    y,
    available: false,
    lessons,
  };
}

/**
 * Example of how to extend with a new course:
 *
 * ```
 * programmingArchipelago.courses.push({
 *   id: "python-basics",
 *   titleKey: "python.title",
 *   descriptionKey: "python.description",
 *   color: "#2563EB",
 *   lightColor: "#DBEAFE",
 *   emoji: "🐍",
 *   x: 25,
 *   y: 70,
 *   available: false,
 *   lessons: [
 *     { id: 101, titleKey: "python.lesson1", emoji: "📘", x: 20, y: 20, available: true, descriptionKey: "python.lesson1desc" },
 *     // ... more lessons
 *   ],
 * });
 * ```
 */

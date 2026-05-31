/**
 * Archipelago Configuration
 *
 * JSON-ready structure for the Programmier-Archipel.
 * Designed to be easily extended with more courses and lessons.
 *
 * Architecture:
 *   Archipelago
 *     └── Course (large island on world map)
 *           └── Lessons (small islands on course map)
 *
 * To add a new course, simply add an entry to the `courses` array.
 * To add lessons, add entries to the `lessons` array of a course.
 */

export interface ArchipelagoLesson {
  /** Unique lesson ID (maps to /lesson/:id route and Minecraft lesson data) */
  id: number;
  /** i18n key for the lesson title */
  titleKey: string;
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
  /** Color theme for the course */
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
 * - Minecraft Education Basic (11 lessons)
 * - Minecraft Education Advanced (coming soon, 0 lessons)
 *
 * To extend, add new courses to the `courses` array.
 */
export const programmingArchipelago: ArchipelagoConfig = {
  id: "programming",
  titleKey: "archipelago.title",
  subtitleKey: "archipelago.subtitle",
  courses: [
    {
      id: "minecraft-basic",
      titleKey: "archipelago.minecraftBasic",
      descriptionKey: "archipelago.minecraftBasicDesc",
      color: "#0D9488", // teal-600
      lightColor: "#CCFBF1", // teal-100
      emoji: "⛏️",
      x: 35,
      y: 50,
      available: true,
      lessons: [
        // Row 1: Getting Started (left to right)
        { id: 1, titleKey: "archipelago.lesson", emoji: "🏝️", x: 8, y: 15, available: true },
        { id: 2, titleKey: "archipelago.lesson", emoji: "🏝️", x: 22, y: 12, available: true },
        { id: 3, titleKey: "archipelago.lesson", emoji: "🏝️", x: 36, y: 15, available: true },
        { id: 4, titleKey: "archipelago.lesson", emoji: "🏝️", x: 50, y: 12, available: true },
        { id: 5, titleKey: "archipelago.lesson", emoji: "🏝️", x: 64, y: 15, available: true },

        // Row 2: Winding back (right to left)
        { id: 6, titleKey: "archipelago.lesson", emoji: "🏝️", x: 78, y: 18, available: true },
        { id: 7, titleKey: "archipelago.lesson", emoji: "🏝️", x: 85, y: 32, available: true },
        { id: 8, titleKey: "archipelago.lesson", emoji: "🏝️", x: 78, y: 48, available: true },
        { id: 9, titleKey: "archipelago.lesson", emoji: "🏝️", x: 64, y: 52, available: true },

        // Row 3: Final stretch (left to right, bottom)
        { id: 10, titleKey: "archipelago.lesson", emoji: "🏝️", x: 48, y: 55, available: true },
        { id: 11, titleKey: "archipelago.lesson", emoji: "🏝️", x: 32, y: 60, available: true },
      ],
    },
    {
      id: "minecraft-advanced",
      titleKey: "archipelago.minecraftAdvanced",
      descriptionKey: "archipelago.minecraftAdvancedDesc",
      color: "#7C3AED", // violet-600
      lightColor: "#EDE9FE", // violet-100
      emoji: "⚡",
      x: 70,
      y: 50,
      available: true,
      lessons: [],
    },
  ],
};

/**
 * Helper to generate a spiral/island-path lesson layout.
 * Generates positions for N lessons arranged in a journey-like path.
 */
export function generateLessonPath(
  count: number,
  startX: number = 10,
  startY: number = 20,
  spacing: number = 12
): { x: number; y: number }[] {
  const positions: { x: number; y: number }[] = [];
  let x = startX;
  let y = startY;
  let dx = spacing;
  let dy = spacing;
  let direction: "right" | "down" | "left" | "up" = "right";

  for (let i = 0; i < count; i++) {
    positions.push({ x, y });

    // Move to next position
    switch (direction) {
      case "right":
        x += dx;
        if (x > 85) { x = 85; direction = "down"; y += dy / 2; }
        break;
      case "down":
        y += dy;
        if (y > 80) { y = 80; direction = "left"; x -= dx / 2; }
        break;
      case "left":
        x -= dx;
        if (x < 15) { x = 15; direction = "up"; y -= dy / 2; }
        break;
      case "up":
        y -= dy;
        if (y < startY) { y = startY; direction = "right"; x += dx / 2; }
        break;
    }
    // Alternate spacing slightly for organic feel
    dx = spacing + (i % 3 === 0 ? 2 : 0);
    dy = spacing + (i % 2 === 0 ? 1 : 0);
  }

  return positions;
}

/**
 * Creates a placeholder lesson for future courses.
 */
export function createPlaceholderLesson(
  id: number,
  x: number,
  y: number
): ArchipelagoLesson {
  return {
    id,
    titleKey: "archipelago.comingSoon",
    emoji: "🔮",
    x,
    y,
    available: false,
  };
}

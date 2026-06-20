/**
 * Archipelago Configuration
 *
 * Now backed by the single content source of truth:
 *   @/content/lessons.ts
 *
 * This file re-exports island data in the ArchipelagoConfig shape
 * so that existing components can continue to consume it without changes.
 */

import { islands } from "@/content/lessons";
import type { Island, IslandMedia } from "@/content/lessons";

// ─── Types (kept for backward compatibility) ───

export interface ArchipelagoLesson {
  /** Unique lesson ID (maps to /lesson/:id route and Minecraft lesson data) */
  id: number;
  /** i18n key for the lesson title */
  titleKey: string;
  /** i18n key for the lesson subtitle */
  subtitleKey?: string;
  /** Emoji or icon identifier */
  emoji: string;
  /** Position on the course map (0-100 for SVG viewBox) */
  x: number;
  /** Position on the course map (0-100 for SVG viewBox) */
  y: number;
  /** Tablet position (0-100) — compressed archipelago cluster */
  tabletX?: number;
  /** Tablet position (0-100) — compressed archipelago cluster */
  tabletY?: number;
  /** Whether this lesson is currently available */
  available: boolean;
  /** Whether this island is a special main island (larger, different styling) */
  isMainIsland?: boolean;
  /** Whether this island is the final destination of the learning path */
  isFinalIsland?: boolean;
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
  /** Optional cinematic showcase / timelapse media */
  media?: IslandMedia;
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

// ─── Convert the new content data to the ArchipelagoConfig shape ───

function islandToCourse(island: Island): ArchipelagoCourse {
  return {
    id: island.id,
    titleKey: island.titleKey,
    descriptionKey: island.descriptionKey,
    color: island.color,
    lightColor: island.lightColor,
    emoji: island.emoji,
    x: island.x,
    y: island.y,
    available: island.available,
    media: island.media,
    lessons: island.lessons.map((l) => ({
      id: Number(l.id),
      titleKey: l.titleKey ?? "",
      subtitleKey: l.subtitleKey,
      emoji: l.emoji ?? "🏝️",
      x: l.x ?? 50,
      y: l.y ?? 50,
      tabletX: ((l as any).tabletX ?? l.x ?? 50) as number,
      tabletY: ((l as any).tabletY ?? l.y ?? 50) as number,
      available: l.available ?? false,
      isMainIsland: l.isMainIsland,
      isFinalIsland: l.isFinalIsland,
    })),
  };
}

export const programmingArchipelago: ArchipelagoConfig = {
  id: "programming",
  titleKey: "archipelago.title",
  subtitleKey: "archipelago.subtitle",
  courses: islands.map(islandToCourse),
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
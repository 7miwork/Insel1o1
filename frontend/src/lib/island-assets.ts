/**
 * Get the path to an island SVG asset for a given course and lesson.
 *
 * @param course - The course folder name (e.g., "mathematics-kingdom")
 * @param lesson - The 1-based lesson number (e.g., 1, 2, 3)
 * @returns The resolved asset path string
 */
export function getIslandAsset(course: string, lesson: number): string {
  return `/assets/images/islands/${course}/island-${lesson}.svg`;
}

/**
 * Get the fallback placeholder island SVG path.
 */
export function getFallbackIsland(): string {
  return '/assets/images/islands/fallback/island-placeholder.svg';
}
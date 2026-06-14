/**
 * Feature Videos — Homepage showcase videos
 *
 * Single source of truth for all feature/review/mitimelap videos
 * displayed on the homepage and other pages.
 *
 * To add a new video: add an entry to `featureVideos` array.
 * The UI will automatically render any video defined here.
 *
 * Supported providers:
 *   - YouTube (youtu.be, youtube.com/watch, youtube.com/embed)
 *   - Vimeo
 *   - direct mp4 (future)
 */

export interface FeatureVideo {
  /** Unique identifier */
  id: string;
  /** Display title */
  title: string;
  /** Video URL (YouTube, Vimeo, or direct mp4) */
  url: string;
  /** Short description */
  description?: string;
  /** Optional category tag */
  category?: "timelapse" | "review" | "tutorial" | "trail";

  /** Whether this video requires opt-in (default: false) */
  requiresConsent?: boolean;
}

/**
 * All homepage feature videos.
 * Each entry is rendered as a video card inside the Features section.
 */
export const featureVideos: FeatureVideo[] = [
  {
    id: "island-timelapse",
    title: "Island Building Timelapse",
    url: "https://youtu.be/2TStogXT1lc",
    description: "Minecraft Education timelapse showing how the island worlds were designed and built. From first concept to the final learning world.",
    category: "timelapse",
  },
];
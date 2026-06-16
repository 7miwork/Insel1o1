/**
 * Homepage Features — Content definitions for the Features section
 *
 * Single source of truth for all homepage feature cards.
 * To add a new feature: add an entry to `homepageFeatures` array.
 *
 * Each feature has i18n keys so the UI reads translated text.
 * If a feature has a video, add the videoUrl and it renders automatically.
 */

export interface HomepageFeature {
  /** Unique identifier */
  id: string;
  /** i18n key for the feature title */
  titleKey: string;
  /** i18n key for the feature description */
  descriptionKey: string;
  /** Optional — reference to a key in videos.ts (e.g. "preview") */
  videoKey?: string;
  /** Display order (lower = higher) */
  order: number;
}

/**
 * All homepage feature cards, in display order.
 */
export const homepageFeatures: HomepageFeature[] = [
  {
    id: "interactive-paths",
    titleKey: "home.feature_interactivePaths",
    descriptionKey: "home.feature_interactivePathsDesc",
    order: 1,
  },
  {
    id: "personal-progress",
    titleKey: "home.feature_personalProgress",
    descriptionKey: "home.feature_personalProgressDesc",
    order: 2,
  },
  {
    id: "teacher-dashboard",
    titleKey: "home.feature_teacherDashboard",
    descriptionKey: "home.feature_teacherDashboardDesc",
    order: 3,
  },
  {
    id: "learn-anywhere",
    titleKey: "home.feature_learnAnywhere",
    descriptionKey: "home.feature_learnAnywhereDesc",
    order: 4,
  },
  {
    id: "island-timelapse",
    titleKey: "home.feature_islandTimelapse",
    descriptionKey: "home.feature_islandTimelapseDesc",
    videoKey: "preview",
    order: 5,
  },
];
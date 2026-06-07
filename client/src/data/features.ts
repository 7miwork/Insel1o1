/**
 * FEATURES DATA CONFIGURATION
 * =============================
 * Centralized configuration file for all landing page feature cards.
 *
 * To add, remove, or modify features, edit the FEATURES array below.
 * No UI component changes are needed.
 *
 * @file client/src/data/features.ts
 *
 * Each feature object requires:
 * - icon: Lucide icon component name (string)
 * - titleKey: Translation key for the title
 * - descriptionKey: Translation key for the description
 * - color: Tailwind gradient class (e.g., "from-amber-400 to-orange-500")
 */

export interface FeatureConfig {
  id: string;
  iconName: string;
  titleKey: string;
  descriptionKey: string;
  color: string;
}

export const FEATURES: FeatureConfig[] = [
  {
    id: "adventure-learning",
    iconName: "Compass",
    titleKey: "home.feature_adventureLearning",
    descriptionKey: "home.feature_adventureLearningDesc",
    color: "from-amber-400 to-orange-500",
  },
  {
    id: "learning-paths",
    iconName: "Route",
    titleKey: "home.feature_interactivePaths",
    descriptionKey: "home.feature_interactivePathsDesc",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "personal-progress",
    iconName: "TrendingUp",
    titleKey: "home.feature_personalProgress",
    descriptionKey: "home.feature_personalProgressDesc",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "parent-insights",
    iconName: "Home",
    titleKey: "home.feature_parentInsights",
    descriptionKey: "home.feature_parentInsightsDesc",
    color: "from-violet-500 to-purple-500",
  },
  {
    id: "teacher-dashboard",
    iconName: "School",
    titleKey: "home.feature_teacherDashboard",
    descriptionKey: "home.feature_teacherDashboardDesc",
    color: "from-rose-500 to-pink-500",
  },
  {
    id: "motivation",
    iconName: "Award",
    titleKey: "home.feature_motivation",
    descriptionKey: "home.feature_motivationDesc",
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    id: "learn-anywhere",
    iconName: "Smartphone",
    titleKey: "home.feature_learnAnywhere",
    descriptionKey: "home.feature_learnAnywhereDesc",
    color: "from-sky-500 to-indigo-500",
  },
  {
    id: "privacy-security",
    iconName: "Shield",
    titleKey: "home.feature_privacySecurity",
    descriptionKey: "home.feature_privacySecurityDesc",
    color: "from-slate-500 to-slate-600",
  },
];
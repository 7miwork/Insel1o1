/**
 * PRICING CONFIGURATION
 * =====================
 * Central configuration file for all pricing data.
 *
 * To change prices, edit the values below.
 * No UI component changes are needed.
 *
 * @file client/src/data/pricing-config.ts
 *
 * Where to edit:
 * - Subscription price:    PRICING.subscription.monthly
 * - Single subject price:  PRICING.singleSubject.monthly
 * - Island price:          PRICING.islands.price
 * - Private lesson price:  PRICING.privateLesson.hourly
 */

export interface IslandsConfig {
  island1: number;
  island2: number;
  island3: number;
}

export interface PricingConfig {
  subscription: {
    monthly: number;
    currency: string;
  };
  singleSubject: {
    monthly: number;
    currency: string;
    subjects: string[];
  };
  islands: {
    price: number;
    currency: string;
    available: IslandsConfig;
  };
  privateLesson: {
    hourly: number;
    currency: string;
  };
  popularPlan: string;
  features: {
    subscription: string[];
    singleSubject: string[];
    island: string[];
    privateLesson: string[];
  };
}

/** Central pricing configuration */
export const PRICING: PricingConfig = {
  subscription: {
    monthly: 50,
    currency: 'EUR',
  },
  singleSubject: {
    monthly: 15,
    currency: 'EUR',
    subjects: ['mathematics', 'german', 'english', 'science'],
  },
  islands: {
    price: 29,
    currency: 'EUR',
    available: {
      island1: 29,
      island2: 29,
      island3: 34,
    },
  },
  privateLesson: {
    hourly: 75,
    currency: 'EUR',
  },
  popularPlan: 'subscription',

  /** Feature keys for comparison table and plan cards */
  features: {
    subscription: [
      'interactivePlatform',
      'videos',
      'exercises',
      'progressTracking',
      'studentDashboard',
      'parentDashboard',
      'teacherSupport',
      'allSubjects',
    ],
    singleSubject: [
      'singleSubject',
      'interactiveExercises',
      'progressTracking',
      'learningMaterials',
    ],
    island: [
      'singleIsland',
      'islandContent',
      'interactiveExercises',
    ],
    privateLesson: [
      'liveSession',
      'personalizedSupport',
      'directTeacher',
      'flexibleScheduling',
    ],
  },
};
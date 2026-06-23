/**
 * Data hierarchy for the Insel 1o1 world map.
 *
 * Level 3 → Level 2 → Level 1
 * Subject → Course → Lesson Islands
 */

export interface LessonIsland {
  id: number;
  name: string;
  progress: number;
  locked: boolean;
  lessons: number;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  colorPalette: {
    water: string;
    sand: string;
    accent: string;
    highlight: string;
  };
  totalLessons: number;
  completedLessons: number;
  progress: number;
  currentLesson: number;
  islands: LessonIsland[];
}

export interface Subject {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  colorPalette: {
    water: string;
    sand: string;
    accent: string;
    highlight: string;
  };
  courses: Course[];
}

// Future subjects that are not yet available
export interface FutureSubject {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// ── Subject: Coding ──────────────────────────────────────────
// This is the only active subject initially.

export const codingSubject: Subject = {
  id: 'coding',
  slug: 'coding',
  title: 'Coding',
  description: 'Learn programming and computational thinking through interactive courses and projects.',
  icon: '💻',
  colorPalette: {
    water: '#5faebb',
    sand: '#e8d3a2',
    accent: '#306844',
    highlight: '#6dd5ed',
  },
  courses: [
    {
      id: 'makecode-block-coding',
      slug: 'makecode-block-coding',
      title: 'MakeCode Block Coding',
      description: 'Learn the basics of programming with block-based coding in Microsoft MakeCode.',
      icon: '🧱',
      colorPalette: {
        water: '#6bb7c9',
        sand: '#e8d3a2',
        accent: '#3b82f6',
        highlight: '#fbbf24',
      },
      totalLessons: 3,
      completedLessons: 1,
      progress: 33,
      currentLesson: 2,
      islands: [
        { id: 1, name: 'Introduction', progress: 100, locked: false, lessons: 1 },
        { id: 2, name: 'Variables & Logic', progress: 50, locked: false, lessons: 1 },
        { id: 3, name: 'Loops & Events', progress: 0, locked: true, lessons: 1 },
      ],
    },
    {
      id: 'makecode-block-coding-advanced',
      slug: 'makecode-block-coding-advanced',
      title: 'MakeCode Block Coding Advanced',
      description: 'Take your block coding skills to the next level with advanced concepts.',
      icon: '🧩',
      colorPalette: {
        water: '#5faebb',
        sand: '#d4bd8c',
        accent: '#8b5cf6',
        highlight: '#fbbf24',
      },
      totalLessons: 3,
      completedLessons: 0,
      progress: 0,
      currentLesson: 1,
      islands: [
        { id: 1, name: 'Arrays & Functions', progress: 0, locked: false, lessons: 1 },
        { id: 2, name: 'Nested Logic', progress: 0, locked: true, lessons: 1 },
        { id: 3, name: 'Debugging', progress: 0, locked: true, lessons: 1 },
      ],
    },
    {
      id: 'python-basics',
      slug: 'python-basics',
      title: 'Python Basics',
      description: 'Start your text-based programming journey with Python fundamentals.',
      icon: '🐍',
      colorPalette: {
        water: '#6bb7c9',
        sand: '#e8d3a2',
        accent: '#306844',
        highlight: '#6dd5ed',
      },
      totalLessons: 3,
      completedLessons: 0,
      progress: 0,
      currentLesson: 1,
      islands: [
        { id: 1, name: 'Hello, World!', progress: 0, locked: false, lessons: 1 },
        { id: 2, name: 'Data Types', progress: 0, locked: true, lessons: 1 },
        { id: 3, name: 'Control Flow', progress: 0, locked: true, lessons: 1 },
      ],
    },
    {
      id: 'scratch-programming',
      slug: 'scratch-programming',
      title: 'Scratch Programming',
      description: 'Create interactive stories, games, and animations with Scratch.',
      icon: '🎨',
      colorPalette: {
        water: '#6bb7c9',
        sand: '#e8d3a2',
        accent: '#f59e0b',
        highlight: '#fbbf24',
      },
      totalLessons: 2,
      completedLessons: 0,
      progress: 0,
      currentLesson: 1,
      islands: [
        { id: 1, name: 'Getting Started', progress: 0, locked: false, lessons: 1 },
        { id: 2, name: 'Sprites & Motion', progress: 0, locked: true, lessons: 1 },
      ],
    },
  ],
};

// ── Future Subjects ──────────────────────────────────────────

export const futureSubjects: FutureSubject[] = [
  {
    id: 'mathematics',
    title: 'Mathematics',
    description: 'Master the fundamentals of mathematics — algebra, geometry, calculus and more.',
    icon: '🔢',
  },
  {
    id: 'science',
    title: 'Science',
    description: 'Explore physics, chemistry, biology and the natural world.',
    icon: '🔬',
  },
  {
    id: 'languages',
    title: 'Languages',
    description: 'Learn new languages and explore cultures from around the world.',
    icon: '🌍',
  },
  {
    id: 'history',
    title: 'History',
    description: 'Journey through time and discover the events that shaped our world.',
    icon: '🏛️',
  },
];

// ── Utility ──────────────────────────────────────────────────

export function getSubjectBySlug(slug: string): Subject | undefined {
  const subjects: Subject[] = [codingSubject];
  return subjects.find((s) => s.slug === slug);
}

export function getCourseBySlug(courseSlug: string): Course | undefined {
  return codingSubject.courses.find((c) => c.slug === courseSlug);
}
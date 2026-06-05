// Mock data for Parent Dashboard
// This replaces backend data until API is available

export interface Child {
  id: string;
  name: string;
  age: number;
  grade: string;
  avatar: string;
  streak: number;
  totalXP: number;
  level: number;
}

export interface SubjectProgress {
  subject: string;
  progress: number; // 0-100
  lessonsCompleted: number;
  totalLessons: number;
  averageScore: number;
}

export interface Task {
  id: string;
  title: string;
  subject: string;
  status: 'pending' | 'inProgress' | 'completed' | 'reviewed';
  dueDate: string;
  assignedDate: string;
  childId: string;
}

export interface Reward {
  id: string;
  type: 'badge' | 'xp' | 'streak' | 'level';
  title: string;
  description: string;
  points: number;
  earnedAt: string;
  childId: string;
}

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'success' | 'new';
  title: string;
  message: string;
  timestamp: string;
  childId?: string;
}

export interface Activity {
  id: string;
  type: 'lesson' | 'quest' | 'badge' | 'streak';
  title: string;
  description: string;
  points: number;
  timestamp: string;
  childId: string;
}

// Mock children data
export const mockChildren: Child[] = [
  {
    id: 'child-1',
    name: 'Emma',
    age: 9,
    grade: '4th Grade',
    avatar: 'https://via.placeholder.com/60x60/4F46E5/FFFFFF?text=E',
    streak: 7,
    totalXP: 12450,
    level: 12,
  },
  {
    id: 'child-2',
    name: 'Liam',
    age: 11,
    grade: '6th Grade',
    avatar: 'https://via.placeholder.com/60x60/10B981/FFFFFF?text=L',
    streak: 3,
    totalXP: 18720,
    level: 18,
  },
];

// Mock subject progress
export const mockSubjectProgress: SubjectProgress[] = [
  { subject: 'math', progress: 78, lessonsCompleted: 31, totalLessons: 40, averageScore: 87 },
  { subject: 'reading', progress: 65, lessonsCompleted: 16, totalLessons: 25, averageScore: 82 },
  { subject: 'science', progress: 45, lessonsCompleted: 9, totalLessons: 20, averageScore: 79 },
  { subject: 'languages', progress: 82, lessonsCompleted: 28, totalLessons: 34, averageScore: 91 },
  { subject: 'arts', progress: 35, lessonsCompleted: 7, totalLessons: 20, averageScore: 84 },
];

// Mock tasks
export const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Multiplication Tables 6-9',
    subject: 'math',
    status: 'completed',
    dueDate: '2024-01-15',
    assignedDate: '2024-01-10',
    childId: 'child-1',
  },
  {
    id: 'task-2',
    title: 'Reading: "The Secret Garden" Ch. 1-3',
    subject: 'reading',
    status: 'inProgress',
    dueDate: '2024-01-20',
    assignedDate: '2024-01-12',
    childId: 'child-1',
  },
  {
    id: 'task-3',
    title: 'Science Fair Project: Volcano',
    subject: 'science',
    status: 'pending',
    dueDate: '2024-01-25',
    assignedDate: '2024-01-14',
    childId: 'child-1',
  },
  {
    id: 'task-4',
    title: 'Spanish Vocabulary: Animals',
    subject: 'languages',
    status: 'completed',
    dueDate: '2024-01-14',
    assignedDate: '2024-01-10',
    childId: 'child-1',
  },
  {
    id: 'task-5',
    title: 'Algebra Basics: Variables',
    subject: 'math',
    status: 'reviewed',
    dueDate: '2024-01-12',
    assignedDate: '2024-01-08',
    childId: 'child-2',
  },
];

// Mock rewards
export const mockRewards: Reward[] = [
  {
    id: 'reward-1',
    type: 'badge',
    title: 'Math Master',
    description: 'Completed all multiplication lessons',
    points: 500,
    earnedAt: '2024-01-14',
    childId: 'child-1',
  },
  {
    id: 'reward-2',
    type: 'xp',
    title: 'Weekly XP Bonus',
    description: 'Completed 5 lessons this week',
    points: 300,
    earnedAt: '2024-01-13',
    childId: 'child-1',
  },
  {
    id: 'reward-3',
    type: 'streak',
    title: '7-Day Streak!',
    description: 'Logged in 7 days in a row',
    points: 200,
    earnedAt: '2024-01-12',
    childId: 'child-1',
  },
  {
    id: 'reward-4',
    type: 'level',
    title: 'Level Up: Level 12',
    description: 'Reached new milestone',
    points: 1000,
    earnedAt: '2024-01-11',
    childId: 'child-1',
  },
];

// Mock alerts
export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    type: 'success',
    title: 'New Badge Earned!',
    message: 'Emma earned the "Math Master" badge',
    timestamp: '2024-01-14T10:30:00Z',
    childId: 'child-1',
  },
  {
    id: 'alert-2',
    type: 'warning',
    title: 'Streak at Risk',
    message: "Liam's 3-day streak will break if not logged in today",
    timestamp: '2024-01-14T08:00:00Z',
    childId: 'child-2',
  },
  {
    id: 'alert-3',
    type: 'info',
    title: 'New Assignment',
    message: 'Science Fair Project assigned to Emma',
    timestamp: '2024-01-14T09:15:00Z',
    childId: 'child-1',
  },
  {
    id: 'alert-4',
    type: 'success',
    title: 'Goal Reached!',
    message: 'Emma completed her weekly learning goal',
    timestamp: '2024-01-13T18:00:00Z',
    childId: 'child-1',
  },
];

// Mock activity
export const mockActivity: Activity[] = [
  {
    id: 'act-1',
    type: 'lesson',
    title: 'Multiplication Tables 6-9',
    description: 'Completed lesson with 95% score',
    points: 150,
    timestamp: '2024-01-14T10:25:00Z',
    childId: 'child-1',
  },
  {
    id: 'act-2',
    type: 'badge',
    title: 'Math Master Badge',
    description: 'Earned for completing all multiplication lessons',
    points: 500,
    timestamp: '2024-01-14T10:30:00Z',
    childId: 'child-1',
  },
  {
    id: 'act-3',
    type: 'lesson',
    title: 'Spanish: Animals Vocabulary',
    description: 'Completed lesson with 88% score',
    points: 120,
    timestamp: '2024-01-13T15:20:00Z',
    childId: 'child-1',
  },
  {
    id: 'act-4',
    type: 'quest',
    title: 'Weekly Explorer Quest',
    description: 'Completed 5 lessons this week',
    points: 300,
    timestamp: '2024-01-13T18:00:00Z',
    childId: 'child-1',
  },
  {
    id: 'act-5',
    type: 'lesson',
    title: 'Algebra: Variables',
    description: 'Completed lesson with 92% score',
    points: 180,
    timestamp: '2024-01-12T14:10:00Z',
    childId: 'child-2',
  },
];

// Subject display names
export const subjectLabels: Record<string, string> = {
  math: 'Math',
  reading: 'Reading',
  science: 'Science',
  languages: 'Languages',
  arts: 'Arts',
};

// Subject icons
export const subjectIcons: Record<string, string> = {
  math: '🔢',
  reading: '📚',
  science: '🔬',
  languages: '🗣️',
  arts: '🎨',
};

// Status labels
export const taskStatusLabels: Record<string, string> = {
  pending: 'Pending',
  inProgress: 'In Progress',
  completed: 'Completed',
  reviewed: 'Reviewed',
};

export const taskStatusColors: Record<string, string> = {
  pending: 'bg-gray-100 text-gray-700',
  inProgress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  reviewed: 'bg-purple-100 text-purple-800',
};
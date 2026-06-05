// Mock data for Parent Dashboard - Updated to match wireframe design

export interface Child {
  id: string;
  name: string;
  progress: number;
  lastActivity: string;
  status: string;
  avatar: string;
}

export interface SubjectProgress {
  subject: string;
  progress: number;
}

export interface Task {
  id: string;
  title: string;
  child: string;
  status: 'pending' | 'inProgress' | 'completed';
}

export interface Alert {
  id: string;
  type: 'warning' | 'success' | 'info';
  title: string;
  message: string;
}

export interface Reward {
  id: string;
  child: string;
  title: string;
  points: number;
}

// Mock children data - matching wireframe
export const mockChildren: Child[] = [
  {
    id: 'child-1',
    name: 'Child 1',
    progress: 72,
    lastActivity: 'Completed Math Lesson',
    status: 'Quiz: 80%',
    avatar: 'https://via.placeholder.com/60x60/3B82F6/FFFFFF?text=C1',
  },
  {
    id: 'child-2',
    name: 'Child 2',
    progress: 54,
    lastActivity: 'German Vocabulary Practice',
    status: 'Quiz: 65%',
    avatar: 'https://via.placeholder.com/60x60/10B981/FFFFFF?text=C2',
  },
];

// Subject progress - matching wireframe (Math, German, English)
export const mockSubjectProgress: SubjectProgress[] = [
  { subject: 'math', progress: 78 },
  { subject: 'german', progress: 62 },
  { subject: 'english', progress: 89 },
];

// Tasks - matching wireframe
export const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Math Exercise 3',
    child: 'Child 1',
    status: 'completed',
  },
  {
    id: 'task-2',
    title: 'English Vocabulary',
    child: 'Child 2',
    status: 'inProgress',
  },
  {
    id: 'task-3',
    title: 'German Reading',
    child: 'Child 1',
    status: 'pending',
  },
];

// Alerts - matching wireframe
export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    type: 'warning',
    title: 'Missing Activity',
    message: 'Child 2 has no Math activity for 2 days',
  },
  {
    id: 'alert-2',
    type: 'success',
    title: 'Module Completed',
    message: 'Child 1 completed Addition module',
  },
  {
    id: 'alert-3',
    type: 'info',
    title: 'New Assignment',
    message: 'New assignment available',
  },
];

// Rewards - matching wireframe
export const mockRewards: Reward[] = [
  {
    id: 'reward-1',
    child: 'Child 1',
    title: 'Extra playtime for completing Math',
    points: 50,
  },
  {
    id: 'reward-2',
    child: 'Child 2',
    title: 'Sticker pack for German progress',
    points: 30,
  },
];

// Subject labels
export const subjectLabels: Record<string, string> = {
  math: 'Math',
  german: 'German',
  english: 'English',
};

// Status labels and colors
export const taskStatusLabels: Record<string, string> = {
  pending: 'Pending',
  inProgress: 'In Progress',
  completed: 'Completed',
};

export const taskStatusColors: Record<string, string> = {
  pending: 'bg-gray-100 text-gray-700',
  inProgress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
};

export const alertTypeColors: Record<string, string> = {
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  success: 'bg-green-50 border-green-200 text-green-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
};

export const alertTypeIcons: Record<string, string> = {
  warning: '⚠️',
  success: '✅',
  info: 'ℹ️',
};
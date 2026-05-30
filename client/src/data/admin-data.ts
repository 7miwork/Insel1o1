// Admin Dashboard Data Structures

export interface SystemUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'student' | 'teacher' | 'parent' | 'admin' | 'school';
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  lastLogin: string;
  schoolId?: string;
}

export interface School {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  principalName: string;
  principalEmail: string;
  studentCount: number;
  teacherCount: number;
  classCount: number;
  status: 'active' | 'inactive';
  joinDate: string;
  subscriptionPlan: 'basic' | 'premium' | 'enterprise';
  subscriptionEndDate: string;
}

export interface SystemStats {
  totalUsers: number;
  totalStudents: number;
  totalTeachers: number;
  totalParents: number;
  totalSchools: number;
  totalClasses: number;
  totalCoursesCompleted: number;
  averageUserEngagement: number;
  systemUptime: number;
  activeUsers24h: number;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
  ipAddress: string;
  status: 'success' | 'failed';
}

export interface RevenueData {
  month: string;
  revenue: number;
  subscriptions: number;
  coursesSold: number;
}

export interface SystemAlert {
  id: string;
  type: 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: string;
  resolved: boolean;
}

// Mock Admin Data
export const mockSystemStats: SystemStats = {
  totalUsers: 15420,
  totalStudents: 8500,
  totalTeachers: 1200,
  totalParents: 4500,
  totalSchools: 45,
  totalClasses: 320,
  totalCoursesCompleted: 45320,
  averageUserEngagement: 78,
  systemUptime: 99.98,
  activeUsers24h: 3200,
};

export const mockUsers: SystemUser[] = [
  {
    id: 'user-1',
    firstName: 'Emma',
    lastName: 'Schmidt',
    email: 'emma.schmidt@example.com',
    role: 'student',
    status: 'active',
    joinDate: '2025-01-15',
    lastLogin: '2026-03-28T14:30:00Z',
    schoolId: 'school-1',
  },
  {
    id: 'user-2',
    firstName: 'John',
    lastName: 'Johnson',
    email: 'john.johnson@example.com',
    role: 'teacher',
    status: 'active',
    joinDate: '2024-09-01',
    lastLogin: '2026-03-28T09:15:00Z',
    schoolId: 'school-1',
  },
  {
    id: 'user-3',
    firstName: 'Sarah',
    lastName: 'Schmidt',
    email: 'sarah.schmidt@example.com',
    role: 'parent',
    status: 'active',
    joinDate: '2025-01-10',
    lastLogin: '2026-03-27T18:45:00Z',
    schoolId: 'school-1',
  },
  {
    id: 'user-4',
    firstName: 'Michael',
    lastName: 'Mueller',
    email: 'michael.mueller@example.com',
    role: 'school',
    status: 'active',
    joinDate: '2024-06-01',
    lastLogin: '2026-03-28T08:00:00Z',
    schoolId: 'school-1',
  },
  {
    id: 'user-5',
    firstName: 'Lucas',
    lastName: 'Wagner',
    email: 'lucas.wagner@example.com',
    role: 'student',
    status: 'suspended',
    joinDate: '2025-02-01',
    lastLogin: '2026-03-15T10:30:00Z',
    schoolId: 'school-2',
  },
];

export const mockSchools: School[] = [
  {
    id: 'school-1',
    name: 'Gymnasium Berlin',
    address: 'Hauptstraße 123',
    city: 'Berlin',
    country: 'Germany',
    principalName: 'Dr. Hans Mueller',
    principalEmail: 'hans.mueller@gymnasium-berlin.de',
    studentCount: 850,
    teacherCount: 65,
    classCount: 32,
    status: 'active',
    joinDate: '2024-01-15',
    subscriptionPlan: 'enterprise',
    subscriptionEndDate: '2027-01-15',
  },
  {
    id: 'school-2',
    name: 'Realschule München',
    address: 'Schulstraße 456',
    city: 'München',
    country: 'Germany',
    principalName: 'Prof. Anna Schmidt',
    principalEmail: 'anna.schmidt@realschule-muenchen.de',
    studentCount: 620,
    teacherCount: 48,
    classCount: 24,
    status: 'active',
    joinDate: '2024-03-20',
    subscriptionPlan: 'premium',
    subscriptionEndDate: '2026-09-20',
  },
  {
    id: 'school-3',
    name: 'Grundschule Hamburg',
    address: 'Schulweg 789',
    city: 'Hamburg',
    country: 'Germany',
    principalName: 'Petra Wagner',
    principalEmail: 'petra.wagner@grundschule-hamburg.de',
    studentCount: 450,
    teacherCount: 35,
    classCount: 18,
    status: 'active',
    joinDate: '2024-05-10',
    subscriptionPlan: 'basic',
    subscriptionEndDate: '2026-05-10',
  },
];

export const mockActivityLogs: ActivityLog[] = [
  {
    id: 'log-1',
    userId: 'user-1',
    userName: 'Emma Schmidt',
    action: 'Quiz Completed',
    details: 'Completed quiz for lesson "Welcome to Minecraft Education" with score 100%',
    timestamp: '2026-03-28T14:30:00Z',
    ipAddress: '192.168.1.100',
    status: 'success',
  },
  {
    id: 'log-2',
    userId: 'user-2',
    userName: 'John Johnson',
    action: 'Grade Submitted',
    details: 'Submitted grade for student Emma Schmidt in Minecraft Coding',
    timestamp: '2026-03-28T09:15:00Z',
    ipAddress: '192.168.1.101',
    status: 'success',
  },
  {
    id: 'log-3',
    userId: 'user-3',
    userName: 'Sarah Schmidt',
    action: 'Course Purchased',
    details: 'Purchased Premium Package for child Emma Schmidt',
    timestamp: '2026-03-27T18:45:00Z',
    ipAddress: '192.168.1.102',
    status: 'success',
  },
  {
    id: 'log-4',
    userId: 'user-5',
    userName: 'Lucas Wagner',
    action: 'Failed Login Attempt',
    details: 'Multiple failed login attempts detected',
    timestamp: '2026-03-25T15:20:00Z',
    ipAddress: '192.168.1.103',
    status: 'failed',
  },
  {
    id: 'log-5',
    userId: 'user-4',
    userName: 'Michael Mueller',
    action: 'School Settings Updated',
    details: 'Updated school information and subscription plan',
    timestamp: '2026-03-28T08:00:00Z',
    ipAddress: '192.168.1.104',
    status: 'success',
  },
];

export const mockRevenueData: RevenueData[] = [
  { month: 'Jan', revenue: 45000, subscriptions: 120, coursesSold: 450 },
  { month: 'Feb', revenue: 52000, subscriptions: 135, coursesSold: 520 },
  { month: 'Mar', revenue: 48000, subscriptions: 125, coursesSold: 480 },
  { month: 'Apr', revenue: 61000, subscriptions: 150, coursesSold: 620 },
  { month: 'May', revenue: 58000, subscriptions: 145, coursesSold: 580 },
  { month: 'Jun', revenue: 72000, subscriptions: 180, coursesSold: 720 },
];

export const mockSystemAlerts: SystemAlert[] = [
  {
    id: 'alert-1',
    type: 'warning',
    title: 'High Server Load',
    message: 'Server CPU usage exceeded 85% in the last hour',
    timestamp: '2026-03-28T14:00:00Z',
    resolved: false,
  },
  {
    id: 'alert-2',
    type: 'info',
    title: 'Scheduled Maintenance',
    message: 'System maintenance scheduled for 2026-03-30 at 02:00 UTC',
    timestamp: '2026-03-28T10:00:00Z',
    resolved: false,
  },
  {
    id: 'alert-3',
    type: 'error',
    title: 'Database Backup Failed',
    message: 'Daily database backup failed. Manual intervention required.',
    timestamp: '2026-03-27T03:00:00Z',
    resolved: true,
  },
];

export const mockUserDistribution = [
  { name: 'Students', value: mockSystemStats.totalStudents, color: '#4f46e5' },
  { name: 'Teachers', value: mockSystemStats.totalTeachers, color: '#10b981' },
  { name: 'Parents', value: mockSystemStats.totalParents, color: '#f59e0b' },
];

export const mockEngagementData = [
  { name: 'Mon', engagement: 72 },
  { name: 'Tue', engagement: 78 },
  { name: 'Wed', engagement: 75 },
  { name: 'Thu', engagement: 82 },
  { name: 'Fri', engagement: 88 },
  { name: 'Sat', engagement: 65 },
  { name: 'Sun', engagement: 70 },
];

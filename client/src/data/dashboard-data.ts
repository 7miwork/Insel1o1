// Parent and Teacher Dashboard Data Structures

export interface StudentProgress {
  id: string;
  name: string;
  level: number;
  xp: number;
  totalXP: number;
  archipelagoProgress: {
    name: string;
    completed: number;
    total: number;
    percentage: number;
  }[];
}

export interface QuizAttempt {
  id: string;
  lessonId: number;
  lessonTitle: string;
  attemptNumber: number;
  date: string;
  score: number;
  answers: {
    questionId: number;
    question: string;
    studentAnswer: number;
    correctAnswer: number;
    isCorrect: boolean;
  }[];
  timeSpent: number; // in seconds
}

export interface StudentGrade {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  grade: number; // 0-100
  gradeLetterGrade: string; // A, B, C, D, F
  comment: string;
  date: string;
  givenBy: string;
}

export interface LessonPurchase {
  id: string;
  lessonId: number;
  lessonTitle: string;
  price: number;
  purchaseDate: string;
  accessLevel: 'basic' | 'premium' | 'advanced';
}

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  grade: string;
  avatar: string;
  joinDate: string;
  currentLevel: number;
  totalXP: number;
  averageGrade: number;
  quizAttempts: QuizAttempt[];
  grades: StudentGrade[];
  purchasedLessons: LessonPurchase[];
  lessonTimeSpent: {
    lessonId: number;
    lessonTitle: string;
    timeSpent: number; // in minutes
    attempts: number;
  }[];
  attendanceRate: number; // percentage
  lastActive: string;
}

export interface ClassStats {
  classId: string;
  className: string;
  studentCount: number;
  averageGrade: number;
  averageXP: number;
  topStudent: {
    name: string;
    xp: number;
  };
  lessonsCompleted: number;
  totalLessonsAssigned: number;
}

// Mock Parent Dashboard Data
export const mockParentChildren: ChildProfile[] = [
  {
    id: 'child-1',
    name: 'Emma Schmidt',
    age: 10,
    grade: '5th Grade',
    avatar: '👧',
    joinDate: '2025-01-15',
    currentLevel: 8,
    totalXP: 4250,
    averageGrade: 92,
    quizAttempts: [
      {
        id: 'quiz-1',
        lessonId: 1,
        lessonTitle: 'Welcome to Minecraft Education',
        attemptNumber: 1,
        date: '2026-03-25',
        score: 100,
        answers: [
          {
            questionId: 1,
            question: 'Which keys move your player character forward and backward?',
            studentAnswer: 0,
            correctAnswer: 0,
            isCorrect: true,
          },
          {
            questionId: 2,
            question: 'What does the say command do?',
            studentAnswer: 1,
            correctAnswer: 1,
            isCorrect: true,
          },
          {
            questionId: 3,
            question: 'Who does Codebuilder control?',
            studentAnswer: 1,
            correctAnswer: 1,
            isCorrect: true,
          },
        ],
        timeSpent: 1800,
      },
      {
        id: 'quiz-2',
        lessonId: 2,
        lessonTitle: 'Basic Commands for the Agent',
        attemptNumber: 1,
        date: '2026-03-26',
        score: 67,
        answers: [
          {
            questionId: 1,
            question: 'What does move(FORWARD, 5) do?',
            studentAnswer: 0,
            correctAnswer: 1,
            isCorrect: false,
          },
          {
            questionId: 2,
            question: 'Which command destroys a block?',
            studentAnswer: 2,
            correctAnswer: 2,
            isCorrect: true,
          },
          {
            questionId: 3,
            question: 'What is the Agent?',
            studentAnswer: 1,
            correctAnswer: 1,
            isCorrect: true,
          },
        ],
        timeSpent: 2100,
      },
      {
        id: 'quiz-3',
        lessonId: 2,
        lessonTitle: 'Basic Commands for the Agent',
        attemptNumber: 2,
        date: '2026-03-27',
        score: 100,
        answers: [
          {
            questionId: 1,
            question: 'What does move(FORWARD, 5) do?',
            studentAnswer: 1,
            correctAnswer: 1,
            isCorrect: true,
          },
          {
            questionId: 2,
            question: 'Which command destroys a block?',
            studentAnswer: 2,
            correctAnswer: 2,
            isCorrect: true,
          },
          {
            questionId: 3,
            question: 'What is the Agent?',
            studentAnswer: 1,
            correctAnswer: 1,
            isCorrect: true,
          },
        ],
        timeSpent: 1500,
      },
    ],
    grades: [
      {
        id: 'grade-1',
        studentId: 'child-1',
        studentName: 'Emma Schmidt',
        subject: 'Minecraft Coding',
        grade: 95,
        gradeLetterGrade: 'A',
        comment: 'Excellent progress! Emma is mastering the concepts quickly.',
        date: '2026-03-28',
        givenBy: 'Mr. Johnson',
      },
      {
        id: 'grade-2',
        studentId: 'child-1',
        studentName: 'Emma Schmidt',
        subject: 'Minecraft Coding',
        grade: 88,
        gradeLetterGrade: 'B+',
        comment: 'Good understanding of loops. Keep practicing nested loops.',
        date: '2026-03-20',
        givenBy: 'Mr. Johnson',
      },
    ],
    purchasedLessons: [
      {
        id: 'purchase-1',
        lessonId: 1,
        lessonTitle: 'Welcome to Minecraft Education',
        price: 0,
        purchaseDate: '2026-01-15',
        accessLevel: 'basic',
      },
    ],
    lessonTimeSpent: [
      {
        lessonId: 1,
        lessonTitle: 'Welcome to Minecraft Education',
        timeSpent: 30,
        attempts: 1,
      },
      {
        lessonId: 2,
        lessonTitle: 'Basic Commands for the Agent',
        timeSpent: 35,
        attempts: 2,
      },
      {
        lessonId: 3,
        lessonTitle: 'Build a Simple Path',
        timeSpent: 28,
        attempts: 1,
      },
    ],
    attendanceRate: 95,
    lastActive: '2026-03-28T14:30:00Z',
  },
  {
    id: 'child-2',
    name: 'Lucas Schmidt',
    age: 8,
    grade: '3rd Grade',
    avatar: '👦',
    joinDate: '2025-02-01',
    currentLevel: 5,
    totalXP: 2100,
    averageGrade: 85,
    quizAttempts: [
      {
        id: 'quiz-4',
        lessonId: 1,
        lessonTitle: 'Welcome to Minecraft Education',
        attemptNumber: 1,
        date: '2026-03-24',
        score: 67,
        answers: [
          {
            questionId: 1,
            question: 'Which keys move your player character forward and backward?',
            studentAnswer: 1,
            correctAnswer: 0,
            isCorrect: false,
          },
          {
            questionId: 2,
            question: 'What does the say command do?',
            studentAnswer: 1,
            correctAnswer: 1,
            isCorrect: true,
          },
          {
            questionId: 3,
            question: 'Who does Codebuilder control?',
            studentAnswer: 0,
            correctAnswer: 1,
            isCorrect: false,
          },
        ],
        timeSpent: 2400,
      },
    ],
    grades: [
      {
        id: 'grade-3',
        studentId: 'child-2',
        studentName: 'Lucas Schmidt',
        subject: 'Minecraft Coding',
        grade: 85,
        gradeLetterGrade: 'B',
        comment: 'Good effort! Lucas is learning well but needs more practice.',
        date: '2026-03-25',
        givenBy: 'Mr. Johnson',
      },
    ],
    purchasedLessons: [],
    lessonTimeSpent: [
      {
        lessonId: 1,
        lessonTitle: 'Welcome to Minecraft Education',
        timeSpent: 40,
        attempts: 1,
      },
    ],
    attendanceRate: 88,
    lastActive: '2026-03-27T10:15:00Z',
  },
];

// Mock Teacher Dashboard Data
export const mockTeacherClasses: ClassStats[] = [
  {
    classId: 'class-1',
    className: '5th Grade - Room A',
    studentCount: 24,
    averageGrade: 87,
    averageXP: 3500,
    topStudent: {
      name: 'Emma Schmidt',
      xp: 4250,
    },
    lessonsCompleted: 3,
    totalLessonsAssigned: 5,
  },
  {
    classId: 'class-2',
    className: '5th Grade - Room B',
    studentCount: 22,
    averageGrade: 84,
    averageXP: 3200,
    topStudent: {
      name: 'John Doe',
      xp: 4100,
    },
    lessonsCompleted: 2,
    totalLessonsAssigned: 5,
  },
];

export const mockTeacherStudents: ChildProfile[] = [
  mockParentChildren[0], // Emma Schmidt
  mockParentChildren[1], // Lucas Schmidt
  {
    id: 'student-3',
    name: 'Sophie Mueller',
    age: 10,
    grade: '5th Grade',
    avatar: '👧',
    joinDate: '2025-01-20',
    currentLevel: 7,
    totalXP: 3800,
    averageGrade: 90,
    quizAttempts: [],
    grades: [
      {
        id: 'grade-4',
        studentId: 'student-3',
        studentName: 'Sophie Mueller',
        subject: 'Minecraft Coding',
        grade: 90,
        gradeLetterGrade: 'A-',
        comment: 'Excellent work! Sophie shows great understanding.',
        date: '2026-03-26',
        givenBy: 'Mr. Johnson',
      },
    ],
    purchasedLessons: [],
    lessonTimeSpent: [],
    attendanceRate: 100,
    lastActive: '2026-03-28T15:45:00Z',
  },
  {
    id: 'student-4',
    name: 'Michael Wagner',
    age: 10,
    grade: '5th Grade',
    avatar: '👦',
    joinDate: '2025-01-18',
    currentLevel: 6,
    totalXP: 3200,
    averageGrade: 78,
    quizAttempts: [],
    grades: [
      {
        id: 'grade-5',
        studentId: 'student-4',
        studentName: 'Michael Wagner',
        subject: 'Minecraft Coding',
        grade: 78,
        gradeLetterGrade: 'C+',
        comment: 'Michael needs to focus more on understanding the concepts.',
        date: '2026-03-25',
        givenBy: 'Mr. Johnson',
      },
    ],
    purchasedLessons: [],
    lessonTimeSpent: [],
    attendanceRate: 75,
    lastActive: '2026-03-26T12:00:00Z',
  },
];

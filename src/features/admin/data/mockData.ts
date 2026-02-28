// Mock Data for Webstar Game App Admin Panel

export interface Category {
  id: string;
  title: string;
  image?: string;
  createdAt: string;
}

export interface QuizRule {
  id: string;
  minPercent: number;
  maxPercent: number;
  score: number;
  badge: 'gold' | 'silver' | 'bronze' | 'none';
  stars: number;
}

export interface Quiz {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  quizCount: number;
  quizTime: string;
  maxBall: number;
  maxStars: number;
  order: number;
  rules: QuizRule[];
  createdAt: string;
}

export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  categoryId: string;
  question: string;
  choices: Choice[];
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'teacher' | 'student';
  isActive: boolean;
  createdAt: string;
}

export interface Teacher {
  id: string;
  fullName: string;
  avatar?: string;
  userId: string;
  createdAt: string;
}

export interface Group {
  id: string;
  teacherId: string;
  name: string;
  studentIds: string[];
  createdAt: string;
}

// Categories
export const categories: Category[] = [
  { id: '1', title: 'Mathematics', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=200', createdAt: '2024-01-15' },
  { id: '2', title: 'Science', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=200', createdAt: '2024-01-16' },
  { id: '3', title: 'History', image: 'https://images.unsplash.com/photo-1461360370896-922624d12a74?w=200', createdAt: '2024-01-17' },
  { id: '4', title: 'Geography', image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=200', createdAt: '2024-01-18' },
  { id: '5', title: 'English', createdAt: '2024-01-19' },
  { id: '6', title: 'Programming', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200', createdAt: '2024-01-20' },
  { id: '7', title: 'Art', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200', createdAt: '2024-01-21' },
  { id: '8', title: 'Music', createdAt: '2024-01-22' },
];

// Quizzes
export const quizzes: Quiz[] = [
  {
    id: '1',
    categoryId: '1',
    title: 'Basic Algebra',
    description: 'Test your algebra fundamentals with equations and expressions',
    quizCount: 20,
    quizTime: '00:30',
    maxBall: 100,
    maxStars: 5,
    order: 1,
    rules: [
      { id: '1', minPercent: 0, maxPercent: 40, score: 0, badge: 'none', stars: 0 },
      { id: '2', minPercent: 41, maxPercent: 60, score: 50, badge: 'bronze', stars: 2 },
      { id: '3', minPercent: 61, maxPercent: 80, score: 75, badge: 'silver', stars: 3 },
      { id: '4', minPercent: 81, maxPercent: 100, score: 100, badge: 'gold', stars: 5 },
    ],
    createdAt: '2024-01-20',
  },
  {
    id: '2',
    categoryId: '1',
    title: 'Geometry Basics',
    description: 'Explore shapes, angles, and spatial reasoning',
    quizCount: 15,
    quizTime: '00:25',
    maxBall: 75,
    maxStars: 5,
    order: 2,
    rules: [
      { id: '1', minPercent: 0, maxPercent: 50, score: 0, badge: 'none', stars: 0 },
      { id: '2', minPercent: 51, maxPercent: 75, score: 50, badge: 'bronze', stars: 2 },
      { id: '3', minPercent: 76, maxPercent: 100, score: 100, badge: 'gold', stars: 5 },
    ],
    createdAt: '2024-01-21',
  },
  {
    id: '3',
    categoryId: '2',
    title: 'Physics Fundamentals',
    description: 'Motion, forces, and energy concepts',
    quizCount: 25,
    quizTime: '00:45',
    maxBall: 120,
    maxStars: 5,
    order: 1,
    rules: [
      { id: '1', minPercent: 0, maxPercent: 40, score: 0, badge: 'none', stars: 0 },
      { id: '2', minPercent: 41, maxPercent: 70, score: 60, badge: 'silver', stars: 3 },
      { id: '3', minPercent: 71, maxPercent: 100, score: 100, badge: 'gold', stars: 5 },
    ],
    createdAt: '2024-01-22',
  },
  {
    id: '4',
    categoryId: '3',
    title: 'World War II',
    description: 'Key events and figures of the Second World War',
    quizCount: 30,
    quizTime: '00:40',
    maxBall: 150,
    maxStars: 5,
    order: 1,
    rules: [
      { id: '1', minPercent: 0, maxPercent: 50, score: 0, badge: 'none', stars: 0 },
      { id: '2', minPercent: 51, maxPercent: 100, score: 100, badge: 'gold', stars: 5 },
    ],
    createdAt: '2024-01-23',
  },
  {
    id: '5',
    categoryId: '6',
    title: 'JavaScript Basics',
    description: 'Variables, functions, and DOM manipulation',
    quizCount: 20,
    quizTime: '00:35',
    maxBall: 100,
    maxStars: 5,
    order: 1,
    rules: [
      { id: '1', minPercent: 0, maxPercent: 30, score: 0, badge: 'none', stars: 0 },
      { id: '2', minPercent: 31, maxPercent: 50, score: 30, badge: 'bronze', stars: 1 },
      { id: '3', minPercent: 51, maxPercent: 80, score: 70, badge: 'silver', stars: 3 },
      { id: '4', minPercent: 81, maxPercent: 100, score: 100, badge: 'gold', stars: 5 },
    ],
    createdAt: '2024-01-24',
  },
];

// Questions
export const questions: Question[] = [
  {
    id: '1',
    categoryId: '1',
    question: 'What is the value of x in 2x + 5 = 15?',
    choices: [
      { id: '1', text: 'x = 5', isCorrect: true },
      { id: '2', text: 'x = 10', isCorrect: false },
      { id: '3', text: 'x = 7', isCorrect: false },
      { id: '4', text: 'x = 3', isCorrect: false },
    ],
    createdAt: '2024-01-20',
  },
  {
    id: '2',
    categoryId: '1',
    question: 'What is the square root of 144?',
    choices: [
      { id: '1', text: '10', isCorrect: false },
      { id: '2', text: '12', isCorrect: true },
      { id: '3', text: '14', isCorrect: false },
      { id: '4', text: '16', isCorrect: false },
    ],
    createdAt: '2024-01-21',
  },
  {
    id: '3',
    categoryId: '2',
    question: 'What is the chemical symbol for Gold?',
    choices: [
      { id: '1', text: 'Go', isCorrect: false },
      { id: '2', text: 'Gd', isCorrect: false },
      { id: '3', text: 'Au', isCorrect: true },
      { id: '4', text: 'Ag', isCorrect: false },
    ],
    createdAt: '2024-01-22',
  },
  {
    id: '4',
    categoryId: '3',
    question: 'In which year did World War II end?',
    choices: [
      { id: '1', text: '1943', isCorrect: false },
      { id: '2', text: '1944', isCorrect: false },
      { id: '3', text: '1945', isCorrect: true },
      { id: '4', text: '1946', isCorrect: false },
    ],
    createdAt: '2024-01-23',
  },
  {
    id: '5',
    categoryId: '6',
    question: 'Which keyword is used to declare a variable in JavaScript?',
    choices: [
      { id: '1', text: 'var', isCorrect: false },
      { id: '2', text: 'let', isCorrect: false },
      { id: '3', text: 'const', isCorrect: false },
      { id: '4', text: 'All of the above', isCorrect: true },
    ],
    createdAt: '2024-01-24',
  },
];

// Users
export const users: User[] = [
  { id: '1', email: 'admin@webstar.com', password: '****', role: 'admin', isActive: true, createdAt: '2024-01-01' },
  { id: '2', email: 'teacher1@webstar.com', password: '****', role: 'teacher', isActive: true, createdAt: '2024-01-05' },
  { id: '3', email: 'teacher2@webstar.com', password: '****', role: 'teacher', isActive: true, createdAt: '2024-01-06' },
  { id: '4', email: 'student1@webstar.com', password: '****', role: 'student', isActive: true, createdAt: '2024-01-10' },
  { id: '5', email: 'student2@webstar.com', password: '****', role: 'student', isActive: true, createdAt: '2024-01-11' },
  { id: '6', email: 'student3@webstar.com', password: '****', role: 'student', isActive: false, createdAt: '2024-01-12' },
  { id: '7', email: 'student4@webstar.com', password: '****', role: 'student', isActive: true, createdAt: '2024-01-13' },
  { id: '8', email: 'teacher3@webstar.com', password: '****', role: 'teacher', isActive: false, createdAt: '2024-01-14' },
];

// Teachers
export const teachers: Teacher[] = [
  { id: '1', fullName: 'Dr. Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', userId: '2', createdAt: '2024-01-05' },
  { id: '2', fullName: 'Prof. Michael Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', userId: '3', createdAt: '2024-01-06' },
  { id: '3', fullName: 'Ms. Emily Brown', userId: '8', createdAt: '2024-01-14' },
];

// Groups
export const groups: Group[] = [
  { id: '1', teacherId: '1', name: 'Math 101 - Morning', studentIds: ['4', '5'], createdAt: '2024-01-15' },
  { id: '2', teacherId: '1', name: 'Math 101 - Afternoon', studentIds: ['6', '7'], createdAt: '2024-01-16' },
  { id: '3', teacherId: '2', name: 'Science Advanced', studentIds: ['4', '6', '7'], createdAt: '2024-01-17' },
  { id: '4', teacherId: '2', name: 'Programming Basics', studentIds: ['5', '7'], createdAt: '2024-01-18' },
];

// Helper functions
export const getCategoryById = (id: string) => categories.find(c => c.id === id);
export const getTeacherById = (id: string) => teachers.find(t => t.id === id);
export const getUserById = (id: string) => users.find(u => u.id === id);
export const getStudents = () => users.filter(u => u.role === 'student');

// Mock data for admin dashboard

export interface Category {
  id: string;
  title: string;
  description: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Quiz {
  id: string;
  title: string;
  categoryId: string;
  quizCount: number;
  maxStars: number;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Question {
  id: string;
  text: string;
  quizId: string;
  options?: string[];
  correctAnswer?: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  isActive: boolean;
  totalBall?: number;
  groupId?: string;
  createdAt?: string;
}

export interface Teacher {
  id: string;
  fullName: string;
  email: string;
  role: 'teacher';
  isActive: boolean;
  specialization?: string;
  createdAt?: string;
}

export interface Group {
  id: string;
  name: string;
  studentIds: string[];
  teacherId: string;
  description?: string;
  createdAt?: string;
}

export const categories: Category[] = [
  { id: '1', title: 'JavaScript Basics', description: 'Learn JS fundamentals', image: '' },
  { id: '2', title: 'React Fundamentals', description: 'Master React', image: '' },
  { id: '3', title: 'TypeScript', description: 'Type-safe coding', image: '' },
  { id: '4', title: 'Node.js', description: 'Backend development', image: '' },
];

export const quizzes: Quiz[] = [
  { id: '1', title: 'JS Variables & Types', categoryId: '1', quizCount: 10, maxStars: 3, description: 'Test your knowledge of JavaScript variables' },
  { id: '2', title: 'React Hooks', categoryId: '2', quizCount: 15, maxStars: 3, description: 'Master React Hooks' },
  { id: '3', title: 'TS Interfaces', categoryId: '3', quizCount: 12, maxStars: 3, description: 'Learn TypeScript interfaces' },
  { id: '4', title: 'Express.js Basics', categoryId: '4', quizCount: 8, maxStars: 3, description: 'Backend with Express' },
  { id: '5', title: 'Async JavaScript', categoryId: '1', quizCount: 20, maxStars: 3, description: 'Async programming patterns' },
];

export const questions: Question[] = [
  { id: '1', text: 'What is a variable?', quizId: '1', options: ['A', 'B', 'C', 'D'], correctAnswer: 'A' },
  { id: '2', text: 'What is useState?', quizId: '2', options: ['A', 'B', 'C', 'D'], correctAnswer: 'B' },
  { id: '3', text: 'What is an interface?', quizId: '3', options: ['A', 'B', 'C', 'D'], correctAnswer: 'C' },
];

export const users: User[] = [
  { id: '1', fullName: 'Student One', email: 'student1@test.com', role: 'student', isActive: true, totalBall: 150, groupId: '1' },
  { id: '2', fullName: 'Student Two', email: 'student2@test.com', role: 'student', isActive: true, totalBall: 200, groupId: '1' },
  { id: '3', fullName: 'Student Three', email: 'student3@test.com', role: 'student', isActive: false, totalBall: 50, groupId: '1' },
  { id: '4', fullName: 'Student Four', email: 'student4@test.com', role: 'student', isActive: true, totalBall: 300, groupId: '2' },
  { id: '5', fullName: 'Student Five', email: 'student5@test.com', role: 'student', isActive: true, totalBall: 175, groupId: '2' },
];

export const teachers: Teacher[] = [
  { id: '1', fullName: 'Teacher One', email: 'teacher1@test.com', role: 'teacher', isActive: true, specialization: 'JavaScript' },
  { id: '2', fullName: 'Teacher Two', email: 'teacher2@test.com', role: 'teacher', isActive: true, specialization: 'React' },
];

export const groups: Group[] = [
  { id: '1', name: 'Group A', studentIds: ['1', '2', '3'], teacherId: '1', description: 'Beginner group' },
  { id: '2', name: 'Group B', studentIds: ['4', '5'], teacherId: '2', description: 'Advanced group' },
];

export const ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        ME: '/auth/me',
    },
    USERS: {
        LIST: '/users',
        DETAIL: (id: string) => `/users/${id}`,
        CREATE: '/users',
        UPDATE: (id: string) => `/users/${id}`,
        DELETE: (id: string) => `/users/${id}`,
    },
    GROUPS: {
        LIST: '/groups',
        DETAIL: (id: string) => `/groups/${id}`,
        CREATE: '/groups',
        UPDATE: (id: string) => `/groups/${id}`,
        DELETE: (id: string) => `/groups/${id}`,
    },
    CATEGORIES: {
        LIST: '/categories',
        DETAIL: (id: string) => `/categories/${id}`,
        CREATE: '/categories',
        UPDATE: (id: string) => `/categories/${id}`,
        DELETE: (id: string) => `/categories/${id}`,
    },
    QUIZZES: {
        LIST: '/quizzes',
        DETAIL: (id: string) => `/quizzes/${id}`,
        CREATE: '/quizzes',
        UPDATE: (id: string) => `/quizzes/${id}`,
        DELETE: (id: string) => `/quizzes/${id}`,
    },
    QUESTIONS: {
        LIST: (id: string) => `/questions?categoryId=${id}`,
        DETAIL: (id: string) => `/questions/${id}`,
        CREATE: '/questions',
        UPDATE: (id: string) => `/questions/${id}`,
        DELETE: (id: string) => `/questions/${id}`,
    },
    GAME: {
        STUDENT_ATTEMPTS: (studentId: string) => `/game/student/${studentId}`,
        CREATE_ATTEMPT: '/game',
        DELETE_ATTEMPT: (id: string) => `/game/${id}`,
    },
    LEADERBOARD: {
        LIST: '/leaderboard',
        STUDENT_RANK: (studentId: string) => `/leaderboard/student/${studentId}`,
    },
    PROGRESS: {
        STUDENT: (studentId: string) => `/progress/student/${studentId}`,
    },
};

export interface QuizRule {
    minPercent: number;
    maxPercent: number;
    score: number;
    badge: string;
    stars: number;
    _id?: string;
}

export interface QuizCategory {
    _id: string;
    title: string;
    image?: string;
}

export interface Quiz {
    _id: string;
    categoryId: QuizCategory;
    title: string;
    description: string;
    quizCount: number;
    quizTime: string;
    maxBall: number;
    maxStars: number;
    order: number;
    rule: QuizRule[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface QuizCreateRequest {
    categoryId: string;
    title: string;
    description: string;
    quizCount: number;
    quizTime: string;
    maxBall: number;
    maxStars: number;
    order: number;
    rule: QuizRule[];
}

export interface QuizModifyRequest {
    categoryId?: string;
    title?: string;
    description?: string;
    quizCount?: number;
    quizTime?: string;
    maxBall?: number;
    maxStars?: number;
    order?: number;
    rule?: QuizRule[];
    isActive?: boolean;
}

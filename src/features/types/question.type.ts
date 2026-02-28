export interface Choice {
  text?: string;
  isCorrect?: boolean;
  _id?: string;
}

export interface QuestionCategory {
  _id: string;
  title: string;
}

export interface Question {
  _id: string;
  categoryId: QuestionCategory;
  question: string;
  choices: Choice[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface QuestionCreateRequest {
  categoryId?: string;
  question?: string;
  choices?: Choice[],
}

export interface QuestionModifyRequest {
    categoryId?: string;
    question?: string;
    choices?: Choice[]
}
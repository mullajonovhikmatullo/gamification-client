export interface Category {
  _id: string;
  title: string;
  image: string;
  quizCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryCreateRequest {
  title?: string;
  image?: string;
  isActive?: boolean;
}

export interface CategoryModifyRequest {
  title?: string;
  image?: string;
  isActive?: boolean;
}

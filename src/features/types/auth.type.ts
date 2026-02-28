import {Role, User} from "@/features/api";

export interface LoginRequest {
    email?: string;
    password?: string;
}

export interface LoginResponse {
    user: {
        id: string;
        email: string;
        fullName: string;
        role: Role;
    };
    token: string;
    success: boolean;
}

// export interface MeRequest {}

export interface MeResponse {
    success: boolean;
    user: User;
}
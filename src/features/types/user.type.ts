import type {Role} from "./vo/role.type.ts";

export interface User {
    _id: string;
    email: string;
    fullName: string;
    role: Role;
    isActive: boolean;
    totalBall: number;
}

export interface UserRegisterRequest {
    email: string;
    password: string;
    fullName: string;
    role: Role;
    groupId?: string;
}

export interface UserModifyRequest {
    email?: string;
    password?: string;
    fullName?: string;
    role?: Role;
    isActive?: boolean;
    groupId?: string;
}
export interface Group {
    _id: string;
    name: string;
    teacherId: {
        _id: string;
        email: string;
        fullName: string;
    };
    studentIds: string[];
    isActive: boolean;
}

export interface GroupRegisterRequest {
    name: string;
    teacherId: string;
}

export interface GroupModifyRequest {
    name?: string;
    teacherId?: string;
}
export interface Leaderboard {
    rank: number;
    studentId: string;
    fullName: string;
    email: string;
    totalBall: number;
}

export interface LeaderboardGlobalResponse {
    success: boolean;
    leaderboard: Leaderboard[];
    pagination: {
        total: number,
        page: number,
        pages: number,
        limit: number
    }
}

export interface LeaderboardInGroupResponse {
    success: boolean;
    groupId: string;
    groupName: string;
    leaderboard: Leaderboard[];
}

export interface StudentRankResponse {
    success: boolean,
    student: {
        id: string,
        fullName: string,
        email: string,
        totalBall: number
    },
    rankings: {
        global: {
            rank: number,
            total: number,
            percentile: number
        }
    }
}
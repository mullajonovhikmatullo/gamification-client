import {RouteObject} from "react-router-dom";
import {StudentLayout} from "@/features/student/components/layout/StudentLayout";
import {Index} from "@/features/student/pages/quiz";
import {QuizDetail} from "@/features/student/pages/quiz/detail/QuizDetail.tsx";
import {LeaderboardPage} from "@/features/student/pages/leaderboard";
import {DashboardPage} from "@/features/student/pages/dashboard";
import {AchievementsPage} from "@/features/student/pages/achievements";

export const studentRouter: RouteObject = {
    path: "/student",
    element: <StudentLayout/>,
    children: [
        {
            index: true,
            element: <DashboardPage/>,
        },

        {
            path: "quizzes",
            children: [
                {index: true, element: <Index/>},
                {path: ":id", element: <QuizDetail/>},
            ],
        },

        {
            path: "leaderboard",
            element: <LeaderboardPage/>,
        },

        {
            path: "achievements",
            element: <AchievementsPage/>,
        },
    ],
};

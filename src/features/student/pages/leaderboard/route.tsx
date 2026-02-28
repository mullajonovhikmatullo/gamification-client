import {RouteObject} from "react-router-dom";
import ProtectedRoute from "@/components/routes/ProtectedRoute.tsx";
import Leaderboard from "@/features/student/pages/leaderboard/view/Leaderboard.tsx";

export const route: RouteObject = {
    path: 'leaderboard',
    handle: {
        title: 'Leaderboard'
    },
    children: [
        {
            path: '',
            element: <ProtectedRoute>
                <Leaderboard />
            </ProtectedRoute>
        }
    ],
}
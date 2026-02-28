import {RouteObject} from "react-router-dom";
import Achievements from "@/features/student/pages/achievements/view/Achievements.tsx";
import ProtectedRoute from "@/components/routes/ProtectedRoute.tsx";

export const route: RouteObject = {
    path: 'achievements',
    handle: {
        title: 'Achievements'
    },
    children: [
        {
            path: '',
            element: <ProtectedRoute>
                <Achievements />
            </ProtectedRoute>
        }
    ],
}
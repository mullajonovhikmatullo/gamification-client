import {RouteObject} from "react-router-dom";
import ProtectedRoute from "@/components/routes/ProtectedRoute.tsx";
import Dashboard from "@/features/student/pages/dashboard/view/Dashboard.tsx";

export const route: RouteObject = {
    path: 'dashboard',
    handle: {
        title: 'Dashboard'
    },
    children: [
        {
            path: '',
            element: <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        }
    ],
}
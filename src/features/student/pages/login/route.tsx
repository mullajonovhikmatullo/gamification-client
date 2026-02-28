import {RouteObject} from "react-router-dom";
import PublicRoute from "@/components/routes/PublicRoute.tsx";
import LoginPage from "@/features/student/pages/login/index.tsx";

export const route: RouteObject = {
    path: 'auth',
    handle: {
        title: 'Login'
    },
    children: [
        {
            path: "login",
            element: <PublicRoute>
                <LoginPage />
            </PublicRoute>
        }
    ],
}
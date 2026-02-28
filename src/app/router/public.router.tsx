import { RouteObject, Outlet } from "react-router-dom";
import LoginPage from "@/features/student/pages/login";

export const publicRouter: RouteObject = {
    path: "/",
    element: <Outlet />,
    children: [
        {
            index: true,
            element: <LoginPage />,
        },
    ],
};

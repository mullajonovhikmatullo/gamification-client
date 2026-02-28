import { createBrowserRouter } from "react-router-dom";
import { publicRouter } from "./public.router";
import { adminRouter } from "./admin.router";
import { studentRouter } from "./student.router";
import { RoleGuard } from "@/app/providers/RoleGuard";
import { PublicRoute } from "@/app/providers/PublicRoute";
import NotFoundPage from "@/features/shared/NotFound";

export const browserRouter = createBrowserRouter([
    {
        ...publicRouter,
        element: (
            <PublicRoute>
                {publicRouter.element}
            </PublicRoute>
        ),
    },

    {
        ...adminRouter,
        element: (
            <RoleGuard allow={["admin"]}>
                {adminRouter.element}
            </RoleGuard>
        ),
    },

    {
        ...studentRouter,
        element: (
            <RoleGuard allow={["student"]}>
                {studentRouter.element}
            </RoleGuard>
        ),
    },

    {
        path: "*",
        element: <NotFoundPage />,
    },
]);

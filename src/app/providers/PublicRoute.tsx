import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/app/providers/AuthProvider.tsx";
import { useMe } from "@/features/student/hooks";
import { Role } from "@/features/api";

interface PublicRouteProps {
    children: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const { isAuthenticated, currentUser } = useAuthContext();
    const { currentUserIsLoading } = useMe();

    // Show loading state while checking authentication
    if (currentUserIsLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Yuklanmoqda...</p>
                </div>
            </div>
        );
    }

    // If authenticated, redirect based on role
    if (isAuthenticated && currentUser) {
        switch (currentUser.role) {
            case Role.ADMIN:
                return <Navigate to="/admin" replace />;
            case Role.TEACHER:
                return <Navigate to="/teacher" replace />;
            case Role.STUDENT:
                return <Navigate to="/student" replace />;
            default:
                return <Navigate to="/student" replace />;
        }
    }

    // Allow unauthenticated users to view public pages
    return <>{children}</>;
};

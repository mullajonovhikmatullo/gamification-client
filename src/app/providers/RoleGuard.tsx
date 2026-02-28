import {Navigate} from "react-router-dom";
import {useAuthContext} from "@/app/providers/AuthProvider.tsx";
import {useMe} from "@/features/student/hooks";

interface Props {
    allow: Array<"admin" | "teacher" | "student">;
    children: React.ReactNode;
}

export const RoleGuard: React.FC<Props> = ({allow, children}) => {
    const {currentUser, isAuthenticated} = useAuthContext();
    const {currentUserIsLoading} = useMe();

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

    if (!isAuthenticated) {
        return <Navigate to="/" replace/>;
    }

    if (!currentUser || !allow.includes(currentUser.role)) {
        return <Navigate to="/" replace/>;
    }

    return <>{children}</>;
};

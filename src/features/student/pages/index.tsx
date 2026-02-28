import {Navigate} from 'react-router-dom';
import {useAuthContext} from '@/features/student/hooks/useAuthContext.ts';

export const IndexPage = () => {
    const {isAuthenticated} = useAuthContext();

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Navigate to="/auth/login" replace />;
};

import React, {createContext, useContext, useEffect, useState, useRef} from "react";
import {useMe} from "@/features/student/hooks";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    currentUser;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    //
    const {currentUser, currentUserIsLoading, error} = useMe();

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        // Initialize based on token presence to prevent redirects on page refresh
        return !!localStorage.getItem('token');
    });

    const login = (token: string) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        window.location.href = '/';
    };

    useEffect(() => {
        if (currentUser) {
            setIsAuthenticated(true);
        } else if (error) {
            // If there's an error (e.g., 401 Unauthorized), clear auth state
            setIsAuthenticated(false);
            localStorage.removeItem('token');
        } else if (!currentUserIsLoading) {
            // Only set to false if we're done loading and there's no user
            const hasToken = !!localStorage.getItem('token');
            setIsAuthenticated(hasToken);
        }
    }, [currentUser, currentUserIsLoading, error]);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                logout,
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};

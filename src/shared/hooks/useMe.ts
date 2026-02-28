import {AuthSeekApi} from "@/features/api";
import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";

export const useMe = () => {
    const {queryKey, queryFn} = AuthSeekApi.fetch.getMe();

    const [hasToken, setHasToken] = useState(() => !!localStorage.getItem('token'));

    useEffect(() => {
        // Update hasToken state when localStorage changes
        const checkToken = () => {
            setHasToken(!!localStorage.getItem('token'));
        };

        // Check immediately
        checkToken();

        // Listen for storage events (when token changes in another tab)
        window.addEventListener('storage', checkToken);

        // Set up interval to check for token changes
        const interval = setInterval(checkToken, 100);

        return () => {
            window.removeEventListener('storage', checkToken);
            clearInterval(interval);
        };
    }, []);

    const {data, isLoading, refetch, error} = useQuery({
        queryKey,
        queryFn,
        enabled: hasToken, // Only run query if token exists
        retry: false, // Don't retry if request fails
        refetchOnWindowFocus: false,
    });

    return {
        currentUser: data,
        currentUserIsLoading: isLoading || (hasToken && !data && !error), // Show loading if fetching OR if we have token but no data yet
        refetch,
        error
    }
}
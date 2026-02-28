import {ENDPOINTS, httpClient, MeResponse} from "@/features";


const getMe = async () => {
    const response = await httpClient.get<MeResponse>(ENDPOINTS.AUTH.ME);
    return response.data;
};

export default {
    getMe,

    fetch: {
        getMe: () => ({
            queryKey: ['auth/cm', 'getMe'],
            queryFn: async () => {
                const result = await getMe();
                return result?.user;
            },
        }),
    },
};
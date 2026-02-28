import {User, ENDPOINTS, httpClient} from "@/features";

const getAllUsers = async () => {
    const response = await httpClient.get(ENDPOINTS.USERS.LIST);
    return response.data.data;
}

const getUserById = async (id: string) => {
    const response = await httpClient.get(ENDPOINTS.USERS.DETAIL(id));
    return response.data.data;
}

export default {
    getAllUsers,
    getUserById,

    fetch: {
        getAllUsers: () => ({
            queryKey: ['users/cm', 'getAllUsers'],
            queryFn: async () => {
                const result = await getAllUsers();
                return result;
            },
        }),
        getUserById: (id: string) => ({
            queryKey: ['users/cm', 'getUserById', id],
            queryFn: async () => {
                const result = await getUserById(id);
                return result;
            }
        })
    },
};

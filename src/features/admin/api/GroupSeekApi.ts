import {Group, ENDPOINTS, httpClient} from "@/features";

const getAllGroups = async () => {
    const response = await httpClient.get(ENDPOINTS.GROUPS.LIST);
    return response.data.data;
}

const getGroupById = async (id: string) => {
    const response = await httpClient.get(ENDPOINTS.GROUPS.DETAIL(id));
    return response.data.data;
}

export default {
    getAllGroups,
    getGroupById,

    fetch: {
        getAllGroups: () => ({
            queryKey: ['groups/cm', 'getAllGroups'],
            queryFn: async () => {
                const result = await getAllGroups();
                return result;
            },
        }),
        getGroupById: (id: string) => ({
            queryKey: ['groups/cm', 'getGroupById', id],
            queryFn: async () => {
                const result = await getGroupById(id);
                return result;
            }
        })
    },
};

import {Category, ENDPOINTS, httpClient} from "@/features";

const getAllCategories = async () => {
    const response = await httpClient.get(ENDPOINTS.CATEGORIES.LIST);
    return response.data.data;
}

const getCategoryById = async (id: string) => {
    const response = await httpClient.get(ENDPOINTS.CATEGORIES.DETAIL(id));
    return response.data.data;
}

export default {
    getAllCategories,

    fetch: {
        getAllCategories: () => ({
            queryKey: ['categories/cm', 'getAllCategories'],
            queryFn: async () => {
                const result = await getAllCategories();
                return result;
            },
        }),
        getCategoryById: (params: { id: string }) => ({
            queryKey: ['categories/cm', 'getCategoryById', params],
            queryFn: async () => {
                const result = await getCategoryById(params.id);
                return result;
            }
        })
    },
};

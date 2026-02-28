import {Quiz, ENDPOINTS, httpClient} from "@/features";

const getAllQuizzes = async () => {
    const response = await httpClient.get(ENDPOINTS.QUIZZES.LIST);
    return response.data.data;
}

const getQuizById = async (id: string) => {
    const response = await httpClient.get(ENDPOINTS.QUIZZES.DETAIL(id));
    return response.data.data;
}

export default {
    getAllQuizzes,
    getQuizById,

    fetch: {
        getAllQuizzes: () => ({
            queryKey: ['quizzes/cm', 'getAllQuizzes'],
            queryFn: async () => {
                const result = await getAllQuizzes();
                return result;
            },
        }),
        getQuizById: (id: string) => ({
            queryKey: ['quizzes/cm', 'getQuizById', id],
            queryFn: async () => {
                const result = await getQuizById(id);
                return result;
            }
        })
    },
};

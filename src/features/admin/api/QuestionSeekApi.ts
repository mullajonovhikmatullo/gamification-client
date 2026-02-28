import {Question, ENDPOINTS, httpClient} from "@/features";

const getAllQuestions = async (categoryId: string) => {
    const response = await httpClient.get(ENDPOINTS.QUESTIONS.LIST(categoryId));
    return response.data.data;
}

const getQuestionById = async (id: string) => {
    const response = await httpClient.get<Question>(ENDPOINTS.QUESTIONS.DETAIL(id));
    return response.data;
}

export default {
    getAllQuestions,
    getQuestionById,

    fetch: {
        getAllQuestions: (categoryId: string) => ({
            queryKey: ['questions/cm', 'getAllQuestions'],
            queryFn: async () => {
                const result = await getAllQuestions(categoryId);
                return result;
            },
        }),
        getQuestionById: (id: string) => ({
            queryKey: ['questions/cm', 'getQuestionById', id],
            queryFn: async () => {
                const result = await getQuestionById(id);
                return result;
            }
        })
    },
};

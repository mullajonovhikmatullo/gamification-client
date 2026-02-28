import {Quiz, QuizCreateRequest, QuizModifyRequest, ENDPOINTS, httpClient} from "@/features";

const createQuiz = async (params: QuizCreateRequest) => {
    const response = await httpClient.post<Quiz>(ENDPOINTS.QUIZZES.CREATE, params);
    return response.data;
}

const modifyQuiz = async (params: QuizModifyRequest, id: string) => {
    const response = await httpClient.put<Quiz>(ENDPOINTS.QUIZZES.UPDATE(id), params);
    return response.data;
}

const deleteQuiz = async (id: string) => {
    const response = await httpClient.delete(ENDPOINTS.QUIZZES.DELETE(id));
    return response.data;
}

export default {
    createQuiz,
    modifyQuiz,
    deleteQuiz,
};

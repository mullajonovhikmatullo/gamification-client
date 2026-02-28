import {Question, QuestionCreateRequest, QuestionModifyRequest, ENDPOINTS, httpClient} from "@/features";

const createQuestion = async (params: QuestionCreateRequest) => {
    const response = await httpClient.post<Question>(ENDPOINTS.QUESTIONS.CREATE, params);
    return response.data;
}

const modifyQuestion = async (params: QuestionModifyRequest, id: string) => {
    const response = await httpClient.put<Question>(ENDPOINTS.QUESTIONS.UPDATE(id), params);
    return response.data;
}

const deleteQuestion = async (id: string) => {
    const response = await httpClient.delete(ENDPOINTS.QUESTIONS.DELETE(id));
    return response.data;
}

export default {
    createQuestion,
    modifyQuestion,
    deleteQuestion,
};

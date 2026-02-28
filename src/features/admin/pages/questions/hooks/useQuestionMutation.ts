import {useMutation} from "@tanstack/react-query";
import {QuestionFlowApi} from "@/features/admin";


export const useQuestionMutation = () => {
//
    return {
        //
        mutation: {
            createQuestion: useMutation({
                mutationFn: QuestionFlowApi.createQuestion
            }),
            modifyQuestion: useMutation({
                mutationFn: ({params, id}: {params: any, id: string}) => QuestionFlowApi.modifyQuestion(params, id)
            }),
            deleteQuestion: useMutation({
                mutationFn: QuestionFlowApi.deleteQuestion
            })
        }
    }
}

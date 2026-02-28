import {useMutation} from "@tanstack/react-query";
import {QuizFlowApi} from "@/features/admin";


export const useQuizMutation = () => {
//
    return {
        //
        mutation: {
            createQuiz: useMutation({
                mutationFn: QuizFlowApi.createQuiz
            }),
            modifyQuiz: useMutation({
                mutationFn: ({params, id}: {params: any, id: string}) => QuizFlowApi.modifyQuiz(params, id)
            }),
            deleteQuiz: useMutation({
                mutationFn: QuizFlowApi.deleteQuiz
            })
        }
    }
}

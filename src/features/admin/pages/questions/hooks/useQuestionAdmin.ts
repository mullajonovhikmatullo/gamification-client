import {QuestionSeekApi} from "@/features/admin";
import {useQuery} from "@tanstack/react-query";
import {Question} from "@/features";


export const useQuestionAdmin = (id: string) => {
//
    const {queryKey, queryFn} = QuestionSeekApi.fetch.getQuestionById(id);

    const {data, isLoading, refetch} = useQuery<Question>({queryKey, queryFn});

    return {
        question: data,
        refetchQuestion: refetch,
        questionIsLoading: isLoading
    }
}

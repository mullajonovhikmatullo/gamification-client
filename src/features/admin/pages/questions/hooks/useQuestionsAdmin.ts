import {QuestionSeekApi} from "@/features/admin";
import {useQuery} from "@tanstack/react-query";
import {Question} from "@/features";


export const useQuestionsAdmin = (categoryId: string) => {
//
    const {queryKey, queryFn} = QuestionSeekApi.fetch.getAllQuestions(categoryId);

    console.log(categoryId)

    const {data, isLoading, refetch} = useQuery<Question[]>({queryKey, queryFn, enabled: !!categoryId});

    return {
        questions: data,
        refetchQuestions: refetch,
        questionsAreLoading: isLoading
    }
}

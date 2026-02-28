import {QuizSeekApi} from "@/features/admin";
import {useQuery} from "@tanstack/react-query";
import {Quiz} from "@/features";


export const useQuizAdmin = (id: string) => {
//
    const {queryKey, queryFn} = QuizSeekApi.fetch.getQuizById(id);

    const {data, isLoading, refetch} = useQuery<Quiz>({queryKey, queryFn});

    return {
        quiz: data,
        refetchQuiz: refetch,
        quizIsLoading: isLoading
    }
}
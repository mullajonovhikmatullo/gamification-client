import {QuizSeekApi} from "@/features/admin";
import {useQuery} from "@tanstack/react-query";
import {Quiz} from "@/features";


export const useQuizzesAdmin = () => {
//
    const {queryKey, queryFn} = QuizSeekApi.fetch.getAllQuizzes();

    const {data, isLoading, refetch} = useQuery<Quiz[]>({queryKey, queryFn});

    return {
        quizzes: data,
        refetchQuizzes: refetch,
        quizzesAreLoading: isLoading
    }
}
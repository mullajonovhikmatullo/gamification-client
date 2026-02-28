import {UserSeekApi} from "@/features/admin";
import {useQuery} from "@tanstack/react-query";
import {User} from "@/features";


export const useUserAdmin = (id: string) => {
//
    const {queryKey, queryFn} = UserSeekApi.fetch.getUserById(id);

    const {data, isLoading, refetch} = useQuery<User>({queryKey, queryFn});

    return {
        user: data,
        refetchQuiz: refetch,
        userIsLoading: isLoading
    }
}
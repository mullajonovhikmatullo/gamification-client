import {UserSeekApi} from "@/features/admin";
import {useQuery} from "@tanstack/react-query";
import {User} from "@/features";


export const useUsersAdmin = () => {
//
    const {queryKey, queryFn} = UserSeekApi.fetch.getAllUsers();

    const {data, isLoading, refetch} = useQuery<User[]>({
        queryKey,
        queryFn,
        select: (users) => users?.filter(user => user.role === 'student')
    });

    return {
        users: data,
        refetchUsers: refetch,
        usersAreLoading: isLoading
    }
}

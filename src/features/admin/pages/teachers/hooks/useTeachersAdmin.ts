import {UserSeekApi} from "@/features/admin";
import {useQuery} from "@tanstack/react-query";
import {User} from "@/features";


export const useTeachersAdmin = () => {
    const {queryKey, queryFn} = UserSeekApi.fetch.getAllUsers();

    const {data, isLoading, refetch} = useQuery<User[]>({
        queryKey,
        queryFn,
        select: (users) => users?.filter(user => user.role === 'teacher')
    });

    return {
        teachers: data,
        refetchTeachers: refetch,
        teachersAreLoading: isLoading
    }
}

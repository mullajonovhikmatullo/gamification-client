import {UserSeekApi} from "@/features/admin";
import {useQuery} from "@tanstack/react-query";
import {User} from "@/features";


export const useTeacherAdmin = (id: string) => {
    const {queryKey, queryFn} = UserSeekApi.fetch.getUserById(id);

    const {data, isLoading, refetch} = useQuery<User>({queryKey, queryFn});

    return {
        teacher: data,
        refetchTeacher: refetch,
        teacherIsLoading: isLoading
    }
}

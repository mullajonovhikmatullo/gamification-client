import {GroupSeekApi} from "@/features/admin";
import {useQuery} from "@tanstack/react-query";
import {Group} from "@/features";


export const useGroupAdmin = (id: string) => {
//
    const {queryKey, queryFn} = GroupSeekApi.fetch.getGroupById(id);

    const {data, isLoading, refetch} = useQuery<Group>({queryKey, queryFn});

    return {
        group: data,
        refetchGroup: refetch,
        groupIsLoading: isLoading
    }
}

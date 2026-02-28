import {GroupSeekApi} from "@/features/admin";
import {useQuery} from "@tanstack/react-query";
import {Group} from "@/features";


export const useGroupsAdmin = () => {
//
    const {queryKey, queryFn} = GroupSeekApi.fetch.getAllGroups();

    const {data, isLoading, refetch} = useQuery<Group[]>({queryKey, queryFn});

    return {
        groups: data,
        refetchGroups: refetch,
        groupsAreLoading: isLoading
    }
}

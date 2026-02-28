import {useMutation} from "@tanstack/react-query";
import {GroupFlowApi} from "@/features/admin";


export const useGroupMutation = () => {
//
    return {
        //
        mutation: {
            createGroup: useMutation({
                mutationFn: GroupFlowApi.createGroup
            }),
            modifyGroup: useMutation({
                mutationFn: ({params, id}: {params: any, id: string}) => GroupFlowApi.modifyGroup(params, id)
            }),
            deleteGroup: useMutation({
                mutationFn: GroupFlowApi.deleteGroup
            })
        }
    }
}

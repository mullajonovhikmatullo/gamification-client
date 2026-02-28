import {useMutation} from "@tanstack/react-query";
import {UserFlowApi} from "@/features/admin";


export const useUserMutation = () => {
//
    return {
        //
        mutation: {
            registerUser: useMutation({
                mutationFn: UserFlowApi.registerUser
            }),
            modifyUser: useMutation({
                mutationFn: ({params, id}: {params: any, id: string}) => UserFlowApi.modifyUser(params, id)
            }),
            deleteUser: useMutation({
                mutationFn: UserFlowApi.deleteUser
            })
        }
    }
}

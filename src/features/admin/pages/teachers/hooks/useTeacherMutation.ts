import {useMutation} from "@tanstack/react-query";
import {UserFlowApi} from "@/features/admin";


export const useTeacherMutation = () => {
    return {
        mutation: {
            registerTeacher: useMutation({
                mutationFn: UserFlowApi.registerUser
            }),
            modifyTeacher: useMutation({
                mutationFn: ({params, id}: {params: any, id: string}) => UserFlowApi.modifyUser(params, id)
            }),
            deleteTeacher: useMutation({
                mutationFn: UserFlowApi.deleteUser
            })
        }
    }
}

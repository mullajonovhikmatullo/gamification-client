import {useMutation} from "@tanstack/react-query";
import {CategoryFlowApi} from "@/features/admin";

export const useCategoryMutation = () => {
//
    return {
        //
        mutation: {
            registerCategory: useMutation({
                mutationFn: CategoryFlowApi.createCategory
            }),
            modifyCategory: useMutation({
                mutationFn: CategoryFlowApi.modifyCategory
            }),
            removeCategory: useMutation({
                mutationFn: CategoryFlowApi.removeCategory
            })
        }
    }
}
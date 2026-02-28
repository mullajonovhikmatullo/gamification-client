import {useMutation} from '@tanstack/react-query';
import {AuthFlowApi} from "@/features/api";

export const useLoginMutation = () => {
    //
    return {
        mutation: {
            login: useMutation({mutationFn: AuthFlowApi.login}),
        },
    };
};

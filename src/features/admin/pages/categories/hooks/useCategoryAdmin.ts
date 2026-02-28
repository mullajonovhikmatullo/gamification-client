import {CategorySeekApi} from "@/features/admin";
import {useQuery} from "@tanstack/react-query";
import {Category} from "@/features";


export const useCategoryAdmin = (id: string) => {
//
    const {queryKey, queryFn} = CategorySeekApi.fetch.getCategoryById({id});

    const {data, isLoading, refetch} = useQuery<Category>({queryKey, queryFn});

    return {
        category: data,
        refetchCategory: refetch,
        categoryIsLoading: isLoading
    }
}
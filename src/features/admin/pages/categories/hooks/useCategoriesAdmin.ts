import {CategorySeekApi} from "@/features/admin";
import {useQuery} from "@tanstack/react-query";
import {Category} from "@/features";


export const useCategoriesAdmin = () => {
//
    const {queryKey, queryFn} = CategorySeekApi.fetch.getAllCategories();

    const {data, isLoading, refetch} = useQuery<Category[]>({queryKey, queryFn});

    return {
        categories: data,
        refetchCategories: refetch,
        categoriesAreLoading: isLoading
    }
}
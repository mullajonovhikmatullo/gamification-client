import {Category, CategoryCreateRequest, CategoryModifyRequest, ENDPOINTS, httpClient} from "@/features";

const createCategory = async (params: CategoryCreateRequest) => {
    const response = await httpClient.post<Category>(ENDPOINTS.CATEGORIES.CREATE, params);
    return response.data;
}

const modifyCategory = async (CategoryModifyRequest: { category: Partial<Category>, id: string }) => {
    const response = await httpClient.put<Category>(ENDPOINTS.CATEGORIES.UPDATE(CategoryModifyRequest.id), CategoryModifyRequest.category);
    return response.data;
}

const removeCategory = async (id: string) => {
    const response = await httpClient.delete<Category>(ENDPOINTS.CATEGORIES.DELETE(id));
    return response.data;
}

export default {
    createCategory,
    modifyCategory,
    removeCategory,
};
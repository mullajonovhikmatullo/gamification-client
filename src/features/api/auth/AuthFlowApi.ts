import httpClient from "@/features/api/httpClient.ts";
import {ENDPOINTS, LoginRequest, LoginResponse} from "@/features/api";

const login = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await httpClient.post<LoginResponse>(ENDPOINTS.AUTH.LOGIN, data);
    return response.data;
};

export default {
    login,
};
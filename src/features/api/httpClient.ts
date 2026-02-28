import axios, {AxiosError} from "axios";
import {ToastHelper} from "@/features/api/errorHandler.ts";

export const httpClient = axios.create({
    //
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

httpClient.interceptors.request.use((config) => {
    //
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

httpClient.interceptors.response.use(
    //
    (response) => response,
    (error: AxiosError) => {
        // Global error handling
        ToastHelper(error);
        return Promise.reject(error);
    },
);

export default httpClient;

import {User, UserRegisterRequest, UserModifyRequest, ENDPOINTS, httpClient} from "@/features";

const registerUser = async (params: UserRegisterRequest) => {
    const response = await httpClient.post<User>(ENDPOINTS.USERS.CREATE, params);
    return response.data;
}

const modifyUser = async (params: UserModifyRequest, id: string) => {
     await httpClient.put<User>(ENDPOINTS.USERS.UPDATE(id), params);
}

const deleteUser = async (id: string) => {
    await httpClient.delete(ENDPOINTS.USERS.DELETE(id));
}

export default {
    registerUser,
    modifyUser,
    deleteUser,
};

import {Group, GroupRegisterRequest, GroupModifyRequest, ENDPOINTS, httpClient} from "@/features";

const createGroup = async (params: GroupRegisterRequest) => {
    const response = await httpClient.post<Group>(ENDPOINTS.GROUPS.CREATE, params);
    return response.data;
}

const modifyGroup = async (params: GroupModifyRequest, id: string) => {
    const response = await httpClient.put<Group>(ENDPOINTS.GROUPS.UPDATE(id), params);
    return response.data;
}

const deleteGroup = async (id: string) => {
    const response = await httpClient.delete(ENDPOINTS.GROUPS.DELETE(id));
    return response.data;
}

export default {
    createGroup,
    modifyGroup,
    deleteGroup,
};

import http from "../http-common";

export const getOwners = async () => {
    const response = await http.get('owners');
    return response.data;
};
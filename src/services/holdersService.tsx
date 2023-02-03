import http from "../http-common";

export const getHolders = async () => {
    const response = await http.get('Holders');
    return response.data;
};
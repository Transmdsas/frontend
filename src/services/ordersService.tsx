import http from "../http-common";


export const getOrders = async () => {
    const response = await http.get('Orders');
    return response.data;
};
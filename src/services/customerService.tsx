import http from "../http-common";


export const getCustomers = async () => {
    const response = await http.get('Customers');
    return response.data;
};
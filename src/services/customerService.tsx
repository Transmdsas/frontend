import axios from 'axios';

const baseUrl = "https://backend-production-dfe5.up.railway.app/api/v1/customers";

export const getCustomers = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};
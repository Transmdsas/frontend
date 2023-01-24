import axios from 'axios';

const baseUrl = "https://backend-production-dfe5.up.railway.app/api/v1/orders";


export const getOrders = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};
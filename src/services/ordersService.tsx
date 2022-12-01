import axios from 'axios';

const baseUrl = "https://transmd.herokuapp.com/api/v1/orders";


export const getOrders = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};
import axios from 'axios';

const baseUrl = "https://transmd.herokuapp.com/api/v1/customers";


export const getCustomers = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};
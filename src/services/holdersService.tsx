import axios from 'axios';

const baseUrl = "http://localhost:3002/api/v1/holders";


export const getHolders = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};
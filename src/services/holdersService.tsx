import axios from 'axios';

const baseUrl = "https://transmd.herokuapp.com/api/v1/holders";


export const getHolders = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};
import axios from 'axios';

const baseUrl = "https://transmd.herokuapp.com/api/v1/owners";


export const getOwners = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};
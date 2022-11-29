import axios from 'axios';

const baseUrl = "https://transmd.herokuapp.com/api/v1/values";


export const getValues = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};
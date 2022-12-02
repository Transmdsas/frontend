import axios from 'axios';

const baseUrl = "https://transmd.herokuapp.com/api/v1/drivers";


export const getDrivers = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};
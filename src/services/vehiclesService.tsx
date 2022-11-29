import axios from 'axios';

const baseUrl = "https://transmd.herokuapp.com/api/v1/vehicles";


export const getVehicles = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};
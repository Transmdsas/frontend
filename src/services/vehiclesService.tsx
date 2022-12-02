import axios from 'axios';

const baseUrl = "https://transmd.herokuapp.com/api/v1/vehicles";

export const getVehicles = async () => {
    const response = await axios.get(baseUrl);
    console.log(response);
    return response.data;
};

export const getVehiclesById = async(carPlate:string) => {
    const res = await axios.get(`${baseUrl}/${carPlate}`);
    return res.data;
}

export const createVehicle = async(data:any) => {
    const response = await axios.post(baseUrl, data);
    return response.data;
}

export const updateVehicle = async (carPlate:string, data: any) => {
    const response = await axios.put(`${baseUrl}/${carPlate}`, data);
    return response.data;
  }
  
export const deleteVehicle = async(carPlate: string) => {
    const response = await axios.delete(`${baseUrl}/${carPlate}`);
    return response.data;
  }
  
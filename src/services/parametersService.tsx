import axios from "axios";

const baseUrl = "https://transmd.herokuapp.com/api/v1/parameters";

export const getParameters = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const createParameter = async (parameter: string) => {
  const newParam = {
    description: parameter,
  };
  const response = await axios.post(baseUrl, newParam);
  return response.data;
};

export const getParameterById = async (id: number) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
}

export const updateParameter = async (id: number,data: any) => {
  const response = await axios.put(`${baseUrl}/${id}`, data);
  return response.data;
}

export const deleteParameter = async(id: number) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
}
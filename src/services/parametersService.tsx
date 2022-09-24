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

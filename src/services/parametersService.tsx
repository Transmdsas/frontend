import http from "../http-common";

const getParameters = async () => {
  const response = await http.get('parameters');
  return response.data;
};

const getParameterById = async (id: number) => {
  const response = await http.get(`parameters/${id}`);
  return response.data;
}

// const createParameter = async (parameter: string) => {
//   const newParam = {
//     description: parameter,
//   };
//   const response = await axios.post(baseUrl, newParam);
//   return response.data;
// };

// const updateParameter = async (id: number,data: any) => {
//   const response = await axios.put(`${baseUrl}/${id}`, data);
//   return response.data;
// }

// const deleteParameter = async(id: number) => {
//   const response = await axios.delete(`${baseUrl}/${id}`);
//   return response.data;
// }

const parameterService = {
  getParameters,
  getParameterById,
  // createParameter,
  // updateParameter,
  // deleteParameter
};

export { parameterService };
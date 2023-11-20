import { AxiosInstance, AxiosResponse } from "axios";
import { createJsonInstance } from "../http-common";
import { Parameter } from "../store/parameters/types";

class ParameterService {
  private jsonInstance: AxiosInstance;

  constructor() {
    this.jsonInstance = createJsonInstance();
  }

  getAll(): Promise<AxiosResponse<Parameter[]>> {
    return this.jsonInstance.get("/parameters");
  }

  get(id: number): Promise<AxiosResponse<Parameter>> {
    return this.jsonInstance.get(`/parameters/${id}`);
  }

  create(data: Parameter): Promise<AxiosResponse<Parameter>> {
    return this.jsonInstance.post("/parameters", data);
  }

  update(id: number, data: Parameter): Promise<AxiosResponse<Parameter>> {
    return this.jsonInstance.put(`/parameters/${id}`, data);
  }

  delete(id: number): Promise<AxiosResponse<void>> {
    return this.jsonInstance.delete(`/parameters/${id}`);
  }
}

// const getParameters = async () => {
//   const response = await http.get('parameters');
//   return response.data;
// };

// const getParameterById = async (id: number) => {
//   const response = await http.get(`parameters/${id}`);
//   return response.data;
// }

// const createParameter = async (parameter: string) => {
//   const newParam = {
//     description: parameter,
//   };
//   const response = await http.post('parameters', newParam);
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

// const parameterService = {
//   getParameters,
//   getParameterById,
//   createParameter,
//   // updateParameter,
//   // deleteParameter
// };

export default new ParameterService();

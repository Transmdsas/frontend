import { AxiosInstance, AxiosResponse } from "axios";
import { createJsonInstance } from "../http-common";
import { Value } from "../store/values/types";

class ValueService {
  private jsonInstance: AxiosInstance;

  constructor() {
    this.jsonInstance = createJsonInstance();
  }

  getAll(): Promise<AxiosResponse<Value[]>> {
    return this.jsonInstance.get("/values");
  }

  get(id: number): Promise<AxiosResponse<Value>> {
    return this.jsonInstance.get(`/values/${id}`);
  }

  create(data: Value): Promise<AxiosResponse<Value>> {
    return this.jsonInstance.post("/values", data);
  }

  update(id: number, data: Value): Promise<AxiosResponse<Value>> {
    return this.jsonInstance.put(`/values/${id}`, data);
  }

  delete(id: number): Promise<AxiosResponse<void>> {
    return this.jsonInstance.delete(`/values/${id}`);
  }
}

export default new ValueService();
// export const getAll = async () => {
//   const response = await http.get('values');
//   return response.data;
// };

// export const getById = async (id: number) => {
//   const value = await axios.get(`${baseUrl}/${id}`);
//   return value.data;
// };

// export const create = async (newValues: iValue[]) => {
//   const response = await axios.post(baseUrl, newValues);
//   return response.data;
// };

// export const update = async (id: number, updatedValue: iValue) => {
//   const response = await axios.put(`${baseUrl}/${id}`, updatedValue);
//   return response.data;
// };

// export const remove = async(id: number) => {
//     const response = await axios.delete(`${baseUrl}/${id}`);
//     return response.data;
//   }

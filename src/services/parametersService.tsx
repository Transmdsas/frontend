import { AxiosInstance, AxiosResponse } from "axios";
import { createJsonInstance } from "../http-common";
import { Parameter } from "./../store/parameters/types";

class ParametersService {
  private jsonInstance: AxiosInstance;

  constructor() {
    this.jsonInstance = createJsonInstance();
  }

  getAll(): Promise<AxiosResponse<Parameter[]>> {
    return this.jsonInstance.get("/parametersConfig");
  }

  get(id: number): Promise<AxiosResponse<Parameter>> {
    return this.jsonInstance.get(`/parametersConfig/${id}`);
  }

  create(data: Parameter): Promise<AxiosResponse<Parameter>> {
    return this.jsonInstance.post("/parametersConfig", data);
  }

  update(id: number, data: Parameter): Promise<AxiosResponse<Parameter>> {
    return this.jsonInstance.put(`/parametersConfig/${id}`, data);
  }

  delete(id: number): Promise<AxiosResponse<void>> {
    return this.jsonInstance.delete(`/parametersConfig/${id}`);
  }
}

export default new ParametersService();

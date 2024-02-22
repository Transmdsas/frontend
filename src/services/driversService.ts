import { AxiosInstance, AxiosResponse } from "axios";
import { createFormDataInstance, createJsonInstance } from "../http-common";
import { Driver } from "../store/drivers/types";

class DriverService {
  private jsonInstance: AxiosInstance;
  private formDataInstance: AxiosInstance;
  

  constructor() {
    this.jsonInstance = createJsonInstance();
    this.formDataInstance = createFormDataInstance();
  }

  getAll(): Promise<AxiosResponse<Driver[]>> {
    return this.jsonInstance.get("/drivers");
  }

  get(id: string): Promise<AxiosResponse<Driver>> {
    return this.jsonInstance.get(`/drivers/${id}`);
  }

  create(data: Driver): Promise<AxiosResponse<Driver>> {
    return this.formDataInstance.post("/drivers", data);
  }

  update(id: string, data: Driver): Promise<AxiosResponse<Driver>> {
    return this.formDataInstance.put(`/drivers/${id}`, data);
  }

  delete(id: string): Promise<AxiosResponse<void>> {
    return this.jsonInstance.delete(`/drivers/${id}`);
  }
}

export default new DriverService();

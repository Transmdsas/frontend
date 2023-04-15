import { AxiosInstance, AxiosResponse } from "axios";
import { createFormDataInstance, createJsonInstance } from "../http-common";
import { Driver } from "./../store/drivers/types";

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

  get(id: number): Promise<AxiosResponse<Driver>> {
    return this.jsonInstance.get(`/drivers/${id}`);
  }

  create(data: Driver): Promise<AxiosResponse<Driver>> {
    return this.formDataInstance.post("/drivers", data);
  }

  update(id: number, data: Driver): Promise<AxiosResponse<Driver>> {
    return this.jsonInstance.put(`/drivers/${id}`, data);
  }

  delete(id: number): Promise<AxiosResponse<void>> {
    return this.jsonInstance.delete(`/drivers/${id}`);
  }

  //   findByTitle(title) {
  //     return http.get(`/tutorials?title=${title}`);
  //   }
}

export default new DriverService();

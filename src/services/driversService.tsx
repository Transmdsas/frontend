import { AxiosInstance, AxiosResponse } from "axios";
import { createJsonInstance } from "../http-common";
import { Driver } from "./../store/drivers/types";

class DriverService {
  private jsonInstance: AxiosInstance;

  constructor() {
    this.jsonInstance = createJsonInstance();
  }

  getAll(): Promise<AxiosResponse<Driver[]>> {
    return this.jsonInstance.get("/drivers");
  }

  get(id: number): Promise<AxiosResponse<Driver>> {
    return this.jsonInstance.get(`/drivers/${id}`);
  }

  create(data: Driver): Promise<AxiosResponse<Driver>> {
    return this.jsonInstance.post("/drivers", data);
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

import { AxiosInstance, AxiosResponse } from "axios";
import { createJsonInstance } from "../http-common";
import { Vehicle } from "./../store/vehicles/types";

class VehiclesService {
  private jsonInstance: AxiosInstance;

  constructor() {
    this.jsonInstance = createJsonInstance();
  }

  getAll(): Promise<AxiosResponse<Vehicle[]>> {
    return this.jsonInstance.get("/vehicles");
  }

  get(id: number): Promise<AxiosResponse<Vehicle>> {
    return this.jsonInstance.get(`/vehicles/${id}`);
  }

  create(data: Vehicle): Promise<AxiosResponse<Vehicle>> {
    return this.jsonInstance.post("/vehicles", data);
  }

  update(id: number, data: Vehicle): Promise<AxiosResponse<Vehicle>> {
    return this.jsonInstance.put(`/vehicles/${id}`, data);
  }

  delete(id: number): Promise<AxiosResponse<void>> {
    return this.jsonInstance.delete(`/vehicles/${id}`);
  }

  //   findByTitle(title) {
  //     return this.jsonInstance.get(`/tutorials?title=${title}`);
  //   }
}

export default new VehiclesService();

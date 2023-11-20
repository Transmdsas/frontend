import { AxiosInstance, AxiosResponse } from "axios";
import { createJsonInstance, createFormDataInstance } from "../http-common";
import { Vehicle } from "../store/vehicles/types";

class VehiclesService {
  private jsonInstance: AxiosInstance;
  private formDataInstance: AxiosInstance;

  constructor() {
    this.jsonInstance = createJsonInstance();
    this.formDataInstance = createFormDataInstance();
  }

  getAll(): Promise<AxiosResponse<Vehicle[]>> {
    return this.jsonInstance.get("/vehicles");
  }

  get(id: number): Promise<AxiosResponse<Vehicle>> {
    return this.jsonInstance.get(`/vehicles/${id}`);
  }

  create(data: Vehicle): Promise<AxiosResponse<Vehicle>> {
    console.log(data);
    return this.formDataInstance.post("/vehicles", data);
  }

  update(id: number, data: Vehicle): Promise<AxiosResponse<Vehicle>> {
    return this.formDataInstance.put(`/vehicles/${id}`, data);
  }

  delete(id: number): Promise<AxiosResponse<void>> {
    return this.jsonInstance.delete(`/vehicles/${id}`);
  }

  //   findByTitle(title) {
  //     return this.jsonInstance.get(`/tutorials?title=${title}`);
  //   }
}

export default new VehiclesService();

import { AxiosInstance, AxiosResponse } from "axios";
import { createJsonInstance } from "../http-common";
import { Owner } from "../store/owners/types";

class OwnerService {
  private jsonInstance: AxiosInstance;

  constructor() {
    this.jsonInstance = createJsonInstance();
  }

  getAll(): Promise<AxiosResponse<Owner[]>> {
    return this.jsonInstance.get("/owners");
  }

  get(id: number): Promise<AxiosResponse<Owner>> {
    return this.jsonInstance.get(`/owners/${id}`);
  }

  create(data: Owner): Promise<AxiosResponse<Owner>> {
    return this.jsonInstance.post("/owners", data);
  }

  update(id: number, data: Owner): Promise<AxiosResponse<Owner>> {
    return this.jsonInstance.put(`/owners/${id}`, data);
  }

  delete(id: number): Promise<AxiosResponse<void>> {
    return this.jsonInstance.delete(`/owners/${id}`);
  }

  //   findByTitle(title) {
  //     return http.get(`/tutorials?title=${title}`);
  //   }
}

export default new OwnerService();

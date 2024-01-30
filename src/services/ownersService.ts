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

  get(id: string): Promise<AxiosResponse<Owner>> {
    return this.jsonInstance.get(`/owners/${id}`);
  }

  create(data: Owner): Promise<AxiosResponse<Owner>> {
    return this.jsonInstance.post("/owners", data);
  }

  update(id: string, data: Owner): Promise<AxiosResponse<Owner>> {
    return this.jsonInstance.put(`/owners/${id}`, data);
  }

  delete(id: string): Promise<AxiosResponse<void>> {
    return this.jsonInstance.delete(`/owners/${id}`);
  }
}

export default new OwnerService();

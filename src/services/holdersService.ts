import { AxiosInstance, AxiosResponse } from "axios";
import { createFormDataInstance, createJsonInstance } from "../http-common";
import { Holder } from "../store/holders/types";

class HolderService {
  private jsonInstance: AxiosInstance;
  private formDataInstance: AxiosInstance;

  constructor() {
    this.jsonInstance = createJsonInstance();
    this.formDataInstance = createFormDataInstance();
  }

  getAll(): Promise<AxiosResponse<Holder[]>> {
    return this.jsonInstance.get("/holders");
  }

  get(id: string): Promise<AxiosResponse<Holder>> {
    return this.jsonInstance.get(`/holders/${id}`);
  }

  create(data: Holder): Promise<AxiosResponse<Holder>> {
    return this.formDataInstance.post("/holders", data);
  }

  update(id: string, data: Holder): Promise<AxiosResponse<Holder>> {
    return this.formDataInstance.put(`/holders/${id}`, data);
  }

  delete(id: string): Promise<AxiosResponse<void>> {
    return this.jsonInstance.delete(`/holders/${id}`);
  }
}

export default new HolderService();

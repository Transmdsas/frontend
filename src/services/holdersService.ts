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

  get(id: number): Promise<AxiosResponse<Holder>> {
    return this.jsonInstance.get(`/holders/${id}`);
  }

  create(data: Holder): Promise<AxiosResponse<Holder>> {
    return this.formDataInstance.post("/holders", data);
  }

  update(id: number, data: Holder): Promise<AxiosResponse<Holder>> {
    return this.jsonInstance.put(`/holders/${id}`, data);
  }

  delete(id: number): Promise<AxiosResponse<void>> {
    return this.jsonInstance.delete(`/holders/${id}`);
  }

  //   findByTitle(title) {
  //     return http.get(`/tutorials?title=${title}`);
  //   }
}

export default new HolderService();

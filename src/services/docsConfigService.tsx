import { AxiosInstance, AxiosResponse } from "axios";
import { createJsonInstance } from "../http-common";
import { DocsConfig } from "./../store/docsConfig/types";

class DocsConfigService {
  private jsonInstance: AxiosInstance;

  constructor() {
    this.jsonInstance = createJsonInstance();
  }

  getAll(): Promise<AxiosResponse<DocsConfig[]>> {
    return this.jsonInstance.get("/documentsConfig");
  }

  get(id: number): Promise<AxiosResponse<DocsConfig>> {
    return this.jsonInstance.get(`/documentsConfig/${id}`);
  }

  create(data: DocsConfig): Promise<AxiosResponse<DocsConfig>> {
    return this.jsonInstance.post("/documentsConfig", data);
  }

  update(id: number, data: DocsConfig): Promise<AxiosResponse<DocsConfig>> {
    return this.jsonInstance.put(`/documentsConfig/${id}`, data);
  }

  delete(id: number): Promise<AxiosResponse<void>> {
    return this.jsonInstance.delete(`/documentsConfig/${id}`);
  }
}

export default new DocsConfigService();

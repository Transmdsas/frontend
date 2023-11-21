import { AxiosInstance, AxiosResponse } from "axios";
import { createJsonInstance } from "../http-common";
import { Department } from "../store/departments/types";

class DepartmentService {
  private jsonInstance: AxiosInstance;

  constructor() {
    this.jsonInstance = createJsonInstance();
  }

  getAll(): Promise<AxiosResponse<Department[]>> {
    return this.jsonInstance.get("/departments");
  }

  get(id: number): Promise<AxiosResponse<Department>> {
    return this.jsonInstance.get(`/departments/${id}`);
  }

  create(data: Department): Promise<AxiosResponse<Department>> {
    return this.jsonInstance.post("/departments", data);
  }

  update(id: number, data: any): Promise<AxiosResponse<Department>> {
    return this.jsonInstance.put(`/departments/${id}`, data);
  }

  delete(id: number): Promise<AxiosResponse<void>> {
    return this.jsonInstance.delete(`/departments/${id}`);
  }

  //   findByTitle(title) {
  //     return this.jsonInstance.get(`/tutorials?title=${title}`);
  //   }
}

export default new DepartmentService();

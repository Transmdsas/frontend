import { AxiosInstance, AxiosResponse } from "axios";
import { createJsonInstance } from "../http-common";
import { Customer } from "./../store/customers/types";

class CustomerService {
  private jsonInstance: AxiosInstance;

  constructor() {
    this.jsonInstance = createJsonInstance();
  }

  getAll(): Promise<AxiosResponse<Customer[]>> {
    return this.jsonInstance.get("/customers");
  }

  get(id: number): Promise<AxiosResponse<Customer>> {
    return this.jsonInstance.get(`/customers/${id}`);
  }

  create(data: Customer): Promise<AxiosResponse<Customer>> {
    return this.jsonInstance.post("/customers", data);
  }

  update(id: number, data: Customer): Promise<AxiosResponse<Customer>> {
    return this.jsonInstance.put(`/customers/${id}`, data);
  }

  delete(id: number): Promise<AxiosResponse<void>> {
    return this.jsonInstance.delete(`/customers/${id}`);
  }

  //   findByTitle(title) {
  //     return this.jsonInstance.get(`/tutorials?title=${title}`);
  //   }
}

export default new CustomerService();

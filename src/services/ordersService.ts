import { AxiosInstance, AxiosResponse } from "axios";
import { createJsonInstance } from "../http-common";
import { Order } from "../store/orders/types";

class OrderService {
  private jsonInstance: AxiosInstance;

  constructor() {
    this.jsonInstance = createJsonInstance();
  }

  getAll(): Promise<AxiosResponse<Order[]>> {
    return this.jsonInstance.get("/orders");
  }

  get(id: number): Promise<AxiosResponse<Order>> {
    return this.jsonInstance.get(`/orders/${id}`);
  }

  create(data: Order): Promise<AxiosResponse<Order>> {
    return this.jsonInstance.post("/orders", data);
  }

  update(id: number, data: Order): Promise<AxiosResponse<Order>> {
    return this.jsonInstance.put(`/orders/${id}`, data);
  }

  delete(id: number): Promise<AxiosResponse<void>> {
    return this.jsonInstance.delete(`/orders/${id}`);
  }

  //   findByTitle(title) {
  //     return http.get(`/tutorials?title=${title}`);
  //   }
}

export default new OrderService();

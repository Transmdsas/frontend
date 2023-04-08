import http from "../http-common";
import { Order } from './../store/orders/types';

class OrderService {
    getAll() {
        return http.get("/orders");
      }
    
      get(id:number) {
        return http.get(`/orders/${id}`);
      }
    
      create(data:Order) {
        return http.post("/orders", data);
      }
    
      update(id:number, data:any) {
        return http.put(`/orders/${id}`, data);
      }
    
      delete(id:number) {
        return http.delete(`/orders/${id}`);
      }
    
      deleteAll() {
        return http.delete(`/orders`);
      }
    
    //   findByTitle(title) {
    //     return http.get(`/tutorials?title=${title}`);
    //   }
}

export default new OrderService();

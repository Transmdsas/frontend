import http from "../http-common";
import { Customer } from './../store/customers/types';

class CustomerService {
    getAll() {
        return http.get("/customers");
      }
    
      get(id:number) {
        return http.get(`/customers/${id}`);
      }
    
      create(data:Customer) {
        return http.post("/customers", data);
      }
    
      update(id:number, data:any) {
        return http.put(`/customers/${id}`, data);
      }
    
      delete(id:number) {
        return http.delete(`/customers/${id}`);
      }
    
      deleteAll() {
        return http.delete(`/customers`);
      }
    
    //   findByTitle(title) {
    //     return http.get(`/tutorials?title=${title}`);
    //   }
}

export default new CustomerService();

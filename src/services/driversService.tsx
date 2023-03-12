import http from "../http-common";
import { Driver } from './../store/drivers/types';

class DriverService {
    getAll() {
        return http.get("/drivers");
      }
    
      get(id:number) {
        return http.get(`/drivers/${id}`);
      }
    
      create(data:Driver) {
        return http.post("/drivers", data);
      }
    
      update(id:number, data:any) {
        return http.put(`/drivers/${id}`, data);
      }
    
      delete(id:number) {
        return http.delete(`/drivers/${id}`);
      }
    
      deleteAll() {
        return http.delete(`/drivers`);
      }
    
    //   findByTitle(title) {
    //     return http.get(`/tutorials?title=${title}`);
    //   }
}

export default new DriverService();

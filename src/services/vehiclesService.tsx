import http from "../http-common";
import { Vehicle } from './../store/vehicles/types';

class VehiclesService {
    getAll() {
        return http.get("/vehicles");
      }
    
      get(id:number) {
        return http.get(`/vehicles/${id}`);
      }
    
      create(data:Vehicle) {
        return http.post("/vehicles", data);
      }
    
      update(id:number, data:any) {
        return http.put(`/vehicles/${id}`, data);
      }
    
      delete(id:number) {
        return http.delete(`/vehicles/${id}`);
      }
    
      deleteAll() {
        return http.delete(`/vehicles`);
      }
    
    //   findByTitle(title) {
    //     return http.get(`/tutorials?title=${title}`);
    //   }
}

export default new VehiclesService();

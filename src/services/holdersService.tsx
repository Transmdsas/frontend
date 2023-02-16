import http from "../http-common";

class HolderService {
    getAll() {
        return http.get("/holders");
      }
    
      get(id:number) {
        return http.get(`/holders/${id}`);
      }
    
      create(data:any) {
        return http.post("/holders", data);
      }
    
      update(id:number, data:any) {
        return http.put(`/holders/${id}`, data);
      }
    
      delete(id:number) {
        return http.delete(`/holders/${id}`);
      }
    
      deleteAll() {
        return http.delete(`/holders`);
      }
    
    //   findByTitle(title) {
    //     return http.get(`/tutorials?title=${title}`);
    //   }
}

export default new HolderService();

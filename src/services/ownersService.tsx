import http from "../http-common";
import { Owner } from './../store/owners/types';

class OwnerService {
  getAll() {
    return http.get("/owners");
  }

  get(id: number) {
    return http.get(`/owners/${id}`);
  }

  create(data:Owner) {
    return http.post("/owners", data);
  }

  update(id: number, data: Owner) {
    return http.put(`/owners/${id}`, data);
  }

  delete(id: number) {
    return http.delete(`/owners/${id}`);
  }

  deleteAll() {
    return http.delete(`/owners`);
  }

  //   findByTitle(title) {
  //     return http.get(`/tutorials?title=${title}`);
  //   }
}

export default new OwnerService();

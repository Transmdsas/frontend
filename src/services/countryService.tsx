import http from "../http-common";

class CountryService {
  getAll() {
    return http.get("/countries");
  }

  get(id: number) {
    return http.get(`/countries/${id}`);
  }

  create(data: any) {
    return http.post("/countries", data);
  }

  update(id: number, data: any) {
    return http.put(`/countries/${id}`, data);
  }

  delete(id: number) {
    return http.delete(`/countries/${id}`);
  }

  deleteAll() {
    return http.delete(`/countries`);
  }

  //   findByTitle(title) {
  //     return http.get(`/tutorials?title=${title}`);
  //   }
}

export default new CountryService();

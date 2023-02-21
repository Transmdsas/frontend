import http from "../http-common";

class DepartmentService {
  getAll() {
    return http.get("/departments");
  }

  get(id: number) {
    return http.get(`/departments/${id}`);
  }

  create(data: any) {
    return http.post("/departments", data);
  }

  update(id: number, data: any) {
    return http.put(`/departments/${id}`, data);
  }

  delete(id: number) {
    return http.delete(`/departments/${id}`);
  }

  //   findByTitle(title) {
  //     return http.get(`/tutorials?title=${title}`);
  //   }
}

export default new DepartmentService();
